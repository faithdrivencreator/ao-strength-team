/**
 * Stripe Webhook Handler — AO Strength Team
 *
 * SETUP (one-time):
 * 1. Stripe Dashboard → Developers → Webhooks → Add endpoint
 * 2. URL: https://aostrengthteam.store/api/webhooks/stripe
 * 3. Event: checkout.session.completed
 * 4. Copy whsec_... signing secret → Netlify env var STRIPE_WEBHOOK_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import { renderAOEmail } from '@/lib/email-shell';

export const runtime = 'nodejs';

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}
const PETE_EMAIL = 'pete@fluidfaithsolutions.com';
const CUSTOMERS_AUDIENCE_ID = process.env.RESEND_AO_CUSTOMERS_AUDIENCE_ID;
const ORDERS_FROM = 'AO Strength Team <orders@aostrengthteam.store>';
const SUPPORT_EMAIL = 'support@aostrengthteam.store';
const SITE_URL = 'https://aostrengthteam.store';

// ─── Per-customer single-use promo codes ─────────────────────────────────────

function shortCodeSuffix(): string {
  // Crockford-style alphabet: no 0/O/1/I to avoid customer typing mistakes
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

async function createPersonalPromoCode({
  baseCoupon,
  daysValid,
}: {
  baseCoupon: string;
  daysValid: number;
}): Promise<string> {
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) throw new Error('STRIPE_SECRET_KEY not set');
  const code = `${baseCoupon}-${shortCodeSuffix()}`;
  const expiresAt = Math.floor(Date.now() / 1000) + daysValid * 86400;
  const body = new URLSearchParams({
    coupon: baseCoupon,
    code,
    active: 'true',
    max_redemptions: '1',
    expires_at: String(expiresAt),
  }).toString();
  const res = await fetch('https://api.stripe.com/v1/promotion_codes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sk}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': '2024-06-20',
    },
    body,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Stripe promo create failed: ${res.status} ${errText}`);
  }
  return code;
}

// ─── Customer audience helpers ────────────────────────────────────────────────

async function isReturningCustomer(email: string): Promise<boolean> {
  if (!CUSTOMERS_AUDIENCE_ID || !email || !process.env.RESEND_API_KEY) return false;
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${CUSTOMERS_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } },
    );
    return res.ok;
  } catch {
    return false;
  }
}

async function addToCustomersAudience(email: string, firstName: string | null) {
  if (!CUSTOMERS_AUDIENCE_ID || !email) return;
  try {
    await getResend().contacts.create({
      email,
      firstName: firstName ?? undefined,
      audienceId: CUSTOMERS_AUDIENCE_ID,
      unsubscribed: false,
    });
  } catch (err) {
    console.error('[Webhook] Failed to add contact to audience:', err);
  }
}

// ─── Order detail extraction ──────────────────────────────────────────────────

async function extractOrderDetails(session: Stripe.Checkout.Session) {
  const sessionWithItems = await stripe.checkout.sessions.retrieve(
    session.id,
    { expand: ['line_items'] }
  );

  const lineItems =
    sessionWithItems.line_items?.data.map((item) => ({
      name: item.description ?? 'Product',
      quantity: item.quantity ?? 1,
      unitAmount: (item.price?.unit_amount ?? 0) / 100,
      subtotal: (item.amount_total ?? 0) / 100,
    })) ?? [];

  return {
    customerEmail: session.customer_details?.email ?? '',
    customerName: session.customer_details?.name ?? null,
    amountTotal: (session.amount_total ?? 0) / 100,
    amountSubtotal: (session.amount_subtotal ?? session.amount_total ?? 0) / 100,
    currency: session.currency?.toUpperCase() ?? 'USD',
    lineItems,
    shippingAddress:
      (session as unknown as {
        collected_information?: { shipping_details?: { address?: Stripe.Address } };
        shipping_details?: { address?: Stripe.Address };
      }).collected_information?.shipping_details?.address ??
      (session as unknown as { shipping_details?: { address?: Stripe.Address } }).shipping_details?.address ??
      null,
    stripeSessionId: session.id,
    paymentIntent:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null),
  };
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Webhook] Signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log('[Webhook] checkout.session.completed:', {
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total,
  });

  try {
    const order = await extractOrderDetails(session);

    console.log('[New Order]', JSON.stringify(order, null, 2));

    const orderRef = order.stripeSessionId.slice(-8).toUpperCase();
    const customerFirstName = (order.customerName ?? '').split(' ')[0] || null;

    // ─── Internal Pete alert (plain HTML — internal only) ──────────────────
    const peteItemRows = order.lineItems
      .map((i) => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.subtotal.toFixed(2)}</td></tr>`)
      .join('');

    const peteShippingText = order.shippingAddress
      ? [order.shippingAddress.line1, order.shippingAddress.line2, order.shippingAddress.city, order.shippingAddress.state, order.shippingAddress.postal_code].filter(Boolean).join(', ')
      : 'Not provided';

    const stripeUrl = order.paymentIntent
      ? `https://dashboard.stripe.com/payments/${order.paymentIntent}`
      : 'https://dashboard.stripe.com';

    try {
      await getResend().emails.send({
        from: ORDERS_FROM,
        to: PETE_EMAIL,
        subject: `💰 New AO Order — $${order.amountTotal.toFixed(2)} from ${order.customerName || order.customerEmail}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#000;border-bottom:2px solid #000;padding-bottom:8px">New AO Strength Team Order</h2>
            <table style="width:100%;margin:16px 0">
              <tr><td style="color:#666">Order Ref</td><td><strong>#${orderRef}</strong></td></tr>
              <tr><td style="color:#666">Customer</td><td><strong>${order.customerName || 'N/A'}</strong></td></tr>
              <tr><td style="color:#666">Email</td><td><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></td></tr>
              <tr><td style="color:#666">Total</td><td><strong style="color:#000;font-size:18px">$${order.amountTotal.toFixed(2)} ${order.currency}</strong></td></tr>
              <tr><td style="color:#666">Shipping</td><td>${peteShippingText}</td></tr>
            </table>
            <h3 style="color:#000">Items</h3>
            <table style="width:100%;border-collapse:collapse">
              <tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Product</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Amount</th></tr>
              ${peteItemRows}
            </table>
            <p style="margin-top:20px"><a href="${stripeUrl}" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;display:inline-block">View in Stripe →</a></p>
          </div>
        `,
      });
      console.log('[Webhook] Order notification email sent to Pete');
    } catch (err) {
      console.error('[Webhook] Failed to send Pete alert:', err);
    }

    // ─── Customer-facing flow ──────────────────────────────────────────────
    if (order.customerEmail) {
      const wasReturning = await isReturningCustomer(order.customerEmail);

      // Build line-items table for order confirmation (label, value pairs)
      const lineItemRows: Array<[string, string]> = order.lineItems.map((i) => [
        `${i.quantity} ×`,
        `${i.name}   $${i.subtotal.toFixed(2)}`,
      ]);

      const totalsRows: Array<[string, string]> = [
        ['SUBTOTAL', `$${order.amountSubtotal.toFixed(2)}`],
        ['SHIPPING', 'FREE'],
        ['TOTAL', `$${order.amountTotal.toFixed(2)} ${order.currency}`],
      ];

      const shippingLines = order.shippingAddress
        ? [
            order.shippingAddress.line1,
            order.shippingAddress.line2,
            `${order.shippingAddress.city ?? ''}, ${order.shippingAddress.state ?? ''} ${order.shippingAddress.postal_code ?? ''}`.trim(),
            order.shippingAddress.country,
          ].filter((line): line is string => Boolean(line && line.trim()))
        : ['On file with Stripe'];

      // ─── Email 1 — Order Confirmation (immediate) ────────────────────────
      try {
        await getResend().emails.send({
          from: ORDERS_FROM,
          to: order.customerEmail,
          replyTo: SUPPORT_EMAIL,
          subject: `Order received — #${orderRef}`,
          html: renderAOEmail({
            preheader: 'From the Alpha to the Omega. Tracking when it ships.',
            sections: [
              {
                eyebrow: '01  ORDER RECEIVED',
                body: [
                  `${customerFirstName ?? 'Friend'},`,
                  `Your order is logged. It&rsquo;s in the queue for dispatch.`,
                  `Tracking will follow the moment it leaves the bench.`,
                  `<em style="color:rgba(255,255,255,0.60)">&ldquo;I am the Alpha and the Omega, the First and the Last, the Beginning and the End.&rdquo; &mdash; Revelation 22:13</em>`,
                ],
              },
              {
                eyebrow: `02  ORDER  #${orderRef}`,
                table: [...lineItemRows, ...totalsRows],
              },
              {
                eyebrow: '03  SHIPPING TO',
                body: shippingLines.join('<br>'),
              },
              {
                eyebrow: '04  QUESTIONS',
                body: 'Reply to this email.',
              },
            ],
          }),
        });
        console.log('[Webhook] Customer confirmation sent to', order.customerEmail);
      } catch (err) {
        console.error('[Webhook] Failed to send customer confirmation:', err);
      }

      // ─── First-time customer flow ────────────────────────────────────────
      if (!wasReturning) {
        await addToCustomersAudience(order.customerEmail, customerFirstName);

        // Generate unique per-customer THANKS15 code for the +24h welcome.
        let thanksCode = 'THANKS15';
        try {
          thanksCode = await createPersonalPromoCode({ baseCoupon: 'THANKS15', daysValid: 60 });
          console.log('[Webhook] Personal THANKS code:', thanksCode);
        } catch (err) {
          console.error('[Webhook] THANKS code create failed, using shared fallback:', err);
        }

        const welcomeAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        // ─── Email 2 — Welcome (+24h) ──────────────────────────────────────
        try {
          await getResend().emails.send({
            from: ORDERS_FROM,
            to: order.customerEmail,
            replyTo: SUPPORT_EMAIL,
            scheduledAt: welcomeAt,
            subject: `Welcome to the team, ${customerFirstName ?? 'friend'}`,
            html: renderAOEmail({
              preheader: 'Built for the reps no one sees — and 15% off the next one.',
              sections: [
                {
                  eyebrow: '01  WELCOME TO THE TEAM',
                  body: [
                    `${customerFirstName ?? 'Friend'},`,
                    `We build for the reps no one sees.`,
                    `For the early-morning lift. For the run after the long day. For the discipline that doesn&rsquo;t ask for an audience.`,
                    `Alpha is the decision. Omega is the finish. Both matter. Both deserve gear that respects the work.`,
                    `We don&rsquo;t design for trends. We don&rsquo;t chase noise. We make apparel for the disciplined &mdash; and the team that holds them to it.`,
                    `<em style="color:rgba(255,255,255,0.60)">&ldquo;I can do all things through Christ who strengthens me.&rdquo; &mdash; Philippians 4:13</em>`,
                  ],
                },
                {
                  eyebrow: '02  THE PILLARS',
                  table: [
                    ['DISCIPLINE', 'Consistency over hype.'],
                    ['RESILIENCE', 'Earned under pressure.'],
                    ['INTEGRITY', 'Train honestly. Live intentionally.'],
                    ['COMMUNITY', 'Train alone. Belong to a team.'],
                  ],
                },
                {
                  eyebrow: '03  FOR THE NEXT ONE',
                  body: '15% off your next order.',
                  code: {
                    value: thanksCode,
                    note: 'Single use. Valid 60 days. Yours alone.',
                  },
                },
              ],
              cta: { text: 'SHOP THE TEAM →', url: `${SITE_URL}/shop` },
            }),
          });
          console.log('[Webhook] Welcome email scheduled for', welcomeAt);
        } catch (err) {
          console.error('[Webhook] Failed to schedule welcome email:', err);
        }

        // Note: the day-14 REVIEW email and day-30 referral invite are fired
        // by daily scheduled functions (Phase 2), not from this webhook.
      } else {
        console.log('[Webhook] Returning customer — skipping welcome email');
      }
    }
  } catch (err) {
    console.error('[Webhook] Error processing order:', err);
  }

  return NextResponse.json({ received: true });
}

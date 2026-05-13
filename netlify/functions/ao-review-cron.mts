/**
 * Daily review-request cron — AO Strength Team
 *
 * Runs once a day at 14:00 UTC (10am ET in EDT, 9am ET in EST).
 *
 * For every Stripe payment_intent that:
 *   - succeeded between 14 and 15 days ago
 *   - has metadata.source_site === 'aostrengthteam.store'
 *   - does NOT yet have metadata.review_email_sent_at
 *
 * Generates a unique single-use REVIEW10-XXXXX code (90-day expiry), sends
 * the branded review-request email (Email 5) via Resend, and marks the Stripe
 * PI with review_email_sent_at to prevent duplicates.
 *
 * Day window: 14–15 days. The 24-hour window means the daily cron picks up
 * every order that crossed the 14-day boundary in the prior 24 hours.
 * AO is apparel — first wear is within days of delivery, no metabolic results
 * window needed (contrast with Greenstone's 60-day window).
 *
 * Why scheduled function (not Resend scheduledAt): Resend caps scheduledAt
 * sends at 30 days, which would cover day-14 but would break if we ever extend
 * the window. Matching Greenstone's pattern keeps cron infrastructure uniform.
 */

import type { Config } from '@netlify/functions';
import { renderAOEmail } from '../../src/lib/email-shell.js';

const SITE_URL = 'https://aostrengthteam.store';
const SUPPORT_EMAIL = 'support@aostrengthteam.store';
const ORDERS_FROM = 'AO Strength Team <orders@aostrengthteam.store>';
const STRIPE_API_VERSION = '2024-06-20';

// ─── Crockford Base32 helpers ─────────────────────────────────────────────────
// Inline (not imported) — Netlify Functions bundle separately from the Next.js
// app. Greenstone keeps these inline for the same reason.

function shortCodeSuffix(): string {
  // Crockford alphabet: no 0/O, no 1/I — avoids visual ambiguity
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// ─── Stripe raw-fetch helpers ─────────────────────────────────────────────────

interface StripePaymentIntent {
  id: string;
  metadata: Record<string, string>;
  customer: string | null;
  receipt_email: string | null;
  amount: number;
  created: number;
}

interface StripeCheckoutSession {
  id: string;
  customer_details?: { email?: string; name?: string };
}

async function stripeGet<T>(path: string, sk: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`https://api.stripe.com/v1${path}`);
  if (params) for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${sk}`, 'Stripe-Version': STRIPE_API_VERSION },
  });
  if (!res.ok) throw new Error(`Stripe GET ${path}: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

async function stripePost<T>(path: string, sk: string, body: Record<string, string>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sk}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': STRIPE_API_VERSION,
    },
    body: new URLSearchParams(body).toString(),
  });
  if (!res.ok) throw new Error(`Stripe POST ${path}: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

// ─── Email renderer ───────────────────────────────────────────────────────────

function buildReviewEmail(firstName: string | null, reviewCode: string): { subject: string; html: string } {
  const name = firstName ?? 'there';

  const html = renderAOEmail({
    preheader: 'One honest review. 10% off either way.',
    title: 'Two weeks in. How\'s it holding up?',
    sections: [
      {
        eyebrow: '01  TWO WEEKS IN',
        body: [
          `${name},`,
          "You've had it about two weeks. You've worn it to the gym, to work, on a run.",
          "Tell us how it's holding up.",
          '<a href="mailto:support@aostrengthteam.store?subject=My%20AO%20review" style="display:inline-block;padding:14px 28px;background-color:#FFFFFF;color:#000000;font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none">SHARE YOUR EXPERIENCE →</a>',
          'Two minutes. Direct is best.',
        ],
      },
      {
        eyebrow: '02  EITHER WAY — 10% OFF',
        body: [
          "Whether you say it's perfect or tell us where we missed, the code is yours.",
        ],
        code: {
          value: reviewCode,
          note: 'Single use. Valid 90 days. Yours alone.',
        },
      },
    ],
    cta: {
      text: 'BROWSE THE TEAM →',
      url: `${SITE_URL}/shop`,
    },
    signoff: '— AΩ',
  });

  return {
    subject: "Two weeks in. How's it holding up?",
    html,
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async (_req: Request): Promise<Response> => {
  const sk = process.env.STRIPE_SECRET_KEY;
  const rk = process.env.RESEND_API_KEY;
  if (!sk || !rk) {
    return new Response(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY or RESEND_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 14-to-15-day window: orders that crossed the 14-day boundary in the last 24h.
  // created < 14d ago AND created > 15d ago = "between 14 and 15 days old".
  const now = Math.floor(Date.now() / 1000);
  const fourteenDaysAgo = now - 14 * 86400;
  const fifteenDaysAgo = now - 15 * 86400;

  const query = `status:'succeeded' AND created<${fourteenDaysAgo} AND created>${fifteenDaysAgo} AND metadata['source_site']:'aostrengthteam.store'`;

  let candidates: StripePaymentIntent[] = [];
  try {
    const searchRes = await stripeGet<{ data: StripePaymentIntent[] }>(
      '/payment_intents/search',
      sk,
      { query, limit: '100' },
    );
    candidates = searchRes.data;
  } catch (err) {
    console.error('[AOReviewCron] Stripe search failed:', err);
    return new Response(JSON.stringify({ error: 'Stripe search failed', detail: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`[AOReviewCron] Found ${candidates.length} candidate(s) at day-14`);

  const results: { email: string; piId: string; status: string; code?: string }[] = [];

  for (const pi of candidates) {
    try {
      // Skip if review email was already sent (dedup guard)
      if (pi.metadata?.review_email_sent_at) {
        results.push({ email: 'n/a', piId: pi.id, status: 'already_sent' });
        continue;
      }

      // Resolve customer email + first name from checkout session
      const sessRes = await stripeGet<{ data: StripeCheckoutSession[] }>(
        '/checkout/sessions',
        sk,
        { payment_intent: pi.id, limit: '1' },
      );
      const session = sessRes.data[0];
      const email = session?.customer_details?.email ?? pi.receipt_email;
      const fullName = session?.customer_details?.name ?? null;
      const firstName = fullName ? fullName.split(' ')[0] : null;

      if (!email) {
        results.push({ email: 'n/a', piId: pi.id, status: 'no_email' });
        continue;
      }

      // Generate per-customer REVIEW10-XXXXX code (single use, 90-day expiry)
      const reviewCode = `REVIEW10-${shortCodeSuffix()}`;
      const expiresAt = now + 90 * 86400;
      await stripePost('/promotion_codes', sk, {
        coupon: 'REVIEW10',
        code: reviewCode,
        active: 'true',
        max_redemptions: '1',
        expires_at: String(expiresAt),
      });

      // Send via Resend
      const { subject, html } = buildReviewEmail(firstName, reviewCode);
      const sendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${rk}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: ORDERS_FROM,
          to: email,
          reply_to: SUPPORT_EMAIL,
          subject,
          html,
        }),
      });

      if (!sendRes.ok) {
        const errBody = await sendRes.text();
        results.push({ email, piId: pi.id, status: `resend_error: ${sendRes.status} ${errBody}` });
        continue;
      }

      // Stamp Stripe PI to prevent duplicates on future runs
      await stripePost(`/payment_intents/${pi.id}`, sk, {
        'metadata[review_email_sent_at]': new Date().toISOString(),
        'metadata[review_code]': reviewCode,
      });

      results.push({ email, piId: pi.id, status: 'sent', code: reviewCode });
    } catch (err) {
      console.error('[AOReviewCron] PI', pi.id, 'failed:', err);
      results.push({ email: 'n/a', piId: pi.id, status: `error: ${String(err)}` });
    }
  }

  console.log('[AOReviewCron] Results:', JSON.stringify(results));

  return new Response(JSON.stringify({ ok: true, checked: candidates.length, results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config: Config = {
  // 14:00 UTC daily = 10am EDT (9am EST)
  schedule: '0 14 * * *',
};

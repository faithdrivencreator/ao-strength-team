/**
 * Refer-a-Friend API - AO Strength Team
 *
 * POST /api/refer
 *
 * Creates a per-friend single-use Stripe promo code (FRIEND15-XXXXX, 60-day
 * expiry), emails the friend an invitation with the code, and emails the
 * referrer a short confirmation. Both emails use the AO branded shell.
 *
 * The base Stripe coupon `FRIEND15` must exist in the Stripe account before
 * this endpoint will succeed - Pete creates that base coupon out of band.
 */

import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { renderAOEmail, type EmailSection } from '@/lib/email-shell';

export const runtime = 'nodejs';

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}
const ORDERS_FROM = 'AO Strength Team <orders@aostrengthteam.store>';
const SUPPORT_EMAIL = 'support@aostrengthteam.store';
const SITE_URL = 'https://aostrengthteam.store';
const FRIEND_BASE_COUPON = 'FRIEND15';
const NOTE_MAX = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ReferPayload {
  referrerEmail?: string;
  friendEmail?: string;
  friendFirstName?: string;
  personalNote?: string;
}

// ─── Per-friend single-use promo code (Crockford alphabet, no 0/O/1/I) ──────

function shortCodeSuffix(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

async function createFriendPromoCode({
  referrerEmail,
  friendEmail,
}: {
  referrerEmail: string;
  friendEmail: string;
}): Promise<string> {
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) throw new Error('STRIPE_SECRET_KEY not set');

  const code = `${FRIEND_BASE_COUPON}-${shortCodeSuffix()}`;
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 86400;

  const body = new URLSearchParams({
    coupon: FRIEND_BASE_COUPON,
    code,
    active: 'true',
    max_redemptions: '1',
    expires_at: String(expiresAt),
    'metadata[source_site]': 'aostrengthteam.store',
    'metadata[brand]': 'ao-strength-team',
    'metadata[referrer_email]': referrerEmail,
    'metadata[friend_email]': friendEmail,
    'metadata[code_type]': 'referral',
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

// ─── Helpers ────────────────────────────────────────────────────────────────

function firstNameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? '';
  const root = local.split(/[.+_-]/)[0] ?? local;
  if (!root) return 'Friend';
  return root.charAt(0).toUpperCase() + root.slice(1).toLowerCase();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Friend invitation email (Email 6a) ─────────────────────────────────────

function buildFriendInviteHtml(args: {
  friendFirstName: string | null;
  referrerFirstName: string;
  personalNote: string | null;
  code: string;
}): string {
  const greeting = args.friendFirstName ? args.friendFirstName : 'Hey';

  const section01Body: string[] = [
    `${escapeHtml(greeting)},`,
    `${escapeHtml(args.referrerFirstName)} sent you this.`,
  ];

  if (args.personalNote) {
    section01Body.push(
      `<span style="display:block;border-left:1px solid rgba(255,255,255,0.30);padding:8px 0 8px 16px;margin:8px 0;color:rgba(255,255,255,0.85)">&ldquo;${escapeHtml(
        args.personalNote,
      )}&rdquo;<br><span style="color:rgba(255,255,255,0.55)">- ${escapeHtml(
        args.referrerFirstName,
      )}</span></span>`,
    );
  }

  const sections: EmailSection[] = [
    {
      eyebrow: '01  A NOTE FROM A FRIEND',
      body: section01Body,
    },
    {
      eyebrow: '02  WHO WE ARE',
      body: [
        'Alpha Omega Strength Team is performance apparel for those who train with intention. Lifters. Runners. Anyone who treats discipline as a daily practice, not a trend.',
        'We make apparel for the disciplined - and the team that holds them to it.',
        '<span style="font-family:\'JetBrains Mono\',\'SF Mono\',Menlo,Consolas,\'Courier New\',monospace;font-size:11px;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.85)">DISCIPLINE - RESILIENCE - INTEGRITY - COMMUNITY</span>',
      ],
    },
    {
      eyebrow: '03  15% OFF, ON THEM',
      code: {
        value: args.code,
        note: 'Single use. Valid 60 days. Yours alone.',
      },
    },
  ];

  return renderAOEmail({
    preheader: "A friend thinks you'd train next to them.",
    title: 'AO Strength Team - An invite from a friend',
    sections,
    cta: { text: 'SHOP THE TEAM →', url: `${SITE_URL}/shop` },
  });
}

// ─── Referrer thank-you email ────────────────────────────────────────────────

function buildReferrerThanksHtml({ friendEmail }: { friendEmail: string }): string {
  return renderAOEmail({
    preheader: 'Your invite is on the way.',
    title: 'AO Strength Team - Invite sent',
    sections: [
      {
        eyebrow: '01  INVITATION SENT',
        body: [
          `Your invite is on the way to ${escapeHtml(friendEmail)}.`,
          "If they wear it, they're on the team.",
        ],
      },
    ],
  });
}

// ─── Handler ────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let payload: ReferPayload;
  try {
    payload = (await request.json()) as ReferPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const referrerEmail = (payload.referrerEmail ?? '').trim().toLowerCase();
  const friendEmail = (payload.friendEmail ?? '').trim().toLowerCase();
  const friendFirstNameRaw = (payload.friendFirstName ?? '').trim();
  const friendFirstName = friendFirstNameRaw ? friendFirstNameRaw.slice(0, 60) : null;
  const personalNoteRaw = (payload.personalNote ?? '').trim();
  const personalNote = personalNoteRaw ? personalNoteRaw.slice(0, NOTE_MAX) : null;

  if (!EMAIL_RE.test(referrerEmail)) {
    return Response.json({ error: 'Invalid referrer email.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(friendEmail)) {
    return Response.json({ error: 'Invalid friend email.' }, { status: 400 });
  }
  if (referrerEmail === friendEmail) {
    return Response.json({ error: "You can't refer yourself." }, { status: 400 });
  }
  if (personalNoteRaw.length > NOTE_MAX) {
    return Response.json(
      { error: `Note must be ${NOTE_MAX} characters or less.` },
      { status: 400 },
    );
  }

  // TODO: add a real rate limiter (per-IP + per-referrer) if abuse appears.
  // For v1 we rely on Stripe's per-friend single-use code + 60-day expiry.

  // 1) Create the per-friend Stripe promo code. If this fails, bail before
  //    sending any emails so we never promise a code that doesn't exist.
  let code: string;
  try {
    code = await createFriendPromoCode({ referrerEmail, friendEmail });
  } catch (err) {
    console.error('[refer] Stripe promo create failed', {
      referrerEmail,
      friendEmail,
      err,
    });
    return Response.json(
      { error: "Couldn't generate the code. Try again in a moment." },
      { status: 500 },
    );
  }

  const referrerFirstName = firstNameFromEmail(referrerEmail);

  // 2) Send the friend invitation (Email 6a)
  try {
    await getResend().emails.send({
      from: ORDERS_FROM,
      to: friendEmail,
      replyTo: SUPPORT_EMAIL,
      subject: `${referrerFirstName} sent you 15% off AO Strength Team`,
      html: buildFriendInviteHtml({
        friendFirstName,
        referrerFirstName,
        personalNote,
        code,
      }),
    });
  } catch (err) {
    // Code already exists in Stripe - return ok so the user doesn't retry
    // and burn another code. Log full context for ops review.
    console.error('[refer] Friend invite send failed (code already created)', {
      referrerEmail,
      friendEmail,
      code,
      err,
    });
    return Response.json({ ok: true });
  }

  // 3) Send the referrer thank-you (no code, no CTA)
  try {
    await getResend().emails.send({
      from: ORDERS_FROM,
      to: referrerEmail,
      replyTo: SUPPORT_EMAIL,
      subject: `Invite sent to ${friendEmail}`,
      html: buildReferrerThanksHtml({ friendEmail }),
    });
  } catch (err) {
    console.error('[refer] Referrer thank-you send failed', {
      referrerEmail,
      friendEmail,
      code,
      err,
    });
    // Still return ok - friend already got their invite, which is the
    // primary outcome.
  }

  return Response.json({ ok: true });
}

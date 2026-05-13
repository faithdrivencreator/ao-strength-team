/**
 * AO Strength Team — branded shipping notification email.
 *
 * Called from /api/admin/send-shipping when Pete enters tracking info on the
 * admin ship form. Body is Email 3 from lifecycle-sequence.md verbatim.
 *
 * Carrier auto-link map mirrors Greenstone's. "Other" omits the TRACK button
 * and renders the tracking number as plain text only.
 */

import { renderAOEmail } from "@/lib/email-shell";

const CARRIER_TRACKING_URLS: Record<string, (tracking: string) => string> = {
  USPS: (t) =>
    `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(t)}`,
  UPS: (t) => `https://www.ups.com/track?tracknum=${encodeURIComponent(t)}`,
  FedEx: (t) =>
    `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(t)}`,
  DHL: (t) =>
    `https://www.dhl.com/en/express/tracking.html?AWB=${encodeURIComponent(t)}`,
};

export type CarrierName = "USPS" | "UPS" | "FedEx" | "DHL" | "Other";

export interface ShippingEmailInput {
  /** Customer first name — used in the greeting. If null, greeting opens with order ref. */
  firstName: string | null;
  /** Last-8 of Stripe session ID, uppercase */
  orderRef: string;
  /** Carrier — drives the auto-generated tracking URL */
  carrier: CarrierName;
  /** Raw tracking number */
  trackingNumber: string;
  /** Optional human-readable expected delivery (e.g. "Tuesday, May 20" or "2-4 business days") */
  expectedDelivery?: string;
  /** Optional custom note from Pete (italicized, rendered between the table and the next section) */
  customNote?: string;
}

export function buildTrackingUrl(
  carrier: CarrierName,
  tracking: string,
): string | null {
  const fn = CARRIER_TRACKING_URLS[carrier];
  return fn ? fn(tracking) : null;
}

export interface RenderedShippingEmail {
  subject: string;
  preheader: string;
  html: string;
}

export function renderShippingEmail(
  input: ShippingEmailInput,
): RenderedShippingEmail {
  const firstName = input.firstName?.trim() || null;
  const subject = `Your order is moving — #${input.orderRef}`;
  const preheader = `${input.carrier} has it. Tracking inside.`;
  const trackingUrl = buildTrackingUrl(input.carrier, input.trackingNumber);

  const onTheWayBody: string[] = [
    `${firstName ? `${firstName},` : "Your order is logged."}`,
    "Your order is moving.",
  ];

  const table: Array<[string, string]> = [
    ["CARRIER", input.carrier],
    ["TRACKING", input.trackingNumber],
  ];
  if (input.expectedDelivery) {
    table.push(["EXPECTED", input.expectedDelivery]);
  }

  const customNoteHtml = input.customNote
    ? `<tr><td style="padding:4px 36px 0 36px;background-color:#000000"><p style="margin:0 0 14px;color:rgba(255,255,255,0.60);font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:300;font-style:italic;line-height:1.6">${escapeHtml(input.customNote.trim())}</p></td></tr>`
    : "";

  // We build the HTML by composing the AO email shell. The shell renders
  // sections in order. The custom note has to live between section 1 (the
  // tracking block + optional CTA) and section 2 (care instructions), so we
  // post-process the rendered HTML to inject the note row right before the
  // second section if present.
  const baseHtml = renderAOEmail({
    preheader,
    title: `AO Strength Team — Order #${input.orderRef}`,
    sections: [
      {
        eyebrow: "01  ON THE WAY",
        body: onTheWayBody,
        table,
      },
      {
        eyebrow: "02  WHEN IT ARRIVES",
        body: [
          "Cold wash. Inside out. Hang dry. Built to outlast the cycle.",
          "Questions on fit or care, reply here.",
        ],
      },
    ],
    cta: trackingUrl
      ? { text: "TRACK THIS ORDER →", url: trackingUrl }
      : undefined,
  });

  // Inject the custom note row after the CTA (or after section 1 if no CTA),
  // just before the "02  WHEN IT ARRIVES" section. We match on the eyebrow
  // string which is unique in this email.
  const html = customNoteHtml
    ? baseHtml.replace(
        /(<tr>\s*<td style="padding:28px 36px 0 36px;background-color:#000000">\s*\n?\s*<p[^>]*>\/\/ 02&nbsp;&nbsp;WHEN IT ARRIVES)/,
        `${customNoteHtml}$1`,
      ).replace(
        // Fallback selector — the shell uses literal spaces, not &nbsp;
        /(<tr>\s*<td style="padding:28px 36px 0 36px;background-color:#000000">\s*\n?\s*<p[^>]*>\/\/ 02  WHEN IT ARRIVES)/,
        `${customNoteHtml}$1`,
      )
    : baseHtml;

  return { subject, preheader, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

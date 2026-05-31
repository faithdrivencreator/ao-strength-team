// Meta Conversions API (CAPI) - server-side Purchase event for AO Strength Team
//
// Fires a server-side Purchase to Meta from the Stripe webhook, the most
// reliable purchase signal we have. It shares the event_id (Stripe session id)
// with the client-side Pixel Purchase so Meta deduplicates the two and credits
// one conversion with browser + server signal combined.
//
// Fully gated: if META_CAPI_ACCESS_TOKEN and a dataset/pixel id are not both
// present, sendMetaCapiPurchase returns immediately and does nothing. All work
// is wrapped so a CAPI failure can never break the webhook or the order flow.
// The access token and raw PII are never logged.

import { createHash } from "crypto";

const GRAPH_VERSION = "v21.0";

// SHA-256 hash a normalized string per Meta's customer information parameters
// spec (trim + lowercase, then hex digest). Returns undefined for empty input
// so we never send a hash of an empty string.
function hashField(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

// Zip codes: Meta wants the first 5 digits, lowercased, no spaces.
function hashZip(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

export interface MetaCapiPurchaseInput {
  // Stable dedup id. MUST equal the fbq eventID used client-side. We pass the
  // Stripe checkout session id from both sides.
  eventId: string;
  eventSourceUrl: string;
  value: number;
  currency: string;
  contentIds: string[];
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  zip?: string | null;
}

// Sends the Purchase event. No-op (and no network) unless the env is configured.
// Never throws: any error is caught and logged without exposing the token or PII.
export async function sendMetaCapiPurchase(
  input: MetaCapiPurchaseInput,
): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const datasetId =
    process.env.META_DATASET_ID || process.env.META_PIXEL_ID;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  // Gate: both the token and a dataset/pixel id are required, else skip silently.
  if (!accessToken || !datasetId) return;

  try {
    const userData: Record<string, string[] | string> = {};

    const emHash = hashField(input.email);
    if (emHash) userData.em = [emHash];

    const fnHash = hashField(input.firstName);
    if (fnHash) userData.fn = [fnHash];

    const lnHash = hashField(input.lastName);
    if (lnHash) userData.ln = [lnHash];

    const zipHash = hashZip(input.zip);
    if (zipHash) userData.zp = [zipHash];

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: input.eventId,
          event_source_url: input.eventSourceUrl,
          user_data: userData,
          custom_data: {
            value: input.value,
            currency: input.currency || "USD",
            content_ids: input.contentIds,
            content_type: "product",
          },
        },
      ],
    };

    // Optional test mode so Pete can watch the event land in Events Manager.
    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}/events?access_token=${encodeURIComponent(
      accessToken,
    )}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Log status only. Never log the response body or URL: they can echo
      // request parameters. The token lives only in the URL we do not print.
      console.error("[Meta CAPI] Purchase send failed:", res.status);
    } else {
      console.log("[Meta CAPI] Purchase event sent");
    }
  } catch (err) {
    // Surface the error message but never the token or raw PII.
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Meta CAPI] Purchase send error:", message);
  }
}

import { NextRequest } from "next/server";
import {
  buildFoundersEmailHtml,
  FOUNDERS_SUBJECT,
  FOUNDERS_FROM,
  FOUNDERS_HEADERS,
} from "@/lib/founders-email";

export const runtime = "nodejs";

interface SubscribePayload {
  email?: string;
  source?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Founders auto-send window. New registrants who sign up before this moment get
 * the FOUNDERS15 launch email instantly. Default cutoff: 8 PM ET on launch day
 * (2026-06-02), which is 2026-06-03T00:00:00Z. Override without a deploy by
 * setting FOUNDERS_AUTOSEND_UNTIL to an ISO 8601 timestamp (empty/unset string
 * "off" disables the auto-send entirely).
 */
function foundersAutosendActive(): boolean {
  const raw = process.env.FOUNDERS_AUTOSEND_UNTIL;
  if (raw && raw.toLowerCase() === "off") return false;
  const until = raw ? Date.parse(raw) : Date.parse("2026-06-03T00:00:00Z");
  if (Number.isNaN(until)) return false;
  return Date.now() < until;
}

/**
 * Best-effort founders email send. Never throws into the subscribe flow - a
 * failed send must not fail the signup. Fire-and-forget on the new-contact path.
 */
async function sendFoundersEmail(apiKey: string, email: string): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FOUNDERS_FROM,
        to: [email],
        subject: FOUNDERS_SUBJECT,
        html: buildFoundersEmailHtml(),
        headers: FOUNDERS_HEADERS,
      }),
    });
    if (!res.ok) {
      console.warn(
        "[subscribe] founders email non-fatal failure",
        res.status,
        await res.text(),
      );
    }
  } catch (err) {
    console.warn("[subscribe] founders email network error (non-fatal)", err);
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_STRENGTH_TEAM_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("[subscribe] RESEND_API_KEY or RESEND_STRENGTH_TEAM_AUDIENCE_ID missing");
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  let body: SubscribePayload;
  try {
    body = (await request.json()) as SubscribePayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: body.firstName ?? "",
          last_name: body.lastName ?? "",
          unsubscribed: false,
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text();
      // Resend treats duplicates as a soft error - surface success to keep UX clean.
      if (errBody.toLowerCase().includes("already")) {
        return Response.json({ ok: true, duplicate: true });
      }
      console.error("[subscribe] Resend error", res.status, errBody);
      return Response.json({ error: "Subscription failed" }, { status: 502 });
    }

    // New contact added. On launch day, before the 8 PM ET cutoff, send them
    // the founders thank-you + FOUNDERS15 code. Duplicates returned above never
    // reach here, so the existing early-registration list is not re-emailed.
    if (foundersAutosendActive()) {
      await sendFoundersEmail(apiKey, email);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] network error", err);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}

import { NextRequest } from "next/server";

export const runtime = "nodejs";

interface SubscribePayload {
  email?: string;
  source?: string;
  firstName?: string;
  lastName?: string;
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
      // Resend treats duplicates as a soft error — surface success to keep UX clean.
      if (errBody.toLowerCase().includes("already")) {
        return Response.json({ ok: true, duplicate: true });
      }
      console.error("[subscribe] Resend error", res.status, errBody);
      return Response.json({ error: "Subscription failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] network error", err);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}

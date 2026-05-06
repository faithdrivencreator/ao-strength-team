import { NextRequest } from "next/server";

export const runtime = "nodejs";

const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

interface SubscribePayload {
  email?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error("[subscribe] MAILERLITE_API_KEY or MAILERLITE_GROUP_ID missing");
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

  const source = body.source || "site";

  try {
    const res = await fetch(MAILERLITE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        fields: { source },
        status: "active",
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[subscribe] MailerLite error", res.status, errBody);
      return Response.json({ error: "Subscription failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] network error", err);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}

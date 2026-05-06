import { NextRequest } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  // Log to server output for now — owner can monitor Netlify function logs.
  // TODO: forward to hello@alphaomegateam.com via gws or transactional email service.
  console.log("[contact] new submission", {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message,
  });

  return Response.json({ ok: true });
}

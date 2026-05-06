import { NextRequest } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "ao-preview";
const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;

interface LoginPayload {
  password?: string;
}

export async function POST(request: NextRequest) {
  const expectedPassword = process.env.PREVIEW_PASSWORD;
  const cookieToken = process.env.PREVIEW_COOKIE_TOKEN;

  if (!expectedPassword || !cookieToken) {
    console.error("[preview-login] PREVIEW_PASSWORD or PREVIEW_COOKIE_TOKEN missing");
    return Response.json({ error: "Preview access not configured" }, { status: 500 });
  }

  let body: LoginPayload;
  try {
    body = (await request.json()) as LoginPayload;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Constant-time-ish compare. The brutally simple version is fine here — the
  // password gate is for owner preview, not protecting customer data.
  if (!body.password || body.password !== expectedPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=${cookieToken}`,
      "Path=/",
      `Max-Age=${ONE_MONTH_SECONDS}`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
    ].join("; "),
  );
  return response;
}

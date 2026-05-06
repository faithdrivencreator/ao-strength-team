import { NextRequest, NextResponse } from "next/server";

/**
 * Pre-launch gate. Next.js 16 Proxy (formerly Middleware).
 *
 * When NEXT_PUBLIC_COMING_SOON=true, redirect public-facing browse routes back
 * to the homepage (which renders the Coming Soon teaser). The following stay
 * accessible:
 *   - /                    (the teaser itself)
 *   - /studio*             (Sanity CMS)
 *   - /api/*               (form submissions, webhooks)
 *   - /privacy, /terms,
 *     /shipping, /returns  (legal — required by Stripe)
 *   - /not-found, /_next/* (system routes)
 *
 * Flip NEXT_PUBLIC_COMING_SOON to "false" (or unset) when ready to launch.
 */

const GATED_PREFIXES = [
  "/shop",
  "/products",
  "/blog",
  "/contact",
  "/checkout",
];

const PREVIEW_COOKIE = "ao-preview";

export function proxy(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_COMING_SOON !== "true") {
    return NextResponse.next();
  }

  // Preview access: signed-in owner bypasses the gate entirely.
  const previewCookie = request.cookies.get(PREVIEW_COOKIE)?.value;
  const expectedToken = process.env.PREVIEW_COOKIE_TOKEN;
  if (expectedToken && previewCookie === expectedToken) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isGated = GATED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isGated) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/* (route handlers)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - studio/* (CMS)
     * - public file extensions
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|studio|images|.*\\..*).*)",
  ],
};

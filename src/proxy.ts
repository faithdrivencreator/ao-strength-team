import { NextRequest, NextResponse } from "next/server";

/**
 * Pre-launch gates. Next.js 16 Proxy (formerly Middleware).
 *
 * Two independent flags:
 *
 *   NEXT_PUBLIC_COMING_SOON=true
 *     Whole-site teaser mode. Public browse routes redirect to `/`,
 *     which renders the Coming Soon hero. Used before the site went public.
 *
 *   NEXT_PUBLIC_PURCHASE_LOCKED=true
 *     Site is open and indexable, but checkout/cart routes are blocked.
 *     Visitors can browse products + read the journal; "Notify Me On Drop"
 *     replaces "Add to Cart" in the UI. Used between soft-open and full launch.
 *
 * Both flags honor the preview cookie — owners bypass.
 */

const COMING_SOON_GATED = ["/shop", "/products", "/blog", "/contact", "/checkout"];
// NOTE: /shop is intentionally NOT gated — it renders ShopComingSoon (a hype page
// with countdown + waitlist) when locked. Only purchase paths are blocked.
const PURCHASE_LOCKED_GATED = ["/products", "/cart", "/checkout"];

const PREVIEW_COOKIE = "ao-preview";

export function proxy(request: NextRequest) {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";
  const purchaseLocked = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

  if (!comingSoon && !purchaseLocked) {
    return NextResponse.next();
  }

  // Preview cookie bypasses everything.
  const previewCookie = request.cookies.get(PREVIEW_COOKIE)?.value;
  const expectedToken = process.env.PREVIEW_COOKIE_TOKEN;
  if (expectedToken && previewCookie === expectedToken) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Coming-soon mode: rewrite `/` to the static `/coming-soon` page so the
  // homepage stays statically prerendered. (Previously this branch was
  // decided inside page.tsx via cookies(), which forced SSR on every cold
  // request and ballooned TTFB.)
  if (comingSoon && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }

  const gatedPrefixes = comingSoon ? COMING_SOON_GATED : PURCHASE_LOCKED_GATED;

  const isGated = gatedPrefixes.some(
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

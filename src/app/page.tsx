import { cookies } from "next/headers";
import MainHome from "@/components/MainHome";
import ComingSoonHero from "@/components/ComingSoonHero";
import { getAllPosts } from "@/lib/blog";

// Refresh every 60s so the homepage's latest-3 block auto-rolls when a new
// blog post lands on `main` (drip-publish runs against the same window).
export const revalidate = 60;

const PREVIEW_COOKIE = "ao-preview";

export default async function HomePage() {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";
  const latestPosts = (await getAllPosts()).slice(0, 3);

  if (!comingSoon) {
    return <MainHome latestPosts={latestPosts} />;
  }

  // Pre-launch is on. Owners with the preview cookie see the real homepage;
  // everyone else sees the launch teaser.
  const expectedToken = process.env.PREVIEW_COOKIE_TOKEN;
  const previewCookie = (await cookies()).get(PREVIEW_COOKIE)?.value;

  if (expectedToken && previewCookie === expectedToken) {
    return <MainHome latestPosts={latestPosts} />;
  }

  return <ComingSoonHero />;
}

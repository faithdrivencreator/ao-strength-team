import { cookies } from "next/headers";
import MainHome from "@/components/MainHome";
import ComingSoonHero from "@/components/ComingSoonHero";

const PREVIEW_COOKIE = "ao-preview";

export default async function HomePage() {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

  if (!comingSoon) {
    return <MainHome />;
  }

  // Pre-launch is on. Owners with the preview cookie see the real homepage;
  // everyone else sees the launch teaser.
  const expectedToken = process.env.PREVIEW_COOKIE_TOKEN;
  const previewCookie = (await cookies()).get(PREVIEW_COOKIE)?.value;

  if (expectedToken && previewCookie === expectedToken) {
    return <MainHome />;
  }

  return <ComingSoonHero />;
}

import type { Metadata } from "next";
import { cookies } from "next/headers";
import ShopPageClient from "./ShopPageClient";
import ShopComingSoon from "./ShopComingSoon";

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";
const PREVIEW_COOKIE = "ao-preview";

export const metadata: Metadata = PURCHASE_LOCKED
  ? {
      title: "First Drop · June 2, 2026 | Alpha Omega Strength Team",
      description:
        "Faith-grounded performance apparel. Strengthen. Endure. Finish. The first drop opens June 2.",
    }
  : {
      title: "Shop | Alpha Omega Strength Team",
    };

export default async function ShopPage() {
  // Owners holding the preview cookie see the real shop even while it's locked,
  // so they can verify the live products behind the gate before go-live.
  const expectedToken = process.env.PREVIEW_COOKIE_TOKEN;
  const isPreview = expectedToken
    ? (await cookies()).get(PREVIEW_COOKIE)?.value === expectedToken
    : false;

  if (PURCHASE_LOCKED && !isPreview) {
    return <ShopComingSoon />;
  }
  return <ShopPageClient />;
}

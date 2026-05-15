import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";
import ShopComingSoon from "./ShopComingSoon";

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

export const metadata: Metadata = PURCHASE_LOCKED
  ? {
      title: "First Drop · May 25, 2026 | Alpha Omega Strength Team",
      description:
        "Faith-grounded performance apparel. Strengthen. Endure. Finish. The first drop opens May 25.",
    }
  : {
      title: "Shop | Alpha Omega Strength Team",
    };

export default function ShopPage() {
  if (PURCHASE_LOCKED) {
    return <ShopComingSoon />;
  }
  return <ShopPageClient />;
}

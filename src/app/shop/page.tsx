import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop | Alpha Omega Strength Team",
};

export default function ShopPage() {
  return <ShopPageClient />;
}

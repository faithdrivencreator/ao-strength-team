import ProductPage, { productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("ao-warpaint");

export default function AoWarpaintPage() {
  return <ProductPage slug="ao-warpaint" />;
}

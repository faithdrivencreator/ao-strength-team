import ProductPage, { productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("ao-unbreakable");

export default function AoUnbreakablePage() {
  return <ProductPage slug="ao-unbreakable" />;
}

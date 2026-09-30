import ProductPage, { productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("ao-cornerstone");

export default function AoCornerstonePage() {
  return <ProductPage slug="ao-cornerstone" />;
}

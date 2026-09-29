import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage, { productMetadata } from "@/components/ProductPage";
import { getStoreProduct } from "@/data/storefront";

type Props = {
  params: Promise<{ slug: string }>;
};

// The four live products have their own folders; this route only catches
// other slugs, so anything not in the storefront data is a 404.
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return productMetadata(slug);
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!getStoreProduct(slug)) notFound();
  return <ProductPage slug={slug} />;
}

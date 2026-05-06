import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAllProducts } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product Not Found | Alpha Omega Strength Team" };
  }

  return {
    title: `${product.name} | Alpha Omega Strength Team`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Alpha Omega Strength Team`,
      description: product.description,
      images: [{ url: product.images[0], width: 600, height: 800 }],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const related = allProducts.filter((p) => p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((src) => `${SITE_URL}${src}`),
    brand: { "@type": "Brand", name: "Alpha Omega Strength Team" },
    sku: product.slug,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.status === "in-stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductPageClient product={product} relatedProducts={related} />
    </>
  );
}

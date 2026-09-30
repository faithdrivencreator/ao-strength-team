import type { Metadata } from "next";
import ProductTemplate from "@/components/ProductTemplate";
import { getStoreProduct, garmentSwatches, type StoreProduct } from "@/data/storefront";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";
const BRAND = "Alpha Omega Strength Team";

/** Page metadata for a product: its own canonical, a category title, a 1200x630 share image. */
export function productMetadata(slug: string): Metadata {
  const p = getStoreProduct(slug);
  if (!p) return { title: "Product Not Found" };
  const url = `/products/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${p.seoTitle} | ${BRAND}`,
      description: p.metaDescription,
      images: [{ url: p.ogImage, width: 1200, height: 630, alt: p.cardImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.seoTitle} | ${BRAND}`,
      description: p.metaDescription,
      images: [p.ogImage],
    },
  };
}

function productSchema(p: StoreProduct) {
  const url = `${SITE_URL}/products/${p.slug}`;
  const images = [p.cardImage, ...Object.values(p.models).flatMap((m) => [m!.front, ...(m!.back ? [m!.back] : [])])];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${p.title} Tee`,
      description: p.story,
      url,
      sku: p.slug,
      image: [...new Set(images)].map((src) => `${SITE_URL}${src}`),
      brand: { "@type": "Brand", name: BRAND },
      color: garmentSwatches(p).map((c) => c.name).join(", "),
      offers: Object.entries(p.sleeves).map(([sleeve, s]) => ({
        "@type": "Offer",
        name: sleeve === "long" ? "Long Sleeve" : "Short Sleeve",
        url,
        price: s!.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: BRAND },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
}

export default function ProductPage({ slug }: { slug: string }) {
  const p = getStoreProduct(slug)!;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(p)).replace(/</g, "\\u003c") }}
      />
      <ProductTemplate slug={slug} />
    </>
  );
}

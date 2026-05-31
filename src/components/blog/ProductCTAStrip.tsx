import Image from "next/image";
import Link from "next/link";
import { getAllProducts, type Product } from "@/data/products";

interface ProductCTAStripProps {
  /** Optional explicit product slugs to feature. Falls back to in-stock products. */
  slugs?: string[];
  /** Max products to show. Default 2. */
  max?: number;
}

/** Official merchandise drop date - strip is hidden until this day. */
const LAUNCH_DATE = new Date("2026-06-02T00:00:00-04:00"); // EDT

/**
 * "Gear worn in this training" - end-of-article product strip.
 * Buck Mason pattern: editorial and commerce share the same visual grammar
 * so the conversion handoff feels native, not bolted on.
 */
export default function ProductCTAStrip({ slugs, max = 2 }: ProductCTAStripProps) {
  // Hide the strip until the official drop date.
  if (new Date() < LAUNCH_DATE) return null;

  const all = getAllProducts();

  let products: Product[] = [];
  if (slugs && slugs.length > 0) {
    products = slugs
      .map((s) => all.find((p) => p.slug === s))
      .filter((p): p is Product => Boolean(p));
  }
  if (products.length === 0) {
    products = all.filter((p) => p.status === "in-stock").slice(0, max);
  }
  products = products.slice(0, max);

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="article-gear"
      className="mt-16 pt-12 border-t border-white/10"
    >
      <p
        id="article-gear"
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-8"
      >
        // GEAR WORN IN THIS TRAINING
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 border border-white/5 mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {product.status === "sold-out" && (
                <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase bg-black/90 text-white/80 px-3 py-1.5 border border-white/10">
                  SOLD OUT
                </span>
              )}
            </div>
            <h3 className="font-sans font-bold uppercase tracking-[0.05em] text-base text-white group-hover:text-white/75 transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 font-mono text-[13px] text-white/50">
              ${product.price.toFixed(2)}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="ml-2 text-white/30 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
              Shop -→
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

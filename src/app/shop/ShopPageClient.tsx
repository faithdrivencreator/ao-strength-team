"use client";

import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const products = getAllProducts();

// Featured on-model shot per collection (woman, man, woman) for visual variety.
const MODEL_SHOTS: Record<string, { front: string; back: string }> = {
  "ao-cornerstone": {
    front: "/images/models/cornerstone/woman-front.webp",
    back: "/images/models/cornerstone/woman-back.webp",
  },
  "ao-croptop": {
    front: "/images/models/croptop/woman-front.webp",
    back: "/images/products/croptop/black-white.webp",
  },
  "ao-warpaint": {
    front: "/images/models/warpaint/man-front.webp",
    back: "/images/models/warpaint/man-back.webp",
  },
  "ao-unbreakable": {
    front: "/images/models/unbreakable/woman-front.webp",
    back: "/images/models/unbreakable/woman-back.webp",
  },
};

export default function ShopPageClient() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Hero band */}
        <div className="mb-14 lg:mb-20">
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase mb-5">
            // FIRST DROP · JUNE 2, 2026
          </p>

          <h1 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95]">
            FAITH-GROUNDED PERFORMANCE
          </h1>

          <p className="mt-6 max-w-[52ch] text-[15px] md:text-base leading-relaxed text-white/55">
            Three collections. One foundation. Built to train in, built to believe in.
          </p>

          <div className="mt-8 max-w-[52ch]">
            <div className="h-px w-12 bg-white/15 mb-3" />
            <p className="font-mono text-[11px] tracking-[0.05em] text-white/45">
              10% of every order goes to the charity you choose at checkout.
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const shots = MODEL_SHOTS[product.slug];
            return (
              <ProductCard
                key={product.slug}
                product={product}
                priority={i < 3}
                onModelFront={shots?.front}
                onModelBack={shots?.back}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

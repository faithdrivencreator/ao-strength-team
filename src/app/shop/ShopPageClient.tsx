"use client";

import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const products = getAllProducts();

// Featured on-model cover per collection, balanced 2 male / 2 female across the
// four cards: Warpaint (man), Unbreakable (woman), Cornerstone (man), Crop Top
// (woman). Crop Top is women's only, so Cornerstone carries the second male.
const MODEL_SHOTS: Record<string, { front: string; back: string }> = {
  "ao-cornerstone": {
    front: "/images/models/cornerstone/man-front.webp",
    back: "/images/models/cornerstone/man-back.webp",
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

        {/* Product grid - four collections in a balanced 2 x 2 on desktop.
            Constrained width so the cards read as large editorial tiles
            rather than stretching the full 1440 container. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-[1120px] mx-auto">
          {products.map((product, i) => {
            const shots = MODEL_SHOTS[product.slug];
            return (
              <ProductCard
                key={product.slug}
                product={product}
                priority={i < 4}
                onModelFront={shots?.front}
                onModelBack={shots?.back}
              />
            );
          })}
        </div>

        {/* Quiet teaser - this is only the first drop */}
        <div className="mt-20 lg:mt-28 flex flex-col items-center text-center">
          <div className="h-px w-12 bg-white/15 mb-5" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase mb-3">
            // THIS IS THE FIRST DROP
          </p>
          <p className="max-w-[44ch] text-[13px] leading-relaxed text-white/45">
            More collections are in the forge. Join the team below to hear when the next one drops.
          </p>
        </div>
      </div>
    </section>
  );
}

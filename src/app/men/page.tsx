import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Men's | Alpha Omega Strength Team",
  description:
    "Men's faith-forged training gear. Warpaint, Unbreakable, and Cornerstone, cut for men. Built to train in, built to believe in.",
};

const MENS = [
  { slug: "ao-warpaint", front: "/images/models/warpaint/man-front.webp", back: "/images/models/warpaint/man-back.webp" },
  { slug: "ao-unbreakable", front: "/images/models/unbreakable/man-front.webp", back: "/images/models/unbreakable/man-back.webp" },
  { slug: "ao-cornerstone", front: "/images/models/cornerstone/man-front.webp", back: "/images/models/cornerstone/man-back.webp" },
];

export default function MensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Strength Team</p>
        <h1 className="mt-2 font-sans font-black text-5xl md:text-7xl uppercase tracking-tight text-white">Men&apos;s</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENS.map(({ slug, front, back }, i) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <ProductCard
                key={slug}
                product={product}
                priority={i < 3}
                onModelFront={front}
                onModelBack={back}
                fit="mens"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

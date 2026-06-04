import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Women's | Alpha Omega Strength Team",
  description:
    "Women's faith-forged training gear. Warpaint, Unbreakable, Cornerstone, and the Cornerstone Crop, cut for women. Built to train in, built to believe in.",
};

const WOMENS = [
  { slug: "ao-warpaint", front: "/images/models/warpaint/woman-front.webp", back: "/images/models/warpaint/woman-back.webp" },
  { slug: "ao-unbreakable", front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
  { slug: "ao-cornerstone", front: "/images/models/cornerstone/woman-front.webp", back: "/images/models/cornerstone/woman-back.webp" },
  { slug: "ao-croptop", front: "/images/models/croptop/woman-front.webp", back: undefined },
];

export default function WomensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Strength Team</p>
        <h1 className="mt-2 font-sans font-black text-5xl md:text-7xl uppercase tracking-tight text-white">Women&apos;s</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WOMENS.map(({ slug, front, back }, i) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <ProductCard
                key={slug}
                product={product}
                priority={i < 3}
                onModelFront={front}
                onModelBack={back}
                fit="womens"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

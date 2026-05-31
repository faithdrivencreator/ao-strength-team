"use client";

import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const products = getAllProducts();

export default function ShopPageClient() {
  const filtered = products;

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <p className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase mb-4">
          // SHOP
        </p>

        {/* Heading */}
        <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-10">
          PRODUCTS
        </h1>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const products = getAllProducts();

type Filter = "ALL" | "TEES" | "LONG SLEEVES";

const filters: Filter[] = ["ALL", "TEES", "LONG SLEEVES"];

function filterCategory(filter: Filter): string | null {
  if (filter === "TEES") return "tees";
  if (filter === "LONG SLEEVES") return "long-sleeves";
  return null;
}

export default function ShopPageClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const category = filterCategory(activeFilter);
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

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

        {/* Filter bar */}
        <div className="flex gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 ${
                activeFilter === f
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

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

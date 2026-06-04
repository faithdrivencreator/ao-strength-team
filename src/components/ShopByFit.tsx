"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const TILES = [
  { label: "Men's", href: "/men", image: "/images/models/warpaint/man-front.webp" },
  { label: "Women's", href: "/women", image: "/images/models/warpaint/woman-front.webp" },
  { label: "Shop All", href: "/shop", image: "/images/lifestyle/couple-walkout.webp" },
];

export default function ShopByFit() {
  return (
    <section className="relative py-20 md:py-24 bg-[#0a0a0a]">
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-white mb-12"
        >
          Shop by Fit
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={tile.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <Image
                  src={tile.image}
                  alt={`${tile.label} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-sans font-black text-3xl uppercase tracking-tight text-white">
                    {tile.label}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-white/80">
                    Shop Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="translate-x-0 group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

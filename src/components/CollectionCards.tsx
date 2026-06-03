"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/data/products";

/* ------------------------------------------------------------------ */
/* Local collection config (display layer)                            */
/* ------------------------------------------------------------------ */

interface Colorway {
  /** kebab-case file stem, e.g. "natural-black" */
  key: string;
  /** display name in mono uppercase, e.g. "NATURAL / BLACK" */
  name: string;
  ssImage: string;
  lsImage: string;
}

interface CollectionConfig {
  slug: string;
  displayName: string;
  descriptor: string;
  index: string;
  /** ordered colorways; index 0 is the hero shown on the card faces */
  colorways: Colorway[];
}

const PRICE_LABEL = "From $34.99";

/** Build a Colorway from a collection folder + file stem. */
function cw(collection: string, key: string): Colorway {
  return {
    key,
    name: key.split("-").join(" / ").toUpperCase(),
    ssImage: `/images/products/${collection}/short-sleeve/${key}.webp`,
    lsImage: `/images/products/${collection}/long-sleeve/${key}.webp`,
  };
}

const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "ao-warpaint",
    displayName: "WARPAINT",
    descriptor: "Hand-painted mark",
    index: "01",
    // Hero: military green / black (warm charcoal emblem) - leads the trio (Pete's pick for the cover)
    colorways: [
      cw("warpaint", "military-green-black"),
      cw("warpaint", "military-green-white"),
      cw("warpaint", "natural-black"),
      cw("warpaint", "natural-gray"),
      cw("warpaint", "asphalt-white"),
      cw("warpaint", "black-white"),
      cw("warpaint", "white-black"),
      cw("warpaint", "white-gray"),
    ],
  },
  {
    slug: "ao-unbreakable",
    displayName: "UNBREAKABLE",
    descriptor: "Forged to not bend",
    index: "02",
    // Hero: asphalt / black (charcoal) - leads the trio
    colorways: [
      cw("unbreakable", "asphalt-black"),
      cw("unbreakable", "black-gray"),
      cw("unbreakable", "black-white"),
      cw("unbreakable", "white-black"),
      cw("unbreakable", "military-green-black"),
      cw("unbreakable", "military-green-white"),
    ],
  },
  {
    slug: "ao-cornerstone",
    displayName: "CORNERSTONE",
    descriptor: "A foundation that holds",
    index: "03",
    // Hero: black / gray - leads the trio
    colorways: [
      cw("cornerstone", "black-gray"),
      cw("cornerstone", "black-white"),
      cw("cornerstone", "white-black"),
      cw("cornerstone", "white-gray"),
      cw("cornerstone", "asphalt-black"),
      cw("cornerstone", "asphalt-white"),
      cw("cornerstone", "natural-black"),
      cw("cornerstone", "natural-gray"),
      cw("cornerstone", "military-green-black"),
      cw("cornerstone", "military-green-white"),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export default function CollectionCards({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
      {COLLECTIONS.map((config, index) => {
        const product = products.find((p) => p.slug === config.slug);
        return (
          <CollectionCard
            key={config.slug}
            config={config}
            product={product}
            index={index}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single flip card                                                   */
/* ------------------------------------------------------------------ */

function CollectionCard({
  config,
  product,
  index,
}: {
  config: CollectionConfig;
  product?: Product;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const soldOut = product?.status === "sold-out";

  const colorways = config.colorways;
  const hero = colorways[0];
  // Cap the visible thumbnail strip; remainder shows as a "+N" mono label.
  const MAX_VISIBLE = 5;
  const visibleColorways = colorways.slice(0, MAX_VISIBLE);
  const overflowCount = colorways.length - visibleColorways.length;

  const flipperClass = prefersReducedMotion
    ? ""
    : flipped
      ? "transition-transform duration-700 [transform:rotateY(180deg)]"
      : "transition-transform duration-700 group-hover:[transform:rotateY(180deg)]";

  // With reduced motion we still flip on the explicit toggle, just without the
  // animated rotation, so the back content is reachable.
  const reducedFlipClass =
    prefersReducedMotion && flipped ? "[transform:rotateY(180deg)]" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="group">
        {/* Flip viewport */}
        <div className="relative aspect-[3/4] [perspective:1200px]">
          <div
            className={`relative h-full w-full [transform-style:preserve-3d] ${flipperClass} ${reducedFlipClass}`}
          >
            {/* FRONT - short sleeve */}
            <Link
              href={`/products/${config.slug}`}
              aria-label={`View the ${config.displayName} collection`}
              className="absolute inset-0 block overflow-hidden bg-ink-deep border border-white/5 [backface-visibility:hidden] outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]"
            >
              <Image
                src={hero.ssImage}
                alt={`${config.displayName} short sleeve in ${hero.name}`}
                fill
                sizes="(max-width:768px) 90vw, 33vw"
                className="object-cover select-none"
                draggable={false}
              />

              {/* Collection pill - top left */}
              <span className="absolute top-4 left-4 inline-flex items-center bg-ink/80 backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">
                // {config.index} COLLECTION
              </span>

              {/* Sold out badge - top right */}
              {soldOut && (
                <span className="absolute top-4 right-4 font-mono text-[11px] tracking-[0.15em] uppercase bg-black/90 text-white/80 px-4 py-2 border border-white/10">
                  SOLD OUT
                </span>
              )}

              {/* Sleeve label - bottom left */}
              <span className="absolute bottom-4 left-4 inline-flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DCC8]">
                SHORT SLEEVE
              </span>

              {/* Hover-reveal CTA bar */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/80 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white opacity-0 translate-y-2 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              >
                VIEW COLLECTION &rarr;
              </span>
            </Link>

            {/* BACK - long sleeve */}
            <Link
              href={`/products/${config.slug}`}
              aria-label={`View the ${config.displayName} collection`}
              className="absolute inset-0 block overflow-hidden bg-ink-deep border border-white/5 [backface-visibility:hidden] [transform:rotateY(180deg)] outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]"
            >
              <Image
                src={hero.lsImage}
                alt={`${config.displayName} long sleeve in ${hero.name}`}
                fill
                sizes="(max-width:768px) 90vw, 33vw"
                className="object-cover select-none"
                draggable={false}
              />

              {/* Sleeve label - bottom left */}
              <span className="absolute bottom-4 left-4 inline-flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DCC8]">
                LONG SLEEVE
              </span>
            </Link>

            {/* Flip toggle - bottom right, sits above both faces */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFlipped((f) => !f);
              }}
              aria-label={flipped ? "View the short sleeve" : "View the long sleeve"}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 bg-ink/80 backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-white/80 outline-none transition-transform duration-150 hover:text-white hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-[#E8DCC8] active:scale-100 [transform:translateZ(1px)]"
            >
              <span className={flipped ? "text-white/40" : "text-[#E8DCC8]"}>SS</span>
              <span className="text-white/30">/</span>
              <span className={flipped ? "text-[#E8DCC8]" : "text-white/40"}>LS</span>
            </button>
          </div>
        </div>

        {/* Color options - real-garment thumbnail strip */}
        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              {colorways.length} Colors
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#E8DCC8]">
              {hero.name}
            </span>
          </div>
          <Link
            href={`/products/${config.slug}`}
            aria-label={`See all ${colorways.length} colors in the ${config.displayName} collection`}
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]"
          >
            {visibleColorways.map((color, i) => (
              <span
                key={color.key}
                className={`relative block h-[50px] w-[40px] shrink-0 overflow-hidden bg-ink-deep border ${
                  i === 0 ? "border-[#E8DCC8]/70" : "border-white/10"
                }`}
              >
                <Image
                  src={color.ssImage}
                  alt={`${config.displayName} in ${color.name}`}
                  fill
                  sizes="40px"
                  className="object-cover select-none"
                  draggable={false}
                />
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="flex h-[50px] w-[40px] shrink-0 items-center justify-center bg-ink border border-white/10 font-mono text-[11px] tracking-[0.05em] text-white/60">
                +{overflowCount}
              </span>
            )}
          </Link>
        </div>

        {/* Footer - never rotates */}
        <div className="mt-6 space-y-2">
          <h3 className="font-sans font-bold text-base uppercase tracking-[0.05em] text-white">
            {config.displayName}
          </h3>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/40">
            {config.descriptor}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-white/60">{PRICE_LABEL}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

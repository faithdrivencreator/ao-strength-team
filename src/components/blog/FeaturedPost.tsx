"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { BlogPost } from "@/lib/blog";

interface FeaturedPostProps {
  post: BlogPost;
}

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

/**
 * Rapha-style featured hero. The title overlays the image at bottom-left
 * with a soft gradient mask only behind the text (not the whole image).
 *
 * Pattern: full-bleed aspect-[3/2] hero, title fused into the image, single
 * mono eyebrow above title in `// TAG - MONTH YYYY` format.
 */
export default function FeaturedPost({ post }: FeaturedPostProps) {
  const primaryTag = post.tags?.[0];
  const monthYear = MONTH_FORMATTER.format(new Date(post.date)).toUpperCase();
  const eyebrow = primaryTag
    ? `// ${primaryTag.toUpperCase()} - ${monthYear}`
    : `// ${monthYear}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative aspect-[3/2] w-full overflow-hidden bg-neutral-950"
      >
        {post.mainImage ? (
          <Image
            src={post.mainImage.src}
            alt={post.mainImage.alt || post.title}
            fill
            preload
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
        )}

        {/* Gradient mask - only behind the text band at the bottom. Not a full overlay. */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Text block - bottom-left, journal-style */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-[820px]">
              <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-white/70 mb-5">
                {eyebrow}
              </p>
              <h2 className="font-sans font-black uppercase tracking-tight leading-[1.02] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                {post.title}
              </h2>
            </div>
            <span
              className="hidden sm:inline-flex shrink-0 items-center font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-white/70 group-hover:text-white transition-colors duration-300 pb-2"
              aria-hidden="true"
            >
              Read&nbsp;-&nbsp;→
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { BlogPost } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
  index?: number;
  /** Compact = related posts strip. Default = archive grid card. */
  variant?: "default" | "compact";
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/**
 * Field-journal grid card. Title below image, single mono eyebrow above title,
 * mono date below. No tag pills, no excerpt, no author at this level — let the
 * title carry the card. (Buck Mason / Tracksmith pattern.)
 */
export default function PostCard({ post, index = 0, variant = "default" }: PostCardProps) {
  const primaryTag = post.tags?.[0];
  const formattedDate = DATE_FORMATTER.format(new Date(post.date)).toUpperCase();

  const titleSize =
    variant === "compact"
      ? "text-lg md:text-xl"
      : "text-xl md:text-[22px]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
      >
        {/* Image — 4:3 editorial crop, no text overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 mb-5">
          {post.mainImage ? (
            <Image
              src={post.mainImage.src}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
          )}
        </div>

        {/* Mono eyebrow — single primary tag, replaces the old pill array */}
        {primaryTag && (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
            // {primaryTag.toUpperCase()}
          </p>
        )}

        {/* Title — title-only, no duplicate overlay */}
        <h3
          className={`font-sans font-bold uppercase tracking-tight leading-[1.15] text-white group-hover:text-white/75 transition-colors duration-200 ${titleSize}`}
        >
          {post.title}
        </h3>

        {/* Date — mono, secondary. No author here. */}
        <time
          dateTime={post.date}
          className="block mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35"
        >
          {formattedDate}
        </time>
      </Link>
    </motion.article>
  );
}

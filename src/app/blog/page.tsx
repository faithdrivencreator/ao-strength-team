import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Word and The Work — Journal | Alpha Omega Strength Team",
  description:
    "Training journal from Alpha Omega Strength Team. Faith, fitness, and the pursuit of strength with purpose.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...remaining] = posts;

  return (
    <section className="pb-24">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-8 md:px-16 pt-20 pb-16 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-6">
            // THE JOURNAL
          </p>
          <h1 className="font-sans text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            THE WORD AND THE WORK
          </h1>
          <p className="font-sans text-base md:text-lg font-light text-white/50 max-w-[640px] mx-auto leading-relaxed">
            Faith. Fitness. Purpose. Writing from the front lines of training and walking with God.
          </p>
        </div>
      </div>

      {/* ── Posts Grid ───────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-8 md:px-16 pt-16">
        {/* Featured Post (latest) */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-16">
            <article>
              {/* Hero image */}
              <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden mb-8">
                {featured.mainImage && (
                  <Image
                    src={urlFor(featured.mainImage).width(1600).height(686).url()}
                    alt={featured.mainImage.alt || featured.title}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 border border-white/20 px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-3 group-hover:text-white/90 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-sans text-base md:text-lg font-light text-white/60 max-w-[720px] leading-relaxed line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <time className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/30">
                    ·
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
                    By {featured.author}
                  </span>
                </div>
                <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors">
                  Read More →
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* Divider */}
        <div className="border-t border-white/10 mb-16" />

        {/* Remaining posts — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {remaining.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article>
                {/* Hero image */}
                <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden mb-6">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(450).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-sans text-lg md:text-xl font-bold leading-tight text-white group-hover:text-white/90 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* Date */}
                <time className="block font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-3">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                {/* Title */}
                <h3 className="font-sans text-xl font-bold leading-tight mb-3 group-hover:text-white/80 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-sans text-base font-light text-white/60 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author + Read More */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
                    By {post.author}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors">
                    Read More →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

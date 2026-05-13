import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostCard from "@/components/blog/PostCard";
import TagFilter from "@/components/blog/TagFilter";
import NewsletterInline from "@/components/blog/NewsletterInline";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";

interface PageProps {
  searchParams?: Promise<{ tag?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = (await searchParams) ?? {};
  const rawTag = Array.isArray(sp.tag) ? sp.tag[0] : sp.tag;
  const tag = typeof rawTag === "string" && rawTag.trim() ? rawTag.trim() : undefined;

  const baseTitle = "The Journal — The Word and The Work";
  const title = tag ? `${tag} — Journal` : baseTitle;
  const description = tag
    ? `Journal entries tagged ${tag}. Faith-rooted training notes from Alpha Omega Strength Team.`
    : "Field journal of the Alpha Omega Strength Team. Faith. Fitness. The discipline of finishing what you start.";

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
      types: {
        "application/rss+xml": `${SITE_URL}/blog/rss.xml`,
      },
    },
    // Tag-filtered views set noindex so they don't dilute the main index.
    robots: tag ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: tag ? `${SITE_URL}/blog?tag=${encodeURIComponent(tag)}` : `${SITE_URL}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const rawTag = Array.isArray(sp.tag) ? sp.tag[0] : sp.tag;
  const activeTag = typeof rawTag === "string" && rawTag.trim() ? rawTag.trim() : undefined;

  const allPosts = await getAllPosts();
  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags ?? []).filter(Boolean)),
  ).sort();

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.tags?.includes(activeTag))
    : allPosts;

  const [featured, ...remaining] = filteredPosts;

  // BreadcrumbList JSON-LD — Home > Journal
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
    ],
  };

  // Blog collection JSON-LD — helps Google understand the index
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Word and The Work — Alpha Omega Strength Team Journal",
    url: `${SITE_URL}/blog`,
    description:
      "Field journal of the Alpha Omega Strength Team. Faith. Fitness. The discipline of finishing what you start.",
    publisher: {
      "@type": "Organization",
      name: "Alpha Omega Strength Team",
      url: SITE_URL,
    },
    blogPost: allPosts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
    })),
  };

  return (
    <section className="pb-32 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* ════════════════════════════════════════════════════════════
          MASTHEAD — left-aligned, newspaper-style
      ════════════════════════════════════════════════════════════ */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 pt-20 md:pt-24 pb-12 md:pb-16">
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-8">
            // THE WORD AND THE WORK
          </p>
          <h1 className="font-sans font-black uppercase tracking-tight leading-[0.92] text-6xl md:text-7xl lg:text-[88px]">
            The Journal
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base md:text-lg font-light text-white/55 leading-relaxed">
            Field notes from the team — scripture, training, and the work of
            finishing strong. New entries weekly.
          </p>

          {/* Tag filter — only render when there are tags */}
          {allTags.length > 0 && (
            <div className="mt-10">
              <TagFilter tags={allTags} activeTag={activeTag} />
            </div>
          )}
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          FEATURED POST — Rapha-style title overlay
      ════════════════════════════════════════════════════════════ */}
      {featured && (
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 pt-12 md:pt-16">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          RECENT ENTRIES — 3-col grid
      ════════════════════════════════════════════════════════════ */}
      {remaining.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 mt-20 md:mt-24">
          <div className="flex items-baseline justify-between border-t border-white/10 pt-10 mb-12 md:mb-16 gap-6">
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40">
              // RECENT ENTRIES
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
              {filteredPosts.length} {filteredPosts.length === 1 ? "ENTRY" : "ENTRIES"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 md:gap-y-16">
            {remaining.map((post, i) => {
              // Drop a newsletter card after the 5th archive card for breathing room.
              if (i === 4 && remaining.length > 5) {
                return (
                  <div key={`__nl_${post.slug}`} className="contents">
                    <div className="hidden lg:block">
                      <NewsletterInline />
                    </div>
                    <PostCard post={post} index={i} />
                  </div>
                );
              }
              return <PostCard key={post.slug} post={post} index={i} />;
            })}
          </div>
        </div>
      )}

      {/* If filter returns nothing */}
      {filteredPosts.length === 0 && (
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
            // NO ENTRIES
          </p>
          <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-4xl mb-4">
            Nothing here yet.
          </h2>
          <p className="font-sans text-white/55 max-w-md">
            Try a different tag, or{" "}
            <Link
              href="/blog"
              className="text-white underline underline-offset-4 hover:text-white/80"
            >
              view all entries
            </Link>
            .
          </p>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          NEWSLETTER — mid-archive CTA (always at the bottom on mobile)
      ════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[920px] px-8 md:px-16 lg:px-20 mt-24 md:mt-28 lg:hidden">
        <NewsletterInline />
      </div>

      {/* ════════════════════════════════════════════════════════════
          RSS LINK — mono footnote
      ════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 mt-24 md:mt-28 pt-10 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog/rss.xml"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 hover:text-white transition-colors"
          >
            // SUBSCRIBE VIA RSS →
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
            EST. 2026 / ALPHA OMEGA STRENGTH TEAM
          </p>
        </div>
      </div>
    </section>
  );
}

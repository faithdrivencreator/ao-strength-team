import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { getAllPosts, getPost, type BlogPost } from "@/lib/blog";
import { getReadingTimeMinutes, getWordCount, getBodyExcerpt } from "@/lib/reading-time";
import { getAuthorOrFallback } from "@/data/authors";

import PostCard from "@/components/blog/PostCard";
import Tldr from "@/components/blog/Tldr";
import FAQ, { type FAQItem } from "@/components/blog/FAQ";
import NewsletterInline from "@/components/blog/NewsletterInline";
import ProductCTAStrip from "@/components/blog/ProductCTAStrip";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogPostWithExtras extends BlogPost {
  /** Optional Sanity field — gracefully missing today. */
  tldr?: string[];
  modifiedDate?: string;
  series?: string;
  seriesNumber?: number;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const description = post.seoDescription || post.excerpt;
  const ogImage = post.mainImage?.src;

  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.mainImage?.alt || post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   PortableText components — editorial body styling
   H1 lives only in the article header (strict hierarchy).
   ───────────────────────────────────────────────────────────── */
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-4xl leading-[1.1] mt-14 mb-6 text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans font-bold uppercase tracking-tight text-2xl md:text-3xl leading-[1.15] mt-12 mb-5 text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans font-bold text-xl md:text-2xl leading-tight mt-10 mb-4 text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-white/60 pl-8 my-12 font-sans text-xl md:text-2xl text-white/85 leading-[1.5] font-light not-italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-lg leading-8 text-white/80 mb-7">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({
      value,
    }: {
      value: {
        asset?: { url?: string };
        src?: string;
        alt?: string;
        caption?: string;
        width?: number;
        height?: number;
      };
    }) => {
      const src = value.asset?.url || value.src;
      if (!src) return null;
      return (
        <figure className="my-12 -mx-2 md:mx-0">
          <div className="relative w-full">
            <Image
              src={src}
              alt={value.alt || ""}
              width={value.width ?? 1440}
              height={value.height ?? 960}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              // {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

/* ─────────────────────────────────────────────────────────────
   PortableText helpers — extract FAQ + first body sentences
   ───────────────────────────────────────────────────────────── */

interface PTSpan {
  _type: "span";
  text?: string;
}
interface PTBlock {
  _type: string;
  style?: string;
  children?: PTSpan[];
}

function blockText(block: PTBlock): string {
  if (!Array.isArray(block.children)) return "";
  return block.children
    .filter((c) => c._type === "span" && typeof c.text === "string")
    .map((c) => c.text as string)
    .join("");
}

const FAQ_HEADING_REGEX = /^\s*(faq|frequently\s+asked\s+questions?|questions?\s+answered)\b/i;

/**
 * Walk the PortableText body and pull out an FAQ section if one exists.
 *
 * Convention: H2 reading "FAQ" / "Frequently Asked Questions" followed by
 * H3 question headings, each with one or more paragraphs of answer beneath.
 *
 * Returns [] if no FAQ section is found — the component renders nothing in that case.
 */
function extractFAQ(body: readonly unknown[] | undefined | null): FAQItem[] {
  if (!body) return [];
  const blocks = body as unknown as PTBlock[];
  const items: FAQItem[] = [];

  let inFAQ = false;
  let currentQ: string | null = null;
  let currentA: string[] = [];

  const flush = () => {
    if (currentQ && currentA.length > 0) {
      items.push({ question: currentQ, answer: currentA.join(" ").trim() });
    }
    currentQ = null;
    currentA = [];
  };

  for (const block of blocks) {
    if (block._type !== "block") continue;
    const text = blockText(block).trim();
    if (!text) continue;

    if (block.style === "h2") {
      // Entering or leaving FAQ section
      if (FAQ_HEADING_REGEX.test(text)) {
        flush();
        inFAQ = true;
        continue;
      }
      // A new non-FAQ H2 ends the FAQ section
      if (inFAQ) {
        flush();
        inFAQ = false;
      }
      continue;
    }

    if (!inFAQ) continue;

    if (block.style === "h3") {
      flush();
      currentQ = text;
    } else if (block.style === "normal" || block.style === undefined) {
      if (currentQ) currentA.push(text);
    }
  }
  flush();

  return items;
}

/**
 * Derive 3-5 bullet TL;DR from the post.
 *
 * Priority order:
 *   1. Sanity `tldr` field if present (array of strings).
 *   2. Excerpt split into sentences (one sentence per bullet) + first H2 if room.
 *   3. First few paragraph sentences.
 */
function deriveTldr(post: BlogPostWithExtras): string[] {
  if (Array.isArray(post.tldr) && post.tldr.length > 0) {
    return post.tldr.slice(0, 5);
  }

  const bullets: string[] = [];
  const seen = new Set<string>();

  const push = (s: string) => {
    const t = s.trim().replace(/\s+/g, " ");
    if (!t || seen.has(t)) return;
    seen.add(t);
    bullets.push(t);
  };

  // From excerpt — split by sentence terminator.
  if (post.excerpt) {
    const sentences = post.excerpt.split(/(?<=[.!?])\s+/).filter(Boolean);
    sentences.forEach(push);
  }

  // Backfill from first body H2 + first paragraph if we don't have 3 yet.
  const blocks = (post.body as unknown as PTBlock[]) || [];
  if (bullets.length < 3) {
    for (const block of blocks) {
      if (bullets.length >= 4) break;
      if (block._type !== "block") continue;
      const text = blockText(block).trim();
      if (!text) continue;
      if (block.style === "h2") {
        push(text.replace(/[.!?]+$/, ""));
      } else if (block.style === "normal" || block.style === undefined) {
        const first = text.split(/(?<=[.!?])\s+/)[0];
        if (first && first.length > 30) push(first);
      }
    }
  }

  return bullets.slice(0, 5);
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getPost(slug)) as BlogPostWithExtras | null;

  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const author = getAuthorOrFallback(post.author);
  const primaryTag = post.tags?.[0];
  const wordCount = getWordCount(post.body);
  const readingTime = getReadingTimeMinutes(post.body);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const monoDate = new Date(post.date)
    .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    .toUpperCase();

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  const tldrBullets = deriveTldr(post);
  const faqItems = extractFAQ(post.body);

  // ── JSON-LD: Article (BlogPosting) ──────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.mainImage ? [post.mainImage.src] : undefined,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    wordCount,
    articleSection: primaryTag || "Journal",
    articleBody: post.excerpt || getBodyExcerpt(post.body, 300),
    keywords: post.tags?.join(", "),
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}${author.url || "/about"}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Alpha Omega Strength Team",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/products/signature-tee-1.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  // ── JSON-LD: BreadcrumbList ─────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  // ── JSON-LD: FAQPage (only when FAQs exist) ─────────────────
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="pb-32 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ════════════════════════════════════════════════════════════
          POST HEADER — left-aligned, journal-style
      ════════════════════════════════════════════════════════════ */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-8 md:px-16 lg:px-20 pt-12 pb-14 md:pb-16">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 hover:text-white transition-colors mb-12"
          >
            ← Back to Journal
          </Link>

          {/* Two-level eyebrow */}
          {post.series && (
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30 mb-2">
              // {post.series.toUpperCase()}
              {post.seriesNumber
                ? ` — PART ${String(post.seriesNumber).padStart(2, "0")}`
                : ""}
            </p>
          )}
          {primaryTag && (
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 mb-6">
              // {primaryTag.toUpperCase()}
            </p>
          )}

          {/* H1 — left-aligned, this is the single biggest credibility change */}
          <h1 className="font-sans font-black uppercase tracking-tight leading-[1.02] text-4xl md:text-5xl lg:text-[64px] max-w-[1000px]">
            {post.title}
          </h1>

          {/* Meta row — mono, single line. Date + author + reading time + word count */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-white/45">
            <time dateTime={post.date}>{monoDate}</time>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>{author.name}</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>{readingTime} MIN READ</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>{wordCount.toLocaleString()} WORDS</span>
            {post.modifiedDate && post.modifiedDate !== post.date && (
              <>
                <span aria-hidden="true" className="text-white/20">/</span>
                <span className="text-white/35">
                  UPDATED{" "}
                  {new Date(post.modifiedDate)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    .toUpperCase()}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          HERO IMAGE — full-bleed cinematic banner, no overlay.
          If the file is missing the dark placeholder shows through.
      ════════════════════════════════════════════════════════════ */}
      {post.mainImage && (
        <div className="relative w-full aspect-[3/1] bg-neutral-950 overflow-hidden">
          <Image
            src={post.mainImage.src}
            alt={post.mainImage.alt || post.title}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          BODY COLUMN — 720px editorial column
      ════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[720px] px-6 md:px-8 pt-14 md:pt-20">
        {/* TL;DR — always visible (derived if no Sanity field) */}
        <Tldr bullets={tldrBullets} />

        {/* Lead-in — formatted excerpt as a quiet drop cap intro */}
        {post.excerpt && (
          <p className="font-sans text-xl md:text-[22px] text-white/80 leading-[1.55] font-light mb-12 pb-12 border-b border-white/10">
            {post.excerpt}
          </p>
        )}

        {/* Article body */}
        <div className="article-prose">
          <PortableText value={post.body as PortableTextBlock[]} components={portableTextComponents} />
        </div>

        {/* FAQ — only when present in body */}
        <FAQ items={faqItems} />

        {/* Gear strip — fallback to in-stock products */}
        <ProductCTAStrip />

        {/* Newsletter inline */}
        <div className="mt-16">
          <NewsletterInline
            eyebrow="// STAY IN IT"
            headline="The Weekly Discipline."
            copy="Scripture, training, and first access to every new drop. One short read every Sunday morning."
          />
        </div>

        {/* Share + tags — mono, no icons */}
        <div className="mt-14 pt-10 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Share
          </span>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
          >
            X / Twitter
          </a>
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
              Tags
            </span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 border border-white/15 px-3 py-1.5 hover:border-white/40 hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author bio — E-E-A-T signal */}
        {author.bio && (
          <aside className="mt-14 pt-12 border-t border-white/10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
              // WRITTEN BY
            </p>
            <div className="flex items-start gap-5">
              {author.portrait && (
                <Image
                  src={author.portrait}
                  alt={`${author.name} portrait`}
                  width={80}
                  height={80}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-1 ring-white/20 shrink-0"
                />
              )}
              <div>
                <h2 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl mb-2 text-white">
                  {author.name}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 mb-5">
                  {author.title}
                </p>
                <p className="font-sans text-base text-white/70 leading-[1.7] max-w-xl">
                  {author.bio}
                </p>
                {author.url && (
                  <Link
                    href={author.url}
                    className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
                  >
                    More about {author.name.split(" ")[0]} —→
                  </Link>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Date line at bottom */}
        <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
          PUBLISHED {formattedDate.toUpperCase()}
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════
          RELATED — 3-col, no title overlay (per spec)
      ════════════════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-white/10 mt-24 md:mt-28">
          <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-20 pt-16 md:pt-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 mb-12 md:mb-16">
              // MORE FROM THE JOURNAL
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
              {relatedPosts.map((related, i) => (
                <PostCard
                  key={related.slug}
                  post={related}
                  index={i}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

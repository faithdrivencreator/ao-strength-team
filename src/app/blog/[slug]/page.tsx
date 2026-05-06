import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getAllPosts, getPost } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle || `${post.title} | Alpha Omega Strength Team`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : undefined,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-sans text-3xl md:text-4xl font-black leading-tight tracking-tight mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans text-2xl md:text-3xl font-bold leading-tight tracking-tight mt-10 mb-5">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-xl md:text-2xl font-bold leading-tight mt-8 mb-4">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/30 pl-6 my-8 font-sans text-lg italic text-white/70 leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-lg leading-8 text-white/80 mb-6">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => (
      <div className="my-10">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const postUrl = `https://aostrengthteam.store/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="pb-24">
      {/* ── Post Header ──────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-8 md:px-16 pt-12 pb-16">
          <Link
            href="/blog"
            className="inline-block font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors mb-12"
          >
            ← Back to Journal
          </Link>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 border border-white/20 px-3 py-1 hover:border-white/40 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-center max-w-[960px] mx-auto mb-8">
            {post.title}
          </h1>

          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 text-center">
            By {post.author} · {formattedDate}
          </p>
        </div>
      </div>

      {/* ── Hero Image ───────────────────────────────────── */}
      {post.mainImage && (
        <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1600).height(686).url()}
            alt={post.mainImage.alt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* ── Article Body (Portable Text) ─────────────────── */}
      <div className="mx-auto max-w-[720px] px-8 md:px-16 py-16 md:py-20">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {/* ── Bottom Section ───────────────────────────────── */}
      <div className="mx-auto max-w-[720px] px-8 md:px-16">
        <div className="border-t border-white/10 pt-10 mb-10">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
              Share
            </span>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            >
              X / Twitter
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
            Tags
          </span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 border border-white/20 px-3 py-1 hover:border-white/40 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ── More from the Journal ────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-white/10 mt-8">
          <div className="mx-auto max-w-[1200px] px-8 md:px-16 pt-16">
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-10 text-center">
              // MORE FROM THE JOURNAL
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden mb-5">
                      {related.mainImage && (
                        <Image
                          src={urlFor(related.mainImage).width(600).height(338).url()}
                          alt={related.mainImage.alt || related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-sans text-base font-bold leading-tight text-white group-hover:text-white/90 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                      </div>
                    </div>

                    <time className="block font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      {new Date(related.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <p className="font-sans text-sm font-light text-white/60 leading-relaxed line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>

                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
                      By {related.author}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

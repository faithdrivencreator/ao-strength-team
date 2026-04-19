import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/data/blog-posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Alpha Omega Strength Team`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const postUrl = `https://alphaomegateam.com/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="pb-24">
      {/* ── Post Header ──────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-8 md:px-16 pt-12 pb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-block font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors mb-12"
          >
            ← Back to Journal
          </Link>

          {/* Tags */}
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

          {/* Title */}
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-center max-w-[960px] mx-auto mb-8">
            {post.title}
          </h1>

          {/* Author + Date */}
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 text-center">
            By {post.author} · {formattedDate}
          </p>
        </div>
      </div>

      {/* ── Article Body ─────────────────────────────────── */}
      <div className="mx-auto max-w-[720px] px-8 md:px-16 py-16 md:py-20">
        <div
          className="article-content text-lg leading-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* ── Bottom Section ───────────────────────────────── */}
      <div className="mx-auto max-w-[720px] px-8 md:px-16">
        {/* Share */}
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

        {/* Tags */}
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
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <article>
                    {/* Hero image placeholder */}
                    <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden mb-5">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-sans text-base font-bold leading-tight text-white group-hover:text-white/90 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                      </div>
                    </div>

                    {/* Date */}
                    <time className="block font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      {new Date(related.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>

                    {/* Excerpt */}
                    <p className="font-sans text-sm font-light text-white/60 leading-relaxed line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>

                    {/* Author */}
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

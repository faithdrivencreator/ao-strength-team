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

  const postUrl = `https://alphaomegateam.com/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[800px]">
          {/* Section tag */}
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-6">
            JOURNAL
          </p>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-block font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-10"
          >
            ← Back to The Word and The Work
          </Link>

          {/* Title */}
          <h1 className="font-sans text-[32px] md:text-[40px] font-900 leading-[1.1] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Date + Tags */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <time className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              {formattedDate}
            </time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="font-mono text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-1 hover:border-white/40 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Article content */}
          <div
            className="article-content mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Separator */}
          <div className="border-t border-white/10 pt-10 mb-10">
            {/* Share */}
            <div className="flex items-center gap-6 mb-10">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                Share
              </span>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                X / Twitter
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                Tags
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="font-mono text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-1 hover:border-white/40 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

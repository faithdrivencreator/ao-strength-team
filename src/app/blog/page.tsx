import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'The Word and The Work | Alpha Omega Strength Team',
  description:
    'Training journal from Alpha Omega Strength Team. Faith, fitness, and the pursuit of strength with purpose.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section tag */}
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
          TRAINING JOURNAL
        </p>

        {/* Section label */}
        <p className="separator mb-6">THE JOURNAL</p>

        {/* Heading */}
        <h1 className="font-sans text-[40px] md:text-[56px] font-900 leading-[1.1] tracking-tight mb-16">
          THE WORD AND THE WORK
        </h1>

        {/* Posts */}
        <div className="mx-auto max-w-[800px]">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={`py-10 ${index < posts.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              {/* Date */}
              <time className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              {/* Title */}
              <h2 className="mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-sans text-[24px] font-700 leading-tight hover:text-white/80 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="font-sans text-[15px] font-300 text-white/70 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${post.slug}`}
                className="font-mono text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

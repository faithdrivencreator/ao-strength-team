/**
 * Blog data accessors.
 *
 * Sanity CMS was previously the source of truth; the blog is now backed by a
 * hand-edited TypeScript file at `src/data/blog-posts.ts`. This module re-exports
 * the same names (`BlogPost`, `getAllPosts`, `getPost`, `getPostsByTag`) so that
 * existing consumers don't need to change their imports.
 *
 * Posts with a `date` later than today are hidden — drip-publish runs against the
 * ISR revalidate window on the blog list and detail pages (every 60s).
 *
 * The exported functions are synchronous internally but kept async to preserve
 * the existing call-sites that `await` them.
 */

import {
  blogPosts,
  getAllPosts as _getAllPosts,
  getPost as _getPost,
  getPostsByTag as _getPostsByTag,
  type BlogPost,
  type BlogPostImage,
} from "@/data/blog-posts";

export type { BlogPost, BlogPostImage };
export { blogPosts };

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isPublished(post: BlogPost, today: string): boolean {
  return post.date <= today;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const today = todayISO();
  return _getAllPosts().filter((p) => isPublished(p, today));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = _getPost(slug);
  if (!post) return null;
  if (!isPublished(post, todayISO())) return null;
  return post;
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const today = todayISO();
  return _getPostsByTag(tag).filter((p) => isPublished(p, today));
}

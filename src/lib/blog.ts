/**
 * Blog data accessors.
 *
 * Sanity CMS was previously the source of truth; the blog is now backed by a
 * hand-edited TypeScript file at `src/data/blog-posts.ts`. This module re-exports
 * the same names (`BlogPost`, `getAllPosts`, `getPost`, `getPostsByTag`) so that
 * existing consumers don't need to change their imports.
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

export async function getAllPosts(): Promise<BlogPost[]> {
  return _getAllPosts();
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  return _getPost(slug);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return _getPostsByTag(tag);
}

import { groq } from "next-sanity";
import type { QueryParams } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanity";

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: PortableTextBlock[];
  tags: string[];
  author: string;
  mainImage?: SanityImageSource & { alt?: string };
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const blogPostProjection = groq`
  _id,
  "slug": slug.current,
  title,
  date,
  excerpt,
  body,
  "tags": coalesce(tags, []),
  author,
  mainImage,
  featured,
  seoTitle,
  seoDescription
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  const result = await sanityClient.fetch<BlogPost[] | null>(
    groq`*[_type == "blogPost" && defined(slug.current)] | order(date desc) { ${blogPostProjection} }`,
  );
  return result ?? [];
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch<BlogPost | null>(
    groq`*[_type == "blogPost" && slug.current == $slug][0] { ${blogPostProjection} }`,
    { slug } as unknown as QueryParams,
  );
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const result = await sanityClient.fetch<BlogPost[] | null>(
    groq`*[_type == "blogPost" && $tag in tags] | order(date desc) { ${blogPostProjection} }`,
    { tag } as unknown as QueryParams,
  );
  return result ?? [];
}

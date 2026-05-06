#!/usr/bin/env node
/**
 * One-time migration: pull the 6 hardcoded blog posts from src/data/blog-posts.ts
 * and publish them to Sanity. HTML body content is converted to Portable Text via
 * @sanity/block-tools `htmlToBlocks`.
 *
 * Idempotent — uses createOrReplace with deterministic _id, safe to re-run.
 *
 * Requires:
 *   .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 *
 * Usage:
 *   node scripts/seed-blog-posts.mjs            # publish all
 *   node scripts/seed-blog-posts.mjs --dry-run  # show what would be published
 */
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

loadEnv({ path: ".env.local" });

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dryRun = process.argv.includes("--dry-run");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Minimal block-content schema mirroring src/sanity/schemas/blogPost.ts so block-tools
// knows which styles/marks are valid when converting HTML.
const defaultSchema = Schema.compile({
  name: "default",
  types: [
    {
      name: "blogPost",
      type: "document",
      fields: [
        {
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("blogPost")
  .fields.find((f) => f.name === "body").type;

function htmlToPortableText(html) {
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  });
}

// Pull the static blog posts from the existing TS file (parsed as JS via dynamic import).
// The TS file has `export interface` and `export const` — Node can't import .ts directly,
// so we read the file as text and extract the postsArray with a quick regex/eval.
const blogFilePath = resolve(__dirname, "../src/data/blog-posts.ts");
const blogFileSrc = readFileSync(blogFilePath, "utf8");

// Extract the array literal between `const blogPosts: BlogPost[] = ` and the next `];`
const arrayMatch = blogFileSrc.match(/const\s+blogPosts\s*:\s*BlogPost\[\]\s*=\s*(\[[\s\S]*?\n\];)/);
if (!arrayMatch) {
  console.error("Could not extract blogPosts array from src/data/blog-posts.ts");
  process.exit(1);
}
const arraySrc = arrayMatch[1].replace(/\];$/, "]");
const blogPosts = (0, eval)(`(${arraySrc})`);

console.log(`Found ${blogPosts.length} posts to migrate.`);

const results = [];
for (const post of blogPosts) {
  const body = htmlToPortableText(post.content);
  const doc = {
    _id: `blog-post-${post.slug}`,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    body,
    tags: post.tags,
    featured: false,
  };

  if (dryRun) {
    console.log(`[dry-run] Would publish: ${doc._id} (${body.length} blocks)`);
    results.push({ slug: post.slug, status: "dry-run" });
    continue;
  }

  try {
    await client.createOrReplace(doc);
    console.log(`✓ Published ${doc._id} (${body.length} blocks)`);
    results.push({ slug: post.slug, status: "ok" });
  } catch (err) {
    console.error(`✗ Failed ${doc._id}:`, err.message);
    results.push({ slug: post.slug, status: "error", error: err.message });
  }
}

console.log("\nDone:", results);

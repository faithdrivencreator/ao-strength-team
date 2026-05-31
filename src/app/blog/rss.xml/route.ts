import { getAllPosts } from "@/lib/blog";

export const revalidate = 600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aostrengthteam.store";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(s: string): string {
  // CDATA can't contain "]]>". Split it across two CDATA sections if it does.
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();

  const lastBuildDate = new Date().toUTCString();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = (post.tags ?? [])
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("");
      return [
        "<item>",
        `<title>${cdata(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<author>noreply@aostrengthteam.store (${escapeXml(post.author)})</author>`,
        `<description>${cdata(post.excerpt || "")}</description>`,
        categories,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>The Word and The Work - Alpha Omega Strength Team Journal</title>
<link>${SITE_URL}/blog</link>
<atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
<description>Field journal of the Alpha Omega Strength Team. Faith. Fitness. The discipline of finishing what you start.</description>
<language>en-us</language>
<lastBuildDate>${lastBuildDate}</lastBuildDate>
<ttl>60</ttl>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}

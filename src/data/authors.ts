/**
 * Author bios for the journal - E-E-A-T signals for SEO + GEO.
 * Keyed by the `author` string used in Sanity blogPost documents.
 *
 * Add a new entry when a new author publishes. If a post's author is not
 * found here, the article page falls back to a minimal byline (no bio block).
 */

export interface Author {
  name: string;
  title: string;
  bio: string;
  /** Optional path to a portrait. Square crop preferred. */
  portrait?: string;
  /** Optional /about-style link if the author has their own page. */
  url?: string;
}

const authors: Record<string, Author> = {
  "Pete Fluriach": {
    name: "Pete Fluriach",
    title: "Founder, Alpha Omega Strength Team",
    bio: "Pete Fluriach is the founder of Alpha Omega Strength Team. He writes from the intersection of faith, training, and the discipline of finishing what you start. Based in Miami, FL.",
    portrait: "/images/authors/pete-fluriach.jpeg",
    url: "/about",
  },
  "Alpha Omega Strength Team": {
    name: "Alpha Omega Strength Team",
    title: "Editorial",
    bio: "The collective voice of Alpha Omega Strength Team - training notes, scripture reflections, and dispatches from the team.",
    url: "/about",
  },
};

export function getAuthor(name: string | undefined | null): Author | null {
  if (!name) return null;
  return authors[name] ?? null;
}

export function getAuthorOrFallback(name: string | undefined | null): Author {
  return (
    getAuthor(name) ?? {
      name: name ?? "Alpha Omega Strength Team",
      title: "Editorial",
      bio: "",
      url: "/about",
    }
  );
}

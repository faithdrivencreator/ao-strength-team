import Link from "next/link";

interface TagFilterProps {
  tags: string[];
  activeTag?: string;
}

/**
 * Left-aligned tag filter row. Consumes /blog?tag=… searchParam.
 * Renders a single "All Entries" pill plus one pill per unique tag.
 * Tag pages add a noindex meta on the list page so we don't dilute the index.
 */
export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  if (!tags || tags.length === 0) return null;

  const baseClass =
    "font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border transition-colors duration-200";

  return (
    <nav
      aria-label="Filter journal entries by tag"
      className="flex flex-wrap items-center gap-2"
    >
      <Link
        href="/blog"
        className={`${baseClass} ${
          !activeTag
            ? "text-white border-white/70 bg-white/[0.04]"
            : "text-white/50 border-white/15 hover:text-white hover:border-white/40"
        }`}
      >
        All Entries
      </Link>
      {tags.map((tag) => {
        const active = activeTag === tag;
        return (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`${baseClass} ${
              active
                ? "text-white border-white/70 bg-white/[0.04]"
                : "text-white/50 border-white/15 hover:text-white hover:border-white/40"
            }`}
          >
            {tag}
          </Link>
        );
      })}
    </nav>
  );
}

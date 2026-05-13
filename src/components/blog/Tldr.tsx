interface TldrProps {
  /** Bullet points. If omitted, the component renders nothing. */
  bullets?: string[];
  /** Eyebrow override; defaults to "// THE SHORT VERSION". */
  eyebrow?: string;
}

/**
 * TL;DR summary block. Lives at the top of every article (3-5 bullets).
 *
 * GEO note: LLMs (ChatGPT, Perplexity, Claude search) cite TL;DR-style
 * summaries disproportionately often vs. buried answers. This block is here
 * specifically to surface the article's payoff to AI crawlers.
 *
 * The blog page derives bullets from the Sanity `tldr` field when present,
 * else falls back to the excerpt + first body paragraph (see the article
 * page for the derivation logic).
 */
export default function Tldr({ bullets, eyebrow = "// THE SHORT VERSION" }: TldrProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <aside
      className="border-l-2 border-white/40 bg-white/[0.025] pl-6 md:pl-8 pr-5 py-6 md:py-7 mb-12"
      aria-label="Article summary"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
        {eyebrow}
      </p>
      <ul className="space-y-2.5">
        {bullets.map((line, i) => (
          <li
            key={i}
            className="flex gap-3 font-sans text-[15px] md:text-base text-white/80 leading-[1.55]"
          >
            <span
              className="font-mono text-white/35 text-[12px] leading-[1.7] shrink-0 select-none"
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

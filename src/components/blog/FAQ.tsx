export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

/**
 * FAQ block - only renders when the article PortableText has a heading reading
 * "FAQ" or "Frequently Asked Questions" followed by Q/A blocks. The article
 * page parses this out and passes the structured items here, plus emits a
 * matching FAQPage JSON-LD for SEO/GEO.
 *
 * Encouraged copy form: H2 questions on the article body should be phrased as
 * questions when possible - LLMs prefer extracting question-shaped text.
 */
export default function FAQ({ items }: FAQProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-labelledby="article-faq"
      className="mt-16 pt-12 border-t border-white/10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
        // FREQUENTLY ASKED
      </p>
      <h2
        id="article-faq"
        className="font-sans font-black uppercase tracking-tight leading-[1.05] text-3xl md:text-4xl mb-10"
      >
        Questions, answered.
      </h2>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <h3 className="font-sans font-bold text-white text-lg md:text-xl leading-snug">
                {item.question}
              </h3>
              <span
                className="font-mono text-[20px] leading-none text-white/40 group-open:rotate-45 transition-transform duration-200 shrink-0 mt-1"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-4 font-sans text-[15px] md:text-base text-white/70 leading-[1.7]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

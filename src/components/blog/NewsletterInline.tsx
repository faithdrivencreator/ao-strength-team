import HomeEmailForm from "@/components/HomeEmailForm";

interface NewsletterInlineProps {
  /** Optional override label; defaults to "// STAY IN IT". */
  eyebrow?: string;
  /** Optional override headline. */
  headline?: string;
  /** Optional sub copy. */
  copy?: string;
}

/**
 * Inline newsletter strip - drops mid-archive or end-of-article inside the
 * 720px body column. Reuses the same HomeEmailForm component the homepage uses.
 */
export default function NewsletterInline({
  eyebrow = "// STAY IN IT",
  headline = "The Weekly Discipline.",
  copy = "Scripture, training notes, and first access to every new drop. One short read every Sunday morning.",
}: NewsletterInlineProps) {
  return (
    <aside className="relative bg-white/[0.03] border border-white/10 p-8 md:p-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4">
        {eyebrow}
      </p>
      <h3 className="font-sans font-black uppercase tracking-tight leading-[1.1] text-2xl md:text-3xl mb-3">
        {headline}
      </h3>
      <p className="font-sans text-[15px] font-light text-white/55 leading-relaxed mb-7 max-w-md">
        {copy}
      </p>
      <div className="-mx-0">
        <HomeEmailForm />
      </div>
    </aside>
  );
}

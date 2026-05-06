import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Alpha Omega Strength Team",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-2 font-mono text-sm tracking-widest text-neutral-500">
        // 404
      </p>
      <h1 className="mb-6 text-5xl md:text-6xl font-black uppercase tracking-tight">
        Lost the Path
      </h1>
      <p className="mb-10 max-w-md font-sans text-base text-neutral-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Get back to the work.
      </p>
      <blockquote className="mb-12 max-w-lg border-l-2 border-neutral-700 pl-4 text-left italic text-neutral-500">
        &ldquo;I have learned, in whatsoever state I am, therewith to be content.&rdquo;
        <cite className="mt-2 block text-sm not-italic text-neutral-600">
          &mdash; Philippians 4:11
        </cite>
      </blockquote>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/shop"
          className="px-8 py-3 bg-white text-black font-sans font-black text-xs tracking-[0.1em] uppercase transition-colors duration-150 hover:bg-gray-200"
        >
          Shop the Drop
        </Link>
        <Link
          href="/"
          className="px-8 py-3 border border-white/30 text-white font-sans font-bold text-xs tracking-[0.1em] uppercase transition-colors duration-150 hover:bg-white/10"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}

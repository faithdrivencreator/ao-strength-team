import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1440px] px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-sans font-black text-sm tracking-[-0.025em] uppercase text-white">
          ALPHA OMEGA STRENGTH TEAM
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors duration-150 hover:text-white"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </Link>
        </div>

        <p className="font-mono text-[11px] tracking-[0.1em] text-white/40">
          &copy; 2026 Alpha Omega Strength Team
        </p>
      </div>
    </footer>
  );
}

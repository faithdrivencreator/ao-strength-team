import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | AO Strength Team",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/15 px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-baseline justify-between">
          <p className="font-inter text-xl font-black uppercase tracking-tight text-white">
            AΩ&nbsp;&nbsp;ALPHA OMEGA
          </p>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373]">
            // AO ADMIN
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </div>
  );
}

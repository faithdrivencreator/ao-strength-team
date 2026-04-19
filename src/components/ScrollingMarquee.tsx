export default function ScrollingMarquee() {
  const text =
    "DISCIPLINE \u2022 RESILIENCE \u2022 INTEGRITY \u2022 COMMUNITY \u2022 GOD IS THE ALPHA AND THE OMEGA \u2022 FAITH OVER FEAR \u2022 TRAIN WITH PURPOSE \u2022 STRENGTH IN HIM \u2022 NO WEAPON FORMED AGAINST YOU SHALL PROSPER \u2022 BUILT FOR THE JOURNEY";

  return (
    <div className="w-full overflow-hidden bg-black border-y border-white/10 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/60 px-4">
          {text}
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/60 px-4">
          {text}
        </span>
      </div>
    </div>
  );
}

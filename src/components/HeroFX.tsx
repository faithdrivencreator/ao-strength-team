const TACTICAL_LINES = [
  "// 01 - FIRST DROP",
  "// 02 - STRENGTH TEAM",
  "// 03 - TRAIN WITH PURPOSE",
  "// 04 - ALPHA OMEGA",
  "// 05 - INCOMING",
  "// 06 - STAY READY",
  "// 07 - DEPLOY",
  "// 08 - DISCIPLINE",
  "// 09 - RECOVERY",
  "// 10 - REPS",
  "// 11 - TRUST",
  "// 12 - UNBREAKABLE",
];

interface Particle {
  left: string;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

function generateParticles(count: number, seed: number): Particle[] {
  const out: Particle[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    out.push({
      left: `${(rand() * 100).toFixed(2)}%`,
      delay: rand() * 20,
      duration: 18 + rand() * 14,
      size: 1 + rand() * 2,
      opacity: 0.15 + rand() * 0.35,
    });
  }
  return out;
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <rect x="44" y="10" width="12" height="80" fill="currentColor" />
      <rect x="20" y="34" width="60" height="12" fill="currentColor" />
    </svg>
  );
}

const PARTICLES = generateParticles(10, 42);

export default function HeroFX() {
  const particles = PARTICLES;

  return (
    <div
      className="ao-hero-fx absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Breathing radial vignette */}
      <div
        className="absolute top-1/2 left-1/2 w-[140vmax] h-[140vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)",
          animation: "aoHeroPulse 7s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Sweeping horizontal scan beam */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          filter: "blur(1px)",
          animation: "aoHeroScan 9s linear infinite",
          willChange: "top, opacity",
        }}
      />

      {/* Drifting tactical text strip (left edge) */}
      <div
        className="absolute left-4 md:left-8 top-0 bottom-0 flex flex-col gap-12"
        style={{
          animation: "aoHeroDriftDown 60s linear infinite",
          willChange: "transform",
        }}
      >
        {[...TACTICAL_LINES, ...TACTICAL_LINES].map((line, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/15 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Drifting tactical text strip (right edge, opposite direction) */}
      <div
        className="absolute right-4 md:right-8 top-0 bottom-0 flex flex-col gap-12"
        style={{
          animation: "aoHeroDriftUp 75s linear infinite",
          willChange: "transform",
        }}
      >
        {[...TACTICAL_LINES, ...TACTICAL_LINES].map((line, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/15 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Floating dust particles - reduced from 28 -> 10, pure CSS */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            animation: `aoHeroFloat ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "top, opacity",
          }}
        />
      ))}

      {/* Slow-rotating cross watermark (single layer - outer counter-rotating cross removed) */}
      <div
        className="absolute top-1/2 left-1/2 w-[55vmin] h-[55vmin]"
        style={{
          animation: "aoHeroRotate 240s linear infinite",
          willChange: "transform",
        }}
      >
        <CrossIcon className="w-full h-full text-white/[0.025]" />
      </div>

      {/* Subtle grain via repeating SVG noise */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}

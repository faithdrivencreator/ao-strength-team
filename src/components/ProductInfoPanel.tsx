"use client";

import { useState } from "react";

interface ProductInfoPanelProps {
  scripture: string;
  scriptureRef: string;
  description: string;
}

type PanelId = "sizing" | "shipping" | "returns" | "care";

interface AccordionPanel {
  id: PanelId;
  label: string;
  body: React.ReactNode;
}

const ACCORDION_PANELS: AccordionPanel[] = [
  {
    id: "sizing",
    label: "SIZING & FIT",
    body: (
      <div className="space-y-3 font-sans text-[13px] font-light leading-relaxed text-white/70">
        <p>
          Runs true to size. Most of the team wears their normal size. If you
          prefer a relaxed fit, size up one. Between sizes? Size up.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">
          // Chest (in): S 38-40 · M 41-43 · L 44-46 · XL
          47-49 · 2XL 50-52 · 3XL 53-55
        </p>
      </div>
    ),
  },
  {
    id: "shipping",
    label: "SHIPPING",
    body: (
      <ul className="list-disc space-y-2 pl-5 font-sans text-[13px] font-light leading-relaxed text-white/70">
        <li>Tracking emailed the moment your order leaves the facility.</li>
        <li>International shipping rates calculated at checkout.</li>
      </ul>
    ),
  },
  {
    id: "returns",
    label: "RETURNS & EXCHANGES",
    body: (
      <ul className="list-disc space-y-2 pl-5 font-sans text-[13px] font-light leading-relaxed text-white/70">
        <li>Email returns@aostrengthteam.store to start a return or exchange.</li>
        <li>Refunds processed within 5 business days of receipt.</li>
      </ul>
    ),
  },
  {
    id: "care",
    label: "CARE",
    body: (
      <ul className="list-disc space-y-2 pl-5 font-sans text-[13px] font-light leading-relaxed text-white/70">
        <li>Machine wash cold with like colors, inside out.</li>
        <li>Tumble dry low or hang dry to preserve fit and print.</li>
        <li>Do not bleach. Do not iron print.</li>
        <li>Built to last. Care for it, train hard, repeat.</li>
      </ul>
    ),
  },
];

export default function ProductInfoPanel({
  scripture,
  scriptureRef,
  description,
}: ProductInfoPanelProps) {
  const [openPanel, setOpenPanel] = useState<PanelId | null>("sizing");

  function togglePanel(id: PanelId) {
    setOpenPanel((current) => (current === id ? null : id));
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
      {/* Scripture + story block */}
      <div className="flex flex-col gap-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
          // THE STORY
        </p>
        <p className="font-sans text-[15px] font-light leading-relaxed text-white/75 md:text-[16px]">
          {description}
        </p>
        <blockquote
          className="mx-auto max-w-xl border-l-2 pl-5 text-left"
          style={{ borderColor: "#E8DCC8" }}
        >
          <p className="font-sans text-[16px] leading-relaxed text-white/80 md:text-[18px]">
            &ldquo;{scripture}&rdquo;
          </p>
          <cite className="mt-3 block font-mono text-[11px] uppercase not-italic tracking-[0.18em] text-white/40">
            {scriptureRef}
          </cite>
        </blockquote>
      </div>

      {/* Info accordion */}
      <div className="border-t border-white/10">
        {ACCORDION_PANELS.map((panel) => {
          const isOpen = openPanel === panel.id;
          return (
            <div key={panel.id} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => togglePanel(panel.id)}
                aria-expanded={isOpen}
                aria-controls={`info-${panel.id}`}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/80">
                  // {panel.label}
                </span>
                <span
                  className="font-mono text-[16px] leading-none"
                  style={{ color: "#E8DCC8" }}
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div id={`info-${panel.id}`} className="pb-6 pr-2">
                  {panel.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

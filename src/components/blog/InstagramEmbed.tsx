"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
  caption?: string;
}

/**
 * Renders a single Instagram post or Reel embed inside a blog article.
 * Instagram's embed.js (loaded once in root layout) scans for
 * [data-instgrm-permalink] blockquotes and hydrates them into the
 * full interactive widget. We call process() again here in case the
 * script has already loaded before this component mounts.
 */
export default function InstagramEmbed({ url, caption }: InstagramEmbedProps) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <figure className="my-12 flex flex-col items-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: "0",
          width: "100%",
        }}
      />
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 text-center">
          // {caption}
        </figcaption>
      )}
    </figure>
  );
}

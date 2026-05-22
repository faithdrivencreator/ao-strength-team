"use client";

import { useEffect } from "react";
import Script from "next/script";

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
 * embed.js is co-located here so it only loads on pages with embeds.
 * Multiple embed instances on one page share a single script (Next dedupes by id).
 */
export default function InstagramEmbed({ url, caption }: InstagramEmbedProps) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <figure className="my-12 flex flex-col items-center">
      <Script
        id="instagram-embed-js"
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
      />
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

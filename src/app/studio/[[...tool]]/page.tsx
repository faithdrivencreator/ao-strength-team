/**
 * Sanity Studio — embedded at /studio.
 * Pete logs in here to write blog posts. Hit Publish and the post appears
 * on the live site within ~60s (ISR revalidate window).
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}

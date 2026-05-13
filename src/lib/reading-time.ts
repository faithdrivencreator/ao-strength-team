const WORDS_PER_MINUTE = 200;

interface PortableTextSpan {
  _type: "span";
  text?: string;
}

interface PortableTextBlockWithChildren {
  _type: string;
  children?: PortableTextSpan[];
}

/**
 * Walks a PortableText body, concatenates every span's text, returns a word count.
 */
export function getWordCount(body: readonly unknown[] | undefined | null): number {
  if (!body || body.length === 0) return 0;

  let text = "";
  for (const block of body as unknown as PortableTextBlockWithChildren[]) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (child._type === "span" && typeof child.text === "string") {
        text += " " + child.text;
      }
    }
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Estimated reading time in minutes (200 wpm, minimum 1 min).
 */
export function getReadingTimeMinutes(body: readonly unknown[] | undefined | null): number {
  const words = getWordCount(body);
  if (words === 0) return 1;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Pull the first N characters of body text — for fallback article schema bodies.
 */
export function getBodyExcerpt(body: readonly unknown[] | undefined | null, maxLen = 300): string {
  if (!body || body.length === 0) return "";
  let text = "";
  for (const block of body as unknown as PortableTextBlockWithChildren[]) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (child._type === "span" && typeof child.text === "string") {
        text += child.text + " ";
        if (text.length >= maxLen + 50) break;
      }
    }
    if (text.length >= maxLen + 50) break;
  }
  text = text.trim().replace(/\s+/g, " ");
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

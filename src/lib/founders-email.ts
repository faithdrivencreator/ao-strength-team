/**
 * AO Strength Team - Founders launch email.
 *
 * Single source of truth for the "you registered early" founders thank-you +
 * FOUNDERS15 discount email. Used by:
 *   - the manual launch-night send to the existing early-registration list
 *   - the /api/subscribe auto-send for new pre-8PM-ET signups on launch day
 *
 * Content is locked to the brand voice: no em/en dashes, no exclamation points,
 * NIV scripture with the cross glyph, one CTA. If you change the copy here it
 * changes everywhere the founders email is sent.
 */

import { renderAOEmail } from "@/lib/email-shell";

export const FOUNDERS_SUBJECT =
  "You were here first. Your founders code is inside.";

export const FOUNDERS_FROM = "AO Strength Team <team@aostrengthteam.store>";

/** RFC 8058 one-click unsubscribe headers for the founders blast. */
export const FOUNDERS_HEADERS: Record<string, string> = {
  "List-Unsubscribe": "<https://aostrengthteam.store/unsubscribe>",
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
};

/** Build the full branded HTML for the founders email. */
export function buildFoundersEmailHtml(): string {
  return renderAOEmail({
    preheader:
      "15% off the first drop, for the ones who signed up before the doors opened.",
    title: "Your Founders Code - AO Strength Team",
    sections: [
      {
        eyebrow: "01  DAY ONE",
        heading: "YOU WERE HERE FIRST",
        body: [
          "You signed up before the doors opened. Before the first shirt shipped, before the first order came through, you put your name down and said you wanted in. That means something to us.",
          "Strength like that does not come from hype. It comes from God, the One who holds the beginning and the end. We built this gear as a reminder of where the power comes from, and you are part of it from the very first day.",
        ],
      },
      {
        eyebrow: "02  THE BEGINNING",
        body: [
          "&ldquo;I am the Alpha and the Omega, the First and the Last, the Beginning and the End.&rdquo;",
          "Revelation 22:13 &#10014;",
          "You are standing here at the beginning. He has been here all along.",
        ],
      },
      {
        eyebrow: "03  YOUR FOUNDERS CODE",
        body: [
          "As one of the first, here is your founders discount. 15% off your first order from the launch collections: Cornerstone, Warpaint, and Unbreakable.",
        ],
        code: {
          value: "FOUNDERS15",
          note: "15% off your first order. Applies at checkout. Good through Monday, June 9.",
        },
      },
    ],
    cta: { text: "Shop the drop", url: "https://aostrengthteam.store/shop" },
    signoff: "Train with purpose.",
    ps: "Every order gives back. 10% of every order goes to the charity you choose at checkout.",
  });
}

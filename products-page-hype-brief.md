# AO Products Page — Pre-Launch Hype Brief

**Date:** 2026-05-15
**For:** Website implementation session
**Goal:** Replace any product listings on the products page with a strategic hype experience that builds anticipation for the May 25 drop, captures email waitlist signups, and reinforces the brand identity without revealing actual product designs.

---

## Strategic frame

The products page (whether `/shop`, `/products`, `/store`, etc.) currently shows or will show product listings for purchase. Pre-launch, no products are available for purchase. The page should NOT redirect or 404 — it should remain a destination because Google indexing + social CTAs will point users here.

What the user sees on this page during pre-launch:
- A clear "the drop opens May 25" message — countdown timer
- A waitlist email capture (first access on drop day)
- Brand atmosphere — copy + imagery that reinforces what AO IS, not what AO is selling
- No product photos. No prices. No SKUs. No fits listed.

The mystery IS the marketing. People should leave the page wanting to know more, not knowing more.

---

## Page structure (top to bottom)

### Block 1 — Hero (above fold)

**Eyebrow (small, JetBrains Mono, white at 55% opacity, letter-spacing 0.3em):**
```
// FIRST DROP · MAY 25
```

**Main headline (Inter 900, white, ~clamp(72px, 13vw, 168px), line-height 0.9, tracking -0.04em):**
```
SOMETHING
IS BEING
BUILT.
```

**Sub-headline (Inter 300, white at 75%, ~17px, max-width 620px):**
```
Faith-grounded performance apparel for the disciplined.
Two designs. Five fits. One purpose.
Strengthen. Endure. Finish.
```

**Countdown timer (centered, mono, large):**
- Format: `DD : HH : MM : SS` in JetBrains Mono, ~64px on desktop / 40px mobile
- Label above in small mono caps: `// TIME REMAINING`
- Target: May 25, 2026 at 10:00 AM ET (or whatever exact drop time you pick)

**CTA — email capture (single input + button):**
- Input placeholder: `your email`
- Button label: `JOIN THE TEAM`
- Helper text below in small mono: `// First access on drop day. No spam. Ever.`
- On submit: confirmation message — `You're on the team. We'll be in touch May 25.`

### Block 2 — Manifesto / Brand atmosphere

Below the hero, a quiet manifesto section. Black background. No images.

**Eyebrow:** `// THE TEAM`

**Body (Inter 300, white at 75%, generous line-height):**
```
We don't build for the bandwagon.
We build for the early mornings.
For the last rep no one sees.
For the discipline that turns into worship.

Two designs. Each made for the work.
Five fits. Each made for the body that's earned them.
One team. Built around the Alpha and the Omega — the One who is the Beginning and the End.

This is performance apparel for people who train with purpose.
Faith-grounded. Restraint over decoration. Built for the finish.
```

### Block 3 — Scripture origin

Quiet, centered. Black background. White text only. No imagery.

**Verse (Inter 300, ~40px, centered, line-height 1.5):**
```
"I am the Alpha and the Omega,
the First and the Last,
the Beginning and the End."
```

**Reference (Inter 400, mono, ~14px, white at 70%, centered, 32px below verse):**
```
REVELATION 22:13 · NIV
```

### Block 4 — Lifestyle atmosphere strip (optional, NOT product photos)

If you want a visual section, use 2-4 lifestyle photos from `03-The-Studio/ao-strength-team/launch-hype-campaign/photos/v3/` — pick ones where the product is NOT the focus (e.g., the cinematic-hero portrait shots, the male sleeve closeup, the female back portrait). Crop tight so the apparel design is ambiguous. Tactical mono overlay text on each: `// 01 — DISCIPLINE`, `// 02 — ENDURANCE`, `// 03 — FAITH`, etc.

**Do NOT use:**
- Any photo where a specific shirt design is clearly visible
- The W3 product detail shots
- Any image that could be mistaken for a product page hero shot

### Block 5 — Second waitlist CTA (footer of page)

Same email capture as hero, simpler copy:

**Eyebrow:** `// JOIN US`

**Headline (Inter 700, ~32px):**
```
THE DROP OPENS MAY 25.
BE FIRST IN LINE.
```

**Email input + button** (same as hero).

---

## Brand DNA (non-negotiable — match social + site)

- Background: true black `#000000`
- Text: white at varied alpha (0.30 / 0.55 / 0.75 / 0.90)
- Typography: Inter (300/400/700/900) + JetBrains Mono (400/700)
- Easing: expo `cubic-bezier(0.22, 1, 0.36, 1)` on scroll-in animations
- No gradients. No rounded buttons. No drop shadows.
- Mono `// ` eyebrow prefix on all small tactical labels
- Letter-spacing 0.3em on mono uppercase labels
- AΩ Greek lockup (cross between Α and Ω) at footer — use `/01-The-Identity/clients/ao-strength-team/logo-greek-horizontal-white.png`

---

## Functional requirements

1. **Email capture** must connect to a real waitlist destination — ImprovMX → hello@aostrengthteam.store inbox, or ConvertKit / Resend audience if one is set up. Whatever the blog uses for newsletter signups, use the same audience.
2. **Countdown** must be timezone-aware (default to ET) and live-update without page refresh
3. **SEO meta tags** — title: `AO Strength Team · First Drop May 25, 2026`. Description: `Faith-grounded performance apparel. Strengthen. Endure. Finish. The first drop opens May 25.`
4. **Schema markup** — Organization schema with brand name, logo, sameAs links (IG, FB)
5. **Open Graph** — use a 1200×630 hero image (we can build one matching the FB cover style — black, lockup, mantra)
6. **Mobile-first** — the page must look as good at 375px as it does at 1440px

---

## What to KEEP from current site (if anything exists)

- Navigation / header / footer structure stays the same
- Blog link in nav stays (drive traffic to blog content)
- The bio/about page stays
- Any contact / FAQ pages stay

---

## What to REMOVE

- All product cards / grids / listings
- "Add to cart" buttons anywhere on this page
- Price displays
- Size selectors
- Stock indicators
- Anything that implies products are currently buyable

---

## Post-launch (after May 25)

Once products are live, this page reverts to a standard products listing — but the "Manifesto" and "Scripture origin" sections should remain on the brand story page or About page. The atmosphere they create is a permanent part of the brand identity, not just a pre-launch placeholder.

---

## Coordination

- This brief was written by the social-media session (2026-05-15)
- Website implementation happens in a separate Claude session
- If you need the AO brand tokens, they live in `/01-The-Identity/clients/ao-strength-team/`
- If you need lifestyle photos for Block 4, pull from `/03-The-Studio/ao-strength-team/launch-hype-campaign/apparel/mockup-templates/re-renders-v3/`

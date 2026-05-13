# AO Strength Team — E-commerce Strategy
## Lessons from the HolStrength.com Teardown

*Written: 2026-05-13 — source: `HolStrength-Brand-Ecommerce-Teardown.md`*

HolStrength is the closest direct comp to AO (faith + fitness apparel, founded 2021, multi-thousand reviews). They've out-built us on conversion mechanics, not on brand. Our brand is sharper (monochrome, restrained, AΩ vs. their barbell-cross). Our gap is the **commerce surface** — the bits between "looks good" and "I just bought it."

This doc maps every HolStrength move to AO's current build, then prioritizes.

---

## How AO already beats HolStrength

Keep doing this. Don't drift toward their style chasing their conversion.

| Area | AO | HolStrength |
|---|---|---|
| **Aesthetic** | All-black, monochrome, restrained — "quiet conviction" | High-contrast white-page Shopify-Dawn — feels louder |
| **Typography** | Bold sans + monospace eyebrows — editorial, athletic | Standard ALL-CAPS sans — generic |
| **Brand voice** | Restrained, encouraging, scripture-rooted, not preachy | "Direct, declarative, slightly militant" — more aggressive |
| **Visual identity** | AΩ + cross lockup, multiple variants — already systematic | Single barbell-cross icon — strong but one-note |

AO's voice is the moat. HolStrength's voice says *fight*. AO's says *finish*. Different audience inside the same vertical.

---

## NOW — Ship this week (high impact, < 1 day each)

These are conversion mechanics that cost almost nothing to add and that HolStrength is winning on today.

### 1. Reframe the newsletter from "join the team" to value-led content
**The HolStrength play:** "Subscribe to our weekly devotional newsletter" — not a discount coupon.
**AO current:** "JOIN THE STRENGTH TEAM" with a Matthew 18:20 quote.
**Change:** Reframe the form CTA to **"Get The Weekly Discipline — scripture + training intent, every Sunday. First access to new drops."** Pre-selects high-intent, brand-aligned subscribers. Sustains the email list with a real reason to stay subscribed.
**Where:** `MainHome.tsx` email signup section + `HomeEmailForm.tsx` placeholder/copy.
**Wire-up:** MailerLite group is already configured. Add a Sunday weekly devotional cadence to The Engine Room cron.

### 2. Free shipping threshold in the ScrollingMarquee
**The HolStrength play:** "FREE US SHIPPING $100+" as the lead message in a top scrolling bar. Increases AOV.
**AO current:** ScrollingMarquee runs brand phrases.
**Change:** Lead the marquee with **"FREE US SHIPPING ON ORDERS $75+"** (we should set this 15–20% above current AOV — Pete to pick the exact threshold based on Stripe data). Add a Stripe coupon `FREESHIP75` that auto-applies if subtotal ≥ $75.
**Implication:** Need a "you're $X away from free shipping" widget in the cart drawer. Defer that to NEXT phase if cart drawer doesn't exist yet.

### 3. Crossed-out compare-at price on listing cards
**The HolStrength play:** "$28 was $38" anchor pricing on most best-sellers. Creates permanent "deal" feel without permanent discount.
**AO current:** Product cards show single `price`. No compare anchor.
**Change:** Add optional `compareAtPrice?: number` to the Product type in `src/data/products.ts`. Render strikethrough above price when present. Use it sparingly — 1–2 SKUs at launch, not all.
**Why care:** Lifts CTR on product cards. Stripe handles it via a separate Price object.

### 4. 60-day returns badge near the buy button
**The HolStrength play:** Prominent trust badge near the Add-to-Cart button. Removes hesitation.
**AO current:** Trust info likely buried in footer or shipping page.
**Change:** Below the Add-to-Cart on every PDP: a 3-pill row — **`60-DAY RETURNS · FREE EXCHANGES · SHIPS IN 2–3 DAYS`** — with the same icon style as our hero trust bar.
**Where:** Product detail page component.

### 5. FAQ accordion on every PDP
**The HolStrength play:** Shipping / Returns / International / Sizing as inline collapsibles below the buy button. Handles objections without sending the buyer to another page.
**AO current:** No PDP FAQ.
**Change:** Add a 4-row accordion to the PDP: Shipping, Returns, Sizing, Care. Static content per product type. ~1 hour build.

### 6. About page as manifesto, not bio
**The HolStrength play:** First-person-plural, declarative, "why" first then "what."
**AO current:** Have the manifesto language on the homepage; About page state unknown.
**Change:** `/about` mirrors the homepage manifesto cadence: "We train with purpose. We live with conviction. We refuse to settle. When you wear the mark, you carry the standard — for Him." End with the trinity (Discipline · Resilience · Integrity · Community). Same trust bar at the bottom.

---

## NEXT — Ship this month (medium effort, 1–2 weeks each)

### 7. Wholesale / Bulk Order page
**The HolStrength play:** A dedicated `/wholesale` page that captures B2B intent — church groups, gym groups, school teams. Opens an entire second revenue stream.
**AO opportunity:** Significantly larger than for HolStrength given our brand. Christian gyms, men's ministries, church youth groups, Christian high schools all buy team apparel.
**Build:** Static page with a Formspree-style form (or Netlify Form + email forward) gathering: contact, org type, quantity range, target date, garment interest, customization ask (initials, group name). Auto-reply email with bulk pricing tiers.
**Pricing model:** 10-pc minimum, 15% off at 25 pcs, 25% off at 50, custom quote at 100+.

### 8. Fit-feel slider on PDP
**The HolStrength play:** A 5-point slider (Tight → Slim → True → Relaxed → Oversized) per product. Buyers self-select fit before checkout. Cuts return rate.
**AO opportunity:** Performance Long Sleeve = "Compression fit" (Tight). Unbreakable Hoodie = "Relaxed." Cap is one-size. Slider per product makes fit unambiguous.
**Build:** Static field on each product (`fitFeel: "tight" | "slim" | "true" | "relaxed" | "oversized"`) rendered as a 5-dot scale with one dot lit. Half day of work.

### 9. Reviews infrastructure
**The HolStrength play:** Visible review counts on every product card before the click ("(900)", "(702)"). Reviews destination page in the footer. Reviews with photos + initials avatars on the homepage.
**AO problem:** No reviews yet because we just launched. Can't fake — fabricated reviews violate FTC + Stripe TOS.
**Strategy:** 
1. Install Judge.me (free tier handles 50 reviews/month) or build a custom Supabase-backed review system.
2. Auto-send post-purchase email at delivery + 7 days asking for review with a 1-click link (same pattern as Greenstone's 60-day cron — clone it).
3. Hide the count + stars on cards until each SKU has ≥ 5 reviews. After threshold, surface them.
4. Stand up `/reviews` destination page that mirrors HolStrength's pattern.

### 10. Weekly devotional content engine
**The HolStrength play:** Blog + devotional content drives SEO and gives the email list a real reason to exist.
**AO build:** Cron in The Engine Room that drafts a 600–900 word devotional + 1 training intent per Sunday, writes it as a static post to `src/data/blog-posts.ts`, pushes to GitHub, Netlify auto-deploys, MailerLite broadcast goes out Sunday 7am ET. Pete reviews drafts in the Notion queue Friday.
**Why this is high-leverage:** Same engine writes to the website AND the email. One asset, two channels. No CMS, no Sanity, no Klaviyo dependency.

---

## LATER — Strategic, Q2+ (operational lift; revisit when revenue justifies)

| # | Move | Tool | Why later |
|---|---|---|---|
| 11 | **Ambassador program** | Roster, Goaffpro, or Refersion | Requires a community of 50+ buyers willing to evangelize. Premature until we have ~250 customers. |
| 12 | **Wishlist** | Shopify-style wishlist or LocalStorage v1 | Captures intent for retargeting. Plug into MailerLite for "items in your wishlist are back" automation. |
| 13 | **Multi-currency Stripe** | Stripe native multi-currency | Defer until we have non-US traffic data to justify it. |
| 14 | **SMS channel** | Klaviyo SMS or Postscript | Needs ~500 list members minimum. Separate consent flow. |
| 15 | **Mobile app** | React Native or Flutter | Only if we hit $500k+ in annual store revenue. Push notifications can run via web push first. |
| 16 | **Audience-segmented nav (Men/Women/Youth)** | Site nav restructure | Only after we have women's and youth product lines. Today we're a unisex/men-leaning lineup. |
| 17 | **Careers page** | Static page | Aspirational signal. Only meaningful when we're hiring. |

---

## What HolStrength does that we should *NOT* copy

| Move | Why we pass |
|---|---|
| **"1,074 views in last 24 hours" FOMO counter** | Cheap urgency tactic. Conflicts with our restrained voice. Even with their legal disclaimer, it reads as Shopify-app spam. Our brand is "quiet conviction" — manufactured scarcity breaks that. |
| **Aggressive `STAND. FIGHT. WIN.`-style copy** | HolStrength's voice is "slightly militant." Ours is calm + finishing-strong. Don't drift toward their tone chasing their numbers. |
| **Generic Shopify-Dawn page architecture** | We're on Next.js 16 — we can do better than a Shopify theme. Use the architecture freedom to ship faster, lighter pages. |
| **Coupon-led email opt-in ("Get 10% off")** | Race-to-bottom. Discount-trained subscribers churn fast. Lead with content (The Weekly Discipline) not with a coupon — and the discount, when offered, hits harder. |

---

## 30-day execution sequence

| Week | Focus | Deliverables |
|---|---|---|
| **Week 1** | Conversion mechanics (NOW items 1–5) | Newsletter reframe, marquee shipping threshold, compare-at prices, returns badge, FAQ accordion |
| **Week 2** | About manifesto + Wholesale page | `/about` rewrite + `/wholesale` lead form live |
| **Week 3** | Fit-feel slider + reviews infra setup | Slider on all PDPs, Judge.me wired, post-purchase review email cron |
| **Week 4** | Devotional content engine | Cron writes first 4 weeks of Sunday devotionals, MailerLite broadcast tested |

After Day 30: review GA4 conversion deltas, then re-prioritize LATER items based on what's actually moving the needle.

---

## Decisions for Pete

Before we ship Week 1, three calls to make:

1. **Free shipping threshold dollar amount.** HolStrength uses $100. Recommend we pin it 15–20% above our AOV from the first 2 weeks of Stripe data. Until we have that data: $75 placeholder. Pete to confirm.
2. **Compare-at pricing strategy.** Two paths: (a) Anchor a "retail" price at full MSRP and treat current price as the "everyday low," OR (b) Run real time-limited compares around drops. (a) is permanent psychology, (b) is more honest. **Recommendation: (b) — fits the restrained brand voice better.**
3. **Newsletter cadence and voice ownership.** Sunday weekly is the right rhythm. Who writes? Three options: (a) Pete writes it solo, (b) Claude Code drafts and Pete reviews/edits Friday, (c) outsource to a Christian content writer. **Recommendation: (b) — same model as Greenstone Wellness blog, proven workflow.**

---

## Files to touch (when greenlit)

```
src/components/MainHome.tsx         — newsletter copy reframe
src/components/HomeEmailForm.tsx    — placeholder + button copy
src/components/ScrollingMarquee.tsx — lead with shipping threshold
src/data/products.ts                — add compareAtPrice, fitFeel fields
src/app/products/[slug]/page.tsx    — returns badge + FAQ accordion + fit slider
src/app/about/page.tsx              — manifesto rewrite (verify/create)
src/app/wholesale/page.tsx          — new bulk order page
src/data/blog-posts.ts              — first 4 weekly devotionals
07-The-Engine-Room/                 — Sunday cron, post-purchase review cron
```

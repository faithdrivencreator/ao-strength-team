import type { BlogPost } from "../blog-posts";

/**
 * AO blog - 2026-07-21
 * Universal Blog Post template (Opening + 5 sections + FAQ + Conclusion).
 * Primary keyword: cutting without losing strength
 */

const post: BlogPost = {
  slug: "cutting-without-losing-strength",
  title:
    "Cutting Without Losing Strength: The Faith-Driven Lifter's Guide to a Disciplined Fat-Loss Phase",
  date: "2026-07-21",
  excerpt:
    "Most cuts fail in one of two directions: too timid to change anything, or so aggressive they burn down two years of strength in twelve weeks. This is the disciplined middle road - a 12-week protocol that takes the fat off and leaves the lifter intact.",
  tags: ["Nutrition", "Training", "Discipline"],
  author: "Pete Fluriach",
  mainImage: {
    src: "/images/blog/cutting-without-losing-strength/hero.webp",
    alt: "Man weighing food at a kitchen counter before dawn with meal-prep containers and a training logbook - cutting without losing strength",
  },
  seoTitle:
    "Cutting Without Losing Strength: A 12-Week Faith-Driven Fat-Loss Guide",
  seoDescription:
    "A disciplined 12-week cutting protocol for lifters who refuse to trade strength for the scale. Deficit size, protein targets, training adjustments, and the stewardship theology behind all of it.",
  tldr: [
    "A cut is a season with a start date, an end date, and a defined deficit - 300 to 500 calories below maintenance. Anything vaguer is drift, and anything steeper is a controlled demolition.",
    "Strength is preserved by keeping the heavy top sets and trimming volume, not by lifting lighter. The heavy bar is the signal that tells your body the muscle stays.",
    "Protein at roughly one gram per pound of bodyweight is non-negotiable on a cut. It is the single largest lever for holding muscle in a deficit.",
    "Aim to lose 0.5 to 1 percent of bodyweight per week, measured by weekly average, not by any single morning on the scale.",
    "The discipline of a cut is a stewardship issue before it is an aesthetic one. Strict training for a defined season is one of the oldest patterns in the Christian life.",
  ],
  body: [
    // ─── OPENING ───────────────────────────────────────────────────────────────
    {
      _key: "open001",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "open001s",
          _type: "span",
          marks: [],
          text: "Pete Fluriach, founder of Alpha Omega Strength Team. The first time I tried to cut, I did what most lifters do: I panicked, slashed calories, doubled my cardio, and watched two years of strength walk out the door in about ten weeks. The scale said I won. The bar said otherwise. It took me a full year to get back what that cut took, and the lesson stuck - fat loss done badly is not discipline. It is impatience wearing discipline's clothes.",
        },
      ],
    },
    {
      _key: "open002",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "open002s",
          _type: "span",
          marks: [],
          text: "This guide is the protocol I wish someone had handed me: a 12-week cut built to take fat off while defending the strength underneath it. It is not fast. It is not clever. It is a season of strict, boring, repeatable obedience - and it works.",
        },
      ],
    },
    {
      _key: "open003",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "open003s",
          _type: "span",
          marks: [],
          text: "What Every Faith-Driven Lifter Needs to Know About Cutting",
        },
      ],
    },
    {
      _key: "open004",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "open004s",
          _type: "span",
          marks: [],
          text: "A cut is a defined season of eating below maintenance to reduce body fat while protecting muscle and strength. Every word in that sentence is load-bearing. Defined - it has a start and an end. Season - it is temporary, not an identity. Below maintenance - by a measured amount, not by feel. Protecting muscle and strength - which is the part almost everyone skips, and the part this entire guide exists to serve.",
        },
      ],
    },
    // ─── SECTION 1 — FOUNDATION ────────────────────────────────────────────────
    {
      _key: "s1h2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "s1h2s",
          _type: "span",
          marks: [],
          text: "The Foundation: What a Deficit Actually Does to a Lifter",
        },
      ],
    },
    {
      _key: "s1p1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s1p1s",
          _type: "span",
          marks: [],
          text: "When you eat below maintenance, your body has to pay the difference from stored tissue. Your job during a cut is to make sure it pays from fat and not from muscle - and the body needs convincing, because muscle is metabolically expensive and the body is a ruthless accountant. Left alone in a deficit, it will happily trade away tissue you spent years building.",
        },
      ],
    },
    {
      _key: "s1p2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s1p2s",
          _type: "span",
          marks: [],
          text: "Two signals talk the body out of that trade. The first is heavy lifting - continued exposure to meaningful load tells your system the muscle is still earning its keep. The second is protein - enough raw material that repair never has to rob the reserves. Get those two right and a moderate deficit takes fat almost exclusively. Get either wrong and the cut starts eating the lifter.",
        },
      ],
    },
    {
      _key: "s1p3",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s1p3s",
          _type: "span",
          marks: [],
          text: "Who should cut? A lifter with a real reason: health markers moving the wrong way, a belt line that has crept for two straight years, a division of life where the extra weight is no longer serving strength but hiding from it. Who should not? Beginners still in their first year under the bar - they can recomp on maintenance calories - and anyone whose training is already falling apart, because a deficit fixes nothing that discipline has not already addressed.",
        },
      ],
    },
    {
      _key: "img_inline1",
      _type: "image",
      asset: {
        url: "/images/blog/cutting-without-losing-strength/inline-1.webp",
      },
      alt: "Infographic summarizing the 12-week disciplined cut: 300-500 calorie deficit, one gram of protein per pound, heavy lifting, walking for cardio, and 0.5-1 percent bodyweight loss per week - cutting without losing strength",
    },
    // ─── SECTION 2 — DECISION FRAMEWORK ────────────────────────────────────────
    {
      _key: "s2h2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "s2h2s",
          _type: "span",
          marks: [],
          text: "The Decision Framework: Choosing the Right Kind of Cut",
        },
      ],
    },
    {
      _key: "s2p1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s2p1s",
          _type: "span",
          marks: [],
          text: "Not every fat-loss approach deserves the name. Before you commit twelve weeks of your life, be honest about which of these you are actually choosing - because most lifters who say they are cutting are running one of the failure modes below without admitting it.",
        },
      ],
    },
    {
      _key: "s2tbl",
      _type: "table",
      caption: "Fat-loss approaches compared for the lifter who intends to keep his strength",
      rows: [
        {
          _key: "s2tblh",
          cells: ["Approach", "Deficit", "Timeline", "What Happens to Strength", "Where It Breaks Down"],
        },
        {
          _key: "s2tbl1",
          cells: ["Crash cut", "1,000+ calories", "4-6 weeks", "Falls fast, muscle goes with it", "The rebound eats the result"],
        },
        {
          _key: "s2tbl2",
          cells: ["Disciplined cut (this guide)", "300-500 calories", "10-14 weeks", "Held, with a small dip late", "Requires patience most skip"],
        },
        {
          _key: "s2tbl3",
          cells: ["Mini-cut", "500-750 calories", "3-4 weeks", "Mostly held", "Too short to move much fat"],
        },
        {
          _key: "s2tbl4",
          cells: ["Recomp at maintenance", "None", "6+ months", "Climbs slowly", "Glacial past the beginner stage"],
        },
        {
          _key: "s2tbl5",
          cells: ["\"Eating cleaner\" drift", "Undefined", "Indefinite", "Unchanged", "No deficit means no change"],
        },
      ],
    },
    {
      _key: "s2p2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s2p2s",
          _type: "span",
          marks: [],
          text: "The disciplined cut wins not because it is the fastest - it is not - but because it is the only row on that table where you finish with both the fat gone and the lifter intact. A 300 to 500 calorie deficit is small enough that training quality survives and large enough that the scale moves every single week. That is the trade. Everything steeper is borrowing against your strength, and the interest rate is brutal.",
        },
      ],
    },
    // ─── SECTION 3 — THE 12-WEEK PROTOCOL ──────────────────────────────────────
    {
      _key: "s3h2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "s3h2s",
          _type: "span",
          marks: [],
          text: "The 12-Week Protocol: Week by Week",
        },
      ],
    },
    {
      _key: "s3p1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s3p1s",
          _type: "span",
          marks: [],
          text: "Weeks 1 through 4 - establish. Find maintenance by tracking a normal week of eating, then set intake 300 to 500 calories under it. Protein goes to roughly one gram per pound of bodyweight and it is the first thing planned in every meal, not the last. Training does not change at all in this block - same program, same top sets, same intent. Add three or four 30-to-40-minute walks. Weigh yourself daily, but judge only the weekly average. You are looking for 0.5 to 1 percent of bodyweight lost per week - for a 200-pound man, one to two pounds.",
        },
      ],
    },
    {
      _key: "s3p2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s3p2s",
          _type: "span",
          marks: [],
          text: "Weeks 5 through 8 - adjust. Somewhere in this block the bar starts feeling heavier than the number says it should. That is normal. Respond by trimming volume, never load: drop a back-off set or two from each lift and keep every top set heavy. The heavy single, double, or triple is the signal that preserves the muscle - protect it like it is the whole point, because it is. If the weekly average stalls for two straight weeks, take another 100 to 150 calories off, preferably from carbs away from training. Do not touch the protein.",
        },
      ],
    },
    {
      _key: "img_inline2",
      _type: "image",
      asset: {
        url: "/images/blog/cutting-without-losing-strength/inline-2.webp",
      },
      alt: "Lifter seated on a bench in a garage gym at dawn, head bowed, resting between heavy sets during a cutting phase - cutting without losing strength",
    },
    {
      _key: "s3p3",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s3p3s",
          _type: "span",
          marks: [],
          text: "Weeks 9 through 12 - hold the line. This is the block where diet fatigue is real and every excuse sounds reasonable. Hunger is louder, sleep runs shallower, and the mirror starts negotiating with you. Change nothing. If you are still losing inside the target range, ride it to the end. Then - and this matters as much as the cut itself - exit deliberately. Add 200 to 300 calories per week for two to three weeks back to your new maintenance. A cut that ends in a two-week food celebration returns every pound with interest, and worse, it teaches you that seasons of discipline end in collapse. They should end in order.",
        },
      ],
    },
    // ─── SECTION 4 — THE MISTAKES THAT COST STRENGTH ───────────────────────────
    {
      _key: "s4h2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "s4h2s",
          _type: "span",
          marks: [],
          text: "The Five Mistakes That Cost Lifters Their Strength",
        },
      ],
    },
    {
      _key: "s4p1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s4p1s",
          _type: "span",
          marks: [],
          text: "Nearly every strength loss on a cut traces to one of five self-inflicted wounds:",
        },
      ],
    },
    {
      _key: "s4b1",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s4b1s",
          _type: "span",
          marks: [],
          text: "Cutting calories and adding training volume in the same week - you widened the deficit twice and called it once",
        },
      ],
    },
    {
      _key: "s4b2",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s4b2s",
          _type: "span",
          marks: [],
          text: "Lifting lighter \"to be safe\" - removing the exact signal that tells your body to keep the muscle",
        },
      ],
    },
    {
      _key: "s4b3",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s4b3s",
          _type: "span",
          marks: [],
          text: "Letting protein slide on busy days - the one macro a cut cannot forgive",
        },
      ],
    },
    {
      _key: "s4b4",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s4b4s",
          _type: "span",
          marks: [],
          text: "Reacting to a single morning's scale reading instead of the weekly average",
        },
      ],
    },
    {
      _key: "s4b5",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s4b5s",
          _type: "span",
          marks: [],
          text: "Replacing lifting sessions with cardio - trading the work that keeps muscle for work that only spends calories",
        },
      ],
    },
    {
      _key: "s4p2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s4p2s",
          _type: "span",
          marks: [],
          text: "Notice that none of these are knowledge problems. Every one is a patience problem. The lifter who loses strength on a cut almost never lost it to the deficit - he lost it to his own urgency, layered on top of the deficit until the load was more than recovery could carry.",
        },
      ],
    },
    // ─── SECTION 5 — STEWARDSHIP ───────────────────────────────────────────────
    {
      _key: "s5h2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "s5h2s",
          _type: "span",
          marks: [],
          text: "Stewardship: Why the Discipline Matters More Than the Mirror",
        },
      ],
    },
    {
      _key: "s5p1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5p1s",
          _type: "span",
          marks: [],
          text: "Paul reached for an athlete in strict training when he wanted to describe the Christian life: \"Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever\" (1 Corinthians 9:25 NIV). Strict training - a defined season of deliberate restriction in service of something that matters - is not foreign to the faith. It is one of its oldest pictures.",
        },
      ],
    },
    {
      _key: "s5p2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5p2s",
          _type: "span",
          marks: [],
          text: "That reframes what a cut is. It is not punishment for what you ate, and it is not vanity chasing a summer photograph. It is twelve weeks of practiced self-control over the most persistent appetite you own - and self-control is not optional equipment for a Christian man. \"Like a city whose walls are broken through is a person who lacks self-control\" (Proverbs 25:28 NIV). A man who cannot govern his plate for a season should not be surprised that other walls in his life need mortar too.",
        },
      ],
    },
    {
      _key: "img_inline3",
      _type: "image",
      asset: {
        url: "/images/blog/cutting-without-losing-strength/inline-3.webp",
      },
      alt: "Typographic infographic reading You Are Not Your Own with citations from 1 Corinthians 6:19-20 - stewardship for the cutting faith-driven lifter",
    },
    {
      _key: "s5p3",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5p3s",
          _type: "span",
          marks: [],
          text: "And underneath the discipline sits the reason for it: \"Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies\" (1 Corinthians 6:19-20 NIV). The body you are cutting is not yours. It is entrusted. Stewardship is the whole frame - which is exactly why the crash cut fails the theology test as badly as it fails the strength test. Wrecking the temple faster is not better stewardship of the temple.",
        },
      ],
    },
    // ─── FAQ ───────────────────────────────────────────────────────────────────
    {
      _key: "faqh2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        { _key: "faqh2s", _type: "span", marks: [], text: "Frequently Asked Questions" },
      ],
    },
    {
      _key: "faq1h",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "faq1hs", _type: "span", marks: [], text: "Will I lose strength on a 12-week cut?" },
      ],
    },
    {
      _key: "faq1p",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "faq1ps",
          _type: "span",
          marks: [],
          text: "With a moderate deficit, high protein, and heavy top sets kept in place, most lifters hold their strength through week eight and see only a small dip in the final block - a few percent on bar speed, occasionally a rep off the top end. That returns within two to three weeks of eating at maintenance again. Large, lasting losses come from the mistakes in section four, not from the deficit itself.",
        },
      ],
    },
    {
      _key: "faq2h",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "faq2hs", _type: "span", marks: [], text: "How much protein do I actually need while cutting?" },
      ],
    },
    {
      _key: "faq2p",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "faq2ps",
          _type: "span",
          marks: [],
          text: "Roughly one gram per pound of bodyweight per day. Heavier lifters carrying more body fat can anchor to target bodyweight instead. The research range runs a little lower, but on a cut the higher end costs you nothing and buys insurance - protein is the most filling macro and the strongest single defense against muscle loss in a deficit.",
        },
      ],
    },
    {
      _key: "faq3h",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "faq3hs", _type: "span", marks: [], text: "Should I keep lifting heavy while in a deficit?" },
      ],
    },
    {
      _key: "faq3p",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "faq3ps",
          _type: "span",
          marks: [],
          text: "Yes - it is the least negotiable part of the whole protocol. Heavy load is the signal that tells your body the muscle is still needed. Reduce total volume when recovery tightens, but keep the top sets heavy and the intent sharp. The lifter who switches to light weights and high reps for the duration of a cut is quietly telling his body the heavy tissue is surplus.",
        },
      ],
    },
    {
      _key: "faq4h",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "faq4hs", _type: "span", marks: [], text: "Is caring about body fat vanity for a Christian?" },
      ],
    },
    {
      _key: "faq4p",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "faq4ps",
          _type: "span",
          marks: [],
          text: "It can be - motives matter, and Scripture has hard words for men who live for their own reflection. But maintaining the body you were entrusted with, so it can serve your family, your work, and your church for more years at full capacity, is not vanity. It is maintenance on something you do not own. Run the cut as stewardship and the mirror becomes a gauge, not a god.",
        },
      ],
    },
    // ─── CONCLUSION ────────────────────────────────────────────────────────────
    {
      _key: "conch2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        { _key: "conch2s", _type: "span", marks: [], text: "The Bottom Line" },
      ],
    },
    {
      _key: "concp1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "concp1s",
          _type: "span",
          marks: [],
          text: "A cut that costs you your strength was not a cut. It was a retreat dressed up as one. The disciplined version is slower and less dramatic: a modest deficit, protein planned first, heavy top sets defended to the last week, walks instead of punishment cardio, and a deliberate exit back to maintenance.",
        },
      ],
    },
    {
      _key: "concp2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "concp2s",
          _type: "span",
          marks: [],
          text: "Twelve weeks of that is enough to change a body meaningfully - ten to fifteen pounds of fat gone for most men, with the bar numbers waiting for you on the other side. More than that, it is twelve weeks of proving to yourself that your appetites answer to you and not the other way around. That lesson outlasts the body-fat percentage.",
        },
      ],
    },
    {
      _key: "concp3",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "concp3s",
          _type: "span",
          marks: [],
          text: "Strict training, for a defined season, in service of something that lasts. The pattern is older than the barbell. Set the date, do the math, and hold the line.",
        },
      ],
    },
  ],
};

export default post;

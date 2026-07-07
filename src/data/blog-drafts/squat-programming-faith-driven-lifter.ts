import type { BlogPost } from "../blog-posts";

/**
 * AO daily blog - 2026-07-07
 * Universal Blog Post template (Opening + 5 sections + FAQ + Conclusion).
 * Primary keyword: squat programming for intermediate lifters
 */

const post: BlogPost = {
  slug: "squat-programming-faith-driven-lifter",
  title:
    "The Faith-Driven Lifter's Guide to Squat Programming: A 12-Week Block for Real Progress",
  date: "2026-07-07",
  excerpt:
    "If your squat has been stuck at the same number for months, the problem is almost never effort. It's programming. Here is a concrete 12-week block, built for the intermediate lifter who has stalled - and the faith frame that keeps you in it for all twelve weeks.",
  tags: ["Training", "Discipline", "Faith"],
  author: "Pete Fluriach",
  mainImage: {
    src: "/images/blog/squat-programming-faith-driven-lifter/hero.webp",
    alt: "A loaded barbell resting in an empty power rack at dawn in a spare monochrome gym - squat programming for intermediate lifters",
  },
  seoTitle:
    "Squat Programming for Intermediate Lifters: A 12-Week Block (Faith-Driven Guide)",
  seoDescription:
    "A concrete 12-week squat program for intermediate lifters who have stalled. Weekly RPE and load prescriptions, a comparison of programming approaches, and the faith frame that keeps you patient for all twelve weeks.",
  tldr: [
    "Most stalled squats are a programming problem, not an effort problem. Adding more weight to the same 3x5 every session stops working once you leave the novice phase.",
    "The 12-week block moves through three phases: Accumulation (weeks 1-4, RPE 7-8), Intensification (weeks 5-8, RPE 8-9), and Peak and Test (weeks 9-12).",
    "RPE - how many reps you have left in the tank - matters more than a fixed percentage once you are past the beginner stage. Learn to read it honestly.",
    "The hardest part of a 12-week block is not the heavy weeks. It is staying in weeks 1-4, when the loads feel easy and your ego wants to skip ahead. Patience is the whole game.",
    "Galatians 6:9 is the programming verse: do not become weary in doing good, because the harvest comes at the proper time - not the time you demand.",
  ],
  body: [
    // OPENING
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
          text: "Pete Fluriach, founder of Alpha Omega Strength Team. I get some version of the same message every week: a guy who has been lifting for two or three years, squatting hard, eating enough, and watching the number on the bar sit in the same place for months. He assumes he needs to want it more. Almost always, he is wrong. What he needs is a plan that stops treating him like a beginner. This guide is the 12-week squat block I hand those men, the reasoning behind each phase, and the faith frame that keeps a lifter in the program long enough for it to work.",
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
          text: "Squat programming is not complicated, but it is patient work. The beginner adds weight every session and calls it progress. The intermediate cannot. His body has adapted to the point where growth has to be earned across weeks, not workouts - and that shift is exactly where most lifters quit, change programs, or start blaming their effort. It is a stewardship problem before it is a training problem.",
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
          text: "What Every Intermediate Lifter Needs to Know About Squat Programming",
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
          text: "Squat programming is the deliberate arrangement of load, volume, and intensity across time so the body is forced to adapt in a direction you chose on purpose. For an intermediate lifter, that means organizing training into phases instead of chasing a bigger number every session. The block below is built for the man who has stalled somewhere in the 275-to-405-pound range and cannot understand why last year's approach stopped paying out.",
        },
      ],
    },
    {
      _key: "open005",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "open005s",
          _type: "span",
          marks: [],
          text: "Before you touch a barbell, hold the four variables that decide whether a squat block actually works:",
        },
      ],
    },
    {
      _key: "open006",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "open006s", _type: "span", marks: [], text: "Intensity - how heavy the bar is relative to your best, usually expressed as RPE or a percentage" },
      ],
    },
    {
      _key: "open007",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "open007s", _type: "span", marks: [], text: "Volume - the total work done, counted in hard sets across the week, not just the top set" },
      ],
    },
    {
      _key: "open008",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "open008s", _type: "span", marks: [], text: "Frequency - how many times per week you train the squat pattern, which for most intermediates should be two" },
      ],
    },
    {
      _key: "open009",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "open009s", _type: "span", marks: [], text: "Progression - the rule that decides when and how the load moves up, week to week, without breaking down" },
      ],
    },
    {
      _key: "open010",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "open010s",
          _type: "span",
          marks: [],
          text: "Get those four in the right order and the squat takes care of itself. Here is the whole block at a glance before we walk through it phase by phase.",
        },
      ],
    },
    // INFOGRAPHIC 1 (inline-1) - 12-week block at a glance
    {
      _key: "openimg",
      _type: "image",
      asset: {
        url: "/images/blog/squat-programming-faith-driven-lifter/inline-1.webp",
      },
      alt: "Infographic of the 12-week squat block - Accumulation weeks 1-4, Intensification weeks 5-8, Peak and Test weeks 9-12 - squat programming for intermediate lifters",
    },

    // SECTION 1 - Landscape / Theology
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
          text: "Why Your Squat Stalled - and Why That's Not a Character Flaw",
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
          text: "A novice squat progresses because almost anything works. The nervous system is learning the movement, and the body responds to the simple shock of adding weight. That window closes. Once you have squatted seriously for a year or two, the same 3x5-add-five-pounds approach that once added a hundred pounds to your total stops moving the needle at all. Nothing is wrong with you. You have simply outgrown a beginner's tool and kept using it.",
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
          text: "This is where a faith-driven lifter has an advantage, if he will use it. Scripture never promises that faithful work pays out immediately. It promises that it pays out. Galatians 6:9 says, “Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up” (Galatians 6:9 NIV). The proper time - not the impatient time, not the time your ego set. A 12-week block is a small, physical exercise in believing that.",
        },
      ],
    },
    // PHOTO 2 (inline-2) - loading plates
    {
      _key: "s1img",
      _type: "image",
      asset: {
        url: "/images/blog/squat-programming-faith-driven-lifter/inline-2.webp",
      },
      alt: "A lifter kneeling to load a heavy steel plate onto a barbell in a monochrome gym - squat programming for intermediate lifters",
    },
    {
      _key: "s1h3a",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s1h3as", _type: "span", marks: [], text: "Discipline Is Not Punishment - It's Direction" },
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
          text: "Most men treat a training stall as a verdict on their toughness. It is not. Hebrews 12:11 puts discipline in its proper place: “No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it” (Hebrews 12:11 NIV). A structured block is discipline in the plainest sense - a set of constraints you accept now for a result you cannot yet see. The constraints are the point.",
        },
      ],
    },
    {
      _key: "s1l1",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "s1l1s", _type: "span", marks: [], text: "Function - a block redirects effort you already have toward a target the body can actually reach" },
      ],
    },
    {
      _key: "s1l2",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "s1l2s", _type: "span", marks: [], text: "Length - long enough for real adaptation, short enough to stay accountable to it: twelve weeks is the sweet spot" },
      ],
    },
    {
      _key: "s1l3",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "s1l3s", _type: "span", marks: [], text: "Cost - the ego hit of starting lighter than you finished last time, on purpose" },
      ],
    },
    {
      _key: "s1l4",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        { _key: "s1l4s", _type: "span", marks: [], text: "Result - a squat that is stronger in twelve weeks because it was patient in the first four" },
      ],
    },

    // SECTION 2 - Decision Framework (TABLE lives here)
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
          text: "How to Choose Your Squat Programming Approach",
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
          text: "Not every intermediate needs the same structure. Before you commit to the 12-week block, understand the honest trade-offs between the common approaches. The table below lays out who each one serves and where each one tends to break down.",
        },
      ],
    },
    {
      _key: "s2tbl",
      _type: "table",
      caption: "Squat programming approaches compared for the stalled intermediate lifter",
      rows: [
        { _key: "s2tblh", cells: ["Approach", "Best For", "Weekly Structure", "Where It Breaks Down"] },
        { _key: "s2tbl1", cells: ["Linear progression", "True novices", "Add load every session, 3x5", "Stops working weeks into intermediate training"] },
        { _key: "s2tbl2", cells: ["Double progression", "Early intermediates", "Add reps first, then load, 3x6-8", "Slow to move the main lift on its own"] },
        { _key: "s2tbl3", cells: ["Daily undulating", "Lifters who bore easily", "Heavy, medium, light rotated by day", "Hard to autoregulate without a coach"] },
        { _key: "s2tbl4", cells: ["12-week block (this guide)", "Stalled intermediates", "Phased: 4x6, then 5x3, then peak", "Requires patience across all twelve weeks"] },
      ],
    },
    {
      _key: "s2h3a",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s2h3as", _type: "span", marks: [], text: "Why the Block Wins for a Stalled Intermediate" },
      ],
    },
    {
      _key: "s2l1a",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [{ _key: "s2l1as", _type: "span", marks: [], text: "It separates building from testing, so you are not maxing out every week and grinding yourself into the ground" }],
    },
    {
      _key: "s2l1b",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [{ _key: "s2l1bs", _type: "span", marks: [], text: "It builds a base of volume first, which is the raw material every later strength gain is cut from" }],
    },
    {
      _key: "s2l1c",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [{ _key: "s2l1cs", _type: "span", marks: [], text: "It ends with a planned test, so you find out what the work bought instead of guessing" }],
    },
    {
      _key: "s2h3b",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s2h3bs", _type: "span", marks: [], text: "Learn to Read RPE Before You Start" },
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
          text: "The block is written in RPE - rate of perceived exertion - because fixed percentages lie to an intermediate. Some days 80 percent moves like a warm-up; some days it feels like a max. RPE keeps you honest to the day you actually have, not the day the spreadsheet assumed. The scale is simple: it counts how many good reps you had left when you racked the bar.",
        },
      ],
    },
    {
      _key: "s2tip",
      _type: "block",
      style: "blockquote",
      markDefs: [],
      children: [
        {
          _key: "s2tips",
          _type: "span",
          marks: [],
          text: "Expert tip: if you have never trained by RPE, spend the first week deliberately leaving two or three reps in the tank and writing down what that felt like. Most intermediates discover they have been training closer to failure than they thought - and that is exactly why they stalled.",
        },
      ],
    },

    // SECTION 3 - Use-Case / the phases
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
          text: "The 12-Week Squat Block, Phase by Phase",
        },
      ],
    },
    // INFOGRAPHIC 2 (inline-3) - RPE scale
    {
      _key: "s3img",
      _type: "image",
      asset: {
        url: "/images/blog/squat-programming-faith-driven-lifter/inline-3.webp",
      },
      alt: "Infographic reading the RPE scale for the squat, from RPE 6 to RPE 10 - squat programming for intermediate lifters",
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
          text: "The block runs in three four-week phases. Squat twice a week throughout - one heavier primary day and one lighter volume day. The prescriptions below are for the primary day; keep the second day at roughly the same sets and reps but two RPE points lighter.",
        },
      ],
    },
    {
      _key: "s3l1",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l1s",
          _type: "span",
          marks: [],
          text: "Phase 1, Accumulation (weeks 1-4): 4 sets of 6 at RPE 7-8, adding about 2.5 percent to the bar each week. This phase feels too easy on purpose. You are laying down volume, not proving anything. Do not skip ahead.",
        },
      ],
    },
    {
      _key: "s3l2",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l2s",
          _type: "span",
          marks: [],
          text: "Phase 2, Intensification (weeks 5-8): 5 sets of 3 at RPE 8-9. The reps drop, the weight climbs, and the work gets specific. This is where the base you built in Phase 1 starts converting into a heavier squat.",
        },
      ],
    },
    {
      _key: "s3l3",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l3s",
          _type: "span",
          marks: [],
          text: "Phase 3, Peak and Test (weeks 9-12): triples and doubles at RPE 9, tapering volume hard in week 12 before you test a new top single or triple. You do not add training stress here. You express what you already built.",
        },
      ],
    },
    {
      _key: "s3h3a",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s3h3as", _type: "span", marks: [], text: "Heavy Day, Light Day, and the Deload You Will Want to Skip" },
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
          text: "Two squat days a week is enough for almost every intermediate. The mistake is making both of them hard. Structure the week like this:",
        },
      ],
    },
    {
      _key: "s3l4",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l4s",
          _type: "span",
          marks: [],
          text: "Primary day - the prescribed sets, reps, and RPE for the current phase; this is the session that drives progress",
        },
      ],
    },
    {
      _key: "s3l5",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l5s",
          _type: "span",
          marks: [],
          text: "Secondary day - same movement, two RPE points lighter, often paused or tempo reps to reinforce position without piling on fatigue",
        },
      ],
    },
    {
      _key: "s3l6",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      level: 1,
      markDefs: [],
      children: [
        {
          _key: "s3l6s",
          _type: "span",
          marks: [],
          text: "Deload - a planned lighter week at the end of Phase 2 (week 8 or 9); the week you most want to skip is the week you most need, because it is what lets the peak land",
        },
      ],
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
          text: "If you want the theology underneath all of this - why rest is built into the design of good work and not a concession to weakness - it is worth sitting with the pattern of Sabbath. The body was made to build in cycles of work and recovery, and a training block simply obeys that design.",
        },
      ],
    },
    // INSTAGRAM EMBED (RULE 1) - end of Section 3, before Section 4
    {
      _key: "ig_squatprog",
      _type: "instagramEmbed",
      url: "https://www.instagram.com/reel/DafT94kE-ww/",
    },

    // SECTION 4 - Brand Value / Transition
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
          text: "Why Faith-Driven Programming Outlasts Motivation",
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
          text: "Motivation gets a lifter through week one. It does not get him through week five, when the loads are heavy and the results are still mostly underground. What carries a man through the middle of a block is not feeling - it is conviction that faithful, repeated work is worth doing whether or not today's session felt impressive. That conviction is the quiet backbone of Alpha Omega Strength Team: beginning and end, the whole thing under the lordship of Christ, without the noise.",
        },
      ],
    },
    {
      _key: "s4h3",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s4h3s", _type: "span", marks: [], text: "Getting the Most Out of the 12-Week Block" },
      ],
    },
    {
      _key: "s4n1",
      _type: "block",
      style: "normal",
      listItem: "number",
      level: 1,
      markDefs: [],
      children: [{ _key: "s4n1s", _type: "span", marks: [], text: "Log every session - load, sets, reps, and your honest RPE - so the block is a record you can learn from, not a memory you argue with" }],
    },
    {
      _key: "s4n2",
      _type: "block",
      style: "normal",
      listItem: "number",
      level: 1,
      markDefs: [],
      children: [{ _key: "s4n2s", _type: "span", marks: [], text: "Start lighter than your ego wants in Phase 1; the whole block fails if week one is already an RPE 9" }],
    },
    {
      _key: "s4n3",
      _type: "block",
      style: "normal",
      listItem: "number",
      level: 1,
      markDefs: [],
      children: [{ _key: "s4n3s", _type: "span", marks: [], text: "Do not add exercises mid-block to feel busier; the plan works because of what it leaves out, not what you bolt onto it" }],
    },
    {
      _key: "s4n4",
      _type: "block",
      style: "normal",
      listItem: "number",
      level: 1,
      markDefs: [],
      children: [{ _key: "s4n4s", _type: "span", marks: [], text: "Take the deload as written; the men who skip it are the same men who fail their test in week twelve" }],
    },

    // SECTION 5 - FAQ
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
          text: "Frequently Asked Questions About Squat Programming",
        },
      ],
    },
    {
      _key: "s5q1",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s5q1s", _type: "span", marks: [], text: "How do I know if I'm an intermediate and not a beginner?" },
      ],
    },
    {
      _key: "s5a1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5a1s",
          _type: "span",
          marks: [],
          text: "The simplest test is your progression rate. If you can still add weight to your squat every session or two and recover for the next one, you are a beginner and should keep doing exactly that. If adding weight session to session has stopped working and you now need weeks to move up, you are an intermediate - and this block is written for you.",
        },
      ],
    },
    {
      _key: "s5q2",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s5q2s", _type: "span", marks: [], text: "How often should I squat during the block?" },
      ],
    },
    {
      _key: "s5a2",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5a2s",
          _type: "span",
          marks: [],
          text: "Twice a week for almost everyone: one primary day that follows the phase prescription and one secondary day about two RPE points lighter. Some advanced intermediates handle a third lighter exposure, but if you are stalled, two well-run days will almost always outperform three sloppy ones.",
        },
      ],
    },
    {
      _key: "s5q3",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        { _key: "s5q3s", _type: "span", marks: [], text: "What if I miss a week or have to reset a phase?" },
      ],
    },
    {
      _key: "s5a3",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "s5a3s",
          _type: "span",
          marks: [],
          text: "Miss a single session and just pick up where you left off. Miss a full week or more and repeat the last week you completed before moving on - do not try to make it up by jumping ahead. A block is not a streak to protect; it is a direction to keep walking. Get back on the path and keep going.",
        },
      ],
    },

    // CLOSING
    {
      _key: "ch2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        { _key: "ch2s", _type: "span", marks: [], text: "Conclusion" },
      ],
    },
    {
      _key: "cp1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "cp1s",
          _type: "span",
          marks: [],
          text: "A stalled squat is not a sign that you have hit your ceiling. It is a sign that the tool you used to get here has done its job and handed you off to a better one. The 12-week block asks for something most lifters find harder than heavy weight: the patience to build quietly for four weeks before anything shows. Give it the full twelve. Start lighter than your pride wants, log the work, take the deload, and test at the end. The harvest comes at the proper time - and the man who does not give up is the one who reaps it.",
        },
      ],
    },
  ],
};

export default post;

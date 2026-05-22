/**
 * AO Strength Team — Blog posts (static data layer).
 *
 * Replaces the Sanity CMS fetch path. Hand-edit this file to publish new posts.
 * The PortableText `body` array preserves the original Sanity shape so the
 * existing @portabletext/react renderer in `app/blog/[slug]/page.tsx` works
 * unchanged.
 *
 * For body images, use:
 *   { _type: "image", asset: { url: "/images/blog/<slug>/inline-1.webp" }, alt: "..." }
 *
 * For the hero image, set `mainImage.src` to a path under /public/images/blog/<slug>/.
 */

import type { PortableTextBlock } from "@portabletext/react";

// New blog posts (2026-05 wave) — each draft lives in ./blog-drafts/<slug>.ts and is appended to `blogPosts` below.
import beginnersGuide from "./blog-drafts/beginners-guide-lifting-as-a-christian";
import progressiveOverload from "./blog-drafts/progressive-overload-for-faith-driven-athletes";
import apparelGuide from "./blog-drafts/faith-driven-gym-apparel-guide";
import trainingAsWorship from "./blog-drafts/training-as-worship";
import womensGuide from "./blog-drafts/christian-womens-guide-to-strength-training";
import unbreakable from "./blog-drafts/unbreakable-finishing-strong";
import preWorkoutPrayer from "./blog-drafts/pre-workout-prayer-faith-driven-lifters";
import faithDrivenTrainingSplit from "./blog-drafts/faith-driven-training-split-for-busy-men";
import whatTheBibleSaysAboutPhysicalStrength from "./blog-drafts/what-the-bible-says-about-physical-strength";
import morningVsEveningTraining from "./blog-drafts/morning-vs-evening-training-faith-driven-lifter";
import compoundLifts from "./blog-drafts/compound-lifts-every-christian-man-should-know";

export interface BlogPostImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PortableTextInlineImage {
  _type: "image";
  _key?: string;
  asset: { url: string };
  alt: string;
}

export interface InstagramEmbedBlock {
  _type: "instagramEmbed";
  _key?: string;
  url: string;
  caption?: string;
}

export type BlogBodyBlock = PortableTextBlock | PortableTextInlineImage | InstagramEmbedBlock;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: BlogBodyBlock[];
  tags: string[];
  author: string;
  mainImage?: BlogPostImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  // Optional fields the UI components check for:
  tldr?: string[];
  series?: string;
  seriesNumber?: number;
  modifiedDate?: string;
  /** Optional list of product slugs for in-article CTA. */
  relatedProducts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    "slug": "rest-is-not-weakness",
    "title": "Rest Is Not Weakness — The Case for Recovery",
    "date": "2026-04-18",
    "excerpt": "God rested on the seventh day. Jesus told his disciples to come away and rest. If they needed it, so do you.",
    "tags": [
      "Recovery",
      "Wellness",
      "Faith"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "a0be414e1922",
        "_type": "block",
        "children": [
          {
            "_key": "a0be414e19220",
            "_type": "span",
            "marks": [],
            "text": "There's a strain of fitness culture that treats rest like failure. More is more. If you're not sore, you didn't work hard enough. Rest days are for people who don't want it badly enough."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "bb3c7cfca4c1",
        "_type": "block",
        "children": [
          {
            "_key": "bb3c7cfca4c10",
            "_type": "span",
            "marks": [],
            "text": "I used to believe some version of that. I trained through pain I should have addressed, skipped sleep to add another session, and called it discipline when it was actually just fear of falling behind. What I got from that approach was injury, stalled progress, and burnout."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "75aef663b23a",
        "_type": "block",
        "children": [
          {
            "_key": "75aef663b23a0",
            "_type": "span",
            "marks": [],
            "text": "Then I went back to the source."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e00846652a6a",
        "_type": "block",
        "children": [
          {
            "_key": "e00846652a6a0",
            "_type": "span",
            "marks": [],
            "text": "\"By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.\" — Genesis 2:2"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "2b95b8a9f988",
        "_type": "block",
        "children": [
          {
            "_key": "2b95b8a9f9880",
            "_type": "span",
            "marks": [],
            "text": "\"Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, 'Come with me by yourselves to a quiet place and get some rest.'\" — Mark 6:31"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "78c4118bb27c",
        "_type": "block",
        "children": [
          {
            "_key": "78c4118bb27c0",
            "_type": "span",
            "marks": [],
            "text": "God rested after creation. Jesus pulled his disciples away from productive work to rest. If the Creator of the universe built rest into the design, and if Jesus modeled it even in the middle of active ministry, then dismissing rest as weakness isn't discipline — it's arrogance."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "895ad6eb33ca",
        "_type": "block",
        "children": [
          {
            "_key": "895ad6eb33ca0",
            "_type": "span",
            "marks": [],
            "text": "What Actually Happens When You Sleep"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "7639fc3f9dbc",
        "_type": "block",
        "children": [
          {
            "_key": "7639fc3f9dbc0",
            "_type": "span",
            "marks": [],
            "text": "Muscle does not grow during your workout. It grows during recovery. Every training session creates microtears in muscle fibers through mechanical stress — that's the stimulus. The rebuilding, the thickening, the actual growth, happens afterward. And the majority of that repair happens during sleep."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c1a87318bd0b",
        "_type": "block",
        "children": [
          {
            "_key": "c1a87318bd0b0",
            "_type": "span",
            "marks": [],
            "text": "The NIH recommends 7-9 hours of sleep per night for adults, and the research on athletic performance makes a compelling case for being on the higher end of that range. A Stanford University study on collegiate basketball players found that extending sleep to 10 hours per night led to measurable improvements in sprint times, shooting accuracy, and reaction time after just five to seven weeks. They weren't lifting more. They were sleeping more."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1705932e0ec1",
        "_type": "block",
        "children": [
          {
            "_key": "1705932e0ec10",
            "_type": "span",
            "marks": [],
            "text": "The mechanism is growth hormone. Human growth hormone (HGH) — the body's primary driver of tissue repair and muscle synthesis — is released in its greatest pulses during slow-wave (deep) sleep. Cutting sleep cuts HGH. Cut HGH and you're training without the repair signal your body needs to respond to the stimulus you're giving it. You're putting stress on a system you're not letting recover."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e3e375e0346e",
        "_type": "block",
        "children": [
          {
            "_key": "e3e375e0346e0",
            "_type": "span",
            "marks": [],
            "text": "Sleep deprivation also raises cortisol — a catabolic hormone that breaks down muscle tissue. A 2011 study published in the "
          },
          {
            "_key": "e3e375e0346e1",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Annals of Internal Medicine"
          },
          {
            "_key": "e3e375e0346e2",
            "_type": "span",
            "marks": [],
            "text": " found that restricting sleep to 5.5 hours per night while in a caloric deficit led to 60% less fat loss and 55% more muscle loss compared to subjects sleeping 8.5 hours. Same calories. Same training. Just less sleep. The results were drastically different."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e1be909ccb1c",
        "_type": "block",
        "children": [
          {
            "_key": "e1be909ccb1c0",
            "_type": "span",
            "marks": [],
            "text": "Active Recovery Is Training Too"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "b9c9f61cba88",
        "_type": "block",
        "children": [
          {
            "_key": "b9c9f61cba880",
            "_type": "span",
            "marks": [],
            "text": "Rest doesn't have to mean doing nothing. Active recovery — low-intensity movement that increases blood flow without creating additional stress — accelerates the repair process."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "636453a23486",
        "_type": "block",
        "children": [
          {
            "_key": "636453a234860",
            "_type": "span",
            "marks": [],
            "text": "A 20-30 minute walk, a yoga or mobility session, light swimming, or a stretching routine all qualify. These activities move fresh blood and nutrients through damaged tissue, clear metabolic waste products like lactate, and reduce soreness through increased circulation — without triggering additional breakdown. Research in the "
          },
          {
            "_key": "636453a234861",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Athletic Training"
          },
          {
            "_key": "636453a234862",
            "_type": "span",
            "marks": [],
            "text": " found that active recovery significantly reduced delayed onset muscle soreness (DOMS) and improved performance readiness compared to complete rest."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8ec4d70556af",
        "_type": "block",
        "children": [
          {
            "_key": "8ec4d70556af0",
            "_type": "span",
            "marks": [],
            "text": "On my recovery days, I walk. I stretch. I do things that serve the body without taxing it. I also prioritize sleep — not as a luxury but as training."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "6c64b2adcdbd",
        "_type": "block",
        "children": [
          {
            "_key": "6c64b2adcdbd0",
            "_type": "span",
            "marks": [],
            "text": "Sabbath As a Training Principle"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "48e53482e94a",
        "_type": "block",
        "children": [
          {
            "_key": "48e53482e94a0",
            "_type": "span",
            "marks": [],
            "text": "The Sabbath principle is older than sports science, and it maps onto what we now know about periodization — the structured cycling of training stress and recovery that every legitimate strength and conditioning program is built around."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "95859b654116",
        "_type": "block",
        "children": [
          {
            "_key": "95859b6541160",
            "_type": "span",
            "marks": [],
            "text": "You cannot sustain maximum output indefinitely. The body adapts through cycles: stress, then rest, then adaptation. Every serious periodization model builds in deload weeks, recovery blocks, and intentional breaks from peak intensity. God prescribed this same rhythm before we had the language to explain why it works."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "2584676fb71c",
        "_type": "block",
        "children": [
          {
            "_key": "2584676fb71c0",
            "_type": "span",
            "marks": [],
            "text": "One full rest day per week is not optional — it's structural. One deload week every four to six weeks of training is not laziness — it's how progress compounds over months and years instead of stalling out after six weeks."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "886d7ceb297b",
        "_type": "block",
        "children": [
          {
            "_key": "886d7ceb297b0",
            "_type": "span",
            "marks": [],
            "text": "Permission to Stop"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "1b31d8e030bb",
        "_type": "block",
        "children": [
          {
            "_key": "1b31d8e030bb0",
            "_type": "span",
            "marks": [],
            "text": "If you're someone who struggles to rest — who feels guilty on days off, who equates stopping with weakness — I want to give you this clearly: rest is not the opposite of discipline. It is part of discipline. The most disciplined thing you can do some days is go to bed early, skip the extra session, and trust that the work you put in will be made complete by the recovery you give it."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4d07b2baf2b2",
        "_type": "block",
        "children": [
          {
            "_key": "4d07b2baf2b20",
            "_type": "span",
            "marks": [],
            "text": "God rested. Jesus rested. The strongest athletes on earth program rest deliberately. You are not too important, too behind, or too far from your goals to do the same."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4b7462fc3e97",
        "_type": "block",
        "children": [
          {
            "_key": "4b7462fc3e970",
            "_type": "span",
            "marks": [],
            "text": "Rest well. Come back stronger."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/rest-is-not-weakness/hero.webp",
      "alt": "Editorial image for the journal entry titled 'Rest Is Not Weakness — The Case for Recovery'."
    }
  },
  {
    "slug": "iron-sharpens-iron",
    "title": "Iron Sharpens Iron — Why You Need a Training Partner",
    "date": "2026-04-16",
    "excerpt": "You were not built to do this alone. The research backs it up, and Scripture said it first.",
    "tags": [
      "Community",
      "Training",
      "Faith"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "c4752a053df7",
        "_type": "block",
        "children": [
          {
            "_key": "c4752a053df70",
            "_type": "span",
            "marks": [],
            "text": "There's a version of fitness culture that glorifies isolation. The lone wolf. The grind-in-silence, 5 AM, no days off, need-nobody aesthetic. I understand the appeal. It feels strong. It looks disciplined on social media."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "6b480c92753a",
        "_type": "block",
        "children": [
          {
            "_key": "6b480c92753a0",
            "_type": "span",
            "marks": [],
            "text": "But it's not how we're designed. And it's not how the strongest people I know actually train."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4faa83d831f4",
        "_type": "block",
        "children": [
          {
            "_key": "4faa83d831f40",
            "_type": "span",
            "marks": [],
            "text": "\"As iron sharpens iron, so one person sharpens another.\" — Proverbs 27:17"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "7d1cae8b37c5",
        "_type": "block",
        "children": [
          {
            "_key": "7d1cae8b37c50",
            "_type": "span",
            "marks": [],
            "text": "That's not metaphor for motivational posters. It's a description of how human beings actually develop — through friction, accountability, and the honest resistance of another person who's in it with you."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "7f6efbb323a9",
        "_type": "block",
        "children": [
          {
            "_key": "7f6efbb323a90",
            "_type": "span",
            "marks": [],
            "text": "What the Research Says About Training Together"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "4c15189ce829",
        "_type": "block",
        "children": [
          {
            "_key": "4c15189ce8290",
            "_type": "span",
            "marks": [],
            "text": "The data on training partners and accountability is some of the most striking in all of behavioral science."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "23d37db170b5",
        "_type": "block",
        "children": [
          {
            "_key": "23d37db170b50",
            "_type": "span",
            "marks": [],
            "text": "A study published in the "
          },
          {
            "_key": "23d37db170b51",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Consulting and Clinical Psychology"
          },
          {
            "_key": "23d37db170b52",
            "_type": "span",
            "marks": [],
            "text": " found that having an accountability partner increased the success rate of behavioral commitments by up to 95%, compared to people who kept goals to themselves. That's not a marginal improvement — that's the difference between a goal and a result."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0bed8d825348",
        "_type": "block",
        "children": [
          {
            "_key": "0bed8d8253480",
            "_type": "span",
            "marks": [],
            "text": "Research from the University of Aberdeen found that having a new exercise companion who supported their partner's efforts led to a significant increase in workout frequency. The key variable wasn't just having a partner — it was having one who was actively engaged and emotionally invested. A partner who shows up and asks how it went is worth more than one who just texts encouragement."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "fcc233f8df8f",
        "_type": "block",
        "children": [
          {
            "_key": "fcc233f8df8f0",
            "_type": "span",
            "marks": [],
            "text": "On the physical side, a 2014 study in the "
          },
          {
            "_key": "fcc233f8df8f1",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Sport and Exercise Psychology"
          },
          {
            "_key": "fcc233f8df8f2",
            "_type": "span",
            "marks": [],
            "text": " found that working out alongside a more capable partner increased exercise intensity and duration by up to 200% in some participants — a phenomenon called the Köhler effect, where people work harder to avoid being the weakest link in a partnership."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0b33dc9067ba",
        "_type": "block",
        "children": [
          {
            "_key": "0b33dc9067ba0",
            "_type": "span",
            "marks": [],
            "text": "What a Training Partner Actually Does for Your Lifts"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "ce73d8999587",
        "_type": "block",
        "children": [
          {
            "_key": "ce73d89995870",
            "_type": "span",
            "marks": [],
            "text": "Beyond accountability, a training partner enables things that solo training physically cannot."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e56f3625ae7e",
        "_type": "block",
        "children": [
          {
            "_key": "e56f3625ae7e0",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Progressive overload becomes safer."
          },
          {
            "_key": "e56f3625ae7e1",
            "_type": "span",
            "marks": [],
            "text": " Attempting a new max on the bench press without a spotter is a risk most people rightfully avoid. A good training partner removes that ceiling. You can push to true failure because you have someone there to catch the weight if you fail. Research consistently shows that training to near-failure is one of the most important drivers of hypertrophy — and most people stop far short of that limit when training alone."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "274225780111",
        "_type": "block",
        "children": [
          {
            "_key": "2742257801110",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Form gets honest feedback."
          },
          {
            "_key": "2742257801111",
            "_type": "span",
            "marks": [],
            "text": " You cannot see yourself lift. Video helps, but a trained eye in real time catches breakdowns in technique before they become injuries. Your partner sees your back rounding before you feel it. They call out the rep you know you should re-do but won't if nobody's watching."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "75b0363576da",
        "_type": "block",
        "children": [
          {
            "_key": "75b0363576da0",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Consistency builds through shared momentum."
          },
          {
            "_key": "75b0363576da1",
            "_type": "span",
            "marks": [],
            "text": " On the days you don't want to go, knowing someone is waiting for you changes the calculation. You're no longer breaking a personal intention — you're leaving someone else without their workout. The external commitment is a forcing function that personal motivation cannot replicate on its own."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e57da2017f1a",
        "_type": "block",
        "children": [
          {
            "_key": "e57da2017f1a0",
            "_type": "span",
            "marks": [],
            "text": "What to Look for in a Training Partner"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "94c23531c2ac",
        "_type": "block",
        "children": [
          {
            "_key": "94c23531c2ac0",
            "_type": "span",
            "marks": [],
            "text": "Not every partner is created equal. The wrong one can drag you down as efficiently as the right one lifts you up."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c77982098100",
        "_type": "block",
        "children": [
          {
            "_key": "c779820981000",
            "_type": "span",
            "marks": [],
            "text": "You want someone who is consistent — who shows up when they say they will. You want someone who challenges you without competing against you; the goal is mutual growth, not ego. You want someone who is honest with you about your form, your effort, and your attitude. And ideally, you want someone whose values align — because the conversations you have between sets shape your mindset as much as the sets themselves."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "478312b63a62",
        "_type": "block",
        "children": [
          {
            "_key": "478312b63a620",
            "_type": "span",
            "marks": [],
            "text": "The Strength Team Is Bigger Than the Gym"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "46b171a6e311",
        "_type": "block",
        "children": [
          {
            "_key": "46b171a6e3110",
            "_type": "span",
            "marks": [],
            "text": "This is why we called this Alpha Omega "
          },
          {
            "_key": "46b171a6e3111",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Strength Team"
          },
          {
            "_key": "46b171a6e3112",
            "_type": "span",
            "marks": [],
            "text": " — not Strength Brand, not Strength Wear. Team is the word."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "6158ef130312",
        "_type": "block",
        "children": [
          {
            "_key": "6158ef1303120",
            "_type": "span",
            "marks": [],
            "text": "Your strength team isn't just your lifting partner. It's your faith community. The people who pray with you and hold you accountable to who you said you want to be. The ones who check in when you go quiet. The ones who remind you what you're training for when you've forgotten."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "90ee358e70f6",
        "_type": "block",
        "children": [
          {
            "_key": "90ee358e70f60",
            "_type": "span",
            "marks": [],
            "text": "Physical training done in community becomes something more than fitness. It becomes a practice of sharpening — where you become sharper through honest contact with other people who are trying to grow the same way you are."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c0213313f586",
        "_type": "block",
        "children": [
          {
            "_key": "c0213313f5860",
            "_type": "span",
            "marks": [],
            "text": "Find your iron. Let it sharpen you."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/iron-sharpens-iron/hero.webp",
      "alt": "Editorial image for the journal entry titled 'Iron Sharpens Iron — Why You Need a Training Partner'."
    }
  },
  {
    "slug": "fueling-the-temple",
    "title": "Fueling the Temple — What I Eat in a Day",
    "date": "2026-04-14",
    "excerpt": "This isn't a meal plan. It's a framework for treating your body like it belongs to something greater than yourself.",
    "tags": [
      "Nutrition",
      "Wellness",
      "Discipline"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "4a7df9f33208",
        "_type": "block",
        "children": [
          {
            "_key": "4a7df9f332080",
            "_type": "span",
            "marks": [],
            "text": "I want to be upfront: I'm not a registered dietitian. I'm not going to hand you a meal plan and tell you it's the only way. What I'm going to share is how I think about food and what that looks like in practice — because the framework matters more than the specific meals."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "bf9d62555f2c",
        "_type": "block",
        "children": [
          {
            "_key": "bf9d62555f2c0",
            "_type": "span",
            "marks": [],
            "text": "\"Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.\" — 1 Corinthians 6:19-20"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "92f3e31cedc7",
        "_type": "block",
        "children": [
          {
            "_key": "92f3e31cedc70",
            "_type": "span",
            "marks": [],
            "text": "That verse changed how I approach eating. It's not about looking good at the beach. It's not about restriction or punishment. It's stewardship. I was given this body as an instrument of purpose — I owe it the fuel to function at its best."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "af6eb76d51a7",
        "_type": "block",
        "children": [
          {
            "_key": "af6eb76d51a70",
            "_type": "span",
            "marks": [],
            "text": "The Framework: Protein Anchors Everything"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "246846d32fc7",
        "_type": "block",
        "children": [
          {
            "_key": "246846d32fc70",
            "_type": "span",
            "marks": [],
            "text": "I build every meal around protein first. This isn't a trend — it's biology. Protein is the primary driver of muscle repair, immune function, and satiety. For active adults, the International Society of Sports Nutrition (ISSN) recommends 0.7 to 1.0 grams of protein per pound of bodyweight per day to support muscle retention and growth. At my bodyweight, that puts me around 180-200g daily."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "25cd34b7cf7f",
        "_type": "block",
        "children": [
          {
            "_key": "25cd34b7cf7f0",
            "_type": "span",
            "marks": [],
            "text": "Most people eating a standard American pattern get half that. The result is slower recovery, more muscle loss as they age, and feeling hungry all the time because protein is the most satiating macronutrient by a wide margin."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "a0986dd0a75a",
        "_type": "block",
        "children": [
          {
            "_key": "a0986dd0a75a0",
            "_type": "span",
            "marks": [],
            "text": "I hit that number through whole food sources first: eggs, chicken, ground beef, Greek yogurt, cottage cheese, canned fish. I use protein shakes as a backup when I'm short — not as a substitute for real food."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ea4087d9a2e0",
        "_type": "block",
        "children": [
          {
            "_key": "ea4087d9a2e00",
            "_type": "span",
            "marks": [],
            "text": "What Whole Foods Actually Do"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "eb2a42397589",
        "_type": "block",
        "children": [
          {
            "_key": "eb2a423975890",
            "_type": "span",
            "marks": [],
            "text": "Beyond protein, I eat mostly whole foods — not because I'm following some strict protocol, but because processed food actively works against performance. A 2019 study published in "
          },
          {
            "_key": "eb2a423975891",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Cell Metabolism"
          },
          {
            "_key": "eb2a423975892",
            "_type": "span",
            "marks": [],
            "text": " by the NIH found that participants eating an ultra-processed diet consumed an average of 500 more calories per day than those eating whole foods — even when both groups had unrestricted access to food. The processed food group ate faster and felt less satisfied. The researchers concluded that ultra-processed foods disrupt the body's natural satiety signaling."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8521b0fc3e04",
        "_type": "block",
        "children": [
          {
            "_key": "8521b0fc3e040",
            "_type": "span",
            "marks": [],
            "text": "Real food is self-regulating in a way that engineered food is not. When I eat whole foods, I stop when I'm full. When I eat processed food, that signal breaks down. It's not a willpower issue — it's a product design issue. Those foods are engineered to override your stop mechanism."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5af7f37fbe49",
        "_type": "block",
        "children": [
          {
            "_key": "5af7f37fbe490",
            "_type": "span",
            "marks": [],
            "text": "What a Typical Day Looks Like for Me"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "81977206dff1",
        "_type": "block",
        "children": [
          {
            "_key": "81977206dff10",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Morning:"
          },
          {
            "_key": "81977206dff11",
            "_type": "span",
            "marks": [],
            "text": " Three to four whole eggs with vegetables, sometimes with a cup of Greek yogurt on the side. I keep breakfast simple and high in protein — usually 40-50g before I start the day. Coffee with nothing added. Water first."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b370194ea82f",
        "_type": "block",
        "children": [
          {
            "_key": "b370194ea82f0",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Lunch:"
          },
          {
            "_key": "b370194ea82f1",
            "_type": "span",
            "marks": [],
            "text": " A large salad or grain bowl with a protein source — chicken, ground beef, tuna, whatever's easy. I try to get vegetables in here because I know dinner tends to be more protein-and-starch focused. This is also where I get a lot of fiber, which supports gut health and keeps energy stable in the afternoon."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "830618697f5f",
        "_type": "block",
        "children": [
          {
            "_key": "830618697f5f0",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Pre-training:"
          },
          {
            "_key": "830618697f5f1",
            "_type": "span",
            "marks": [],
            "text": " If I'm training within two hours of a meal, I don't do anything special. If I'm training fasted or it's been a while since eating, I'll have something simple — a banana and a protein shake, or a small serving of rice with chicken. The goal is available fuel without a full stomach."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4c6c59ecbbf1",
        "_type": "block",
        "children": [
          {
            "_key": "4c6c59ecbbf10",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Dinner:"
          },
          {
            "_key": "4c6c59ecbbf11",
            "_type": "span",
            "marks": [],
            "text": " This is usually my biggest meal. A protein source, a carbohydrate (rice, potatoes, or whatever's on the table), and a vegetable. I eat with my family and I don't turn dinner into a calculation. I know roughly what I've eaten during the day and I eat until I'm satisfied."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ca3bfe338adb",
        "_type": "block",
        "children": [
          {
            "_key": "ca3bfe338adb0",
            "_type": "span",
            "marks": [],
            "text": "On Hydration"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "8caaee4b1a7f",
        "_type": "block",
        "children": [
          {
            "_key": "8caaee4b1a7f0",
            "_type": "span",
            "marks": [],
            "text": "I drink a lot of water. The NIH general recommendation is about 3.7 liters (125 oz) for men per day from all sources — more if you're training hard or in a hot climate. In Miami, that number goes up."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4e6668590bc9",
        "_type": "block",
        "children": [
          {
            "_key": "4e6668590bc90",
            "_type": "span",
            "marks": [],
            "text": "Dehydration affects performance significantly. Even mild dehydration — as little as 2% of body weight — reduces strength, endurance, and cognitive function according to research published in the "
          },
          {
            "_key": "4e6668590bc91",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of the International Society of Sports Nutrition"
          },
          {
            "_key": "4e6668590bc92",
            "_type": "span",
            "marks": [],
            "text": ". I keep a water bottle with me constantly. It's the cheapest performance supplement there is."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "56585372d814",
        "_type": "block",
        "children": [
          {
            "_key": "56585372d8140",
            "_type": "span",
            "marks": [],
            "text": "What I Don't Do"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "0c2120024d3e",
        "_type": "block",
        "children": [
          {
            "_key": "0c2120024d3e0",
            "_type": "span",
            "marks": [],
            "text": "I don't count every calorie. I don't follow a named protocol. I don't eat the same thing every day. I don't have \"cheat meals\" — that framing turns food into a moral issue and sets you up for guilt cycles that go nowhere useful."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e70640ed0507",
        "_type": "block",
        "children": [
          {
            "_key": "e70640ed05070",
            "_type": "span",
            "marks": [],
            "text": "I also don't restrict entire food groups or make food complicated. The goal is sustainable, not perfect. Eating well 90% of the time will produce better long-term results than eating perfectly for three weeks and burning out."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ed59c370a288",
        "_type": "block",
        "children": [
          {
            "_key": "ed59c370a2880",
            "_type": "span",
            "marks": [],
            "text": "The Real Point"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "bab39bc74e38",
        "_type": "block",
        "children": [
          {
            "_key": "bab39bc74e380",
            "_type": "span",
            "marks": [],
            "text": "Stewardship isn't perfection. It's intention. Ask yourself before you eat: is this serving the purpose God put me here for, or am I just filling a gap out of habit or boredom?"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b36fefbf20f7",
        "_type": "block",
        "children": [
          {
            "_key": "b36fefbf20f70",
            "_type": "span",
            "marks": [],
            "text": "That question — asked honestly — will upgrade your eating more than any protocol ever could."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/fueling-the-temple/hero.webp",
      "alt": "Editorial image for the journal entry titled 'Fueling the Temple — What I Eat in a Day'."
    }
  },
  {
    "slug": "training-through-the-valley",
    "title": "Training Through the Valley — When You Don't Feel Like Showing Up",
    "date": "2026-04-10",
    "excerpt": "Motivation is a feeling. Discipline is a decision. Here's how to keep moving when everything in you wants to stop.",
    "tags": [
      "Faith",
      "Resilience",
      "Mental Health"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "324b85a3651a",
        "_type": "block",
        "children": [
          {
            "_key": "324b85a3651a0",
            "_type": "span",
            "marks": [],
            "text": "There are seasons where training feels easy. The energy is there, the results are coming, and every workout feels like a confirmation that you're on the right path."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0d9a0be589a5",
        "_type": "block",
        "children": [
          {
            "_key": "0d9a0be589a50",
            "_type": "span",
            "marks": [],
            "text": "Then there are the valley seasons."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c4ce58c2ffea",
        "_type": "block",
        "children": [
          {
            "_key": "c4ce58c2ffea0",
            "_type": "span",
            "marks": [],
            "text": "You wake up tired. Not just physically tired — the kind of tired that lives in your chest. Life is heavy. The weights feel heavier. The voice in your head says: what's the point? Skip it. Rest tomorrow. You'll feel better then."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4d27f417392b",
        "_type": "block",
        "children": [
          {
            "_key": "4d27f417392b0",
            "_type": "span",
            "marks": [],
            "text": "I've been in that valley. And I've learned something: the valley is exactly where the work matters most."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "aee989ac31f6",
        "_type": "block",
        "children": [
          {
            "_key": "aee989ac31f60",
            "_type": "span",
            "marks": [],
            "text": "\"Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.\" — Psalm 23:4"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "e20fa480d2ad",
        "_type": "block",
        "children": [
          {
            "_key": "e20fa480d2ad0",
            "_type": "span",
            "marks": [],
            "text": "The Problem With Waiting to Feel Like It"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "bd13d8014a28",
        "_type": "block",
        "children": [
          {
            "_key": "bd13d8014a280",
            "_type": "span",
            "marks": [],
            "text": "Motivation is an emotion. Emotions are temporary. If you've built your training around how you feel, you will eventually stop training — because feelings change constantly and not always in your favor."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "fb895d421eff",
        "_type": "block",
        "children": [
          {
            "_key": "fb895d421eff0",
            "_type": "span",
            "marks": [],
            "text": "This is a design flaw in how most people approach fitness. They're chasing motivation instead of building discipline. Discipline doesn't ask how you feel. It asks what you committed to."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c3e7e884a9f8",
        "_type": "block",
        "children": [
          {
            "_key": "c3e7e884a9f80",
            "_type": "span",
            "marks": [],
            "text": "Research confirms this. A landmark study published in the "
          },
          {
            "_key": "c3e7e884a9f81",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "British Journal of Health Psychology"
          },
          {
            "_key": "c3e7e884a9f82",
            "_type": "span",
            "marks": [],
            "text": " found that making a specific plan — writing down when, where, and how you will exercise — increased follow-through rates to 91%, compared to 35% for people who simply intended to work out. The people who showed up consistently weren't more motivated. They had better systems."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "2043b375e16c",
        "_type": "block",
        "children": [
          {
            "_key": "2043b375e16c0",
            "_type": "span",
            "marks": [],
            "text": "What Exercise Does to the Valley"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "dd8c21e5b286",
        "_type": "block",
        "children": [
          {
            "_key": "dd8c21e5b2860",
            "_type": "span",
            "marks": [],
            "text": "Here's something worth understanding when you're in a dark stretch: movement is medicine."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b8328168627e",
        "_type": "block",
        "children": [
          {
            "_key": "b8328168627e0",
            "_type": "span",
            "marks": [],
            "text": "A 2018 meta-analysis published in "
          },
          {
            "_key": "b8328168627e1",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "JAMA Psychiatry"
          },
          {
            "_key": "b8328168627e2",
            "_type": "span",
            "marks": [],
            "text": ", covering over 33,000 adults tracked for 11 years, found that regular physical activity reduced the incidence of depression by 26%. Not slightly improved mood — a 26% reduction in clinical depression risk. And the effect held across all intensity levels, including low-intensity activity like walking."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f63c73efc9a6",
        "_type": "block",
        "children": [
          {
            "_key": "f63c73efc9a60",
            "_type": "span",
            "marks": [],
            "text": "A Harvard study on exercise and depression found that 15 minutes of vigorous exercise or one hour of walking per day was associated with a 26% lower risk of major depressive disorder. The neuroscience is real: exercise raises BDNF (brain-derived neurotrophic factor), which supports neural plasticity and mood regulation. It's not just \"endorphins.\" It restructures how your brain processes stress."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "eac1f94dcc59",
        "_type": "block",
        "children": [
          {
            "_key": "eac1f94dcc590",
            "_type": "span",
            "marks": [],
            "text": "When you feel like you can't train, your brain needs training the most."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "dbbefa294401",
        "_type": "block",
        "children": [
          {
            "_key": "dbbefa2944010",
            "_type": "span",
            "marks": [],
            "text": "How to Keep Moving When You Don't Want To"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "28edb18c9610",
        "_type": "block",
        "children": [
          {
            "_key": "28edb18c96100",
            "_type": "span",
            "marks": [],
            "text": "I'm not going to tell you to \"just push through\" and leave it at that. Here's what actually works."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "348121987ace",
        "_type": "block",
        "children": [
          {
            "_key": "348121987ace0",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Lower the bar without eliminating it."
          },
          {
            "_key": "348121987ace1",
            "_type": "span",
            "marks": [],
            "text": " On the hardest days, I don't aim for a PR. I aim to show up. Twenty minutes. Half the weight. Bodyweight only. Something. Done is better than perfect, and perfect can wait until the valley passes."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "60d1fb885824",
        "_type": "block",
        "children": [
          {
            "_key": "60d1fb8858240",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Stack it with something else."
          },
          {
            "_key": "60d1fb8858241",
            "_type": "span",
            "marks": [],
            "text": " Habit stacking — pairing a hard habit with an existing one — is one of the most effective behavioral change tools available. If you already go to the gym after work, tie a short walk to your lunch break. If you already wake up early, attach five minutes of movement to that routine. Attach the hard thing to the thing you already do."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "190d445f7622",
        "_type": "block",
        "children": [
          {
            "_key": "190d445f76220",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Tell someone."
          },
          {
            "_key": "190d445f76221",
            "_type": "span",
            "marks": [],
            "text": " Accountability changes the math. We'll talk more about training partners in another post, but even a simple text to a friend — \"training at 6 PM today\" — raises your follow-through rate significantly. External commitment is a forcing function."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c2f74e5f8731",
        "_type": "block",
        "children": [
          {
            "_key": "c2f74e5f87310",
            "_type": "span",
            "marks": [],
            "text": "The Valley Is Not the End"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "9fe5a0d365f0",
        "_type": "block",
        "children": [
          {
            "_key": "9fe5a0d365f00",
            "_type": "span",
            "marks": [],
            "text": "David didn't walk around the valley. He walked through it. The promise isn't that you avoid hard seasons — it's that you don't walk through them alone, and you come out the other side."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4ba4363898d8",
        "_type": "block",
        "children": [
          {
            "_key": "4ba4363898d80",
            "_type": "span",
            "marks": [],
            "text": "Every workout you do in the valley is a vote for who you're becoming. It says: I don't quit when it's hard. I don't let my feelings make my decisions. I know where my strength comes from, and it doesn't run out."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b3b31dcde93b",
        "_type": "block",
        "children": [
          {
            "_key": "b3b31dcde93b0",
            "_type": "span",
            "marks": [],
            "text": "Show up anyway. Especially then."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/training-through-the-valley/hero.webp",
      "alt": "Editorial image for the journal entry titled 'Training Through the Valley — When You Don't Feel Like Showing Up'."
    }
  },
  {
    "slug": "morning-habits-that-changed-my-training",
    "title": "5 Morning Habits That Changed My Training",
    "date": "2026-04-05",
    "excerpt": "The first hour sets the tone for everything that follows. Here's exactly what I do — and why it works.",
    "tags": [
      "Training",
      "Discipline",
      "Habits"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "97f9eaddfff5",
        "_type": "block",
        "children": [
          {
            "_key": "97f9eaddfff50",
            "_type": "span",
            "marks": [],
            "text": "I used to wake up and grab my phone before my feet hit the floor. Scroll Instagram, check emails, let the noise of everyone else's life flood in before I'd even said good morning to God. My training was inconsistent. My mind was scattered. My days started reactive instead of intentional."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0d8e6b8fe3fc",
        "_type": "block",
        "children": [
          {
            "_key": "0d8e6b8fe3fc0",
            "_type": "span",
            "marks": [],
            "text": "Then I changed the morning. Everything else followed."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "927fa99152ba",
        "_type": "block",
        "children": [
          {
            "_key": "927fa99152ba0",
            "_type": "span",
            "marks": [],
            "text": "\"The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.\" — Lamentations 3:22-23"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "c7f4546259fd",
        "_type": "block",
        "children": [
          {
            "_key": "c7f4546259fd0",
            "_type": "span",
            "marks": [],
            "text": "Every morning is a reset. A fresh mercy. The question is whether you use it or waste it. Here are the five habits that changed the way I train — and live."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1600378bacd8",
        "_type": "block",
        "children": [
          {
            "_key": "1600378bacd80",
            "_type": "span",
            "marks": [],
            "text": "1. Cold Water First"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "69e844246f3a",
        "_type": "block",
        "children": [
          {
            "_key": "69e844246f3a0",
            "_type": "span",
            "marks": [],
            "text": "Not coffee. Not a scroll. Cold water — either a glass of it immediately upon waking, or a cold shower within the first twenty minutes."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "7bc71aafe020",
        "_type": "block",
        "children": [
          {
            "_key": "7bc71aafe0200",
            "_type": "span",
            "marks": [],
            "text": "The research on cold exposure is real. A 2022 study published in "
          },
          {
            "_key": "7bc71aafe0201",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "PLOS ONE"
          },
          {
            "_key": "7bc71aafe0202",
            "_type": "span",
            "marks": [],
            "text": " found that cold water immersion activates the sympathetic nervous system, increasing norepinephrine levels by up to 300%. That's the neurotransmitter responsible for focus and alertness. It also reduces inflammation — which matters if you trained hard the day before."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "56901937bed4",
        "_type": "block",
        "children": [
          {
            "_key": "56901937bed40",
            "_type": "span",
            "marks": [],
            "text": "I'm not asking you to do an ice bath every morning. A 30-second cold finish to your shower does more than you think. Your body wakes up. Your mind sharpens. You've already done something hard before 7 AM."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "601d10093272",
        "_type": "block",
        "children": [
          {
            "_key": "601d100932720",
            "_type": "span",
            "marks": [],
            "text": "2. Prayer and the Word Before the Phone"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "38c6a9008489",
        "_type": "block",
        "children": [
          {
            "_key": "38c6a90084890",
            "_type": "span",
            "marks": [],
            "text": "This one is non-negotiable for me. Before any notification touches my mind, I spend time in prayer and Scripture. Even if it's fifteen minutes. Even if I'm tired."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "966646807df7",
        "_type": "block",
        "children": [
          {
            "_key": "966646807df70",
            "_type": "span",
            "marks": [],
            "text": "There's a physiological reason this matters beyond the spiritual one. Research published in the "
          },
          {
            "_key": "966646807df71",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Health Psychology"
          },
          {
            "_key": "966646807df72",
            "_type": "span",
            "marks": [],
            "text": " found that morning mindfulness and centering practices — including prayer and meditation — reduce cortisol reactivity throughout the day. Starting with the phone does the opposite: it spikes cortisol by triggering threat-response mechanisms tied to comparison, news, and social pressure."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "a5dfde302f2c",
        "_type": "block",
        "children": [
          {
            "_key": "a5dfde302f2c0",
            "_type": "span",
            "marks": [],
            "text": "Start with God. Let the world wait."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f04fedbca764",
        "_type": "block",
        "children": [
          {
            "_key": "f04fedbca7640",
            "_type": "span",
            "marks": [],
            "text": "3. Movement Before Anything Else"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "1589d240d266",
        "_type": "block",
        "children": [
          {
            "_key": "1589d240d2660",
            "_type": "span",
            "marks": [],
            "text": "I don't always train in the morning — some days I lift in the afternoon. But I always move in the morning. A walk. A mobility flow. A set of push-ups and a stretch. Something that tells your body: we're awake, we're capable, let's go."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "138b31014e4f",
        "_type": "block",
        "children": [
          {
            "_key": "138b31014e4f0",
            "_type": "span",
            "marks": [],
            "text": "A 2019 meta-analysis in the "
          },
          {
            "_key": "138b31014e4f1",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "British Journal of Sports Medicine"
          },
          {
            "_key": "138b31014e4f2",
            "_type": "span",
            "marks": [],
            "text": " found that morning exercise improves attention, visual learning, and decision-making throughout the day — effects that persisted even into the evening. You're not just warming up your body. You're warming up your brain."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "7f86712dffd4",
        "_type": "block",
        "children": [
          {
            "_key": "7f86712dffd40",
            "_type": "span",
            "marks": [],
            "text": "Twenty minutes of movement before work is worth more than a second cup of coffee."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "00ffc72d4e05",
        "_type": "block",
        "children": [
          {
            "_key": "00ffc72d4e050",
            "_type": "span",
            "marks": [],
            "text": "4. Protein-First Breakfast"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "30cdc20109dc",
        "_type": "block",
        "children": [
          {
            "_key": "30cdc20109dc0",
            "_type": "span",
            "marks": [],
            "text": "I eat protein within an hour of waking. Not because some fitness influencer told me to — because the science on muscle protein synthesis is clear."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4119e046cf05",
        "_type": "block",
        "children": [
          {
            "_key": "4119e046cf050",
            "_type": "span",
            "marks": [],
            "text": "The "
          },
          {
            "_key": "4119e046cf051",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Nutrition"
          },
          {
            "_key": "4119e046cf052",
            "_type": "span",
            "marks": [],
            "text": " published research in 2020 showing that distributing protein intake across all three meals — including breakfast — maximizes muscle protein synthesis compared to back-loading protein toward dinner. Most people get less than 15g of protein at breakfast, nowhere near enough to trigger that anabolic response."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "00db66712fa3",
        "_type": "block",
        "children": [
          {
            "_key": "00db66712fa30",
            "_type": "span",
            "marks": [],
            "text": "I aim for 40-50g in my first meal. Eggs, Greek yogurt, a protein shake if I'm moving fast. This isn't about being obsessive — it's about fueling your body like you take it seriously. Because I do."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f0abc2d92e8d",
        "_type": "block",
        "children": [
          {
            "_key": "f0abc2d92e8d0",
            "_type": "span",
            "marks": [],
            "text": "5. Set One Intention"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "ac845ef4363b",
        "_type": "block",
        "children": [
          {
            "_key": "ac845ef4363b0",
            "_type": "span",
            "marks": [],
            "text": "Not a to-do list. Not a productivity system. One sentence: what does a good day look like today?"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8506bd2f7b6a",
        "_type": "block",
        "children": [
          {
            "_key": "8506bd2f7b6a0",
            "_type": "span",
            "marks": [],
            "text": "Sometimes it's \"finish the project I've been avoiding.\" Sometimes it's \"be fully present with my family tonight.\" Sometimes it's \"hit every rep of my program.\" One intention cuts through the noise and gives the day a direction."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "373031b939ca",
        "_type": "block",
        "children": [
          {
            "_key": "373031b939ca0",
            "_type": "span",
            "marks": [],
            "text": "Research from the "
          },
          {
            "_key": "373031b939ca1",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "Journal of Experimental Social Psychology"
          },
          {
            "_key": "373031b939ca2",
            "_type": "span",
            "marks": [],
            "text": " on implementation intentions — the concept of pre-committing to a specific action in a specific context — shows they increase goal completion rates by up to 91% compared to vague aspirations. One clear intention beats ten foggy goals."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "89088d4e834c",
        "_type": "block",
        "children": [
          {
            "_key": "89088d4e834c0",
            "_type": "span",
            "marks": [],
            "text": "The Morning Is Yours First"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "6c54dc02b0d5",
        "_type": "block",
        "children": [
          {
            "_key": "6c54dc02b0d50",
            "_type": "span",
            "marks": [],
            "text": "You don't have to do all five at once. Start with one. Then stack the next. The goal isn't a perfect morning routine — it's a morning that belongs to you before it belongs to everyone else."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1db3024f4b38",
        "_type": "block",
        "children": [
          {
            "_key": "1db3024f4b380",
            "_type": "span",
            "marks": [],
            "text": "His mercies are new every morning. Use them well."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/morning-habits-that-changed-my-training/hero.webp",
      "alt": "Editorial image for the journal entry titled '5 Morning Habits That Changed My Training'."
    }
  },
  {
    "slug": "why-we-built-alpha-omega-strength-team",
    "title": "Why We Built Alpha Omega Strength Team",
    "date": "2026-03-26",
    "excerpt": "Before this was a brand, it was a conviction.",
    "tags": [
      "Faith",
      "First Drop",
      "Origin Story"
    ],
    "author": "Pete Fluriach",
    "body": [
      {
        "_key": "0ec081e88f67",
        "_type": "block",
        "children": [
          {
            "_key": "0ec081e88f670",
            "_type": "span",
            "marks": [],
            "text": "Before this was a brand, it was a conviction."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1ae990a8616b",
        "_type": "block",
        "children": [
          {
            "_key": "1ae990a8616b0",
            "_type": "span",
            "marks": [],
            "text": "Alpha Omega Strength Team was born from a simple truth: the same God who calls us to run the race with endurance is the same God who gives us the strength to finish it. He is the Alpha — the beginning of every purpose, every plan, every first rep. And He is the Omega — the One who sees us through to the end."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "fd6f676a3510",
        "_type": "block",
        "children": [
          {
            "_key": "fd6f676a35100",
            "_type": "span",
            "marks": [],
            "text": "Why Faith and Fitness?"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "ced7059ca6a0",
        "_type": "block",
        "children": [
          {
            "_key": "ced7059ca6a00",
            "_type": "span",
            "marks": [],
            "text": "Training isn't just physical. Every time you show up — tired, sore, doubting — and push through anyway, you're exercising the same muscle that faith requires. Discipline. Perseverance. Trust in something bigger than the moment."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8fd2d8ded313",
        "_type": "block",
        "children": [
          {
            "_key": "8fd2d8ded3130",
            "_type": "span",
            "marks": [],
            "text": "\"No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.\" — Hebrews 12:11"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "9774776f1868",
        "_type": "block",
        "children": [
          {
            "_key": "9774776f18680",
            "_type": "span",
            "marks": [],
            "text": "What This Brand Stands For"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "cae48d36af61",
        "_type": "block",
        "children": [
          {
            "_key": "cae48d36af610",
            "_type": "span",
            "marks": [],
            "text": "We're not here to sell you hype. We're here to build something real — a community of people who train with purpose, live with conviction, and wear their faith boldly. Every piece we make carries that standard."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "3374ed62383e",
        "_type": "block",
        "children": [
          {
            "_key": "3374ed62383e0",
            "_type": "span",
            "marks": [],
            "text": "When you put on Alpha Omega, you're not just wearing a shirt. You're making a statement: "
          },
          {
            "_key": "3374ed62383e1",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "I know who gives me my strength."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "7d792076e661",
        "_type": "block",
        "children": [
          {
            "_key": "7d792076e6610",
            "_type": "span",
            "marks": [],
            "text": "\"I can do all things through Christ who strengthens me.\" — Philippians 4:13"
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "60c679956406",
        "_type": "block",
        "children": [
          {
            "_key": "60c6799564060",
            "_type": "span",
            "marks": [],
            "text": "The First Drop"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "471da9f80a34",
        "_type": "block",
        "children": [
          {
            "_key": "471da9f80a340",
            "_type": "span",
            "marks": [],
            "text": "On "
          },
          {
            "_key": "471da9f80a341",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "April 15, 2026 at 8:00 PM EST"
          },
          {
            "_key": "471da9f80a342",
            "_type": "span",
            "marks": [],
            "text": ", we released our first collection. Limited pieces. Built for the faithful. This is just the beginning."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8cda5d06d91b",
        "_type": "block",
        "children": [
          {
            "_key": "8cda5d06d91b0",
            "_type": "span",
            "marks": [],
            "text": "Stay strong. Stay faithful. Stay ready."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "20f917b0c79b",
        "_type": "block",
        "children": [
          {
            "_key": "20f917b0c79b0",
            "_type": "span",
            "marks": [],
            "text": "— The Alpha Omega Strength Team"
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "featured": false,
    "mainImage": {
      "src": "/images/blog/why-we-built-alpha-omega-strength-team/hero.webp",
      "alt": "Editorial image for the journal entry titled 'Why We Built Alpha Omega Strength Team'."
    }
  },
];

// Append the 2026-05 wave of new posts.
blogPosts.push(
  beginnersGuide,
  progressiveOverload,
  apparelGuide,
  trainingAsWorship,
  womensGuide,
  unbreakable,
  preWorkoutPrayer,
  faithDrivenTrainingSplit,
  whatTheBibleSaysAboutPhysicalStrength,
  morningVsEveningTraining,
  compoundLifts,
);

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Single post by slug, or null. */
export function getPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

/** Posts containing a given tag (case-sensitive match — tags are canonical strings). */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) => Array.isArray(p.tags) && p.tags.includes(tag));
}

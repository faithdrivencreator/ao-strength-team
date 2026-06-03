import { convertToModelMessages, streamText, UIMessage, tool, stepCountIs } from 'ai';
import { createXai } from '@ai-sdk/xai';
import { z } from 'zod';
import { AO_BOT_KNOWLEDGE } from '@/lib/ao-bot-knowledge';
import { sendIssueReport } from '@/lib/issue-report-email';

const xai = createXai({ apiKey: process.env.XAI_API_KEY });

export const maxDuration = 30;

const BASE_PERSONA = `You are Caleb, the in-house guide for Alpha Omega Strength Team - a Christian fitness apparel brand. Your name comes from the biblical Caleb: fearless, faithful, willing to go where others won't.

AO Strength Team sells three main collections (Warpaint, Unbreakable, Cornerstone) plus a women's Cornerstone Crop Top. Short sleeve tees are $29.99 and long sleeve tees are $34.99; the Crop Top is $25.99. The brand gives 10 percent of every order to a charity the buyer chooses at checkout.

Your four jobs:
1. Help shoppers choose the right product. Answer questions about collections, colorways, fit, pricing, and shipping using only the facts in the knowledge base below. Do not invent details.
2. Educate people on the four charity partners and the 10 percent tithe model. Every purchase gives - that is built in.
3. Strengthen and encourage. When someone shares struggle, fatigue, fear, grief, or discouragement - or asks for prayer or a verse - offer a relevant scripture from the knowledge base and, where it feels natural, a short prayer. Ask before praying when it fits: "Can I pray that with you?" Never force faith on anyone.
4. Send website issue reports straight to Pete, the owner of AO Strength Team. When someone says something is broken, not working, confusing, looks wrong, or they hit an error - design, layout, links, images, checkout, payment, anything - tell them you can pass it directly to Pete. Gather a clear description of what went wrong and where on the site, and you may ask for their email so Pete can follow up, optional and never required. Then call the reportIssue tool. After it sends, confirm in plain words that you have sent it to Pete and thank them. Do not promise a specific fix or timeline. Let people know early on that you can forward site issues straight to Pete when something is not working.

HARD RULES - follow these without exception:
- Never use em dashes or en dashes. Use a hyphen, comma, colon, or period instead.
- No exclamation points anywhere in your replies.
- Scripture uses NIV wording. Never display the label "NIV" - cite only the reference, e.g. "Philippians 4:13".
- Do not invent products, prices, materials, SKUs, discounts, or policies. If a fact is not in the knowledge base, say you are not certain and point the person to the site or to support.
- Do not promise returns, exchanges, or shipping terms beyond what the knowledge base states.
- Only call reportIssue for a genuine issue with an actual description from the user. Never send blank, test, or duplicate reports, and never invent issue details.
- Keep replies tight: 2 to 5 sentences is the target. Warm, strong, direct - never preachy, never pushy, never corporate.
- For product links, reference site sections in plain words (the Shop, the Warpaint page, the Unbreakable page, the Cornerstone page, the Tithe page). Do not fabricate URLs.
- You are an encourager, not a replacement for a pastor, counselor, or medical or mental-health professional. If someone is in serious distress, gently acknowledge what they shared and encourage them to reach out to trusted people and professional help.
- Crisis protocol: if a user expresses any indication of self-harm or emergency, provide the 988 Suicide and Crisis Lifeline (call or text 988 in the US) and encourage them to reach out to real people now. Do not attempt to counsel through a crisis.
- Voice: gritty, faith-forward, disciplined. Short confident sentences. No buzzwords. No italics. No emojis.`;

const SYSTEM_PROMPT = BASE_PERSONA + '\n\n' + AO_BOT_KNOWLEDGE;

const reportIssue = tool({
  description:
    'Send a website issue or bug report straight to Pete, the owner of AO Strength Team. Call this only when the user is reporting a real problem with the site (broken feature, UX or design problem, checkout or payment trouble, a content or typo error, or any error they hit) and you have a concrete description of what went wrong. Do not call it for general questions or without an actual problem to report.',
  inputSchema: z.object({
    description: z
      .string()
      .describe('Clear description of the problem the customer is reporting'),
    category: z
      .enum(['bug/broken', 'ux/design', 'checkout/payment', 'content/typo', 'other'])
      .describe('Best-fit category'),
    pageOrArea: z
      .string()
      .optional()
      .describe('Where on the site it happened, if known'),
    severity: z
      .enum(['low', 'medium', 'high'])
      .optional()
      .describe('How serious it seems'),
    customerEmail: z
      .string()
      .optional()
      .describe('Customer email for follow-up, only if they offer it'),
  }),
  execute: async (args) => {
    const r = await sendIssueReport(args);
    return r.ok
      ? { reported: true }
      : { reported: false, error: r.error ?? 'send failed' };
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages?: UIMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'messages is required and must be a non-empty array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const trimmed = messages.slice(-20);

    const result = streamText({
      model: xai('grok-3-mini-fast'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(trimmed),
      maxOutputTokens: 700,
      tools: { reportIssue },
      stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

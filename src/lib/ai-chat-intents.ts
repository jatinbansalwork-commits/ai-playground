import { CONTACT_EMAIL, CONTACT_LINKS, JB_CONTACT_PHONE, JB_CONTACT_PHONE_TEL, ROUTES } from "@/lib/constants";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

export type AiChatIntentId =
  | "mentorship"
  | "hiring"
  | "portfolio"
  | "case-study";

export interface AiChatIntent {
  id: AiChatIntentId;
  prompt: string;
  /** Injected into the system prompt — guides OpenAI on follow-up turns. */
  instruction: string;
  /** Instant first reply when the user taps this chip (no OpenAI call). */
  staticReply: string;
}

export const AI_CHAT_INTENTS: readonly AiChatIntent[] = [
  {
    id: "mentorship",
    prompt: "I'm interested in mentorship",
    instruction:
      "If the user asks about mentorship: explain what JB offers (design feedback, career guidance, AI product craft), point to the JB Manual first, then LinkedIn. Friends trio voice — Joey warmth + Ross clarity. One catchphrase max. Do not promise unlimited time — suggest a focused ask.",
    staticReply: `How you doin'? JB's open to mentorship — especially for designers moving into product, fintech, or AI work.

Actually… before you reach out, skim the [JB Manual](${JB_MANUAL}) — it explains how JB works best and what makes a good conversation.

When you're ready, message on [LinkedIn](${LINKEDIN}) with what you're working on and **one** specific question. Keep it focused — that's how you get a real answer.`,
  },
  {
    id: "hiring",
    prompt: "I'd love to hire JB",
    instruction:
      "If the user wants to hire JB: keep it short — Chandler quip optional, then share only JB's phone number for hiring enquiries. Do not list case studies, resume, LinkedIn, or email unless they ask. Phone: 6362408280.",
    staticReply: `Hiring? Could this *be* any more straightforward?

Call JB at **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**.`,
  },
  {
    id: "portfolio",
    prompt: "How did JB build this portfolio?",
    instruction:
      'If the user asks how the portfolio was built: answer in bullets — stack, motion/index slider, editorial case-study system, craft gallery, Vercel + Blob CDN, analytics, and JBAI itself. Link /craft and /projects. Friends trio — Ross explains the stack, Chandler light aside optional. Builder-credible, not promotional.',
    staticReply: `Fun fact: this portfolio is custom-built. No template. Ross would approve of the structure.

- **Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion
- **Experience:** Scroll-linked index slider, editorial case-study components, craft bento gallery
- **Infrastructure:** Vercel hosting, Blob CDN for media, custom analytics events
- **This chat:** JBAI — that's me — curated knowledge plus OpenAI

Check out [Craft](${ROUTES.craft}) for interaction experiments, or [Projects](${ROUTES.projects}) for the case studies. Oh yeah — pretty cool.`,
  },
  {
    id: "case-study",
    prompt: "Which case study should I start with?",
    instruction:
      "If the user asks which case study to read: either ask one clarifying question (AI vs fintech vs design systems vs growth) OR route by interest using the case study tags in knowledge. Friends trio — Ross organises the list, Chandler optional quip, Joey friendly close. Always link with markdown and explain why in one sentence each.",
    staticReply: `Could this *be* any more options? Fine — here's the organised version:

- **AI / conversational UX** → [Saltbot AI](/projects/saltbot-ai-saltmine)
- **Design systems at scale** → [FreshPrints Design System](/projects/freshprints-design-system)
- **Generative AI tooling** → [FreshPrints Image Gen AI](/projects/freshprints-image-gen-ai)
- **Fintech / support reduction** → [Piggy — Reduced Support Tickets](/projects/piggy-reduced-mutual-fund-support-tickets)
- **Consumer growth / rewards** → [Kalash — Your New Gold](/projects/kalash-rewards)

Tell me your focus and I'll narrow it down. How you doin' with picking one?`,
  },
] as const;

export const AI_CHAT_SUGGESTED_PROMPTS = AI_CHAT_INTENTS.map(
  (intent) => intent.prompt,
);

const intentById = new Map(AI_CHAT_INTENTS.map((intent) => [intent.id, intent]));
const intentByPrompt = new Map(
  AI_CHAT_INTENTS.map((intent) => [intent.prompt, intent]),
);

export function getAiChatIntent(id: AiChatIntentId): AiChatIntent | undefined {
  return intentById.get(id);
}

export function resolveAiChatIntentFromPrompt(
  prompt: string,
): AiChatIntent | undefined {
  return intentByPrompt.get(prompt.trim());
}

export function getChipStaticReply(id: AiChatIntentId): string | undefined {
  return intentById.get(id)?.staticReply;
}

export function buildIntentPromptRules(): string {
  return AI_CHAT_INTENTS.map(
    (intent) => `- ${intent.instruction}`,
  ).join("\n");
}

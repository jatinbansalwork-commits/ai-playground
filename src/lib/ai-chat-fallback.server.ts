import { CONTACT_EMAIL, CONTACT_LINKS, ROUTES } from "@/lib/constants";
import { AI_CHAT_OPENAI_LIMIT_MESSAGE } from "@/lib/ai-chat-config";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

interface FallbackReply {
  reply: string;
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function isSocialGreeting(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  return (
    /^(how you doin'?|how you doing|how are you|how'?s it going|what'?s up|whats up|hey|hi|hello|yo|sup)\b/.test(
      trimmed,
    ) ||
    includesAny(trimmed, [
      "how you doin",
      "how you doing",
      "how are you doing",
    ])
  );
}

/** Curated replies when OpenAI budget is exhausted or unavailable. */
export function generateFallbackReply(
  userMessage: string,
  pagePath?: string,
  showOpenAiNotice = false,
): FallbackReply {
  const text = userMessage.toLowerCase();
  let body = "";

  if (isSocialGreeting(text)) {
    body = `How YOU doin'? I'm doin' great — I'm JBAI, the chat on this portfolio. Could this *be* any more fun?

Pick a lane and I'll walk you through it:
- [Projects](${ROUTES.projects}) for case studies
- [Craft](${ROUTES.craft}) for experiments
- Or ask me about hiring, mentorship, or how to reach JB.`;
  } else if (includesAny(text, ["contact", "email", "linkedin", "reach", "message"])) {
    body = `Look — best ways to reach JB (Ross made me organise this):
- [LinkedIn](${LINKEDIN})
- [Email](mailto:${CONTACT_EMAIL})
- [Resume](${RESUME})
- [JB Manual](${JB_MANUAL}) for how he likes to work`;
  } else if (includesAny(text, ["mentor", "mentorship", "advice", "feedback"])) {
    body = `How you doin'? JB's open to mentorship when it's a good fit. Start with the [JB Manual](${JB_MANUAL}), then hit him on [LinkedIn](${LINKEDIN}) with one focused question.`;
  } else if (includesAny(text, ["hire", "hiring", "role", "job", "contract"])) {
    body = `Hiring? Could this *be* any more straightforward? Check [Saltbot AI](${ROUTES.projects}/saltbot-ai-saltmine) and [FreshPrints Design System](${ROUTES.projects}/freshprints-design-system), then share the role on [LinkedIn](${LINKEDIN}) or [email](mailto:${CONTACT_EMAIL}).`;
  } else if (includesAny(text, ["saltbot", "saltmine", "conversational", "chatbot"])) {
    body = `**Saltbot AI** — JB's conversational analytics work for Saltmine. Reports in seconds, not hours in spreadsheets. [Read the case study](${ROUTES.projects}/saltbot-ai-saltmine).`;
  } else if (includesAny(text, ["piggy", "support", "mutual fund", "fintech"])) {
    body = `**Piggy — Reduced Support Tickets** — UX research and product changes that cut mutual fund support tickets by 19%. [Read the case study](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets).`;
  } else if (includesAny(text, ["freshprints", "design system", "system"])) {
    body = `**FreshPrints Design System** — JB's 0→1 design system for a scaling e-commerce platform. [Read the case study](${ROUTES.projects}/freshprints-design-system).`;
  } else if (includesAny(text, ["image gen", "generative", "gen ai"])) {
    body = `**FreshPrints Image Gen AI** — generative image tooling, prompt flows, asset review. [Read the case study](${ROUTES.projects}/freshprints-image-gen-ai).`;
  } else if (includesAny(text, ["kalash", "gold", "rewards", "recap"])) {
    body = text.includes("recap")
      ? `**Kalash Year-end Recap** — a year of activity turned into a personalised recap. [Read the case study](${ROUTES.projects}/kalash-year-end-recap).`
      : `**Kalash — Your New Gold** — consumer fintech and rewards for 1M+ users. [Read the case study](${ROUTES.projects}/kalash-rewards).`;
  } else if (includesAny(text, ["portfolio", "built", "stack", "next", "framer", "vercel"])) {
    body = `Actually… this site is custom-built — Next.js, Framer Motion, editorial case-study components. Peek at [Craft](${ROUTES.craft}) and [Projects](${ROUTES.projects}).`;
  } else if (includesAny(text, ["craft", "experiment", "prototype", "demo"])) {
    body = `**Craft** has interaction prototypes and the Design Review essay. Browse [Craft](${ROUTES.craft}) or read [Design Review](${ROUTES.craft}/design-review-checklist).`;
  } else if (includesAny(text, ["case study", "project", "work", "start with", "which"])) {
    body = `Good places to start:
- AI UX → [Saltbot AI](${ROUTES.projects}/saltbot-ai-saltmine)
- Design systems → [FreshPrints Design System](${ROUTES.projects}/freshprints-design-system)
- Fintech → [Piggy](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets)`;
  } else if (pagePath?.startsWith("/projects/")) {
    const slug = pagePath.replace("/projects/", "").split("/")[0] ?? "";
    body = slug
      ? `You're on **${slug.replace(/-/g, " ")}** — read the story here, or compare more on [Projects](${ROUTES.projects}).`
      : `You're on a case study page — browse the full story here, or see more on [Projects](${ROUTES.projects}).`;
  } else {
    body =
      "How YOU doin'? I'm not great at the advice, but I *am* great at this portfolio — case studies, Craft, hiring, mentorship. Try Saltbot, Piggy, or how to contact JB.";
  }

  if (showOpenAiNotice) {
    body = `${AI_CHAT_OPENAI_LIMIT_MESSAGE}\n\n${body}`;
  }

  return { reply: body.trim() };
}

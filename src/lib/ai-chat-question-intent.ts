import { CONTACT_EMAIL, CONTACT_LINKS, JB_CONTACT_PHONE, JB_CONTACT_PHONE_TEL, ROUTES } from "@/lib/constants";
import { resolveCareerKnowledgeReply } from "@/lib/ai-chat-career-knowledge";
import {
  buildCaseStudyFunFactReply,
  isCaseStudyFunFactRequest,
} from "@/lib/ai-chat-case-study-fun-facts";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

export type QuestionIntentId =
  | "greeting"
  | "wireframe"
  | "resume"
  | "hiring"
  | "contact"
  | "mentorship"
  | "career_interview"
  | "project_saltbot"
  | "project_piggy"
  | "project_freshprints"
  | "project_kalash"
  | "portfolio_site"
  | "craft"
  | "case_study_pick"
  | "case_study_fun_fact"
  | "explore";

export interface DetectedQuestionIntent {
  id: QuestionIntentId;
  /** How confident we are — high = answer from curated copy, skip OpenAI. */
  confidence: "high" | "low";
  /** What the visitor is trying to accomplish — guides reply tone and content. */
  goal: string;
}

interface IntentRule {
  id: QuestionIntentId;
  goal: string;
  curated: boolean;
  matches: (text: string, pagePath?: string) => boolean;
}

function normalise(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function includesAny(text: string, terms: readonly string[]): boolean {
  return terms.some((term) => text.includes(term));
}

const INTENT_RULES: readonly IntentRule[] = [
  {
    id: "greeting",
    goal: "Welcome the visitor and offer clear paths — do not pitch JB's CV unprompted.",
    curated: true,
    matches: (text) =>
      /^(how you doin'?|how you doing|how are you|how'?s it going|what'?s up|whats up|hey|hi|hello|yo|sup)\b/.test(
        text.trim(),
      ) ||
      includesAny(text, ["how you doin", "how you doing", "how are you doing"]),
  },
  {
    id: "wireframe",
    goal: "Explain the wireframe easter egg — toggle via chat command or index cross.",
    curated: true,
    matches: (text) => includesAny(text, ["wireframe", "layout debug", "debug mode"]),
  },
  {
    id: "resume",
    goal: "They want JB's CV — link the Resume directly. No case studies, no contact menu.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["resume", "curriculum vitae", "curriculum"]) ||
      /\bcv\b/.test(text) ||
      /(where|find|get|download|show|need|want).*(resume|cv)/.test(text),
  },
  {
    id: "hiring",
    goal: "They want to hire JB — give phone number only unless they ask for more.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "i'd love to hire jb",
        "love to hire jb",
        "want to hire jb",
        "hire jb",
        "hiring jb",
      ]) || includesAny(text, ["hire", "hiring", "open role", "job opening", "contract role"]),
  },
  {
    id: "contact",
    goal: "They want to reach JB — give LinkedIn, email, resume, JB Manual.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "how do i contact",
        "how to contact",
        "get in touch",
        "reach out",
        "reach jb",
        "message jb",
        "talk to jb",
      ]) ||
      (includesAny(text, ["contact", "email", "linkedin"]) &&
        !includesAny(text, ["case study", "project"])),
  },
  {
    id: "mentorship",
    goal: "They want mentorship — JB Manual first, then LinkedIn with one focused question.",
    curated: true,
    matches: (text) => includesAny(text, ["mentor", "mentorship", "career advice"]),
  },
  {
    id: "career_interview",
    goal: "Interview or background question — answer from career narratives with metrics.",
    curated: true,
    matches: (text) => resolveCareerKnowledgeReply(text) !== null,
  },
  {
    id: "project_saltbot",
    goal: "They asked about Saltbot / conversational AI work — link that case study.",
    curated: true,
    matches: (text) => includesAny(text, ["saltbot", "saltmine", "conversational analytics"]),
  },
  {
    id: "project_piggy",
    goal: "They asked about Piggy / fintech support work — link that case study.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["piggy", "mutual fund", "support ticket"]) ||
      (text.includes("fintech") && !text.includes("kalash")),
  },
  {
    id: "project_freshprints",
    goal: "They asked about FreshPrints — design system, merch platform, or Image Gen AI.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["freshprints", "fresh prints", "design system", "image gen"]),
  },
  {
    id: "project_kalash",
    goal: "They asked about Kalash / gold rewards — link the relevant case study.",
    curated: true,
    matches: (text) => includesAny(text, ["kalash", "gold rewards", "year-end recap", "year end recap"]),
  },
  {
    id: "portfolio_site",
    goal: "They want to know how this portfolio was built — stack and patterns.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "how did jb build",
        "built this portfolio",
        "built this site",
        "what stack",
        "next.js",
        "framer motion",
        "vercel",
      ]) || (text.includes("portfolio") && text.includes("built")),
  },
  {
    id: "craft",
    goal: "They want experiments / Craft gallery — link /craft.",
    curated: true,
    matches: (text) =>
      includesAny(text, ["craft page", "experiments", "prototype", "interaction demo"]) ||
      (text.includes("craft") && !text.includes("case study")),
  },
  {
    id: "case_study_fun_fact",
    goal: "They are on a case study page and want something extra — a behind-the-scenes fact, not a summary of what they are already reading.",
    curated: true,
    matches: (text, pagePath) =>
      Boolean(pagePath?.startsWith("/projects/")) &&
      isCaseStudyFunFactRequest(text),
  },
  {
    id: "case_study_pick",
    goal: "They want help choosing work to read — route by interest with links.",
    curated: true,
    matches: (text) =>
      includesAny(text, [
        "which case study",
        "what case study",
        "start with",
        "what project",
        "which project",
        "show me work",
      ]) || (includesAny(text, ["case study", "projects"]) && text.includes("which")),
  },
];

/** Infer what the visitor wants before choosing a reply. */
export function detectQuestionIntent(
  userMessage: string,
  pagePath?: string,
): DetectedQuestionIntent {
  const text = normalise(userMessage);

  for (const rule of INTENT_RULES) {
    if (rule.matches(text, pagePath)) {
      return {
        id: rule.id,
        confidence: rule.curated ? "high" : "low",
        goal: rule.goal,
      };
    }
  }

  return {
    id: "explore",
    confidence: "low",
    goal: "General portfolio browse — suggest relevant case studies or ask a clarifying question.",
  };
}

export function shouldUseCuratedReply(intent: DetectedQuestionIntent): boolean {
  return intent.confidence === "high" && intent.id !== "explore";
}

/** Build a reply that matches detected intent — null only for explore with no page context. */
export function buildIntentReply(
  intent: DetectedQuestionIntent,
  userMessage: string,
  pagePath?: string,
): string | null {
  switch (intent.id) {
    case "greeting":
      return `How YOU doin'? I'm JBAI — JB's chat on this portfolio. Could this *be* any more fun?

Ask about hiring, a case study, or how to reach JB — I'll match the answer to what you actually need.`;

    case "wireframe":
      return "Type **wireframe mode** in this chat to toggle layout debug on the index slider — or click the centre cross on the homepage. Could this *be* any more designer?";

    case "resume":
      return `You asked for the CV — here it is. JB's [Resume](${RESUME}) on Google Drive. Could this *be* any more straightforward?`;

    case "hiring":
      return `You want to hire JB — got it. Could this *be* any more straightforward?

Call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**.`;

    case "contact":
      return `You want to reach JB — Ross made me organise this:
- [LinkedIn](${LINKEDIN})
- [Email](mailto:${CONTACT_EMAIL})
- [Resume](${RESUME})
- [JB Manual](${JB_MANUAL}) for how he likes to work`;

    case "mentorship":
      return `You're asking about mentorship — JB's open when it's a good fit. Start with the [JB Manual](${JB_MANUAL}), then [LinkedIn](${LINKEDIN}) with **one** focused question.`;

    case "career_interview":
      return resolveCareerKnowledgeReply(userMessage);

    case "project_saltbot":
      return `You're asking about Saltbot — conversational analytics for Saltmine. Reports in seconds, not spreadsheets. [Read the case study](${ROUTES.projects}/saltbot-ai-saltmine).`;

    case "project_piggy":
      return `You're asking about Piggy — UX research that cut mutual fund support tickets by 19%. [Read the case study](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets).`;

    case "project_freshprints":
      return userMessage.toLowerCase().includes("image gen")
        ? `FreshPrints Image Gen AI — generative tooling and review flows. [Read the case study](${ROUTES.projects}/freshprints-image-gen-ai).`
        : `FreshPrints — custom apparel platform (design tool, stores, order ops, AI). [Design System case study](${ROUTES.projects}/freshprints-design-system).`;

    case "project_kalash":
      return userMessage.toLowerCase().includes("recap")
        ? `Kalash year-end recap — personalised retention story. [Read the case study](${ROUTES.projects}/kalash-year-end-recap).`
        : `Kalash — digital gold and rewards for 1M+ users. [Read the case study](${ROUTES.projects}/kalash-rewards).`;

    case "portfolio_site":
      return `You're asking how this site was built — custom Next.js, Framer Motion, editorial case studies, no template. Peek at [Craft](${ROUTES.craft}) and [Projects](${ROUTES.projects}).`;

    case "craft":
      return `You're browsing experiments — [Craft](${ROUTES.craft}) has prototypes and the [Design Review](${ROUTES.craft}/design-review-checklist) essay.`;

    case "case_study_pick":
      return `You want a place to start — pick your lane:
- AI UX → [Saltbot AI](${ROUTES.projects}/saltbot-ai-saltmine)
- Design systems → [FreshPrints Design System](${ROUTES.projects}/freshprints-design-system)
- Fintech → [Piggy](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets)`;

    case "case_study_fun_fact": {
      if (!pagePath) return null;
      return buildCaseStudyFunFactReply(pagePath);
    }

    case "explore":
    default:
      return null;
  }
}

export function buildIntentPromptBlock(intent: DetectedQuestionIntent): string {
  return `Visitor intent (latest message): **${intent.id}**
Reply goal: ${intent.goal}
Fulfill that intent first — do not answer a different question than the one they asked.`;
}

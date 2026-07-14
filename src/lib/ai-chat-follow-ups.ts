import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import {
  detectQuestionIntent,
  type QuestionIntentId,
} from "@/lib/ai-chat-question-intent";
import type { ChatReplySource } from "@/lib/ai-chat-types";

const GENERIC_FOLLOW_UPS = [
  "What's his design process?",
  "Where has he worked?",
  "How do I reach him?",
] as const;

/** Follow-ups keyed to what the visitor just asked — not the first chip in the session. */
const FOLLOW_UPS_BY_QUESTION_INTENT: Record<
  QuestionIntentId,
  readonly string[]
> = {
  greeting: [
    "What's JB's strongest project?",
    "Tell me about Cisco Policy Copilot",
    "How do I reach him?",
  ],
  wireframe: [
    "How did JB build this portfolio?",
    "What is on the Craft page?",
  ],
  resume: ["I'd love to hire JB", "How do I reach him?"],
  hiring: ["Where is JB's resume?", "What's JB's strongest project?"],
  contact: [
    "I'd love to hire JB",
    "Which case study should I start with?",
    "What's his design process?",
  ],
  mentorship: ["What is in the JB Manual?", "How do I reach him?"],
  career_interview: [
    "Tell me about a zero-to-one product you launched",
    "What's JB's strongest project?",
  ],
  work_history: [
    "What's JB's strongest project?",
    "What's his design process?",
    "How do I reach him?",
  ],
  jb_manual: [
    "I'm interested in mentorship",
    "How do I reach him?",
    "I'd love to hire JB",
  ],
  strongest_project: [
    "How does intent-before-rules work?",
    "What did user testing uncover?",
    "What problem did Saltbot solve?",
  ],
  design_process: [
    "Tell me about the FreshPrints design system",
    "How did Piggy reduce support tickets?",
    "Where has he worked?",
  ],
  project_saltbot: [
    "What problem did Saltbot solve?",
    "How fast are the analytics answers?",
    "What's his design process?",
  ],
  project_cisco: [
    "How does intent-before-rules work?",
    "What did user testing uncover?",
    "Tell me about JB's Case Notes #1",
  ],
  project_piggy: [
    "How did Piggy reduce support tickets?",
    "What research drove the 19%?",
    "What's his design process?",
  ],
  project_freshprints: [
    "What was the design system scope?",
    "How did it help teams ship faster?",
    "What did the Image Gen AI tool do?",
  ],
  project_kalash: [
    "How does digital gold savings work?",
    "What is the Kalash year-end recap?",
    "How do I reach him?",
  ],
  portfolio_site: [
    "What is on the Craft page?",
    "What's JB's strongest project?",
  ],
  craft: [
    "How did JB build this portfolio?",
    "What's JB's strongest project?",
  ],
  case_study_pick: [
    "Tell me about Cisco Policy Copilot",
    "Tell me about Saltbot AI",
    "I'd love to hire JB",
  ],
  case_study_fun_fact: [
    "What's JB's strongest project?",
    "I'd love to hire JB",
    "How do I reach him?",
  ],
  explore: [...GENERIC_FOLLOW_UPS],
};

const FOLLOW_UPS_BY_CHIP_INTENT: Record<AiChatIntentId, readonly string[]> = {
  "strongest-project": [
    "How does intent-before-rules work?",
    "What did user testing uncover?",
    "What problem did Saltbot solve?",
  ],
  cisco: [
    "How does intent-before-rules work?",
    "What did user testing uncover?",
    "Tell me about JB's Case Notes #1",
  ],
  process: [
    "Tell me about the FreshPrints design system",
    "How did Piggy reduce support tickets?",
    "Where has he worked?",
  ],
  reach: [
    "I'd love to hire JB",
    "What's JB's strongest project?",
    "What's his design process?",
  ],
};

const FOLLOW_UPS_BY_PAGE: Record<string, readonly string[]> = {
  "/projects/saltbot-ai-saltmine": [
    "What problem did Saltbot solve?",
    "How fast are the analytics answers?",
    "What's his design process?",
  ],
  "/projects/cisco-policy-copilot": [
    "How does intent-before-rules work?",
    "What did user testing uncover?",
    "Tell me about JB's Case Notes #1",
  ],
  "/projects/freshprints-design-system": [
    "What was the design system scope?",
    "How did it help teams ship faster?",
    "What's his design process?",
  ],
  "/projects/freshprints-image-gen-ai": [
    "What did the Image Gen AI tool do?",
    "How was review handled?",
    "How do I reach him?",
  ],
  "/projects/piggy-reduced-mutual-fund-support-tickets": [
    "How did Piggy reduce support tickets?",
    "What research drove the 19%?",
    "What's his design process?",
  ],
  "/projects/kalash-rewards": [
    "How does digital gold savings work?",
    "What is the Kalash year-end recap?",
    "How do I reach him?",
  ],
  "/projects/kalash-year-end-recap": [
    "What is the Kalash year-end recap?",
    "How does digital gold savings work?",
    "How do I reach him?",
  ],
  "/craft": [
    "How did JB build this portfolio?",
    "What's JB's strongest project?",
  ],
  "/projects": [
    "What's JB's strongest project?",
    "Tell me about Cisco Policy Copilot",
    "I'd love to hire JB",
  ],
  "/notes/1": [
    "Tell me about Cisco Policy Copilot",
    "How does intent-before-rules work?",
    "How do I reach him?",
  ],
};

function uniqueSuggestions(values: readonly string[], max = 3): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
    if (result.length >= max) break;
  }

  return result;
}

function followUpsForPage(pagePath?: string): readonly string[] {
  if (!pagePath) return [];

  if (FOLLOW_UPS_BY_PAGE[pagePath]) {
    return FOLLOW_UPS_BY_PAGE[pagePath];
  }

  if (pagePath.startsWith("/projects/")) {
    return [
      "What is the outcome of this project?",
      "What's his design process?",
      "How do I reach him?",
    ];
  }

  return [];
}

export function buildFollowUpSuggestions(options: {
  lastUserMessage: string;
  pagePath?: string;
  intentId?: AiChatIntentId;
  source: ChatReplySource;
}): string[] {
  const questionIntent = detectQuestionIntent(
    options.lastUserMessage,
    options.pagePath,
  );
  const fromQuestion =
    FOLLOW_UPS_BY_QUESTION_INTENT[questionIntent.id] ?? GENERIC_FOLLOW_UPS;

  if (options.source === "static" && options.intentId) {
    const fromChip = FOLLOW_UPS_BY_CHIP_INTENT[options.intentId] ?? [];
    return uniqueSuggestions([...fromChip, ...fromQuestion]);
  }

  if (questionIntent.id !== "explore") {
    return uniqueSuggestions(fromQuestion);
  }

  return uniqueSuggestions([
    ...followUpsForPage(options.pagePath),
    ...fromQuestion,
  ]);
}

export function resolveFollowUpPrompt(label: string): string {
  if (label === "Where is JB's resume?") {
    return "Where can I find JB's resume?";
  }
  if (label === "Tell me about the FreshPrints design system") {
    return "Tell me about the FreshPrints Design System case study";
  }
  if (label === "Tell me about a zero-to-one product you launched") {
    return "Tell me about a zero-to-one product you launched";
  }
  if (label === "What problem did Saltbot solve?") {
    return "What problem did Saltbot solve?";
  }
  if (label === "Tell me more about Saltbot AI") {
    return "Tell me more about Saltbot AI";
  }
  if (label === "How fast are the analytics answers?") {
    return "How fast are Saltbot analytics answers?";
  }
  if (label === "Tell me about Cisco Policy Copilot") {
    return "Tell me about Cisco Policy Copilot";
  }
  if (label === "Tell me about JB's Case Notes #1") {
    return "Tell me about JB's Case Notes #1";
  }
  if (label === "Tell me about Case Notes #1") {
    return "Tell me about JB's Case Notes #1";
  }
  if (label === "What problem did Policy Copilot solve?") {
    return "What problem did Policy Copilot solve?";
  }
  if (label === "How does intent-before-rules work?") {
    return "How does Policy Copilot use intent before generating firewall rules?";
  }
  if (label === "What did user testing uncover?") {
    return "What did user testing uncover for Policy Copilot?";
  }
  if (label === "What did the Image Gen AI tool do?") {
    return "What did the FreshPrints Image Gen AI tool do?";
  }
  if (label === "How was review handled?") {
    return "How was asset review handled in FreshPrints Image Gen AI?";
  }
  if (label === "How did it help teams ship faster?") {
    return "How did the FreshPrints design system help teams ship faster?";
  }
  if (label === "What research drove the 19%?") {
    return "What research drove Piggy's 19% support ticket reduction?";
  }
  if (label === "How does digital gold savings work?") {
    return "How does Kalash digital gold savings work?";
  }
  if (label === "Where has he worked?") {
    return "Where has JB worked?";
  }
  if (label === "How do I reach him?") {
    return "How do I reach him?";
  }
  if (label === "What's his design process?") {
    return "What's his design process?";
  }
  if (label === "What's JB's strongest project?") {
    return "What's JB's strongest project?";
  }
  return label;
}

/** Exposed for tests — maps intent id to default follow-up labels. */
export function followUpsForQuestionIntent(id: QuestionIntentId): readonly string[] {
  return FOLLOW_UPS_BY_QUESTION_INTENT[id] ?? GENERIC_FOLLOW_UPS;
}

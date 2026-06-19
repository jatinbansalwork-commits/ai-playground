import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import {
  detectQuestionIntent,
  type QuestionIntentId,
} from "@/lib/ai-chat-question-intent";
import type { ChatReplySource } from "@/lib/ai-chat-types";

const GENERIC_FOLLOW_UPS = [
  "Which case study should I start with?",
  "How do I contact JB?",
] as const;

/** Follow-ups keyed to what the visitor just asked — not the first chip in the session. */
const FOLLOW_UPS_BY_QUESTION_INTENT: Record<
  QuestionIntentId,
  readonly string[]
> = {
  greeting: [
    "I'd love to hire JB",
    "Which case study should I start with?",
    "How do I contact JB?",
  ],
  wireframe: [
    "How did JB build this portfolio?",
    "What is on the Craft page?",
  ],
  resume: ["I'd love to hire JB", "How do I contact JB?"],
  hiring: ["Where is JB's resume?", "Tell me about Saltbot AI"],
  contact: ["I'd love to hire JB", "I'm interested in mentorship"],
  mentorship: ["What is in the JB Manual?", "How do I contact JB?"],
  career_interview: [
    "Tell me about a zero-to-one product you launched",
    "Which case study should I start with?",
  ],
  project_saltbot: [
    "What problem did Saltbot solve?",
    "Tell me more about Saltbot AI",
    "How do I contact JB?",
  ],
  project_piggy: [
    "How did Piggy reduce support tickets?",
    "Tell me about Piggy",
    "How do I contact JB?",
  ],
  project_freshprints: [
    "Tell me about the FreshPrints design system",
    "What did the Image Gen AI tool do?",
    "How do I contact JB?",
  ],
  project_kalash: [
    "Tell me about Kalash",
    "What is the Kalash year-end recap?",
    "How do I contact JB?",
  ],
  portfolio_site: [
    "What is on the Craft page?",
    "Which case study should I start with?",
  ],
  craft: [
    "How did JB build this portfolio?",
    "Which case study should I start with?",
  ],
  case_study_pick: [
    "Tell me about Saltbot AI",
    "Tell me about Piggy",
    "I'd love to hire JB",
  ],
  case_study_fun_fact: [
    "Which case study should I start with?",
    "I'd love to hire JB",
    "How do I contact JB?",
  ],
  explore: [...GENERIC_FOLLOW_UPS],
};

const FOLLOW_UPS_BY_CHIP_INTENT: Record<AiChatIntentId, readonly string[]> = {
  mentorship: ["What is in the JB Manual?", "How do I contact JB?"],
  hiring: ["Where is JB's resume?", "Tell me about Saltbot AI"],
  portfolio: ["What is on the Craft page?", "Which case study should I start with?"],
  "case-study": ["Tell me about Saltbot AI", "Tell me about Piggy"],
};

const FOLLOW_UPS_BY_PAGE: Record<string, readonly string[]> = {
  "/projects/saltbot-ai-saltmine": [
    "What problem did Saltbot solve?",
    "Tell me more about Saltbot AI",
    "How do I contact JB?",
  ],
  "/projects/freshprints-design-system": [
    "What was the design system scope?",
    "Tell me about the FreshPrints design system",
    "How do I contact JB?",
  ],
  "/projects/freshprints-image-gen-ai": [
    "What did the Image Gen AI tool do?",
    "How do I contact JB?",
  ],
  "/projects/piggy-reduced-mutual-fund-support-tickets": [
    "How did Piggy reduce support tickets?",
    "Tell me about Piggy",
    "How do I contact JB?",
  ],
  "/projects/kalash-rewards": [
    "Tell me about Kalash",
    "How do I contact JB?",
  ],
  "/projects/kalash-year-end-recap": [
    "What is the Kalash year-end recap?",
    "How do I contact JB?",
  ],
  "/craft": [
    "How did JB build this portfolio?",
    "Which case study should I start with?",
  ],
  "/projects": [
    "Which case study should I start with?",
    "I'd love to hire JB",
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
      "How do I contact JB?",
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
    return uniqueSuggestions([...fromQuestion, ...fromChip]);
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
  if (label === "What did the Image Gen AI tool do?") {
    return `What did the FreshPrints Image Gen AI tool do?`;
  }
  return label;
}

/** Exposed for tests — maps intent id to default follow-up labels. */
export function followUpsForQuestionIntent(id: QuestionIntentId): readonly string[] {
  return FOLLOW_UPS_BY_QUESTION_INTENT[id] ?? GENERIC_FOLLOW_UPS;
}

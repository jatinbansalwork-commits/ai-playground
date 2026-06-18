import { CONTACT_EMAIL, CONTACT_LINKS, ROUTES } from "@/lib/constants";
import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatReplySource } from "@/lib/ai-chat-types";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;

const GENERIC_FOLLOW_UPS = [
  "Which case study should I start with?",
  "How do I contact JB?",
] as const;

const FOLLOW_UPS_BY_INTENT: Record<AiChatIntentId, readonly string[]> = {
  mentorship: [
    "What is in the JB Manual?",
    "How do I contact JB?",
  ],
  hiring: [
    "Tell me more about Saltbot AI",
    "Where is JB's resume?",
  ],
  portfolio: [
    "What is on the Craft page?",
    "Which case study should I start with?",
  ],
  "case-study": [
    "Tell me about Piggy",
    "How do I contact JB?",
  ],
};

const FOLLOW_UPS_BY_PAGE: Record<string, readonly string[]> = {
  "/projects/saltbot-ai-saltmine": [
    "What problem did Saltbot solve?",
    "How do I contact JB?",
  ],
  "/projects/freshprints-design-system": [
    "What was the design system scope?",
    "How do I contact JB?",
  ],
  "/projects/freshprints-image-gen-ai": [
    "What did the Image Gen AI tool do?",
    "How do I contact JB?",
  ],
  "/projects/piggy-reduced-mutual-fund-support-tickets": [
    "How did Piggy reduce support tickets?",
    "How do I contact JB?",
  ],
  "/projects/kalash-rewards": [
    "What is the Kalash rewards work about?",
    "How do I contact JB?",
  ],
  "/projects/kalash-year-end-recap": [
    "What is the Kalash year-end recap?",
    "How do I contact JB?",
  ],
  "/craft": [
    "Which case study should I start with?",
    "How did JB build this portfolio?",
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

function suggestionsFromMessage(message: string): string[] {
  const text = message.toLowerCase();

  if (/contact|email|linkedin|reach|hire|mentor/.test(text)) {
    return ["How do I contact JB?", "Which case study should I start with?"];
  }

  if (/saltbot|ai|chatbot|conversational/.test(text)) {
    return ["Tell me more about Saltbot AI", "How do I contact JB?"];
  }

  if (/piggy|fintech|mutual|support/.test(text)) {
    return ["Tell me about Piggy", "How do I contact JB?"];
  }

  if (/freshprints|design system|system/.test(text)) {
    return ["Tell me about the FreshPrints design system", "How do I contact JB?"];
  }

  if (/kalash|gold|rewards/.test(text)) {
    return ["Tell me about Kalash", "How do I contact JB?"];
  }

  if (/portfolio|built|stack|craft|next\.?js/.test(text)) {
    return ["What is on the Craft page?", "Which case study should I start with?"];
  }

  return [...GENERIC_FOLLOW_UPS];
}

export function buildFollowUpSuggestions(options: {
  lastUserMessage: string;
  pagePath?: string;
  intentId?: AiChatIntentId;
  source: ChatReplySource;
}): string[] {
  const fromPage =
    options.pagePath && FOLLOW_UPS_BY_PAGE[options.pagePath]
      ? FOLLOW_UPS_BY_PAGE[options.pagePath]
      : options.pagePath?.startsWith("/projects/")
        ? [
            "What is the outcome of this project?",
            "How do I contact JB?",
          ]
        : [];

  const fromIntent = options.intentId
    ? FOLLOW_UPS_BY_INTENT[options.intentId]
    : [];

  const fromMessage = suggestionsFromMessage(options.lastUserMessage);

  if (options.source === "static" && options.intentId) {
    return uniqueSuggestions([...fromIntent, ...fromMessage]);
  }

  return uniqueSuggestions([
    ...fromPage,
    ...fromIntent,
    ...fromMessage,
    ...GENERIC_FOLLOW_UPS,
  ]);
}

export function resolveFollowUpPrompt(label: string): string {
  if (label === "Where is JB's resume?") {
    return "Where can I find JB's resume?";
  }
  if (label === "Tell me about the FreshPrints design system") {
    return "Tell me about the FreshPrints Design System case study";
  }
  return label;
}

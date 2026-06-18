import type { AiChatIntentId } from "@/lib/ai-chat-intents";

const INTENT_GIF_QUERIES: Record<AiChatIntentId, readonly string[]> = {
  mentorship: [
    "joey tribbiani how you doin",
    "chandler bing friends",
    "ross geller friends",
  ],
  hiring: [
    "joey tribbiani yes",
    "chandler bing excited",
    "ross geller happy",
  ],
  portfolio: [
    "ross geller excited",
    "chandler bing mind blown",
    "friends chandler sarcastic",
  ],
  "case-study": [
    "ross geller thinking",
    "chandler bing reading",
    "friends ross lecture",
  ],
};

const KEYWORD_GIF_QUERIES: Array<{ terms: string[]; queries: string[] }> = [
  {
    terms: ["contact", "email", "linkedin", "reach", "message"],
    queries: ["joey tribbiani thumbs up", "spongebob handshake"],
  },
  {
    terms: ["mentor", "mentorship", "advice", "feedback"],
    queries: ["joey tribbiani how you doin", "friends joey supportive"],
  },
  {
    terms: ["hire", "hiring", "role", "job", "contract"],
    queries: ["joey tribbiani excited", "spongebob ready for work"],
  },
  {
    terms: ["saltbot", "saltmine", "chatbot", "conversational"],
    queries: ["spongebob robot", "joey tribbiani talking"],
  },
  {
    terms: ["piggy", "fintech", "support", "mutual fund"],
    queries: ["spongebob money", "joey tribbiani wallet"],
  },
  {
    terms: ["freshprints", "design system", "system"],
    queries: ["spongebob organized", "joey tribbiani neat"],
  },
  {
    terms: ["kalash", "gold", "rewards"],
    queries: ["spongebob gold", "joey tribbiani celebration"],
  },
  {
    terms: ["portfolio", "built", "stack", "vercel", "next"],
    queries: ["spongebob builder", "joey tribbiani proud"],
  },
  {
    terms: ["craft", "experiment", "prototype"],
    queries: ["spongebob imagination", "joey tribbiani creative"],
  },
  {
    terms: ["wrong", "error", "fail", "broken"],
    queries: ["joey tribbiani confused", "spongebob panic"],
  },
  {
    terms: ["thanks", "thank you", "awesome", "great"],
    queries: ["joey tribbiani clapping", "spongebob celebration dance"],
  },
];

const DEFAULT_GIF_QUERIES = [
  "joey tribbiani friends",
  "chandler bing friends",
  "ross geller friends",
  "friends chandler sarcastic",
  "friends ross excited",
  "joey tribbiani how you doin",
] as const;

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function hashSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function queriesForMessage(
  userMessage: string,
  intentId?: AiChatIntentId,
): readonly string[] {
  const text = userMessage.trim().toLowerCase();

  if (intentId && INTENT_GIF_QUERIES[intentId]) {
    return INTENT_GIF_QUERIES[intentId];
  }

  for (const entry of KEYWORD_GIF_QUERIES) {
    if (includesAny(text, entry.terms)) {
      return entry.queries;
    }
  }

  return DEFAULT_GIF_QUERIES;
}

/** Ordered GIPHY search queries for a message — try next query when results repeat. */
export function resolveGifSearchQueries(
  userMessage: string,
  intentId?: AiChatIntentId,
): readonly string[] {
  return queriesForMessage(userMessage, intentId);
}

/** Maps the user's question to a GIPHY search tuned for Friends trio reactions. */
export function resolveGifSearchQuery(
  userMessage: string,
  intentId?: AiChatIntentId,
  attempt = 0,
): string {
  const seed = `${intentId ?? ""}:${userMessage.trim().toLowerCase()}`;
  const queries = queriesForMessage(userMessage, intentId);
  const index = (hashSeed(seed) + attempt) % queries.length;
  return queries[index] ?? queries[0] ?? DEFAULT_GIF_QUERIES[0];
}

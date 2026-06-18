import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import {
  detectReplySentiment,
  sentimentGifQueries,
  type GifReplySentiment,
} from "@/lib/ai-chat-gif-sentiment";

const INTENT_GIF_QUERIES: Record<AiChatIntentId, readonly string[]> = {
  mentorship: [
    "chandler bing friends",
    "ross geller friends",
    "joey tribbiani how you doin",
    "sheldon cooper friends",
  ],
  hiring: [
    "chandler bing excited",
    "ross geller happy",
    "sheldon cooper thumbs up",
    "joey tribbiani yes",
  ],
  portfolio: [
    "sheldon cooper big bang theory",
    "ross geller excited",
    "chandler bing mind blown",
    "big bang theory reaction",
  ],
  "case-study": [
    "ross geller thinking",
    "sheldon cooper thinking",
    "chandler bing reading",
    "friends ross lecture",
  ],
};

const KEYWORD_GIF_QUERIES: Array<{ terms: string[]; queries: string[] }> = [
  {
    terms: ["contact", "email", "linkedin", "reach", "message"],
    queries: ["chandler bing thumbs up", "sheldon cooper wave", "ross geller nod"],
  },
  {
    terms: ["mentor", "mentorship", "advice", "feedback"],
    queries: ["ross geller advice", "chandler bing supportive", "sheldon cooper explain"],
  },
  {
    terms: ["hire", "hiring", "role", "job", "contract"],
    queries: ["chandler bing excited", "sheldon cooper handshake", "joey tribbiani yes"],
  },
  {
    terms: ["saltbot", "saltmine", "chatbot", "conversational"],
    queries: ["sheldon cooper robot", "chandler bing talking", "ross geller explain"],
  },
  {
    terms: ["piggy", "fintech", "support", "mutual fund"],
    queries: ["ross geller money", "chandler bing wallet", "sheldon cooper calculator"],
  },
  {
    terms: ["freshprints", "design system", "system"],
    queries: ["ross geller organized", "sheldon cooper organized", "chandler bing neat"],
  },
  {
    terms: ["kalash", "gold", "rewards"],
    queries: ["joey tribbiani celebration", "ross geller excited", "sheldon cooper celebrate"],
  },
  {
    terms: ["portfolio", "built", "stack", "vercel", "next"],
    queries: ["sheldon cooper science", "ross geller proud", "chandler bing impressed"],
  },
  {
    terms: ["craft", "experiment", "prototype"],
    queries: ["sheldon cooper experiment", "ross geller idea", "chandler bing creative"],
  },
  {
    terms: ["wrong", "error", "fail", "broken"],
    queries: ["chandler bing confused", "ross geller panic", "sheldon cooper bazinga"],
  },
  {
    terms: ["thanks", "thank you", "awesome", "great"],
    queries: ["chandler bing clapping", "ross geller happy", "sheldon cooper applause"],
  },
  {
    terms: ["how you doin", "how you doing", "hey", "hello", "what's up"],
    queries: ["joey tribbiani how you doin", "chandler bing hey", "sheldon cooper hello"],
  },
];

const DEFAULT_GIF_QUERIES = [
  "chandler bing friends",
  "ross geller friends",
  "sheldon cooper bazinga",
  "sheldon cooper big bang theory",
  "chandler bing sarcastic",
  "ross geller pivot",
  "joey tribbiani friends",
  "big bang theory reaction",
  "friends tv reaction",
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

function mergeQueries(
  primary: readonly string[],
  secondary: readonly string[],
): readonly string[] {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const query of [...primary, ...secondary]) {
    const key = query.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(query);
  }

  return merged;
}

function queriesForMessage(
  userMessage: string,
  intentId?: AiChatIntentId,
  replyText?: string,
): readonly string[] {
  const text = userMessage.trim().toLowerCase();
  const sentiment = replyText ? detectReplySentiment(replyText) : "neutral";
  const toneQueries = sentimentGifQueries(sentiment);

  let topicQueries: readonly string[];

  if (intentId && INTENT_GIF_QUERIES[intentId]) {
    topicQueries = INTENT_GIF_QUERIES[intentId];
  } else {
    let matched = false;
    topicQueries = DEFAULT_GIF_QUERIES;

    for (const entry of KEYWORD_GIF_QUERIES) {
      if (includesAny(text, entry.terms)) {
        topicQueries = entry.queries;
        matched = true;
        break;
      }
    }

    if (!matched) {
      topicQueries = DEFAULT_GIF_QUERIES;
    }
  }

  if (toneQueries.length === 0) return topicQueries;
  return mergeQueries(toneQueries, topicQueries);
}

/** Ordered GIPHY search queries — sentiment from reply, topic from user message. */
export function resolveGifSearchQueries(
  userMessage: string,
  intentId?: AiChatIntentId,
  replyText?: string,
): readonly string[] {
  return queriesForMessage(userMessage, intentId, replyText);
}

export function resolveReplySentiment(replyText: string): GifReplySentiment {
  return detectReplySentiment(replyText);
}

export function resolveGifSearchQuery(
  userMessage: string,
  intentId?: AiChatIntentId,
  attempt = 0,
  replyText?: string,
): string {
  const seed = `${intentId ?? ""}:${userMessage.trim().toLowerCase()}`;
  const queries = queriesForMessage(userMessage, intentId, replyText);
  const index = (hashSeed(seed) + attempt) % queries.length;
  return queries[index] ?? queries[0] ?? DEFAULT_GIF_QUERIES[0];
}

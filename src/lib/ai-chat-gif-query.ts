import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import {
  detectReplySentiment,
  sentimentGifQueries,
  type GifReplySentiment,
} from "@/lib/ai-chat-gif-sentiment";

const INTENT_GIF_QUERIES: Record<AiChatIntentId, readonly string[]> = {
  "strongest-project": [
    "avengers assemble",
    "iron man tony stark",
    "captain america marvel",
    "thor marvel reaction",
  ],
  cisco: [
    "iron man reaction",
    "tony stark thinking",
    "doctor strange marvel",
    "avengers assemble",
  ],
  process: [
    "tony stark workshop",
    "iron man suit up",
    "avengers planning",
    "marvel reaction thinking",
  ],
  reach: [
    "captain america salute",
    "iron man thumbs up",
    "spider-man mcu wave",
    "avengers assemble",
  ],
};

const KEYWORD_GIF_QUERIES: Array<{ terms: string[]; queries: string[] }> = [
  {
    terms: ["contact", "email", "linkedin", "reach", "message"],
    queries: [
      "captain america salute",
      "iron man thumbs up",
      "spider-man mcu hello",
    ],
  },
  {
    terms: ["mentor", "mentorship", "advice", "feedback"],
    queries: [
      "tony stark advice",
      "captain america nod",
      "marvel mentoring",
    ],
  },
  {
    terms: ["hire", "hiring", "role", "job", "contract"],
    queries: [
      "avengers assemble",
      "iron man yes",
      "captain america ready",
    ],
  },
  {
    terms: ["saltbot", "saltmine", "chatbot", "conversational"],
    queries: [
      "iron man jarvis",
      "tony stark ai",
      "marvel tech reaction",
    ],
  },
  {
    terms: ["piggy", "fintech", "support", "mutual fund"],
    queries: [
      "iron man money",
      "tony stark confident",
      "marvel celebration",
    ],
  },
  {
    terms: ["freshprints", "design system", "system"],
    queries: [
      "tony stark organized",
      "iron man suit",
      "marvel studios reaction",
    ],
  },
  {
    terms: ["kalash", "gold", "rewards"],
    queries: [
      "avengers celebrate",
      "thor victory",
      "marvel celebration",
    ],
  },
  {
    terms: ["portfolio", "built", "stack", "vercel", "next"],
    queries: [
      "tony stark workshop",
      "iron man build",
      "marvel tech",
    ],
  },
  {
    terms: ["craft", "experiment", "prototype"],
    queries: [
      "tony stark inventing",
      "iron man prototype",
      "marvel science",
    ],
  },
  {
    terms: ["wrong", "error", "fail", "broken"],
    queries: [
      "hulk smash",
      "iron man frustrated",
      "marvel confused reaction",
    ],
  },
  {
    terms: ["thanks", "thank you", "awesome", "great"],
    queries: [
      "avengers celebrate",
      "iron man clap",
      "captain america proud",
    ],
  },
  {
    terms: ["how you doin", "how you doing", "hey", "hello", "what's up"],
    queries: [
      "spider-man mcu hello",
      "iron man wave",
      "avengers assemble",
    ],
  },
];

const DEFAULT_GIF_QUERIES = [
  "avengers assemble",
  "iron man tony stark",
  "captain america marvel",
  "thor marvel",
  "hulk smash",
  "spider-man mcu",
  "marvel reaction",
  "tony stark reaction",
  "avengers endgame",
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

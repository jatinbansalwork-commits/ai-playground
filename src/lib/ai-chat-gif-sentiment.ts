export type GifReplySentiment =
  | "celebration"
  | "confused"
  | "thinking"
  | "supportive"
  | "greeting"
  | "neutral";

interface SentimentRule {
  id: GifReplySentiment;
  terms: readonly string[];
  queries: readonly string[];
  weight?: number;
}

const SENTIMENT_RULES: readonly SentimentRule[] = [
  {
    id: "greeting",
    weight: 2,
    terms: [
      "how you doin",
      "how you doing",
      "what do you wanna",
      "hey ",
      "hello",
      "what's up",
      "good to see",
    ],
    queries: [
      "spider-man mcu hello",
      "iron man wave",
      "avengers assemble",
    ],
  },
  {
    id: "confused",
    weight: 2,
    terms: [
      "not sure",
      "i'm not great at the advice",
      "could this be",
      "could we be",
      "something went wrong",
      "broken",
      "unclear",
      "don't know",
      "sorry",
      "unavailable",
      "out of budget",
    ],
    queries: [
      "hulk confused",
      "iron man frustrated",
      "marvel confused reaction",
      "tony stark what",
    ],
  },
  {
    id: "celebration",
    terms: [
      "awesome",
      "congrats",
      "celebrate",
      "excited",
      "perfect",
      "amazing",
      "oh yeah",
      "all right",
      "pretty cool",
      "great place",
      "love to",
      "fun fact",
    ],
    queries: [
      "avengers celebrate",
      "iron man dance",
      "thor victory",
      "marvel celebration",
      "avengers assemble",
    ],
  },
  {
    id: "thinking",
    terms: [
      "actually",
      "here's",
      "start with",
      "recommend",
      "overview",
      "case study",
      "stack",
      "built",
      "process",
      "hear me out",
      "organised",
      "listen",
      "check out",
      "browse",
    ],
    queries: [
      "tony stark thinking",
      "iron man thinking",
      "doctor strange marvel",
      "marvel reaction thinking",
      "captain america serious",
    ],
  },
  {
    id: "supportive",
    terms: [
      "linkedin",
      "email",
      "reach out",
      "jb manual",
      "resume",
      "next step",
      "mentorship",
      "hiring",
      "contact",
      "message jb",
      "when you're ready",
    ],
    queries: [
      "captain america thumbs up",
      "iron man thumbs up",
      "spider-man mcu nod",
      "marvel supportive",
    ],
  },
];

function includesTerm(text: string, term: string): boolean {
  return text.includes(term);
}

/** Lightweight tone detection from assistant reply copy — no ML. */
export function detectReplySentiment(replyText: string): GifReplySentiment {
  const text = replyText.trim().toLowerCase();
  if (!text) return "neutral";

  let best: GifReplySentiment = "neutral";
  let bestScore = 0;

  for (const rule of SENTIMENT_RULES) {
    let score = 0;
    for (const term of rule.terms) {
      if (includesTerm(text, term)) score += 1;
    }
    if (score === 0) continue;

    score *= rule.weight ?? 1;
    if (score > bestScore) {
      bestScore = score;
      best = rule.id;
    }
  }

  return bestScore > 0 ? best : "neutral";
}

export function sentimentGifQueries(
  sentiment: GifReplySentiment,
): readonly string[] {
  if (sentiment === "neutral") return [];

  const rule = SENTIMENT_RULES.find((entry) => entry.id === sentiment);
  return rule?.queries ?? [];
}

import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatGif } from "@/lib/ai-chat-types";

/** Verified embed URLs from GIPHY search (legacy `i.giphy.com/{id}` links often 404). */
const JOEY_GIFS: readonly ChatGif[] = [
  {
    giphyId: "YTDZakyAorkLDYqN0q",
    url: "https://media2.giphy.com/media/v1.Y2lkPThhMWY5NGJhYzVsdWlqMW8zamVsOTY0N3FteXQ0eWozYnducTN6eWh1ZGtiN3R1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YTDZakyAorkLDYqN0q/giphy-downsized.gif",
    alt: "Joey Tribbiani — Friends",
    width: 480,
    height: 400,
  },
  {
    giphyId: "11ykUODgXjAXZu",
    url: "https://media3.giphy.com/media/v1.Y2lkPThhMWY5NGJhYzVsdWlqMW8zamVsOTY0N3FteXQ0eWozYnducTN6eWh1ZGtiN3R1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11ykUODgXjAXZu/giphy.gif",
    alt: "Joey Tribbiani — Friends",
    width: 400,
    height: 300,
  },
];

const CHANDLER_GIFS: readonly ChatGif[] = [
  {
    giphyId: "amkS2AoPLAGg8",
    url: "https://media3.giphy.com/media/v1.Y2lkPThhMWY5NGJhendtaTN1czcyMXgzODcxc2Y3ajRrdXZwOWpkYWJyNHZ1eDNuZWw0biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/amkS2AoPLAGg8/giphy.gif",
    alt: "Chandler Bing — Friends",
    width: 480,
    height: 270,
  },
  {
    giphyId: "10I5e2yNnaozOo",
    url: "https://media0.giphy.com/media/v1.Y2lkPThhMWY5NGJheGk0MWV0YXJzMGl6NDJ2dzA3cm50MTc5bnE1N3Awbm16YWo3cXg4byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10I5e2yNnaozOo/giphy.gif",
    alt: "Chandler Bing — sarcastic",
    width: 480,
    height: 270,
  },
  {
    giphyId: "fA81FF4mdE6lgeoJwb",
    url: "https://media0.giphy.com/media/v1.Y2lkPThhMWY5NGJhendtaTN1czcyMXgzODcxc2Y3ajRrdXZwOWpkYWJyNHZ1eDNuZWw0biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fA81FF4mdE6lgeoJwb/giphy.gif",
    alt: "Chandler Bing — Friends",
    width: 480,
    height: 270,
  },
];

const ROSS_GIFS: readonly ChatGif[] = [
  {
    giphyId: "JOe7JxOiMg61ogl6fH",
    url: "https://media2.giphy.com/media/v1.Y2lkPThhMWY5NGJhZjFnNnRkNG42MHUzNDAwZ2JmY3JiZGpvYjhoeGdsbTRhODE4bWNlYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JOe7JxOiMg61ogl6fH/giphy.gif",
    alt: "Ross Geller — Friends",
    width: 480,
    height: 270,
  },
  {
    giphyId: "2OP9jbHFlFPW",
    url: "https://media0.giphy.com/media/v1.Y2lkPThhMWY5NGJhbnBxcWY5dzR6ZzNjb241Z3hhbWY2M2ZrZm8wc3g4aTdzNnJzZ3VheiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2OP9jbHFlFPW/giphy.gif",
    alt: "Ross Geller — pivot",
    width: 480,
    height: 270,
  },
  {
    giphyId: "YhRzFyF3EzhXG",
    url: "https://media4.giphy.com/media/v1.Y2lkPThhMWY5NGJhZjFnNnRkNG42MHUzNDAwZ2JmY3JiZGpvYjhoeGdsbTRhODE4bWNlYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YhRzFyF3EzhXG/giphy.gif",
    alt: "Ross Geller — Friends",
    width: 480,
    height: 270,
  },
];

const SHELDON_GIFS: readonly ChatGif[] = [
  {
    giphyId: "JuqDes49CeCeQ",
    url: "https://media1.giphy.com/media/v1.Y2lkPThhMWY5NGJhem8za21pcDB1NnBxOWZhbzRyNW9mYnl5aXphMml0bDBod281bXowYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JuqDes49CeCeQ/giphy.gif",
    alt: "Sheldon Cooper — bazinga",
    width: 480,
    height: 270,
  },
  {
    giphyId: "i79na9XMwDues",
    url: "https://media4.giphy.com/media/v1.Y2lkPThhMWY5NGJhb2Z5aXJvd2dibHFpNjl0MDAwdnRoODQ0aHJhbDJ1am81dG1jOTRlYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/i79na9XMwDues/giphy.gif",
    alt: "Sheldon Cooper — The Big Bang Theory",
    width: 480,
    height: 270,
  },
  {
    giphyId: "KSCYjxdjm0yA0",
    url: "https://media1.giphy.com/media/v1.Y2lkPThhMWY5NGJhem8za21pcDB1NnBxOWZhbzRyNW9mYnl5aXphMml0bDBod281bXowYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KSCYjxdjm0yA0/giphy.gif",
    alt: "Sheldon Cooper — bazinga",
    width: 480,
    height: 270,
  },
  {
    giphyId: "1FMaabePDEfgk",
    url: "https://media0.giphy.com/media/v1.Y2lkPThhMWY5NGJhbW03YnBqeGJ3bWFuNTVvNjZzdmpsbWgwdjJsdXRhcnl0ZmxqaDhwOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1FMaabePDEfgk/giphy.gif",
    alt: "The Big Bang Theory — reaction",
    width: 480,
    height: 270,
  },
];

const SPONGEBOB_GIFS: readonly ChatGif[] = [
  {
    giphyId: "MTclfCr4tVgis",
    url: "https://media3.giphy.com/media/v1.Y2lkPThhMWY5NGJhaHIxd2kzYjl1MTYzZWhqaTNsbnNtbXF5YWtsczZhZWY4M2p3NTl2ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MTclfCr4tVgis/giphy.gif",
    alt: "SpongeBob celebration",
    width: 320,
    height: 198,
  },
  {
    giphyId: "GWNBoSxSpt7Ik",
    url: "https://media4.giphy.com/media/v1.Y2lkPThhMWY5NGJhaHIxd2kzYjl1MTYzZWhqaTNsbnNtbXF5YWtsczZhZWY4M2p3NTl2ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GWNBoSxSpt7Ik/giphy.gif",
    alt: "SpongeBob SquarePants",
    width: 500,
    height: 285,
  },
];

const ALL_REACTION_GIFS: readonly ChatGif[] = [
  ...JOEY_GIFS,
  ...CHANDLER_GIFS,
  ...ROSS_GIFS,
  ...SHELDON_GIFS,
  ...SPONGEBOB_GIFS,
];

const INTENT_GIF_POOLS: Record<AiChatIntentId, readonly ChatGif[]> = {
  mentorship: [...JOEY_GIFS, ...CHANDLER_GIFS, ...ROSS_GIFS],
  hiring: [...CHANDLER_GIFS, ...ROSS_GIFS, ...SHELDON_GIFS],
  portfolio: [...ROSS_GIFS, ...SHELDON_GIFS, ...CHANDLER_GIFS],
  "case-study": [...ROSS_GIFS, ...SHELDON_GIFS, ...CHANDLER_GIFS],
};

function hashSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickFromPool(seed: string, pool: readonly ChatGif[]): ChatGif {
  return pool[hashSeed(seed) % pool.length] ?? pool[0];
}

function filterExcluded(
  pool: readonly ChatGif[],
  excludeIds: ReadonlySet<string>,
): ChatGif[] {
  if (excludeIds.size === 0) return [...pool];
  return pool.filter(
    (gif) => !gif.giphyId || !excludeIds.has(gif.giphyId),
  );
}

function poolForQuery(query: string): readonly ChatGif[] {
  const lower = query.toLowerCase();
  if (lower.includes("sheldon") || lower.includes("bazinga") || lower.includes("big bang")) {
    return SHELDON_GIFS;
  }
  if (lower.includes("chandler")) return CHANDLER_GIFS;
  if (lower.includes("ross")) return ROSS_GIFS;
  if (lower.includes("joey")) return JOEY_GIFS;
  if (lower.includes("spongebob")) return SPONGEBOB_GIFS;
  if (lower.includes("friends")) return ALL_REACTION_GIFS;
  return ALL_REACTION_GIFS;
}

/** Curated reaction GIF when GIPHY search returns nothing usable. */
export function resolveCuratedReactionGif(
  query: string,
  intentId?: AiChatIntentId,
  excludeIds: ReadonlySet<string> = new Set(),
): ChatGif {
  const seed = `${intentId ?? ""}:${query}:${excludeIds.size}`;
  const pool =
    intentId && INTENT_GIF_POOLS[intentId]
      ? INTENT_GIF_POOLS[intentId]
      : poolForQuery(query);

  const available = filterExcluded(pool, excludeIds);
  const pickPool = available.length > 0 ? available : ALL_REACTION_GIFS;
  const finalPool = filterExcluded(pickPool, excludeIds);
  return pickFromPool(seed, finalPool.length > 0 ? finalPool : ALL_REACTION_GIFS);
}

/** Next curated fallback when a CDN URL fails in the browser. */
export function resolveCuratedGifFallback(
  failedGif: ChatGif,
  querySeed: string,
  excludeIds: ReadonlySet<string> = new Set(),
): ChatGif | null {
  const pool = poolForQuery(querySeed);
  const blocked = new Set(excludeIds);
  if (failedGif.giphyId) blocked.add(failedGif.giphyId);

  const alternatives = filterExcluded(pool, blocked);
  if (alternatives.length === 0) {
    const anyLeft = filterExcluded(ALL_REACTION_GIFS, blocked);
    if (anyLeft.length === 0) return null;
    return pickFromPool(`${querySeed}:fallback:${blocked.size}`, anyLeft);
  }
  return pickFromPool(`${querySeed}:fallback:${blocked.size}`, alternatives);
}

export function listCuratedReactionGifs(): readonly ChatGif[] {
  return ALL_REACTION_GIFS;
}

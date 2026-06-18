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
    giphyId: "llToceLTKQj0R1Asid",
    url: "https://media4.giphy.com/media/v1.Y2lkPThhMWY5NGJhYzVsdWlqMW8zamVsOTY0N3FteXQ0eWozYnducTN6eWh1ZGtiN3R1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/llToceLTKQj0R1Asid/giphy.gif",
    alt: "Joey — Friends",
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
  {
    giphyId: "jp9K9GWSV4BYHgOUY6",
    url: "https://media3.giphy.com/media/v1.Y2lkPThhMWY5NGJhYzVsdWlqMW8zamVsOTY0N3FteXQ0eWozYnducTN6eWh1ZGtiN3R1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jp9K9GWSV4BYHgOUY6/giphy.gif",
    alt: "Joey — Friends",
    width: 480,
    height: 400,
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
  {
    giphyId: "iUYOGrSiLpTvaWz1FE",
    url: "https://media3.giphy.com/media/v1.Y2lkPThhMWY5NGJhaHIxd2kzYjl1MTYzZWhqaTNsbnNtbXF5YWtsczZhZWY4M2p3NTl2ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iUYOGrSiLpTvaWz1FE/giphy-downsized.gif",
    alt: "SpongeBob celebrating",
    width: 362,
    height: 362,
  },
  {
    giphyId: "nDSlfqf0gn5g4",
    url: "https://media1.giphy.com/media/v1.Y2lkPThhMWY5NGJhNTd5bjV0NHVoODBhYWdxd2QxZzhlYXgzNmd6aGx2dHM1OXJyeTF1NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nDSlfqf0gn5g4/giphy.gif",
    alt: "SpongeBob happy",
    width: 480,
    height: 362,
  },
];

const INTENT_GIF_POOLS: Record<AiChatIntentId, readonly ChatGif[]> = {
  mentorship: JOEY_GIFS,
  hiring: [...JOEY_GIFS, ...SPONGEBOB_GIFS],
  portfolio: SPONGEBOB_GIFS,
  "case-study": SPONGEBOB_GIFS,
};

const ALL_CURATED_GIFS: readonly ChatGif[] = [...JOEY_GIFS, ...SPONGEBOB_GIFS];

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
  if (lower.includes("spongebob")) return SPONGEBOB_GIFS;
  if (lower.includes("chandler")) return JOEY_GIFS;
  if (lower.includes("ross")) return JOEY_GIFS;
  if (lower.includes("joey") || lower.includes("friends")) return JOEY_GIFS;
  return ALL_CURATED_GIFS;
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
  const pickPool = available.length > 0 ? available : [...pool];
  return pickFromPool(seed, pickPool);
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
  if (alternatives.length === 0) return null;
  return pickFromPool(`${querySeed}:fallback:${blocked.size}`, alternatives);
}

export function listCuratedReactionGifs(): readonly ChatGif[] {
  return ALL_CURATED_GIFS;
}

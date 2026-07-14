import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatGif } from "@/lib/ai-chat-types";

/** Stable media URLs — `media.giphy.com/media/{id}/giphy.gif`. */
function avengerGif(
  giphyId: string,
  alt: string,
  width = 480,
  height = 270,
): ChatGif {
  return {
    giphyId,
    url: `https://media.giphy.com/media/${giphyId}/giphy.gif`,
    alt,
    width,
    height,
  };
}

const IRON_MAN_GIFS: readonly ChatGif[] = [
  avengerGif("9JrstIyBclRGhce4SG", "Iron Man — Avengers"),
  avengerGif("5wu6zc60M9GmscmFje", "Tony Stark — Iron Man"),
  avengerGif("gZGlQX3wWAV1u", "Iron Man reaction"),
  avengerGif("43QvEVIc7F5p1PKTww", "Tony Stark — Iron Man"),
  avengerGif("jP1uaoNPmn5O5gjS7k", "Tony Stark — Iron Man"),
  avengerGif("qmfpjpAT2fJRK", "Iron Man reaction"),
  avengerGif("Mnx9WmHrYN3qicTsCd", "Tony Stark — Iron Man"),
];

const CAPTAIN_AMERICA_GIFS: readonly ChatGif[] = [
  avengerGif("VIul6kR8mDHzXoVMLv", "Avengers Assemble"),
  avengerGif("3oxHQpJKupQXsmU1JS", "Captain America — Avengers"),
  avengerGif("vAjhdaZ6MsKI0", "Captain America — Civil War"),
  avengerGif("fWBg2J2GJy2RkIyKL8", "Captain America — Marvel Studios"),
  avengerGif("8lJwA6kNkKyfC", "The Avengers"),
];

const THOR_GIFS: readonly ChatGif[] = [
  avengerGif("3ov9jOjo4n7HASUu8U", "Thor — Marvel Studios"),
  avengerGif("JVaGIHrnC4Xi9DBPwr", "Thor: Love and Thunder"),
  avengerGif("bnYY3OVydHwss7WLfQ", "Thor — Marvel"),
  avengerGif("EfsqyinraWHCKWxsjq", "Thor: Love and Thunder"),
];

const HULK_GIFS: readonly ChatGif[] = [
  avengerGif("10H4by255F2UsU", "Hulk smash"),
  avengerGif("xFBnkMvpTM6m4", "The Incredible Hulk"),
  avengerGif("XSc4Kkc5u2WZy", "Hulk — The Avengers"),
  avengerGif("lFZKK1pINTGA8", "Hulk smash"),
];

const SPIDER_MAN_GIFS: readonly ChatGif[] = [
  avengerGif("3o6fIZjYglR6qpOXKM", "Spider-Man — MCU"),
  avengerGif("IXexMSyZCrowhY11m1", "Spider-Man"),
];

const ALL_REACTION_GIFS: readonly ChatGif[] = [
  ...IRON_MAN_GIFS,
  ...CAPTAIN_AMERICA_GIFS,
  ...THOR_GIFS,
  ...HULK_GIFS,
  ...SPIDER_MAN_GIFS,
];

const INTENT_GIF_POOLS: Record<AiChatIntentId, readonly ChatGif[]> = {
  "strongest-project": [...CAPTAIN_AMERICA_GIFS, ...IRON_MAN_GIFS, ...THOR_GIFS],
  cisco: [...IRON_MAN_GIFS, ...CAPTAIN_AMERICA_GIFS, ...THOR_GIFS],
  process: [...IRON_MAN_GIFS, ...THOR_GIFS, ...CAPTAIN_AMERICA_GIFS],
  reach: [...CAPTAIN_AMERICA_GIFS, ...IRON_MAN_GIFS, ...SPIDER_MAN_GIFS],
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
  if (lower.includes("iron man") || lower.includes("tony stark")) {
    return IRON_MAN_GIFS;
  }
  if (lower.includes("captain america") || lower.includes("assemble")) {
    return CAPTAIN_AMERICA_GIFS;
  }
  if (lower.includes("thor")) return THOR_GIFS;
  if (lower.includes("hulk")) return HULK_GIFS;
  if (lower.includes("spider")) return SPIDER_MAN_GIFS;
  if (lower.includes("avenger") || lower.includes("marvel")) {
    return ALL_REACTION_GIFS;
  }
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

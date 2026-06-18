import { isGiphyChatEnabled } from "@/lib/ai-chat-config";
import { resolveCuratedReactionGif } from "@/lib/ai-chat-gif-fallback";
import { resolveGifSearchQueries } from "@/lib/ai-chat-gif-query";
import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatGif } from "@/lib/ai-chat-types";

const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";
const GIF_CACHE_MAX = 48;

interface GiphyImageVariant {
  url?: string;
  width?: string;
  height?: string;
}

interface GiphySearchEntry {
  id?: string;
  title?: string;
  images?: {
    downsized?: GiphyImageVariant;
    downsized_medium?: GiphyImageVariant;
    fixed_width?: GiphyImageVariant;
  };
}

interface GiphySearchResponse {
  data?: GiphySearchEntry[];
}

const gifCache = new Map<string, ChatGif>();

function readDimension(value?: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function hashSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function buildExcludeSet(ids: readonly string[] | undefined): Set<string> {
  return new Set(ids?.filter(Boolean) ?? []);
}

function gifFromEntry(entry: GiphySearchEntry): ChatGif | null {
  const id = entry.id;
  const image =
    entry.images?.downsized ??
    entry.images?.downsized_medium ??
    entry.images?.fixed_width;
  const url = image?.url;

  if (!id || !url || !url.includes("giphy.com/media/")) return null;

  return {
    giphyId: id,
    url,
    alt: entry.title?.trim() || "Reaction GIF",
    width: readDimension(image.width),
    height: readDimension(image.height),
  };
}

function pickGifFromResults(
  query: string,
  data: GiphySearchEntry[] | undefined,
  excludeIds: ReadonlySet<string>,
): ChatGif | null {
  if (!data?.length) return null;

  const candidates: ChatGif[] = [];
  for (const entry of data) {
    const gif = gifFromEntry(entry);
    if (!gif) continue;
    if (gif.giphyId && excludeIds.has(gif.giphyId)) continue;
    candidates.push(gif);
  }

  if (candidates.length === 0) return null;

  const seed = `${query}:${excludeIds.size}:${[...excludeIds].sort().join(",")}`;
  const start = hashSeed(seed) % candidates.length;
  return candidates[start] ?? candidates[0] ?? null;
}

function rememberInCache(query: string, gif: ChatGif): void {
  if (gifCache.size >= GIF_CACHE_MAX) {
    const oldest = gifCache.keys().next().value;
    if (oldest) gifCache.delete(oldest);
  }
  gifCache.set(`${query}:${gif.giphyId ?? gif.url}`, gif);
}

async function searchGiphyApi(
  query: string,
  apiKey: string,
  excludeIds: ReadonlySet<string>,
): Promise<ChatGif | null> {
  const url = new URL(GIPHY_SEARCH_URL);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "50");
  url.searchParams.set("rating", "pg");
  url.searchParams.set("lang", "en");

  const response = await fetch(url, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as GiphySearchResponse;
  return pickGifFromResults(query, payload.data, excludeIds);
}

export async function fetchChatReactionGif(
  userMessage: string,
  intentId?: AiChatIntentId,
  usedGifIds: readonly string[] = [],
  replyText?: string,
): Promise<ChatGif | null> {
  if (!isGiphyChatEnabled()) return null;

  const excludeIds = buildExcludeSet(usedGifIds);
  const queries = resolveGifSearchQueries(userMessage, intentId, replyText);
  const apiKey = process.env.GIPHY_API_KEY;

  for (let attempt = 0; attempt < queries.length; attempt += 1) {
    const query = queries[attempt] ?? queries[0];
    if (!query) continue;

    const cacheKey = `${query}:${[...excludeIds].sort().join(",")}`;
    const cached = gifCache.get(cacheKey);
    if (
      cached &&
      (!cached.giphyId || !excludeIds.has(cached.giphyId))
    ) {
      return cached;
    }

    try {
      if (apiKey) {
        const fromApi = await searchGiphyApi(query, apiKey, excludeIds);
        if (fromApi) {
          rememberInCache(cacheKey, fromApi);
          return fromApi;
        }
      }
    } catch {
      // Try the next query or fall through to curated GIFs.
    }
  }

  const fallbackQuery = queries[0] ?? userMessage;
  const fallback = resolveCuratedReactionGif(
    fallbackQuery,
    intentId,
    excludeIds,
  );
  return fallback;
}

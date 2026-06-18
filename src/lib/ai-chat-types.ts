export type ChatReplySource = "static" | "openai" | "fallback";

export interface ChatGif {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** GIPHY id — used for client fallback if the CDN URL fails. */
  giphyId?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  gif?: ChatGif;
}

export interface ChatApiRequest {
  messages: ChatMessage[];
  /** Set when the user taps a starter chip — enables instant static first reply. */
  intentId?: string;
  /** Current pathname for page-aware answers, e.g. `/projects/piggy-...`. */
  pagePath?: string;
  /** GIPHY ids already shown this session — server avoids repeating them when possible. */
  usedGifIds?: string[];
}

export interface ChatApiResponse {
  reply?: string;
  remainingPrompts?: number;
  remainingOpenAi?: number;
  followUps?: string[];
  source?: ChatReplySource;
  error?: string;
}

/** NDJSON events streamed from `/api/chat`. */
export type ChatStreamEvent =
  | {
      type: "meta";
      remainingPrompts: number;
      remainingOpenAi: number;
      source: ChatReplySource;
    }
  | { type: "delta"; content: string }
  | {
      type: "done";
      reply: string;
      followUps: string[];
      source: ChatReplySource;
      remainingPrompts: number;
      remainingOpenAi: number;
      gif?: ChatGif;
    }
  | { type: "error"; message: string };

export function encodeChatStreamEvent(event: ChatStreamEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

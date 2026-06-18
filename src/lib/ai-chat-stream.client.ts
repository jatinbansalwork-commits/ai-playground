import type { ChatGif, ChatStreamEvent } from "@/lib/ai-chat-types";
import { AI_CHAT_FALLBACK_STREAM_CHUNK } from "@/lib/ai-chat-config";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function chunkTextForStream(
  text: string,
  chunkSize = AI_CHAT_FALLBACK_STREAM_CHUNK,
): string[] {
  const chunks: string[] = [];
  for (let index = 0; index < text.length; index += chunkSize) {
    chunks.push(text.slice(index, index + chunkSize));
  }
  return chunks;
}

/** Replays buffered server chunks with a typewriter cadence after the thinking loader. */
export async function replayChatDeltas(
  deltas: string[],
  options: {
    chunkDelayMs: number;
    onChunk: (accumulated: string) => void;
  },
): Promise<void> {
  if (deltas.length === 0) return;

  let accumulated = "";
  for (let index = 0; index < deltas.length; index += 1) {
    accumulated += deltas[index];
    options.onChunk(accumulated);
    if (index < deltas.length - 1 && options.chunkDelayMs > 0) {
      await sleep(options.chunkDelayMs);
    }
  }
}

export async function consumeChatStream(
  response: Response,
  handlers: {
    onMeta?: (event: Extract<ChatStreamEvent, { type: "meta" }>) => void;
    onDelta?: (content: string) => void | Promise<void>;
    onError?: (message: string) => void;
  },
): Promise<{
  reply: string;
  followUps: string[];
  source: "static" | "openai" | "fallback";
  remainingPrompts: number;
  remainingOpenAi: number;
  gif?: ChatGif;
}> {
  if (!response.body) {
    throw new Error("Missing response body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let reply = "";
  let followUps: string[] = [];
  let source: "static" | "openai" | "fallback" = "fallback";
  let remainingPrompts = 0;
  let remainingOpenAi = 0;
  let gif: ChatGif | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;

      const event = JSON.parse(line) as ChatStreamEvent;

      if (event.type === "meta") {
        source = event.source;
        remainingPrompts = event.remainingPrompts;
        remainingOpenAi = event.remainingOpenAi;
        handlers.onMeta?.(event);
      }

      if (event.type === "delta") {
        reply += event.content;
        await handlers.onDelta?.(event.content);
      }

      if (event.type === "error") {
        handlers.onError?.(event.message);
        throw new Error(event.message);
      }

      if (event.type === "done") {
        reply = event.reply;
        followUps = event.followUps;
        source = event.source;
        remainingPrompts = event.remainingPrompts;
        remainingOpenAi = event.remainingOpenAi;
        gif = event.gif;
      }
    }
  }

  return {
    reply,
    followUps,
    source,
    remainingPrompts,
    remainingOpenAi,
    gif,
  };
}

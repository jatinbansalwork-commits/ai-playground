import {
  AI_CHAT_FALLBACK_STREAM_CHUNK,
} from "@/lib/ai-chat-config";
import type { ChatGif, ChatReplySource, ChatStreamEvent } from "@/lib/ai-chat-types";
import { encodeChatStreamEvent } from "@/lib/ai-chat-types";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function* streamTextChunks(
  text: string,
  chunkSize = AI_CHAT_FALLBACK_STREAM_CHUNK,
): AsyncGenerator<string> {
  for (let index = 0; index < text.length; index += chunkSize) {
    yield text.slice(index, index + chunkSize);
    await sleep(12);
  }
}

export function createChatStreamResponse(
  producer: (
    emit: (event: ChatStreamEvent) => void,
  ) => Promise<{
    reply: string;
    followUps: string[];
    source: ChatReplySource;
    remainingPrompts: number;
    remainingOpenAi: number;
    gif?: ChatGif | null;
  }>,
): Response {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ChatStreamEvent) => {
        controller.enqueue(encodeChatStreamEvent(event));
      };

      try {
        const result = await producer(emit);
        emit({
          type: "done",
          reply: result.reply,
          followUps: result.followUps,
          source: result.source,
          remainingPrompts: result.remainingPrompts,
          remainingOpenAi: result.remainingOpenAi,
          ...(result.gif ? { gif: result.gif } : {}),
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong.";
        emit({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function streamPreparedReply(
  emit: (event: ChatStreamEvent) => void,
  options: {
    reply: string;
    followUps: string[];
    source: ChatReplySource;
    remainingPrompts: number;
    remainingOpenAi: number;
  },
): Promise<{
  reply: string;
  followUps: string[];
  source: ChatReplySource;
  remainingPrompts: number;
  remainingOpenAi: number;
}> {
  emit({
    type: "meta",
    remainingPrompts: options.remainingPrompts,
    remainingOpenAi: options.remainingOpenAi,
    source: options.source,
  });

  for await (const chunk of streamTextChunks(options.reply)) {
    emit({ type: "delta", content: chunk });
  }

  return options;
}

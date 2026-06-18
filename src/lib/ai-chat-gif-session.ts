import { AI_CHAT_USED_GIF_MAX } from "@/lib/ai-chat-config";
import type { ChatMessage } from "@/lib/ai-chat-types";

/** GIPHY ids already attached to assistant messages in this session. */
export function collectUsedGifIds(
  messages: readonly ChatMessage[],
): string[] {
  const ids: string[] = [];

  for (const message of messages) {
    if (message.role === "assistant" && message.gif?.giphyId) {
      ids.push(message.gif.giphyId);
    }
  }

  return [...new Set(ids)].slice(-AI_CHAT_USED_GIF_MAX);
}

export function sanitiseUsedGifIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value.filter(
        (id): id is string => typeof id === "string" && id.trim().length > 0,
      ),
    ),
  ].slice(-AI_CHAT_USED_GIF_MAX);
}

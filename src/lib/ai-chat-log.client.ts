import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { QuestionIntentId } from "@/lib/ai-chat-question-intent";
import type { ChatReplySource } from "@/lib/ai-chat-types";

interface QueueClientChatLogOptions {
  question: string;
  reply: string;
  pagePath?: string;
  intentId?: AiChatIntentId;
  questionIntentId?: QuestionIntentId;
  replySource?: ChatReplySource;
  turn?: number;
}

/** Fire-and-forget log for client-only replies (wireframe, session limit). */
export function queueClientChatLog(options: QueueClientChatLogOptions): void {
  void fetch("/api/chat/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  }).catch(() => {
    // Logging must never affect chat replies.
  });
}

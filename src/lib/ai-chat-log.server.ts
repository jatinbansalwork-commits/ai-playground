import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { QuestionIntentId } from "@/lib/ai-chat-question-intent";
import type { ChatReplySource } from "@/lib/ai-chat-types";

const LOG_TIMEOUT_MS = 4000;
const MAX_QUESTION_LENGTH = 2000;
const MAX_REPLY_LENGTH = 8000;
const MAX_GOAL_LENGTH = 500;

export interface ChatQuestionLogEntry {
  question: string;
  reply: string;
  pagePath?: string;
  /** Chip intent when the visitor tapped a suggested prompt. */
  intentId?: AiChatIntentId;
  /** Detected question type from message text (hiring, resume, explore, etc.). */
  questionIntentId?: QuestionIntentId;
  goal?: string;
  inputType: "chip" | "typed";
  replySource: ChatReplySource;
  /** 1-based user turn in this session. */
  turn: number;
}

function isChatQuestionLogEnabled(): boolean {
  if (process.env.AI_CHAT_LOG_ENABLED === "false") return false;
  return Boolean(process.env.AI_CHAT_LOG_WEBHOOK_URL?.trim());
}

function sanitiseQuestion(value: string): string {
  return value.trim().slice(0, MAX_QUESTION_LENGTH);
}

function sanitiseReply(value: string): string {
  return value.trim().slice(0, MAX_REPLY_LENGTH);
}

function sanitiseGoal(value: string): string {
  return value.trim().slice(0, MAX_GOAL_LENGTH);
}

function countUserTurns(messages: readonly { role: string }[]): number {
  return messages.filter((message) => message.role === "user").length;
}

/** Fire-and-forget — append a row to your spreadsheet webhook (Google Apps Script). */
export function recordChatQuestion(
  request: Request,
  messages: readonly { role: string; content?: string }[],
  entry: ChatQuestionLogEntry,
): Promise<void> {
  if (!isChatQuestionLogEnabled()) return Promise.resolve();

  const webhookUrl = process.env.AI_CHAT_LOG_WEBHOOK_URL!.trim();
  const secret = process.env.AI_CHAT_LOG_SECRET?.trim();

  const payload = {
    timestamp: new Date().toISOString(),
    question: sanitiseQuestion(entry.question),
    reply: sanitiseReply(entry.reply),
    pagePath: entry.pagePath ?? "",
    intentId: entry.intentId ?? "",
    questionIntentId: entry.questionIntentId ?? "",
    goal: entry.goal ? sanitiseGoal(entry.goal) : "",
    inputType: entry.inputType,
    replySource: entry.replySource,
    turn: entry.turn || countUserTurns(messages),
    userAgent: request.headers.get("user-agent") ?? "",
    ...(secret ? { secret } : {}),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LOG_TIMEOUT_MS);

  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Chat log webhook returned ${response.status}.`);
      }
    })
    .finally(() => {
      clearTimeout(timeout);
    });
}

export function queueChatQuestionLog(
  request: Request,
  messages: readonly { role: string; content?: string }[],
  entry: ChatQuestionLogEntry,
): void {
  void recordChatQuestion(request, messages, entry).catch(() => {
    // Logging must never affect chat replies.
  });
}

export function inferChatInputType(intentId?: string): "chip" | "typed" {
  return intentId ? "chip" : "typed";
}

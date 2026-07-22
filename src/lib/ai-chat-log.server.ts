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
export async function recordChatQuestion(
  request: Request,
  messages: readonly { role: string; content?: string }[],
  entry: ChatQuestionLogEntry,
): Promise<"logged" | "disabled" | "failed"> {
  if (!isChatQuestionLogEnabled()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[ai-chat-log] Skipped — set AI_CHAT_LOG_WEBHOOK_URL in .env.local (see scripts/jbai-chat-log-apps-script.js).",
      );
    }
    return "disabled";
  }

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

  try {
    // Google Apps Script web apps respond with 302 to an echo URL that holds
    // the real JSON body. Follow that second hop with GET (not POST).
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "manual",
    });

    const status = response.status;
    if (status >= 300 && status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new Error(`Chat log webhook returned ${status} without Location.`);
      }
      const echo = await fetch(location, { method: "GET", signal: controller.signal });
      const text = await echo.text();
      let parsed: { ok?: boolean; error?: string } | null = null;
      try {
        parsed = JSON.parse(text) as { ok?: boolean; error?: string };
      } catch {
        throw new Error(`Chat log webhook echo was not JSON (${echo.status}).`);
      }
      if (!echo.ok || parsed?.ok !== true) {
        throw new Error(
          parsed?.error || `Chat log webhook echo failed (${echo.status}).`,
        );
      }
      return "logged";
    }

    if (status >= 200 && status < 300) {
      return "logged";
    }

    throw new Error(`Chat log webhook returned ${status}.`);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[ai-chat-log] Webhook failed:", error);
    }
    return "failed";
  } finally {
    clearTimeout(timeout);
  }
}

export function queueChatQuestionLog(
  request: Request,
  messages: readonly { role: string; content?: string }[],
  entry: ChatQuestionLogEntry,
): void {
  void recordChatQuestion(request, messages, entry);
}

/** Awaitable variant for routes that want to report log status. */
export function recordChatQuestionLog(
  request: Request,
  messages: readonly { role: string; content?: string }[],
  entry: ChatQuestionLogEntry,
): Promise<"logged" | "disabled" | "failed"> {
  return recordChatQuestion(request, messages, entry);
}

export function inferChatInputType(intentId?: string): "chip" | "typed" {
  return intentId ? "chip" : "typed";
}

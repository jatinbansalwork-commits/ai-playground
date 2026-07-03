import {
  AI_CHAT_COOKIE_NAME,
  AI_CHAT_OPENAI_COOKIE_NAME,
  AI_CHAT_OPENAI_MAX_PER_USER,
  AI_CHAT_PROMPT_LIMIT,
} from "@/lib/ai-chat-config";

const CHAT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function readCookieCount(name: string): number {
  if (typeof document === "undefined") return 0;

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=(\\d+)`),
  );

  if (!match) return 0;

  const parsed = Number.parseInt(match[1], 10);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export function readClientChatPromptCount(): number {
  return readCookieCount(AI_CHAT_COOKIE_NAME);
}

export function getClientRemainingPrompts(): number {
  return Math.max(0, AI_CHAT_PROMPT_LIMIT - readClientChatPromptCount());
}

export function getClientRemainingOpenAi(): number {
  return Math.max(
    0,
    AI_CHAT_OPENAI_MAX_PER_USER - readCookieCount(AI_CHAT_OPENAI_COOKIE_NAME),
  );
}

/** Mirror server session counts — streaming responses cannot always set Set-Cookie. */
export function syncClientChatBudget(options: {
  remainingPrompts: number;
  remainingOpenAi: number;
}): void {
  if (typeof document === "undefined") return;

  const promptCount = Math.max(
    0,
    Math.min(AI_CHAT_PROMPT_LIMIT, AI_CHAT_PROMPT_LIMIT - options.remainingPrompts),
  );
  const openAiCount = Math.max(
    0,
    Math.min(
      AI_CHAT_OPENAI_MAX_PER_USER,
      AI_CHAT_OPENAI_MAX_PER_USER - options.remainingOpenAi,
    ),
  );

  const base = `path=/; max-age=${CHAT_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
  document.cookie = `${AI_CHAT_COOKIE_NAME}=${promptCount}; ${base}`;
  document.cookie = `${AI_CHAT_OPENAI_COOKIE_NAME}=${openAiCount}; ${base}`;
}

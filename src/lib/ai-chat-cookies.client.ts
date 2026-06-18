import {
  AI_CHAT_COOKIE_NAME,
  AI_CHAT_OPENAI_COOKIE_NAME,
  AI_CHAT_OPENAI_MAX_PER_USER,
  AI_CHAT_PROMPT_LIMIT,
} from "@/lib/ai-chat-config";

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

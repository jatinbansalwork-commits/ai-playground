import { cookies } from "next/headers";
import {
  AI_CHAT_COOKIE_NAME,
  AI_CHAT_OPENAI_COOKIE_NAME,
  AI_CHAT_OPENAI_MAX_PER_USER,
  AI_CHAT_PROMPT_LIMIT,
} from "@/lib/ai-chat-config";

export function readChatPromptCount(cookieValue: string | undefined): number {
  if (!cookieValue) return 0;
  const parsed = Number.parseInt(cookieValue, 10);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export async function getChatPromptCount(): Promise<number> {
  const cookieStore = await cookies();
  return readChatPromptCount(cookieStore.get(AI_CHAT_COOKIE_NAME)?.value);
}

export function getRemainingChatPrompts(count: number): number {
  return Math.max(0, AI_CHAT_PROMPT_LIMIT - count);
}

export async function incrementChatPromptCount(): Promise<number> {
  const cookieStore = await cookies();
  const nextCount =
    readChatPromptCount(cookieStore.get(AI_CHAT_COOKIE_NAME)?.value) + 1;

  cookieStore.set(AI_CHAT_COOKIE_NAME, String(nextCount), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  return getRemainingChatPrompts(nextCount);
}

export function readOpenAiCallCount(cookieValue: string | undefined): number {
  if (!cookieValue) return 0;
  const parsed = Number.parseInt(cookieValue, 10);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export async function getOpenAiCallCount(): Promise<number> {
  const cookieStore = await cookies();
  return readOpenAiCallCount(
    cookieStore.get(AI_CHAT_OPENAI_COOKIE_NAME)?.value,
  );
}

export function getRemainingOpenAiCalls(count: number): number {
  return Math.max(0, AI_CHAT_OPENAI_MAX_PER_USER - count);
}

export async function incrementOpenAiCallCount(): Promise<number> {
  const cookieStore = await cookies();
  const nextCount =
    readOpenAiCallCount(cookieStore.get(AI_CHAT_OPENAI_COOKIE_NAME)?.value) + 1;

  cookieStore.set(AI_CHAT_OPENAI_COOKIE_NAME, String(nextCount), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  return getRemainingOpenAiCalls(nextCount);
}

export async function getOpenAiBudgetState(): Promise<{
  openAiCount: number;
  remainingOpenAi: number;
  canUseOpenAi: boolean;
}> {
  const openAiCount = await getOpenAiCallCount();
  const remainingOpenAi = getRemainingOpenAiCalls(openAiCount);

  return {
    openAiCount,
    remainingOpenAi,
    canUseOpenAi: remainingOpenAi > 0,
  };
}

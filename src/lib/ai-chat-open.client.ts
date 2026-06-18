import { OPEN_AI_CHAT_EVENT } from "@/lib/ai-chat-config";
import type { AiChatOpenSource } from "@/lib/analytics";
import { trackAiChatOpen } from "@/lib/analytics";

export interface OpenAiChatDetail {
  message?: string;
  source?: AiChatOpenSource;
}

/** Strip leading status emoji / symbols from case study titles. */
export function buildCaseStudyChatPrompt(title: string): string {
  const clean = title.replace(/^[^\p{L}\p{N}]+/u, "").trim();
  return `What should I know about the ${clean} case study?`;
}

/** Opens JBAI from anywhere on the site — dispatches `open-ai-chat`. */
export function openAiChat(options: OpenAiChatDetail = {}): void {
  const message = options.message?.trim();
  const source = options.source ?? "cta";

  trackAiChatOpen(source);

  window.dispatchEvent(
    new CustomEvent<OpenAiChatDetail>(OPEN_AI_CHAT_EVENT, {
      detail: {
        ...(message ? { message } : {}),
        source,
      },
    }),
  );
}

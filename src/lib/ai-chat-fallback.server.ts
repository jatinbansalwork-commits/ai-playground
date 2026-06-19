import { AI_CHAT_OPENAI_LIMIT_MESSAGE } from "@/lib/ai-chat-config";
import {
  buildIntentReply,
  detectQuestionIntent,
} from "@/lib/ai-chat-question-intent";

interface FallbackReply {
  reply: string;
}

/** Curated replies when OpenAI is off, exhausted, or intent is answered without AI. */
export function generateFallbackReply(
  userMessage: string,
  pagePath?: string,
  showOpenAiNotice = false,
): FallbackReply {
  const intent = detectQuestionIntent(userMessage, pagePath);
  const curated = buildIntentReply(intent, userMessage, pagePath);

  let body =
    curated ??
    "How YOU doin'? I'm not great at the advice, but I *am* great at this portfolio — case studies, Craft, hiring, mentorship. Try asking about hiring, a case study, or how to contact JB.";

  if (showOpenAiNotice) {
    body = `${AI_CHAT_OPENAI_LIMIT_MESSAGE}\n\n${body}`;
  }

  return { reply: body.trim() };
}

export { detectQuestionIntent, buildIntentReply, shouldUseCuratedReply } from "@/lib/ai-chat-question-intent";

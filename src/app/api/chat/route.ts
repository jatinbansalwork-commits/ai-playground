import {
  AI_CHAT_LIMIT_MESSAGE,
  AI_CHAT_PROMPT_LIMIT,
  isOpenAiChatEnabled,
} from "@/lib/ai-chat-config";
import { generateFallbackReply } from "@/lib/ai-chat-fallback.server";
import {
  buildIntentReply,
  detectQuestionIntent,
  shouldUseCuratedReply,
} from "@/lib/ai-chat-question-intent";
import { buildFollowUpSuggestions } from "@/lib/ai-chat-follow-ups";
import {
  getAiChatIntent,
  getChipStaticReply,
  resolveAiChatIntentFromPrompt,
  type AiChatIntentId,
} from "@/lib/ai-chat-intents";
import {
  getChatPromptCount,
  getOpenAiBudgetState,
  getRemainingChatPrompts,
  incrementChatPromptCount,
  incrementOpenAiCallCount,
} from "@/lib/ai-chat-cookies.server";
import { streamOpenAiReply } from "@/lib/ai-chat-openai.server";
import { fetchChatReactionGif } from "@/lib/ai-chat-giphy.server";
import { sanitiseUsedGifIds } from "@/lib/ai-chat-gif-session";
import {
  createChatStreamResponse,
  streamPreparedReply,
  streamTextChunks,
} from "@/lib/ai-chat-stream.server";
import type {
  ChatApiRequest,
  ChatGif,
  ChatMessage,
  ChatReplySource,
  ChatStreamEvent,
} from "@/lib/ai-chat-types";

function isChipFirstTurn(messages: ChatMessage[]): boolean {
  if (messages.length !== 1 || messages[0]?.role !== "user") return false;
  return Boolean(resolveAiChatIntentFromPrompt(messages[0].content));
}

function resolveChipIntentId(
  messages: ChatMessage[],
  intentId?: string,
): AiChatIntentId | undefined {
  if (intentId && getAiChatIntent(intentId as AiChatIntentId)) {
    return intentId as AiChatIntentId;
  }

  const userText = messages[0]?.content;
  if (!userText) return undefined;

  return resolveAiChatIntentFromPrompt(userText)?.id;
}

function lastUserMessage(messages: ChatMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === "user") {
      return messages[index]?.content ?? "";
    }
  }
  return "";
}

async function attachReactionGif<T extends Record<string, unknown>>(
  result: T,
  gifPromise: Promise<ChatGif | null>,
): Promise<T & { gif?: ChatGif }> {
  const gif = await gifPromise;
  return gif ? { ...result, gif } : result;
}

async function streamOpenAiWithFallback(
  emit: (event: ChatStreamEvent) => void,
  messages: ChatMessage[],
  pagePath: string | undefined,
  remainingPromptsBefore: number,
  remainingOpenAiBefore: number,
  showOpenAiNotice: boolean,
  visitorIntent: ReturnType<typeof detectQuestionIntent>,
): Promise<{
  reply: string;
  source: ChatReplySource;
  remainingOpenAi: number;
}> {
  emit({
    type: "meta",
    remainingPrompts: remainingPromptsBefore,
    remainingOpenAi: remainingOpenAiBefore,
    source: "openai",
  });

  try {
    let reply = "";

    for await (const chunk of streamOpenAiReply(messages, pagePath, visitorIntent)) {
      reply += chunk;
      emit({ type: "delta", content: chunk });
    }

    const trimmed = reply.trim();
    if (!trimmed) {
      throw new Error("OpenAI returned an empty reply.");
    }

    const remainingOpenAi = await incrementOpenAiCallCount();
    return { reply: trimmed, source: "openai", remainingOpenAi };
  } catch {
    const fallback = generateFallbackReply(
      lastUserMessage(messages),
      pagePath,
      showOpenAiNotice,
    );

    for await (const chunk of streamTextChunks(fallback.reply)) {
      emit({ type: "delta", content: chunk });
    }

    return {
      reply: fallback.reply,
      source: "fallback",
      remainingOpenAi: remainingOpenAiBefore,
    };
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: ChatApiRequest;

  try {
    body = (await request.json()) as ChatApiRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required." }, { status: 400 });
  }

  const usedGifIds = sanitiseUsedGifIds(body.usedGifIds);
  const promptCount = await getChatPromptCount();
  if (promptCount >= AI_CHAT_PROMPT_LIMIT) {
    return createChatStreamResponse(async (emit) => {
      const openAiBudget = await getOpenAiBudgetState();
      const gifPromise = fetchChatReactionGif(
        lastUserMessage(messages),
        undefined,
        usedGifIds,
        AI_CHAT_LIMIT_MESSAGE,
      );
      const result = await streamPreparedReply(emit, {
        reply: AI_CHAT_LIMIT_MESSAGE,
        followUps: ["How do I contact JB?"],
        source: "fallback",
        remainingPrompts: 0,
        remainingOpenAi: openAiBudget.remainingOpenAi,
      });
      return attachReactionGif(result, gifPromise);
    });
  }

  const pagePath = body.pagePath?.trim() || undefined;
  const intentId = resolveChipIntentId(messages, body.intentId);
  const userMessage = lastUserMessage(messages);
  const remainingPromptsBefore = getRemainingChatPrompts(promptCount);

  return createChatStreamResponse(async (emit) => {
    const openAiBudget = await getOpenAiBudgetState();
    const showOpenAiNotice = !openAiBudget.canUseOpenAi;

    if (isChipFirstTurn(messages) || (body.intentId && messages.length === 1)) {
      const chipIntentId = resolveChipIntentId(messages, body.intentId);
      const staticReply = chipIntentId
        ? getChipStaticReply(chipIntentId)
        : undefined;

      if (staticReply) {
        const remainingPrompts = await incrementChatPromptCount();
        const followUps = buildFollowUpSuggestions({
          lastUserMessage: userMessage,
          pagePath,
          intentId: chipIntentId,
          source: "static",
        });

        const result = await streamPreparedReply(emit, {
          reply: staticReply,
          followUps,
          source: "static",
          remainingPrompts,
          remainingOpenAi: openAiBudget.remainingOpenAi,
        });
        return attachReactionGif(
          result,
          fetchChatReactionGif(
            userMessage,
            chipIntentId,
            usedGifIds,
            staticReply,
          ),
        );
      }
    }

    const visitorIntent = detectQuestionIntent(userMessage, pagePath);
    const curatedReply = buildIntentReply(visitorIntent, userMessage, pagePath);

    if (curatedReply && shouldUseCuratedReply(visitorIntent)) {
      const remainingPrompts = await incrementChatPromptCount();
      const followUps = buildFollowUpSuggestions({
        lastUserMessage: userMessage,
        pagePath,
        intentId,
        source: "fallback",
      });

      const result = await streamPreparedReply(emit, {
        reply: curatedReply,
        followUps,
        source: "fallback",
        remainingPrompts,
        remainingOpenAi: openAiBudget.remainingOpenAi,
      });

      return attachReactionGif(
        result,
        fetchChatReactionGif(userMessage, intentId, usedGifIds, curatedReply),
      );
    }

    const canUseOpenAi =
      openAiBudget.canUseOpenAi &&
      isOpenAiChatEnabled() &&
      Boolean(process.env.OPENAI_API_KEY);

    let reply = "";
    let source: ChatReplySource = "fallback";
    let remainingOpenAi = openAiBudget.remainingOpenAi;

    if (canUseOpenAi) {
      const streamed = await streamOpenAiWithFallback(
        emit,
        messages,
        pagePath,
        remainingPromptsBefore,
        openAiBudget.remainingOpenAi,
        showOpenAiNotice,
        visitorIntent,
      );
      reply = streamed.reply;
      source = streamed.source;
      remainingOpenAi = streamed.remainingOpenAi;
    } else {
      const fallback = generateFallbackReply(
        userMessage,
        pagePath,
        showOpenAiNotice,
      );
      reply = fallback.reply;
      source = "fallback";

      await streamPreparedReply(emit, {
        reply,
        followUps: [],
        source,
        remainingPrompts: remainingPromptsBefore,
        remainingOpenAi,
      });
    }

    const remainingPrompts = await incrementChatPromptCount();
    const followUps = buildFollowUpSuggestions({
      lastUserMessage: userMessage,
      pagePath,
      intentId,
      source,
    });

    return attachReactionGif(
      {
        reply,
        followUps,
        source,
        remainingPrompts,
        remainingOpenAi,
      },
      fetchChatReactionGif(userMessage, intentId, usedGifIds, reply),
    );
  });
}

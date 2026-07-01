"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AiChatFab } from "@/components/ai-chat/ai-chat-fab";
import { AiChatEmptyState } from "@/components/ai-chat/ai-chat-empty-state";
import { AiChatMessageContent } from "@/components/ai-chat/ai-chat-message-content";
import { AiChatMessageGif } from "@/components/ai-chat/ai-chat-message-gif";
import { AiChatSuggestionDock } from "@/components/ai-chat/ai-chat-suggestion-dock";
import { AiChatThinkingLoader } from "@/components/ai-chat/ai-chat-thinking-loader";
import {
  AI_CHAT_GREETING,
  AI_CHAT_INPUT_PLACEHOLDER,
  AI_CHAT_LIMIT_MESSAGE,
  AI_CHAT_MIN_THINKING_MS,
  AI_CHAT_STREAM_CHUNK_MS,
  AI_CHAT_NAME,
  AI_CHAT_REPLY_PLACEHOLDER,
  AI_CHAT_TAGLINE,
  AI_CHAT_PROMPT_LIMIT,
  OPEN_AI_CHAT_EVENT,
} from "@/lib/ai-chat-config";
import {
  getClientRemainingOpenAi,
  getClientRemainingPrompts,
} from "@/lib/ai-chat-cookies.client";
import { buildFollowUpSuggestions } from "@/lib/ai-chat-follow-ups";
import type { OpenAiChatDetail } from "@/lib/ai-chat-open.client";
import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import { AI_CHAT_INTENTS } from "@/lib/ai-chat-intents";
import {
  buildVisibleSuggestionChips,
  shouldUseIntentRouting,
  type AiChatSuggestionChip,
} from "@/lib/ai-chat-suggestions";
import { collectUsedGifIds } from "@/lib/ai-chat-gif-session";
import {
  chunkTextForStream,
  consumeChatStream,
  replayChatDeltas,
} from "@/lib/ai-chat-stream.client";
import type { ChatGif, ChatMessage } from "@/lib/ai-chat-types";
import { FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";
import {
  trackAiChatChipClick,
  trackAiChatClose,
  trackAiChatError,
  trackAiChatGif,
  trackAiChatIntent,
  trackAiChatMessage,
  trackAiChatOpen,
  trackAiChatReplySource,
  trackAiChatSessionMessages,
  trackAiChatWireframeToggle,
} from "@/lib/analytics";
import {
  AI_CHAT_FAB_MOBILE_INDEX_BOTTOM,
  INDEX_FLOATING_BOTTOM,
  ROUTES,
} from "@/lib/constants";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useAiChatSounds } from "@/hooks/use-ai-chat-sounds";
import { useWireframe } from "@/context/wireframe-context";
import {
  buildWireframeModeReply,
  isWireframeModeCommand,
} from "@/lib/ai-chat-commands.client";
import { detectQuestionIntent } from "@/lib/ai-chat-question-intent";
import { queueClientChatLog } from "@/lib/ai-chat-log.client";
import { springSnappy } from "@/lib/spring";

type ChatView = "ball" | "chat";

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function waitForMinimumThinking(
  startedAt: number,
  minimumMs: number,
): Promise<void> {
  if (minimumMs <= 0) return Promise.resolve();

  const elapsed = Date.now() - startedAt;
  const remaining = minimumMs - elapsed;
  if (remaining <= 0) return Promise.resolve();

  return new Promise((resolve) => {
    window.setTimeout(resolve, remaining);
  });
}

export function AiChatBall() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { playOpenPop, playSendWhoosh } = useAiChatSounds();
  const { wireframe, setWireframe } = useWireframe();
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const inputLabelId = useId();
  const [view, setView] = useState<ChatView>("ball");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [remainingPrompts, setRemainingPrompts] = useState(AI_CHAT_PROMPT_LIMIT);
  const [remainingOpenAi, setRemainingOpenAi] = useState(() =>
    getClientRemainingOpenAi(),
  );
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const closeChat = useCallback(() => {
    const userMessages = messages.filter((message) => message.role === "user").length;
    const assistantMessages = messages.filter(
      (message) => message.role === "assistant",
    ).length;
    const gifsShown = messages.filter((message) => message.gif?.url).length;

    trackAiChatSessionMessages({
      user_messages: userMessages,
      assistant_messages: assistantMessages,
      total_messages: messages.length,
      gifs_shown: gifsShown,
    });
    trackAiChatClose(messages.length);
    setView("ball");
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, [messages]);

  const ensureChatOpen = useCallback(() => {
    setView((current) => {
      if (current === "ball") {
        void playOpenPop();
      }
      return "chat";
    });
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [playOpenPop]);

  const refreshRemaining = useCallback(() => {
    setRemainingPrompts(getClientRemainingPrompts());
    setRemainingOpenAi(getClientRemainingOpenAi());
  }, []);

  useEffect(() => {
    refreshRemaining();
  }, [refreshRemaining]);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, isLoading, isStreaming, reducedMotion]);

  useEffect(() => {
    if (view !== "chat") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChat();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, closeChat]);

  useEffect(() => {
    if (!isMobile || view !== "chat") {
      setViewportHeight(null);
      return;
    }

    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateHeight = () => setViewportHeight(Math.round(viewport.height));
    updateHeight();
    viewport.addEventListener("resize", updateHeight);
    viewport.addEventListener("scroll", updateHeight);

    return () => {
      viewport.removeEventListener("resize", updateHeight);
      viewport.removeEventListener("scroll", updateHeight);
    };
  }, [isMobile, view]);

  useEffect(() => {
    if (!isMobile || view !== "chat") return;

    const { body } = document;
    const { documentElement } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      documentElement.style.overflow = previous.htmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, [isMobile, view]);

  const sendMessage = useCallback(
    async (rawMessage: string, intentId?: AiChatIntentId) => {
      const content = rawMessage.trim();
      if (!content || isLoading || isStreaming) return;

      if (isWireframeModeCommand(content)) {
        const nextEnabled = !wireframe;
        setWireframe(nextEnabled);
        trackAiChatWireframeToggle(nextEnabled);
        trackAiChatIntent({
          intent_id: "wireframe",
          confidence: "high",
          input: "typed",
          goal: "Explain the wireframe easter egg — toggle via chat command or index cross.",
        });

        const reply = buildWireframeModeReply(
          nextEnabled,
          pathname === "/" || pathname === "",
        );

        queueClientChatLog({
          question: content,
          reply,
          pagePath: pathname,
          questionIntentId: "wireframe",
          replySource: "static",
          turn: messages.filter((message) => message.role === "user").length + 1,
        });

        ensureChatOpen();
        setFollowUps([]);
        setDraft("");
        setMessages((current) => [
          ...current,
          { role: "user", content },
          { role: "assistant", content: reply },
        ]);
        return;
      }

      const routedIntentId =
        intentId && shouldUseIntentRouting(messages, intentId)
          ? intentId
          : undefined;

      const visitorIntent = detectQuestionIntent(content, pathname);
      trackAiChatIntent({
        intent_id: visitorIntent.id,
        confidence: visitorIntent.confidence,
        input: routedIntentId ? "chip" : "typed",
        goal: visitorIntent.goal,
      });

      if (remainingPrompts <= 0) {
        ensureChatOpen();
        setFollowUps([]);
        const last = messages[messages.length - 1];
        const alreadyShowingLimit =
          last?.role === "assistant" && last.content === AI_CHAT_LIMIT_MESSAGE;

        if (!alreadyShowingLimit) {
          queueClientChatLog({
            question: content,
            reply: AI_CHAT_LIMIT_MESSAGE,
            pagePath: pathname,
            intentId: routedIntentId,
            questionIntentId: visitorIntent.id,
            replySource: "fallback",
            turn: messages.filter((message) => message.role === "user").length + 1,
          });

          setMessages((current) => [
            ...current,
            { role: "assistant", content: AI_CHAT_LIMIT_MESSAGE },
          ]);
        }
        return;
      }

      const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
      const startedAt = Date.now();

      void playSendWhoosh();
      setMessages(nextMessages);
      setDraft("");
      setFollowUps([]);
      ensureChatOpen();
      setIsLoading(true);
      setIsStreaming(false);

      if (intentId) {
        trackAiChatChipClick(intentId);
      }
      trackAiChatMessage(routedIntentId ? "chip" : "typed");

      let receivedDelta = false;
      let usesTypingReplay = false;
      const bufferedDeltas: string[] = [];
      const minThinkingMs = reducedMotion ? 0 : AI_CHAT_MIN_THINKING_MS;
      const chunkDelayMs = reducedMotion ? 0 : AI_CHAT_STREAM_CHUNK_MS;
      const thinkingPromise = waitForMinimumThinking(startedAt, minThinkingMs);

      const appendAssistantContent = (content: string) => {
        setMessages((current) => {
          const last = current[current.length - 1];
          if (last?.role === "assistant") {
            const copy = [...current];
            copy[copy.length - 1] = { ...last, content };
            return copy;
          }
          return [...current, { role: "assistant", content }];
        });
      };

      const attachGifToLastAssistant = (gif?: ChatGif) => {
        if (!gif?.url) return;
        trackAiChatGif(gif.giphyId);
        setMessages((current) => {
          const last = current[current.length - 1];
          if (last?.role !== "assistant") return current;
          const copy = [...current];
          copy[copy.length - 1] = { ...last, gif };
          return copy;
        });
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages,
            pagePath: pathname,
            usedGifIds: collectUsedGifIds(nextMessages),
            ...(routedIntentId ? { intentId: routedIntentId } : {}),
          }),
        });

        if (!response.ok) {
          throw new Error("Chat request failed.");
        }

        const result = await consumeChatStream(response, {
          onMeta: (event) => {
            usesTypingReplay =
              event.source === "static" || event.source === "fallback";
            setRemainingPrompts(event.remainingPrompts);
            setRemainingOpenAi(event.remainingOpenAi);
          },
          onDelta: async (delta) => {
            if (usesTypingReplay) {
              bufferedDeltas.push(delta);
              return;
            }

            if (!receivedDelta) {
              await thinkingPromise;
              receivedDelta = true;
              setIsLoading(false);
              setIsStreaming(true);
              appendAssistantContent(delta);
              return;
            }

            setMessages((current) => {
              const copy = [...current];
              const last = copy[copy.length - 1];
              if (last?.role === "assistant") {
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: last.content + delta,
                };
              }
              return copy;
            });
          },
        });

        if (usesTypingReplay && bufferedDeltas.length > 0) {
          await thinkingPromise;
          receivedDelta = true;
          setIsLoading(false);
          setIsStreaming(true);
          await replayChatDeltas(bufferedDeltas, {
            chunkDelayMs,
            onChunk: appendAssistantContent,
          });
        } else if (!receivedDelta && result.reply) {
          await thinkingPromise;
          receivedDelta = true;
          setIsLoading(false);
          setIsStreaming(true);
          await replayChatDeltas(
            bufferedDeltas.length > 0
              ? bufferedDeltas
              : chunkTextForStream(result.reply),
            {
              chunkDelayMs,
              onChunk: appendAssistantContent,
            },
          );
        }

        attachGifToLastAssistant(result.gif);

        setRemainingPrompts(result.remainingPrompts);
        setRemainingOpenAi(result.remainingOpenAi);
        setFollowUps(result.followUps);
        trackAiChatReplySource(result.source);
        refreshRemaining();
      } catch {
        trackAiChatError("network");
        await waitForMinimumThinking(startedAt, minThinkingMs);
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: "Could this *be* any more broken? Something went wrong — give it another shot?",
          },
        ]);
        setFollowUps(
          buildFollowUpSuggestions({
            lastUserMessage: content,
            pagePath: pathname,
            source: "fallback",
          }),
        );
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [
      ensureChatOpen,
      isLoading,
      isStreaming,
      messages,
      pathname,
      playSendWhoosh,
      reducedMotion,
      refreshRemaining,
      remainingPrompts,
      setWireframe,
      wireframe,
    ],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenAiChatDetail>).detail;
      const message = detail?.message?.trim();

      if (message) {
        void sendMessage(message);
        return;
      }

      ensureChatOpen();
    };

    window.addEventListener(OPEN_AI_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AI_CHAT_EVENT, onOpen);
  }, [ensureChatOpen, sendMessage]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  const suggestionChips = useMemo(
    () => buildVisibleSuggestionChips({ messages, followUps }),
    [messages, followUps],
  );

  const starterChips = useMemo(
    () =>
      AI_CHAT_INTENTS.map((intent) => ({
        id: `intent-${intent.id}`,
        label: intent.prompt,
        prompt: intent.prompt,
        intentId: intent.id,
      })),
    [],
  );

  const handleSuggestionSelect = useCallback(
    (chip: AiChatSuggestionChip) => {
      void sendMessage(chip.prompt, chip.intentId);
    },
    [sendMessage],
  );

  const suggestionsDisabled =
    isLoading || isStreaming || remainingPrompts <= 0;

  const panelStyle =
    isMobile && viewportHeight
      ? ({
          height: `${viewportHeight}px`,
          transformOrigin: "bottom center",
        } as React.CSSProperties)
      : ({ transformOrigin: "bottom right" } as React.CSSProperties);

  const panelTransition = reducedMotion ? { duration: 0 } : springSnappy;

  const messageMotion = reducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: springSnappy,
      };

  const fabBottomClass =
    isMobile && pathname === ROUTES.home
      ? AI_CHAT_FAB_MOBILE_INDEX_BOTTOM
      : INDEX_FLOATING_BOTTOM;

  return (
    <div
      className={[
        "fixed z-[70] flex flex-col gap-3",
        isMobile
          ? view === "chat"
            ? "inset-0 items-stretch justify-end"
            : `${fabBottomClass} right-4 items-end`
          : `${INDEX_FLOATING_BOTTOM} right-8 items-end`,
      ].join(" ")}
    >
      <AnimatePresence>
        {isMobile && view === "chat" ? (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={panelTransition}
            className="absolute inset-0 bg-background/96 backdrop-blur-md"
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {view === "chat" ? (
          <motion.section
            key="panel"
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial={
              reducedMotion
                ? false
                : isMobile
                  ? { opacity: 0, y: 24, scale: 0.98 }
                  : { opacity: 0, y: 14, scale: 0.94 }
            }
            animate={
              reducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : isMobile
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : isMobile
                  ? { opacity: 0, y: 18, scale: 0.98 }
                  : { opacity: 0, y: 10, scale: 0.96 }
            }
            transition={panelTransition}
            style={panelStyle}
            onWheel={(event) => {
              event.stopPropagation();
            }}
            className={[
              `relative flex flex-col overflow-hidden text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${EXPERIMENTS_CARD.shell}`,
              isMobile
                ? "h-full w-full rounded-none border-x-0 border-t border-b-0"
                : "h-[min(640px,78vh)] w-[min(420px,calc(100vw-2rem))]",
            ].join(" ")}
          >
            <header className="flex items-start justify-between border-b border-white/[0.06] px-5 py-4">
              <div>
                <h2 id={titleId} className="text-sm font-medium text-white">
                  {AI_CHAT_NAME}
                </h2>
                <p id={descriptionId} className="mt-0.5 text-xs text-neutral-400">
                  {AI_CHAT_TAGLINE}
                </p>
                <p className="sr-only" aria-live="polite">
                  {remainingPrompts <= 0
                    ? "Chat limit reached."
                    : `${remainingPrompts} messages remaining in this session. ${remainingOpenAi} AI-powered replies remaining.`}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={closeChat}
                className={`${TARGET_HIT_AREA} flex shrink-0 items-center justify-center rounded-full text-lg leading-none text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white ${FOCUS_RING}`}
              >
                <span aria-hidden>×</span>
              </button>
            </header>

            <div
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-busy={isLoading || isStreaming}
              aria-label="Chat messages"
              className="ai-chat-log flex-1 overflow-y-auto px-5 py-6"
            >
              {messages.length === 0 ? (
                <AiChatEmptyState
                  greeting={AI_CHAT_GREETING}
                  chips={starterChips}
                  disabled={suggestionsDisabled}
                  reducedMotion={reducedMotion}
                  onSelect={handleSuggestionSelect}
                />
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => {
                    const querySeed =
                      [...messages.slice(0, index)]
                        .reverse()
                        .find((entry) => entry.role === "user")?.content ?? "";

                    return (
                    <motion.div
                      key={`${message.role}-${index}`}
                      {...messageMotion}
                      className={[
                        "max-w-[95%] text-sm",
                        message.role === "user"
                          ? "ml-auto rounded-2xl bg-[#6B36FF] px-4 py-3 text-white ring-1 ring-inset ring-white/10"
                          : `mr-auto px-4 py-3.5 ${EXPERIMENTS_CARD.shell}`,
                      ].join(" ")}
                    >
                      {message.role === "assistant" ? (
                        <>
                          <AiChatMessageContent content={message.content} />
                          {message.gif ? (
                            <AiChatMessageGif
                              gif={message.gif}
                              querySeed={querySeed}
                              usedGifIds={collectUsedGifIds(messages)}
                            />
                          ) : null}
                        </>
                      ) : (
                        <p className="leading-[1.65]">{message.content}</p>
                      )}
                    </motion.div>
                    );
                  })}

                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <AiChatThinkingLoader
                        key="thinking"
                        reducedMotion={reducedMotion}
                      />
                    ) : null}
                  </AnimatePresence>

                  <div ref={endRef} />
                </div>
              )}
            </div>

            {messages.length > 0 ? (
              <AiChatSuggestionDock
                chips={suggestionChips}
                disabled={suggestionsDisabled}
                reducedMotion={reducedMotion}
                onSelect={handleSuggestionSelect}
              />
            ) : null}

            <form
              onSubmit={onSubmit}
              className="border-t border-white/[0.06] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3"
              aria-label="Send a message"
            >
              <label htmlFor={inputLabelId} className="sr-only">
                {messages.length === 0
                  ? AI_CHAT_INPUT_PLACEHOLDER
                  : AI_CHAT_REPLY_PLACEHOLDER}
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 ring-1 ring-inset ring-white/[0.08] ${EXPERIMENTS_CARD.cta}`}
              >
                <input
                  ref={inputRef}
                  id={inputLabelId}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={
                    remainingPrompts <= 0
                      ? "Chat limit reached"
                      : messages.length === 0
                        ? AI_CHAT_INPUT_PLACEHOLDER
                        : AI_CHAT_REPLY_PLACEHOLDER
                  }
                  disabled={isLoading || isStreaming || remainingPrompts <= 0}
                  autoComplete="off"
                  enterKeyHint="send"
                  className={`min-h-11 flex-1 bg-transparent text-base text-white outline-none placeholder:text-neutral-500 ${FOCUS_RING}`}
                />
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    isStreaming ||
                    remainingPrompts <= 0 ||
                    !draft.trim()
                  }
                  aria-label="Send message"
                  className={`${TARGET_HIT_AREA} flex shrink-0 items-center justify-center rounded-full bg-[#6B36FF] text-base text-white ring-1 ring-inset ring-white/10 transition-opacity disabled:cursor-not-allowed disabled:opacity-30 ${FOCUS_RING}`}
                >
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {view !== "chat" ? (
        <AiChatFab
          ref={triggerRef}
          dialogId={dialogId}
          onOpen={() => {
            trackAiChatOpen("fab");
            ensureChatOpen();
          }}
        />
      ) : null}
    </div>
  );
}

"use client";

import { forwardRef, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { AiChatAvatar } from "@/components/ai-chat/ai-chat-avatar";
import {
  AI_CHAT_FIRST_VISIT_BUBBLE_MS,
  AI_CHAT_FIRST_VISIT_MESSAGE,
  AI_CHAT_HINT,
  AI_CHAT_HOVER_MESSAGE,
} from "@/lib/ai-chat-config";
import { FOCUS_RING } from "@/lib/a11y";
import { AI_CHAT_BALL_SIZE_PX } from "@/lib/constants";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springBentoHover } from "@/lib/spring";

const FAB_FIRST_VISIT_KEY = "ai_chat_fab_first_visit_seen";
const FAB_SHOW_DELAY_MS = 900;

interface AiChatFabProps {
  dialogId: string;
  onOpen: () => void;
}

export const AiChatFab = forwardRef<HTMLButtonElement, AiChatFabProps>(
  function AiChatFab({ dialogId, onOpen }, ref) {
    const reducedMotion = useReducedMotion();
    const tooltipId = useId();
    const [showProactiveBubble, setShowProactiveBubble] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(FAB_FIRST_VISIT_KEY)) return;

      const showTimer = window.setTimeout(
        () => setShowProactiveBubble(true),
        FAB_SHOW_DELAY_MS,
      );
      const hideTimer = window.setTimeout(() => {
        setShowProactiveBubble(false);
        window.localStorage.setItem(FAB_FIRST_VISIT_KEY, "1");
      }, FAB_SHOW_DELAY_MS + AI_CHAT_FIRST_VISIT_BUBBLE_MS);

      return () => {
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
      };
    }, []);

    const dismissProactiveBubble = () => {
      setShowProactiveBubble(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(FAB_FIRST_VISIT_KEY, "1");
      }
    };

    const tooltipMessage = showProactiveBubble
      ? AI_CHAT_FIRST_VISIT_MESSAGE
      : AI_CHAT_HOVER_MESSAGE;

    return (
      <div className="group relative flex items-center gap-3">
        <span
          className={`hidden rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium tracking-normal text-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:inline-flex ${EXPERIMENTS_CARD.shell}`}
        >
          {AI_CHAT_HINT}
        </span>

        <div className="relative">
          <div
            id={tooltipId}
            role="tooltip"
            className={[
              "pointer-events-none absolute bottom-[calc(100%+12px)] right-0 z-20 w-max max-w-[min(18rem,calc(100vw-2rem))] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
              showProactiveBubble
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
            ].join(" ")}
          >
            <p
              className={`rounded-2xl px-4 py-2.5 text-left text-[13px] leading-snug text-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${EXPERIMENTS_CARD.shell}`}
            >
              {tooltipMessage}
            </p>
            <span
              aria-hidden
              className="absolute -bottom-1.5 right-5 size-3 rotate-45 border border-white/[0.04] bg-[#262626]"
            />
          </div>

          {!reducedMotion ? (
            <>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#6B36FF]/70"
                animate={{
                  scale: showProactiveBubble ? [1, 1.28, 1] : [1, 1.22, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: showProactiveBubble ? 1.8 : 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-[#6B36FF]/20 blur-md"
                animate={{ opacity: showProactiveBubble ? [0.45, 0.7, 0.45] : [0.35, 0.55, 0.35] }}
                transition={{
                  duration: showProactiveBubble ? 1.8 : 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          ) : (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[#6B36FF]/50"
            />
          )}

          <motion.div
            animate={
              showProactiveBubble && !reducedMotion
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={
              showProactiveBubble && !reducedMotion
                ? { duration: 0.65, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
            }
          >
            <motion.button
              ref={ref}
              type="button"
              aria-label={AI_CHAT_HINT}
              aria-describedby={tooltipId}
              aria-expanded={false}
              aria-controls={dialogId}
              whileHover={reducedMotion ? undefined : { scale: 1.06 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
              transition={springBentoHover}
              onClick={() => {
                dismissProactiveBubble();
                onOpen();
              }}
              className={`relative overflow-hidden rounded-full border-2 border-[#6B36FF]/45 bg-[#262626] shadow-[0_0_0_4px_rgba(107,54,255,0.14),0_16px_48px_rgba(0,0,0,0.45)] ${FOCUS_RING}`}
              style={{
                width: AI_CHAT_BALL_SIZE_PX,
                height: AI_CHAT_BALL_SIZE_PX,
              }}
            >
              <AiChatAvatar size={AI_CHAT_BALL_SIZE_PX} className="relative z-10" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  },
);

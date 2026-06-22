"use client";

import Image from "next/image";
import {
  AI_CHAT_AVATAR_SRC,
  AI_CHAT_HINT,
} from "@/lib/ai-chat-config";
import { openAiChat } from "@/lib/ai-chat-open.client";
import type { AiChatOpenSource } from "@/lib/analytics";
import { FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";

type AskJbChatButtonVariant = "hero" | "footer" | "banner" | "pill";

interface AskJbChatButtonProps {
  variant?: AskJbChatButtonVariant;
  source: AiChatOpenSource;
  message?: string;
  label?: string;
  className?: string;
}

export function AskJbChatButton({
  variant = "pill",
  source,
  message,
  label = AI_CHAT_HINT,
  className = "",
}: AskJbChatButtonProps) {
  const handleClick = () => {
    openAiChat({ source, message });
  };

  if (variant === "banner") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] p-3 text-left transition-colors hover:border-white/[0.12] hover:bg-white/[0.03] ${EXPERIMENTS_CARD.shell} ${FOCUS_RING} ${className}`.trim()}
      >
        <span className="size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-white/[0.08]">
          <Image
            src={AI_CHAT_AVATAR_SRC}
            alt=""
            aria-hidden
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-white">{label}</span>
          <span className="mt-0.5 block text-xs leading-snug text-neutral-400">
            Want a behind-the-scenes fun fact? Just ask.
          </span>
        </span>
        <span
          aria-hidden
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-100 ${EXPERIMENTS_CARD.cta}`}
        >
          Open chat
        </span>
      </button>
    );
  }

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#6B36FF]/35 bg-[#6B36FF]/10 px-4 py-2 text-sm font-medium text-[#e8dcff] transition-colors hover:border-[#6B36FF]/55 hover:bg-[#6B36FF]/20 hover:text-white ${FOCUS_RING} ${className}`.trim()}
      >
        <span className="size-6 shrink-0 overflow-hidden rounded-full">
          <Image
            src={AI_CHAT_AVATAR_SRC}
            alt=""
            aria-hidden
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </span>
        {label}
      </button>
    );
  }

  if (variant === "footer") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${TARGET_HIT_AREA} h-11 w-full rounded-lg border border-[#6B36FF]/40 bg-[#6B36FF]/15 px-6 font-sans text-sm font-medium text-[#D4BBFF] transition-colors hover:border-[#6B36FF]/60 hover:bg-[#6B36FF]/25 hover:text-white touch-manipulation sm:w-auto ${FOCUS_RING} ${className}`.trim()}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-100 transition-colors ${EXPERIMENTS_CARD.cta} ${FOCUS_RING} ${className}`.trim()}
    >
      <span className="size-5 shrink-0 overflow-hidden rounded-full">
        <Image
          src={AI_CHAT_AVATAR_SRC}
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="h-full w-full object-cover"
        />
      </span>
      {label}
    </button>
  );
}

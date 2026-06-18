"use client";

import { motion } from "framer-motion";
import type { AiChatSuggestionChip } from "@/lib/ai-chat-suggestions";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { FOCUS_RING } from "@/lib/a11y";
import { springSnappy } from "@/lib/spring";

interface AiChatSuggestionDockProps {
  chips: AiChatSuggestionChip[];
  disabled: boolean;
  reducedMotion: boolean;
  onSelect: (chip: AiChatSuggestionChip) => void;
}

export function AiChatSuggestionDock({
  chips,
  disabled,
  reducedMotion,
  onSelect,
}: AiChatSuggestionDockProps) {
  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSnappy}
      className="shrink-0 border-t border-white/[0.06] bg-[#222222]/80 px-4 py-3 backdrop-blur-sm"
    >
      <p
        id="ai-chat-suggestions-label"
        className="mb-2 text-[11px] font-medium tracking-wide text-neutral-500 uppercase"
      >
        Suggestions
      </p>
      <ul
        aria-labelledby="ai-chat-suggestions-label"
        className="flex list-none gap-2 overflow-x-auto overscroll-x-contain p-0 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((chip) => (
          <li key={chip.id} className="shrink-0">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(chip)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-left text-xs font-medium tracking-normal text-neutral-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${EXPERIMENTS_CARD.cta} ${FOCUS_RING}`}
            >
              {chip.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

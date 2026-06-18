"use client";

import { motion } from "framer-motion";
import { AiChatAvatar } from "@/components/ai-chat/ai-chat-avatar";
import type { AiChatSuggestionChip } from "@/lib/ai-chat-suggestions";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { FOCUS_RING } from "@/lib/a11y";
import { springSnappy } from "@/lib/spring";

interface AiChatEmptyStateProps {
  greeting: string;
  chips: AiChatSuggestionChip[];
  disabled: boolean;
  reducedMotion: boolean;
  onSelect: (chip: AiChatSuggestionChip) => void;
}

export function AiChatEmptyState({
  greeting,
  chips,
  disabled,
  reducedMotion,
  onSelect,
}: AiChatEmptyStateProps) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSnappy}
      className="flex flex-col items-start text-left"
    >
      <div className="mb-5 size-16 shrink-0 overflow-hidden rounded-full">
        <AiChatAvatar size={64} />
      </div>

      <h3 className="max-w-[18rem] text-[22px] font-medium leading-tight tracking-tight text-white">
        {greeting}
      </h3>

      <ul className="mt-6 flex w-full list-none flex-col gap-2 p-0">
        {chips.map((chip) => (
          <li key={chip.id} className="w-full">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(chip)}
              className={`w-full rounded-2xl px-4 py-3.5 text-left text-sm font-medium tracking-normal text-neutral-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${EXPERIMENTS_CARD.cta} ${FOCUS_RING}`}
            >
              {chip.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

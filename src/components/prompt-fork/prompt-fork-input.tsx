"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FOCUS_RING } from "@/lib/a11y";
import { PROMPT_FORK_HINT } from "@/components/prompt-fork/prompt-fork-config";
import { ForkBranchIcon } from "@/components/prompt-fork/prompt-fork-icons";

const MAX_LINES = 4;
const LINE_HEIGHT_PX = 24;

interface PromptForkInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  layoutId?: string;
  compact?: boolean;
  readOnly?: boolean;
}

export function PromptForkInput({
  value,
  onChange,
  onSubmit,
  layoutId = "prompt-fork-input",
  compact = false,
  readOnly = false,
}: PromptForkInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const maxHeight = LINE_HEIGHT_PX * MAX_LINES;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className={compact ? "w-full" : "flex w-full max-w-2xl flex-col items-center"}>
      <motion.div
        layoutId={layoutId}
        className={`relative flex w-full items-end gap-2 rounded-2xl bg-[#262626] p-2 ring-1 ring-white/[0.06] transition-shadow focus-within:ring-2 focus-within:ring-[#6b36ff]/40 ${
          compact ? "" : "shadow-lg shadow-black/20"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          rows={1}
          placeholder="Ask anything across three models…"
          aria-label="Prompt input"
          className="min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 text-white placeholder:text-neutral-500 focus:outline-none"
          style={{ maxHeight: LINE_HEIGHT_PX * MAX_LINES }}
        />
        {!readOnly && (
          <button
            type="button"
            onClick={onSubmit}
            aria-label="Fork prompt across three models"
            className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#6b36ff] px-3 text-sm font-medium text-white transition-colors hover:bg-[#7d4dff] ${FOCUS_RING}`}
          >
            <ForkBranchIcon className="size-4" />
            <span className="hidden sm:inline">Fork Prompt</span>
          </button>
        )}
      </motion.div>
      {!compact && (
        <p className="mt-3 text-center text-xs text-neutral-500">{PROMPT_FORK_HINT}</p>
      )}
    </div>
  );
}

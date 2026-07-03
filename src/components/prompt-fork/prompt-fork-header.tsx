"use client";

import { FOCUS_RING } from "@/lib/a11y";
import { PromptForkInput } from "@/components/prompt-fork/prompt-fork-input";

interface PromptForkHeaderProps {
  prompt: string;
  highlightVariance: boolean;
  onToggleVariance: () => void;
  onReset: () => void;
}

export function PromptForkHeader({
  prompt,
  highlightVariance,
  onToggleVariance,
  onReset,
}: PromptForkHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="min-w-0 flex-1">
          <PromptForkInput
            value={prompt}
            onChange={() => {}}
            onSubmit={() => {}}
            compact
            readOnly
          />
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-300">
            <button
              type="button"
              role="switch"
              aria-checked={highlightVariance}
              onClick={onToggleVariance}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                highlightVariance ? "bg-[#6b36ff]" : "bg-neutral-600"
              } ${FOCUS_RING}`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  highlightVariance ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            Highlight Variance
          </label>
          <button
            type="button"
            onClick={onReset}
            className={`rounded-lg px-3 py-2 text-xs font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white ${FOCUS_RING}`}
          >
            New prompt
          </button>
        </div>
      </div>
    </header>
  );
}

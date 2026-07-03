"use client";

import { TimerBadge } from "@/components/prompt-fork/prompt-fork-badges";

interface PromptForkSkeletonProps {
  modelName: string;
  timerLabel: string;
}

export function PromptForkSkeleton({
  modelName,
  timerLabel,
}: PromptForkSkeletonProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#262626] p-4 ring-1 ring-inset ring-white/[0.04]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-white">{modelName}</span>
        <TimerBadge label={timerLabel} />
      </div>
      <div className="flex flex-1 flex-col gap-3" aria-hidden>
        <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-700" />
        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-700" />
      </div>
      <span className="sr-only">Loading response from {modelName}</span>
    </div>
  );
}

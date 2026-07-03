"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FOCUS_RING } from "@/lib/a11y";
import {
  blocksToPlainText,
  PROMPT_FORK_STREAM_CHUNK_SIZE,
  PROMPT_FORK_STREAM_DELAY_MS,
  type PromptForkModel,
} from "@/components/prompt-fork/prompt-fork-config";
import {
  CostBadge,
  SentimentBadge,
  SpeedBadge,
  TokenBadge,
} from "@/components/prompt-fork/prompt-fork-badges";
import { CopyIcon } from "@/components/prompt-fork/prompt-fork-icons";
import { PromptForkSkeleton } from "@/components/prompt-fork/prompt-fork-skeleton";
import { PromptForkResponse } from "@/components/prompt-fork/prompt-fork-response";
import { replayTokenStream } from "@/components/prompt-fork/prompt-fork-variance";

export type ColumnPhase = "idle" | "loading" | "streaming" | "done";

interface PromptForkColumnProps {
  model: PromptForkModel;
  columnIndex: number;
  phase: ColumnPhase;
  active: boolean;
  activeAnchor: string | null;
  onAnchorEnter: (anchor: string) => void;
  onAnchorLeave: () => void;
  highlightVariance: boolean;
  variantSentenceIndices: Set<number>;
  reducedMotion: boolean;
  onPhaseChange: (modelId: string, phase: ColumnPhase) => void;
  forkStartedAt: number | null;
}

function formatTimerLabel(elapsedMs: number, phase: ColumnPhase): string {
  const seconds = (elapsedMs / 1000).toFixed(1);
  if (phase === "loading") {
    if (elapsedMs < 800) return `${seconds}s…`;
    if (elapsedMs < 2000) return "Generating chunks…";
    return "Reasoning…";
  }
  return `${seconds}s`;
}

export function PromptForkColumn({
  model,
  columnIndex,
  phase,
  active,
  activeAnchor,
  onAnchorEnter,
  onAnchorLeave,
  highlightVariance,
  variantSentenceIndices,
  reducedMotion,
  onPhaseChange,
  forkStartedAt,
}: PromptForkColumnProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [streamedLength, setStreamedLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const fullText = blocksToPlainText(model.blocks);

  useEffect(() => {
    if (!active || !forkStartedAt) return;

    const interval = window.setInterval(() => {
      setElapsedMs(Date.now() - forkStartedAt);
    }, 100);

    return () => window.clearInterval(interval);
  }, [active, forkStartedAt]);

  useEffect(() => {
    if (!active || phase !== "idle") return;

    const startTimer = window.setTimeout(() => {
      onPhaseChange(model.id, "loading");
    }, 0);

    const loadTimer = window.setTimeout(() => {
      onPhaseChange(model.id, "streaming");
    }, model.latencyMs);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(loadTimer);
    };
  }, [active, model.id, model.latencyMs, onPhaseChange, phase]);

  useEffect(() => {
    if (phase !== "streaming") return;

    let cancelled = false;

    void replayTokenStream(fullText, {
      chunkSize: PROMPT_FORK_STREAM_CHUNK_SIZE,
      chunkDelayMs: PROMPT_FORK_STREAM_DELAY_MS,
      reducedMotion,
      onChunk: (accumulated) => {
        if (!cancelled) setStreamedLength(accumulated.length);
      },
    }).then(() => {
      if (!cancelled) onPhaseChange(model.id, "done");
    });

    return () => {
      cancelled = true;
    };
  }, [phase, fullText, reducedMotion, model.id, onPhaseChange]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [fullText]);

  const timerLabel = formatTimerLabel(
    phase === "done" ? model.latencyMs : elapsedMs,
    phase,
  );

  return (
    <motion.div
      layout
      className="relative flex min-h-[320px] flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {phase === "loading" || (phase === "idle" && active) ? (
        <PromptForkSkeleton modelName={model.name} timerLabel={timerLabel} />
      ) : phase === "idle" ? (
        <div className="h-full min-h-[320px] rounded-2xl border border-dashed border-white/[0.08] bg-[#262626]/50" aria-hidden />
      ) : (
        <div className="group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#262626] ring-1 ring-inset ring-white/[0.04]">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-white">{model.name}</h3>
              <SpeedBadge latencyMs={model.latencyMs} tier={model.speedTier} />
              <TokenBadge count={model.tokenCount} />
            </div>
          </div>

          <div className="relative flex-1 px-4 py-4">
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => void handleCopy()}
                  aria-label={`Copy ${model.name} response`}
                  className={`absolute top-2 right-2 z-10 inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 ring-1 ring-inset ring-white/10 transition-colors hover:bg-neutral-700 hover:text-white ${FOCUS_RING}`}
                >
                  <CopyIcon className="size-4" />
                </motion.button>
              )}
            </AnimatePresence>

            <PromptForkResponse
              blocks={model.blocks}
              streamedLength={streamedLength}
              isStreaming={phase === "streaming"}
              activeAnchor={activeAnchor}
              onAnchorEnter={onAnchorEnter}
              onAnchorLeave={onAnchorLeave}
              highlightVariance={highlightVariance && phase === "done"}
              variantSentenceIndices={variantSentenceIndices}
              columnIndex={columnIndex}
            />
          </div>

          {phase === "done" && (
            <footer className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
              <SentimentBadge sentiment={model.sentiment} />
              <CostBadge cost={model.cost} />
            </footer>
          )}

          <span className="sr-only" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </span>
        </div>
      )}
    </motion.div>
  );
}


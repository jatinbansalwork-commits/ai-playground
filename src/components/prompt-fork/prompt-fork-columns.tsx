"use client";

import { motion } from "framer-motion";
import {
  PROMPT_FORK_MODELS,
  type PromptForkModel,
} from "@/components/prompt-fork/prompt-fork-config";
import { PromptForkColumn, type ColumnPhase } from "@/components/prompt-fork/prompt-fork-column";

export type { ColumnPhase };

interface PromptForkColumnsProps {
  models?: PromptForkModel[];
  active: boolean;
  activeAnchor: string | null;
  onAnchorEnter: (anchor: string) => void;
  onAnchorLeave: () => void;
  highlightVariance: boolean;
  variantSentenceIndices: Set<number>;
  reducedMotion: boolean;
  columnPhases: Record<string, ColumnPhase>;
  onPhaseChange: (modelId: string, phase: ColumnPhase) => void;
  forkStartedAt: number | null;
}

export function PromptForkColumns({
  models = PROMPT_FORK_MODELS,
  active,
  activeAnchor,
  onAnchorEnter,
  onAnchorLeave,
  highlightVariance,
  variantSentenceIndices,
  reducedMotion,
  columnPhases,
  onPhaseChange,
  forkStartedAt,
}: PromptForkColumnsProps) {
  return (
    <motion.div
      layout
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-12 md:grid-cols-3 md:gap-6 md:px-8"
    >
      {models.map((model, index) => (
        <PromptForkColumn
          key={model.id}
          model={model}
          columnIndex={index}
          phase={columnPhases[model.id] ?? "idle"}
          active={active}
          activeAnchor={activeAnchor}
          onAnchorEnter={onAnchorEnter}
          onAnchorLeave={onAnchorLeave}
          highlightVariance={highlightVariance}
          variantSentenceIndices={variantSentenceIndices}
          reducedMotion={reducedMotion}
          onPhaseChange={onPhaseChange}
          forkStartedAt={forkStartedAt}
        />
      ))}
    </motion.div>
  );
}

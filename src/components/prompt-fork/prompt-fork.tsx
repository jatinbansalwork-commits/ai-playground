"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springContainer } from "@/lib/spring";
import {
  PROMPT_FORK_FORK_ANIMATION_MS,
  PROMPT_FORK_MODELS,
  type PromptForkModel,
} from "@/components/prompt-fork/prompt-fork-config";
import { PromptForkBranchSvg } from "@/components/prompt-fork/prompt-fork-branch-svg";
import { type ColumnPhase, PromptForkColumns } from "@/components/prompt-fork/prompt-fork-columns";
import { PromptForkHeader } from "@/components/prompt-fork/prompt-fork-header";
import { PromptForkInput } from "@/components/prompt-fork/prompt-fork-input";
import {
  computeVariantSentenceIndices,
  splitSentences,
} from "@/components/prompt-fork/prompt-fork-variance";

export type PromptForkPhase = "initial" | "forking" | "loading" | "completed";

function getModelSentences(model: PromptForkModel): string[] {
  return model.blocks.flatMap((block) =>
    block.type === "paragraph" ? splitSentences(block.text) : [],
  );
}

function createInitialPhases(models: PromptForkModel[]): Record<string, ColumnPhase> {
  return Object.fromEntries(models.map((model) => [model.id, "idle" as ColumnPhase]));
}

interface PromptForkProps {
  models?: PromptForkModel[];
  className?: string;
}

export function PromptFork({
  models = PROMPT_FORK_MODELS,
  className = "",
}: PromptForkProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<PromptForkPhase>("initial");
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [highlightVariance, setHighlightVariance] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [columnPhases, setColumnPhases] = useState<Record<string, ColumnPhase>>(() =>
    createInitialPhases(models),
  );
  const [forkStartedAt, setForkStartedAt] = useState<number | null>(null);

  const variantSentenceIndices = useMemo(() => {
    const sentenceArrays = models.map(getModelSentences);
    return computeVariantSentenceIndices(sentenceArrays);
  }, [models]);

  const columnsActive = phase === "loading" || phase === "completed";

  const handlePhaseChange = useCallback((modelId: string, nextPhase: ColumnPhase) => {
    setColumnPhases((previous) => {
      const updated = { ...previous, [modelId]: nextPhase };
      const allDone = models.every((model) => updated[model.id] === "done");
      if (allDone) {
        setPhase("completed");
      }
      return updated;
    });
  }, [models]);

  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed || phase !== "initial") return;

    setSubmittedPrompt(trimmed);
    setPhase("forking");
    setForkStartedAt(Date.now());
    setColumnPhases(createInitialPhases(models));

    const animationMs = reducedMotion ? 0 : PROMPT_FORK_FORK_ANIMATION_MS;
    window.setTimeout(() => {
      setPhase("loading");
    }, animationMs);
  }, [prompt, phase, reducedMotion, models]);

  const handleReset = useCallback(() => {
    setPhase("initial");
    setPrompt("");
    setSubmittedPrompt("");
    setHighlightVariance(false);
    setActiveAnchor(null);
    setColumnPhases(createInitialPhases(models));
    setForkStartedAt(null);
  }, [models]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && phase !== "initial") {
        handleReset();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, handleReset]);

  const showHeader = phase !== "initial";
  const showBranch = phase === "forking" || phase === "loading" || phase === "completed";

  return (
    <LayoutGroup>
      <div
        className={`relative min-h-dvh bg-background text-white ${className}`}
      >
        {showHeader ? (
          <div className="relative">
            <PromptForkHeader
              prompt={submittedPrompt}
              highlightVariance={highlightVariance}
              onToggleVariance={() => setHighlightVariance((value) => !value)}
              onReset={handleReset}
            />
            <PromptForkBranchSvg
              visible={showBranch}
              reducedMotion={reducedMotion}
            />
          </div>
        ) : null}

        <div
          className={
            phase === "initial"
              ? "flex min-h-dvh items-center justify-center px-4"
              : "pt-8"
          }
        >
          {phase === "initial" ? (
            <motion.div
              layout
              transition={springContainer}
              className="w-full max-w-2xl"
            >
              <PromptForkInput
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleSubmit}
              />
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="columns"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springContainer}
              >
                <PromptForkColumns
                  models={models}
                  active={columnsActive}
                  activeAnchor={activeAnchor}
                  onAnchorEnter={setActiveAnchor}
                  onAnchorLeave={() => setActiveAnchor(null)}
                  highlightVariance={highlightVariance}
                  variantSentenceIndices={variantSentenceIndices}
                  reducedMotion={reducedMotion}
                  columnPhases={columnPhases}
                  onPhaseChange={handlePhaseChange}
                  forkStartedAt={forkStartedAt}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <span className="sr-only" aria-live="polite">
          {phase === "loading" ? "Generating responses from three models" : ""}
          {phase === "completed" ? "All model responses complete" : ""}
        </span>
      </div>
    </LayoutGroup>
  );
}


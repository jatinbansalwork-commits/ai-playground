"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CLAUDE, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const STEPS = [
  { label: "Business Request", shortLabel: "Request", confidence: 24 },
  { label: "Clarification", shortLabel: "Clarify", confidence: 48 },
  { label: "Validation", shortLabel: "Validate", confidence: 68 },
  { label: "Simulation", shortLabel: "Simulate", confidence: 82 },
  { label: "Deployment Readiness", shortLabel: "Ready", confidence: 94 },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Confidence growth — interaction flow from business request through clarification, validation, and simulation to deployment readiness as ambiguity decreases.";

function FlowConnector({ index, active }: { index: number; active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex w-6 shrink-0 items-center self-center md:w-8" aria-hidden>
      <svg className="h-2 w-full" viewBox="0 0 32 8" fill="none">
        <path
          d="M1 4h22M24 1.5l5 2.5-5 2.5"
          stroke={active ? CLAUDE.primary : CLAUDE.hairline}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={active ? undefined : "3 3"}
        />
      </svg>
      {!reduced && active ? (
        <motion.span
          className="absolute left-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: CLAUDE.primary, boxShadow: `0 0 6px ${CLAUDE.primary}` }}
          animate={{ x: [0, 20], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        />
      ) : null}
    </div>
  );
}

function StepCard({
  step,
  index,
  state,
}: {
  step: (typeof STEPS)[number];
  index: number;
  state: "upcoming" | "active" | "complete";
}) {
  const reduced = useReducedMotion();
  const isLast = index === STEPS.length - 1;
  const borderColor =
    state === "complete"
      ? isLast
        ? CLAUDE.validated
        : CLAUDE.primaryBorder
      : state === "active"
        ? CLAUDE.primaryBorder
        : CLAUDE.hairline;
  const backgroundColor =
    state === "complete"
      ? isLast
        ? CLAUDE.validatedMuted
        : CLAUDE.primaryMuted
      : state === "active"
        ? CLAUDE.primaryMuted
        : CLAUDE.surfaceOverlay;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ ...LIVING_MOTION.discover, delay: index * 0.04 }}
      className="flex w-[5.5rem] flex-col sm:w-[6.5rem] md:w-[7.75rem]"
    >
      <motion.div
        animate={
          state === "active" && !reduced
            ? { boxShadow: [`inset 0 0 0 1px ${borderColor}`, `inset 0 0 0 1px ${borderColor}`, `0 0 0 4px ${CLAUDE.primaryMuted}`] }
            : undefined
        }
        transition={{ duration: 1.6, repeat: state === "active" && !reduced ? Infinity : 0 }}
        className="rounded-xl px-2 py-3 md:px-2.5 md:py-3.5"
        style={{
          backgroundColor,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      >
        <p className={cn(COPILOT_TYPE.eyebrow, "text-[8px] md:text-[9px]")} style={{ color: CLAUDE.textSoft }}>
          Step {index + 1}
        </p>
        <p
          className="mt-1 hidden text-[11px] font-medium leading-snug md:block"
          style={{ color: CLAUDE.text }}
        >
          {step.label}
        </p>
        <p className="mt-1 text-[10px] font-medium leading-snug md:hidden" style={{ color: CLAUDE.text }}>
          {step.shortLabel}
        </p>
        <p
          className="mt-2 text-lg font-medium tabular-nums leading-none md:text-xl"
          style={{ color: state === "upcoming" ? CLAUDE.textMuted : CLAUDE.text }}
        >
          {step.confidence}%
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full" style={{ backgroundColor: CLAUDE.surfaceRaised }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: isLast && state !== "upcoming" ? CLAUDE.validated : CLAUDE.primary }}
            initial={{ width: "0%" }}
            animate={{ width: state === "upcoming" ? "0%" : `${step.confidence}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
      <p className="mt-2 hidden text-center text-[9px] leading-snug md:block" style={{ color: CLAUDE.textSoft }}>
        {step.label}
      </p>
    </motion.div>
  );
}

export function PolicyCopilotConfidenceGrowth() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setActiveStep(STEPS.length - 1);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    let elapsed = 500;

    STEPS.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setActiveStep(index);
        }, elapsed),
      );
      elapsed += 1100;
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced]);

  function stepState(index: number): "upcoming" | "active" | "complete" {
    if (index < activeStep) return "complete";
    if (index === activeStep) return "active";
    return "upcoming";
  }

  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: "#0D1114" }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b px-4 py-4 md:px-5 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
        <p
          className={COPILOT_TYPE.titleLg}
          style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
        >
          Confidence Growth
        </p>
        <p className="mt-1 max-w-2xl text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          Confidence rises as ambiguity falls — each step adds evidence before anyone approves deployment.
        </p>
      </div>

      <div className="overflow-x-auto px-3 py-5 md:px-5 md:py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ol className="flex min-w-max items-start justify-center">
          {STEPS.map((step, index) => (
            <li key={step.label} className="flex items-start">
              <StepCard step={step} index={index} state={stepState(index)} />
              {index < STEPS.length - 1 ? (
                <FlowConnector index={index} active={index < activeStep} />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div
        className="mx-4 mb-4 rounded-xl px-3 py-2.5 md:mx-5 md:mb-5"
        style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span style={{ color: CLAUDE.textMuted }}>Ambiguity decreases →</span>
          <span className="font-medium tabular-nums" style={{ color: CLAUDE.validated }}>
            {STEPS[activeStep].confidence}% confidence at {STEPS[activeStep].shortLabel.toLowerCase()}
          </span>
        </div>
      </div>
    </figure>
  );
}

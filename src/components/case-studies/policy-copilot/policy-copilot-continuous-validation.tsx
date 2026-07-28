"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CLAUDE, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

type CheckStatus = "idle" | "watching" | "running" | "clear" | "note";

interface ValidationCheck {
  id: string;
  label: string;
  explanation: string;
  activatesAtMilestone: number;
}

const MILESTONES = [
  { label: "Users", value: "Doctors · Doctors-AD-Group" },
  { label: "Application", value: "Electronic Health Records" },
  { label: "Devices", value: "Managed hospital endpoints" },
] as const;

const CHECKS: ValidationCheck[] = [
  {
    id: "existing",
    label: "Existing policies",
    explanation: "Compared against 12 active allow rules in Clinical-Access — no duplicate intent found.",
    activatesAtMilestone: 0,
  },
  {
    id: "compliance",
    label: "Compliance requirements",
    explanation: "HIPAA access and audit controls satisfied for ePHI application paths.",
    activatesAtMilestone: 0,
  },
  {
    id: "standards",
    label: "Security standards",
    explanation: "Matches organisational baseline for clinical application tier access.",
    activatesAtMilestone: 1,
  },
  {
    id: "duplicate",
    label: "Duplicate rules",
    explanation: "No shadow allow for Doctors-AD-Group → EHR-Application-Object.",
    activatesAtMilestone: 1,
  },
  {
    id: "segmentation",
    label: "Network segmentation",
    explanation: "Clinical user segment to application tier — zone policy remains intact.",
    activatesAtMilestone: 2,
  },
  {
    id: "blast",
    label: "Who is affected",
    explanation: "~240 doctors in scope · nurses and contractors stay excluded.",
    activatesAtMilestone: 2,
  },
];

const ILLUSTRATION_ARIA_LABEL =
  "Continuous validation — a live panel where policy checks update progressively as users, applications, and devices are confirmed, with expandable explanations and lightweight status indicators.";

function StatusIndicator({ status }: { status: CheckStatus }) {
  const reduced = useReducedMotion();

  if (status === "clear") {
    return (
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
    );
  }

  if (status === "running") {
    return (
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
        {!reduced ? (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 1px ${CLAUDE.primary}55` }}
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: CLAUDE.primary }}
        />
      </span>
    );
  }

  if (status === "watching") {
    return (
      <span
        className="h-4 w-4 shrink-0 rounded-full border"
        style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
        aria-hidden
      />
    );
  }

  if (status === "note") {
    return (
      <span
        className="h-4 w-4 shrink-0 rounded-full"
        style={{ backgroundColor: CLAUDE.warningMuted, boxShadow: `inset 0 0 0 1px rgb(232 165 90 / 0.35)` }}
        aria-hidden
      />
    );
  }

  return (
    <span
      className="h-4 w-4 shrink-0 rounded-full"
      style={{ backgroundColor: CLAUDE.surfaceOverlay }}
      aria-hidden
    />
  );
}

function statusLabel(status: CheckStatus) {
  switch (status) {
    case "clear":
      return "Clear";
    case "running":
      return "Checking";
    case "watching":
      return "Watching";
    case "note":
      return "Note";
    default:
      return "Waiting";
  }
}

function ValidationRow({
  check,
  status,
  expanded,
  onToggle,
  delay = 0,
}: {
  check: ValidationCheck;
  status: CheckStatus;
  expanded: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const canExpand = status === "clear" || status === "note";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="rounded-xl border"
      style={{
        backgroundColor: status === "running" ? CLAUDE.primaryMuted : CLAUDE.surfaceRaised,
        borderColor: status === "running" ? CLAUDE.primaryBorder : CLAUDE.border,
      }}
    >
      <button
        type="button"
        onClick={canExpand ? onToggle : undefined}
        className={cn(
          "grid w-full grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-x-3 px-3.5 py-3 text-left transition-colors",
          status === "running" && "items-start",
          canExpand && "cursor-pointer hover:bg-white/[0.03]",
        )}
        aria-expanded={canExpand ? expanded : undefined}
      >
        <StatusIndicator status={status} />
        <div className="min-w-0">
          <div className="flex min-h-4 flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="text-[13px] font-semibold leading-none" style={{ color: CLAUDE.text }}>
              {check.label}
            </p>
            <span
              className="text-[9px] font-semibold uppercase leading-none tracking-wide tabular-nums"
              style={{
                color:
                  status === "clear"
                    ? CLAUDE.validated
                    : status === "running"
                      ? CLAUDE.primary
                      : CLAUDE.textMuted,
              }}
            >
              {statusLabel(status)}
            </span>
          </div>
          {status === "running" ? (
            <p
              className="mt-1.5 text-[12px] leading-relaxed"
              style={{ color: CLAUDE.textSecondary }}
            >
              Re-evaluating as policy context updates…
            </p>
          ) : null}
        </div>
        {canExpand ? (
          <span
            className="self-center text-[10px] font-medium leading-none"
            style={{ color: CLAUDE.primary }}
          >
            {expanded ? "Hide" : "Why?"}
          </span>
        ) : null}
      </button>
      <AnimatePresence initial={false}>
        {expanded && canExpand ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p
              className="border-t px-3.5 py-2.5 text-[12px] leading-relaxed"
              style={{ borderColor: CLAUDE.hairline, color: CLAUDE.textSecondary }}
            >
              {check.explanation}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function PolicyCopilotContinuousValidation() {
  const reduced = useReducedMotion();
  const [milestoneIndex, setMilestoneIndex] = useState(-1);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [clearedIds, setClearedIds] = useState<Set<string>>(() => new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) {
      setMilestoneIndex(MILESTONES.length - 1);
      setClearedIds(new Set(CHECKS.map((check) => check.id)));
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };

    let elapsed = 600;

    MILESTONES.forEach((_, index) => {
      schedule(() => setMilestoneIndex(index), elapsed);
      elapsed += 900;

      const batch = CHECKS.filter((check) => check.activatesAtMilestone === index);
      batch.forEach((check, checkIndex) => {
        schedule(() => setRunningId(check.id), elapsed + checkIndex * 700);
        schedule(() => {
          setRunningId((current) => (current === check.id ? null : current));
          setClearedIds((prev) => new Set([...prev, check.id]));
        }, elapsed + checkIndex * 700 + 1100);
      });

      elapsed += batch.length * 700 + 1200;
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced]);

  function statusFor(check: ValidationCheck): CheckStatus {
    if (clearedIds.has(check.id)) return "clear";
    if (runningId === check.id) return "running";
    if (check.activatesAtMilestone <= milestoneIndex) return "watching";
    return "idle";
  }

  const informedCount = clearedIds.size;
  const activeCount = runningId ? 1 : 0;

  return (
    <figure
      className="overflow-hidden rounded-xl border case-study-dark-panel"
      style={{ backgroundColor: CLAUDE.surface, borderColor: CLAUDE.border }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b px-4 py-4 md:px-5 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className={COPILOT_TYPE.titleLg}
              style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
            >
              Continuous validation
            </p>
            <p
              className="mt-1 max-w-2xl text-[13px] leading-relaxed"
              style={{ color: CLAUDE.textSecondary }}
            >
              Checks refresh as you confirm users, applications, and access conditions — no separate
              validation screen.
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-[10px] font-medium uppercase tracking-wide"
              style={{ color: CLAUDE.textMuted }}
            >
              Informed
            </p>
            <p
              className="text-[18px] font-semibold tabular-nums"
              style={{ color: CLAUDE.text }}
            >
              {informedCount}
              <span
                className="text-[13px] font-normal"
                style={{ color: CLAUDE.textMuted }}
              >
                {" "}
                / {CHECKS.length}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {MILESTONES.map((milestone, index) => {
            const confirmed = index <= milestoneIndex;
            return (
              <motion.div
                key={milestone.label}
                initial={false}
                animate={{
                  opacity: confirmed ? 1 : 0.55,
                  scale: confirmed ? 1 : 0.98,
                }}
                transition={{ duration: 0.28 }}
                className="min-w-[9rem] flex-1 rounded-xl border px-3 py-2.5"
                style={{
                  backgroundColor: confirmed ? CLAUDE.primaryMuted : CLAUDE.surfaceRaised,
                  borderColor: confirmed ? CLAUDE.primaryBorder : CLAUDE.border,
                }}
              >
                <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                  {milestone.label}
                  {confirmed ? (
                    <span className="ml-1.5" style={{ color: CLAUDE.validated }}>
                      · confirmed
                    </span>
                  ) : null}
                </p>
                <p
                  className="mt-1 text-[12px] leading-snug"
                  style={{ color: CLAUDE.textSecondary }}
                >
                  {milestone.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div
          className="mt-4 h-1 overflow-hidden rounded-full"
          style={{ backgroundColor: CLAUDE.surfaceOverlay }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: CLAUDE.primary }}
            initial={{ width: "0%" }}
            animate={{
              width: `${Math.min(100, ((informedCount + activeCount * 0.45) / CHECKS.length) * 100)}%`,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div
        className="space-y-2 p-4 md:p-5"
        style={{ backgroundColor: CLAUDE.bg }}
      >
        {CHECKS.map((check, index) => (
          <ValidationRow
            key={check.id}
            check={check}
            status={statusFor(check)}
            expanded={expandedId === check.id}
            onToggle={() => setExpandedId((current) => (current === check.id ? null : check.id))}
            delay={index * 0.03}
          />
        ))}
      </div>

      <p
        className="border-t px-4 py-3 text-center text-[12px] leading-relaxed md:px-5"
        style={{ borderColor: CLAUDE.hairline, color: CLAUDE.textMuted }}
      >
        Nothing blocks the workflow — issues surface only when they matter.
      </p>
    </figure>
  );
}

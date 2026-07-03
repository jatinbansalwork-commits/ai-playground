"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type {
  ComplianceSummary,
  LearningPillDef,
  ReasoningEvidence,
  RuleConstructionRow,
  ScopeCheckSummary,
} from "@/components/case-studies/policy-copilot/policy-copilot-agentic-evidence";
import { frameworkIcon } from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

function StatusBadge({ label, tone }: { label: string; tone: "success" | "warning" | "neutral" }) {
  const bg =
    tone === "success" ? CLAUDE.validatedMuted : tone === "warning" ? CLAUDE.warningMuted : CLAUDE.surfaceOverlay;
  const color = tone === "success" ? CLAUDE.validated : tone === "warning" ? CLAUDE.warning : CLAUDE.textMuted;
  return (
    <span className={cn(COPILOT_TYPE.eyebrow, "rounded-full px-2 py-0.5 font-medium")} style={{ backgroundColor: bg, color }}>
      {label}
    </span>
  );
}

function AccordionSection({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: CLAUDE.hairline }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(COPILOT_FOCUS, "flex w-full items-center gap-2 px-4 py-3 text-left")}
      >
        <svg
          className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          style={{ color: CLAUDE.textMuted }}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="flex-1 text-sm font-medium" style={{ color: CLAUDE.text }}>
          {title}
        </span>
        {badge}
      </button>
      {open ? <div className="px-4 pb-4">{children}</div> : null}
    </div>
  );
}

export function ComplianceSummaryPanel({
  scope,
  compliance,
  checksPassed,
  delay = 0,
}: {
  scope: ScopeCheckSummary;
  compliance: ComplianceSummary;
  checksPassed: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (!checksPassed) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <div className="border-b px-4 py-3" style={{ borderColor: CLAUDE.hairline }}>
        <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
          Compliance verified — scope and controls aligned
        </p>
        <p className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textMuted }}>
          Review attestation summary before deploy
        </p>
        <button
          type="button"
          className={cn(COPILOT_FOCUS, "mt-2 text-[12px] font-medium")}
          style={{ color: CLAUDE.primary }}
          title="Demo — export not wired"
        >
          Export attestation →
        </button>
      </div>

      <AccordionSection title="Scope check" badge={<StatusBadge label="Completed" tone="success" />}>
        <dl className="space-y-2 text-[13px]">
          <div>
            <dt className="font-medium" style={{ color: CLAUDE.textSecondary }}>Access scope</dt>
            <dd style={{ color: CLAUDE.textMuted }}>{scope.accessScope}</dd>
          </div>
          <div>
            <dt className="font-medium" style={{ color: CLAUDE.textSecondary }}>Control alignment</dt>
            <dd style={{ color: CLAUDE.textMuted }}>{scope.controlAlignment}</dd>
          </div>
          <div>
            <dt className="font-medium" style={{ color: CLAUDE.textSecondary }}>Logging</dt>
            <dd style={{ color: CLAUDE.textMuted }}>{scope.logging}</dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {compliance.bullets.slice(0, 3).map((b) => {
            const fw = b.split(" ")[0] ?? "SOC";
            return (
              <span
                key={b}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.textMuted }}
                title={b}
              >
                <span aria-hidden>{frameworkIcon(fw)}</span>
                {fw}
              </span>
            );
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Compliance check" badge={<StatusBadge label="Success" tone="success" />} defaultOpen={false}>
        <ul className="space-y-2">
          {compliance.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px]" style={{ color: CLAUDE.textMuted }}>
              <span aria-hidden>✓</span>
              {b}
            </li>
          ))}
        </ul>
        {compliance.auditNote ? (
          <p className="mt-2 text-[13px] italic" style={{ color: CLAUDE.textSoft }}>
            {compliance.auditNote}
          </p>
        ) : null}
      </AccordionSection>
    </motion.div>
  );
}

export function ReasoningEvidencePanel({
  evidence,
  delay = 0,
}: {
  evidence: ReasoningEvidence;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <div className="border-b px-4 py-3" style={{ borderColor: CLAUDE.hairline }}>
        <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
          Reasoning and evidence
        </p>
        <p className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textMuted }}>
          Traceability — every claim linked to a source
        </p>
      </div>

      <AccordionSection title="Why this rule was proposed">
        <ol className="space-y-2 pl-0">
          {evidence.whyProposed.map((line, i) => (
            <li key={line} className="flex gap-2.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums"
                style={{ backgroundColor: CLAUDE.primaryMuted, color: CLAUDE.primary }}
              >
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </AccordionSection>

      <AccordionSection title="Supporting sources" defaultOpen={false}>
        <ul className="space-y-2">
          {evidence.sources.map((s) => (
            <li key={s.label} className="rounded-lg px-3 py-2 text-[13px]" style={{ backgroundColor: CLAUDE.surfaceOverlay }} title={s.detail}>
              <span className="font-medium" style={{ color: CLAUDE.textSecondary }}>{s.label}</span>
              <p className="mt-0.5" style={{ color: CLAUDE.primary }}>{s.detail}</p>
            </li>
          ))}
        </ul>
      </AccordionSection>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium" style={{ color: CLAUDE.textMuted }}>
            AI confidence level
          </p>
          <span className="text-xs font-medium tabular-nums" style={{ color: CLAUDE.text }}>
            {evidence.confidence}%
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: CLAUDE.surfaceOverlay }}>
          <motion.div
            initial={reduced ? false : { width: 0 }}
            animate={{ width: `${evidence.confidence}%` }}
            transition={LIVING_MOTION.confidence}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${CLAUDE.primary}, #a78bfa)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function RuleConstructionPanel({
  rows,
  outcomeSummary,
  delay = 0,
}: {
  rows: RuleConstructionRow[];
  outcomeSummary: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <div className="border-b px-4 py-3" style={{ borderColor: CLAUDE.hairline }}>
        <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
          Rule construction
        </p>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
          {outcomeSummary}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] text-left text-[13px]">
          <thead>
            <tr style={{ color: CLAUDE.textMuted }}>
              <th className="px-4 py-2 font-medium">Component</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.component} className="border-t" style={{ borderColor: CLAUDE.hairline }}>
                <td className="px-4 py-2.5" style={{ color: CLAUDE.textSecondary }}>{row.component}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          row.status === "Applied"
                            ? CLAUDE.validated
                            : row.status === "Warning"
                              ? CLAUDE.warning
                              : CLAUDE.textMuted,
                      }}
                    />
                    <span style={{ color: CLAUDE.textMuted }}>{row.status}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5" style={{ color: CLAUDE.textMuted }}>{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export interface DockWorkflowAction {
  id: string;
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export function AgenticCanvasActionDock({
  pendingCount,
  actions,
  workflowActions,
  learningPills,
  onLearningPill,
  onReady,
  readyLabel = "Ready to approve",
  showReady,
}: {
  pendingCount: number;
  actions: { id: string; label: string; onClick: () => void }[];
  workflowActions?: DockWorkflowAction[];
  learningPills?: LearningPillDef[];
  onLearningPill?: (pill: LearningPillDef) => void;
  onReady?: () => void;
  readyLabel?: string;
  showReady?: boolean;
}) {
  const reduced = useReducedMotion();
  const hasWorkflow = workflowActions && workflowActions.length > 0;
  const hasOptional = pendingCount > 0;
  const hasReady = showReady && onReady;
  const hasLearning = learningPills && learningPills.length > 0;

  if (!hasWorkflow && !hasOptional && !hasReady && !hasLearning) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={LIVING_MOTION.discover}
      className="shrink-0 border-t px-4 py-3 md:px-5"
      style={{
        borderColor: hasOptional ? CLAUDE.primaryBorder : CLAUDE.hairline,
        boxShadow: hasOptional ? `0 -8px 32px rgb(92 151 238 / 0.12)` : undefined,
        background: `linear-gradient(180deg, rgb(24 23 21 / 0.72) 0%, ${CLAUDE.surface} 40%)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-2.5">
        {hasWorkflow ? (
          <div className="flex flex-wrap items-center gap-2">
            {workflowActions!.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className={cn(
                  COPILOT_FOCUS,
                  COPILOT_TARGET.chip,
                  "rounded-lg px-3 text-[13px] font-medium transition-opacity hover:opacity-90",
                  action.primary ? "text-white" : "border transition-colors hover:bg-white/[0.06]",
                )}
                style={
                  action.primary
                    ? { backgroundColor: CLAUDE.primary }
                    : { borderColor: CLAUDE.hairline, color: CLAUDE.textSecondary }
                }
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}

        {hasOptional ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-1 text-[13px] font-medium" style={{ color: CLAUDE.text }}>
              <span style={{ color: CLAUDE.validated }}>0 blocking</span>
              <span style={{ color: CLAUDE.textMuted }}> · </span>
              {pendingCount} optional
            </p>
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className={cn(
                  COPILOT_FOCUS,
                  COPILOT_TARGET.chip,
                  "rounded-full border px-3.5 text-[13px] font-medium transition-colors hover:bg-white/[0.06]",
                )}
                style={{
                  borderColor: CLAUDE.primaryBorder,
                  backgroundColor: CLAUDE.primaryMuted,
                  color: CLAUDE.text,
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}

        {hasReady ? (
          <button
            type="button"
            onClick={onReady}
            className={cn(
              COPILOT_FOCUS,
              COPILOT_TARGET.chip,
              "self-start rounded-full px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90",
            )}
            style={{ backgroundColor: CLAUDE.primary }}
          >
            {readyLabel}
          </button>
        ) : null}

        {hasLearning ? (
          <div className="flex flex-col gap-1.5 border-t pt-2.5" style={{ borderColor: CLAUDE.hairline }}>
            <p className={cn(COPILOT_TYPE.caption, "font-medium")} style={{ color: CLAUDE.textSoft }}>
              Learn more
            </p>
            <div className="flex flex-wrap gap-1.5">
              {learningPills!.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => onLearningPill?.(pill)}
                  className={cn(
                    COPILOT_FOCUS,
                    COPILOT_TARGET.chip,
                    "rounded-full border px-3 py-1 text-[12px] leading-snug transition-colors hover:bg-white/[0.04]",
                  )}
                  style={{ borderColor: "rgba(167,139,250,0.4)", color: "#c4b5fd" }}
                >
                  {pill.text}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

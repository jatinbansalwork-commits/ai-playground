"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import { scrollIntoNearestScrollParent } from "@/lib/case-study-a11y";
import {
  CANVAS_PREVIEW_COPY,
  CANVAS_SECTION_IDS,
  CANVAS_SECTION_SKILL,
  confidenceBlocker,
  confidenceLabel,
  confidenceTooltip,
  SKILL_STEP_TOOLTIPS,
  SKILL_TOKENS,
  type CanvasSectionId,
  type InsightKind,
  INSIGHT_KIND_COLORS,
  INSIGHT_KIND_LABEL,
} from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import {
  JOURNEY_STEP_COUNT,
  JOURNEY_STEPS,
} from "@/components/case-studies/policy-copilot/policy-copilot-journey-steps";
import {
  COPILOT_SKILLS,
  type CopilotSkillId,
} from "@/components/case-studies/policy-copilot/policy-copilot-skills";
import { CopilotMark } from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

function SkillIcon({ icon, className }: { icon: (typeof SKILL_TOKENS)[CopilotSkillId]["icon"]; className?: string }) {
  const paths: Record<(typeof SKILL_TOKENS)[CopilotSkillId]["icon"], ReactNode> = {
    compass: <path d="M8 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
    pen: <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
    shield: <path d="M8 2l5 2v4c0 3.5-2.5 5.5-5 6-2.5-.5-5-2.5-5-6V4l5-2z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
    rocket: <path d="M8 14V8M8 8c2-2 4-2 4-4 0 0-1.5 2-4 2S4 4 4 4c0 2 2 2 4 4z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
    tune: <path d="M3 5h10M3 8h6M3 11h8M13 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />,
    ledger: <path d="M4 4h8v10H4zM6 7h4M6 10h4" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  };
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 16 16" aria-hidden>
      {paths[icon]}
    </svg>
  );
}

/** Segmented journey bar — 8 case-study steps, not the 6 product skills. */
export function JourneySkillProgressBar({
  currentStep,
}: {
  /** 1-based journey step from `resolveJourneyStep` */
  currentStep: number;
}) {
  const step = Math.min(JOURNEY_STEP_COUNT, Math.max(1, currentStep));

  return (
    <div
      className="flex gap-1"
      aria-hidden
      title={`Step ${step} of ${JOURNEY_STEP_COUNT}`}
    >
      {JOURNEY_STEPS.map((journey) => {
        const complete = journey.step < step;
        const active = journey.step === step;
        const isLastComplete = step >= JOURNEY_STEP_COUNT && journey.step === JOURNEY_STEP_COUNT;

        return (
          <div
            key={journey.step}
            className="group/step relative h-1 flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: CLAUDE.surfaceOverlay }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: complete || isLastComplete ? "100%" : active ? "45%" : "0%",
                backgroundColor:
                  complete || isLastComplete
                    ? CLAUDE.validated
                    : active
                      ? CLAUDE.primary
                      : "transparent",
                boxShadow: active && !isLastComplete ? `0 0 8px ${CLAUDE.primary}55` : undefined,
              }}
            />
            <span
              className="pointer-events-none absolute -bottom-9 left-1/2 z-30 hidden w-44 -translate-x-1/2 rounded-lg px-2 py-1.5 text-[9px] leading-snug group-hover/step:block"
              style={{
                backgroundColor: CLAUDE.surfaceRaised,
                color: CLAUDE.textMuted,
                boxShadow: `0 0 0 1px ${CLAUDE.hairline}`,
              }}
              role="tooltip"
            >
              <span className="font-medium" style={{ color: CLAUDE.primary }}>
                Step {journey.step}
              </span>
              {active && !isLastComplete
                ? ` — ${journey.title}`
                : complete || isLastComplete
                  ? ` — ${journey.title} · complete`
                  : ` — ${journey.title}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function JourneyStepIndicatorRich({
  activeSkill,
  showProgress = true,
  caseStudyStep,
  currentJourneyStep,
}: {
  activeSkill: CopilotSkillId;
  showProgress?: boolean;
  /** Case study walkthrough label — e.g. "Step 4 of 8 — Assemble the Policy" */
  caseStudyStep?: string;
  /** 1-based journey step for the progress bar */
  currentJourneyStep?: number;
}) {
  const activeIdx = COPILOT_SKILLS.findIndex((s) => s.id === activeSkill);
  const skill = COPILOT_SKILLS[activeIdx];
  const tokens = SKILL_TOKENS[activeSkill];
  const stepTips = SKILL_STEP_TOOLTIPS[activeSkill];
  const nextSkill = COPILOT_SKILLS[activeIdx + 1];
  const progressStep =
    currentJourneyStep ??
    Math.min(JOURNEY_STEP_COUNT, Math.max(1, activeIdx + 1));

  const titleBlock = (
    <>
      <div
        className="group/skill relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: tokens.muted, color: tokens.color, boxShadow: `0 0 0 1px ${tokens.color}40` }}
        title={stepTips.active}
      >
        <SkillIcon icon={tokens.icon} />
        <span
          className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-52 rounded-lg px-2.5 py-2 text-[10px] leading-snug group-hover/skill:block"
          style={{ backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.textMuted, boxShadow: `0 0 0 1px ${CLAUDE.hairline}` }}
          role="tooltip"
        >
          <span className="font-medium" style={{ color: CLAUDE.text }}>
            Now:{" "}
          </span>
          {stepTips.active}
          {nextSkill ? (
            <>
              <br />
              <span className="mt-1 inline-block font-medium" style={{ color: tokens.color }}>
                Next — {nextSkill.label}:{" "}
              </span>
              {stepTips.next}
            </>
          ) : null}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-[13px] font-medium" style={{ color: CLAUDE.text }}>
          {skill?.label ?? "Intent"}
        </p>
        {caseStudyStep ? (
          <p className={cn(COPILOT_TYPE.caption, "truncate")} style={{ color: CLAUDE.textMuted }}>
            {caseStudyStep}
          </p>
        ) : null}
      </div>
    </>
  );

  if (!showProgress) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-3" aria-label="Policy journey progress">
        {titleBlock}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2" aria-label="Policy journey progress">
      <div className="flex items-center gap-3">{titleBlock}</div>
      <div className="pl-11">
        <JourneySkillProgressBar currentStep={progressStep} />
      </div>
    </div>
  );
}

export function ConfidenceRing({
  phase,
  value,
  className,
  checksPassed,
  mappingDone,
}: {
  phase: LivingPhase;
  value: number;
  className?: string;
  checksPassed?: boolean;
  mappingDone?: boolean;
}) {
  const reduced = useReducedMotion();
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const label = confidenceLabel(phase, value);
  const blocker = confidenceBlocker(phase, value, { checksPassed, mappingDone });
  const tip = blocker ?? confidenceTooltip(phase, value);

  return (
    <div className={cn("group relative shrink-0", className)} title={tip}>
      <svg width="44" height="44" viewBox="0 0 44 44" aria-label={label}>
        <circle cx="22" cy="22" r={r} fill="none" stroke={CLAUDE.surfaceOverlay} strokeWidth="3" />
        <motion.circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={blocker ? CLAUDE.warning : CLAUDE.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduced ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={LIVING_MOTION.confidence}
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="23" textAnchor="middle" className="fill-current text-[8px] font-medium tabular-nums" style={{ color: CLAUDE.text }}>
          {value}
        </text>
      </svg>
      <span
        className="pointer-events-none absolute -bottom-8 right-0 z-20 hidden w-52 rounded-lg px-2 py-1.5 text-[10px] leading-snug group-hover:block"
        style={{ backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.textMuted, boxShadow: `0 0 0 1px ${CLAUDE.hairline}` }}
        role="tooltip"
      >
        {blocker ? (
          <span style={{ color: CLAUDE.warning }}>{blocker}</span>
        ) : (
          tip
        )}
      </span>
    </div>
  );
}

export function EnforcementWatermark({
  mode,
}: {
  mode: "draft" | "live" | "deploying";
}) {
  const copy =
    mode === "live"
      ? {
          label: "Live in 3 regions",
          tone: CLAUDE.validated,
          bg: CLAUDE.validatedMuted,
          border: CLAUDE.validated,
        }
      : mode === "deploying"
        ? {
            label: "Deploying",
            tone: CLAUDE.accentTeal,
            bg: CLAUDE.accentTealMuted,
            border: CLAUDE.accentTeal,
          }
        : {
            label: "Draft — not enforced",
            tone: CLAUDE.warning,
            bg: CLAUDE.warningMuted,
            border: CLAUDE.warning,
          };

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium"
      style={{
        color: copy.tone,
        backgroundColor: copy.bg,
        borderColor: `${copy.border}44`,
      }}
    >
      {mode === "draft" ? (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
          <rect x="2.5" y="5" width="7" height="5" rx="0.75" stroke="currentColor" strokeWidth="1" />
          <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: copy.tone }} />
      )}
      {copy.label}
    </span>
  );
}

export function SafetyStrip({
  mode,
}: {
  mode: "draft" | "checking" | "ready" | "live" | "deploying";
}) {
  const copy =
    mode === "live"
      ? {
          text: "Live in production regions — enforced",
          sub: "Changes require re-approval",
          tone: CLAUDE.validated,
          bg: CLAUDE.validatedMuted,
          pulse: false,
        }
      : mode === "deploying"
        ? {
            text: "Deploying — rollback armed",
            sub: "0 rules changed until each region confirms",
            tone: CLAUDE.accentTeal,
            bg: CLAUDE.accentTealMuted,
            pulse: true,
          }
        : mode === "checking"
          ? {
              text: "Running safety checks — still draft only",
              tone: CLAUDE.warning,
              bg: CLAUDE.warningMuted,
              pulse: true,
            }
          : mode === "ready"
            ? {
                text: "All checks passed — ready to approve when you are",
                sub: "Nothing deploys until you confirm",
                tone: CLAUDE.validated,
                bg: CLAUDE.validatedMuted,
                pulse: false,
              }
            : {
                text: "Nothing deploys until you approve — draft only",
                tone: CLAUDE.warning,
                bg: CLAUDE.warningMuted,
                pulse: true,
              };

  return (
    <div
      className="flex shrink-0 items-center gap-2.5 border-b px-4 py-1.5 md:px-5"
      style={{ borderColor: CLAUDE.hairline, backgroundColor: copy.bg }}
      role="status"
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", copy.pulse && "animate-pulse")}
        style={{ backgroundColor: copy.tone }}
      />
      <div className="min-w-0">
        <p className={cn(COPILOT_TYPE.caption, "font-medium")} style={{ color: copy.tone }}>
          {copy.text}
        </p>
        {"sub" in copy && copy.sub ? (
          <p className="text-[10px] leading-snug" style={{ color: CLAUDE.textMuted }}>
            {copy.sub}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function AgentStatusBar({
  message,
  onWhy,
  phase,
}: {
  message: string;
  onWhy?: () => void;
  phase: LivingPhase;
}) {
  if (phase === "invite" || phase === "done") return null;

  return (
    <div
      className="flex shrink-0 items-center gap-2 border-b px-4 py-1.5 md:px-5"
      style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
    >
      <CopilotMark size={16} />
      <p className="min-w-0 flex-1 truncate text-[12px]" style={{ color: CLAUDE.textSecondary }}>
        <span className="font-medium" style={{ color: CLAUDE.textMuted }}>
          Now:{" "}
        </span>
        {message}
      </p>
      {onWhy ? (
        <button
          type="button"
          onClick={onWhy}
          className={cn(COPILOT_FOCUS, "shrink-0 text-[11px] font-medium")}
          style={{ color: CLAUDE.primary }}
        >
          Why?
        </button>
      ) : null}
    </div>
  );
}

export function CanvasSectionAnchor({
  id,
  children,
  className,
  highlight,
  activeSkill,
  whyAnnotation,
}: {
  id: CanvasSectionId;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  activeSkill?: CopilotSkillId;
  whyAnnotation?: string | null;
}) {
  const sectionSkill = CANVAS_SECTION_SKILL[id];
  const skill = activeSkill ?? sectionSkill;
  const tokens = SKILL_TOKENS[skill];

  return (
    <div
      id={id}
      className={cn(
        "relative scroll-mt-4 rounded-2xl transition-shadow duration-300",
        highlight && "ring-2 ring-offset-2 ring-offset-[#1f1e1b]",
        className,
      )}
      style={
        highlight
          ? { boxShadow: `0 0 0 2px ${tokens.color}66` }
          : undefined
      }
    >
      {whyAnnotation ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-2 left-4 right-4 z-10 flex items-start gap-2 rounded-lg border px-3 py-2"
          style={{
            backgroundColor: CLAUDE.surfaceRaised,
            borderColor: `${tokens.color}55`,
            boxShadow: `0 4px 16px rgb(0 0 0 / 0.2)`,
          }}
          role="note"
        >
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: tokens.color }}>
            Why?
          </span>
          <p className="text-[11px] leading-snug" style={{ color: CLAUDE.textSecondary }}>
            {whyAnnotation}
          </p>
        </motion.div>
      ) : null}
      {children}
    </div>
  );
}

export function CanvasDeepLink({
  section,
  children,
  onNavigate,
}: {
  section: CanvasSectionId;
  children: ReactNode;
  onNavigate: (id: CanvasSectionId) => void;
}) {
  const preview = CANVAS_PREVIEW_COPY[section];
  const skill = CANVAS_SECTION_SKILL[section];
  const tokens = SKILL_TOKENS[skill];

  return (
    <span className="group/deeplink relative inline">
      <button
        type="button"
        onClick={() => onNavigate(section)}
        className={cn(COPILOT_FOCUS, "font-medium underline decoration-dotted underline-offset-2")}
        style={{ color: CLAUDE.primary }}
      >
        {children}
      </button>
      <span
        className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 hidden w-44 rounded-lg p-2 group-hover/deeplink:block"
        style={{
          backgroundColor: CLAUDE.surfaceRaised,
          boxShadow: `0 0 0 1px ${CLAUDE.hairline}, 0 8px 24px rgb(0 0 0 / 0.35)`,
        }}
        role="tooltip"
      >
        <span
          className="mb-1.5 block h-8 rounded-md"
          style={{
            background: `linear-gradient(135deg, ${tokens.muted} 0%, ${CLAUDE.surfaceOverlay} 100%)`,
            boxShadow: `inset 0 0 0 1px ${tokens.color}33`,
          }}
        />
        <span className="block text-[10px] font-medium" style={{ color: CLAUDE.text }}>
          {preview.title}
        </span>
        <span className="mt-0.5 block text-[9px] leading-snug" style={{ color: CLAUDE.textMuted }}>
          {preview.hint}
        </span>
      </span>
    </span>
  );
}

export { CANVAS_SECTION_IDS };

export function InsightBreadcrumbRich({
  children,
  kind = "status",
  delay = 0,
  canvasLink,
  onCanvasNavigate,
}: {
  children: ReactNode;
  kind?: InsightKind;
  delay?: number;
  canvasLink?: CanvasSectionId;
  onCanvasNavigate?: (id: CanvasSectionId) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="flex items-start gap-2 rounded-xl border-l-[3px] px-3 py-2"
      style={{
        backgroundColor: INSIGHT_KIND_COLORS[kind].muted,
        borderLeftColor: INSIGHT_KIND_COLORS[kind].color,
      }}
    >
      <span
        className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
        style={{ backgroundColor: CLAUDE.surfaceOverlay, color: INSIGHT_KIND_COLORS[kind].color }}
      >
        {INSIGHT_KIND_LABEL[kind]}
      </span>
      <p className={cn(COPILOT_TYPE.bodySm, "min-w-0 flex-1 md:text-[13px]")} style={{ color: CLAUDE.textSecondary }}>
        {children}
        {canvasLink && onCanvasNavigate ? (
          <>
            {" "}
            <CanvasDeepLink section={canvasLink} onNavigate={onCanvasNavigate}>
              canvas
            </CanvasDeepLink>
          </>
        ) : null}
      </p>
    </motion.div>
  );
}

export function CopilotThreadAvatar() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: CLAUDE.primaryMuted }}>
      <CopilotMark size={14} />
    </span>
  );
}

export function GovernExportButton({
  policyName,
  onExport,
}: {
  policyName: string;
  onExport?: () => void;
}) {
  const [exported, setExported] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        onExport?.();
        setExported(true);
        window.setTimeout(() => setExported(false), 2400);
      }}
      className={cn(
        COPILOT_FOCUS,
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-white/[0.04]",
      )}
      style={{
        borderColor: exported ? CLAUDE.validated : CLAUDE.border,
        color: exported ? CLAUDE.validated : CLAUDE.textSecondary,
      }}
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {exported ? "PDF queued" : `Export ${policyName}`}
    </button>
  );
}

export function GovernPolicyPassport({
  overview,
  rulesPanel,
  compliancePanel,
  auditPanel,
  memoryPanel,
  exportAction,
}: {
  overview: ReactNode;
  rulesPanel: ReactNode;
  compliancePanel: ReactNode;
  auditPanel: ReactNode;
  memoryPanel?: ReactNode;
  exportAction?: ReactNode;
}) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rules", label: "Rules" },
    { id: "compliance", label: "Compliance" },
    { id: "audit", label: "Audit trail" },
    ...(memoryPanel ? [{ id: "memory", label: "Memory" }] : []),
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");

  const content =
    tab === "overview"
      ? overview
      : tab === "rules"
        ? rulesPanel
        : tab === "compliance"
          ? compliancePanel
          : tab === "audit"
            ? auditPanel
            : memoryPanel;

  return (
    <div className="overflow-hidden rounded-xl" style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}>
      <div
        className="sticky top-0 z-10 flex items-center gap-2 overflow-x-auto border-b p-1.5"
        style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surfaceRaised }}
      >
        <div className="flex min-w-0 flex-1 gap-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(COPILOT_FOCUS, "shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors")}
            style={{
              backgroundColor: tab === t.id ? CLAUDE.surfaceOverlay : "transparent",
              color: tab === t.id ? CLAUDE.text : CLAUDE.textMuted,
            }}
          >
            {t.label}
          </button>
        ))}
        </div>
        {exportAction ? <div className="shrink-0 pr-1">{exportAction}</div> : null}
      </div>
      <div className="flex flex-col gap-4 p-4">{content}</div>
    </div>
  );
}

export function usePolicyCopilotKeyboard({
  enabled,
  onFocusComposer,
  onPrimary,
  onEscape,
  onChip,
}: {
  enabled: boolean;
  onFocusComposer: () => void;
  onPrimary?: () => void;
  onEscape: () => void;
  onChip: (index: number) => void;
}) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "/" && !typing) {
        e.preventDefault();
        onFocusComposer();
      }
      if (e.key === "Escape") {
        onEscape();
      }
      if (e.key === "Enter" && !typing && (e.metaKey || e.ctrlKey) && onPrimary) {
        e.preventDefault();
        onPrimary();
      }
      if (!typing && ["1", "2", "3"].includes(e.key) && !e.metaKey && !e.ctrlKey) {
        onChip(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, onFocusComposer, onPrimary, onEscape, onChip]);
}

export function scrollToCanvasSection(id: CanvasSectionId, onHighlight?: (id: CanvasSectionId | null) => void) {
  scrollToFirstCanvasSection([id], onHighlight);
}

export function scrollToFirstCanvasSection(
  ids: CanvasSectionId[],
  onHighlight?: (id: CanvasSectionId | null) => void,
  onAnnotation?: (id: CanvasSectionId | null) => void,
): boolean {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    scrollIntoNearestScrollParent(el, { behavior: "smooth", block: "start" });
    onHighlight?.(id);
    onAnnotation?.(id);
    window.setTimeout(() => {
      onHighlight?.(null);
      onAnnotation?.(null);
    }, 2000);
    return true;
  }
  return false;
}

export function DeploySimulateStrip({
  onSimulate,
  onProceed,
  simulating,
}: {
  onSimulate: () => void;
  onProceed: () => void;
  simulating?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: CLAUDE.accentTealMuted, backgroundColor: CLAUDE.accentTealMuted }}
      role="region"
      aria-label="Pre-deploy simulation"
    >
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium" style={{ color: CLAUDE.accentTeal }}>
            Pause & simulate
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: CLAUDE.textSecondary }}>
            Run a dry-run against production topology before you ship — rollback stays armed.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onSimulate}
            disabled={simulating}
            className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "rounded-full border px-3 text-[12px] font-medium")}
            style={{ borderColor: CLAUDE.accentTeal, color: CLAUDE.accentTeal }}
          >
            {simulating ? "Simulating…" : "Run simulation"}
          </button>
          <button
            type="button"
            onClick={onProceed}
            className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "rounded-full px-3 text-[12px] font-medium text-white")}
            style={{ backgroundColor: CLAUDE.accentTeal }}
          >
            Proceed to deploy
          </button>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import {
  CANVAS_SECTION_IDS,
  confidenceLabel,
  confidenceTooltip,
  type CanvasSectionId,
  type InsightKind,
  INSIGHT_KIND_LABEL,
  SKILL_TOKENS,
} from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import {
  COPILOT_SKILLS,
  isSkillComplete,
  type CopilotSkillId,
} from "@/components/case-studies/policy-copilot/policy-copilot-skills";
import { CopilotMark } from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
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

export function JourneyStepIndicatorRich({ activeSkill }: { activeSkill: CopilotSkillId }) {
  const activeIdx = COPILOT_SKILLS.findIndex((s) => s.id === activeSkill);
  const skill = COPILOT_SKILLS[activeIdx];
  const tokens = SKILL_TOKENS[activeSkill];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2" aria-label="Policy journey progress">
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: tokens.muted, color: tokens.color, boxShadow: `0 0 0 1px ${tokens.color}40` }}
        >
          <SkillIcon icon={tokens.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
              {skill?.label ?? "Intent"}
            </p>
            <p className={cn(COPILOT_TYPE.caption, "tabular-nums")} style={{ color: CLAUDE.textMuted }}>
              {activeIdx + 1} of {COPILOT_SKILLS.length}
            </p>
          </div>
          <div className="mt-1.5 flex gap-1">
            {COPILOT_SKILLS.map((s, i) => {
              const complete = isSkillComplete(s.id, activeSkill);
              const active = s.id === activeSkill;
              const t = SKILL_TOKENS[s.id];
              return (
                <div
                  key={s.id}
                  className="h-1 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: CLAUDE.surfaceOverlay }}
                  title={s.label}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: complete ? "100%" : active ? "55%" : "0%",
                      backgroundColor: complete ? CLAUDE.validated : active ? t.color : "transparent",
                      boxShadow: active ? `0 0 8px ${t.color}55` : undefined,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConfidenceRing({
  phase,
  value,
  className,
}: {
  phase: LivingPhase;
  value: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const label = confidenceLabel(phase, value);
  const tip = confidenceTooltip(phase, value);

  return (
    <div className={cn("group relative shrink-0", className)} title={tip}>
      <svg width="44" height="44" viewBox="0 0 44 44" aria-label={label}>
        <circle cx="22" cy="22" r={r} fill="none" stroke={CLAUDE.surfaceOverlay} strokeWidth="3" />
        <motion.circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={CLAUDE.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduced ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={LIVING_MOTION.confidence}
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="23" textAnchor="middle" className="fill-current text-[9px] font-medium tabular-nums" style={{ color: CLAUDE.text }}>
          {value}
        </text>
      </svg>
      <span
        className="pointer-events-none absolute -bottom-8 right-0 z-20 hidden w-48 rounded-lg px-2 py-1.5 text-[11px] leading-snug group-hover:block"
        style={{ backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.textMuted, boxShadow: `0 0 0 1px ${CLAUDE.hairline}` }}
        role="tooltip"
      >
        {tip}
      </span>
    </div>
  );
}

export function SafetyStrip({
  mode,
}: {
  mode: "draft" | "live" | "deploying";
}) {
  const copy =
    mode === "live"
      ? { text: "Live in production regions", tone: CLAUDE.validated, bg: CLAUDE.validatedMuted }
      : mode === "deploying"
        ? { text: "Deploying — rollback armed", tone: CLAUDE.accentTeal, bg: CLAUDE.accentTealMuted }
        : {
            text: "Nothing deploys until you approve — draft only",
            tone: CLAUDE.warning,
            bg: CLAUDE.warningMuted,
          };

  return (
    <div
      className="flex shrink-0 items-center gap-2 border-b px-4 py-1.5 md:px-5"
      style={{ borderColor: CLAUDE.hairline, backgroundColor: copy.bg }}
      role="status"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse" style={{ backgroundColor: copy.tone }} />
      <p className={cn(COPILOT_TYPE.caption, "font-medium")} style={{ color: copy.tone }}>
        {copy.text}
      </p>
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
      <p className="min-w-0 flex-1 truncate text-[13px]" style={{ color: CLAUDE.textSecondary }}>
        <span className="font-medium" style={{ color: CLAUDE.textMuted }}>
          Now:{" "}
        </span>
        {message}
      </p>
      {onWhy ? (
        <button
          type="button"
          onClick={onWhy}
          className={cn(COPILOT_FOCUS, "shrink-0 text-[12px] font-medium")}
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
}: {
  id: CanvasSectionId;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-4 rounded-xl transition-[box-shadow] duration-300",
        highlight && "ring-2 ring-offset-2 ring-offset-[#1f1e1b]",
        className,
      )}
      style={highlight ? { boxShadow: `0 0 0 2px ${CLAUDE.primary}` } : undefined}
    >
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
  return (
    <button
      type="button"
      onClick={() => onNavigate(section)}
      className={cn(COPILOT_FOCUS, "font-medium underline decoration-dotted underline-offset-2")}
      style={{ color: CLAUDE.primary }}
    >
      {children}
    </button>
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
      style={{ backgroundColor: CLAUDE.primaryMuted, borderLeftColor: CLAUDE.primary }}
    >
      <span
        className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        style={{ backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.primary }}
      >
        {INSIGHT_KIND_LABEL[kind]}
      </span>
      <p className={cn(COPILOT_TYPE.bodySm, "min-w-0 flex-1 md:text-sm")} style={{ color: CLAUDE.textSecondary }}>
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
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-white/[0.04]",
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
            className={cn(COPILOT_FOCUS, "shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors")}
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
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    onHighlight?.(id);
    window.setTimeout(() => onHighlight?.(null), 2000);
  }
}

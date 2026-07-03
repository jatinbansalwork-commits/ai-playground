"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { resolveEntityProvenance } from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import {
  POLICY_STARTER_SUGGESTIONS,
  POLICY_STARTER_TEMPLATES,
  STARTER_CATEGORY_LABEL,
  starterIcon,
} from "@/components/case-studies/policy-copilot/policy-copilot-starters";
import { CopilotMark } from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import {
  COPILOT_ANALYTICS_METRICS,
  COPILOT_DASHBOARD_STATS,
  type DashboardStatId,
} from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";
import type { CopilotRecentItem } from "@/components/case-studies/policy-copilot/policy-copilot-data";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

export function ConfidenceRing({
  value,
  size = 44,
  label,
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color =
    value >= 80 ? CLAUDE.validated : value >= 50 ? CLAUDE.primary : CLAUDE.warning;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={CLAUDE.hairline}
            strokeWidth={2.5}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={reduced ? false : { strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={LIVING_MOTION.confidence}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[13px] font-medium tabular-nums"
          style={{ color: CLAUDE.text }}
        >
          {Math.round(value)}
        </span>
      </div>
      {label ? (
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.12em]" style={{ color: CLAUDE.textSoft }}>
            Confidence
          </p>
          <p className="text-sm leading-snug" style={{ color: CLAUDE.textSecondary }}>
            {label}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function LivingCard({
  children,
  title,
  subtitle,
  badge,
  delay = 0,
  className,
  accent,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
  delay?: number;
  className?: string;
  accent?: "default" | "success" | "warning" | "insight";
}) {
  const reduced = useReducedMotion();
  const accentBorder =
    accent === "success"
      ? CLAUDE.validatedMuted
      : accent === "warning"
        ? CLAUDE.warningMuted
        : accent === "insight"
          ? CLAUDE.primaryMuted
          : "transparent";

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className={cn("rounded-2xl p-4 md:p-5", className)}
      style={{
        background: `linear-gradient(165deg, ${CLAUDE.surfaceRaised} 0%, ${CLAUDE.surface} 88%)`,
        boxShadow:
          "0 1px 0 rgb(250 249 245 / 0.05) inset, 0 12px 40px rgb(0 0 0 / 0.14)",
        borderLeft: accent ? `2px solid ${accentBorder}` : undefined,
      }}
    >
      {title || badge ? (
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            {title ? (
              <h3 className={COPILOT_TYPE.titleLg} style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}>
                {title}
              </h3>
            ) : null}
            {subtitle ? (
              <p className="mt-0.5 text-sm leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                {subtitle}
              </p>
            ) : null}
          </div>
          {badge}
        </div>
      ) : null}
      {children}
    </motion.article>
  );
}

export function InsightBreadcrumb({
  children,
  delay = 0,
  kind,
  canvasLink,
  onCanvasNavigate,
}: {
  children: React.ReactNode;
  delay?: number;
  kind?: "pattern" | "status" | "evidence";
  canvasLink?: string;
  onCanvasNavigate?: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const labels = { pattern: "Pattern", status: "Status", evidence: "Evidence" };
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="flex items-start gap-2 rounded-xl border-l-[3px] px-3 py-2"
      style={{ backgroundColor: CLAUDE.primaryMuted, borderLeftColor: CLAUDE.primary }}
    >
      {kind ? (
        <span
          className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.primary }}
        >
          {labels[kind]}
        </span>
      ) : (
        <span
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: CLAUDE.primary }}
          aria-hidden
        />
      )}
      <p className={cn(COPILOT_TYPE.bodySm, "min-w-0 flex-1 md:text-sm")} style={{ color: CLAUDE.textSecondary }}>
        {children}
        {canvasLink && onCanvasNavigate ? (
          <>
            {" "}
            <button
              type="button"
              onClick={() => onCanvasNavigate(canvasLink)}
              className={cn(COPILOT_FOCUS, "font-medium underline decoration-dotted underline-offset-2")}
              style={{ color: CLAUDE.primary }}
            >
              canvas
            </button>
          </>
        ) : null}
      </p>
    </motion.div>
  );
}

export function EntityChip({
  term,
  resolved,
  type,
  state = "confirmed",
  delay = 0,
}: {
  term: string;
  resolved: string;
  type?: string;
  state?: "suggested" | "confirmed" | "thinking";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const provenance = type ? resolveEntityProvenance(resolved, type) : null;
  const tip = provenance
    ? `${provenance.source} · ${provenance.objectId}\nSynced ${provenance.synced} · Owner ${provenance.owner}`
    : undefined;

  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="flex flex-col gap-1 rounded-xl px-3 py-2"
      title={tip}
      style={{
        backgroundColor:
          state === "thinking" ? CLAUDE.surfaceOverlay : CLAUDE.surfaceRaised,
        boxShadow: "0 1px 0 rgb(250 249 245 / 0.03) inset",
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className={COPILOT_TYPE.caption} style={{ color: CLAUDE.textMuted }}>
          {term}
        </span>
        {provenance ? (
          <span
            className="rounded px-1 py-0.5 text-[9px] font-medium uppercase tracking-wide"
            style={{ backgroundColor: CLAUDE.primaryMuted, color: CLAUDE.primary }}
          >
            {provenance.source}
          </span>
        ) : null}
      </div>
      <span
        className="text-sm font-medium"
        style={{
          fontFamily: CLAUDE.fontMono,
          fontSize: "0.8125rem",
          color:
            state === "confirmed"
              ? CLAUDE.primary
              : state === "thinking"
                ? CLAUDE.textMuted
                : CLAUDE.textSecondary,
        }}
      >
        {resolved}
      </span>
    </motion.div>
  );
}

export function SafetyCheckRow({
  label,
  status,
  detail,
  delay = 0,
}: {
  label: string;
  status: "pending" | "running" | "pass" | "warn";
  detail?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const iconColor =
    status === "pass"
      ? CLAUDE.validated
      : status === "warn"
        ? CLAUDE.warning
        : status === "running"
          ? CLAUDE.primary
          : CLAUDE.textSoft;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="flex items-start gap-2.5 py-1.5"
    >
      <motion.span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        initial={false}
        animate={
          status === "pass" && !reduced
            ? { scale: [1, 1.2, 1], opacity: 1 }
            : status === "running" && !reduced
              ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }
              : { scale: 1, opacity: 1 }
        }
        transition={
          status === "pass"
            ? { ...LIVING_MOTION.confirm, duration: 0.45 }
            : status === "running"
              ? LIVING_MOTION.breathe
              : undefined
        }
        style={{
          backgroundColor:
            status === "pass"
              ? CLAUDE.validatedMuted
              : status === "warn"
                ? CLAUDE.warningMuted
                : CLAUDE.primaryMuted,
        }}
      >
        {status === "pass" ? (
          <svg className="h-2.5 w-2.5" viewBox="0 0 8 8" fill="none" style={{ color: iconColor }}>
            <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ) : status === "running" ? (
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: iconColor }} />
        ) : (
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: iconColor }} />
        )}
      </motion.span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
          {label}
        </p>
        {detail ? (
          <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
            {detail}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function SafetyChecksSummary({ count, lastRunSec }: { count: number; lastRunSec?: number }) {
  return (
    <div
      className="flex items-center justify-between gap-2.5 rounded-xl px-3 py-2.5"
      style={{ backgroundColor: CLAUDE.validatedMuted }}
    >
      <div className="flex items-center gap-2.5">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: CLAUDE.validated }}
      >
        <svg className="h-3 w-3 text-white" viewBox="0 0 8 8" fill="none" aria-hidden>
          <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium" style={{ color: CLAUDE.validated }}>
          {count} safety checks passed
        </p>
        <p className="text-[13px]" style={{ color: CLAUDE.textSecondary }}>
          HIPAA · blast radius · conflicts · privilege paths
        </p>
      </div>
      </div>
      {lastRunSec != null ? (
        <p className="shrink-0 text-[11px] tabular-nums" style={{ color: CLAUDE.textMuted }}>
          Last run {lastRunSec}s ago
        </p>
      ) : null}
    </div>
  );
}

export function CanvasActionDock({
  pendingCount,
  actions,
  onReady,
  readyLabel = "Ready to approve",
  showReady,
}: {
  pendingCount: number;
  actions: { id: string; label: string; onClick: () => void }[];
  onReady?: () => void;
  readyLabel?: string;
  showReady?: boolean;
}) {
  const reduced = useReducedMotion();
  if (pendingCount === 0 && !showReady) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={LIVING_MOTION.discover}
      className="shrink-0 border-t px-4 py-3 md:px-5"
      style={{
        borderColor: pendingCount > 0 ? CLAUDE.primaryBorder : CLAUDE.hairline,
        boxShadow: pendingCount > 0 ? `0 -8px 32px rgb(92 151 238 / 0.12)` : undefined,
        background: `linear-gradient(180deg, rgb(24 23 21 / 0.72) 0%, ${CLAUDE.surface} 40%)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-2">
        {pendingCount > 0 ? (
          <>
            <p className="mr-1 text-[13px] font-medium" style={{ color: CLAUDE.text }}>
              {pendingCount} optional {pendingCount === 1 ? "action" : "actions"}
            </p>
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className={cn(
                  COPILOT_FOCUS,
                  COPILOT_TARGET.chip,
                  "rounded-full border text-[13px] font-medium transition-colors hover:bg-white/[0.06]",
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
          </>
        ) : null}
        {showReady && onReady ? (
          <button
            type="button"
            onClick={onReady}
            className={cn(
              COPILOT_FOCUS,
              COPILOT_TARGET.chip,
              "rounded-full px-3 text-[13px] font-medium text-white transition-opacity hover:opacity-90",
              pendingCount > 0 ? "ml-auto" : "",
            )}
            style={{ backgroundColor: CLAUDE.primary }}
          >
            {readyLabel}
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

export function RecommendationTile({
  title,
  why,
  tradeoff,
  applied,
  onApply,
  delay = 0,
}: {
  title: string;
  why: string;
  tradeoff: string;
  applied: boolean;
  onApply: () => void;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="rounded-xl p-3"
      style={{
        backgroundColor: applied ? CLAUDE.validatedMuted : CLAUDE.surfaceOverlay,
        boxShadow: applied ? `0 0 0 1px ${CLAUDE.validatedMuted}` : undefined,
      }}
    >
      <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
        {title}
      </p>
      <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
        <span style={{ color: CLAUDE.textSecondary }}>Why: </span>
        {why}
      </p>
      <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSoft }}>
        Trade-off: {tradeoff}
      </p>
      {!applied ? (
        <button
          type="button"
          onClick={onApply}
          className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "mt-2.5 rounded-full px-3 text-[13px] font-medium transition-opacity hover:opacity-90")}
          style={{ backgroundColor: CLAUDE.primary, color: "#fff" }}
        >
          Apply
        </button>
      ) : (
        <p className="mt-2 text-xs font-medium" style={{ color: CLAUDE.validated }}>
          Applied
        </p>
      )}
    </motion.div>
  );
}

export function ThreadMessage({
  role,
  children,
  time,
  delay = 0,
  insightKind,
  canvasLink,
  onCanvasNavigate,
}: {
  role: "copilot" | "user" | "insight";
  children: ReactNode;
  time?: string;
  delay?: number;
  insightKind?: "pattern" | "status" | "evidence";
  canvasLink?: string;
  onCanvasNavigate?: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const isUser = role === "user";

  if (role === "insight") {
    return (
      <InsightBreadcrumb delay={delay} kind={insightKind} canvasLink={canvasLink} onCanvasNavigate={onCanvasNavigate}>
        {children}
      </InsightBreadcrumb>
    );
  }

  const bubbleStyle = isUser
    ? { backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.textSecondary }
    : {
        backgroundColor: CLAUDE.surfaceRaised,
        color: CLAUDE.textSecondary,
        boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}, inset 3px 0 0 0 ${CLAUDE.primary}55`,
      };

  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className={cn("flex max-w-[95%] gap-2", isUser ? "self-end flex-row-reverse" : "self-start")}
    >
      {!isUser ? <CopilotMark size={24} /> : null}
      <div className="min-w-0 flex-1 rounded-2xl px-4 py-3" style={bubbleStyle}>
        <div className="mb-1 flex items-center gap-2">
          <p className={cn(COPILOT_TYPE.caption, "font-medium")} style={{ color: CLAUDE.textMuted }}>
            {isUser ? "You" : "Copilot"}
          </p>
          {time ? (
            <p className={cn("ml-auto tabular-nums", COPILOT_TYPE.caption)} style={{ color: CLAUDE.textMuted }}>
              {time}
            </p>
          ) : null}
        </div>
        <div className={COPILOT_TYPE.body}>{children}</div>
      </div>
    </motion.div>
  );
}

export function TopologyLive({
  showNurses = true,
  animateLines = true,
}: {
  showNurses?: boolean;
  animateLines?: boolean;
}) {
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState<"doctors" | "nurses" | "ehr" | null>(null);

  const w = 400;
  const h = 132;
  const ehr = { x: 318, y: h / 2 };
  const doctors = { x: 72, y: 44 };
  const nurses = { x: 72, y: 88 };

  const allowPath = `M ${doctors.x + 36} ${doctors.y} C 160 ${doctors.y}, 220 ${ehr.y}, ${ehr.x - 40} ${ehr.y}`;
  const denyPath = `M ${nurses.x + 36} ${nurses.y} C 160 ${nurses.y}, 220 ${ehr.y}, ${ehr.x - 40} ${ehr.y}`;

  const pathTransition = reduced
    ? { duration: 0 }
    : { duration: 0.85, ease: LIVING_MOTION.confidence.ease };

  const focusDetail =
    focus === "doctors"
      ? "Doctors-AD-Group → EHR-App · allow · logged"
      : focus === "nurses"
        ? "Nurses-AD-Group → EHR-App · deny · logged"
        : focus === "ehr"
          ? "Protected application · HIPAA ePHI profile"
          : "Hover a path to inspect";

  return (
    <div className="relative py-2">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full select-none"
        role="img"
        aria-label="Access topology: doctors allowed to EHR, nurses denied"
      >
        <defs>
          <linearGradient id="topo-allow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={CLAUDE.validated} stopOpacity="0.15" />
            <stop offset="100%" stopColor={CLAUDE.validated} stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="topo-deny-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={CLAUDE.risk} stopOpacity="0.1" />
            <stop offset="100%" stopColor={CLAUDE.risk} stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Allow path */}
        <motion.path
          d={allowPath}
          fill="none"
          stroke={focus === "doctors" ? CLAUDE.validated : "rgb(93 184 114 / 0.55)"}
          strokeWidth={focus === "doctors" ? 2.5 : 1.75}
          strokeLinecap="round"
          initial={animateLines && !reduced ? { pathLength: 0, opacity: 0 } : false}
          animate={{
            pathLength: 1,
            opacity: focus === "nurses" ? 0.35 : 1,
          }}
          transition={pathTransition}
          style={{ pathLength: animateLines ? undefined : 1 }}
        />
        {focus === "doctors" && !reduced ? (
          <motion.path
            d={allowPath}
            fill="none"
            stroke="url(#topo-allow-glow)"
            strokeWidth={8}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition}
          />
        ) : null}

        {/* Deny path */}
        {showNurses ? (
          <motion.path
            d={denyPath}
            fill="none"
            stroke={focus === "nurses" ? CLAUDE.risk : "rgb(198 69 69 / 0.5)"}
            strokeWidth={focus === "nurses" ? 2.5 : 1.75}
            strokeDasharray="6 5"
            strokeLinecap="round"
            initial={animateLines && !reduced ? { pathLength: 0, opacity: 0 } : false}
            animate={{
              pathLength: 1,
              opacity: focus === "doctors" ? 0.35 : 1,
            }}
            transition={{ ...pathTransition, delay: reduced ? 0 : 0.35 }}
            style={{ pathLength: animateLines ? undefined : 1 }}
          />
        ) : null}

        {/* Traveling pulse — allow path */}
        {animateLines && !reduced && focus !== "nurses" ? (
          <circle r={3} fill={CLAUDE.validated} opacity={0}>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="2.2s"
              repeatCount="indefinite"
              begin="0.9s"
            />
            <animateMotion
              dur="2.2s"
              repeatCount="indefinite"
              path={allowPath}
              begin="0.9s"
            />
          </circle>
        ) : null}

        {/* Hit areas */}
        <path
          d={allowPath}
          fill="none"
          stroke="transparent"
          strokeWidth={16}
          className="cursor-pointer"
          onMouseEnter={() => setFocus("doctors")}
          onMouseLeave={() => setFocus((f) => (f === "doctors" ? null : f))}
        />
        {showNurses ? (
          <path
            d={denyPath}
            fill="none"
            stroke="transparent"
            strokeWidth={16}
            className="cursor-pointer"
            onMouseEnter={() => setFocus("nurses")}
            onMouseLeave={() => setFocus((f) => (f === "nurses" ? null : f))}
          />
        ) : null}

        <TopologyNode
          x={doctors.x}
          y={doctors.y}
          label="Doctors"
          active={focus === "doctors"}
          delay={0.15}
          animateIn={animateLines}
          onEnter={() => setFocus("doctors")}
          onLeave={() => setFocus((f) => (f === "doctors" ? null : f))}
        />
        {showNurses ? (
          <TopologyNode
            x={nurses.x}
            y={nurses.y}
            label="Nurses"
            active={focus === "nurses"}
            delay={0.45}
            animateIn={animateLines}
            variant="risk"
            onEnter={() => setFocus("nurses")}
            onLeave={() => setFocus((f) => (f === "nurses" ? null : f))}
          />
        ) : null}
        <TopologyNode
          x={ehr.x}
          y={ehr.y}
          label="EHR"
          active={focus === "ehr"}
          delay={0.05}
          animateIn={animateLines}
          variant="destination"
          onEnter={() => setFocus("ehr")}
          onLeave={() => setFocus((f) => (f === "ehr" ? null : f))}
        />

        {/* Edge badges */}
        <motion.g
          initial={animateLines && !reduced ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...pathTransition, delay: 0.55 }}
          style={{ transformOrigin: "200px 44px" }}
        >
          <rect x={178} y={36} width={44} height={16} rx={8} fill={CLAUDE.validatedMuted} />
          <text
            x={200}
            y={47}
            textAnchor="middle"
            fill={CLAUDE.validated}
            fontSize={9}
            fontWeight={600}
          >
            Allow
          </text>
        </motion.g>
        {showNurses ? (
          <motion.g
            initial={animateLines && !reduced ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...pathTransition, delay: 0.75 }}
            style={{ transformOrigin: "200px 88px" }}
          >
            <rect x={178} y={80} width={40} height={16} rx={8} fill={CLAUDE.riskMuted} />
            <text
              x={198}
              y={91}
              textAnchor="middle"
              fill={CLAUDE.risk}
              fontSize={9}
              fontWeight={600}
            >
              Deny
            </text>
          </motion.g>
        ) : null}
      </svg>

      <motion.p
        key={focusDetail}
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-center text-xs leading-relaxed"
        style={{ color: focus ? CLAUDE.textSecondary : CLAUDE.textSoft }}
      >
        {focusDetail}
      </motion.p>

      <motion.p
        className="mt-1 flex items-center justify-center gap-1.5 text-center text-xs"
        style={{ color: CLAUDE.textSoft }}
        animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="inline-block h-1 w-1 rounded-full"
          style={{ backgroundColor: CLAUDE.primary }}
          aria-hidden
        />
        Audit logging on every path
      </motion.p>
    </div>
  );
}

function TopologyNode({
  x,
  y,
  label,
  active,
  delay,
  animateIn,
  variant = "source",
  onEnter,
  onLeave,
}: {
  x: number;
  y: number;
  label: string;
  active: boolean;
  delay: number;
  animateIn: boolean;
  variant?: "source" | "destination" | "risk";
  onEnter: () => void;
  onLeave: () => void;
}) {
  const reduced = useReducedMotion();
  const width = variant === "destination" ? 56 : 52;
  const height = 28;
  const rx = 10;
  const fill =
    variant === "destination"
      ? CLAUDE.surfaceRaised
      : active
        ? variant === "risk"
          ? CLAUDE.riskMuted
          : CLAUDE.validatedMuted
        : CLAUDE.surfaceOverlay;
  const stroke =
    active && variant === "risk"
      ? CLAUDE.risk
      : active
        ? CLAUDE.validated
        : "rgb(250 249 245 / 0.08)";

  return (
    <motion.g
      initial={animateIn && !reduced ? { opacity: 0, scale: 0.88 } : false}
      animate={{ opacity: 1, scale: active ? 1.04 : 1 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 1.5 : 1}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={CLAUDE.text}
        fontSize={10}
        fontWeight={500}
      >
        {label}
      </text>
    </motion.g>
  );
}

export function NextActionHint({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm leading-snug", className)} style={{ color: CLAUDE.textMuted }}>
      <span style={{ color: CLAUDE.textSecondary }}>Next: </span>
      {children}
    </p>
  );
}

function PreviewStatusBadge({
  status,
  label,
}: {
  status: "waiting" | "building" | "validating" | "ready" | "excellent";
  label: string;
}) {
  const styles = {
    waiting: { bg: CLAUDE.surfaceOverlay, color: CLAUDE.textMuted, border: CLAUDE.border },
    building: { bg: CLAUDE.primaryMuted, color: CLAUDE.text, border: CLAUDE.primaryBorder },
    validating: { bg: CLAUDE.primaryMuted, color: CLAUDE.text, border: CLAUDE.primaryBorder },
    ready: { bg: CLAUDE.warningMuted, color: CLAUDE.text, border: "rgb(232 165 90 / 0.35)" },
    excellent: { bg: CLAUDE.validatedMuted, color: CLAUDE.validated, border: "rgb(93 184 114 / 0.35)" },
  }[status];

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: styles.bg,
        color: styles.color,
        borderColor: styles.border,
      }}
    >
      {status === "excellent" ? (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4 8.5l2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : null}
      {label}
    </span>
  );
}

export function LivePolicyPreview({
  status,
  statusLabel,
  slots,
  emptyMessage,
  subtitle = "Updates as you build your policy",
  delay = 0,
}: {
  status: "waiting" | "building" | "validating" | "ready" | "excellent";
  statusLabel: string;
  slots: {
    id: string;
    label: string;
    value?: string;
    badge?: string;
    state: "empty" | "partial" | "filled";
  }[];
  emptyMessage: string;
  subtitle?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const isWaiting = status === "waiting";

  return (
    <LivingCard
      title="Live policy preview"
      subtitle={subtitle}
      delay={delay}
      badge={<PreviewStatusBadge status={status} label={statusLabel} />}
    >
      {isWaiting ? (
        <div
          className="mb-3 rounded-xl border border-dashed px-4 py-8 text-center"
          style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceOverlay }}
        >
          <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textMuted }}>
            {emptyMessage}
          </p>
        </div>
      ) : null}
      <div className="space-y-2">
        {slots.map((slot, i) => (
          <motion.div
            key={slot.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...LIVING_MOTION.discover, delay: delay + i * 0.04 }}
            className="rounded-xl px-3 py-2.5"
            style={{
              backgroundColor:
                slot.state === "empty" ? CLAUDE.surfaceOverlay : CLAUDE.surfaceRaised,
              boxShadow:
                slot.state === "filled"
                  ? `inset 0 0 0 1px ${CLAUDE.hairline}`
                  : undefined,
              opacity: slot.state === "empty" ? 0.72 : 1,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                {slot.label}
              </p>
              {slot.badge ? (
                <span
                  className="shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums"
                  style={{
                    backgroundColor: CLAUDE.primaryMuted,
                    color: CLAUDE.primary,
                  }}
                >
                  {slot.badge}
                </span>
              ) : null}
            </div>
            {slot.value ? (
              <p className="mt-1 text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
                {slot.value}
              </p>
            ) : slot.state === "empty" ? (
              <p className="mt-1 text-xs italic" style={{ color: CLAUDE.textSoft }}>
                —
              </p>
            ) : null}
          </motion.div>
        ))}
      </div>
    </LivingCard>
  );
}

export function TechnicalRulesPanel({
  allow,
  deny,
  delay = 0,
}: {
  allow: string;
  deny: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
    >
      <LivingCard
        title="Technical rule set"
        subtitle="Plain English above · ACL for administrator validation"
        delay={0}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            COPILOT_FOCUS,
            "text-sm font-medium transition-opacity hover:opacity-80",
          )}
          style={{ color: CLAUDE.primary }}
          aria-expanded={open}
        >
          {open ? "Hide ACL lines" : "View ACL lines"}
        </button>
        {open ? (
          <div
            className="mt-3 space-y-2 rounded-xl border p-3 font-mono text-xs leading-relaxed"
            style={{
              borderColor: CLAUDE.border,
              backgroundColor: CLAUDE.surfaceOverlay,
              color: CLAUDE.textSecondary,
            }}
          >
            <p>
              <span style={{ color: CLAUDE.validated }}>allow </span>
              {allow.replace(/^permit application /, "")}
            </p>
            <p>
              <span style={{ color: CLAUDE.risk }}>deny </span>
              {deny.replace(/^deny application /, "")}
            </p>
          </div>
        ) : null}
      </LivingCard>
    </motion.div>
  );
}

export function InviteCopilotMessage({ examples }: { examples: readonly string[] }) {
  return (
    <ThreadMessage role="copilot" delay={0}>
      <div className="space-y-2">
        <p>
          Hi — I help you turn business language into reviewable firewall policies. Describe what you
          need in plain English.
        </p>
        <p style={{ color: CLAUDE.textMuted }}>What do you want to protect? For example:</p>
        <ul className="list-disc space-y-1 pl-4" style={{ color: CLAUDE.textSecondary }}>
          {examples.map((ex) => (
            <li key={ex}>{ex}</li>
          ))}
        </ul>
      </div>
    </ThreadMessage>
  );
}

/** Single-focus invite — centred hero, no split layout or empty preview. */
export function InviteFocusHero({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={LIVING_MOTION.discover}
      className={cn(
        "flex flex-col items-center text-center",
        compact ? "max-w-xl px-2" : "max-w-lg px-6",
      )}
    >
      <CopilotMark size={compact ? 36 : 44} glow={!compact} />
      <h1
        className={cn(
          "font-normal leading-snug tracking-tight",
          compact ? "mt-4 text-xl md:text-[1.35rem]" : "mt-6 text-[1.35rem] md:text-2xl",
        )}
        style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
      >
        What should this policy do?
      </h1>
      <p
        className={cn("leading-relaxed", compact ? "mt-2 text-sm" : "mt-3 text-sm md:text-[15px]")}
        style={{ color: CLAUDE.textMuted }}
      >
        Pick a template, try a suggestion, or describe intent in plain language.
      </p>
    </motion.div>
  );
}

export function InviteStarterPanel({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <InviteFocusHero compact />

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 className="text-sm font-medium" style={{ color: CLAUDE.text }}>
            Templates
          </h2>
          <p className={cn(COPILOT_TYPE.caption)} style={{ color: CLAUDE.textMuted }}>
            Scenario-specific starting points
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {POLICY_STARTER_TEMPLATES.map((template, i) => (
            <motion.button
              key={template.id}
              type="button"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
              onClick={() => onSelect(template.prompt)}
              className={cn(COPILOT_FOCUS, "rounded-xl border p-3.5 text-left")}
              style={{
                borderColor: template.featured ? CLAUDE.primaryBorder : CLAUDE.hairline,
                backgroundColor: template.featured ? CLAUDE.primaryMuted : CLAUDE.surfaceRaised,
                boxShadow: template.featured ? undefined : `inset 0 0 0 1px ${CLAUDE.hairline}`,
              }}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base"
                  style={{ backgroundColor: CLAUDE.surfaceOverlay }}
                  aria-hidden
                >
                  {starterIcon(template.prompt)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug" style={{ color: CLAUDE.text }}>
                    {template.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                    {template.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span
                      className={cn(COPILOT_TYPE.caption, "rounded px-1.5 py-0.5 font-medium")}
                      style={{ backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.textSoft }}
                    >
                      {STARTER_CATEGORY_LABEL[template.category]}
                    </span>
                    {template.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={cn(COPILOT_TYPE.caption, "rounded px-1.5 py-0.5")}
                        style={{ color: CLAUDE.textMuted }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3">
          <h2 className="text-sm font-medium" style={{ color: CLAUDE.text }}>
            Suggestions
          </h2>
          <p className={cn("mt-0.5", COPILOT_TYPE.caption)} style={{ color: CLAUDE.textMuted }}>
            Quick prompts — I&apos;ll match the closest scenario and clarify before drafting
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {POLICY_STARTER_SUGGESTIONS.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...LIVING_MOTION.discover, delay: 0.12 + i * 0.04 }}
              onClick={() => onSelect(item.text)}
              className={cn(
                COPILOT_FOCUS,
                "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors hover:bg-white/[0.03]",
              )}
              style={{
                borderColor: CLAUDE.hairline,
                backgroundColor: CLAUDE.surfaceRaised,
              }}
              title={item.hint}
            >
              <span className="text-sm leading-snug" style={{ color: CLAUDE.textSecondary }}>
                {item.text}
              </span>
              <span className={cn(COPILOT_TYPE.caption, "shrink-0")} style={{ color: CLAUDE.primary }}>
                Use →
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ThreadSuggestions({
  label = "Suggestions",
  items,
  onSelect,
  className,
  variant = "inline",
}: {
  label?: string;
  items: { id: string; text: string; primary?: boolean; consequence?: string }[];
  onSelect: (id: string, text: string) => void;
  className?: string;
  variant?: "inline" | "dock";
}) {
  const reduced = useReducedMotion();
  if (items.length === 0) return null;

  const isDock = variant === "dock";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={LIVING_MOTION.discover}
      className={cn("shrink-0", isDock ? "px-4 py-2.5 md:px-5" : "border-t pt-2.5", className)}
      style={
        isDock
          ? {
              borderColor: CLAUDE.hairline,
              backgroundColor: CLAUDE.surface,
            }
          : { borderColor: CLAUDE.hairline }
      }
    >
      <p
        className={cn(
          "font-medium",
          isDock ? cn("mb-2", COPILOT_TYPE.bodySm) : cn("mb-1.5", COPILOT_TYPE.eyebrow),
        )}
        style={{ color: isDock ? CLAUDE.textSecondary : CLAUDE.textSoft }}
      >
        {label}
      </p>
      <div className={cn("flex flex-wrap gap-1.5", isDock && "gap-2")}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            onClick={() => onSelect(item.id, item.text)}
            title={item.consequence}
            className={cn(
              COPILOT_FOCUS,
              COPILOT_TARGET.chip,
              "rounded-full border font-medium leading-snug transition-colors hover:bg-white/[0.04]",
              isDock ? "px-3 text-[13px]" : "px-3 text-sm",
            )}
            style={
              item.primary
                ? {
                    borderColor: CLAUDE.primaryBorder,
                    backgroundColor: CLAUDE.primaryMuted,
                    color: CLAUDE.text,
                  }
                : {
                    borderColor: CLAUDE.border,
                    backgroundColor: CLAUDE.surfaceOverlay,
                    color: CLAUDE.textMuted,
                  }
            }
          >
            {item.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export function WhatIfSuggestionCard({
  summary,
  prompt,
  options,
  onSelect,
  selectedId,
}: {
  summary: string;
  prompt: string;
  options: { id: string; label: string }[];
  onSelect: (id: string) => void;
  selectedId?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <LivingCard title="What if?" subtitle="Optional — refine before I analyse" accent="insight" delay={0.04}>
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {summary}
      </p>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: CLAUDE.text }}>
        {prompt}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            type="button"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...LIVING_MOTION.discover, delay: 0.06 + i * 0.04 }}
            onClick={() => onSelect(opt.id)}
            className={cn(
              COPILOT_FOCUS,
              COPILOT_TARGET.chip,
              "rounded-full border px-3 text-[13px] font-medium transition-colors hover:bg-white/[0.05]",
            )}
            style={
              selectedId === opt.id
                ? {
                    borderColor: CLAUDE.primaryBorder,
                    backgroundColor: CLAUDE.primaryMuted,
                    color: CLAUDE.text,
                  }
                : {
                    borderColor: CLAUDE.border,
                    backgroundColor: CLAUDE.surfaceOverlay,
                    color: CLAUDE.textSecondary,
                  }
            }
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </LivingCard>
  );
}

/** Ghost loading while the copilot analyses intent — before clarify canvas. */
export function IntentAnalyzingSkeleton({ intent }: { intent: string }) {
  const reduced = useReducedMotion();
  const rows = ["Users", "Application", "Devices", "Assumptions"];
  const [activeRow, setActiveRow] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const rowTimer = window.setInterval(() => setActiveRow((r) => (r + 1) % rows.length), reduced ? 200 : 420);
    const elapsedTimer = window.setInterval(() => setElapsed((e) => Math.round((e + 0.1) * 10) / 10), 100);
    return () => {
      clearInterval(rowTimer);
      clearInterval(elapsedTimer);
    };
  }, [reduced, rows.length]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={LIVING_MOTION.discover}
      className="flex flex-col gap-4"
      aria-busy
      aria-label="Analysing your intent"
    >
      <div
        className="rounded-xl px-4 py-3"
        style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
      >
        <p className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.1em]")} style={{ color: CLAUDE.textSoft }}>
          Your intent
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: CLAUDE.text, fontFamily: CLAUDE.fontDisplay }}>
          {intent}
        </p>
      </div>

      <LivingCard
        title="My understanding"
        subtitle="Analysing who, what, and where…"
        accent="insight"
        delay={0}
        badge={
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium"
            style={{
              borderColor: CLAUDE.primaryBorder,
              backgroundColor: CLAUDE.primaryMuted,
              color: CLAUDE.text,
            }}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: CLAUDE.primary }} />
            Working · {elapsed.toFixed(1)}s
          </span>
        }
      >
        <div className="space-y-2">
          {rows.map((label, i) => {
            const active = i === activeRow;
            const done = i < activeRow;
            return (
            <div
              key={label}
              className="rounded-lg px-3 py-2.5"
              style={{
                backgroundColor: active ? CLAUDE.primaryMuted : CLAUDE.surfaceOverlay,
                boxShadow: active ? `inset 0 0 0 1px ${CLAUDE.primaryBorder}` : undefined,
              }}
            >
              <p className="flex items-center gap-2">
                <span
                  className={cn(COPILOT_TYPE.caption, "font-medium")}
                  style={{ color: active ? CLAUDE.text : CLAUDE.textSoft }}
                >
                  {label}
                </span>
                {done ? (
                  <span className="text-[10px] font-medium" style={{ color: CLAUDE.validated }} aria-hidden>
                    ✓
                  </span>
                ) : active ? (
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: CLAUDE.primary }} />
                ) : null}
              </p>
              <div
                className={cn("mt-2 h-3.5 rounded", !done && "animate-pulse")}
                style={{
                  backgroundColor: done ? CLAUDE.validatedMuted : CLAUDE.hairline,
                  width: done ? "100%" : `${68 + i * 8}%`,
                  animationDelay: `${i * 120}ms`,
                }}
              />
            </div>
          );
          })}
        </div>
      </LivingCard>
    </motion.div>
  );
}

export function UnderstandingReflectionCard({
  reflection,
  delay = 0,
  patternHint,
}: {
  reflection: {
    lead: string;
    users: { label: string; value: string; certainty?: "explicit" | "inferred" }[];
    application: { label: string; value: string; certainty?: "explicit" | "inferred" };
    devices: { label: string; value: string; certainty?: "explicit" | "inferred" };
    assumptions: string[];
    uncertainties: { id: string; question: string; detail: string }[];
    confirmPrompt: string;
  };
  delay?: number;
  patternHint?: string;
}) {
  const reduced = useReducedMotion();

  function certaintyBadge(certainty?: "explicit" | "inferred") {
    if (!certainty || certainty === "explicit") return null;
    return (
      <span
        className="ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
        style={{ backgroundColor: CLAUDE.warningMuted, color: CLAUDE.warning }}
      >
        Inferred
      </span>
    );
  }

  function FieldRow({
    label,
    value,
    certainty,
  }: {
    label: string;
    value: string;
    certainty?: "explicit" | "inferred";
  }) {
    return (
      <div
        className="rounded-lg px-3 py-2.5"
        style={{ backgroundColor: CLAUDE.surfaceOverlay }}
      >
        <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
          {label}
          {certaintyBadge(certainty)}
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
          {value}
        </p>
      </div>
    );
  }

  return (
    <LivingCard
      title="My understanding"
      subtitle="Reflection before draft — confirm or correct"
      accent="insight"
      delay={delay}
      badge={
        patternHint ? (
          <span
            className="max-w-[200px] truncate rounded-full border px-2 py-0.5 text-[10px] font-medium"
            style={{
              borderColor: CLAUDE.primaryBorder,
              backgroundColor: CLAUDE.primaryMuted,
              color: CLAUDE.text,
            }}
            title={patternHint}
          >
            Pattern match
          </span>
        ) : (
        <span
          className="rounded-full border px-2 py-0.5 text-xs font-medium"
          style={{
            borderColor: CLAUDE.primaryBorder,
            backgroundColor: CLAUDE.primaryMuted,
            color: CLAUDE.text,
          }}
        >
          No draft yet
        </span>
        )
      }
    >
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {reflection.lead}
      </p>

      <div className="mt-4 space-y-2">
        {reflection.users.map((row) => (
          <FieldRow key={`${row.label}-${row.value}`} {...row} />
        ))}
        <FieldRow {...reflection.application} />
        <FieldRow {...reflection.devices} />
      </div>

      <div className="mt-4">
        <p className={cn(COPILOT_TYPE.eyebrow, "mb-2")} style={{ color: CLAUDE.textMuted }}>
          Assumptions I am making
        </p>
        <ul className="space-y-1.5">
          {reflection.assumptions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed"
              style={{ color: CLAUDE.textMuted }}
            >
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: CLAUDE.textSoft }}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {reflection.uncertainties.length > 0 ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LIVING_MOTION.discover, delay: delay + 0.08 }}
          className="mt-4 rounded-xl px-3 py-3"
          style={{
            backgroundColor: CLAUDE.warningMuted,
            boxShadow: `inset 0 0 0 1px rgb(232 165 90 / 0.25)`,
          }}
        >
          <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.warning }}>
            I need clarification
          </p>
          <ul className="mt-2 space-y-2">
            {reflection.uncertainties.map((u) => (
              <li key={u.id}>
                <p className="text-sm font-medium" style={{ color: CLAUDE.text }}>
                  {u.question}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                  {u.detail}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}

      <p className="mt-4 text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {reflection.confirmPrompt}
      </p>
    </LivingCard>
  );
}

export function InterpretationScopeCard({
  body,
  learnMore,
  learnMoreOpen,
  onToggleLearnMore,
}: {
  body: string;
  learnMore: string;
  learnMoreOpen: boolean;
  onToggleLearnMore: () => void;
}) {
  return (
    <LivingCard title="Here's How I'll Apply Your Intent" subtitle="Plain-language confirmation" delay={0.08}>
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {body}
      </p>
      <button
        type="button"
        onClick={onToggleLearnMore}
        className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "mt-2 text-[13px] font-medium transition-opacity hover:opacity-80")}
        style={{ color: CLAUDE.primary }}
      >
        {learnMoreOpen ? "Hide details" : "Learn more"}
      </button>
      {learnMoreOpen ? (
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {learnMore}
        </p>
      ) : null}
    </LivingCard>
  );
}

export function RelatedRolesPanel({
  primaryRole,
  roles,
  enabled,
  onToggle,
}: {
  primaryRole: string;
  roles: { id: string; label: string; hint: string }[];
  enabled: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <LivingCard title="Related roles" subtitle={`${primaryRole} is in scope — others are opt-in only`} delay={0.1}>
      <p className="mb-2 text-[13px]" style={{ color: CLAUDE.textMuted }}>
        In similar policies, teams often review access for:
      </p>
      <div className="space-y-1.5">
        {roles.map((role) => {
          const on = enabled[role.id] ?? false;
          return (
            <label
              key={role.id}
              className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.03]"
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(role.id)}
                className="mt-0.5 h-3 w-3 shrink-0 rounded border accent-[#5C97EE]"
                style={{ borderColor: CLAUDE.border }}
              />
              <span className="min-w-0">
                <span className="text-sm font-medium" style={{ color: CLAUDE.text }}>
                  {role.label}
                </span>
                <span className="mt-0.5 block text-[13px]" style={{ color: CLAUDE.textMuted }}>
                  {role.hint}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </LivingCard>
  );
}

export function BlastRadiusPreview({
  summary,
  groups,
  delay = 0,
}: {
  summary: string;
  groups: { label: string; impact: string; tone?: "allow" | "deny" | "warn" }[];
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const toneColor = (tone?: "allow" | "deny" | "warn") =>
    tone === "allow" ? CLAUDE.validated : tone === "warn" ? CLAUDE.warning : CLAUDE.textMuted;

  return (
    <LivingCard title="Blast Radius" subtitle="Who gains or loses access if you approve" accent="warning" delay={delay}>
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {summary}
      </p>
      <div className="mt-3 space-y-2">
        {groups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={reduced ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...LIVING_MOTION.discover, delay: delay + i * 0.05 }}
            className="flex items-start gap-2 rounded-lg px-2.5 py-2"
            style={{ backgroundColor: CLAUDE.surfaceOverlay }}
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: toneColor(group.tone) }}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
                {group.label}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                {group.impact}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </LivingCard>
  );
}

export function RiskInsightCard({
  body,
  actions,
  onAction,
  dismissed,
}: {
  body: string;
  actions: { id: string; label: string }[];
  onAction: (id: string) => void;
  dismissed: boolean;
}) {
  if (dismissed) return null;
  return (
    <LivingCard title="Potential Risk Scenario" subtitle="Business impact — not a compliance lecture" accent="warning" delay={0.06}>
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {body}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action.id)}
            className={cn(
              COPILOT_FOCUS,
              COPILOT_TARGET.chip,
              "rounded-full border px-3 text-[13px] font-medium transition-colors hover:bg-white/[0.05]",
            )}
            style={{
              borderColor: action.id === "risk-continue" ? CLAUDE.border : CLAUDE.primaryBorder,
              backgroundColor: action.id === "risk-continue" ? CLAUDE.surfaceOverlay : CLAUDE.primaryMuted,
              color: CLAUDE.textSecondary,
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </LivingCard>
  );
}

export function ScenarioPreviewPanel({
  previews,
  open,
  onToggle,
}: {
  previews: { id: string; title: string; outcome: string }[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="text-[13px] font-medium transition-opacity hover:opacity-80"
        style={{ color: CLAUDE.primary }}
      >
        {open ? "Hide scenario preview" : "Preview scenarios"}
      </button>
      {open ? (
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="rounded-xl px-2.5 py-2"
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
                {preview.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                {preview.outcome}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PolicyMemoryPanel({
  rule,
  memory,
}: {
  rule: string;
  memory: {
    createdBy: string;
    createdAt: string;
    businessRequirement: string;
    approvedBy: string;
    riskScore: string;
    compliance: string;
    simulation: string;
  };
}) {
  const rows = [
    { label: "Created by", value: memory.createdBy },
    { label: "Created", value: memory.createdAt },
    { label: "Business requirement", value: memory.businessRequirement },
    { label: "Approved by", value: memory.approvedBy },
    { label: "Risk score", value: memory.riskScore },
    { label: "Compliance", value: memory.compliance },
    { label: "Last simulation", value: memory.simulation },
  ];

  return (
    <LivingCard title="Policy memory" subtitle={`Institutional context for ${rule}`} accent="insight" delay={0}>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-lg px-2.5 py-2" style={{ backgroundColor: CLAUDE.surfaceOverlay }}>
            <p className={COPILOT_TYPE.eyebrow} style={{ color: CLAUDE.textMuted }}>
              {row.label}
            </p>
            <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </LivingCard>
  );
}

export function DriftDetectionPanel({
  rule,
  goldenIntent,
  currentState,
  detail,
}: {
  rule: string;
  goldenIntent: string;
  currentState: string;
  detail: string;
}) {
  return (
    <LivingCard title="Drift detected" subtitle={`${rule} diverges from golden intent`} accent="warning" delay={0.08}>
      <div className="space-y-2">
        <div className="rounded-lg px-2.5 py-2" style={{ backgroundColor: CLAUDE.validatedMuted }}>
          <p className={COPILOT_TYPE.eyebrow} style={{ color: CLAUDE.validated }}>
            Golden intent
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
            {goldenIntent}
          </p>
        </div>
        <div
          className="rounded-lg px-2.5 py-2"
          style={{ backgroundColor: CLAUDE.primaryMuted, boxShadow: `inset 0 0 0 1px ${CLAUDE.primaryBorder}` }}
        >
          <p className={COPILOT_TYPE.eyebrow} style={{ color: CLAUDE.primary }}>
            Current state
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
            {currentState}
          </p>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {detail}
        </p>
      </div>
    </LivingCard>
  );
}

export function LegacyDocumentationPanel({
  rule,
  problem,
  risk,
  fields,
  captured,
}: {
  rule: string;
  problem: string;
  risk: string;
  fields: readonly { id: string; label: string; example: string }[];
  captured: Record<string, boolean>;
}) {
  const allCaptured = fields.every((f) => captured[f.id]);

  return (
    <LivingCard
      title="Undocumented rule"
      subtitle={allCaptured ? "Institutional memory complete" : "Missing context — capture before changing anything"}
      accent={allCaptured ? "success" : "warning"}
      delay={0}
    >
      <p className="text-sm leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        <span className="font-medium" style={{ color: CLAUDE.text }}>
          {rule}
        </span>{" "}
        — {problem}
      </p>
      <p className="mt-2 text-[13px]" style={{ color: CLAUDE.textMuted }}>
        Risk: {risk}
      </p>
      <div className="mt-3 space-y-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className="rounded-lg px-2.5 py-2"
            style={{
              backgroundColor: captured[field.id] ? CLAUDE.validatedMuted : CLAUDE.surfaceOverlay,
            }}
          >
            <p className={COPILOT_TYPE.eyebrow} style={{ color: CLAUDE.textMuted }}>
              {field.label}
            </p>
            <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
              {captured[field.id] ? field.example : "Not recorded"}
            </p>
          </div>
        ))}
      </div>
    </LivingCard>
  );
}

export function CopilotDashboardPanel({
  recentItems,
  onOpenPolicy,
  onStartNew,
  onStatSelect,
  resumeDraft,
  onResumeDraft,
}: {
  recentItems: CopilotRecentItem[];
  onOpenPolicy: (item: CopilotRecentItem) => void;
  onStartNew: () => void;
  onStatSelect?: (statId: DashboardStatId) => void;
  resumeDraft?: { label: string; phase: string } | null;
  onResumeDraft?: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <LivingCard title="Policy dashboard" subtitle="Overview across your organisation" delay={0}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {COPILOT_DASHBOARD_STATS.map((stat, i) => {
            const Tag = onStatSelect ? "button" : "div";
            return (
            <motion.div
              key={stat.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...LIVING_MOTION.discover, delay: i * 0.05 }}
              whileHover={onStatSelect && !reduced ? { y: -2 } : undefined}
            >
              <Tag
                type={onStatSelect ? "button" : undefined}
                onClick={onStatSelect ? () => onStatSelect(stat.id) : undefined}
                className={cn(
                  "group w-full rounded-xl px-2.5 py-2 text-left transition-shadow",
                  onStatSelect &&
                    cn(COPILOT_FOCUS, "hover:bg-white/[0.06] hover:shadow-md"),
                )}
                style={{ backgroundColor: CLAUDE.surfaceOverlay }}
              >
                <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                  {stat.label}
                </p>
                <p className="mt-1 text-[15px] font-medium tabular-nums" style={{ color: CLAUDE.text }}>
                  {stat.value}
                </p>
                <p className="mt-0.5 flex items-center justify-between gap-1 text-xs" style={{ color: CLAUDE.textMuted }}>
                  <span>{stat.delta}</span>
                  {onStatSelect ? (
                    <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: CLAUDE.primary }}>
                      View →
                    </span>
                  ) : null}
                </p>
              </Tag>
            </motion.div>
            );
          })}
        </div>
      </LivingCard>

      <LivingCard title="Continue where you left off" subtitle="Specify intent · review drift · document legacy rules" delay={0.08}>
        {resumeDraft && onResumeDraft ? (
          <button
            type="button"
            onClick={onResumeDraft}
            className={cn(
              COPILOT_FOCUS,
              "mb-2 flex min-h-9 w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors hover:bg-white/[0.04]",
            )}
            style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                Resume {resumeDraft.label}
              </span>
              <span className="mt-0.5 block text-xs" style={{ color: CLAUDE.textMuted }}>
                Picked up at {resumeDraft.phase} — draft not deployed
              </span>
            </span>
            <span className="shrink-0 text-xs font-medium" style={{ color: CLAUDE.primary }}>
              Resume →
            </span>
          </button>
        ) : null}
        <div className="space-y-1.5">
          {recentItems.slice(0, 4).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onOpenPolicy(item)}
              className={cn(
                COPILOT_FOCUS,
                "flex min-h-9 w-full min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/[0.04]",
              )}
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                {item.label}
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                {item.flowMode && item.flowMode !== "author" ? (
                  <span
                    className={cn(COPILOT_TYPE.eyebrow, "rounded-full px-2 py-0.5")}
                    style={{
                      backgroundColor: item.flowMode === "review" ? CLAUDE.primaryMuted : CLAUDE.warningMuted,
                      color: CLAUDE.textSecondary,
                    }}
                  >
                    {item.flowMode === "review" ? "Review" : "Document"}
                  </span>
                ) : null}
                <span className="text-xs" style={{ color: CLAUDE.primary }}>
                  Open →
                </span>
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onStartNew}
          className={cn(
            COPILOT_FOCUS,
            "mt-3 inline-flex min-h-11 items-center justify-center self-start rounded-full px-5 text-[13px] font-medium text-white transition-opacity hover:opacity-90",
          )}
          style={{ backgroundColor: CLAUDE.primary }}
        >
          Start new policy
        </button>
      </LivingCard>
    </div>
  );
}

export function CopilotAnalyticsPanel() {
  const reduced = useReducedMotion();
  const bars = [62, 78, 45, 88, 71, 94, 56];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <LivingCard title="Policy analytics" subtitle="Last 7 days · all regions" delay={0}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {COPILOT_ANALYTICS_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...LIVING_MOTION.discover, delay: i * 0.05 }}
              className="rounded-xl px-2.5 py-2"
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                {metric.label}
              </p>
              <p className="mt-1 text-[14px] font-medium tabular-nums" style={{ color: CLAUDE.text }}>
                {metric.value}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: CLAUDE.textMuted }}>
                {metric.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </LivingCard>

      <LivingCard title="Access events" subtitle="Daily volume by policy type" delay={0.1}>
        <div className="flex h-24 items-end gap-1.5 pt-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ ...LIVING_MOTION.discover, delay: 0.1 + i * 0.04 }}
              className="min-w-0 flex-1 rounded-t-md"
              style={{
                backgroundColor: i === bars.length - 1 ? CLAUDE.primary : CLAUDE.primaryMuted,
                opacity: 0.5 + i * 0.06,
              }}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-2 text-[13px]" style={{ color: CLAUDE.textMuted }}>
          Healthcare and finance policies drive most volume this week.
        </p>
      </LivingCard>
    </div>
  );
}

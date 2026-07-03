"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ACTIVE_PORTFOLIO,
  CHECKS_HEALTH,
  DASHBOARD_STAT_INTROS,
  DRIFT_FLAGS,
  PENDING_REVIEWS,
  type ActivePolicyRow,
  type CheckIssueRow,
  type DriftFlagRow,
  type PendingReviewRow,
} from "@/components/case-studies/policy-copilot/policy-copilot-dashboard-flows";
import type { DashboardStatId } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";
import { LivingCard } from "@/components/case-studies/policy-copilot/policy-copilot-living-ui";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

function DrilldownHeader({
  statId,
  onBack,
}: {
  statId: DashboardStatId;
  onBack: () => void;
}) {
  const intro = DASHBOARD_STAT_INTROS[statId];
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium" style={{ color: CLAUDE.text, fontFamily: CLAUDE.fontDisplay }}>
          {intro.title}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {intro.copilot}
        </p>
      </div>
      <button
        type="button"
        onClick={onBack}
        className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "shrink-0 rounded-full px-3 text-[13px] font-medium")}
        style={{ color: CLAUDE.textMuted }}
      >
        ← Dashboard
      </button>
    </div>
  );
}

function RowChevron() {
  return (
    <span className="text-xs" style={{ color: CLAUDE.primary }}>
      Open →
    </span>
  );
}

export function DashboardDrilldownPanel({
  statId,
  onBack,
  onOpenActive,
  onOpenPending,
  onOpenDrift,
  onOpenCheckIssue,
}: {
  statId: DashboardStatId;
  onBack: () => void;
  onOpenActive: (row: ActivePolicyRow) => void;
  onOpenPending: (row: PendingReviewRow) => void;
  onOpenDrift: (row: DriftFlagRow) => void;
  onOpenCheckIssue: (row: CheckIssueRow) => void;
}) {
  const reduced = useReducedMotion();

  if (statId === "active") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <LivingCard title="Portfolio" subtitle="Govern · tune · retire" delay={0}>
          <DrilldownHeader statId="active" onBack={onBack} />
          <div className="mt-4 space-y-1.5">
            {ACTIVE_PORTFOLIO.map((row, i) => (
              <motion.button
                key={row.id}
                type="button"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
                onClick={() => onOpenActive(row)}
                className={cn(
                  COPILOT_FOCUS,
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]",
                )}
                style={{ backgroundColor: CLAUDE.surfaceOverlay }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                    {row.name}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: CLAUDE.textMuted }}>
                    {row.status} · {row.regions} · {row.lastChange}
                  </p>
                </div>
                <RowChevron />
              </motion.button>
            ))}
          </div>
          <p className="mt-3 text-xs" style={{ color: CLAUDE.textSoft }}>
            Showing 5 of 12 active policies
          </p>
        </LivingCard>
      </div>
    );
  }

  if (statId === "pending") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <LivingCard title="Approval queue" subtitle="Deploy gate — checks must pass first" delay={0}>
          <DrilldownHeader statId="pending" onBack={onBack} />
          <div className="mt-4 space-y-1.5">
            {PENDING_REVIEWS.map((row, i) => (
              <motion.button
                key={row.id}
                type="button"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
                onClick={() => onOpenPending(row)}
                className={cn(
                  COPILOT_FOCUS,
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]",
                )}
                style={{
                  backgroundColor: row.urgent ? CLAUDE.primaryMuted : CLAUDE.surfaceOverlay,
                  boxShadow: row.urgent ? `inset 0 0 0 1px ${CLAUDE.primaryBorder}` : undefined,
                }}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                      {row.name}
                    </p>
                    {row.urgent ? (
                      <span
                        className={cn(COPILOT_TYPE.eyebrow, "rounded-full px-2 py-0.5")}
                        style={{ backgroundColor: CLAUDE.primaryMuted, color: CLAUDE.primary }}
                      >
                        Due today
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs" style={{ color: CLAUDE.textMuted }}>
                    {row.author} · {row.checksSummary} · {row.dueLabel}
                  </p>
                </div>
                <RowChevron />
              </motion.button>
            ))}
          </div>
        </LivingCard>
      </div>
    );
  }

  if (statId === "drift") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <LivingCard title="Drift review" subtitle="Optimise · retire · re-approve" delay={0}>
          <DrilldownHeader statId="drift" onBack={onBack} />
          <div className="mt-4 space-y-1.5">
            {DRIFT_FLAGS.map((row, i) => (
              <motion.button
                key={row.id}
                type="button"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
                onClick={() => onOpenDrift(row)}
                className={cn(
                  COPILOT_FOCUS,
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]",
                )}
                style={{ backgroundColor: CLAUDE.warningMuted }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                    {row.rule}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: CLAUDE.textMuted }}>
                    {row.severity} severity · detected {row.detected}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug" style={{ color: CLAUDE.textSecondary }}>
                    {row.summary}
                  </p>
                </div>
                <RowChevron />
              </motion.button>
            ))}
          </div>
        </LivingCard>
      </div>
    );
  }

  const health = CHECKS_HEALTH;
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <LivingCard title="Safety checks" subtitle={`${health.passRate} passing · ${health.window}`} delay={0}>
        <DrilldownHeader statId="checks" onBack={onBack} />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Pass rate", value: health.passRate },
            { label: "Passed", value: String(health.passed) },
            { label: "Total", value: String(health.total) },
          ].map((m) => (
            <div key={m.label} className="rounded-xl px-2.5 py-2" style={{ backgroundColor: CLAUDE.surfaceOverlay }}>
              <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                {m.label}
              </p>
              <p className="mt-1 text-[15px] font-medium tabular-nums" style={{ color: CLAUDE.text }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </LivingCard>

      {health.issues.length > 0 ? (
        <LivingCard title="Needs attention" subtitle="Validate before next deploy" delay={0.08}>
          <div className="space-y-1.5">
            {health.issues.map((row, i) => (
              <motion.button
                key={row.id}
                type="button"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...LIVING_MOTION.discover, delay: i * 0.04 }}
                onClick={() => onOpenCheckIssue(row)}
                className={cn(
                  COPILOT_FOCUS,
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]",
                )}
                style={{ backgroundColor: CLAUDE.warningMuted }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: CLAUDE.text }}>
                    {row.policy}
                  </p>
                  <p className="mt-0.5 text-xs font-medium" style={{ color: CLAUDE.warning }}>
                    {row.check}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug" style={{ color: CLAUDE.textSecondary }}>
                    {row.detail}
                  </p>
                </div>
                <RowChevron />
              </motion.button>
            ))}
          </div>
        </LivingCard>
      ) : null}
    </div>
  );
}

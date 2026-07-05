"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  EHR_CANDIDATE_RULES,
  EHR_COMPLIANCE_OVERLAYS,
  EHR_ENTITY_MAPPINGS,
  EHR_IMPACT_FORECAST,
  EHR_LIFECYCLE_TIMELINE,
  EHR_L7_UPGRADE,
  EHR_MITIGATION_SUGGESTIONS,
  EHR_RELATED_POLICIES,
  EHR_RULE_REASONING,
  EHR_UNIT_TEST_RESULTS,
  LINKEDIN_DRIFT_MEMORY,
} from "@/components/case-studies/policy-copilot/policy-copilot-data";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

export function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] font-medium uppercase tracking-[0.12em]"
      style={{ color: CLAUDE.textSoft }}
    >
      {children}
    </p>
  );
}

export function EntityMappingTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: CLAUDE.border }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ backgroundColor: CLAUDE.surfaceRaised }}>
            {["Term", "Resolved to", "Type"].map((h) => (
              <th
                key={h}
                className={cn("font-medium", compact ? "px-2 py-1.5 text-[7px]" : "px-2.5 py-2 text-[8px]")}
                style={{ color: CLAUDE.textMuted }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {EHR_ENTITY_MAPPINGS.map((row) => (
            <tr key={row.term} style={{ borderTop: `1px solid ${CLAUDE.hairline}` }}>
              <td className={cn(compact ? "px-2 py-1.5 text-[8px]" : "px-2.5 py-2 text-[9px]")} style={{ color: CLAUDE.text }}>
                {row.term}
              </td>
              <td className={cn(compact ? "px-2 py-1.5 text-[8px]" : "px-2.5 py-2 text-[9px]")} style={{ color: CLAUDE.primary }}>
                {row.resolved}
              </td>
              <td className={cn(compact ? "px-2 py-1.5 text-[7px]" : "px-2.5 py-2 text-[8px]")} style={{ color: CLAUDE.textMuted }}>
                {row.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CandidateRuleDualView({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="space-y-2">
      <div
        className="rounded-xl border p-2.5 font-mono text-[8px] leading-relaxed md:text-[9px]"
        style={{ borderColor: CLAUDE.border, backgroundColor: "#0d0c0b", color: CLAUDE.accentTeal }}
      >
        <p style={{ color: CLAUDE.validated }}># allow</p>
        <p>{EHR_CANDIDATE_RULES.allow}</p>
        <p className="mt-2" style={{ color: CLAUDE.risk }}># deny</p>
        <p>{EHR_CANDIDATE_RULES.deny}</p>
      </div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-2.5"
        style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised }}
      >
        <PanelLabel>In plain English</PanelLabel>
        <p className={cn("mt-1.5 leading-relaxed", compact ? "text-[9px]" : "text-[10px]")} style={{ color: CLAUDE.textSecondary }}>
          {EHR_RULE_REASONING}
        </p>
      </motion.div>
    </div>
  );
}

export function RelatedPolicySuggestions() {
  return (
    <div className="space-y-1.5">
      {EHR_RELATED_POLICIES.map((item) => (
        <div
          key={item.type}
          className="flex items-start gap-2 rounded-lg border px-2.5 py-2"
          style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}
        >
          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-[7px] font-medium"
            style={{ backgroundColor: CLAUDE.primaryMuted, color: CLAUDE.primary }}
          >
            {item.type}
          </span>
          <p className="text-[9px] leading-snug" style={{ color: CLAUDE.textMuted }}>
            {item.suggestion}
          </p>
        </div>
      ))}
    </div>
  );
}

export function RiskScoreCard() {
  const scoreColor =
    EHR_UNIT_TEST_RESULTS.riskScore === "Low"
      ? CLAUDE.validated
      : EHR_UNIT_TEST_RESULTS.riskScore === "Medium"
        ? CLAUDE.warning
        : CLAUDE.risk;
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-xl border p-2.5" style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}>
        <p className="text-[8px]" style={{ color: CLAUDE.textMuted }}>Who&apos;s affected</p>
        <p className="mt-1 text-[9px] leading-snug" style={{ color: CLAUDE.textSecondary }}>
          {EHR_UNIT_TEST_RESULTS.blastRadius}
        </p>
      </div>
      <div className="rounded-xl border p-2.5" style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}>
        <p className="text-[8px]" style={{ color: CLAUDE.textMuted }}>Risk score</p>
        <p className="mt-1 text-[13px] font-medium tabular-nums" style={{ color: scoreColor }}>
          {EHR_UNIT_TEST_RESULTS.riskScore}
        </p>
        <p className="text-[8px]" style={{ color: CLAUDE.textSoft }}>{EHR_UNIT_TEST_RESULTS.riskDetail}</p>
      </div>
    </div>
  );
}

export function UnitTestSummary() {
  return (
    <ul className="space-y-1.5">
      {[
        `Test impact across ${EHR_UNIT_TEST_RESULTS.resourcesAffected} systems`,
        "Check for privilege escalation",
        `Compliance: ${EHR_UNIT_TEST_RESULTS.complianceImpact}`,
        `Expected downtime: ${EHR_UNIT_TEST_RESULTS.downtime}`,
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-[9px]" style={{ color: CLAUDE.textSecondary }}>
          <span style={{ color: CLAUDE.validated }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ImpactForecastPanel() {
  return (
    <div className="space-y-2">
      {EHR_IMPACT_FORECAST.map((item) => (
        <div key={item.label} className="rounded-lg border px-2.5 py-2" style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}>
          <p className="text-[8px] font-medium" style={{ color: CLAUDE.textMuted }}>{item.label}</p>
          <p className="mt-0.5 text-[9px] leading-snug" style={{ color: CLAUDE.textSecondary }}>{item.value}</p>
        </div>
      ))}
      <div className="rounded-lg border p-2.5" style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}>
        <p className="text-[8px] font-medium" style={{ color: CLAUDE.primary }}>Before you go live</p>
        <ul className="mt-1 space-y-0.5">
          {EHR_MITIGATION_SUGGESTIONS.map((s) => (
            <li key={s} className="text-[8px]" style={{ color: CLAUDE.textSecondary }}>· {s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ComplianceOverlayGrid({ doneCount }: { doneCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {EHR_COMPLIANCE_OVERLAYS.map((item, i) => {
        const done = i < doneCount || item.status === "na";
        const isNa = item.status === "na";
        return (
          <div
            key={item.framework}
            className="rounded-lg border p-2"
            style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}
          >
            <p className="text-[8px] font-medium" style={{ color: CLAUDE.text }}>{item.framework}</p>
            <p className="mt-0.5 text-[7px] leading-snug" style={{ color: CLAUDE.textSoft }}>{item.control}</p>
            <p
              className="mt-1 text-[8px] font-medium"
              style={{ color: isNa ? CLAUDE.textSoft : done ? CLAUDE.validated : CLAUDE.textMuted }}
            >
              {isNa ? "N/A" : done ? "Passed" : "Checking…"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function DriftMemoryCard({
  resolved,
  onRetain,
  onDeprecate,
}: {
  resolved: boolean;
  onRetain: () => void;
  onDeprecate: () => void;
}) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: CLAUDE.warningMuted, backgroundColor: CLAUDE.surface }}>
      <p className="text-[9px] font-medium" style={{ color: CLAUDE.warning }}>
        Unused rule — {LINKEDIN_DRIFT_MEMORY.rule}
      </p>
      <p className="mt-1.5 text-[9px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {LINKEDIN_DRIFT_MEMORY.why}
      </p>
      <p className="mt-1 text-[8px]" style={{ color: CLAUDE.textMuted }}>{LINKEDIN_DRIFT_MEMORY.simulation}</p>
      <p className="mt-1 text-[8px] italic" style={{ color: CLAUDE.warning }}>{LINKEDIN_DRIFT_MEMORY.flag}</p>
      {!resolved ? (
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={onRetain}
            className="rounded-full border px-2.5 py-1 text-[8px]"
            style={{ borderColor: CLAUDE.border, color: CLAUDE.textSecondary }}
          >
            Retain rule
          </button>
          <button
            type="button"
            onClick={onDeprecate}
            className="rounded-full border px-2.5 py-1 text-[8px]"
            style={{ borderColor: CLAUDE.primaryBorder, color: CLAUDE.primary }}
          >
            Remove rule
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[8px] font-medium" style={{ color: CLAUDE.validated }}>Resolved — record updated</p>
      )}
    </div>
  );
}

export function LifecycleTimeline() {
  const reduced = useReducedMotion();
  return (
    <div className="space-y-0">
      {EHR_LIFECYCLE_TIMELINE.map((event, i) => (
        <motion.div
          key={event.stage}
          initial={reduced ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex gap-2.5 pb-3"
        >
          <div className="flex flex-col items-center pt-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CLAUDE.primary }} />
            {i < EHR_LIFECYCLE_TIMELINE.length - 1 ? (
              <span className="w-px flex-1 min-h-[2rem]" style={{ backgroundColor: CLAUDE.hairline }} />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[10px] font-medium" style={{ color: CLAUDE.text }}>{event.stage}</p>
              <p className="shrink-0 text-[8px] tabular-nums" style={{ color: CLAUDE.textSoft }}>{event.time}</p>
            </div>
            <p className="mt-0.5 text-[9px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>{event.evidence}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function L7UpgradeBadge() {
  return (
    <div className="rounded-lg border px-2.5 py-2" style={{ borderColor: CLAUDE.validatedMuted, backgroundColor: CLAUDE.validatedMuted }}>
      <p className="text-[9px] font-medium" style={{ color: CLAUDE.validated }}>{EHR_L7_UPGRADE.title}</p>
      <p className="mt-0.5 text-[8px]" style={{ color: CLAUDE.textSecondary }}>{EHR_L7_UPGRADE.detail}</p>
    </div>
  );
}

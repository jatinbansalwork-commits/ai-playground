"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheckIcon } from "@/components/case-studies/policy-copilot/policy-copilot-icons";
import {
  CLAUDE,
  COPILOT_FOCUS,
  COPILOT_TYPE,
  LIVING_MOTION,
} from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const SUMMARY_SECTIONS = [
  {
    id: "intent",
    label: "Business intent",
    value: "Secure EHR access for doctors on hospital-managed devices",
    status: "Confirmed",
    tone: "neutral" as const,
  },
  {
    id: "interpretation",
    label: "AI interpretation",
    value: "Doctors-AD-Group → EHR-Application · HTTPS 443 · session logging on allow path",
    status: "94% match",
    tone: "primary" as const,
  },
  {
    id: "validation",
    label: "Validation results",
    value: "6 checks passed — compliance, duplicates, segmentation, and blast radius clear",
    status: "All clear",
    tone: "success" as const,
  },
  {
    id: "simulation",
    label: "Simulation insights",
    value: "240 doctors in scope · 2 applications reachable · low blast radius",
    status: "Ready",
    tone: "success" as const,
  },
  {
    id: "optimisation",
    label: "Optimisation opportunities",
    value: "Enable audit logging — aligns with 3 similar clinical policies",
    status: "Optional",
    tone: "warn" as const,
  },
  {
    id: "risks",
    label: "Remaining risks",
    value: "No blocking issues — nurses and contractors remain excluded",
    status: "Low",
    tone: "warn" as const,
  },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Final approval screen summarising business intent, AI interpretation, validation, simulation, optimisations, and remaining risks with Approve Policy as the primary action.";

function toneStyles(tone: "neutral" | "primary" | "success" | "warn") {
  switch (tone) {
    case "success":
      return {
        accent: CLAUDE.validated,
        muted: CLAUDE.validatedMuted,
        badgeBg: CLAUDE.validatedMuted,
      };
    case "warn":
      return {
        accent: CLAUDE.warning,
        muted: CLAUDE.warningMuted,
        badgeBg: CLAUDE.warningMuted,
      };
    case "primary":
      return {
        accent: CLAUDE.primary,
        muted: CLAUDE.primaryMuted,
        badgeBg: CLAUDE.primaryMuted,
      };
    default:
      return {
        accent: CLAUDE.textMuted,
        muted: CLAUDE.surfaceOverlay,
        badgeBg: CLAUDE.surfaceOverlay,
      };
  }
}

function SummaryRow({
  section,
  delay,
}: {
  section: (typeof SUMMARY_SECTIONS)[number];
  delay: number;
}) {
  const reduced = useReducedMotion();
  const { accent, badgeBg } = toneStyles(section.tone);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl px-3.5 py-3"
      style={{
        backgroundColor: CLAUDE.surfaceRaised,
        boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}, inset 3px 0 0 0 ${accent}`,
      }}
    >
      <div className="min-w-0">
        <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
          {section.label}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.text }}>
          {section.value}
        </p>
      </div>
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ backgroundColor: badgeBg, color: accent }}
      >
        {section.status}
      </span>
    </motion.div>
  );
}

/** Product-chrome final approval — uses `CLAUDE` (Cisco demo dark), not light editorial. */
export function PolicyCopilotFinalApproval() {
  const reduced = useReducedMotion();

  return (
    <figure
      className="overflow-hidden rounded-xl case-study-dark-panel"
      style={{
        backgroundColor: CLAUDE.bg,
        boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
      }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-5 md:p-5">
        <div className="space-y-2">
          {SUMMARY_SECTIONS.map((section, index) => (
            <SummaryRow key={section.id} section={section} delay={index * 0.04} />
          ))}
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={LIVING_MOTION.discover}
          className="flex flex-col rounded-xl p-4"
          style={{
            backgroundColor: CLAUDE.surface,
            boxShadow: `inset 0 0 0 1px ${CLAUDE.primaryBorder}`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold" style={{ color: CLAUDE.text }}>
                Approval readiness
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: CLAUDE.textSecondary }}>
                Draft policy · clinical access request
              </p>
            </div>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
              aria-hidden
            >
              <ShieldCheckIcon className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-2">
              <p
                className="text-[28px] font-semibold leading-none tabular-nums"
                style={{ color: CLAUDE.text }}
              >
                94%
              </p>
              <p className="text-[12px] font-medium" style={{ color: CLAUDE.validated }}>
                Confidence at ready
              </p>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full"
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: CLAUDE.validated }}
                initial={reduced ? false : { width: "0%" }}
                animate={{ width: "94%" }}
                transition={{ duration: 0.8, ease: LIVING_MOTION.confidence.ease }}
              />
            </div>
          </div>

          <div
            className="mt-5 rounded-xl px-3 py-2.5"
            style={{
              backgroundColor: CLAUDE.warningMuted,
              boxShadow: `inset 0 0 0 1px ${CLAUDE.warning}55`,
            }}
          >
            <p className="text-[12px] font-semibold" style={{ color: CLAUDE.warning }}>
              Human approval required
            </p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
              Policy Copilot prepared the draft. You own the decision to deploy to production.
            </p>
          </div>

          <div className="mt-auto space-y-2 pt-6">
            <button
              type="button"
              className={cn(
                COPILOT_FOCUS,
                "w-full rounded-xl px-4 py-3 text-[13px] font-medium text-white transition-opacity hover:opacity-95",
              )}
              style={{ backgroundColor: CLAUDE.primary }}
            >
              Approve Policy
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={cn(
                  COPILOT_FOCUS,
                  "rounded-xl px-3 py-2 text-[12px] font-medium transition-colors",
                )}
                style={{
                  backgroundColor: CLAUDE.surfaceRaised,
                  color: CLAUDE.textSecondary,
                  boxShadow: `inset 0 0 0 1px ${CLAUDE.border}`,
                }}
              >
                Request changes
              </button>
              <button
                type="button"
                className={cn(
                  COPILOT_FOCUS,
                  "rounded-xl px-3 py-2 text-[12px] font-medium transition-colors",
                )}
                style={{
                  backgroundColor: CLAUDE.surfaceRaised,
                  color: CLAUDE.textSecondary,
                  boxShadow: `inset 0 0 0 1px ${CLAUDE.border}`,
                }}
              >
                Save draft
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="mx-4 mb-4 rounded-xl px-3 py-2.5 md:mx-5 md:mb-5"
        style={{
          backgroundColor: CLAUDE.surfaceRaised,
          boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <span style={{ color: CLAUDE.textSecondary }}>
            AI supports judgement → you approve deployment
          </span>
          <span className="font-semibold" style={{ color: CLAUDE.primary }}>
            Approve Policy
          </span>
        </div>
      </div>
    </figure>
  );
}

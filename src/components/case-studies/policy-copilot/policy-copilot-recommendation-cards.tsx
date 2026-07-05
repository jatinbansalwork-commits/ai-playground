"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CLAUDE, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const EVIDENCE = [
  "Application handles sensitive healthcare records (ePHI).",
  "3 similar clinical policies already enable logging.",
  "Organisational standards require an audit trail.",
] as const;

const WHY_SECTIONS = [
  {
    id: "reasoning",
    label: "Why this recommendation",
    body: "Audit logging on the allow path gives security teams a defensible record without changing who can access EHR — the gap is visibility, not access.",
  },
  {
    id: "business",
    label: "Business impact",
    body: "Compliance reviews move faster when administrators can show who accessed records and when, without opening a separate ticketing workflow.",
  },
  {
    id: "security",
    label: "Security impact",
    body: "Full allow and deny logging supports forensic investigation if access patterns drift or an incident is reported.",
  },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Recommendation card — enable audit logging with supporting evidence, confidence level, business and security impact, and expandable Why sections.";

function ImpactStat({ label, value, tone }: { label: string; value: string; tone: "business" | "security" }) {
  const accent = tone === "business" ? CLAUDE.accentTeal : CLAUDE.primary;
  const muted = tone === "business" ? CLAUDE.accentTealMuted : CLAUDE.primaryMuted;

  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{ backgroundColor: muted, boxShadow: `inset 0 0 0 1px ${accent}33` }}
    >
      <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
        {label}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
        {value}
      </p>
    </div>
  );
}

function WhySection({
  id,
  label,
  body,
  expanded,
  onToggle,
}: {
  id: string;
  label: string;
  body: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl"
      style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3.5 py-2.5 text-left hover:bg-white/[0.02]"
        aria-expanded={expanded}
        aria-controls={`recommendation-why-${id}`}
      >
        <span className="text-[12px] font-medium leading-none" style={{ color: CLAUDE.text }}>
          {label}
        </span>
        <span className="text-[10px] font-medium leading-none" style={{ color: CLAUDE.primary }}>
          {expanded ? "Hide" : "Why?"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={`recommendation-why-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p
              className="border-t px-3.5 py-2.5 text-[12px] leading-relaxed"
              style={{ borderColor: CLAUDE.hairline, color: CLAUDE.textMuted }}
            >
              {body}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PolicyCopilotRecommendationCards() {
  const reduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string>("reasoning");

  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: "#0D1114" }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b px-4 py-4 md:px-5 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className={COPILOT_TYPE.titleLg}
              style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
            >
              Recommendations
            </p>
            <p className="mt-1 max-w-2xl text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
              Suggested improvements with supporting evidence and expected impact — compare, apply, or
              dismiss each one.
            </p>
          </div>
          <span
            className="rounded-full border px-2.5 py-1 text-[11px] font-medium tabular-nums"
            style={{
              borderColor: CLAUDE.primaryBorder,
              backgroundColor: CLAUDE.primaryMuted,
              color: CLAUDE.text,
            }}
          >
            Confidence · 84%
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...LIVING_MOTION.discover }}
          className="rounded-2xl p-4 md:p-5"
          style={{
            backgroundColor: CLAUDE.surfaceRaised,
            boxShadow: `inset 0 0 0 1px ${CLAUDE.primaryBorder}, inset 3px 0 0 0 ${CLAUDE.primaryMuted}`,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
                Suggested change
              </p>
              <p
                className="mt-1 text-[15px] font-medium leading-snug"
                style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
              >
                Enable audit logging on the EHR allow path
              </p>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: CLAUDE.warningMuted, color: CLAUDE.warning }}
            >
              Recommended
            </span>
          </div>

          <div className="mt-4">
            <p className={cn(COPILOT_TYPE.eyebrow, "mb-2")} style={{ color: CLAUDE.textMuted }}>
              Supporting evidence
            </p>
            <ul className="flex flex-wrap gap-2">
              {EVIDENCE.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  <span
                    className="inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] leading-snug"
                    style={{
                      backgroundColor: CLAUDE.surfaceOverlay,
                      color: CLAUDE.textSecondary,
                      boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
                    }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <ImpactStat
              label="Business impact"
              tone="business"
              value="Faster compliance reviews without slowing clinician access."
            />
            <ImpactStat
              label="Security impact"
              tone="security"
              value="Forensic trail on allow and deny paths if access patterns drift."
            />
          </div>

          <div className="mt-4 space-y-2">
            {WHY_SECTIONS.map((section) => (
              <WhySection
                key={section.id}
                {...section}
                expanded={expandedId === section.id}
                onToggle={() =>
                  setExpandedId((current) => (current === section.id ? "" : section.id))
                }
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              tabIndex={-1}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium"
              style={{
                color: CLAUDE.textSecondary,
                boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
              }}
            >
              Compare
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="rounded-full px-3.5 py-1.5 text-[12px] font-medium"
              style={{ backgroundColor: CLAUDE.primary, color: "#fff" }}
            >
              Apply
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium"
              style={{ color: CLAUDE.textMuted }}
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>

      <p
        className="border-t px-4 py-3 text-center text-[11px] leading-relaxed md:px-5"
        style={{ borderColor: CLAUDE.hairline, color: CLAUDE.textSoft }}
      >
        Explain the recommendation, not just the result.
      </p>
    </figure>
  );
}

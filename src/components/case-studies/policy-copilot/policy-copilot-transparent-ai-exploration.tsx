"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ConfidenceRing } from "@/components/case-studies/policy-copilot/policy-copilot-polish-ui";
import { CLAUDE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const ILLUSTRATION_ARIA_LABEL =
  "Transparent AI component exploration — editable chips, confidence indicators, assumption cards, explanation tooltips, inline suggestions, reasoning panels, and policy preview cards.";

function SectionBand({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  accent: "primary" | "risk";
  children: ReactNode;
}) {
  const accentColor = accent === "primary" ? CLAUDE.primary : CLAUDE.risk;
  const accentMuted = accent === "primary" ? CLAUDE.primaryMuted : CLAUDE.riskMuted;

  return (
    <section
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: accent === "primary" ? CLAUDE.primaryBorder : "rgb(198 69 69 / 0.35)",
        backgroundColor: accentMuted,
        boxShadow: `inset 3px 0 0 0 ${accentColor}`,
      }}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
            {title}
          </p>
          {subtitle ? (
            <p
              className="mt-1 max-w-xl text-[12px] leading-relaxed"
              style={{ color: CLAUDE.textSecondary }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
          style={{
            backgroundColor:
              accent === "primary" ? CLAUDE.validatedMuted : CLAUDE.riskMuted,
            color: accent === "primary" ? CLAUDE.validated : CLAUDE.risk,
          }}
        >
          {accent === "primary" ? "In the product" : "Did not ship"}
        </span>
      </div>
      {children}
    </section>
  );
}

function Tile({
  label,
  children,
  className,
  delay = 0,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className={cn("flex flex-col rounded-xl p-3.5", className)}
      style={{
        backgroundColor: CLAUDE.surfaceRaised,
        boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
      }}
    >
      <p
        className="mb-2.5 text-[10px] font-medium tracking-wide"
        style={{ color: CLAUDE.textMuted }}
      >
        {label}
      </p>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.div>
  );
}

function EntityChipMini({
  term,
  value,
  inferred,
}: {
  term: string;
  value: string;
  inferred?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-xl border px-3 py-2.5"
      style={{
        borderColor: CLAUDE.border,
        backgroundColor: CLAUDE.surface,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className="text-[9px] font-medium uppercase tracking-wide"
            style={{ color: CLAUDE.textMuted }}
          >
            {term}
          </p>
          <p
            className="mt-1 truncate text-[12px] font-semibold"
            style={{ color: CLAUDE.text }}
          >
            {value}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <span
            className="rounded-md border px-1.5 py-0.5 text-[9px] font-medium"
            style={{ borderColor: CLAUDE.borderStrong, color: CLAUDE.textSecondary }}
          >
            Edit
          </span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[9px] font-semibold"
            style={{ color: CLAUDE.primary }}
          >
            Why?
          </span>
        </div>
      </div>
      {inferred ? (
        <span
          className="w-fit rounded-full px-1.5 py-0.5 text-[8px] font-medium uppercase"
          style={{ backgroundColor: CLAUDE.warningMuted, color: CLAUDE.warning }}
        >
          Inferred
        </span>
      ) : null}
    </div>
  );
}

export function PolicyCopilotTransparentAiExploration() {
  const reduced = useReducedMotion();

  return (
    <figure>
      <div
        className="overflow-hidden rounded-lg border px-4 py-7 sm:px-7 md:py-9 case-study-dark-panel"
        style={{
          backgroundColor: CLAUDE.surface,
          borderColor: CLAUDE.border,
        }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <header className="mx-auto max-w-2xl text-center">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.24em]"
            style={{ color: CLAUDE.textMuted }}
          >
            Component Exploration
          </p>
          <p className="mt-2 text-base font-semibold" style={{ color: CLAUDE.text }}>
            Transparent AI
          </p>
          <p
            className="mt-2 text-[13px] leading-relaxed"
            style={{ color: CLAUDE.textSecondary }}
          >
            Patterns that made thinking visible in the workspace.
          </p>
        </header>

        <div className="mt-8 space-y-5">
          <SectionBand
            title="Shipped patterns"
            subtitle="Every update explained what changed, why, and how sure the model was."
            accent="primary"
          >
            <div className="grid gap-3 md:grid-cols-6">
              <Tile label="Editable AI chips" className="md:col-span-3" delay={0}>
                <div className="grid gap-2 sm:grid-cols-2">
                  <EntityChipMini term="Users" value="Doctors-AD-Group" />
                  <EntityChipMini term="Application" value="EHR-Application-Object" />
                </div>
              </Tile>

              <Tile label="Confidence indicator" className="md:col-span-3" delay={0.04}>
                <div className="flex items-center gap-3.5">
                  <ConfidenceRing phase="draft" value={62} mappingDone />
                  <div className="min-w-0">
                    <span
                      className="inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium tabular-nums"
                      style={{
                        borderColor: CLAUDE.primaryBorder,
                        backgroundColor: CLAUDE.primaryMuted,
                        color: CLAUDE.text,
                      }}
                    >
                      Confidence · 62%
                    </span>
                    <p className="mt-2 text-[12px] font-semibold" style={{ color: CLAUDE.text }}>
                      Mapping complete
                    </p>
                    <p
                      className="mt-1 text-[10px] leading-snug"
                      style={{ color: CLAUDE.textMuted }}
                    >
                      Confirm understanding before safety checks run.
                    </p>
                  </div>
                </div>
              </Tile>

              <Tile label="Assumption cards" className="md:col-span-2" delay={0.08}>
                <ul className="space-y-1.5">
                  {[
                    "MFA recommended for clinical paths",
                    "Everyone not named is denied by default",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg border px-2.5 py-2 text-[11px] leading-snug"
                      style={{
                        borderColor: CLAUDE.border,
                        backgroundColor: CLAUDE.surfaceOverlay,
                        color: CLAUDE.textSecondary,
                      }}
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: CLAUDE.warning }}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Tile>

              <Tile label="Explanation tooltip" className="md:col-span-2" delay={0.1}>
                <div
                  className="rounded-lg border px-2.5 py-2 text-[11px]"
                  style={{
                    borderColor: CLAUDE.border,
                    backgroundColor: CLAUDE.surfaceOverlay,
                    color: CLAUDE.textSecondary,
                  }}
                >
                  Nurses-AD-Group
                  <span
                    className="ml-1.5 text-[10px] font-semibold"
                    style={{ color: CLAUDE.primary }}
                  >
                    Why?
                  </span>
                </div>
                <div
                  className="mt-2 rounded-lg border px-2.5 py-2 text-[10px] leading-relaxed"
                  style={{
                    borderColor: CLAUDE.primaryBorder,
                    backgroundColor: CLAUDE.primaryMuted,
                    color: CLAUDE.textSecondary,
                  }}
                >
                  Locum groups are a common gap when only doctors are named in hospital policies.
                </div>
              </Tile>

              <Tile label="Inline suggestions" className="md:col-span-2" delay={0.12}>
                <div className="flex flex-wrap gap-1.5">
                  {["Allow nurses read-only", "Include locum doctors", "Keep full block"].map(
                    (label, i) => (
                      <span
                        key={label}
                        className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
                        style={{
                          backgroundColor:
                            i === 0 ? CLAUDE.primaryMuted : CLAUDE.surface,
                          borderColor:
                            i === 0 ? CLAUDE.primaryBorder : CLAUDE.borderStrong,
                          color: i === 0 ? CLAUDE.primary : CLAUDE.textSecondary,
                        }}
                      >
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </Tile>

              <Tile label="Reasoning panel" className="md:col-span-3" delay={0.14}>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: CLAUDE.textSecondary }}
                >
                  Doctors need EHR from managed devices only — nurses blocked unless you add a
                  break-glass path.
                </p>
                <p className="mt-2 text-[10px]" style={{ color: CLAUDE.textMuted }}>
                  Source · intent + Doctors-AD-Group inventory
                </p>
              </Tile>

              <Tile label="Policy preview cards" className="md:col-span-3" delay={0.16}>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div
                    className="rounded-xl border px-3 py-2.5"
                    style={{
                      backgroundColor: CLAUDE.validatedMuted,
                      borderColor: "rgb(93 184 114 / 0.35)",
                    }}
                  >
                    <p className="text-[11px] font-semibold" style={{ color: CLAUDE.validated }}>
                      Allow · doctors → EHR
                    </p>
                    <p className="mt-1 text-[10px]" style={{ color: CLAUDE.textMuted }}>
                      Hospital-managed devices only
                    </p>
                  </div>
                  <div
                    className="rounded-xl border px-3 py-2.5"
                    style={{
                      backgroundColor: CLAUDE.riskMuted,
                      borderColor: "rgb(198 69 69 / 0.35)",
                    }}
                  >
                    <p className="text-[11px] font-semibold" style={{ color: CLAUDE.risk }}>
                      Deny · nurses → EHR
                    </p>
                    <p className="mt-1 text-[10px]" style={{ color: CLAUDE.textMuted }}>
                      Clinical role separation
                    </p>
                  </div>
                </div>
              </Tile>
            </div>
          </SectionBand>
        </div>
      </div>
    </figure>
  );
}

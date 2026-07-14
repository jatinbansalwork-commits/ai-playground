"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ConfidenceRing } from "@/components/case-studies/policy-copilot/policy-copilot-polish-ui";
import { EDITORIAL as CLAUDE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
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
  const accentColor = accent === "primary" ? CLAUDE.primary : "#c64545";
  const accentMuted = accent === "primary" ? CLAUDE.primaryMuted : "rgb(198 69 69 / 0.08)";

  return (
    <section
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: accent === "primary" ? CLAUDE.primaryBorder : "rgb(198 69 69 / 0.22)",
        backgroundColor: accentMuted,
        boxShadow: `inset 3px 0 0 0 ${accentColor}`,
      }}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[13px] font-medium text-neutral-800">{title}</p>
          {subtitle ? (
            <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-neutral-600">{subtitle}</p>
          ) : null}
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
          style={{
            backgroundColor: accent === "primary" ? CLAUDE.validatedMuted : "rgb(185 28 28 / 0.12)",
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
        backgroundColor: "#FFFFFF",
        boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}`,
      }}
    >
      <p className="mb-2.5 text-[10px] font-medium tracking-wide text-neutral-500">{label}</p>
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
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">{term}</p>
          <p className="mt-1 truncate text-[12px] font-semibold text-neutral-900">{value}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <span className="rounded-md border border-neutral-200 px-1.5 py-0.5 text-[9px] font-medium text-neutral-600">
            Edit
          </span>
          <span className="rounded-md px-1.5 py-0.5 text-[9px] font-semibold text-sky-700">Why?</span>
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
        className="overflow-hidden rounded-lg border border-neutral-200 px-4 py-7 sm:px-7 md:py-9 case-study-light-panel"
        style={{ backgroundColor: "#FFFFFF" }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-500">
            Component Exploration
          </p>
          <p className="mt-2 text-base font-semibold text-neutral-900">Transparent AI</p>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
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
                  <ConfidenceRing phase="draft" value={62} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-neutral-900">Mapping complete</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${CLAUDE.primary}, #6366F1)` }}
                        initial={reduced ? false : { width: 0 }}
                        whileInView={{ width: "62%" }}
                        viewport={{ once: true }}
                        transition={LIVING_MOTION.confidence}
                      />
                    </div>
                    <p className="mt-2 text-[10px] leading-snug text-neutral-600">
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
                      className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-2 text-[11px] leading-snug text-neutral-800"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Tile>

              <Tile label="Explanation tooltip" className="md:col-span-2" delay={0.1}>
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-2 text-[11px] text-neutral-800">
                  Nurses-AD-Group
                  <span className="ml-1.5 text-[10px] font-semibold text-sky-700">Why?</span>
                </div>
                <div
                  className="mt-2 rounded-lg border px-2.5 py-2 text-[10px] leading-relaxed text-neutral-700"
                  style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
                >
                  Locum groups are a common gap when only doctors are named in hospital policies.
                </div>
              </Tile>

              <Tile label="Inline suggestions" className="md:col-span-2" delay={0.12}>
                <div className="flex flex-wrap gap-1.5">
                  {["Allow nurses read-only", "Include locum doctors", "Keep full block"].map((label, i) => (
                    <span
                      key={label}
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
                      style={{
                        backgroundColor: i === 0 ? CLAUDE.primaryMuted : "#FFFFFF",
                        borderColor: i === 0 ? CLAUDE.primaryBorder : CLAUDE.borderStrong,
                        color: i === 0 ? CLAUDE.primaryActive : CLAUDE.textSecondary,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </Tile>

              <Tile label="Reasoning panel" className="md:col-span-3" delay={0.14}>
                <p className="text-[11px] leading-relaxed text-neutral-700">
                  Doctors need EHR from managed devices only — nurses blocked unless you add a
                  break-glass path.
                </p>
                <p className="mt-2 text-[10px] text-neutral-500">Source · intent + Doctors-AD-Group inventory</p>
              </Tile>

              <Tile label="Policy preview cards" className="md:col-span-3" delay={0.16}>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div
                    className="rounded-xl border px-3 py-2.5"
                    style={{
                      backgroundColor: CLAUDE.validatedMuted,
                      borderColor: "rgb(21 128 61 / 0.28)",
                    }}
                  >
                    <p className="text-[11px] font-semibold" style={{ color: CLAUDE.validated }}>
                      Allow · doctors → EHR
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-600">Hospital-managed devices only</p>
                  </div>
                  <div
                    className="rounded-xl border px-3 py-2.5"
                    style={{
                      backgroundColor: CLAUDE.riskMuted,
                      borderColor: "rgb(185 28 28 / 0.28)",
                    }}
                  >
                    <p className="text-[11px] font-semibold" style={{ color: CLAUDE.risk }}>
                      Deny · nurses → EHR
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-600">Clinical role separation</p>
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type {
  ContextBrowserData,
  EvidenceRecommendation,
  GeneratedRule,
  InterpretationLine,
  ProcessingStats,
} from "@/components/case-studies/policy-copilot/policy-copilot-journey-content";
import {
  COPILOT_SKILLS,
  isSkillComplete,
  type CopilotSkillId,
} from "@/components/case-studies/policy-copilot/policy-copilot-skills";
import { SKILL_TOKENS } from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import {
  INSIGHT_KIND_COLORS,
  INSIGHT_KIND_LABEL,
  type InsightKind,
} from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AllowIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}>
      ✓
    </span>
  );
}

function DenyIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171" }}>
      ✕
    </span>
  );
}

function NeutralIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]" style={{ backgroundColor: CLAUDE.surfaceOverlay, color: CLAUDE.textMuted }}>
      ·
    </span>
  );
}

export function JourneyStepIndicator({ activeSkill }: { activeSkill: CopilotSkillId }) {
  const activeIdx = COPILOT_SKILLS.findIndex((s) => s.id === activeSkill);
  const skill = COPILOT_SKILLS[activeIdx];
  const tokens = SKILL_TOKENS[activeSkill];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5" aria-label="Policy journey progress">
      <div className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
          style={{ backgroundColor: tokens.muted, color: tokens.color }}
        >
          {activeIdx + 1}
        </span>
        <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
          {skill?.label ?? "Intent"}
        </p>
        <p className={cn("ml-auto", COPILOT_TYPE.caption, "tabular-nums")} style={{ color: CLAUDE.textMuted }}>
          {activeIdx + 1} of {COPILOT_SKILLS.length}
        </p>
      </div>
      <div className="flex gap-1">
        {COPILOT_SKILLS.map((s, i) => {
          const complete = isSkillComplete(s.id, activeSkill);
          const active = s.id === activeSkill;
          const t = SKILL_TOKENS[s.id];
          return (
            <div
              key={s.id}
              className="h-1 flex-1 overflow-hidden rounded-full"
              style={{ backgroundColor: CLAUDE.surfaceOverlay }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: complete ? "100%" : active ? "50%" : "0%",
                  backgroundColor: complete ? CLAUDE.validated : active ? t.color : "transparent",
                  boxShadow: active ? `0 0 6px ${t.color}66` : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Full 6-step stepper — use only on dashboard or expanded views. */
export function PolicySkillStepper({ activeSkill }: { activeSkill: CopilotSkillId }) {
  const reduced = useReducedMotion();
  const activeIdx = COPILOT_SKILLS.findIndex((s) => s.id === activeSkill);

  return (
    <nav aria-label="Policy lifecycle skills" className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-2">
      {COPILOT_SKILLS.map((skill, i) => {
        const complete = isSkillComplete(skill.id, activeSkill);
        const active = skill.id === activeSkill;
        return (
          <div key={skill.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1 px-1.5 sm:px-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: complete ? CLAUDE.validatedMuted : active ? CLAUDE.primary : CLAUDE.surfaceOverlay,
                  color: complete ? CLAUDE.validated : active ? "#fff" : CLAUDE.textMuted,
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
              >
                {complete ? <CheckIcon /> : i + 1}
              </motion.div>
              <span
                className={cn(COPILOT_TYPE.caption, "whitespace-nowrap font-medium")}
                style={{ color: active ? CLAUDE.text : CLAUDE.textMuted }}
              >
                {skill.label}
              </span>
            </div>
            {i < COPILOT_SKILLS.length - 1 ? (
              <div
                className="mb-4 hidden h-px w-4 sm:block md:w-6"
                style={{ backgroundColor: i < activeIdx ? CLAUDE.validated : CLAUDE.hairline }}
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export function IntentBanner({ intent }: { intent: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={LIVING_MOTION.discover}
      className="rounded-xl px-4 py-3"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <p className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.1em]")} style={{ color: CLAUDE.textSoft }}>
        Your intent
      </p>
      <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.text, fontFamily: CLAUDE.fontDisplay }}>
        {intent}
      </p>
    </motion.div>
  );
}

export function AuthorValidationPanel({
  interpretations,
  rules,
  stats,
  validateMode = false,
  checksPassed = false,
  complianceLabel,
  panelMode = "author",
  delay = 0,
}: {
  interpretations: InterpretationLine[];
  rules: GeneratedRule[];
  stats: ProcessingStats;
  validateMode?: boolean;
  checksPassed?: boolean;
  complianceLabel?: string;
  panelMode?: "author" | "govern";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const isGovern = panelMode === "govern";
  const panelTitle = isGovern ? "Policy details" : validateMode ? "Validate" : "Author";
  const panelSubtitle = isGovern
    ? "Interpretation, generated rules, and mapped objects"
    : "Plain language ↔ generated rules";
  const showPassedBadge = (validateMode && checksPassed) || isGovern;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3" style={{ borderColor: CLAUDE.hairline }}>
        <div>
          <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
            {panelTitle}
          </p>
          <p className="text-[12px]" style={{ color: CLAUDE.textMuted }}>
            {panelSubtitle}
          </p>
        </div>
        {showPassedBadge ? (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
          >
            {isGovern ? (complianceLabel ?? "Live") : (complianceLabel ?? "Checks passed")}
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 border-b px-4 py-2.5 text-[12px]" style={{ borderColor: CLAUDE.hairline, color: CLAUDE.textMuted }}>
        <span>{stats.groups} groups mapped</span>
        <span aria-hidden>·</span>
        <span>{stats.resources} resource{stats.resources !== 1 ? "s" : ""}</span>
        <span aria-hidden>·</span>
        <span>{stats.rules} rules generated</span>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b p-4 md:border-b-0 md:border-r" style={{ borderColor: CLAUDE.hairline }}>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: CLAUDE.textSoft }}>
            Interpretation
          </p>
          <ul className="space-y-2.5">
            {interpretations.map((line) => (
              <li key={line.text} className="flex items-start gap-2.5">
                {line.kind === "allow" ? <AllowIcon /> : line.kind === "deny" ? <DenyIcon /> : <NeutralIcon />}
                <span className="text-[13px] leading-snug" style={{ color: CLAUDE.textSecondary }}>
                  {line.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: CLAUDE.textSoft }}>
            Generated rules
          </p>
          <ul className="space-y-2">
            {rules.map((rule) => {
              const isAllow = rule.kind === "allow";
              const isDeny = rule.kind === "deny";
              const rail = isAllow ? CLAUDE.validated : isDeny ? "#f87171" : CLAUDE.primary;
              return (
              <li
                key={rule.label}
                className="rounded-lg border-l-[3px] px-3 py-2.5"
                style={{
                  borderLeftColor: rail,
                  backgroundColor: isAllow ? CLAUDE.validatedMuted : isDeny ? "rgba(239,68,68,0.08)" : CLAUDE.primaryMuted,
                  boxShadow: `inset 0 0 0 1px ${isAllow ? CLAUDE.validatedMuted : isDeny ? "rgba(239,68,68,0.2)" : CLAUDE.hairline}`,
                }}
              >
                <p className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: isAllow ? CLAUDE.validated : isDeny ? "#f87171" : CLAUDE.text }}>
                  <span aria-hidden>{isAllow ? "✓" : isDeny ? "⊘" : "◉"}</span>
                  {rule.label}
                </p>
                <p className="mt-0.5 text-[12px] font-mono" style={{ color: CLAUDE.textMuted, fontFamily: CLAUDE.fontMono }}>
                  {rule.detail}
                </p>
              </li>
            );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

type ContextTab = "objects" | "compliance" | "patterns" | "context";

export function ContextBrowserTabs({ data }: { data: ContextBrowserData }) {
  const [tab, setTab] = useState<ContextTab>("objects");
  const tabs: { id: ContextTab; label: string }[] = [
    { id: "objects", label: "Objects" },
    { id: "compliance", label: "Compliance" },
    { id: "patterns", label: "Patterns" },
    { id: "context", label: "Context" },
  ];

  return (
    <div className="overflow-hidden rounded-xl" style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}>
      <div className="flex gap-0.5 overflow-x-auto border-b p-1.5" style={{ borderColor: CLAUDE.hairline }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "shrink-0 rounded-lg px-3 text-[12px] font-medium transition-colors")}
            style={{
              backgroundColor: tab === t.id ? CLAUDE.surfaceOverlay : "transparent",
              color: tab === t.id ? CLAUDE.text : CLAUDE.textMuted,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tab === "objects" ? (
          <ul className="space-y-2">
            {data.objects.map((o) => (
              <li key={o.name} className="flex justify-between gap-2 text-[13px]">
                <span style={{ color: CLAUDE.textSecondary }}>{o.name}</span>
                <span className="text-[12px]" style={{ color: CLAUDE.textMuted }}>
                  {o.type}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "compliance" ? (
          <ul className="space-y-2">
            {data.compliance.map((c) => (
              <li key={c.framework} className="rounded-lg px-3 py-2" style={{ backgroundColor: CLAUDE.surfaceOverlay }}>
                <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
                  {c.framework}
                </p>
                <p className="text-[12px]" style={{ color: CLAUDE.textMuted }}>
                  {c.status}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "patterns" ? (
          <ul className="space-y-2">
            {data.patterns.map((p) => (
              <li key={p.name} className="flex justify-between text-[13px]">
                <span style={{ color: CLAUDE.textSecondary }}>{p.name}</span>
                <span className="font-medium tabular-nums" style={{ color: CLAUDE.primary }}>
                  {p.count}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "context" ? (
          <p className="text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
            {data.businessContext}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function RefineRulesReorder({
  rules,
  order,
  onReorder,
}: {
  rules: GeneratedRule[];
  order: number[];
  onReorder: (next: number[]) => void;
}) {
  const ordered = order.map((i) => rules[i]).filter(Boolean);

  function moveRule(from: number, to: number) {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onReorder(next);
  }

  return (
    <div className="space-y-2">
      <p className="text-[12px]" style={{ color: CLAUDE.textMuted }}>
        Drag priority — evaluation order affects which rule matches first
      </p>
      {ordered.map((rule, i) => {
        const isAllow = rule.kind === "allow";
        const isDeny = rule.kind === "deny";
        const rail = isAllow ? CLAUDE.validated : isDeny ? "#f87171" : CLAUDE.primary;
        return (
          <div
            key={`${rule.label}-${i}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const from = Number(e.dataTransfer.getData("text/plain"));
              if (!Number.isNaN(from)) moveRule(from, i);
            }}
            className="flex cursor-grab items-start gap-2 rounded-lg border-l-[3px] px-3 py-2.5 active:cursor-grabbing"
            style={{
              borderLeftColor: rail,
              backgroundColor: CLAUDE.surfaceOverlay,
            }}
          >
            <span className="mt-0.5 text-[10px] tabular-nums" style={{ color: CLAUDE.textSoft }}>
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium" style={{ color: isAllow ? CLAUDE.validated : isDeny ? "#f87171" : CLAUDE.text }}>
                {rule.label}
              </p>
              <p className="mt-0.5 text-[12px] font-mono" style={{ color: CLAUDE.textMuted, fontFamily: CLAUDE.fontMono }}>
                {rule.detail}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                onClick={() => moveRule(i, i - 1)}
                disabled={i === 0}
                className={cn(COPILOT_FOCUS, "rounded px-1 text-[9px]")}
                style={{ color: CLAUDE.textMuted }}
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveRule(i, i + 1)}
                disabled={i === ordered.length - 1}
                className={cn(COPILOT_FOCUS, "rounded px-1 text-[9px]")}
                style={{ color: CLAUDE.textMuted }}
                aria-label="Move down"
              >
                ↓
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EvidenceRecommendationCard({
  rec,
  applied,
  onApply,
  delay = 0,
}: {
  rec: EvidenceRecommendation;
  applied: boolean;
  onApply: () => void;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const insightKind: InsightKind = rec.patternCount ? "pattern" : rec.frameworks?.length ? "evidence" : "status";
  const kindColors = INSIGHT_KIND_COLORS[insightKind];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="rounded-xl p-3"
      style={{
        backgroundColor: applied ? CLAUDE.validatedMuted : CLAUDE.surfaceOverlay,
        boxShadow: applied ? `0 0 0 1px ${CLAUDE.validatedMuted}` : undefined,
      }}
    >
      <div className="flex flex-wrap items-start gap-2">
        <span
          className="rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: kindColors.muted, color: kindColors.color }}
        >
          {INSIGHT_KIND_LABEL[insightKind]}
        </span>
        <p className="flex-1 text-[13px] font-medium" style={{ color: CLAUDE.text }}>
          {rec.title}
        </p>
        {rec.frameworks?.map((f) => (
          <span
            key={f}
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.textMuted }}
          >
            {f}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
        <span className="font-medium" style={{ color: CLAUDE.textSecondary }}>
          Why this suggestion:{" "}
        </span>
        {rec.why}
        {rec.patternCount ? (
          <span style={{ color: CLAUDE.primary }}> ({rec.patternCount} similar policies)</span>
        ) : null}
      </p>
      <p className="mt-1 text-[12px]" style={{ color: CLAUDE.textSoft }}>
        Trade-off: {rec.tradeoff}
      </p>
      {!applied ? (
        <button
          type="button"
          onClick={onApply}
          className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "mt-2.5 rounded-full px-3 text-[12px] font-medium transition-opacity hover:opacity-90")}
          style={{ backgroundColor: CLAUDE.primary, color: "#fff" }}
        >
          Apply
        </button>
      ) : (
        <p className="mt-2 text-[11px] font-medium" style={{ color: CLAUDE.validated }}>
          Applied
        </p>
      )}
    </motion.div>
  );
}

export function DeployReadyCard({
  title,
  summary,
  authorName,
  reviewSchedule,
  onDeploy,
  onCancel,
  deploying = false,
  delay = 0,
}: {
  title: string;
  summary: string[];
  authorName: string;
  reviewSchedule: string;
  onDeploy?: () => void;
  onCancel?: () => void;
  deploying?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      id="approve-cta"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: CLAUDE.validatedMuted, boxShadow: `0 0 0 1px ${CLAUDE.validatedMuted}` }}
    >
      <div className="px-4 py-4">
        <p className="text-[13px] font-medium" style={{ color: CLAUDE.validated }}>
          {title}
        </p>
        <ul className="mt-2 space-y-1">
          {summary.map((line) => (
            <li key={line} className="flex items-center gap-2 text-[12px]" style={{ color: CLAUDE.textSecondary }}>
              <CheckIcon />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px]" style={{ color: CLAUDE.textMuted }}>
          {authorName} · {reviewSchedule}
        </p>
      </div>
      {onDeploy ? (
        <div className="flex gap-2 border-t px-4 py-3" style={{ borderColor: CLAUDE.hairline }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={deploying}
            className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "rounded-full px-4 text-[12px] font-medium")}
            style={{ color: CLAUDE.textMuted }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDeploy}
            disabled={deploying}
            className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "ml-auto rounded-full px-4 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60")}
            style={{ backgroundColor: CLAUDE.validated }}
          >
            {deploying ? "Deploying…" : "Deploy"}
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}

export function GovernPolicyOverview({
  name,
  status,
  regions,
  owner,
  lastChange,
  blastRadius,
  complianceLabel,
  contextLine,
  delay = 0,
}: {
  name: string;
  status: string;
  regions: string;
  owner: string;
  lastChange?: string;
  blastRadius: string;
  complianceLabel: string;
  contextLine: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="rounded-xl p-4"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
            {name}
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: CLAUDE.textMuted }}>
            {contextLine}
          </p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
        >
          {status}
        </span>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.08em]")} style={{ color: CLAUDE.textSoft }}>
            Owner
          </dt>
          <dd className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textSecondary }}>
            {owner}
          </dd>
        </div>
        <div>
          <dt className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.08em]")} style={{ color: CLAUDE.textSoft }}>
            Coverage
          </dt>
          <dd className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textSecondary }}>
            {regions}
            {lastChange ? ` · Updated ${lastChange.toLowerCase()}` : null}
          </dd>
        </div>
        <div>
          <dt className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.08em]")} style={{ color: CLAUDE.textSoft }}>
            Compliance
          </dt>
          <dd className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textSecondary }}>
            {complianceLabel}
          </dd>
        </div>
        <div>
          <dt className={cn(COPILOT_TYPE.caption, "font-medium uppercase tracking-[0.08em]")} style={{ color: CLAUDE.textSoft }}>
            Impact
          </dt>
          <dd className="mt-0.5 text-[13px]" style={{ color: CLAUDE.textSecondary }}>
            {blastRadius}
          </dd>
        </div>
      </dl>
    </motion.div>
  );
}

export function GovernRecordPanel({
  timeline,
  delay = 0,
}: {
  timeline: readonly { stage: string; time: string; evidence: string }[];
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...LIVING_MOTION.discover, delay }}
      className="rounded-xl p-4"
      style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
        Govern — policy record
      </p>
      <p className="mt-0.5 text-[12px]" style={{ color: CLAUDE.textMuted }}>
        Every stage traceable for audit
      </p>
      <div className="mt-4 space-y-3">
        {timeline.map((ev, i) => (
          <div key={ev.stage} className="flex gap-3">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: CLAUDE.primary, opacity: 0.4 + i * 0.12 }}
            />
            <div>
              <p className="text-[13px] font-medium" style={{ color: CLAUDE.text }}>
                {ev.stage}
              </p>
              <p className="text-[12px]" style={{ color: CLAUDE.textMuted }}>
                {ev.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

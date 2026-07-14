"use client";

import type { ReactNode } from "react";
import { EDITORIAL as CLAUDE, COPILOT_TYPE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const OUTCOME_PILLARS = [
  "Intent-first policy creation",
  "Continuous validation",
  "Explainable AI",
  "Human approval",
  "Shared understanding",
] as const;

const CONTINUED_DIRECTIONS = [
  "Understand why policies exist",
  "Reuse previous decisions",
  "Detect duplicate or unused rules",
  "Recommend improvements proactively",
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Looking back — belief shift on AI, what changed, key outcomes, and future directions for Policy Copilot.";

function ChipRow({ items, ariaLabel }: { items: readonly string[]; ariaLabel: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={ariaLabel}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium leading-snug text-neutral-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm md:p-4">
      <h3 className="text-[13px] font-semibold text-neutral-900">{title}</h3>
      <div className="mt-2 space-y-2.5 text-[12px] leading-relaxed text-neutral-600">
        {children}
      </div>
    </div>
  );
}

export function PolicyCopilotLookingBack() {
  return (
    <figure
      className="overflow-hidden rounded-xl border border-neutral-200 case-study-light-panel"
      style={{ backgroundColor: CLAUDE.bg }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b border-neutral-200 px-4 py-4 md:px-5 md:py-4">
        <p className="text-[14px] leading-relaxed text-neutral-700">
          This project changed how I think about AI.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-3">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
            <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
              Started
            </p>
            <p className="mt-1 text-[13px] leading-snug text-neutral-600">
              AI should automate work
            </p>
          </div>
          <span className="hidden text-center text-[13px] font-medium text-neutral-500 md:block" aria-hidden>
            →
          </span>
          <div
            className="rounded-xl border px-3 py-2.5"
            style={{
              backgroundColor: CLAUDE.primaryMuted,
              borderColor: CLAUDE.primaryBorder,
            }}
          >
            <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.primaryActive }}>
              Finished
            </p>
            <p className="mt-1 text-[13px] font-medium leading-snug text-neutral-900">
              AI helps people make better decisions
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 bg-neutral-50/80 p-4 md:grid-cols-3 md:p-5">
        <Panel title="What Changed">
          <p>
            Policy Copilot shifted firewall policy creation from configuration-first to
            intent-first, turning AI into a decision-making partner instead of a rule generator.
          </p>
        </Panel>

        <Panel title="Key Outcomes">
          <p>Reusable interaction model built around:</p>
          <ChipRow items={OUTCOME_PILLARS} ariaLabel="Key interaction model pillars" />
          <p className="pt-1 font-medium text-neutral-800">
            The biggest outcome wasn&rsquo;t faster policy creation&mdash;it was greater confidence in
            every decision.
          </p>
        </Panel>

        <Panel title="If I Continued">
          <p>Evolve Policy Copilot into an organisational knowledge system:</p>
          <ChipRow items={CONTINUED_DIRECTIONS} ariaLabel="Future directions for Policy Copilot" />
          <p className="pt-1 font-medium text-neutral-800">
            Support not just policy creation, but long-term organisational learning.
          </p>
        </Panel>
      </div>
    </figure>
  );
}

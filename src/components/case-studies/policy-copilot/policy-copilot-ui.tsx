"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, type RefObject } from "react";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import type { Recommendation } from "@/components/case-studies/policy-copilot/policy-copilot-data";

export function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function CanvasSection({
  id,
  title,
  hint,
  children,
  show = true,
}: {
  id: string;
  title: string;
  hint?: string;
  children: ReactNode;
  show?: boolean;
}) {
  const reduced = useReducedMotion();
  if (!show) return null;
  return (
    <motion.section
      id={id}
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="border-b pb-5 pt-2 last:border-0"
      style={{ borderColor: CLAUDE.hairline }}
    >
      {title || hint ? (
        <div className="mb-3">
          {title ? (
            <p
              className="text-[13px] font-medium tracking-tight"
              style={{ color: CLAUDE.textSecondary, fontFamily: CLAUDE.fontDisplay }}
            >
              {title}
            </p>
          ) : null}
          {hint ? (
            <p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
              {hint}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </motion.section>
  );
}

export function SectionLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3">
      <p
        className="text-[15px] font-normal leading-snug tracking-tight"
        style={{ color: CLAUDE.text, fontFamily: CLAUDE.fontDisplay }}
      >
        {children}
      </p>
      {hint ? (
        <p className="mt-1 text-[12px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function StarterPromptChip({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[11px] leading-snug transition-all",
        "hover:border-[rgb(92_151_238/0.35)] hover:bg-[rgb(92_151_238/0.08)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C97EE]",
      )}
      style={{
        borderColor: CLAUDE.border,
        backgroundColor: CLAUDE.surface,
        color: CLAUDE.textSecondary,
      }}
    >
      {children}
    </button>
  );
}

export function IntentLanding({
  request,
  placeholder,
  starters,
  inputRef,
  onRequestChange,
  onSubmit,
  onStarterSelect,
}: {
  request: string;
  placeholder: string;
  starters: readonly string[];
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onRequestChange: (value: string) => void;
  onSubmit: () => void;
  onStarterSelect: (prompt: string) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-xl px-2 text-center">
      <h3
        className="text-[1.125rem] font-normal tracking-tight md:text-[1.25rem]"
        style={{ color: CLAUDE.text, fontFamily: CLAUDE.fontDisplay }}
      >
        What security outcome do you need?
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
        Plain language only — no firewall syntax required.
      </p>

      <div
        className="mt-6 rounded-2xl border p-2 text-left shadow-[0_8px_32px_rgb(0_0_0/0.2)]"
        style={{
          borderColor: CLAUDE.borderStrong,
          backgroundColor: CLAUDE.surfaceRaised,
        }}
      >
        <textarea
          ref={inputRef}
          value={request}
          onChange={(e) => onRequestChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none bg-transparent px-2 py-2 text-center text-[14px] leading-relaxed outline-none transition-colors md:text-left [&::placeholder]:text-[#8e8b82]"
          style={{ color: CLAUDE.text }}
        />
        <div
          className="flex items-center justify-between gap-2 border-t px-1 pt-2"
          style={{ borderColor: CLAUDE.hairline }}
        >
          <span className="text-[10px]" style={{ color: CLAUDE.textSoft }}>
            ⌘ Enter
          </span>
          <PrimaryBtn onClick={onSubmit}>Understand intent</PrimaryBtn>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {starters.map((prompt) => (
          <StarterPromptChip key={prompt} onClick={() => onStarterSelect(prompt)}>
            {prompt}
          </StarterPromptChip>
        ))}
      </div>
    </div>
  );
}

export function PrimaryBtn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
}) {
  const styles = {
    primary: "text-white hover:opacity-90 active:scale-[0.98]",
    secondary: "border text-[#faf9f5] hover:bg-white/[0.04]",
    ghost: "hover:bg-white/[0.04]",
    danger: "border text-[#c64545]",
  };
  const styleMap = {
    primary: { backgroundColor: CLAUDE.primary },
    secondary: { borderColor: CLAUDE.borderStrong, backgroundColor: "transparent" },
    ghost: { color: CLAUDE.textSecondary, backgroundColor: "transparent" },
    danger: { borderColor: CLAUDE.riskMuted, backgroundColor: CLAUDE.riskMuted },
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={styleMap[variant]}
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-[13px] font-medium transition-all",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C97EE]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        styles[variant],
      )}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: "success" | "warning" | "attention" }) {
  const map = {
    success: { t: "Pass", c: CLAUDE.validated, bg: CLAUDE.validatedMuted },
    warning: { t: "Review", c: CLAUDE.warning, bg: CLAUDE.warningMuted },
    attention: { t: "Risk", c: CLAUDE.risk, bg: CLAUDE.riskMuted },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color: s.c, backgroundColor: s.bg }}
    >
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: s.c }} aria-hidden />
      {s.t}
    </span>
  );
}

export function ConfidenceMeter({ value, analysing = false }: { value: number; analysing?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label={`Confidence ${value} percent`}>
      <div
        className="h-1.5 w-24 overflow-hidden rounded-full"
        style={{ backgroundColor: CLAUDE.hairline }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: CLAUDE.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: analysing ? 0.4 : 0.65, ease: "easeOut" }}
        />
      </div>
      <span
        className="text-sm font-medium tabular-nums"
        style={{ color: CLAUDE.primary }}
      >
        {value}%
      </span>
    </div>
  );
}

export function EntityChip({
  label,
  value,
  delay = 0,
  editable = false,
  onChange,
}: {
  label: string;
  value: string;
  delay?: number;
  editable?: boolean;
  onChange?: (v: string) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, delay, ease }}
      className="rounded-[10px] border px-3 py-2.5 transition-colors"
      style={{
        borderColor: CLAUDE.border,
        backgroundColor: CLAUDE.surface,
      }}
    >
      <p className="text-[10px] font-medium" style={{ color: CLAUDE.textMuted }}>
        {label}
      </p>
      {editable && onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-0.5 w-full bg-transparent text-[12px] font-medium outline-none"
          style={{ color: CLAUDE.text }}
          aria-label={label}
        />
      ) : (
        <p className="mt-0.5 truncate text-[12px] font-medium" style={{ color: CLAUDE.text }}>
          {value}
        </p>
      )}
    </motion.div>
  );
}

export function SkeletonChip() {
  return (
    <div
      className="h-[54px] animate-pulse rounded-[10px]"
      style={{ backgroundColor: CLAUDE.hairline }}
      aria-hidden
    />
  );
}

export function TopologyFlow({
  source,
  application,
  destination,
}: {
  source: string;
  application: string;
  destination: string;
}) {
  const nodes = [
    { label: "Source", value: source },
    { label: "Application", value: application },
    { label: "Destination", value: destination },
  ];
  return (
    <div
      className="flex items-center gap-1.5 rounded-[12px] border px-2.5 py-3"
      style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
      aria-label={`Traffic flow from ${source} through ${application} to ${destination}`}
    >
      {nodes.map((node, i) => (
        <div key={node.label} className="flex min-w-0 flex-1 items-center gap-1.5">
          <div
            className="min-w-0 flex-1 rounded-lg px-1.5 py-1.5 text-center"
            style={{ backgroundColor: CLAUDE.surfaceRaised }}
          >
            <p className="text-[9px] font-medium" style={{ color: CLAUDE.textMuted }}>
              {node.label}
            </p>
            <p className="truncate text-[11px] font-medium" style={{ color: CLAUDE.text }}>
              {node.value}
            </p>
          </div>
          {i < nodes.length - 1 ? (
            <motion.svg
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: CLAUDE.primary }}
              viewBox="0 0 12 12"
              aria-hidden
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * i }}
            >
              <path d="M2 6h7M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </motion.svg>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function CollapsedIntent({ text, onEdit }: { text: string; onEdit: () => void }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5"
      style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}
    >
      <span className="text-[10px] font-medium" style={{ color: CLAUDE.textMuted }}>
        Intent
      </span>
      <p className="min-w-0 flex-1 truncate text-[12px]" style={{ color: CLAUDE.textSecondary }}>
        {text}
      </p>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-[12px] font-medium hover:underline"
        style={{ color: CLAUDE.primary }}
      >
        Edit
      </button>
    </div>
  );
}

export function ClarificationCard({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string;
  options: string[];
  selected?: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div
      className="rounded-[12px] border p-3"
      style={{
        borderColor: selected ? CLAUDE.primaryBorder : CLAUDE.border,
        backgroundColor: selected ? CLAUDE.primaryMuted : CLAUDE.surface,
      }}
    >
      <p className="text-[12px] font-medium leading-snug" style={{ color: CLAUDE.text }}>
        {question}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="rounded-full border px-2.5 py-1 text-[11px] transition-all"
            style={{
              borderColor: selected === option ? CLAUDE.primaryBorder : CLAUDE.border,
              backgroundColor: selected === option ? CLAUDE.primaryMuted : "transparent",
              color: selected === option ? CLAUDE.text : CLAUDE.textSecondary,
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ValidationRow({
  title,
  explanation,
  action,
  status,
  index,
}: {
  title: string;
  explanation: string;
  action: string;
  status: "success" | "warning" | "attention";
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay: index * 0.05 }}
      className="flex items-start gap-2.5 rounded-[10px] border p-2.5"
      style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}
    >
      <StatusBadge status={status} />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium" style={{ color: CLAUDE.text }}>
          {title}
        </p>
        <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {explanation}
        </p>
        <p className="mt-0.5 text-[10px]" style={{ color: CLAUDE.accentTeal }}>
          {action}
        </p>
      </div>
    </motion.div>
  );
}

export function RecommendationCard({
  rec,
  expanded,
  compareExpanded,
  dismissed,
  onApply,
  onDismiss,
  onToggleWhy,
  onToggleCompare,
}: {
  rec: Recommendation;
  expanded: boolean;
  compareExpanded: boolean;
  dismissed: boolean;
  onApply: () => void;
  onDismiss: () => void;
  onToggleWhy: () => void;
  onToggleCompare: () => void;
}) {
  if (dismissed) return null;
  return (
    <motion.div
      layout
      className="rounded-[12px] border p-3"
      style={{
        borderColor: rec.applied ? CLAUDE.primaryBorder : CLAUDE.border,
        backgroundColor: rec.applied ? CLAUDE.primaryMuted : CLAUDE.surface,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium" style={{ color: CLAUDE.text }}>
          {rec.title}
        </p>
        {rec.applied ? <StatusBadge status="success" /> : null}
      </div>
      <AnimatePresence>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2.5 space-y-1 overflow-hidden text-[11px] leading-relaxed"
            style={{ color: CLAUDE.textMuted }}
          >
            <p><span style={{ color: CLAUDE.textSecondary }}>Why:</span> {rec.reason}</p>
            <p><span style={{ color: CLAUDE.textSecondary }}>Business:</span> {rec.improvement}</p>
            <p><span style={{ color: CLAUDE.textSecondary }}>Security:</span> {rec.securityImpact ?? rec.ifIgnored}</p>
            <p><span style={{ color: CLAUDE.textSecondary }}>Compliance:</span> {rec.complianceImpact ?? "Supports regulatory audit posture."}</p>
            <p><span style={{ color: CLAUDE.textSecondary }}>Trade-offs:</span> {rec.tradeoffs ?? "Minor operational friction for stronger control."}</p>
          </motion.div>
        ) : null}
        {compareExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2.5 grid grid-cols-2 gap-2 overflow-hidden text-[11px]"
          >
            <div className="rounded-lg border p-2" style={{ borderColor: CLAUDE.border }}>
              <p className="mb-1 font-medium" style={{ color: CLAUDE.textMuted }}>Without</p>
              <p style={{ color: CLAUDE.textSecondary }}>{rec.ifIgnored}</p>
            </div>
            <div
              className="rounded-lg border p-2"
              style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
            >
              <p className="mb-1 font-medium" style={{ color: CLAUDE.primary }}>With change</p>
              <p style={{ color: CLAUDE.text }}>{rec.improvement}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="mt-2.5 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={onApply}
          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          style={{ color: CLAUDE.primary }}
        >
          {rec.applied ? "Applied" : "Apply"}
        </button>
        <button
          type="button"
          onClick={onToggleCompare}
          className="rounded-full px-2.5 py-0.5 text-[10px]"
          style={{ color: CLAUDE.textSecondary }}
        >
          {compareExpanded ? "Hide compare" : "Compare"}
        </button>
        <button
          type="button"
          onClick={onToggleWhy}
          className="rounded-full px-2.5 py-0.5 text-[10px]"
          style={{ color: CLAUDE.textSecondary }}
        >
          Why?
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full px-2.5 py-0.5 text-[10px]"
          style={{ color: CLAUDE.textSoft }}
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <div
        className="h-1 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: CLAUDE.hairline }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: CLAUDE.validated }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>
      <span className="text-[10px] tabular-nums" style={{ color: CLAUDE.textMuted }}>
        {value}/{max}
      </span>
    </div>
  );
}

export function PromptChip({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[10px] border px-3 py-2.5 text-left text-[11px] leading-relaxed transition-all",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
      )}
      style={{
        borderColor: selected ? CLAUDE.primaryBorder : CLAUDE.border,
        backgroundColor: selected ? CLAUDE.primaryMuted : CLAUDE.surface,
        color: selected ? CLAUDE.text : CLAUDE.textSecondary,
      }}
    >
      {children}
    </button>
  );
}

export function MemoryTimeline({
  events,
}: {
  events: Array<{ id: string; title: string; detail: string; time: string }>;
}) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => (
        <div key={event.id} className="flex gap-2.5">
          <div className="flex flex-col items-center pt-1">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: CLAUDE.primary }}
            />
            {i < events.length - 1 ? (
              <span className="w-px flex-1" style={{ backgroundColor: CLAUDE.hairline }} />
            ) : null}
          </div>
          <div className="pb-2.5">
            <p className="text-[11px] font-medium" style={{ color: CLAUDE.text }}>
              {event.title}
            </p>
            <p
              className="line-clamp-2 text-[10px] leading-relaxed"
              style={{ color: CLAUDE.textMuted }}
            >
              {event.detail}
            </p>
            <p className="text-[9px]" style={{ color: CLAUDE.primary }}>
              {event.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

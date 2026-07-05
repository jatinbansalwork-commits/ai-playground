"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  COPILOT_NAV_ITEMS,
  COPILOT_RECENT_POLICIES,
  type CopilotRecentItem,
} from "@/components/case-studies/policy-copilot/policy-copilot-data";
import {
  inferPolicyStatus,
  scenarioIconFromPrompt,
  STATUS_DOT,
  STATUS_LEGEND,
} from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import { CopilotPlusIcon, HomeNavIcon } from "@/components/case-studies/policy-copilot/policy-copilot-nav-icons";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, COPILOT_TYPE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

/** Shared sidebar rhythm — one left edge for nav, recents, and footer. */
const SIDEBAR_X = "px-2.5";
/** Fixed optical column so labels share one vertical edge. */
const SIDEBAR_ICON_SLOT = "flex size-5 shrink-0 items-center justify-center";
const SIDEBAR_ROW =
  "flex w-full min-h-9 items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 text-left text-[12px] leading-none";
const SIDEBAR_NAV_ROW =
  "relative flex w-full min-h-10 items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left text-[12px] leading-snug";
const SIDEBAR_RECENT_ROW =
  "flex w-full min-h-9 items-center gap-1.5 rounded-[10px] py-1.5 pl-1.5 pr-2.5 text-left text-[12px] leading-none";

export function CopilotMark({ size = 40, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      {glow ? (
        <span
          className="absolute inset-0 scale-150 rounded-full blur-xl"
          style={{ backgroundColor: CLAUDE.primary, opacity: 0.18 }}
        />
      ) : null}
      <span
        className="absolute left-0 top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full"
        style={{ backgroundColor: CLAUDE.primary, opacity: 0.92 }}
      />
      <span
        className="absolute right-0 top-1/2 h-[58%] w-[58%] -translate-y-1/2 rounded-full mix-blend-screen"
        style={{ backgroundColor: CLAUDE.accentTeal, opacity: 0.88 }}
      />
    </div>
  );
}

export function WorkspaceAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-1/4 top-0 h-2/3 w-2/3 rounded-full blur-3xl"
        style={{ backgroundColor: CLAUDE.primary, opacity: 0.04 }}
      />
      <div
        className="absolute -right-1/4 bottom-0 h-1/2 w-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: CLAUDE.accentTeal, opacity: 0.03 }}
      />
    </div>
  );
}

export function FlowProgress({
  step,
  total,
  progress,
  label,
  status,
  compact = false,
}: {
  step: number;
  total: number;
  progress: number;
  label: string;
  status?: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={compact ? "w-full" : ""}>
      <div className="flex items-center justify-between gap-2">
        <p
          className={cn("font-medium", compact ? "text-[13px]" : "text-[12px]")}
          style={{ color: CLAUDE.textMuted }}
        >
          {step > 0 ? `Step ${step}/${total}` : "Getting started"}
        </p>
        <div className="flex items-center gap-2">
          {status ? (
            <motion.span
              key={status}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px]"
              style={{ color: CLAUDE.textSoft }}
            >
              {status}
            </motion.span>
          ) : null}
          {step > 0 ? (
            <motion.p
              key={progress}
              initial={reduced ? false : { opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("tabular-nums font-medium", compact ? "text-[13px]" : "text-[12px]")}
              style={{ color: CLAUDE.primary }}
            >
              {progress}%
            </motion.p>
          ) : null}
        </div>
      </div>
      <div
        className={cn("overflow-hidden rounded-full", compact ? "mt-1 h-0.5" : "mt-2 h-1")}
        style={{ backgroundColor: CLAUDE.hairline }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: CLAUDE.primary,
            boxShadow: `0 0 12px ${CLAUDE.primaryMuted}`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <motion.p
        layout
        className={cn("mt-2 tracking-tight", compact ? "text-[10px]" : "text-[13px] md:text-[14px]")}
        style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
      >
        {label}
      </motion.p>
    </div>
  );
}

export type CopilotNavId = "dashboard" | "lifecycle" | "analytics";

function filterRecentGroups(
  groups: { period: string; items: CopilotRecentItem[] }[],
  query: string,
) {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) || item.prompt.toLowerCase().includes(q),
      ),
    }))
    .filter((group) => group.items.length > 0);
}

function RecentList({
  groups,
  onSelect,
  activeLabel,
}: {
  groups: { period: string; items: CopilotRecentItem[] }[];
  onSelect: (item: CopilotRecentItem) => void;
  activeLabel?: string;
}) {
  if (groups.length === 0) {
    return (
      <p className="py-2 text-[13px]" style={{ color: CLAUDE.textSoft }}>
        No policies match your search.
      </p>
    );
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.period} className="mb-3">
          <p
            className={cn("mb-1.5 font-medium tracking-wide", COPILOT_TYPE.eyebrow)}
            style={{ color: CLAUDE.textMuted }}
          >
            {group.period}
          </p>
          <ul className="space-y-1.5">
            {group.items.map((item) => {
              const isActive = activeLabel === item.label;
              const status = inferPolicyStatus(item.prompt, item.flowMode);
              const icon = scenarioIconFromPrompt(item.prompt);
              const statusTip = STATUS_LEGEND.find((l) => l.tone === status)?.tip;
              return (
                <li key={item.label} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={cn(
                      COPILOT_FOCUS,
                      SIDEBAR_RECENT_ROW,
                      "transition-colors hover:bg-white/[0.05]",
                      isActive && "bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
                    )}
                    style={{ color: isActive ? CLAUDE.text : CLAUDE.textSecondary }}
                    aria-current={isActive ? "true" : undefined}
                    title={item.prompt}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: STATUS_DOT[status] }}
                      title={statusTip}
                      aria-label={statusTip ?? status}
                    />
                    <span className={SIDEBAR_ICON_SLOT} aria-hidden>
                      <span className="text-[12px] leading-none">{icon}</span>
                    </span>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

export function PolicyCopilotSidebar({
  variant,
  compact = false,
  activeNav,
  onNavChange,
  searchQuery = "",
  onSearchChange,
  activeRecentLabel,
  onBack,
  onRecentSelect,
  onStartNewPolicy,
}: {
  variant: "home" | "flow";
  compact?: boolean;
  activeNav: CopilotNavId;
  onNavChange: (id: CopilotNavId) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeRecentLabel?: string;
  onBack?: () => void;
  onRecentSelect: (item: CopilotRecentItem) => void;
  onStartNewPolicy?: () => void;
}) {
  const filteredRecent = filterRecentGroups(COPILOT_RECENT_POLICIES, searchQuery);

  return (
    <aside
      className={cn(
        "relative z-10 flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r",
        compact ? "w-[148px] md:w-[156px]" : "w-[172px] md:w-[192px]",
      )}
      style={{ backgroundColor: CLAUDE.surface, borderColor: CLAUDE.hairline }}
    >
      <div className={cn("space-y-2.5", SIDEBAR_X, "pb-3 pt-2.5")}>
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className={cn(
            COPILOT_FOCUS,
            COPILOT_TARGET.iconSm,
            "-ml-1 rounded-lg transition-colors",
            onBack ? "hover:bg-white/[0.04]" : "opacity-30",
          )}
          style={{ color: CLAUDE.textMuted }}
          aria-label={onBack ? "Back" : "Back unavailable"}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onStartNewPolicy}
          className={cn(
            COPILOT_FOCUS,
            SIDEBAR_ROW,
            "rounded-[10px] border font-medium",
          )}
          style={{
            borderColor: CLAUDE.primaryBorder,
            backgroundColor: CLAUDE.primaryMuted,
            color: CLAUDE.text,
          }}
        >
          <span className={SIDEBAR_ICON_SLOT} style={{ color: CLAUDE.primary }} aria-hidden>
            <CopilotPlusIcon />
          </span>
          <span className="min-w-0 flex-1 truncate">Start New Policy</span>
        </button>

        <label className="relative block">
          <span className="sr-only">Search Policies</span>
          <svg
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: CLAUDE.textSoft }}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search Policies..."
            className={cn(
              COPILOT_FOCUS,
              "w-full rounded-[10px] border py-2.5 pl-9 pr-2.5 text-[13px] outline-none [&::placeholder]:text-[#a8a49c]",
            )}
            style={{
              backgroundColor: CLAUDE.surfaceRaised,
              borderColor: CLAUDE.border,
              color: CLAUDE.textSecondary,
            }}
          />
        </label>
      </div>

      <nav
        className={cn("border-t pt-3 pb-1", SIDEBAR_X)}
        style={{ borderColor: CLAUDE.hairline }}
        aria-label="Policy Copilot navigation"
      >
        <ul className="space-y-1.5">
          {COPILOT_NAV_ITEMS.map((item) => {
            const navId = item.id as CopilotNavId;
            const isActive = activeNav === navId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavChange(navId)}
                  className={cn(
                    COPILOT_FOCUS,
                    SIDEBAR_NAV_ROW,
                    "w-full font-medium transition-colors",
                    isActive
                      ? "bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                      : "hover:bg-white/[0.04]",
                  )}
                  style={{ color: isActive ? CLAUDE.text : CLAUDE.textMuted }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={SIDEBAR_ICON_SLOT}
                    style={{ color: "inherit", opacity: isActive ? 1 : 0.72 }}
                    aria-hidden
                  >
                    <HomeNavIcon id={item.id} />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "no-scrollbar min-h-0 overflow-y-auto border-t pt-3 pb-2",
          SIDEBAR_X,
        )}
        style={{ borderColor: CLAUDE.hairline, maxHeight: "calc(100% - 13.25rem)" }}
      >
        <RecentList
          groups={filteredRecent}
          onSelect={onRecentSelect}
          activeLabel={activeRecentLabel}
        />
      </div>

      <div className={cn("shrink-0 border-t", SIDEBAR_X, "py-2.5")} style={{ borderColor: CLAUDE.hairline }}>
        <button
          type="button"
          className={cn(COPILOT_FOCUS, SIDEBAR_ROW, "w-full")}
          style={{ color: CLAUDE.textMuted }}
        >
          <span className={SIDEBAR_ICON_SLOT} style={{ color: "inherit", opacity: 0.7 }} aria-hidden>
            <svg className="block h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="min-w-0 flex-1 truncate">Settings</span>
        </button>
      </div>
    </aside>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ThinkingDots() {
  const reduced = useReducedMotion();
  if (reduced) return <span>…</span>;
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1 w-1 rounded-full"
          style={{ backgroundColor: CLAUDE.textMuted }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export function PolicyCopilotFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex h-full min-h-0 overflow-hidden", className)}
      style={{
        backgroundColor: CLAUDE.bg,
        fontFamily: CLAUDE.fontBody,
        color: CLAUDE.text,
      }}
    >
      <WorkspaceAtmosphere />
      {children}
    </div>
  );
}

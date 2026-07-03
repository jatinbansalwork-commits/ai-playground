/**
 * Policy Copilot — WCAG 2.2 AA typography, contrast, and interaction targets.
 *
 * - Normal text: ≥14px body, ≥12px labels; 4.5:1 contrast on surfaces
 * - Large text / UI: 3:1 minimum
 * - Target size (2.5.8): ≥24px; we use 36–44px for primary controls
 * - Focus appearance (2.4.11): visible 2px ring with offset
 */

/** Visible focus for keyboard users — 2.4.11 */
export const COPILOT_FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C97EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1e1b]";

export const COPILOT_TYPE = {
  /** Section eyebrows — 12px semibold uppercase */
  eyebrow: "text-xs font-semibold uppercase tracking-wide leading-snug",
  /** Timestamps, meta — 12px */
  caption: "text-xs leading-relaxed",
  /** Dense panels — 13px */
  bodySm: "text-[13px] leading-relaxed",
  /** Default reading — 14px */
  body: "text-sm leading-relaxed",
  /** Primary canvas copy — 15–16px */
  bodyLg: "text-[15px] leading-relaxed md:text-base",
  /** Card titles */
  title: "text-sm font-medium tracking-tight md:text-[15px]",
  titleLg: "text-[15px] font-medium tracking-tight md:text-base",
  /** Status rail hints */
  hint: "text-sm leading-snug",
} as const;

/** WCAG 2.2 target size — 2.5.8 (minimum 24px; prefer 44px on primary actions) */
export const COPILOT_TARGET = {
  button: "inline-flex min-h-11 items-center justify-center",
  chip: "inline-flex min-h-9 items-center justify-center",
  chipCompact: "inline-flex min-h-8 items-center justify-center",
  icon: "inline-flex h-11 w-11 shrink-0 items-center justify-center",
  iconSm: "inline-flex h-9 w-9 shrink-0 items-center justify-center",
} as const;

/** Placeholder on surfaceRaised — ≥4.5:1 contrast */
export const COPILOT_PLACEHOLDER = "#a8a49c";

/** Shared reveal window length — same for every user worldwide. */
export const CASE_STUDY_REVEAL_DURATION_MS = 24 * 60 * 60 * 1000;

/** Daily reset anchor — India Standard Time (UTC+5:30, no DST). */
export const CASE_STUDY_REVEAL_RESET_TIMEZONE = "Asia/Kolkata";
export const CASE_STUDY_REVEAL_RESET_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

export type CaseStudyRevealMode = "daily-reset" | "fixed";

export interface CaseStudyRevealScheduleEntry {
  /**
   * `daily-reset` — countdown resets at each IST midnight; body stays blurred until published.
   * `fixed` — one-shot countdown from `startsAtUtc` + 24 hours (legacy).
   */
  mode: CaseStudyRevealMode;
  /** Required for `fixed` mode — UTC ISO-8601 instant when the countdown starts. */
  startsAtUtc?: string;
}

/**
 * Pre-launch blur schedules — keyed by project slug.
 * Remove a slug (or omit it) to publish and drop the gate.
 */
export const CASE_STUDY_REVEAL_SCHEDULE: Record<string, CaseStudyRevealScheduleEntry> =
  {
    "cisco-policy-copilot": {
      mode: "daily-reset",
    },
  };

export interface CaseStudyRevealState {
  isRevealed: boolean;
  remainingMs: number;
}

function getTimezoneDayStartMs(nowMs: number, offsetMs: number): number {
  const shiftedMs = nowMs + offsetMs;
  const date = new Date(shiftedMs);
  const dayStartShiftedMs = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return dayStartShiftedMs - offsetMs;
}

/** Next IST midnight as a UTC epoch — same remaining time for every visitor. */
export function getNextDailyResetMs(
  nowMs: number = Date.now(),
  offsetMs: number = CASE_STUDY_REVEAL_RESET_OFFSET_MS,
): number {
  return getTimezoneDayStartMs(nowMs, offsetMs) + CASE_STUDY_REVEAL_DURATION_MS;
}

/** Time until the next IST midnight — same remaining time for every visitor. */
export function getDailyResetRemainingMs(nowMs: number = Date.now()): number {
  return Math.max(0, getNextDailyResetMs(nowMs) - nowMs);
}

export function getCaseStudyRevealState(
  slug: string,
  nowMs: number = Date.now(),
): CaseStudyRevealState | null {
  const entry = CASE_STUDY_REVEAL_SCHEDULE[slug];
  if (!entry) return null;

  if (entry.mode === "daily-reset") {
    return {
      isRevealed: false,
      remainingMs: getDailyResetRemainingMs(nowMs),
    };
  }

  const startsAtMs = Date.parse(entry.startsAtUtc ?? "");
  if (Number.isNaN(startsAtMs)) return null;

  const unlockAtMs = startsAtMs + CASE_STUDY_REVEAL_DURATION_MS;
  const remainingMs = Math.max(0, unlockAtMs - nowMs);

  return {
    isRevealed: remainingMs <= 0,
    remainingMs,
  };
}

/** @deprecated Use `getCaseStudyRevealState` — kept for one-shot fixed schedules. */
export function getCaseStudyRevealUnlockAtMs(slug: string): number | null {
  const entry = CASE_STUDY_REVEAL_SCHEDULE[slug];
  if (!entry || entry.mode !== "fixed" || !entry.startsAtUtc) return null;

  const startsAtMs = Date.parse(entry.startsAtUtc);
  if (Number.isNaN(startsAtMs)) return null;

  return startsAtMs + CASE_STUDY_REVEAL_DURATION_MS;
}

export function getCaseStudyRevealRemainingMs(
  unlockAtMs: number,
  nowMs: number = Date.now(),
): number {
  return Math.max(0, unlockAtMs - nowMs);
}

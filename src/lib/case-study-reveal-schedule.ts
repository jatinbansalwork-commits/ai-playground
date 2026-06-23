/** Shared reveal window length — same for every user worldwide. */
export const CASE_STUDY_REVEAL_DURATION_MS = 24 * 60 * 60 * 1000;

export interface CaseStudyRevealScheduleEntry {
  /** UTC ISO-8601 instant when the reveal window opens for everyone. */
  startsAtUtc: string;
}

/**
 * Global case study reveal schedules — keyed by project slug.
 * Update `startsAtUtc` to reset the worldwide countdown (do not use localStorage).
 */
export const CASE_STUDY_REVEAL_SCHEDULE: Record<string, CaseStudyRevealScheduleEntry> =
  {
    "cisco-policy-copilot": {
      /** Reset this UTC instant to restart the worldwide 24-hour countdown. */
      startsAtUtc: "2026-06-23T04:38:02.000Z",
    },
  };

export function getCaseStudyRevealUnlockAtMs(slug: string): number | null {
  const entry = CASE_STUDY_REVEAL_SCHEDULE[slug];
  if (!entry) return null;

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

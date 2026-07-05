/**
 * Living policy journey pacing — deliberate beats tuned for firewall-admin review.
 * Slower than chat UX: inventory lookups, compliance checks, and deploy gates take time.
 */

export function livingDelay(ms: number, reducedMotion: boolean | null): number {
  const reduced = reducedMotion ?? false;
  if (reduced) {
    if (ms === 0) return 0;
    return Math.max(60, Math.round(ms * 0.12));
  }
  return ms;
}

export const LIVING_DELAY_MS = {
  /** Reading the request and pulling inventory before first interpretation */
  understandToClarify: 3000,
  /** Copilot composes a thread reply */
  threadReply: 780,
  /** Follow-on after a suggestion (checks, mapping, MFA, approve) */
  suggestionAction: 1100,
  /** Memory capture field recorded */
  captureField: 550,
  /** Entity resolve — start offset, per-object step, finish pad before draft */
  entityMapStart: 900,
  entityMapStep: 720,
  entityMapFinish: 1500,
  /** Safety check: interval before running, then time to pass */
  checkStep: 1000,
  checkResolve: 880,
  checkCompletePad: 700,
  /** Regional deploy + completion message */
  shipComplete: 4800,
  /** Pre-deploy blast simulation strip */
  blastSimulation: 3200,
  canvasPulse: 2200,
  scrollToApprove: 600,
  /** Drift / legacy document thread beats */
  reviewBeat: 950,
} as const;

export function entityMappingDuration(entityCount: number, reducedMotion: boolean | null): number {
  const reduced = reducedMotion ?? false;
  return (
    livingDelay(LIVING_DELAY_MS.entityMapStart, reduced) +
    entityCount * livingDelay(LIVING_DELAY_MS.entityMapStep, reduced) +
    livingDelay(LIVING_DELAY_MS.entityMapFinish, reduced)
  );
}

export function safetyChecksDuration(checkCount: number, reducedMotion: boolean | null): number {
  const reduced = reducedMotion ?? false;
  const cycle =
    livingDelay(LIVING_DELAY_MS.checkStep, reduced) +
    livingDelay(LIVING_DELAY_MS.checkResolve, reduced);
  return checkCount * cycle + livingDelay(LIVING_DELAY_MS.checkCompletePad, reduced);
}

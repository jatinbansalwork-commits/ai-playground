import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";

export const JOURNEY_STEP_COUNT = 8 as const;

export interface JourneyStep {
  step: number;
  title: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  { step: 1, title: "Start with Business Intent" },
  { step: 2, title: "Understand Before Generating" },
  { step: 3, title: "Clarify Only What's Missing" },
  { step: 4, title: "Assemble the Policy" },
  { step: 5, title: "Validate Continuously" },
  { step: 6, title: "Review the Impact" },
  { step: 7, title: "Improve Before Approving" },
  { step: 8, title: "Approve with Confidence" },
];

export function resolveJourneyStep(
  phase: LivingPhase,
  opts?: { understandingConfirmed?: boolean; simulateAcknowledged?: boolean; approvalReviewReady?: boolean },
): JourneyStep {
  switch (phase) {
    case "invite":
    case "understand":
      return JOURNEY_STEPS[0];
    case "clarify":
      return opts?.understandingConfirmed ? JOURNEY_STEPS[2] : JOURNEY_STEPS[1];
    case "sense":
    case "draft":
      return JOURNEY_STEPS[3];
    case "check":
      return JOURNEY_STEPS[4];
    case "refine":
      return JOURNEY_STEPS[6];
    case "approve":
      return opts?.simulateAcknowledged && opts?.approvalReviewReady ? JOURNEY_STEPS[7] : JOURNEY_STEPS[5];
    case "ship":
    case "done":
      return JOURNEY_STEPS[7];
    default:
      return JOURNEY_STEPS[0];
  }
}

export function journeyStepLabel(step: JourneyStep): string {
  return `Step ${step.step} of ${JOURNEY_STEP_COUNT} — ${step.title}`;
}

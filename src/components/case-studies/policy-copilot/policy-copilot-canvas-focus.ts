import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";

export type CanvasFocus =
  | "reflection"
  | "mapping"
  | "draft"
  | "validation"
  | "optimise"
  | "impact"
  | "approval";

export function canvasFocusForPhase(phase: LivingPhase): CanvasFocus | null {
  switch (phase) {
    case "clarify":
      return "reflection";
    case "sense":
      return "mapping";
    case "draft":
      return "draft";
    case "check":
      return "validation";
    case "refine":
      return "optimise";
    case "approve":
      return "impact";
    case "ship":
    case "done":
      return "approval";
    default:
      return null;
  }
}

export function showReflectionCanvas(phase: LivingPhase): boolean {
  return phase === "clarify";
}

export function showMappingCanvas(phase: LivingPhase): boolean {
  return phase === "sense";
}

export function showDraftCanvas(phase: LivingPhase): boolean {
  return phase === "draft";
}

export function showAuthorPanelCanvas(phase: LivingPhase, entityReveal: number, entityTotal: number): boolean {
  return (
    (phase === "draft" || phase === "check") &&
    entityReveal >= entityTotal
  );
}

export function showTechnicalRulesCanvas(phase: LivingPhase): boolean {
  return phase === "draft" || phase === "check";
}

export function showValidationCanvas(phase: LivingPhase): boolean {
  return phase === "check";
}

export function showOptimiseCanvas(phase: LivingPhase): boolean {
  return phase === "refine";
}

export function showImpactCanvas(phase: LivingPhase): boolean {
  return phase === "approve";
}

export function showComplianceSummaryCanvas(phase: LivingPhase, _allChecksPassed: boolean): boolean {
  return phase === "refine";
}

export function showApprovalSummaryCanvas(
  phase: LivingPhase,
  opts: { simulateAcknowledged: boolean; approvalReviewReady: boolean; allChecksPassed: boolean },
): boolean {
  return phase === "approve" && opts.approvalReviewReady && opts.simulateAcknowledged;
}

import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";

export const COPILOT_SKILLS = [
  { id: "intent", label: "Intent" },
  { id: "author", label: "Author" },
  { id: "validate", label: "Validate" },
  { id: "deploy", label: "Deploy" },
  { id: "optimize", label: "Optimize" },
  { id: "govern", label: "Govern" },
] as const;

export type CopilotSkillId = (typeof COPILOT_SKILLS)[number]["id"];

export function skillForPhase(
  phase: LivingPhase,
  flowMode: "author" | "review" | "document",
): CopilotSkillId {
  if (flowMode === "review") {
    if (phase === "memory") return "optimize";
    if (phase === "approve" || phase === "ship") return "deploy";
    if (phase === "done") return "govern";
    return "govern";
  }
  if (flowMode === "document") {
    if (phase === "capture") return "govern";
    if (phase === "done") return "govern";
    return "govern";
  }

  switch (phase) {
    case "invite":
    case "understand":
    case "clarify":
      return "intent";
    case "sense":
    case "draft":
      return "author";
    case "check":
      return "validate";
    case "refine":
      return "optimize";
    case "approve":
    case "ship":
      return "deploy";
    case "done":
      return "govern";
    default:
      return "intent";
  }
}

export function skillIndex(skill: CopilotSkillId): number {
  return COPILOT_SKILLS.findIndex((s) => s.id === skill);
}

export function isSkillComplete(skill: CopilotSkillId, active: CopilotSkillId): boolean {
  return skillIndex(skill) < skillIndex(active);
}

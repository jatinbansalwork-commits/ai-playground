import type { ResolvedIntentClarification } from "@/components/case-studies/policy-copilot/policy-copilot-intent-clarification";
import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export interface ThreadHistoryItem {
  id: string;
  role: "copilot" | "user" | "insight";
  text: string;
  time?: string;
  insightKind?: "pattern" | "status" | "evidence";
}

function stageTime(
  timeline: LivingScenarioPreset["lifecycleTimeline"],
  index: number,
): string {
  return timeline[index]?.time ?? "Now";
}

/** Reconstruct the full authoring conversation for portfolio / govern views. */
export function buildAuthoringThreadHistory(
  preset: LivingScenarioPreset,
  clarification: ResolvedIntentClarification,
  prompt: string,
  governClose?: { policyName: string; status: string; regions: string },
): ThreadHistoryItem[] {
  const reflection = clarification.understandingReflection;
  const timeline = preset.lifecycleTimeline;

  const items: Omit<ThreadHistoryItem, "id">[] = [
    { role: "user", text: prompt, time: stageTime(timeline, 0) },
    {
      role: "copilot",
      text: `${reflection.lead} ${reflection.confirmPrompt}`,
      time: stageTime(timeline, 0),
    },
    { role: "user", text: "Yes — that matches my intent.", time: stageTime(timeline, 0) },
    { role: "insight", text: preset.insightLine, insightKind: "pattern" },
    {
      role: "copilot",
      text: "Understanding confirmed. Mapping people, applications, and devices — preparing a draft for your review, not deployment.",
      time: stageTime(timeline, 1),
    },
    {
      role: "insight",
      text: timeline[1]?.evidence ?? "Application objects resolved from inventory — no new object needed.",
      insightKind: "evidence",
    },
    {
      role: "copilot",
      text: "Draft is ready for your review — still not deployed. Run safety checks when the direction looks right.",
      time: stageTime(timeline, 1),
    },
    {
      role: "user",
      text: `Run ${preset.complianceCheck.label.toLowerCase()} safety checks`,
      time: stageTime(timeline, 2),
    },
    {
      role: "copilot",
      text: `Checking whether this rule breaks ${preset.complianceCheck.label.toLowerCase()} or creates surprise blocks — each result should reduce uncertainty before you approve.`,
      time: stageTime(timeline, 2),
    },
    {
      role: "insight",
      text: timeline[2]?.evidence ?? preset.complianceCheck.detail,
      insightKind: "status",
    },
    {
      role: "copilot",
      text: "Compliance check completed successfully. Scope and compliance summaries are on the canvas.",
      time: stageTime(timeline, 2),
    },
    { role: "user", text: "Ready to approve", time: stageTime(timeline, 3) },
    {
      role: "insight",
      text: timeline[3]?.evidence ?? preset.approval.justification,
      insightKind: "evidence",
    },
    {
      role: "copilot",
      text: "Building secure policy across three regions…",
      time: stageTime(timeline, 3),
    },
    {
      role: "copilot",
      text: "Policy went live. Full record saved — every step traceable.",
      time: stageTime(timeline, 4),
    },
    {
      role: "insight",
      text: timeline[4]?.evidence ?? `Active in production · ${preset.blastRadius}`,
      insightKind: "status",
    },
  ];

  if (governClose) {
    items.push(
      {
        role: "user",
        text: `Show govern record for ${governClose.policyName}`,
        time: "Now",
      },
      {
        role: "copilot",
        text: `${governClose.policyName} is ${governClose.status.toLowerCase()} in ${governClose.regions}. The canvas shows the current production record — every stage traceable.`,
        time: "Now",
      },
    );
  }

  return items.map((item, index) => ({ ...item, id: `hist-${index}` }));
}

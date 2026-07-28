import { resolveIntentClarification } from "@/components/case-studies/policy-copilot/policy-copilot-intent-clarification";
import { resolveLivingPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export type PolicyCopilotPresentation =
  | "intent-summary"
  | "business-intent"
  | "living-workspace"
  | "continuous-validation"
  | "simulation-impact";

export const INTENT_SUMMARY_PRESENTATION_PROMPT =
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices";

export const INTENT_SUMMARY_RECENT_LABEL = "Application access control";

export const BUSINESS_INTENT_PLACEHOLDER =
  "Describe the business outcome — who needs access, to what, and under which conditions";

export interface IntentSummaryPresentationState {
  phase: "clarify";
  workspaceView: "lifecycle";
  activeNav: "lifecycle";
  intent: string;
  activeRecentLabel: string;
  policyEntry: "journey";
  flowMode: "author";
  thread: {
    id: string;
    role: "user" | "copilot";
    text: string;
    time: string;
  }[];
}

export function createIntentSummaryPresentationState(): IntentSummaryPresentationState {
  const preset = resolveLivingPreset(INTENT_SUMMARY_PRESENTATION_PROMPT);
  const clarification = resolveIntentClarification(preset);
  const reflection = clarification.understandingReflection!;

  return {
    phase: "clarify",
    workspaceView: "lifecycle",
    activeNav: "lifecycle",
    intent: INTENT_SUMMARY_PRESENTATION_PROMPT,
    activeRecentLabel: INTENT_SUMMARY_RECENT_LABEL,
    policyEntry: "journey",
    flowMode: "author",
    thread: [
      {
        id: "presentation-user",
        role: "user",
        text: INTENT_SUMMARY_PRESENTATION_PROMPT,
        time: "Now",
      },
      {
        id: "presentation-copilot",
        role: "copilot",
        text: `${reflection.lead} ${reflection.confirmPrompt}`,
        time: "Now",
      },
    ],
  };
}

export interface BusinessIntentPresentationState {
  phase: "invite";
  workspaceView: "lifecycle";
  activeNav: "lifecycle";
  intent: string;
  activeRecentLabel: undefined;
  policyEntry: null;
  flowMode: "author";
  thread: [];
  draft: string;
}

export function createBusinessIntentPresentationState(): BusinessIntentPresentationState {
  return {
    phase: "invite",
    workspaceView: "lifecycle",
    activeNav: "lifecycle",
    intent: "",
    activeRecentLabel: undefined,
    policyEntry: null,
    flowMode: "author",
    thread: [],
    draft: "",
  };
}

export interface LivingWorkspacePresentationState {
  phase: "draft";
  workspaceView: "lifecycle";
  activeNav: "lifecycle";
  intent: string;
  activeRecentLabel: string;
  policyEntry: "journey";
  flowMode: "author";
  entityReveal: number;
  understandingConfirmed: boolean;
  thread: {
    id: string;
    role: "user" | "copilot";
    text: string;
    time: string;
  }[];
}

export function createLivingWorkspacePresentationState(): LivingWorkspacePresentationState {
  const preset = resolveLivingPreset(INTENT_SUMMARY_PRESENTATION_PROMPT);
  const clarification = resolveIntentClarification(preset);

  return {
    phase: "draft",
    workspaceView: "lifecycle",
    activeNav: "lifecycle",
    intent: INTENT_SUMMARY_PRESENTATION_PROMPT,
    activeRecentLabel: INTENT_SUMMARY_RECENT_LABEL,
    policyEntry: "journey",
    flowMode: "author",
    entityReveal: preset.entityMappings.length,
    understandingConfirmed: true,
    thread: [
      {
        id: "living-workspace-user",
        role: "user",
        text: INTENT_SUMMARY_PRESENTATION_PROMPT,
        time: "Now",
      },
      {
        id: "living-workspace-copilot-clarify",
        role: "copilot",
        text: clarification.understandingReflection!.confirmPrompt,
        time: "Now",
      },
      {
        id: "living-workspace-copilot-draft",
        role: "copilot",
        text: "Mapped your environment and drafted rules — review each card on the right before checks run.",
        time: "Now",
      },
      {
        id: "living-workspace-user-follow-up",
        role: "user",
        text: "Also exclude contractors from EHR, and log every allow path",
        time: "Now",
      },
      {
        id: "living-workspace-copilot-follow-up",
        role: "copilot",
        text: "Updated the draft on the right — contractors denied, logging on. No new wall of text.",
        time: "Now",
      },
    ],
  };
}

export interface ContinuousValidationPresentationState {
  phase: "check";
  workspaceView: "lifecycle";
  activeNav: "lifecycle";
  intent: string;
  activeRecentLabel: string;
  policyEntry: "journey";
  flowMode: "author";
  entityReveal: number;
  understandingConfirmed: boolean;
  initialCheckStatus: Record<string, "pass">;
  checkLastRunSec: number;
  thread: {
    id: string;
    role: "user" | "copilot";
    text: string;
    time: string;
  }[];
}

export function createContinuousValidationPresentationState(): ContinuousValidationPresentationState {
  const preset = resolveLivingPreset(INTENT_SUMMARY_PRESENTATION_PROMPT);

  return {
    phase: "check",
    workspaceView: "lifecycle",
    activeNav: "lifecycle",
    intent: INTENT_SUMMARY_PRESENTATION_PROMPT,
    activeRecentLabel: INTENT_SUMMARY_RECENT_LABEL,
    policyEntry: "journey",
    flowMode: "author",
    entityReveal: preset.entityMappings.length,
    understandingConfirmed: true,
    initialCheckStatus: {
      hipaa: "pass",
      blast: "pass",
      risk: "pass",
      conflict: "pass",
    },
    checkLastRunSec: 14,
    thread: [
      {
        id: "continuous-validation-user",
        role: "user",
        text: INTENT_SUMMARY_PRESENTATION_PROMPT,
        time: "Now",
      },
      {
        id: "continuous-validation-copilot-draft",
        role: "copilot",
        text: "Mapped your environment and drafted rules — review each card before checks run.",
        time: "Now",
      },
      {
        id: "continuous-validation-copilot-check",
        role: "copilot",
        text: `Checking whether this rule breaks ${preset.complianceCheck.label.toLowerCase()} or creates surprise blocks — each result should reduce uncertainty before you approve.`,
        time: "Now",
      },
    ],
  };
}

export interface SimulationImpactPresentationState {
  phase: "approve";
  workspaceView: "lifecycle";
  activeNav: "lifecycle";
  intent: string;
  activeRecentLabel: string;
  policyEntry: "journey";
  flowMode: "author";
  entityReveal: number;
  understandingConfirmed: boolean;
  simulateAcknowledged: boolean;
  riskDismissed: boolean;
  initialCheckStatus: Record<string, "pass">;
  checkLastRunSec: number;
  thread: {
    id: string;
    role: "user" | "copilot";
    text: string;
    time: string;
  }[];
}

export function createSimulationImpactPresentationState(): SimulationImpactPresentationState {
  const preset = resolveLivingPreset(INTENT_SUMMARY_PRESENTATION_PROMPT);

  return {
    phase: "approve",
    workspaceView: "lifecycle",
    activeNav: "lifecycle",
    intent: INTENT_SUMMARY_PRESENTATION_PROMPT,
    activeRecentLabel: INTENT_SUMMARY_RECENT_LABEL,
    policyEntry: "journey",
    flowMode: "author",
    entityReveal: preset.entityMappings.length,
    understandingConfirmed: true,
    simulateAcknowledged: true,
    riskDismissed: true,
    initialCheckStatus: {
      hipaa: "pass",
      blast: "pass",
      risk: "pass",
      conflict: "pass",
    },
    checkLastRunSec: 22,
    thread: [
      {
        id: "simulation-impact-user",
        role: "user",
        text: INTENT_SUMMARY_PRESENTATION_PROMPT,
        time: "Now",
      },
      {
        id: "simulation-impact-copilot-checks",
        role: "copilot",
        text: "Compliance check completed successfully. Scope and compliance summaries are on the canvas — review who is affected before you approve.",
        time: "Now",
      },
      {
        id: "simulation-impact-copilot-simulate",
        role: "copilot",
        text: "Run a dry-run simulation to see who gains access, which applications become reachable, and the impact if you approve.",
        time: "Now",
      },
    ],
  };
}

import { EHR_CANDIDATE_RULES } from "@/components/case-studies/policy-copilot/policy-copilot-data";
import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export type LivePreviewSlotState = "empty" | "partial" | "filled";

export interface LivePreviewSlot {
  id: string;
  label: string;
  value?: string;
  badge?: string;
  state: LivePreviewSlotState;
}

export type LivePreviewStatus = "waiting" | "building" | "validating" | "ready" | "excellent";

export interface LivePreviewModel {
  status: LivePreviewStatus;
  statusLabel: string;
  slots: LivePreviewSlot[];
  emptyMessage: string;
  technicalRules?: { allow: string; deny: string };
}

type PreviewPhase =
  | "invite"
  | "clarify"
  | "sense"
  | "draft"
  | "check"
  | "refine"
  | "approve"
  | "ship"
  | "done";

function protectedResource(preset: LivingScenarioPreset): string {
  const app = preset.entityMappings.find(
    (m) =>
      m.type.toLowerCase().includes("application") ||
      m.type.toLowerCase().includes("saas") ||
      m.type.toLowerCase().includes("database"),
  );
  if (app) return app.resolved.replace(/-/g, " ");
  const zone = preset.entityMappings.find((m) => m.type.toLowerCase().includes("zone"));
  return zone?.resolved.replace(/-/g, " ") ?? "Protected resource";
}

function identitySummary(preset: LivingScenarioPreset): string {
  const identities = preset.entityMappings.filter((m) =>
    m.type.toLowerCase().includes("identity"),
  );
  if (identities.length === 0) return preset.contextLine;
  return identities.map((m) => m.resolved.replace(/-/g, " ")).join(" · ");
}

function loggingSummary(preset: LivingScenarioPreset): string {
  const log = preset.entityMappings.find((m) => m.type.toLowerCase().includes("audit"));
  return log?.resolved.replace(/-/g, " ") ?? "Full audit trail";
}

function resourceCount(preset: LivingScenarioPreset, entityReveal: number): string {
  const total = preset.entityMappings.length;
  if (entityReveal === 0) return "";
  if (entityReveal < total) return `${entityReveal} mapped`;
  return `${total} objects`;
}

function previewStatus(
  phase: PreviewPhase,
  allChecksPassed: boolean,
): { status: LivePreviewStatus; statusLabel: string } {
  if (phase === "invite") return { status: "waiting", statusLabel: "Waiting" };
  if (phase === "clarify" || phase === "sense") return { status: "building", statusLabel: "Building" };
  if (phase === "check") return { status: "validating", statusLabel: "Validating" };
  if (allChecksPassed && (phase === "refine" || phase === "approve" || phase === "ship" || phase === "done")) {
    return { status: "excellent", statusLabel: "Excellent" };
  }
  if (phase === "draft" || phase === "refine" || phase === "approve") {
    return { status: "ready", statusLabel: "Ready to validate" };
  }
  return { status: "building", statusLabel: "Building" };
}

export function resolveLivePreview(
  phase: PreviewPhase,
  preset: LivingScenarioPreset,
  entityReveal: number,
  allChecksPassed: boolean,
): LivePreviewModel {
  const { status, statusLabel } = previewStatus(phase, allChecksPassed);
  const resource = protectedResource(preset);
  const isEmpty = phase === "invite";

  const principles: LivePreviewSlot = {
    id: "principles",
    label: "Principles",
    state: isEmpty ? "empty" : phase === "clarify" ? "partial" : "filled",
    value: isEmpty ? undefined : preset.contextLine,
  };

  const resources: LivePreviewSlot = {
    id: "resources",
    label: "Resources",
    state: isEmpty ? "empty" : entityReveal === 0 ? "partial" : entityReveal < preset.entityMappings.length ? "partial" : "filled",
    value: isEmpty ? undefined : entityReveal === 0 ? resource : undefined,
    badge: isEmpty ? undefined : resourceCount(preset, entityReveal) || resource,
  };

  const actions: LivePreviewSlot = {
    id: "actions",
    label: "Actions",
    state:
      phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done"
        ? "filled"
        : phase === "sense" && entityReveal >= preset.entityMappings.length
          ? "partial"
          : "empty",
    value:
      phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done"
        ? preset.ruleReasoning.split(".")[0] + "."
        : phase === "sense" && entityReveal >= preset.entityMappings.length
          ? identitySummary(preset)
          : undefined,
  };

  const logging: LivePreviewSlot = {
    id: "logging",
    label: "Logging",
    state:
      phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done"
        ? "filled"
        : "empty",
    value:
      phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done"
        ? loggingSummary(preset)
        : undefined,
    badge:
      phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done"
        ? "Allow"
        : undefined,
  };

  const technicalRules =
    preset.id === "ehr"
      ? EHR_CANDIDATE_RULES
      : undefined;

  return {
    status,
    statusLabel,
    slots: [principles, resources, actions, logging],
    emptyMessage: "Start the conversation to build your policy.",
    technicalRules:
      technicalRules &&
      (phase === "draft" || phase === "check" || phase === "refine" || phase === "approve" || phase === "ship" || phase === "done")
        ? technicalRules
        : undefined,
  };
}

export function resourceAcknowledgement(preset: LivingScenarioPreset): string {
  const resource = protectedResource(preset);
  return `I read this as protecting **${resource}**.`;
}

import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";

const STORAGE_KEY = "policy-copilot-draft-resume";

export interface DraftResumeCheckpoint {
  prompt: string;
  label: string;
  phase: LivingPhase;
  entityReveal: number;
  checkStatus: Record<string, "pending" | "running" | "pass" | "warn">;
  mfaApplied: boolean;
  savedAt: number;
}

export function saveDraftCheckpoint(checkpoint: DraftResumeCheckpoint) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkpoint));
  } catch {
    /* quota or private mode */
  }
}

export function loadDraftCheckpoint(): DraftResumeCheckpoint | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DraftResumeCheckpoint;
  } catch {
    return null;
  }
}

export function clearDraftCheckpoint() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function draftCheckpointForPrompt(prompt: string): DraftResumeCheckpoint | null {
  const saved = loadDraftCheckpoint();
  if (!saved || saved.prompt.trim() !== prompt.trim()) return null;
  return saved;
}

export type ResumeDiffItem = {
  label: string;
  tone: "done" | "pending" | "warn";
};

export function buildResumeDiffSummary(
  checkpoint: DraftResumeCheckpoint,
  totalMappings: number,
  checkIds: string[],
): ResumeDiffItem[] {
  const items: ResumeDiffItem[] = [];
  const mappingDone = checkpoint.entityReveal >= totalMappings;

  if (mappingDone) {
    items.push({ label: "Entity mapping complete", tone: "done" });
  } else if (checkpoint.entityReveal > 0) {
    items.push({
      label: `Mapping in progress — ${checkpoint.entityReveal} of ${totalMappings} objects`,
      tone: "pending",
    });
  } else {
    items.push({ label: "Understanding confirmed — mapping not started", tone: "pending" });
  }

  const passedChecks = checkIds.filter((id) => checkpoint.checkStatus[id] === "pass").length;
  const runningChecks = checkIds.some((id) => checkpoint.checkStatus[id] === "running");

  if (passedChecks === checkIds.length && checkIds.length > 0) {
    items.push({ label: `${passedChecks} safety checks passed`, tone: "done" });
  } else if (runningChecks || passedChecks > 0) {
    items.push({
      label: `Safety checks — ${passedChecks} of ${checkIds.length} passed`,
      tone: "pending",
    });
  } else if (["check", "refine", "approve"].includes(checkpoint.phase)) {
    items.push({ label: "Safety checks not finished", tone: "warn" });
  }

  if (!checkpoint.mfaApplied && ["refine", "approve", "check"].includes(checkpoint.phase)) {
    items.push({ label: "MFA recommendation not applied", tone: "warn" });
  }

  return items.slice(0, 4);
}

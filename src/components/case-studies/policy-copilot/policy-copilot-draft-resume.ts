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

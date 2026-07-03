import type { CopilotSkillId } from "@/components/case-studies/policy-copilot/policy-copilot-skills";
import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

/** Motion intent labels — pair with LIVING_MOTION / CLAUDE_MOTION tokens. */
export const MOTION_PURPOSE = {
  discover: "New information arrived",
  confirm: "User committed an action",
  progress: "System working through a sequence",
  resolve: "Uncertainty removed",
  morph: "State transition",
} as const;

export const SKILL_TOKENS: Record<
  CopilotSkillId,
  { color: string; muted: string; label: string; icon: "compass" | "pen" | "shield" | "rocket" | "tune" | "ledger" }
> = {
  intent: { color: CLAUDE.primary, muted: CLAUDE.primaryMuted, label: "Intent", icon: "compass" },
  author: { color: "#a78bfa", muted: "rgb(167 139 250 / 0.14)", label: "Author", icon: "pen" },
  validate: { color: CLAUDE.warning, muted: CLAUDE.warningMuted, label: "Validate", icon: "shield" },
  deploy: { color: CLAUDE.accentTeal, muted: CLAUDE.accentTealMuted, label: "Deploy", icon: "rocket" },
  optimize: { color: "#f97316", muted: "rgb(249 115 22 / 0.14)", label: "Optimize", icon: "tune" },
  govern: { color: "#94a3b8", muted: "rgb(148 163 184 / 0.14)", label: "Govern", icon: "ledger" },
};

export type InsightKind = "pattern" | "status" | "evidence";

export const INSIGHT_KIND_LABEL: Record<InsightKind, string> = {
  pattern: "Pattern",
  status: "Status",
  evidence: "Evidence",
};

export function confidenceLabel(phase: LivingPhase, value: number): string {
  const phaseNames: Partial<Record<LivingPhase, string>> = {
    invite: "Waiting",
    understand: "Understanding",
    clarify: "Clarifying",
    sense: "Mapping",
    draft: "Drafting",
    check: "Validating",
    refine: "Optimising",
    approve: "Approving",
    ship: "Deploying",
    done: "Complete",
  };
  return `${phaseNames[phase] ?? "Progress"} · ${value}%`;
}

export function confidenceTooltip(phase: LivingPhase, value: number): string {
  if (value < 30) return "Intent recognised — confirm understanding to raise confidence.";
  if (value < 60) return "Objects mapped — run safety checks to validate blast radius.";
  if (value < 85) return "Checks passed — review optional optimisations before deploy.";
  if (phase === "done") return "Policy live — full audit trail available in Govern.";
  return "Ready for approval — deploy will push to production regions.";
}

export type EntityProvenance = {
  source: string;
  objectId: string;
  synced: string;
  owner: string;
};

const PROVENANCE_BY_TYPE: Record<string, Omit<EntityProvenance, "objectId">> = {
  identity: { source: "LDAP", synced: "12 min ago", owner: "IAM" },
  application: { source: "CMDB", synced: "1 hr ago", owner: "AppSec" },
  saas: { source: "SaaS catalogue", synced: "3 hr ago", owner: "IT" },
  database: { source: "CMDB", synced: "1 hr ago", owner: "DBA" },
  zone: { source: "Segmentation DB", synced: "25 min ago", owner: "Netsec" },
  device: { source: "Endpoint inventory", synced: "8 min ago", owner: "MDM" },
  audit: { source: "SIEM", synced: "Live", owner: "SecOps" },
  schedule: { source: "Policy engine", synced: "Live", owner: "GRC" },
  default: { source: "Inventory", synced: "30 min ago", owner: "Netsec" },
};

export function resolveEntityProvenance(resolved: string, type: string): EntityProvenance {
  const key = Object.keys(PROVENANCE_BY_TYPE).find((k) => type.toLowerCase().includes(k)) ?? "default";
  const base = PROVENANCE_BY_TYPE[key] ?? PROVENANCE_BY_TYPE.default;
  const slug = resolved.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
  return { ...base, objectId: slug || "object" };
}

export const FRAMEWORK_ICONS: Record<string, string> = {
  HIPAA: "🏥",
  SOX: "📊",
  "SOC 2": "🔒",
  "ISO 27001": "🌐",
  PCI: "💳",
  "Acceptable use": "📋",
  "Golden config": "⚙️",
};

export function frameworkIcon(framework: string): string {
  return FRAMEWORK_ICONS[framework] ?? "✓";
}

export type PolicyStatusTone = "live" | "pending" | "deploying" | "draft";

export const STATUS_DOT: Record<PolicyStatusTone, string> = {
  live: CLAUDE.validated,
  pending: CLAUDE.warning,
  deploying: CLAUDE.primary,
  draft: CLAUDE.textSoft,
};

export const STATUS_LEGEND: { tone: PolicyStatusTone; label: string; tip: string }[] = [
  { tone: "live", label: "Live", tip: "Active in production — changes require approval" },
  { tone: "pending", label: "Pending", tip: "Awaiting review or approval" },
  { tone: "deploying", label: "Deploying", tip: "Rollout in progress — rollback armed" },
  { tone: "draft", label: "Draft", tip: "In progress — nothing deployed yet" },
];

export function scenarioIconFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("ehr") || p.includes("doctor") || p.includes("health")) return "🏥";
  if (p.includes("finance") || p.includes("sap") || p.includes("sql")) return "📊";
  if (p.includes("marketing") || p.includes("linkedin")) return "📣";
  if (p.includes("contractor") || p.includes("production")) return "🛡️";
  if (p.includes("vendor") || p.includes("vpn") || p.includes("staging")) return "🔗";
  return "📄";
}

export function inferPolicyStatus(prompt: string, flowMode?: string): PolicyStatusTone {
  if (flowMode === "review") return "pending";
  const p = prompt.toLowerCase();
  if (p.includes("vendor") && p.includes("staging")) return "deploying";
  return "live";
}

export const CANVAS_SECTION_IDS = {
  reflection: "canvas-reflection",
  author: "canvas-author",
  compliance: "canvas-compliance",
  reasoning: "canvas-reasoning",
  govern: "canvas-govern",
  checks: "canvas-checks",
} as const;

export type CanvasSectionId = (typeof CANVAS_SECTION_IDS)[keyof typeof CANVAS_SECTION_IDS];

import type { EntityTypeIconId } from "@/components/case-studies/policy-copilot/policy-copilot-icons";
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

export const INSIGHT_KIND_COLORS: Record<InsightKind, { color: string; muted: string }> = {
  pattern: { color: "#a78bfa", muted: "rgb(167 139 250 / 0.14)" },
  status: { color: CLAUDE.primary, muted: CLAUDE.primaryMuted },
  evidence: { color: CLAUDE.accentTeal, muted: CLAUDE.accentTealMuted },
};

export const SKILL_STEP_TOOLTIPS: Record<CopilotSkillId, { active: string; next: string }> = {
  intent: {
    active: "Clarifying who needs access and to what — nothing deploys yet.",
    next: "Author will map your words to real objects and draft rules.",
  },
  author: {
    active: "Mapping inventory objects and drafting rules for your review.",
    next: "Validate runs blast-radius and compliance checks.",
  },
  validate: {
    active: "Running safety checks — each pass should reduce uncertainty.",
    next: "Optimise optional improvements, then approve to deploy.",
  },
  deploy: {
    active: "Approval gate — review scope, compliance, and blast radius.",
    next: "Govern keeps the audit trail and memory after go-live.",
  },
  optimize: {
    active: "Optional evidence-based tweaks — apply or skip before approve.",
    next: "Deploy pushes to production regions with rollback armed.",
  },
  govern: {
    active: "Live policy — full record, memory, and audit trail available.",
    next: "Edit or retire from here; changes stay in draft until re-approved.",
  },
};

export const ENTITY_TYPE_TOKENS: Record<
  EntityTypeIconId,
  { color: string; muted: string; label: string }
> = {
  identity: { color: "#60a5fa", muted: "rgb(96 165 250 / 0.14)", label: "Identity" },
  application: { color: CLAUDE.accentTeal, muted: CLAUDE.accentTealMuted, label: "Application" },
  saas: { color: "#f472b6", muted: "rgb(244 114 182 / 0.14)", label: "SaaS" },
  database: { color: "#fbbf24", muted: "rgb(251 191 36 / 0.14)", label: "Database" },
  zone: { color: "#a78bfa", muted: "rgb(167 139 250 / 0.14)", label: "Zone" },
  device: { color: CLAUDE.validated, muted: CLAUDE.validatedMuted, label: "Device" },
  audit: { color: CLAUDE.warning, muted: CLAUDE.warningMuted, label: "Audit" },
  schedule: { color: CLAUDE.textSecondary, muted: CLAUDE.surfaceOverlay, label: "Schedule" },
  default: { color: CLAUDE.primary, muted: CLAUDE.primaryMuted, label: "Object" },
};

export function entityTypeKey(type?: string): EntityTypeIconId {
  if (!type) return "default";
  const lower = type.toLowerCase();
  const match = (Object.keys(ENTITY_TYPE_TOKENS) as EntityTypeIconId[]).find(
    (k) => k !== "default" && lower.includes(k),
  );
  return match ?? "default";
}

export const SAFETY_CHECK_ICON_KIND: Record<string, "shield" | "crosshair" | "users" | "conflict"> = {
  hipaa: "shield",
  blast: "users",
  risk: "crosshair",
  conflict: "conflict",
};

export const CANVAS_SECTION_IDS = {
  reflection: "canvas-reflection",
  author: "canvas-author",
  compliance: "canvas-compliance",
  reasoning: "canvas-reasoning",
  govern: "canvas-govern",
  checks: "canvas-checks",
} as const;

export type CanvasSectionId = (typeof CANVAS_SECTION_IDS)[keyof typeof CANVAS_SECTION_IDS];

export const CANVAS_SECTION_SKILL: Record<CanvasSectionId, CopilotSkillId> = {
  [CANVAS_SECTION_IDS.reflection]: "intent",
  [CANVAS_SECTION_IDS.author]: "author",
  [CANVAS_SECTION_IDS.checks]: "validate",
  [CANVAS_SECTION_IDS.reasoning]: "validate",
  [CANVAS_SECTION_IDS.compliance]: "validate",
  [CANVAS_SECTION_IDS.govern]: "govern",
};

export const CANVAS_PREVIEW_COPY: Record<
  CanvasSectionId,
  { title: string; hint: string }
> = {
  [CANVAS_SECTION_IDS.reflection]: {
    title: "Understanding",
    hint: "How Copilot interpreted your intent before drafting.",
  },
  [CANVAS_SECTION_IDS.author]: {
    title: "Author",
    hint: "Plain-language interpretation ↔ generated rules.",
  },
  [CANVAS_SECTION_IDS.checks]: {
    title: "Safety checks",
    hint: "Compliance, blast radius, and conflict validation.",
  },
  [CANVAS_SECTION_IDS.reasoning]: {
    title: "Reasoning",
    hint: "Evidence chain behind each proposed rule.",
  },
  [CANVAS_SECTION_IDS.compliance]: {
    title: "Compliance",
    hint: "Scope summary and framework alignment.",
  },
  [CANVAS_SECTION_IDS.govern]: {
    title: "Govern",
    hint: "Audit trail and institutional memory.",
  },
};

type LivingFlowMode = "author" | "review" | "document";

/** Canvas sections to try for AgentStatusBar “Why?” — first match in the DOM wins. */
export function resolveWhyCanvasSections(
  phase: LivingPhase,
  {
    flowMode,
    allChecksPassed,
    isGovernView,
  }: {
    flowMode: LivingFlowMode;
    allChecksPassed: boolean;
    isGovernView: boolean;
  },
): CanvasSectionId[] {
  if (isGovernView) return [CANVAS_SECTION_IDS.govern];
  if (flowMode === "document" && phase === "capture") {
    return [CANVAS_SECTION_IDS.govern, CANVAS_SECTION_IDS.reflection];
  }
  if (flowMode === "review" && phase === "memory") {
    return [CANVAS_SECTION_IDS.compliance, CANVAS_SECTION_IDS.govern];
  }

  switch (phase) {
    case "understand":
    case "clarify":
      return [CANVAS_SECTION_IDS.reflection];
    case "sense":
      return [CANVAS_SECTION_IDS.author, CANVAS_SECTION_IDS.reflection];
    case "draft":
      return [CANVAS_SECTION_IDS.author, CANVAS_SECTION_IDS.reflection];
    case "check":
      return allChecksPassed
        ? [CANVAS_SECTION_IDS.reasoning, CANVAS_SECTION_IDS.checks, CANVAS_SECTION_IDS.author]
        : [CANVAS_SECTION_IDS.checks, CANVAS_SECTION_IDS.author];
    case "refine":
      return [CANVAS_SECTION_IDS.compliance, CANVAS_SECTION_IDS.reasoning, CANVAS_SECTION_IDS.checks];
    case "memory":
      return [CANVAS_SECTION_IDS.compliance, CANVAS_SECTION_IDS.govern];
    case "capture":
      return [CANVAS_SECTION_IDS.govern, CANVAS_SECTION_IDS.reflection];
    case "approve":
    case "ship":
      return [CANVAS_SECTION_IDS.compliance, CANVAS_SECTION_IDS.author, CANVAS_SECTION_IDS.reasoning];
    default:
      return [CANVAS_SECTION_IDS.reflection, CANVAS_SECTION_IDS.author, CANVAS_SECTION_IDS.compliance];
  }
}

/** One-line coaching copy shown when AgentStatusBar “Why?” scrolls to a section. */
export function resolveWhyAnnotation(
  phase: LivingPhase,
  sectionId: CanvasSectionId,
  {
    flowMode,
    allChecksPassed,
  }: {
    flowMode: LivingFlowMode;
    allChecksPassed: boolean;
  },
): string {
  const copy: Partial<Record<CanvasSectionId, string>> = {
    [CANVAS_SECTION_IDS.reflection]:
      phase === "understand"
        ? "I'm parsing your wording here — nothing is written to policy yet."
        : "This is my interpretation — correct anything inferred before I draft.",
    [CANVAS_SECTION_IDS.author]:
      phase === "sense"
        ? "Each chip is a live inventory object — hover for AD path and owner."
        : "Plain-language rules ↔ generated ACLs — still draft until you approve.",
    [CANVAS_SECTION_IDS.checks]:
      allChecksPassed
        ? "Every check passed — optional optimisations are next, not required."
        : "Checks run in sequence — each pass should reduce uncertainty.",
    [CANVAS_SECTION_IDS.reasoning]:
      "Evidence chain behind each rule — auditors can trace every decision.",
    [CANVAS_SECTION_IDS.compliance]:
      "Scope and framework alignment — who gains or loses access if you approve.",
    [CANVAS_SECTION_IDS.govern]:
      flowMode === "document"
        ? "Capture institutional memory before changing or deleting this rule."
        : "Full audit trail — every stage traceable after go-live.",
  };
  return copy[sectionId] ?? CANVAS_PREVIEW_COPY[sectionId].hint;
}

export const GOVERN_TAB_META: Record<
  string,
  { recordId: string; lastChanged: string; tip: string }
> = {
  overview: {
    recordId: "gov-rec-overview",
    lastChanged: "2 days ago",
    tip: "Live posture, owner, and blast-radius summary.",
  },
  rules: {
    recordId: "gov-rec-rules",
    lastChanged: "2 days ago",
    tip: "Interpretation lines and generated ACL rules.",
  },
  compliance: {
    recordId: "gov-rec-compliance",
    lastChanged: "5 days ago",
    tip: "Framework mappings and last successful check.",
  },
  audit: {
    recordId: "gov-rec-audit",
    lastChanged: "Just now",
    tip: "Immutable stage-by-stage evidence trail.",
  },
  memory: {
    recordId: "gov-rec-memory",
    lastChanged: "1 week ago",
    tip: "Business justification and approval context.",
  },
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
  const blocker = confidenceBlocker(phase, value);
  if (blocker) return blocker;
  if (value < 30) return "Intent recognised — confirm understanding to raise confidence.";
  if (value < 60) return "Objects mapped — run safety checks to validate blast radius.";
  if (value < 85) return "Checks passed — review optional optimisations before deploy.";
  if (phase === "done") return "Policy live — full audit trail available in Govern.";
  return "Ready for approval — deploy will push to production regions.";
}

export function confidenceBlocker(
  phase: LivingPhase,
  value: number,
  opts?: { checksPassed?: boolean; mappingDone?: boolean },
): string | null {
  if (phase === "clarify" && value < 30) {
    return "Blocker: confirm understanding before I map objects.";
  }
  if ((phase === "draft" || phase === "sense") && !opts?.mappingDone && phase === "sense") {
    return "Blocker: finish mapping inventory objects.";
  }
  if (phase === "draft" && value < 65) {
    return "Blocker: run safety checks to validate blast radius.";
  }
  if (phase === "check" && !opts?.checksPassed) {
    return "Blocker: safety checks still running — wait for all passes.";
  }
  if (phase === "refine" && value < 88) {
    return "Blocker: review optional optimisations or proceed to approve.";
  }
  if (phase === "approve" && value < 94) {
    return "Blocker: confirm blast radius and compliance on the canvas.";
  }
  return null;
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


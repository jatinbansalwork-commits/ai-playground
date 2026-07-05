export type WorkspacePhase =
  | "intent"
  | "understand"
  | "clarify"
  | "draft"
  | "validate"
  | "simulate"
  | "optimize"
  | "review"
  | "approve"
  | "deploy";

export type ValidationStatus = "success" | "warning" | "attention";

export interface UnderstandingField {
  label: string;
  value: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface PolicyField {
  id: string;
  label: string;
  value: string;
  why?: string;
  inferredFrom?: string;
  fieldConfidence?: number;
}

export interface ValidationResult {
  id: string;
  title: string;
  status: ValidationStatus;
  explanation: string;
  action: string;
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  ifIgnored: string;
  improvement: string;
  securityImpact?: string;
  complianceImpact?: string;
  tradeoffs?: string;
  applied: boolean;
}

export interface MemoryEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
}

export interface SimulationInsight {
  label: string;
  value: string;
  status: "success" | "warning" | "attention";
}

export interface OptimizationItem {
  id: string;
  title: string;
  why: string;
  benefit: string;
  tradeoff: string;
  applied: boolean;
}

export interface DeploymentStep {
  id: string;
  label: string;
  status: "done" | "active" | "pending";
}

export interface PolicyScenario {
  id: string;
  policyTitle: string;
  complianceContext: string;
  understanding: UnderstandingField[];
  missingInfo: string[];
  intentSummary: string;
  businessIntent: string;
  entities: { label: string; value: string }[];
  assumptions: string[];
  clarifications: ClarificationQuestion[];
  policySections: { title: string; fields: PolicyField[] }[];
  validations: ValidationResult[];
  recommendations: Recommendation[];
  simulations: SimulationInsight[];
  optimizations: OptimizationItem[];
  memorySeed: MemoryEvent[];
  deploymentSteps: DeploymentStep[];
  baseConfidence: number;
}

export const SUGGESTED_PROMPTS = [
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices",
  "Block contractors from Production",
  "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
  "Restrict SQL Server to Finance subnet",
  "Allow Marketing to LinkedIn during business hours",
] as const;

/** Hero landing — 2–3 starters shown in the empty-state composer. */
export const STARTER_PROMPTS = SUGGESTED_PROMPTS.slice(0, 3);

export const DEFAULT_PLACEHOLDER =
  "Who needs access? To what application? From which devices?";

/** Primary intent card example — reference copy. */
export const INTENT_CARD_EXAMPLE =
  "Only doctors can access patient records. Block nurses and everyone else. Log every attempt.";

export const COPILOT_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", active: false },
  { id: "lifecycle", label: "Policy Lifecycle", active: false },
  { id: "analytics", label: "Analytics", active: false },
] as const;

export interface CopilotRecentItem {
  label: string;
  prompt: string;
  /** PRD story — author (specify intent), review (drift), document (legacy memory). */
  flowMode?: "author" | "review" | "document";
  /** Short subtitle for dashboard recents — what this mode means. */
  modeHint?: string;
}

export const COPILOT_INTERPRET_NAV_ITEMS = [
  { id: "explore", label: "Explore Example" },
  { id: "library", label: "Policy Library" },
] as const;

export const COPILOT_INTERPRET_RECENT: { period: string; items: CopilotRecentItem[] }[] = [
  {
    period: "Today",
    items: [
      {
        label: "Application access control",
        prompt: "Allow doctors to securely access Electronic Health Records from hospital-managed devices",
      },
    ],
  },
  {
    period: "Yesterday",
    items: [
      {
        label: "Block Tiktok for Interns",
        prompt: "Block TikTok access for intern accounts during business hours",
      },
      {
        label: "LinkedIn access for marketing te…",
        prompt: "Allow Marketing to LinkedIn during business hours",
      },
    ],
  },
  {
    period: "Previous",
    items: [
      {
        label: "Finance Oracle DB access",
        prompt: "Restrict Oracle DB access to finance analysts on corporate VLAN",
      },
      {
        label: "PCI DSS compliance audit",
        prompt: "Restrict SQL Server to Finance subnet",
      },
    ],
  },
];

export const COPILOT_INTERPRET_STEPS = { current: 1, total: 6, progress: 16 } as const;

export const COPILOT_GREETING_HEADLINE = "What should this policy do?";

export const COPILOT_GREETING =
  "Say it in plain language. I'll turn it into rules and show you the impact before anything goes live.";

/** PRD §2 — lifecycle capabilities surfaced in product chrome. */
export const PRD_LIFECYCLE_CAPABILITIES = [
  { id: "author", label: "Author", description: "Intent in plain language" },
  { id: "explain", label: "Explain", description: "Rules with reasoning" },
  { id: "simulate", label: "Simulate", description: "Unit tests pre-commit" },
  { id: "validate", label: "Validate", description: "HIPAA · PCI DSS · NIST" },
  { id: "optimize", label: "Optimise", description: "Drift & shadow detection" },
  { id: "govern", label: "Govern", description: "Versioned audit trail" },
] as const;

export const COPILOT_INTENT_HELP = {
  title: "Here is how I can help you with your policy",
  body: "Start with a goal, a situation, or a rule in plain language. I'll help translate it into a secure, compliant policy.",
  bullets: [
    "Translate intent into enforceable rules",
    "Validate policies before deployment",
    "Prevent misconfigurations and drift",
  ],
} as const;

export interface CopilotStartingPoint {
  id: string;
  title: string;
  description: string;
  example: string;
  prompt: string;
}

export const COPILOT_STARTING_POINTS: CopilotStartingPoint[] = [
  {
    id: "ehr",
    title: "Healthcare access",
    description: "Role-based access to patient records.",
    example: "Only doctors can access EHR. Block nurses. Log every attempt.",
    prompt:
      "Permit only doctors to access the electronic health record (EHR) system, deny nurses and all others, log every attempt",
  },
  {
    id: "contractor",
    title: "Contractor access",
    description: "Time-limited access that expires on its own.",
    example: "Give external auditors VPN access for 30 days",
    prompt: "Grant 30-day access to external auditors",
  },
  {
    id: "finance",
    title: "Finance data",
    description: "App-specific rule with compliance tags.",
    example: "Let Finance reach the SQL database over TLS",
    prompt: "Allow Finance to access SQL DB",
  },
  {
    id: "time",
    title: "Time-based access",
    description: "Access only during set hours.",
    example: "Marketing can use LinkedIn 9am–6pm only",
    prompt: "Allow Marketing to LinkedIn during business hours",
  },
];

/** Default draft shown in the interpret composer — PRD §3.1 EHR example. */
export const DEFAULT_INTENT_DRAFT =
  "Permit only doctors to access the electronic health record (EHR) system, deny nurses and all others, log every attempt";

/** PRD §3.1 — natural language → authoritative entity mapping. */
export const EHR_ENTITY_MAPPINGS = [
  { term: "doctors", resolved: "Doctors-AD-Group", type: "Identity (LDAP)" },
  { term: "nurses", resolved: "Nurses-AD-Group", type: "Identity (LDAP)" },
  { term: "electronic health record (EHR)", resolved: "EHR-Application-Object", type: "Protected application" },
  { term: "all others", resolved: "Everyone else — denied by default", type: "Default rule" },
  { term: "log every attempt", resolved: "SIEM-Audit-Profile", type: "Audit logging" },
] as const;

/** PRD §3.1 — candidate ACL shown alongside plain-English explanation. */
export const EHR_CANDIDATE_RULES = {
  allow:
    "permit application EHR-App doctors-ad-group to healthcare-segment action allow profile HIPAA-ePHI log-all",
  deny:
    "deny application EHR-App nurses-ad-group to healthcare-segment action deny log-all",
} as const;

export const EHR_RULE_REASONING =
  "Doctors can reach the EHR from managed devices. Nurses and everyone else are blocked. Every attempt is logged for audit.";

/** PRD §3.7 — related policy fabric suggestions. */
export const EHR_RELATED_POLICIES = [
  { type: "Threat", suggestion: "Add threat prevention for EHR traffic" },
  { type: "TLS", suggestion: "Require TLS 1.3 on the healthcare segment" },
  { type: "Identity", suggestion: "Require MFA for the doctors group" },
] as const;

/** PRD §3.3 — unit test & blast radius before commit. */
export const EHR_UNIT_TEST_RESULTS = {
  blastRadius: "124 people in scope · 12 nurses blocked as planned · 0 surprise blocks",
  riskScore: "Low",
  riskDetail: "No privilege escalation paths found",
  complianceImpact: "Meets HIPAA access and audit requirements",
  resourcesAffected: 47,
  downtime: "0%",
} as const;

/** PRD §3.3.1 — impact forecasting. */
export const EHR_IMPACT_FORECAST = [
  { label: "Traffic", value: "2.4k EHR sessions / 24h — no unusual off-hours use" },
  { label: "Dependencies", value: "No connected systems blocked" },
  { label: "People affected", value: "12 nurses lose access — matches your request" },
  { label: "Business impact", value: "Low — clinical team signed off on the deny list" },
] as const;

export const EHR_MITIGATION_SUGGESTIONS = [
  "Tell the nursing team before the rule goes live",
  "Roll out in two steps: allow first, deny after 24 hours",
] as const;

/** PRD §3.5 — compliance overlays. */
export const EHR_COMPLIANCE_OVERLAYS = [
  { framework: "HIPAA", control: "164.312 access control & audit", status: "pass" as const },
  { framework: "NIST", control: "800-207 least privilege", status: "pass" as const },
  { framework: "PCI DSS", control: "1.2.1 — no cardholder data path", status: "na" as const },
] as const;

/** PRD §3.4 — closed-loop optimisation. */
export const LINKEDIN_DRIFT_MEMORY = {
  rule: "LinkedIn_Access",
  why: "Added Sept 2024 so Marketing Leaders could reach LinkedIn Ads. Approved as a business exception.",
  simulation: "Low impact — 3 users. Tagged as acceptable use.",
  flag: "Flagged Sept 2025 — no one has used it in months. Safe to remove?",
} as const;

export const EHR_L7_UPGRADE = {
  title: "Application-aware rule confirmed",
  detail: "Traffic is matched by app, not just port — tighter and easier to audit.",
} as const;

/** PRD §3.6 — lifecycle governance timeline with evidence. */
export const EHR_LIFECYCLE_TIMELINE = [
  {
    stage: "Request captured",
    time: "11:05 AM",
    evidence: "Your original wording saved as the source record",
  },
  {
    stage: "Rules drafted",
    time: "11:05 AM",
    evidence: "Allow and deny rules written with a plain-English summary",
  },
  {
    stage: "Checks passed",
    time: "11:07 AM",
    evidence: "124 people in scope · low risk · 47 systems tested",
  },
  {
    stage: "Approved",
    time: "11:08 AM",
    evidence: "Security lead and HIPAA compliance sign-off recorded",
  },
  {
    stage: "Live",
    time: "12:35 PM",
    evidence: "Active in 3 regions · 847 access events logged since deploy",
  },
] as const;

export const COPILOT_RECENT_POLICIES: { period: string; items: CopilotRecentItem[] }[] = [
  {
    period: "Today",
    items: [
      {
        label: "Application access control",
        prompt: "Allow doctors to securely access Electronic Health Records from hospital-managed devices",
        flowMode: "author",
      },
    ],
  },
  {
    period: "Yesterday",
    items: [
      {
        label: "Secure Resource Access",
        prompt:
          "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
        flowMode: "author",
      },
      {
        label: "Compliance Framework Policy",
        prompt: "Restrict SQL Server to Finance subnet",
        flowMode: "document",
        modeHint: "Capture legacy rule — no deploy until documented",
      },
    ],
  },
  {
    period: "Previous",
    items: [
      {
        label: "Team Collaboration Access",
        prompt: "Allow Marketing to LinkedIn during business hours",
        flowMode: "review",
        modeHint: "Drift detected — compare live rule to original intent",
      },
      {
        label: "VPN Access Policy",
        prompt: "Allow external vendor VPN access to staging only",
        flowMode: "author",
        modeHint: "Incomplete scope — expect validation to flag gaps",
      },
    ],
  },
];

export const COPILOT_SECONDARY_STARTS = [
  {
    id: "templates",
    title: "Browse templates",
    description: "Start from a common access or compliance pattern.",
    linkLabel: "View templates →",
    prompt: "Block contractors from Production",
  },
  {
    id: "existing",
    title: "Existing policies",
    description: "Review, tune, or retire rules already in production.",
    linkLabel: "Open dashboard →",
    prompt:
      "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
  },
] as const;

export const LAYER_PHASES: WorkspacePhase[] = [
  "intent",
  "understand",
  "clarify",
  "draft",
  "validate",
  "simulate",
  "optimize",
  "review",
  "approve",
  "deploy",
];

export const LAYER_LABELS: Record<WorkspacePhase, string> = {
  intent: "Intent",
  understand: "Understand",
  clarify: "Clarify",
  draft: "Draft",
  validate: "Validate",
  simulate: "Simulate",
  optimize: "Optimise",
  review: "Review",
  approve: "Approve",
  deploy: "Deploy",
};

export function phaseIndex(phase: WorkspacePhase): number {
  return LAYER_PHASES.indexOf(phase);
}

export function maxPhaseIndex(unlocked: WorkspacePhase): number {
  return phaseIndex(unlocked);
}

function cloneSections(sections: PolicyScenario["policySections"]) {
  return sections.map((s) => ({
    ...s,
    fields: s.fields.map((f) => ({ ...f })),
  }));
}

type ScenarioCore = Omit<
  PolicyScenario,
  | "policyTitle"
  | "complianceContext"
  | "businessIntent"
  | "simulations"
  | "optimizations"
  | "memorySeed"
  | "deploymentSteps"
>;

function enrichScenario(core: ScenarioCore): PolicyScenario {
  const source =
    core.policySections[0]?.fields.find((f) => f.id === "source")?.value ?? "Source";
  const dest =
    core.policySections[0]?.fields.find((f) =>
      ["dest", "destination"].includes(f.id),
    )?.value ?? "Destination";
  const app =
    core.policySections[0]?.fields.find((f) =>
      ["apps", "applications"].includes(f.id),
    )?.value ?? "Application";

  const complianceMap: Record<string, string> = {
    ehr: "HIPAA · Healthcare",
    "finance-sap": "SOX · PCI DSS",
    contractors: "NIST · Golden config",
    "hr-payroll": "PII · SOC 2",
    "vendor-vpn": "Vendor risk · ISO 27001",
    marketing: "Acceptable use · Web filtering",
  };

  const policySections = core.policySections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      why: field.why ?? `Supports: ${core.intentSummary}`,
      inferredFrom: field.inferredFrom ?? core.intentSummary,
      fieldConfidence: field.fieldConfidence ?? core.baseConfidence + 8,
    })),
  }));

  return {
    ...core,
    policyTitle: `${app} · ${source} → ${dest}`,
    complianceContext: complianceMap[core.id] ?? "Enterprise policy",
    businessIntent: core.intentSummary,
    policySections,
    simulations: [
      {
        label: "User impact",
        value: "12 users affected · 0 blocked",
        status: "success",
      },
      {
        label: "Application impact",
        value: `${app} — no dependency conflicts`,
        status: "success",
      },
      {
        label: "Traffic path",
        value: "Simulated 2.4k sessions / 24h",
        status: "success",
      },
      {
        label: "Risk level",
        value: core.baseConfidence >= 80 ? "Low" : "Moderate",
        status: core.baseConfidence >= 80 ? "success" : "warning",
      },
      {
        label: "Rollback",
        value: "Snapshot POL-2026-041 ready",
        status: "success",
      },
    ],
    optimizations: [
      {
        id: "reuse-ad",
        title: "Reuse existing AD group",
        why: "Matching identity object found in directory.",
        benefit: "Reduces object sprawl and audit surface.",
        tradeoff: "Group membership must stay current.",
        applied: false,
      },
      {
        id: "app-rule",
        title: "Convert to application rule",
        why: "Port-based rule broader than required.",
        benefit: "Least-privilege application identification.",
        tradeoff: "Requires app-ID coverage on firewall.",
        applied: core.id === "finance-sap",
      },
      {
        id: "compliance-tag",
        title: "Add compliance tags",
        why: `Maps to ${complianceMap[core.id] ?? "policy"} controls.`,
        benefit: "Automated reporting and evidence collection.",
        tradeoff: "Tags must align with CMDB taxonomy.",
        applied: true,
      },
    ],
    memorySeed: [
      {
        id: "m1",
        title: "Intent captured",
        detail: core.intentSummary,
        time: "T+0s",
      },
      {
        id: "m2",
        title: "Assumptions recorded",
        detail: core.assumptions.join(" · "),
        time: "T+2s",
      },
      {
        id: "m3",
        title: "Business justification",
        detail: core.intentSummary,
        time: "Pending approval",
      },
    ],
    deploymentSteps: [
      { id: "d1", label: "Intent captured", status: "done" },
      { id: "d2", label: "Policy generated", status: "pending" },
      { id: "d3", label: "Validated", status: "pending" },
      { id: "d4", label: "Simulated", status: "pending" },
      { id: "d5", label: "Approved", status: "pending" },
      { id: "d6", label: "Production", status: "pending" },
      { id: "d7", label: "Monitoring", status: "pending" },
    ],
  };
}

export function createScenarioState(scenario: PolicyScenario) {
  return {
    id: scenario.id,
    policyTitle: scenario.policyTitle,
    complianceContext: scenario.complianceContext,
    businessIntent: scenario.businessIntent,
    understanding: scenario.understanding,
    missingInfo: [...scenario.missingInfo],
    intentSummary: scenario.intentSummary,
    entities: scenario.entities.map((e) => ({ ...e })),
    assumptions: [...scenario.assumptions],
    clarifications: scenario.clarifications,
    policySections: cloneSections(scenario.policySections),
    validations: scenario.validations,
    recommendations: scenario.recommendations.map((r) => ({ ...r })),
    simulations: [...scenario.simulations],
    optimizations: scenario.optimizations.map((o) => ({ ...o })),
    memory: scenario.memorySeed.map((m) => ({ ...m })),
    deploymentSteps: scenario.deploymentSteps.map((d) => ({ ...d })),
    baseConfidence: scenario.baseConfidence,
  };
}

const SCENARIOS: ScenarioCore[] = [
  {
    id: "ehr",
    understanding: [
      { label: "Users", value: "Doctors" },
      { label: "Application", value: "Electronic Health Records" },
      { label: "Source", value: "Hospital-managed devices" },
      { label: "Destination", value: "Healthcare network" },
      { label: "Authentication", value: "MFA suggested" },
    ],
    missingInfo: ["Business hours?", "Remote access?", "Temporary access?"],
    intentSummary:
      "Allow authenticated doctors to securely access the EHR application from managed hospital devices.",
    entities: [
      { label: "Role", value: "Doctors" },
      { label: "Application", value: "EHR system" },
      { label: "Source zone", value: "Managed endpoints" },
      { label: "Destination", value: "Healthcare network" },
    ],
    assumptions: [
      "Authentication required",
      "Hospital-managed devices only",
      "Healthcare data classification",
    ],
    clarifications: [
      {
        id: "remote",
        question: "Should this work remotely?",
        options: ["On-site only", "VPN required", "Both"],
      },
      {
        id: "hours",
        question: "Limit to business hours?",
        options: ["Yes", "No", "24/7 with logging"],
      },
      {
        id: "audit",
        question: "Enable audit logging?",
        options: ["Yes", "No"],
      },
    ],
    policySections: [
      {
        title: "Access rule",
        fields: [
          { id: "users", label: "Users", value: "Doctors (authenticated)" },
          { id: "apps", label: "Applications", value: "Electronic Health Records" },
          { id: "source", label: "Source", value: "Managed hospital devices" },
          { id: "dest", label: "Destination", value: "Healthcare segment" },
        ],
      },
      {
        title: "Conditions",
        fields: [
          { id: "auth", label: "Authentication", value: "MFA required" },
          { id: "logging", label: "Logging", value: "Full audit trail" },
        ],
      },
    ],
    validations: [
      {
        id: "conflict",
        title: "Policy conflict",
        status: "success",
        explanation: "No conflicting allow rules for this pair.",
        action: "Proceed",
      },
      {
        id: "compliance",
        title: "Compliance",
        status: "warning",
        explanation: "Healthcare data requires MFA and audit logging.",
        action: "Enable controls",
      },
      {
        id: "blast",
        title: "Blast radius",
        status: "attention",
        explanation: "Broad doctor group increases exposure.",
        action: "Consider sub-groups",
      },
    ],
    recommendations: [
      {
        id: "mfa",
        title: "Require MFA",
        reason: "Protects clinical access from credential theft.",
        ifIgnored: "Stolen credentials could reach EHR.",
        improvement: "Second factor before app access.",
        securityImpact: "Blocks credential-stuffing and session hijack paths to PHI.",
        complianceImpact: "Supports HIPAA access-control and audit requirements.",
        tradeoffs: "Adds ~2s to clinician sign-in; worth it for regulated data.",
        applied: true,
      },
      {
        id: "audit",
        title: "Enable audit logging",
        reason: "Healthcare data needs traceability.",
        ifIgnored: "Compliance review gaps.",
        improvement: "Full session traceability.",
        securityImpact: "Forensics and anomaly detection on EHR sessions.",
        complianceImpact: "Meets HIPAA audit-control evidence expectations.",
        tradeoffs: "Slightly higher log volume in SIEM — retention policy applies.",
        applied: true,
      },
    ],
    baseConfidence: 72,
  },
  {
    id: "finance-sap",
    understanding: [
      { label: "Users", value: "Finance department" },
      { label: "Application", value: "SAP ERP" },
      { label: "Source", value: "Corporate workstations" },
      { label: "Destination", value: "Finance application zone" },
      { label: "Authentication", value: "SSO + MFA" },
    ],
    missingInfo: ["Read-only or full access?", "Contractor inclusion?", "Geo restrictions?"],
    intentSummary:
      "Allow Finance users to reach SAP ERP from corporate-managed workstations with authenticated access.",
    entities: [
      { label: "Role", value: "Finance" },
      { label: "Application", value: "SAP ERP" },
      { label: "Source zone", value: "Corporate LAN" },
      { label: "Destination", value: "Finance app tier" },
    ],
    assumptions: [
      "Corporate-managed endpoints",
      "Finance data classification",
      "Existing SSO integration",
    ],
    clarifications: [
      {
        id: "access-level",
        question: "Read-only or transaction access?",
        options: ["Read-only", "Full access", "Role-based"],
      },
      {
        id: "contractors",
        question: "Include finance contractors?",
        options: ["No", "Yes — limited", "Yes — same as FTE"],
      },
      {
        id: "geo",
        question: "Restrict by geography?",
        options: ["HQ only", "Regional offices", "No restriction"],
      },
    ],
    policySections: [
      {
        title: "Access rule",
        fields: [
          { id: "users", label: "Users", value: "Finance-Users group" },
          { id: "apps", label: "Applications", value: "SAP ERP (TCP 443)" },
          { id: "source", label: "Source", value: "Corp-Workstations" },
          { id: "dest", label: "Destination", value: "FIN-App-Segment" },
        ],
      },
      {
        title: "Conditions",
        fields: [
          { id: "auth", label: "Authentication", value: "SSO + MFA" },
          { id: "logging", label: "Logging", value: "Transaction audit enabled" },
        ],
      },
    ],
    validations: [
      {
        id: "conflict",
        title: "Policy conflict",
        status: "success",
        explanation: "No deny rule blocks Finance → SAP path.",
        action: "Proceed",
      },
      {
        id: "segmentation",
        title: "Segmentation",
        status: "success",
        explanation: "Finance zone isolation verified.",
        action: "No change",
      },
      {
        id: "sox",
        title: "SOX controls",
        status: "warning",
        explanation: "Transaction logging required for financial systems.",
        action: "Enable transaction logs",
      },
    ],
    recommendations: [
      {
        id: "least-priv",
        title: "Least-privilege roles",
        reason: "SAP modules should map to finance sub-roles.",
        ifIgnored: "Over-broad SAP access.",
        improvement: "Module-scoped entitlements.",
        applied: false,
      },
      {
        id: "mfa",
        title: "Require MFA",
        reason: "Financial systems mandate step-up auth.",
        ifIgnored: "SOX audit finding risk.",
        improvement: "Step-up before SAP login.",
        applied: true,
      },
    ],
    baseConfidence: 68,
  },
  {
    id: "contractors",
    understanding: [
      { label: "Users", value: "Contractors" },
      { label: "Action", value: "Deny access" },
      { label: "Source", value: "Contractor network" },
      { label: "Destination", value: "Production environment" },
      { label: "Authentication", value: "N/A — deny rule" },
    ],
    missingInfo: ["Exception process?", "Monitoring alerts?"],
    intentSummary:
      "Block contractors from reaching production systems while preserving audit visibility.",
    entities: [
      { label: "Role", value: "Contractors" },
      { label: "Target", value: "Production" },
      { label: "Source zone", value: "Contractor-VLAN" },
      { label: "Action", value: "Explicit deny" },
    ],
    assumptions: [
      "Contractor identity group exists",
      "Production segment tagged",
      "Deny takes precedence",
    ],
    clarifications: [
      {
        id: "exceptions",
        question: "Break-glass exception path?",
        options: ["No", "Ticket + time-boxed", "Manager approval"],
      },
      {
        id: "alert",
        question: "Alert on violation attempts?",
        options: ["Yes — SOC", "Log only", "No"],
      },
    ],
    policySections: [
      {
        title: "Deny rule",
        fields: [
          { id: "users", label: "Users", value: "Contractor-All" },
          { id: "apps", label: "Applications", value: "Any (production)" },
          { id: "source", label: "Source", value: "Contractor-VLAN" },
          { id: "dest", label: "Destination", value: "PROD-Segment" },
        ],
      },
      {
        title: "Conditions",
        fields: [
          { id: "action", label: "Action", value: "Deny + log" },
          { id: "logging", label: "Logging", value: "Alert SOC on hit" },
        ],
      },
    ],
    validations: [
      {
        id: "conflict",
        title: "Policy conflict",
        status: "attention",
        explanation: "Existing allow rule for vendor VPN may overlap.",
        action: "Review vendor exception",
      },
      {
        id: "coverage",
        title: "Coverage",
        status: "success",
        explanation: "All production subnets in scope.",
        action: "Proceed",
      },
    ],
    recommendations: [
      {
        id: "alert",
        title: "SOC alerting",
        reason: "Deny hits indicate policy violation attempts.",
        ifIgnored: "Silent failures in contractor access.",
        improvement: "Real-time SOC notification.",
        applied: true,
      },
    ],
    baseConfidence: 81,
  },
  {
    id: "hr-payroll",
    understanding: [
      { label: "Users", value: "HR department" },
      { label: "Application", value: "Payroll system" },
      { label: "Source", value: "HR workstations" },
      { label: "Destination", value: "HR/Payroll zone" },
      { label: "Authentication", value: "MFA required" },
    ],
    missingInfo: ["Pay period access?", "PII export controls?"],
    intentSummary:
      "Grant HR staff authenticated access to the payroll application from HR-managed endpoints.",
    entities: [
      { label: "Role", value: "HR" },
      { label: "Application", value: "Payroll" },
      { label: "Source zone", value: "HR endpoints" },
      { label: "Destination", value: "Payroll segment" },
    ],
    assumptions: ["PII data class", "HR identity group", "Business-hours policy"],
    clarifications: [
      {
        id: "hours",
        question: "Business hours only?",
        options: ["Yes", "No", "Payroll week extended"],
      },
      {
        id: "export",
        question: "Restrict bulk export?",
        options: ["Yes", "No", "Approval required"],
      },
    ],
    policySections: [
      {
        title: "Access rule",
        fields: [
          { id: "users", label: "Users", value: "HR-Users" },
          { id: "apps", label: "Applications", value: "Payroll app" },
          { id: "source", label: "Source", value: "HR-Workstations" },
          { id: "dest", label: "Destination", value: "PAYROLL-Segment" },
        ],
      },
      {
        title: "Conditions",
        fields: [
          { id: "auth", label: "Authentication", value: "MFA" },
          { id: "logging", label: "Logging", value: "PII access audit" },
        ],
      },
    ],
    validations: [
      {
        id: "compliance",
        title: "PII compliance",
        status: "warning",
        explanation: "Payroll access needs enhanced logging.",
        action: "Enable PII audit",
      },
      {
        id: "conflict",
        title: "Policy conflict",
        status: "success",
        explanation: "No conflicting rules detected.",
        action: "Proceed",
      },
    ],
    recommendations: [
      {
        id: "hours",
        title: "Restrict access window",
        reason: "Aligns with HR operations policy.",
        ifIgnored: "Off-hours PII access risk.",
        improvement: "Monitored business-hours window.",
        applied: false,
      },
    ],
    baseConfidence: 74,
  },
  {
    id: "vendor-vpn",
    understanding: [
      { label: "Users", value: "External vendor" },
      { label: "Application", value: "VPN gateway" },
      { label: "Source", value: "Internet" },
      { label: "Destination", value: "Vendor sandbox" },
      { label: "Authentication", value: "Certificate + MFA" },
    ],
    missingInfo: ["Duration?", "Approved vendor list?", "Data scope?"],
    intentSummary:
      "Provide time-limited VPN access for an approved vendor to the isolated sandbox environment.",
    entities: [
      { label: "Role", value: "Vendor" },
      { label: "Access", value: "Temporary VPN" },
      { label: "Source", value: "External" },
      { label: "Destination", value: "Vendor sandbox" },
    ],
    assumptions: ["Vendor pre-approved", "Sandbox isolated", "Auto-expiry expected"],
    clarifications: [
      {
        id: "duration",
        question: "Access duration?",
        options: ["24 hours", "7 days", "30 days"],
      },
      {
        id: "scope",
        question: "Data scope?",
        options: ["Sandbox only", "Staging", "Limited prod read"],
      },
    ],
    policySections: [
      {
        title: "VPN rule",
        fields: [
          { id: "users", label: "Users", value: "Vendor-Approved" },
          { id: "apps", label: "Service", value: "VPN-Gateway" },
          { id: "source", label: "Source", value: "Internet" },
          { id: "dest", label: "Destination", value: "Vendor-Sandbox" },
        ],
      },
      {
        title: "Lifecycle",
        fields: [
          { id: "auth", label: "Authentication", value: "Cert + MFA" },
          { id: "expiry", label: "Expiration", value: "7 days (auto-revoke)" },
        ],
      },
    ],
    validations: [
      {
        id: "isolation",
        title: "Isolation",
        status: "success",
        explanation: "Sandbox has no prod route.",
        action: "Proceed",
      },
      {
        id: "expiry",
        title: "Lifecycle",
        status: "warning",
        explanation: "Temporary access must auto-expire.",
        action: "Set 7-day TTL",
      },
    ],
    recommendations: [
      {
        id: "ttl",
        title: "Auto-expire access",
        reason: "Vendor access should never be permanent.",
        ifIgnored: "Stale vendor paths remain open.",
        improvement: "Automatic revocation on expiry.",
        applied: true,
      },
    ],
    baseConfidence: 70,
  },
];

/** Six-step lifecycle after interpret (Figma screens 5–10). */
export type LifecyclePhase =
  | "author"
  | "validate_ready"
  | "validate_progress"
  | "deploy_ready"
  | "deploy_progress"
  | "optimize"
  | "review";

export const LIFECYCLE_META = {
  author: { step: 2, total: 6, progress: 32, label: "Author" },
  validate: { step: 3, total: 6, progress: 48, label: "Validate" },
  deploy: { step: 4, total: 6, progress: 62, label: "Deploy" },
  optimize: { step: 5, total: 6, progress: 78, label: "Optimise" },
  review: { step: 6, total: 6, progress: 100, label: "Review" },
} as const;

export const EHR_JOURNEY_DEFAULTS = {
  policyName: "EHR doctor access policy",
  justification: "Clinical staff only — per hospital access policy.",
  reviewSchedule: "Review every 90 days",
  authorName: "Nik (Netsec)",
  policyTitle: "Doctor access",
  ticketId: "INC-9942",
  deployedAt: "Dec 30, 2025, 12:35 PM",
  regions: ["US-EAST", "US-WEST", "EU-CENTRAL"],
} as const;

export const INTERPRET_ANALYSIS_STEPS = [
  "Reading your request",
  "Finding people and groups",
  "Looking up applications",
  "Checking security controls",
  "Drafting the rules",
] as const;

export const VALIDATION_COMPLIANCE_CHECKS = [
  { id: "hipaa", label: "HIPAA (ePHI)", status: "done" as const },
  { id: "nist", label: "NIST 800-207", status: "done" as const },
  { id: "tls", label: "Encryption (TLS 1.3)", status: "done" as const },
  { id: "pci", label: "PCI DSS v4.0", status: "done" as const },
];

export const DEPLOY_REGIONS = [
  { id: "us-east", label: "US-EAST-1 (N. Virginia)" },
  { id: "us-west", label: "US-WEST-2 (Oregon)" },
  { id: "eu-central", label: "EU-CENTRAL-1 (Frankfurt)" },
] as const;

export const DEPLOY_PROGRESS_STEPS = [
  {
    id: "prechecks",
    label: "Pre-checks",
    items: ["Verify device health", "Confirm policy version", "Validate entity mappings"],
  },
  {
    id: "backups",
    label: "Backups",
    items: ["Backup running configuration", "Store backup with timestamp"],
  },
  {
    id: "push",
    label: "Policy push",
    items: [
      "Apply new access rule",
      "SSL inspection policy",
      "Logging profile",
      "Threat detection policy",
    ],
  },
  {
    id: "health",
    label: "Post deployment health checks",
    items: [
      "Verify resource accessibility",
      "Confirm access denied",
      "Validate logging to SIEM",
    ],
  },
  {
    id: "safety",
    label: "Safety nets",
    items: ["Define auto rollback plan", "Set rollback trigger thresholds"],
  },
] as const;

export function resolveScenario(requestText: string): PolicyScenario {
  const lower = requestText.toLowerCase();
  let core: ScenarioCore;
  if (lower.includes("finance") || lower.includes("sap") || lower.includes("sql") || lower.includes("financial report") || lower.includes("senior manager")) {
    core = SCENARIOS.find((s) => s.id === "finance-sap")!;
  } else if (
    lower.includes("doctor") ||
    lower.includes("nurse") ||
    lower.includes("health") ||
    lower.includes("ehr") ||
    lower.includes("patient record")
  ) {
    core = SCENARIOS.find((s) => s.id === "ehr")!;
  } else if (lower.includes("contractor") || lower.includes("production")) {
    core = SCENARIOS.find((s) => s.id === "contractors")!;
  } else if (lower.includes("payroll") || (lower.includes("hr") && lower.includes("access"))) {
    core = SCENARIOS.find((s) => s.id === "hr-payroll")!;
  } else if (lower.includes("vendor") || lower.includes("vpn")) {
    core = SCENARIOS.find((s) => s.id === "vendor-vpn")!;
  } else if (lower.includes("linkedin") || lower.includes("marketing")) {
    core = {
      ...SCENARIOS.find((s) => s.id === "finance-sap")!,
      id: "marketing",
      intentSummary:
        "Allow Marketing users to reach LinkedIn during business hours with acceptable-use controls.",
      understanding: [
        { label: "Users", value: "Marketing department" },
        { label: "Application", value: "LinkedIn (SaaS)" },
        { label: "Source", value: "Corporate workstations" },
        { label: "Destination", value: "Internet · SaaS" },
        { label: "Direction", value: "Outbound allow" },
      ],
      missingInfo: ["Upload restrictions?", "Personal account blocking?"],
      baseConfidence: 76,
      clarifications: [
        {
          id: "hours",
          question: "Business hours only?",
          options: ["Yes", "No", "Extended with logging"],
        },
        {
          id: "upload",
          question: "Block file uploads?",
          options: ["Yes", "No", "Scan only"],
        },
      ],
      policySections: [
        {
          title: "Web access rule",
          fields: [
            { id: "users", label: "Identity", value: "Marketing-Users" },
            { id: "apps", label: "Application", value: "LinkedIn SaaS" },
            { id: "source", label: "Source", value: "Corp-Workstations" },
            { id: "dest", label: "Destination", value: "Internet-SaaS" },
          ],
        },
        {
          title: "Controls",
          fields: [
            { id: "hours", label: "Access window", value: "Business hours" },
            { id: "logging", label: "Logging", value: "URL filtering + audit" },
          ],
        },
      ],
    };
  } else {
    core = SCENARIOS[0];
  }
  return enrichScenario(core);
}

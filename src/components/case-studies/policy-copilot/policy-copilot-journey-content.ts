import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export interface InterpretationLine {
  kind: "allow" | "deny" | "neutral";
  text: string;
}

export interface GeneratedRule {
  kind: "allow" | "deny";
  label: string;
  detail: string;
}

export interface ProcessingStats {
  groups: number;
  resources: number;
  rules: number;
}

export interface ContextBrowserData {
  objects: { name: string; type: string }[];
  compliance: { framework: string; status: string }[];
  patterns: { name: string; count: number }[];
  businessContext: string;
}

export interface EvidenceRecommendation {
  id: string;
  title: string;
  why: string;
  tradeoff: string;
  frameworks?: string[];
  patternCount?: number;
}

export interface ScenarioJourneyContent {
  interpretations: InterpretationLine[];
  rules: GeneratedRule[];
  stats: ProcessingStats;
  context: ContextBrowserData;
  evidenceRecs: EvidenceRecommendation[];
  deploySummary: string[];
}

const JOURNEY_BY_ID: Record<string, ScenarioJourneyContent> = {
  ehr: {
    interpretations: [
      { kind: "allow", text: "Allow doctors to access Electronic Health Records" },
      { kind: "deny", text: "Deny nurses from accessing Electronic Health Records" },
      { kind: "deny", text: "Deny all others from accessing Electronic Health Records" },
      { kind: "neutral", text: "Log every access attempt for audit" },
    ],
    rules: [
      { kind: "allow", label: "Allow doctors → EHR", detail: "Hospital-managed devices only" },
      { kind: "deny", label: "Deny nurses → EHR", detail: "Explicit block — clinical role separation" },
      { kind: "deny", label: "Deny all others → EHR", detail: "Default deny for ePHI" },
    ],
    stats: { groups: 3, resources: 1, rules: 3 },
    context: {
      objects: [
        { name: "Doctors-AD-Group", type: "Identity" },
        { name: "EHR-Application-Object", type: "Application" },
        { name: "Managed-Hospital-Endpoints", type: "Device zone" },
      ],
      compliance: [
        { framework: "HIPAA", status: "Access & audit controls mapped" },
        { framework: "SOC 2", status: "Logging profile attached" },
      ],
      patterns: [
        { name: "Clinical ePHI allow paths", count: 18 },
        { name: "Role-separated deny rules", count: 42 },
      ],
      businessContext:
        "Hospital policy requires doctors on managed endpoints only. Nurses use a separate clinical workflow.",
    },
    evidenceRecs: [
      {
        id: "mfa",
        title: "Require MFA for doctors",
        why: "Based on 18 similar clinical access paths in your environment.",
        tradeoff: "Adds ~2 seconds to sign-in.",
        frameworks: ["HIPAA", "SOC 2"],
        patternCount: 18,
      },
    ],
    deploySummary: ["SIEM audit logging on", "90-day review cadence"],
  },
  "finance-sap": {
    interpretations: [
      { kind: "allow", text: "Allow finance users to reach SAP from corporate workstations" },
      { kind: "allow", text: "Allow finance users to reach SQL Server in the finance subnet" },
      { kind: "deny", text: "Deny contractors unless ticketed exception" },
      { kind: "neutral", text: "Enable transaction logging for SOX evidence" },
    ],
    rules: [
      { kind: "allow", label: "Allow Finance-Users → SAP-ERP", detail: "Corp-Workstations → FIN-App-Segment" },
      { kind: "allow", label: "Allow Finance-Users → FIN-SQL", detail: "Database tier in finance zone" },
      { kind: "deny", label: "Deny Contractors → FIN-App-Segment", detail: "Default deny — ticket required" },
    ],
    stats: { groups: 2, resources: 2, rules: 3 },
    context: {
      objects: [
        { name: "Finance-Users group", type: "Identity" },
        { name: "SAP-ERP-Application", type: "Application" },
        { name: "FIN-SQL-Server", type: "Database" },
      ],
      compliance: [
        { framework: "SOX", status: "Financial controls satisfied" },
        { framework: "PCI", status: "Not in scope for this path" },
      ],
      patterns: [
        { name: "Finance zone segmentation", count: 12 },
        { name: "SOX logging profiles", count: 9 },
      ],
      businessContext: "Finance analysts need SAP and SQL on approved subnets only — contractors excluded by default.",
    },
    evidenceRecs: [
      {
        id: "mfa",
        title: "Require MFA for finance",
        why: "Step-up auth is required for financial systems under SOX in 9 similar policies.",
        tradeoff: "One extra prompt per session.",
        frameworks: ["SOX"],
        patternCount: 9,
      },
    ],
    deploySummary: ["Transaction logging on", "Segmentation verified", "60-day review cadence"],
  },
  marketing: {
    interpretations: [
      { kind: "allow", text: "Allow marketing to access LinkedIn during business hours" },
      { kind: "deny", text: "Deny personal LinkedIn accounts" },
      { kind: "neutral", text: "Scan uploads on egress" },
      { kind: "deny", text: "Block access outside Mon–Fri 09:00–18:00" },
    ],
    rules: [
      { kind: "allow", label: "Allow Marketing-Users → LinkedIn", detail: "Business hours · corporate devices" },
      { kind: "deny", label: "Deny personal accounts", detail: "Corporate identity only" },
      { kind: "deny", label: "Deny off-hours access", detail: "Schedule enforced" },
    ],
    stats: { groups: 1, resources: 1, rules: 3 },
    context: {
      objects: [
        { name: "Marketing-Users group", type: "Identity" },
        { name: "LinkedIn-SaaS-App", type: "SaaS" },
        { name: "Internet-SaaS", type: "Destination" },
      ],
      compliance: [
        { framework: "Acceptable use", status: "Time window applied" },
        { framework: "SOC 2", status: "Upload scan enabled" },
      ],
      patterns: [
        { name: "SaaS business-hour allows", count: 24 },
        { name: "Marketing tool exceptions", count: 6 },
      ],
      businessContext: "Approved outreach exception — personal accounts and off-hours use stay blocked.",
    },
    evidenceRecs: [
      {
        id: "mfa",
        title: "Require MFA for SaaS",
        why: "24 similar SaaS paths use MFA to protect external credentials.",
        tradeoff: "One extra prompt at first login each day.",
        frameworks: ["SOC 2"],
        patternCount: 24,
      },
    ],
    deploySummary: ["Business-hours schedule", "Upload scan on", "180-day review cadence"],
  },
  contractors: {
    interpretations: [
      { kind: "deny", text: "Deny contractors from all production workloads" },
      { kind: "neutral", text: "Log every deny attempt for SIEM" },
      { kind: "deny", text: "Close legacy exceptions unless ticketed" },
    ],
    rules: [
      { kind: "deny", label: "Deny Contractors → Production", detail: "Explicit deny — all services" },
      { kind: "deny", label: "Deny Contractor-Prod-Exception", detail: "Retire open exception from 2024" },
    ],
    stats: { groups: 1, resources: 1, rules: 2 },
    context: {
      objects: [
        { name: "Contractors-AD-Group", type: "Identity" },
        { name: "Production-Segment", type: "Zone" },
      ],
      compliance: [
        { framework: "Golden config", status: "Baseline match" },
        { framework: "ISO 27001", status: "Production isolation verified" },
      ],
      patterns: [
        { name: "Production deny rules", count: 31 },
        { name: "Contractor exceptions", count: 2 },
      ],
      businessContext: "Golden configuration — contractors never reach production without a time-boxed ticket.",
    },
    evidenceRecs: [
      {
        id: "alert",
        title: "Alert on deny attempts",
        why: "Repeated production probes may signal credential misuse — seen in 31 deny policies.",
        tradeoff: "SIEM noise if contractors mis-type URLs.",
        frameworks: ["ISO 27001"],
        patternCount: 31,
      },
    ],
    deploySummary: ["Deny-by-default", "SIEM deny logging", "30-day review cadence"],
  },
  "vendor-vpn": {
    interpretations: [
      { kind: "allow", text: "Allow approved vendor via VPN to staging only" },
      { kind: "deny", text: "Deny vendor access to production and internal apps" },
      { kind: "neutral", text: "Expire access in 30 days automatically" },
      { kind: "neutral", text: "Log all vendor sessions to SIEM" },
    ],
    rules: [
      { kind: "allow", label: "Allow Vendor-Contractors → Staging", detail: "VPN-Gateway · 30-day expiry" },
      { kind: "deny", label: "Deny Vendor → Production", detail: "No lateral movement" },
      { kind: "deny", label: "Deny Vendor → Internal apps", detail: "Sandbox isolation" },
    ],
    stats: { groups: 1, resources: 2, rules: 3 },
    context: {
      objects: [
        { name: "Vendor-Contractors group", type: "Identity" },
        { name: "VPN-Gateway", type: "Remote access" },
        { name: "Staging-Sandbox-VLAN", type: "Environment" },
      ],
      compliance: [
        { framework: "ISO 27001", status: "Vendor risk controls" },
        { framework: "SOC 2", status: "Expiry & logging enforced" },
      ],
      patterns: [
        { name: "Time-boxed vendor VPN", count: 14 },
        { name: "Staging-only sandboxes", count: 8 },
      ],
      businessContext: "Integration work in staging — production stays unreachable; access auto-expires.",
    },
    evidenceRecs: [
      {
        id: "mfa",
        title: "Require MFA for vendors",
        why: "External identities need step-up auth before VPN in 14 similar vendor paths.",
        tradeoff: "Vendor onboarding adds one setup step.",
        frameworks: ["ISO 27001", "SOC 2"],
        patternCount: 14,
      },
    ],
    deploySummary: ["30-day auto-expiry", "Staging-only scope", "Vendor SIEM profile"],
  },
};

export function resolveJourneyContent(preset: LivingScenarioPreset): ScenarioJourneyContent {
  const known = JOURNEY_BY_ID[preset.id];
  if (known) return known;

  const allowMappings = preset.entityMappings.filter((m) => !m.term.includes("deny") && !m.term.includes("log"));
  const interpretations: InterpretationLine[] = [
    { kind: "allow", text: preset.ruleReasoning.split(".")[0] ?? preset.ruleReasoning },
    { kind: "neutral", text: preset.complianceCheck.detail },
  ];
  const rules: GeneratedRule[] = allowMappings.slice(0, 2).map((m) => ({
    kind: "allow" as const,
    label: `Allow ${m.resolved}`,
    detail: m.type,
  }));

  return {
    interpretations,
    rules,
    stats: { groups: allowMappings.length, resources: 1, rules: rules.length },
    context: {
      objects: preset.entityMappings.slice(0, 3).map((m) => ({ name: m.resolved, type: m.type })),
      compliance: [{ framework: preset.complianceCheck.label, status: preset.complianceCheck.detail }],
      patterns: [{ name: "Similar policies", count: 5 }],
      businessContext: preset.contextLine,
    },
    evidenceRecs: [
      {
        id: "mfa",
        title: preset.mfaTitle,
        why: preset.mfaWhy,
        tradeoff: preset.mfaTradeoff,
        patternCount: 5,
      },
    ],
    deploySummary: [preset.complianceCheck.label, preset.approval.reviewSchedule],
  };
}

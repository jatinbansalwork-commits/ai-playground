import { resolveScenario } from "@/components/case-studies/policy-copilot/policy-copilot-data";

export interface LivingEntityMapping {
  term: string;
  resolved: string;
  type: string;
}

export interface LivingDriftRec {
  rule: string;
  flag: string;
}

export interface LivingScenarioPreset {
  id: string;
  insightLine: string;
  entityMappings: LivingEntityMapping[];
  ruleReasoning: string;
  complianceCheck: { label: string; detail: string };
  blastRadius: string;
  riskDetail: string;
  contextLine: string;
  mfaTitle: string;
  mfaWhy: string;
  mfaTradeoff: string;
  driftRec?: LivingDriftRec;
  approval: {
    authorName: string;
    reviewSchedule: string;
    justification: string;
  };
  lifecycleTimeline: readonly {
    stage: string;
    time: string;
    evidence: string;
  }[];
}

const LIVING_PRESETS: Record<string, LivingScenarioPreset> = {
  ehr: {
    id: "ehr",
    insightLine: "This matches HIPAA access patterns I've seen in healthcare policies.",
    entityMappings: [
      { term: "doctors", resolved: "Doctors-AD-Group", type: "Identity (LDAP)" },
      {
        term: "hospital-managed devices",
        resolved: "Managed-Hospital-Endpoints",
        type: "Source devices",
      },
      {
        term: "electronic health records (EHR)",
        resolved: "EHR-Application-Object",
        type: "Protected application",
      },
      { term: "nurses", resolved: "Nurses-AD-Group", type: "Identity (LDAP)" },
      { term: "all others", resolved: "Everyone else — denied by default", type: "Default rule" },
      { term: "log every attempt", resolved: "SIEM-Audit-Profile", type: "Audit logging" },
    ],
    ruleReasoning:
      "Doctors can reach the EHR from hospital-managed devices only. Nurses and everyone else are blocked. Every attempt is logged for audit.",
    complianceCheck: { label: "HIPAA access & audit", detail: "ePHI controls satisfied" },
    blastRadius: "124 people in scope · 12 nurses blocked as planned · 0 surprise blocks",
    riskDetail: "No privilege escalation paths found",
    contextLine: "Doctors → EHR · hospital-managed devices only",
    mfaTitle: "Require MFA for doctors",
    mfaWhy: "Protects clinical access if credentials are stolen.",
    mfaTradeoff: "Adds ~2 seconds to sign-in.",
    approval: {
      authorName: "Nik (Netsec)",
      reviewSchedule: "Review every 90 days",
      justification: "Clinical staff only — per hospital access policy.",
    },
    lifecycleTimeline: [
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
    ],
  },
  "finance-sap": {
    id: "finance-sap",
    insightLine: "Finance application access — I'll map SOX and segmentation controls.",
    entityMappings: [
      { term: "finance", resolved: "Finance-Users group", type: "Identity (LDAP)" },
      { term: "SAP", resolved: "SAP-ERP-Application", type: "Business application" },
      { term: "SQL Server", resolved: "FIN-SQL-Server", type: "Database tier" },
      { term: "corporate workstations", resolved: "Corp-Workstations", type: "Source zone" },
      { term: "finance subnet", resolved: "FIN-App-Segment", type: "Destination zone" },
    ],
    ruleReasoning:
      "Finance users reach SAP and SQL from managed workstations only. Transaction logging is on. Contractors are excluded unless you add them later.",
    complianceCheck: { label: "SOX & segmentation", detail: "Financial controls and zone isolation verified" },
    blastRadius: "38 finance users in scope · 0 contractors · 0 surprise blocks",
    riskDetail: "No cross-zone privilege paths found",
    contextLine: "Finance → SAP / SQL · managed devices only",
    mfaTitle: "Require MFA for finance",
    mfaWhy: "Step-up auth is required for financial systems under SOX.",
    mfaTradeoff: "Adds one sign-in prompt per session.",
    driftRec: {
      rule: "Legacy-Oracle-Access",
      flag: "Unused since migration — overlaps with new SAP path. Safe to retire?",
    },
    approval: {
      authorName: "Priya (GRC)",
      reviewSchedule: "Review every 60 days",
      justification: "SOX-mandated access for finance analysts on approved subnets.",
    },
    lifecycleTimeline: [
      {
        stage: "Request captured",
        time: "9:12 AM",
        evidence: "Finance intent saved with SOX control mapping",
      },
      {
        stage: "Rules drafted",
        time: "9:13 AM",
        evidence: "SAP and SQL paths scoped to FIN-App-Segment",
      },
      {
        stage: "Checks passed",
        time: "9:15 AM",
        evidence: "38 users · segmentation verified · transaction logs enabled",
      },
      {
        stage: "Approved",
        time: "9:18 AM",
        evidence: "Finance controller and security sign-off recorded",
      },
      {
        stage: "Live",
        time: "10:02 AM",
        evidence: "Active in 2 regions · 1.2k SAP sessions logged since deploy",
      },
    ],
  },
  marketing: {
    id: "marketing",
    insightLine: "SaaS web access — I'll align this with acceptable-use and time windows.",
    entityMappings: [
      { term: "marketing", resolved: "Marketing-Users group", type: "Identity (LDAP)" },
      { term: "LinkedIn", resolved: "LinkedIn-SaaS-App", type: "SaaS application" },
      { term: "business hours", resolved: "Mon–Fri 09:00–18:00", type: "Time schedule" },
      { term: "corporate workstations", resolved: "Corp-Workstations", type: "Source zone" },
      { term: "internet SaaS", resolved: "Internet-SaaS", type: "Destination" },
    ],
    ruleReasoning:
      "Marketing can reach LinkedIn during business hours from corporate devices. Uploads are scanned. Personal accounts stay blocked.",
    complianceCheck: { label: "Acceptable use", detail: "Web filtering and time window applied" },
    blastRadius: "22 marketing users · 0 off-hours attempts in simulation",
    riskDetail: "No data-exfiltration paths detected",
    contextLine: "Marketing → LinkedIn · business hours only",
    mfaTitle: "Require MFA for SaaS",
    mfaWhy: "Protects marketing credentials used on external SaaS.",
    mfaTradeoff: "One extra prompt at first login each day.",
    driftRec: {
      rule: "LinkedIn_Access",
      flag: "Flagged Sept 2025 — no one has used it in months. Safe to remove?",
    },
    approval: {
      authorName: "Alex (IT)",
      reviewSchedule: "Review every 180 days",
      justification: "Approved business exception for marketing outreach tools.",
    },
    lifecycleTimeline: [
      {
        stage: "Request captured",
        time: "2:40 PM",
        evidence: "Marketing SaaS request with time-window intent",
      },
      {
        stage: "Rules drafted",
        time: "2:41 PM",
        evidence: "LinkedIn allow rule with schedule and upload scan",
      },
      {
        stage: "Checks passed",
        time: "2:43 PM",
        evidence: "22 users · acceptable-use tags · no shadow IT conflicts",
      },
      {
        stage: "Approved",
        time: "2:45 PM",
        evidence: "Marketing lead and security sign-off recorded",
      },
      {
        stage: "Live",
        time: "3:10 PM",
        evidence: "Active in 3 regions · 340 sessions within business hours",
      },
    ],
  },
  tiktok: {
    id: "tiktok",
    insightLine: "SaaS deny for interns — I'll align this with acceptable-use and time windows.",
    entityMappings: [
      { term: "interns", resolved: "Intern-Accounts group", type: "Identity (LDAP)" },
      { term: "TikTok", resolved: "TikTok-SaaS-App", type: "SaaS application" },
      { term: "business hours", resolved: "Mon–Fri 09:00–18:00", type: "Time schedule" },
      { term: "corporate workstations", resolved: "Corp-Workstations", type: "Source zone" },
      { term: "internet SaaS", resolved: "Internet-SaaS", type: "Destination" },
    ],
    ruleReasoning:
      "Intern accounts cannot reach TikTok during business hours from corporate devices. Attempts are logged. After-hours stays open unless you extend the deny.",
    complianceCheck: { label: "Acceptable use", detail: "Web filtering deny window applied" },
    blastRadius: "18 intern accounts · TikTok denied in business hours · 0 FTE impact",
    riskDetail: "No collateral deny on FTE or adjacent SaaS apps",
    contextLine: "Interns → TikTok blocked · business hours",
    mfaTitle: "Alert on repeated deny attempts",
    mfaWhy: "Repeated TikTok probes may signal policy confusion or shadow accounts.",
    mfaTradeoff: "SIEM noise if interns refresh blocked pages often.",
    driftRec: {
      rule: "Intern-Social-Media-Exception",
      flag: "Old allow for social media still open for 3 interns. Close it?",
    },
    approval: {
      authorName: "Alex (IT)",
      reviewSchedule: "Review every 90 days",
      justification: "Acceptable-use deny for intern productivity during business hours.",
    },
    lifecycleTimeline: [
      {
        stage: "Request captured",
        time: "11:05 AM",
        evidence: "Intern TikTok deny with business-hours intent",
      },
      {
        stage: "Rules drafted",
        time: "11:06 AM",
        evidence: "TikTok deny rule for Intern-Accounts with schedule",
      },
      {
        stage: "Checks passed",
        time: "11:08 AM",
        evidence: "18 interns · acceptable-use tags · no FTE surprise blocks",
      },
      {
        stage: "Approved",
        time: "11:10 AM",
        evidence: "People ops and security sign-off recorded",
      },
      {
        stage: "Live",
        time: "11:25 AM",
        evidence: "Active in 3 regions · 41 blocked attempts logged in first day",
      },
    ],
  },
  "vendor-vpn": {
    id: "vendor-vpn",
    insightLine: "Vendor VPN access — I'll scope this to staging with a time limit.",
    entityMappings: [
      { term: "external vendor", resolved: "Vendor-Contractors group", type: "Identity (LDAP)" },
      { term: "VPN", resolved: "VPN-Gateway", type: "Remote access" },
      { term: "staging", resolved: "Staging-Sandbox-VLAN", type: "Isolated environment" },
      { term: "time-limited", resolved: "30-day expiry", type: "Access window" },
      { term: "audit logging", resolved: "SIEM-Vendor-Profile", type: "Audit logging" },
    ],
    ruleReasoning:
      "Approved vendor reaches staging only via VPN. Access expires in 30 days. Production and internal apps stay blocked.",
    complianceCheck: { label: "Vendor risk & ISO 27001", detail: "Sandbox isolation and expiry enforced" },
    blastRadius: "4 vendor accounts · staging only · 0 production paths",
    riskDetail: "No lateral movement paths to production",
    contextLine: "Vendor → VPN → staging · 30-day window",
    mfaTitle: "Require MFA for vendors",
    mfaWhy: "External identities need step-up auth before VPN.",
    mfaTradeoff: "Vendor onboarding adds one setup step.",
    driftRec: {
      rule: "Old-Vendor-VPN-Pool",
      flag: "Expired pool from Q2 — 0 active sessions. Retire?",
    },
    approval: {
      authorName: "Sam (Netsec)",
      reviewSchedule: "Auto-expires in 30 days",
      justification: "Time-boxed vendor access to staging for integration work.",
    },
    lifecycleTimeline: [
      {
        stage: "Request captured",
        time: "4:05 PM",
        evidence: "Vendor ticket linked with expiry date",
      },
      {
        stage: "Rules drafted",
        time: "4:06 PM",
        evidence: "VPN allow scoped to staging sandbox only",
      },
      {
        stage: "Checks passed",
        time: "4:08 PM",
        evidence: "4 accounts · no production reach · rollback snapshot ready",
      },
      {
        stage: "Approved",
        time: "4:10 PM",
        evidence: "Vendor risk and security sign-off recorded",
      },
      {
        stage: "Live",
        time: "4:22 PM",
        evidence: "VPN active · 12 staging sessions logged · expiry armed",
      },
    ],
  },
  contractors: {
    id: "contractors",
    insightLine: "Production access restriction — I'll enforce deny-by-default for contractors.",
    entityMappings: [
      { term: "contractors", resolved: "Contractors-AD-Group", type: "Identity (LDAP)" },
      { term: "production", resolved: "Production-Segment", type: "Protected zone" },
      { term: "deny rule", resolved: "Explicit deny — all services", type: "Default rule" },
      { term: "exceptions", resolved: "None unless ticketed", type: "Governance" },
      { term: "audit logging", resolved: "SIEM-Deny-Profile", type: "Audit logging" },
    ],
    ruleReasoning:
      "Contractors cannot reach production workloads. Any exception needs a ticket and expires automatically.",
    complianceCheck: { label: "Golden config", detail: "Production deny rule matches baseline" },
    blastRadius: "56 contractors in scope · 0 production allows",
    riskDetail: "No bypass paths to production segment",
    contextLine: "Contractors → production blocked",
    mfaTitle: "Alert on deny attempts",
    mfaWhy: "Repeated production probes may signal credential misuse.",
    mfaTradeoff: "SIEM noise if contractors mis-type URLs.",
    driftRec: {
      rule: "Contractor-Prod-Exception",
      flag: "Legacy exception from 2024 — still open. Close it?",
    },
    approval: {
      authorName: "Jordan (Platform)",
      reviewSchedule: "Review every 30 days",
      justification: "Production isolation per golden configuration standard.",
    },
    lifecycleTimeline: [
      {
        stage: "Request captured",
        time: "10:20 AM",
        evidence: "Contractor deny intent linked to golden config",
      },
      {
        stage: "Rules drafted",
        time: "10:21 AM",
        evidence: "Explicit deny for Contractors → Production",
      },
      {
        stage: "Checks passed",
        time: "10:23 AM",
        evidence: "56 contractors · 0 surprise allows · baseline match",
      },
      {
        stage: "Approved",
        time: "10:25 AM",
        evidence: "Platform and security sign-off recorded",
      },
      {
        stage: "Live",
        time: "10:40 AM",
        evidence: "Deny rule live in 3 regions · 18 blocked attempts logged",
      },
    ],
  },
};

export function resolveLivingPreset(prompt: string): LivingScenarioPreset {
  const scenario = resolveScenario(prompt);
  return LIVING_PRESETS[scenario.id] ?? LIVING_PRESETS.ehr;
}

export const COPILOT_DASHBOARD_STATS = [
  { id: "active", label: "Active policies", value: "12", delta: "+2 this week" },
  { id: "pending", label: "Pending review", value: "3", delta: "1 due today" },
  { id: "drift", label: "Drift flagged", value: "1", delta: "LinkedIn_Access" },
  { id: "checks", label: "Checks passing", value: "98%", delta: "Last 24h" },
] as const;

export type DashboardStatId = (typeof COPILOT_DASHBOARD_STATS)[number]["id"];

export const COPILOT_ANALYTICS_METRICS = [
  { label: "Access events", value: "14.2k", sub: "Last 7 days" },
  { label: "Policy changes", value: "8", sub: "This month" },
  { label: "Mean time to approve", value: "4.2h", sub: "Rolling 30d" },
  { label: "Blocked attempts", value: "312", sub: "Production segment" },
] as const;

/** Scenario 2 — drift review with institutional memory (LinkedIn_Access). */
export const REVIEW_DRIFT_STORY = {
  rule: "LinkedIn_Access",
  request: "Review LinkedIn_Access — drift detected from golden intent",
  goldenIntent: "Marketing may reach LinkedIn during business hours with acceptable-use controls.",
  currentState: "Rule still allows 24/7 access · 0 sessions in 90 days · scope wider than approved",
  memory: {
    createdBy: "Alex (Marketing Ops)",
    createdAt: "Sept 2024",
    businessRequirement: "Marketing Leaders needed LinkedIn Ads during a product launch.",
    approvedBy: "IT Security · business exception",
    riskScore: "Low",
    compliance: "Acceptable use · web filtering",
    simulation: "Low impact — 3 users at creation. Tagged as acceptable use.",
  },
  driftDetail:
    "Access window widened without re-approval. No traffic in 90 days — likely safe to retire.",
} as const;

/** Scenario 3 — document a legacy rule with missing institutional memory. */
export const LEGACY_DOCUMENT_STORY = {
  rule: "FIN-SQL-Legacy-Allow",
  request: "Document legacy FIN-SQL rule — no justification on file",
  problem:
    "Created March 2021. No business justification, owner, or review schedule. Original author left the organisation.",
  risk: "Moderate — broad allow to finance SQL tier",
  captureFields: [
    { id: "justification", label: "Business justification", example: "Quarterly financial close — read-only analyst access" },
    { id: "owner", label: "Rule owner", example: "Priya (GRC)" },
    { id: "review", label: "Review cadence", example: "Every 60 days" },
  ],
} as const;

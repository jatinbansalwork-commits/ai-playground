import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export interface ScopeCheckSummary {
  accessScope: string;
  controlAlignment: string;
  logging: string;
}

export interface ComplianceSummary {
  bullets: string[];
  auditNote?: string;
}

export interface ReasoningEvidence {
  whyProposed: string[];
  sources: { label: string; detail: string }[];
  confidence: number;
}

export interface RuleConstructionRow {
  component: string;
  status: "Applied" | "Pending" | "Warning";
  details: string;
}

export interface LearningPillDef {
  id: string;
  text: string;
  reply: string;
}

const EVIDENCE: Record<string, {
  scope: ScopeCheckSummary;
  compliance: ComplianceSummary;
  reasoning: ReasoningEvidence;
  construction: RuleConstructionRow[];
  learningPills: LearningPillDef[];
}> = {
  ehr: {
    scope: {
      accessScope: "Doctors to EHR from hospital-managed devices only",
      controlAlignment: "Allow rule scoped to Doctors-AD-Group · deny nurses and all others",
      logging: "SIEM audit profile attached to every attempt",
    },
    compliance: {
      bullets: [
        "No HIPAA access-control violations detected",
        "Consistent with least-privilege patterns for ePHI",
        "Role separation between doctors and nurses enforced",
      ],
      auditNote: "Audit readiness complete when logging is enabled",
    },
    reasoning: {
      whyProposed: [
        "Business rules align with HIPAA access-control requirements",
        "Doctors-AD-Group is verified as the authorised clinical group in Active Directory",
        "EHR-Application-Object is classified as Tier-1 protected in the CMDB",
        "Managed-Hospital-Endpoints ensures access only from hospital-controlled devices",
      ],
      sources: [
        { label: "Internal guidelines", detail: "Cisco Secure Policy Framework v4.2 · Section 2.1 Medical Data Access" },
        { label: "Compliance", detail: "HIPAA Technical Safeguards — Access Control, Audit Control" },
        { label: "Audit log", detail: "Response ID 45912A · Ticket Ref: SEC-54312" },
        { label: "Policy comparison", detail: "3 existing rules reviewed · no conflicts detected" },
      ],
      confidence: 92,
    },
    construction: [
      { component: "Identity mapping", status: "Applied", details: "Doctors-AD-Group → LDAP" },
      { component: "Application object", status: "Applied", details: "EHR-Application-Object" },
      { component: "Device zone", status: "Applied", details: "Managed-Hospital-Endpoints" },
      { component: "Audit logging", status: "Applied", details: "SIEM-Audit-Profile" },
    ],
    learningPills: [
      { id: "log-level", text: "What logging level is appropriate for ePHI?", reply: "Full session logging is recommended for HIPAA audit control — your SIEM profile already matches clinical patterns." },
      { id: "nurse-exception", text: "Can nurses get a separate workflow?", reply: "Yes — nurses typically use a different clinical application. A separate ticket would scope that path without widening this rule." },
    ],
  },
  "finance-sap": {
    scope: {
      accessScope: "Finance users to SAP and SQL from corporate workstations",
      controlAlignment: "Zone isolation to FIN-App-Segment · contractors denied",
      logging: "Transaction logging enabled for SOX evidence",
    },
    compliance: {
      bullets: [
        "SOX financial controls satisfied",
        "Segmentation verified between corp and finance zones",
        "No cross-zone privilege escalation paths",
      ],
      auditNote: "MFA recommended before deploy for SOX step-up auth",
    },
    reasoning: {
      whyProposed: [
        "Aligns with SOX access-control and segregation-of-duties requirements",
        "Finance-Users group verified in Active Directory",
        "SAP-ERP and FIN-SQL scoped to FIN-App-Segment only",
      ],
      sources: [
        { label: "Internal guidelines", detail: "Financial Systems Access Standard v3.1" },
        { label: "Compliance", detail: "SOX IT General Controls — Access Management" },
        { label: "Policy comparison", detail: "2 overlapping rules consolidated" },
      ],
      confidence: 88,
    },
    construction: [
      { component: "Zone segmentation", status: "Applied", details: "Corp-Workstations → FIN-App-Segment" },
      { component: "SAP application", status: "Applied", details: "SAP-ERP-Application" },
      { component: "SQL database", status: "Applied", details: "FIN-SQL-Server" },
      { component: "Transaction logs", status: "Applied", details: "SOX-Audit-Profile" },
    ],
    learningPills: [
      { id: "sox-mfa", text: "Why is MFA required for finance?", reply: "SOX expects step-up authentication for financial systems — 9 similar policies in your environment use MFA." },
      { id: "contractor", text: "How do contractors get access?", reply: "Ticketed exception with expiry — never added to the standing Finance-Users allow." },
    ],
  },
  marketing: {
    scope: {
      accessScope: "Marketing to LinkedIn during business hours from corporate devices",
      controlAlignment: "Time window Mon–Fri 09:00–18:00 · personal accounts blocked",
      logging: "Web filtering logs enabled · upload scan on egress",
    },
    compliance: {
      bullets: [
        "Acceptable-use policy alignment verified",
        "No shadow IT conflicts detected",
        "Time window matches approved business exception",
      ],
    },
    reasoning: {
      whyProposed: [
        "Matches approved marketing outreach exception from Sept 2024",
        "LinkedIn-SaaS-App classified under Internet-SaaS destination",
        "Schedule enforces off-hours block without manual intervention",
      ],
      sources: [
        { label: "Business exception", detail: "Marketing outreach tools · approved Sept 2024" },
        { label: "Compliance", detail: "Acceptable use · web filtering" },
      ],
      confidence: 85,
    },
    construction: [
      { component: "SaaS application", status: "Applied", details: "LinkedIn-SaaS-App" },
      { component: "Time schedule", status: "Applied", details: "Mon–Fri 09:00–18:00" },
      { component: "Upload scan", status: "Applied", details: "DLP egress profile" },
    ],
    learningPills: [
      { id: "off-hours", text: "What happens outside business hours?", reply: "Access is denied automatically — no manual rule change needed." },
      { id: "personal", text: "Why block personal accounts?", reply: "Corporate identity only — reduces credential sprawl and data-exfil risk." },
    ],
  },
  contractors: {
    scope: {
      accessScope: "Contractors blocked from all production workloads",
      controlAlignment: "Explicit deny — golden configuration baseline",
      logging: "SIEM deny profile logs every blocked attempt",
    },
    compliance: {
      bullets: [
        "Matches golden configuration standard",
        "No bypass paths to production segment",
        "56 contractors in scope · 0 surprise allows",
      ],
    },
    reasoning: {
      whyProposed: [
        "Production isolation per platform golden configuration",
        "Contractors-AD-Group verified — no standing production exceptions",
        "Explicit deny clearer for auditors than implicit deny",
      ],
      sources: [
        { label: "Golden config", detail: "Production deny baseline v2.4" },
        { label: "Policy comparison", detail: "1 legacy exception flagged for retirement" },
      ],
      confidence: 94,
    },
    construction: [
      { component: "Identity", status: "Applied", details: "Contractors-AD-Group" },
      { component: "Production deny", status: "Applied", details: "Production-Segment · all services" },
      { component: "Deny logging", status: "Applied", details: "SIEM-Deny-Profile" },
    ],
    learningPills: [
      { id: "exception", text: "How do contractors get temporary access?", reply: "Time-boxed ticket with auto-expiry — never a standing allow to production." },
      { id: "alert", text: "Should we alert on deny attempts?", reply: "Repeated probes may signal misuse — 31 similar deny policies enable SIEM alerts." },
    ],
  },
  "vendor-vpn": {
    scope: {
      accessScope: "Approved vendor via VPN to staging sandbox only",
      controlAlignment: "30-day expiry · production and internal apps denied",
      logging: "Vendor SIEM profile attached",
    },
    compliance: {
      bullets: [
        "ISO 27001 vendor risk controls satisfied",
        "Sandbox isolation verified — no production paths",
        "Auto-expiry armed for 30 days",
      ],
    },
    reasoning: {
      whyProposed: [
        "Vendor-Contractors scoped to staging integration work only",
        "VPN-Gateway path verified — no lateral movement to production",
        "Time-boxed access reduces standing vendor risk",
      ],
      sources: [
        { label: "Vendor ticket", detail: "Integration work · expiry 30 days" },
        { label: "Compliance", detail: "ISO 27001 · vendor access management" },
      ],
      confidence: 90,
    },
    construction: [
      { component: "VPN gateway", status: "Applied", details: "VPN-Gateway" },
      { component: "Staging sandbox", status: "Applied", details: "Staging-Sandbox-VLAN" },
      { component: "Expiry", status: "Applied", details: "30-day auto-expire" },
    ],
    learningPills: [
      { id: "extend", text: "Can we extend vendor access?", reply: "New ticket required — extensions never modify the standing rule." },
      { id: "prod", text: "Why is production blocked?", reply: "Vendor integrations belong in staging — production requires a separate security review." },
    ],
  },
};

export function resolveAgenticEvidence(preset: LivingScenarioPreset) {
  return EVIDENCE[preset.id] ?? EVIDENCE.ehr;
}

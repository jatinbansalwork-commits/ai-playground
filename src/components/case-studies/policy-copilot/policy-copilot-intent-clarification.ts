import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export interface ClarifyOption {
  id: string;
  label: string;
  reply: string;
  insight?: string;
}

export interface UnderstandingField {
  label: string;
  value: string;
  /** high = explicit in request; inferred = copilot filled a gap */
  certainty?: "explicit" | "inferred";
}

export interface UnderstandingUncertainty {
  id: string;
  question: string;
  detail: string;
}

export interface UnderstandingReflection {
  lead: string;
  users: UnderstandingField[];
  application: UnderstandingField;
  devices: UnderstandingField;
  assumptions: string[];
  uncertainties: UnderstandingUncertainty[];
  confirmPrompt: string;
}

export interface IntentClarificationConfig {
  intentSummary: string;
  understandingReflection?: UnderstandingReflection;
  whatIfPrompt: string;
  whatIfOptions: ClarifyOption[];
  clarifyQuestion: string;
  clarifyChips: ClarifyOption[];
  relatedRoles: { id: string; label: string; hint: string }[];
  riskInsight: {
    body: string;
    actions: ClarifyOption[];
  };
  interpretationScope: {
    body: string;
    learnMore: string;
  };
  scenarioPreviews: { id: string; title: string; outcome: string }[];
}

const CLARIFICATION_BY_SCENARIO: Record<string, IntentClarificationConfig> = {
  ehr: {
    intentSummary:
      "Allow authenticated doctors to securely access Electronic Health Records from hospital-managed devices.",
    understandingReflection: {
      lead: "Before I generate a draft, here is how I understood your request. Nothing is written to policy until you confirm.",
      users: [
        { label: "Users", value: "Doctors (Doctors-AD-Group)", certainty: "explicit" },
        { label: "Not in scope unless you add them", value: "Nurses, locum, contractors, all others", certainty: "inferred" },
      ],
      application: {
        label: "Application",
        value: "Electronic Health Records (EHR-Application-Object)",
        certainty: "explicit",
      },
      devices: {
        label: "Devices",
        value: "Hospital-managed endpoints only (Managed-Hospital-Endpoints)",
        certainty: "explicit",
      },
      assumptions: [
        "Secure access implies authentication — MFA recommended for clinical paths",
        "Healthcare / ePHI data classification applies",
        "Everyone you did not name is denied by default",
        "Full audit logging on allow and deny paths",
      ],
      uncertainties: [
        {
          id: "remote",
          question: "Should doctors reach the EHR remotely, or on-site managed devices only?",
          detail: "Your request mentions hospital-managed devices but not VPN or remote clinical access.",
        },
        {
          id: "locum",
          question: "Should locum or visiting clinicians be included with doctors?",
          detail: "Only doctors were named — locum groups are a common gap in hospital policies.",
        },
        {
          id: "nurses",
          question: "Should nurses have any access — for example read-only break-glass?",
          detail: "Night-shift handoffs sometimes need nurse visibility without full write access.",
        },
      ],
      confirmPrompt: "If this matches your intent, confirm and I'll map objects and prepare a draft for review — not deploy.",
    },
    whatIfPrompt:
      "A few areas are still ambiguous. You can clarify below, or confirm as stated to move on.",
    whatIfOptions: [
      {
        id: "nurses-readonly",
        label: "Allow nurses read-only",
        reply: "Break-glass read-only path added for Nurses-AD-Group — audited separately.",
        insight: "Common in hospitals for on-call coverage without full clinical write access.",
      },
      {
        id: "locum",
        label: "Include locum doctors",
        reply: "Locum-Doctors group added to the allow path with the same MFA requirement.",
      },
      {
        id: "keep-block",
        label: "Keep full block for nurses",
        reply: "No changes — deny list stays as you stated.",
      },
    ],
    clarifyQuestion:
      "Does this understanding look right? Confirm before I generate a draft.",
    clarifyChips: [
      {
        id: "on-site-only",
        label: "On-site devices only",
        reply: "Source restricted to on-premise managed endpoints — no remote VPN path.",
      },
      {
        id: "include-locum",
        label: "Include locum doctors",
        reply: "Locum and visiting clinicians added to the allow path with the same controls.",
      },
      {
        id: "nurses-readonly",
        label: "Nurses read-only break-glass",
        reply: "Break-glass read-only path for nurses — separately audited.",
        insight: "Common in hospitals for on-call coverage without full clinical write access.",
      },
    ],
    relatedRoles: [
      { id: "locum", label: "Locum doctors", hint: "Often need same-day EHR access" },
      { id: "nurses", label: "Nurses (read-only)", hint: "Break-glass in similar policies" },
      { id: "it-admin", label: "IT admins", hint: "Usually excluded from clinical paths" },
    ],
    riskInsight: {
      body: "On-call nurses may need visibility into patient status during handoffs. A full block could slow night-shift workflows unless break-glass is defined.",
      actions: [
        {
          id: "adjust-nurses",
          label: "Adjust access for nurses",
          reply: "Read-only break-glass path documented — still logged for HIPAA.",
        },
        {
          id: "risk-continue",
          label: "Continue without changes",
          reply: "Keeping your original deny scope.",
        },
      ],
    },
    interpretationScope: {
      body: "I will not create rules until you confirm this understanding and review a draft. Each stage — interpretation, mapping, checks — is designed to reduce uncertainty before the next decision.",
      learnMore:
        "Entity resolution maps LDAP groups, application objects, and device posture from inventory. Validation runs only after you approve the draft direction.",
    },
    scenarioPreviews: [
      { id: "s1", title: "Doctors only", outcome: "Doctors allowed · nurses blocked · all attempts logged." },
      { id: "s2", title: "Doctors + nurse read-only", outcome: "Doctors full access · nurses read-only break-glass · others blocked." },
      { id: "s3", title: "Strict deny", outcome: "Doctors allowed · all other clinical roles blocked with no exceptions." },
    ],
  },
  "finance-sap": {
    intentSummary: "Finance users need access to SAP from corporate-managed workstations.",
    whatIfPrompt:
      "You're opening SAP for Finance. Should finance contractors use the same path, or FTE only?",
    whatIfOptions: [
      {
        id: "fte-only",
        label: "FTE only",
        reply: "Contractors excluded — Finance-Users FTE group only.",
      },
      {
        id: "include-contractors",
        label: "Include contractors",
        reply: "Finance-Contractors group added with read-only SAP modules.",
        insight: "SOX may require separate approval for contractor financial access.",
      },
      {
        id: "read-only",
        label: "Read-only for analysts",
        reply: "Transaction write modules removed — reporting access only.",
      },
    ],
    clarifyQuestion:
      "Quick check — should SQL Server access follow the same Finance group, or SAP only?",
    clarifyChips: [
      { id: "sap-only", label: "SAP only", reply: "SQL Server left unchanged." },
      { id: "sap-and-sql", label: "SAP and SQL", reply: "Both paths scoped to Finance-App-Segment." },
      { id: "hq-only", label: "HQ subnet only", reply: "Source tightened to HQ-Workstations." },
    ],
    relatedRoles: [
      { id: "contractors", label: "Finance contractors", hint: "Often reviewed separately under SOX" },
      { id: "auditors", label: "External auditors", hint: "Time-boxed access in similar policies" },
      { id: "controllers", label: "Controllers", hint: "May need broader SAP modules" },
    ],
    riskInsight: {
      body: "Quarter-end close may need controllers to reach reporting tools outside standard SAP hours. Blocking all off-hours access could delay financial sign-off.",
      actions: [
        { id: "adjust-hours", label: "Allow extended hours for controllers", reply: "Time window extended for Controllers group during close week." },
        { id: "risk-continue", label: "Continue without changes", reply: "Keeping standard business-hours access." },
      ],
    },
    interpretationScope: {
      body: "I'll use only what you explicitly mentioned. I won't assume extra roles, apps, or conditions unless you approve them.",
      learnMore:
        "Finance paths are tagged for SOX evidence collection. Segmentation is validated before any allow rule is proposed.",
    },
    scenarioPreviews: [
      { id: "s1", title: "Finance FTE → SAP", outcome: "38 users · managed devices · transaction logs on." },
      { id: "s2", title: "FTE + contractors read-only", outcome: "Broader group · module-scoped · extra audit tags." },
      { id: "s3", title: "SAP + SQL together", outcome: "Finance segment reach to ERP and database tier." },
    ],
  },
  marketing: {
    intentSummary: "Marketing can reach LinkedIn during business hours with acceptable-use controls.",
    whatIfPrompt:
      "You're allowing Marketing to reach LinkedIn during business hours. Would you like to keep access open for leadership or adjacent teams?",
    whatIfOptions: [
      { id: "marketing-only", label: "Marketing only", reply: "Scope stays on Marketing-Users." },
      {
        id: "marketing-leads",
        label: "Allow Marketing Leads",
        reply: "Marketing-Leaders group added with the same time window.",
      },
      {
        id: "design-view",
        label: "Allow Design Team (view-only)",
        reply: "Design-Users added — uploads blocked, view-only SaaS profile.",
      },
    ],
    clarifyQuestion:
      "Quick check — business hours only, or extended hours for campaign launches?",
    clarifyChips: [
      { id: "biz-hours", label: "Business hours", reply: "Mon–Fri 09:00–18:00 applied." },
      { id: "extended", label: "Extended with logging", reply: "Extended to 21:00 with extra SIEM alerts." },
      { id: "block-upload", label: "Block uploads", reply: "File uploads to LinkedIn blocked." },
    ],
    relatedRoles: [
      { id: "design", label: "Design", hint: "Often needs view-only for creative review" },
      { id: "sales", label: "Sales leaders", hint: "Sometimes overlap with social outreach" },
      { id: "vendors", label: "Agency partners", hint: "Usually excluded from corp SaaS allow" },
    ],
    riskInsight: {
      body: "Marketing leads may still need visibility into campaign performance tools that use LinkedIn APIs. Blocking all access could affect reporting dashboards.",
      actions: [
        { id: "adjust-leads", label: "Adjust access for Marketing Leads", reply: "Leadership group added with API-friendly SaaS profile." },
        { id: "risk-continue", label: "Continue without changes", reply: "Keeping Marketing-only scope." },
      ],
    },
    interpretationScope: {
      body: "I'll use only what you explicitly mentioned. I won't assume extra roles, apps, or conditions unless you approve them.",
      learnMore:
        "Web access rules use application identification, not just URLs. Time schedules are enforced at the firewall.",
    },
    scenarioPreviews: [
      { id: "s1", title: "Marketing · business hours", outcome: "22 users · Mon–Fri window · uploads scanned." },
      { id: "s2", title: "Marketing + Design view-only", outcome: "Broader group · no uploads · same hours." },
      { id: "s3", title: "Strict marketing only", outcome: "Original scope · no adjacent teams." },
    ],
  },
  contractors: {
    intentSummary: "Contractors are blocked from production. Everyone else unchanged.",
    whatIfPrompt:
      "You're blocking contractor access to production. Would you like to keep access open for other roles?",
    whatIfOptions: [
      {
        id: "marketing-leads",
        label: "Allow Marketing Leads",
        reply: "Marketing-Leaders excluded from the contractor deny — production path unchanged for them.",
      },
      {
        id: "design-view",
        label: "Allow Design Team (view-only)",
        reply: "Design-Users get view-only staging access — production still blocked.",
      },
      {
        id: "contractors-only",
        label: "Keep policy limited to contractors",
        reply: "Deny scope unchanged — contractors only.",
      },
    ],
    clarifyQuestion:
      "Quick check before I proceed — should this restriction apply only to contractors, or also to temporary staff?",
    clarifyChips: [
      { id: "contractors-only", label: "Contractors only", reply: "Temp staff excluded from this deny rule." },
      { id: "temp-staff", label: "Include temporary staff", reply: "Temp-Staff group added to deny path." },
      { id: "vendors-too", label: "Include external vendors", reply: "Vendor-Contractors included in deny scope." },
    ],
    relatedRoles: [
      { id: "design", label: "Design", hint: "In similar policies, teams review staging access" },
      { id: "qa", label: "QA", hint: "Often needs pre-prod, not production" },
      { id: "vendors", label: "External vendors", hint: "Frequently time-boxed exceptions" },
    ],
    riskInsight: {
      body: "QA teams sometimes need short production read access during incident response. A broad contractor deny is safe — but confirm staging paths stay open.",
      actions: [
        { id: "staging-ok", label: "Confirm staging stays open", reply: "Staging-Sandbox explicitly allowed for QA and Design." },
        { id: "risk-continue", label: "Continue without changes", reply: "Production deny only — no staging changes." },
      ],
    },
    interpretationScope: {
      body: "I'll use only what you explicitly mentioned. I won't assume extra roles, apps, or conditions unless you approve them.",
      learnMore:
        "Deny rules are evaluated before allow rules. Golden configuration baseline is checked automatically.",
    },
    scenarioPreviews: [
      { id: "s1", title: "Contractors blocked", outcome: "56 contractors · 0 production paths · audit on." },
      { id: "s2", title: "Contractors + temp staff", outcome: "Broader deny group · same production scope." },
      { id: "s3", title: "Deny + staging allow", outcome: "Production blocked · staging open for QA/Design." },
    ],
  },
  "vendor-vpn": {
    intentSummary: "External vendor reaches staging only via VPN for 30 days.",
    whatIfPrompt:
      "You're granting vendor VPN to staging. Should partner agencies share the same window, or this vendor only?",
    whatIfOptions: [
      { id: "single-vendor", label: "This vendor only", reply: "Single vendor account scope." },
      { id: "extend-60", label: "Extend to 60 days", reply: "Expiry extended — ticket reference required." },
      { id: "mfa-required", label: "Require MFA first", reply: "MFA enrollment added before VPN connects." },
    ],
    clarifyQuestion: "Should production remain fully blocked for this vendor group?",
    clarifyChips: [
      { id: "staging-only", label: "Staging only", reply: "Production deny unchanged." },
      { id: "read-prod", label: "Read-only prod metrics", reply: "Metrics endpoint only — no workload access." },
    ],
    relatedRoles: [
      { id: "partner", label: "Partner agencies", hint: "Often need separate VPN pools" },
      { id: "internal-sponsor", label: "Internal sponsors", hint: "Accountable for vendor access" },
    ],
    riskInsight: {
      body: "Vendors sometimes request broader access mid-engagement. Keeping staging-only avoids production exposure — expiry will auto-revoke either way.",
      actions: [
        { id: "tighten-expiry", label: "Shorten to 14 days", reply: "Expiry tightened — sponsor notified." },
        { id: "risk-continue", label: "Continue without changes", reply: "Keeping 30-day staging window." },
      ],
    },
    interpretationScope: {
      body: "I'll use only what you explicitly mentioned. I won't assume extra roles, apps, or conditions unless you approve them.",
      learnMore: "Vendor VPN rules include automatic expiry and sandbox isolation checks.",
    },
    scenarioPreviews: [
      { id: "s1", title: "30-day staging VPN", outcome: "4 accounts · staging only · auto-expire." },
      { id: "s2", title: "MFA + staging", outcome: "Step-up auth · same sandbox scope." },
      { id: "s3", title: "Strict single vendor", outcome: "One vendor pool · no partner sharing." },
    ],
  },
};

function buildDefaultReflection(
  preset: LivingScenarioPreset,
  intentSummary: string,
  clarifyQuestion: string,
): UnderstandingReflection {
  const userMappings = preset.entityMappings.filter((m) =>
    m.type.toLowerCase().includes("identity"),
  );
  const appMapping = preset.entityMappings.find(
    (m) =>
      m.type.toLowerCase().includes("application") ||
      m.type.toLowerCase().includes("saas"),
  );
  const deviceMapping = preset.entityMappings.find(
    (m) =>
      m.type.toLowerCase().includes("source") ||
      m.term.toLowerCase().includes("device") ||
      m.term.toLowerCase().includes("workstation"),
  );

  return {
    lead: "Before I generate a draft, here is how I understood your request. Nothing is written to policy until you confirm.",
    users:
      userMappings.length > 0
        ? userMappings.map((m) => ({
            label: m.term,
            value: m.resolved,
            certainty: "explicit" as const,
          }))
        : [{ label: "Users", value: preset.contextLine, certainty: "explicit" as const }],
    application: {
      label: "Application",
      value: appMapping?.resolved ?? "Resolved from intent",
      certainty: "explicit",
    },
    devices: {
      label: "Devices / source",
      value: deviceMapping?.resolved ?? "Not specified — will confirm with you",
      certainty: deviceMapping ? "explicit" : "inferred",
    },
    assumptions: [
      "Scope limited to what you described",
      "Authentication and logging per organisational baseline",
      "Everyone not named is denied by default unless you add them",
    ],
    uncertainties: [
      {
        id: "scope-confirm",
        question: clarifyQuestion,
        detail: "I need your confirmation before mapping objects and preparing a draft.",
      },
    ],
    confirmPrompt:
      "If this matches your intent, confirm and I will map objects and prepare a draft for review — not deploy.",
  };
}

export type ResolvedIntentClarification = IntentClarificationConfig & {
  understandingReflection: UnderstandingReflection;
};

export function resolveIntentClarification(preset: LivingScenarioPreset): ResolvedIntentClarification {
  const config = CLARIFICATION_BY_SCENARIO[preset.id] ?? CLARIFICATION_BY_SCENARIO.ehr;
  return {
    ...config,
    understandingReflection:
      config.understandingReflection ??
      buildDefaultReflection(preset, config.intentSummary, config.clarifyQuestion),
  };
}

import type { IntentClarificationConfig } from "@/components/case-studies/policy-copilot/policy-copilot-intent-clarification";
import type { LivingPhase } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import type { LivingScenarioPreset } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export type ThreadSuggestionAction =
  | "runChecks"
  | "approve"
  | "applyMfa"
  | "build"
  | "capture"
  | "retire"
  | "proceed";

export interface ThreadSuggestionDef {
  id: string;
  text: string;
  primary?: boolean;
  reply: string;
  insight?: string;
  consequence?: string;
  action?: ThreadSuggestionAction;
}

type SuggestionBuilder = (preset: LivingScenarioPreset) => ThreadSuggestionDef[];

function enrichSuggestions(items: ThreadSuggestionDef[]): ThreadSuggestionDef[] {
  return items.map((s) => {
    if (s.consequence) return s;
    if (s.action === "runChecks") {
      return { ...s, consequence: "Runs validation — nothing deploys until you approve" };
    }
    if (s.action === "approve" || s.action === "build") {
      return { ...s, consequence: "Moves toward deploy — you confirm scope on the next step" };
    }
    if (s.action === "applyMfa") {
      return { ...s, consequence: s.insight ?? "Adds MFA requirement to draft rules" };
    }
    if (s.action === "proceed") {
      return { ...s, consequence: "Maps objects and opens draft — still no production deploy" };
    }
    if (s.insight) return { ...s, consequence: s.insight };
    return { ...s, consequence: "Refines draft — production unchanged" };
  });
}

const DRAFT_SUGGESTIONS: Record<string, SuggestionBuilder> = {
  ehr: (preset) => [
    {
      id: "run-checks",
      text: "Run HIPAA safety checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and conflict checks now.`,
      action: "runChecks",
    },
    {
      id: "managed-devices",
      text: "Hospital-managed devices only",
      reply: "Source tightened to Managed-Hospital-Endpoints — no personal or unmanaged devices.",
      insight: "Narrows ePHI exposure if credentials leak off-network.",
    },
    {
      id: "who-affected",
      text: "Who loses access?",
      reply: preset.blastRadius,
      insight: "Nurses and all others stay blocked unless you add a break-glass path.",
    },
    {
      id: "add-mfa",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ],
  "finance-sap": (preset) => [
    {
      id: "run-checks",
      text: "Run SOX safety checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and conflict checks now.`,
      action: "runChecks",
    },
    {
      id: "fte-only",
      text: "FTE finance only",
      reply: "Finance-Contractors excluded — FTE group scoped to SAP and SQL paths.",
      insight: "SOX typically requires separate approval for contractor financial access.",
    },
    {
      id: "sap-and-sql",
      text: "Scope SAP and SQL together",
      reply: "Both SAP-ERP and FIN-SQL-Server paths locked to FIN-App-Segment.",
    },
    {
      id: "add-mfa",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ],
  marketing: (preset) => [
    {
      id: "run-checks",
      text: "Run acceptable-use checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and shadow-IT checks now.`,
      action: "runChecks",
    },
    {
      id: "business-hours",
      text: "Enforce business hours",
      reply: "Mon–Fri 09:00–18:00 schedule applied — off-hours LinkedIn blocked.",
      insight: "Matches the 24 similar SaaS business-hour paths in your environment.",
    },
    {
      id: "block-personal",
      text: "Block personal accounts",
      reply: "Corporate identity only — personal LinkedIn logins denied on egress.",
    },
    {
      id: "add-mfa",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ],
  tiktok: (preset) => [
    {
      id: "run-checks",
      text: "Run acceptable-use checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and FTE-impact checks now.`,
      action: "runChecks",
    },
    {
      id: "business-hours",
      text: "Keep business-hours deny",
      reply: "Mon–Fri 09:00–18:00 deny applied — after-hours TikTok stays open for interns.",
      insight: "Matches 11 similar intern SaaS productivity denies.",
    },
    {
      id: "always-block",
      text: "Block TikTok at all times",
      reply: "Deny extended to 24/7 for Intern-Accounts → TikTok.",
    },
    {
      id: "add-alert",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ],
  contractors: (preset) => [
    {
      id: "run-checks",
      text: "Run production isolation checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and golden-config checks now.`,
      action: "runChecks",
    },
    {
      id: "alert-deny",
      text: "Alert on deny attempts",
      reply: "SIEM alert armed for repeated Contractors → Production probes.",
      insight: "Seen in 31 similar production deny policies — flags credential misuse early.",
    },
    {
      id: "who-affected",
      text: "Who is blocked?",
      reply: preset.blastRadius,
    },
    {
      id: "retire-exception",
      text: "Retire legacy exception",
      reply: "Contractor-Prod-Exception marked for removal — ticket required for any future access.",
      insight: "Golden configuration — contractors never reach production without time-boxed approval.",
    },
  ],
  "vendor-vpn": (preset) => [
    {
      id: "run-checks",
      text: "Run vendor risk checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and sandbox isolation checks now.`,
      action: "runChecks",
    },
    {
      id: "staging-only",
      text: "Staging sandbox only",
      reply: "Vendor path limited to Staging-Sandbox-VLAN — production and internal apps unreachable.",
    },
    {
      id: "auto-expiry",
      text: "Confirm 30-day expiry",
      reply: "VPN access auto-expires in 30 days — renewal requires a new ticket.",
      insight: "Matches 14 similar time-boxed vendor VPN paths in your environment.",
    },
    {
      id: "add-mfa",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ],
};

const SENSE_SUGGESTIONS: Record<string, SuggestionBuilder> = {
  ehr: () => [
    {
      id: "confirm-deny",
      text: "Tighten nurse deny list",
      reply: "Explicit deny for Nurses-AD-Group added — clearer for HIPAA auditors than implicit deny.",
      insight: "Role separation between doctors and nurses enforced.",
    },
    {
      id: "audit-all",
      text: "Log every EHR attempt",
      reply: "SIEM-Audit-Profile attached to allow and deny paths for ePHI.",
    },
  ],
  "finance-sap": () => [
    {
      id: "confirm-deny",
      text: "Deny contractors explicitly",
      reply: "Contractors-AD-Group blocked from FIN-App-Segment — SOX evidence trail intact.",
      insight: "Explicit deny is clearer for auditors than implicit deny.",
    },
    {
      id: "audit-all",
      text: "Enable transaction logging",
      reply: "SOX transaction logging profile attached to SAP and SQL paths.",
    },
  ],
  marketing: () => [
    {
      id: "confirm-deny",
      text: "Block personal LinkedIn",
      reply: "Personal account sign-ins denied — corporate Marketing-Users identity only.",
    },
    {
      id: "audit-all",
      text: "Scan uploads on egress",
      reply: "DLP upload scan enabled for LinkedIn-SaaS-App traffic.",
    },
  ],
  tiktok: () => [
    {
      id: "confirm-deny",
      text: "Confirm intern-only scope",
      reply: "Deny limited to Intern-Accounts — FTE social paths stay open.",
    },
    {
      id: "audit-all",
      text: "Log every deny attempt",
      reply: "URL filter + SIEM tags armed on Intern-Accounts → TikTok denies.",
    },
  ],
  contractors: () => [
    {
      id: "confirm-deny",
      text: "Deny all production paths",
      reply: "Contractors-AD-Group blocked from Production-Segment — golden config match.",
    },
    {
      id: "audit-all",
      text: "Log every deny attempt",
      reply: "SIEM deny profile attached — repeated probes will alert.",
    },
  ],
  "vendor-vpn": () => [
    {
      id: "confirm-deny",
      text: "Deny production lateral movement",
      reply: "Vendor-Contractors blocked from Production and internal apps — staging only.",
    },
    {
      id: "audit-all",
      text: "Log vendor sessions",
      reply: "Vendor SIEM profile attached to VPN-Gateway sessions.",
    },
  ],
};

function fallbackDraftSuggestions(preset: LivingScenarioPreset): ThreadSuggestionDef[] {
  return [
    {
      id: "run-checks",
      text: "Run safety checks",
      primary: true,
      reply: `On it — running ${preset.complianceCheck.label.toLowerCase()}, impact, and conflict checks now.`,
      action: "runChecks",
    },
    {
      id: "who-affected",
      text: "Who is affected?",
      reply: preset.blastRadius,
    },
    {
      id: "add-mfa",
      text: preset.mfaTitle,
      reply: `${preset.mfaTitle} — ${preset.mfaWhy}`,
      insight: preset.mfaTradeoff,
      action: "applyMfa",
    },
  ];
}

function clarifySuggestions(
  clarification: IntentClarificationConfig,
  usedIds: Set<string>,
): ThreadSuggestionDef[] {
  return [
    {
      id: "confirm-understanding",
      text: "Yes — looks right",
      primary: true,
      reply:
        "Understanding confirmed. I'll map objects and prepare a draft for your review — nothing deploys yet.",
      consequence: "Maps objects and opens draft — still no production deploy",
      action: "proceed" as const,
    },
    ...clarification.clarifyChips.map((o) => ({
      id: o.id,
      text: o.label,
      reply: o.reply,
      insight: o.insight,
      consequence: o.insight ?? o.reply,
    })),
    ...clarification.whatIfOptions.map((o) => ({
      id: o.id,
      text: o.label,
      reply: o.reply,
      insight: o.insight,
      consequence: o.insight ?? o.reply,
    })),
  ].filter((s) => !usedIds.has(s.id));
}

export function resolveScenarioThreadSuggestions({
  preset,
  clarification,
  phase,
  usedIds,
  mappingDone,
}: {
  preset: LivingScenarioPreset;
  clarification: IntentClarificationConfig;
  phase: LivingPhase;
  usedIds: Set<string>;
  mappingDone: boolean;
}): ThreadSuggestionDef[] {
  if (phase === "invite" || phase === "understand") return [];

  if (phase === "clarify") {
    return enrichSuggestions(clarifySuggestions(clarification, usedIds));
  }

  if (phase === "sense" && mappingDone) {
    const build = SENSE_SUGGESTIONS[preset.id];
    return enrichSuggestions((build ? build(preset) : []).filter((s) => !usedIds.has(s.id)));
  }

  if (phase === "draft") {
    const build = DRAFT_SUGGESTIONS[preset.id] ?? fallbackDraftSuggestions;
    return enrichSuggestions(build(preset).filter((s) => !usedIds.has(s.id)));
  }

  if (phase === "check") {
    return enrichSuggestions(
      [
        {
          id: "explain-checks",
          text: `Explain ${preset.complianceCheck.label.toLowerCase()}`,
          reply: `${preset.complianceCheck.label} passes · ${preset.riskDetail.toLowerCase()} · no conflicting allow rules found.`,
          consequence: "Explains validation — deploy still requires your approval",
        },
        {
          id: "preview-impact",
          text: "Preview impact",
          reply: preset.blastRadius,
          insight: preset.contextLine,
          consequence: preset.blastRadius,
        },
      ].filter((s) => !usedIds.has(s.id)),
    );
  }

  if (phase === "refine") {
    const driftRule = preset.driftRec?.rule ?? "unused rule";
    const driftFlag = preset.driftRec?.flag ?? "Flagged for review.";
    return enrichSuggestions(
      [
        {
          id: "ready-approve",
          text: "Ready to approve",
          primary: true,
          reply: `${preset.contextLine} — approve when the scope and compliance summary look right.`,
          action: "approve" as const,
        },
        ...(preset.driftRec
          ? [
              {
                id: "review-drift",
                text: `Review ${driftRule}`,
                reply: `${driftRule}: ${driftFlag}`,
                insight: "Optional cleanup — does not block deploy.",
              },
            ]
          : []),
      ].filter((s) => !usedIds.has(s.id)) as ThreadSuggestionDef[],
    );
  }

  if (phase === "approve") {
    return enrichSuggestions(
      [
        {
          id: "build-policy",
          text: "Build secure policy",
          primary: true,
          reply: `Shipping ${preset.contextLine} to three regions with rollback armed.`,
          action: "build" as const,
        },
      ].filter((s) => !usedIds.has(s.id)) as ThreadSuggestionDef[],
    );
  }

  return [];
}

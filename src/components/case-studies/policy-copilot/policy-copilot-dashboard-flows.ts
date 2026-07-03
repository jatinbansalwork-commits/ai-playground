import type { DashboardStatId } from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";

export interface ActivePolicyRow {
  id: string;
  name: string;
  status: "Live" | "Deploying";
  regions: string;
  lastChange: string;
  owner: string;
  prompt: string;
}

export interface PendingReviewRow {
  id: string;
  name: string;
  dueLabel: string;
  urgent: boolean;
  author: string;
  checksSummary: string;
  prompt: string;
}

export interface DriftFlagRow {
  id: string;
  rule: string;
  detected: string;
  severity: "Low" | "Medium";
  summary: string;
  prompt: string;
}

export interface CheckIssueRow {
  id: string;
  policy: string;
  check: string;
  status: "warning" | "fail";
  detail: string;
  prompt: string;
}

export const DASHBOARD_STAT_INTROS: Record<DashboardStatId, { title: string; copilot: string }> = {
  active: {
    title: "Active policies",
    copilot: "12 policies are live across your regions. Pick one to view its govern record or open for tuning.",
  },
  pending: {
    title: "Pending review",
    copilot: "3 policies are waiting for approval — one is due today. I'll walk you through deploy once you confirm.",
  },
  drift: {
    title: "Drift flagged",
    copilot: "LinkedIn_Access has drifted from its golden intent. Memory shows why it exists — let's resolve it.",
  },
  checks: {
    title: "Checks health",
    copilot: "98% of safety checks passed in the last 24 hours. One warning needs attention before the next deploy.",
  },
};

export const ACTIVE_PORTFOLIO: ActivePolicyRow[] = [
  {
    id: "ehr",
    name: "EHR Clinical Access",
    status: "Live",
    regions: "3 regions",
    lastChange: "2 days ago",
    owner: "Nik (Netsec)",
    prompt: "Allow doctors to securely access Electronic Health Records from hospital-managed devices",
  },
  {
    id: "finance-sap",
    name: "Finance SAP & SQL",
    status: "Live",
    regions: "2 regions",
    lastChange: "5 days ago",
    owner: "Priya (GRC)",
    prompt:
      "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
  },
  {
    id: "marketing",
    name: "LinkedIn Business Hours",
    status: "Live",
    regions: "3 regions",
    lastChange: "1 week ago",
    owner: "Alex (IT)",
    prompt: "Allow Marketing to LinkedIn during business hours",
  },
  {
    id: "contractors",
    name: "Contractor Production Deny",
    status: "Live",
    regions: "3 regions",
    lastChange: "2 weeks ago",
    owner: "Jordan (Platform)",
    prompt: "Block contractors from Production",
  },
  {
    id: "vendor-vpn",
    name: "Vendor VPN — Staging",
    status: "Deploying",
    regions: "1 region",
    lastChange: "Just now",
    owner: "Sam (Netsec)",
    prompt: "Allow external vendor VPN access to staging only",
  },
];

export const PENDING_REVIEWS: PendingReviewRow[] = [
  {
    id: "vendor-vpn-pending",
    name: "Vendor VPN — Staging",
    dueLabel: "Due today",
    urgent: true,
    author: "Sam (Netsec)",
    checksSummary: "4 checks passed · sandbox only",
    prompt: "Allow external vendor VPN access to staging only",
  },
  {
    id: "contractors-pending",
    name: "Contractor Production Deny",
    dueLabel: "Due in 2 days",
    urgent: false,
    author: "Jordan (Platform)",
    checksSummary: "4 checks passed · golden config match",
    prompt: "Block contractors from Production",
  },
  {
    id: "marketing-pending",
    name: "Marketing SaaS Exception",
    dueLabel: "Due in 5 days",
    urgent: false,
    author: "Alex (IT)",
    checksSummary: "4 checks passed · acceptable use",
    prompt: "Allow Marketing to LinkedIn during business hours",
  },
];

export const DRIFT_FLAGS: DriftFlagRow[] = [
  {
    id: "linkedin-drift",
    rule: "LinkedIn_Access",
    detected: "Sept 2025",
    severity: "Low",
    summary: "24/7 access vs approved business-hours window · 0 sessions in 90 days",
    prompt: "Allow Marketing to LinkedIn during business hours",
  },
];

export const CHECKS_HEALTH = {
  passRate: "98%",
  passed: 46,
  total: 47,
  window: "Last 24h",
  issues: [
    {
      id: "sap-mfa",
      policy: "Finance SAP & SQL",
      check: "MFA not enforced",
      status: "warning" as const,
      detail: "SOX control expects step-up auth — similar policies all use MFA",
      prompt:
      "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
    },
  ] satisfies CheckIssueRow[],
};

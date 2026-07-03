import { scenarioIconFromPrompt } from "@/components/case-studies/policy-copilot/policy-copilot-design-system";

export type StarterCategory = "clinical" | "finance" | "access" | "vendor" | "saas";

export interface PolicyStarterTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: StarterCategory;
  tags: string[];
  featured?: boolean;
  journeySteps?: string[];
}

export const STARTER_CATEGORY_LABEL: Record<StarterCategory, string> = {
  clinical: "Healthcare",
  finance: "Finance",
  access: "Access control",
  vendor: "Vendor risk",
  saas: "SaaS",
};

export const POLICY_STARTER_TEMPLATES: PolicyStarterTemplate[] = [
  {
    id: "ehr",
    title: "Clinical EHR Access",
    description: "Doctors on hospital-managed devices only — nurses blocked, full audit.",
    prompt:
      "Allow doctors to access electronic health records from hospital-managed devices only. Block nurses and everyone else. Log every attempt.",
    category: "clinical",
    tags: ["HIPAA", "ePHI", "Role separation"],
    featured: true,
    journeySteps: ["Clarify intent", "Map doctors & EHR", "Run HIPAA checks", "Approve & deploy"],
  },
  {
    id: "contractors",
    title: "Contractor Production Deny",
    description: "Block contractors from production workloads with deny-by-default logging.",
    prompt:
      "Block contractors from production workloads — deny by default and log every attempt.",
    category: "access",
    tags: ["Golden config", "Deny", "ISO 27001"],
    featured: true,
    journeySteps: ["Confirm deny scope", "Map contractor groups", "Validate golden config", "Ship with audit"],
  },
  {
    id: "finance-sap",
    title: "Finance SAP & SQL",
    description: "Finance users to SAP and SQL from managed workstations — SOX aligned.",
    prompt:
      "Allow finance users to access SAP and SQL from managed workstations — SOX aligned.",
    category: "finance",
    tags: ["SOX", "Segmentation", "MFA"],
    journeySteps: ["Scope FTE finance", "Map SAP & SQL paths", "Run SOX checks", "Approve deploy"],
  },
  {
    id: "marketing",
    title: "Marketing SaaS Exception",
    description: "LinkedIn for marketing during business hours — personal accounts blocked.",
    prompt:
      "Allow marketing users to access LinkedIn during business hours — block personal accounts.",
    category: "saas",
    tags: ["Acceptable use", "Schedule", "SOC 2"],
    journeySteps: ["Confirm business hours", "Map marketing identity", "Shadow-IT checks", "Approve exception"],
  },
];

export const POLICY_STARTER_SUGGESTIONS = [
  {
    id: "sql-finance",
    text: "Restrict SQL Server to Finance subnet",
    hint: "Database tier segmentation",
  },
  {
    id: "intent-card",
    text: "Only doctors can access patient records. Block nurses and everyone else.",
    hint: "Plain-language intent card",
  },
  {
    id: "tiktok",
    text: "Block TikTok access for intern accounts during business hours",
    hint: "SaaS deny pattern",
  },
] as const;

export function starterIcon(prompt: string): string {
  return scenarioIconFromPrompt(prompt);
}

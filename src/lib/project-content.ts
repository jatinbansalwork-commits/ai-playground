export interface CaseStudyMetaSpecs {
  services: string[];
  client: string;
  location: string;
  infoText: string;
  liveLinkUrl?: string;
}

export interface CaseStudyContent {
  slug: string;
  title: string;
  year: string;
  overviewText: string;
  meta: CaseStudyMetaSpecs;
}

function entry(
  slug: string,
  title: string,
  year: string,
  overviewText: string,
  meta: CaseStudyMetaSpecs,
): CaseStudyContent {
  return { slug, title, year, overviewText, meta };
}

/**
 * Case study metadata — title, year, SEO copy, and project specs for `/projects/[slug]`.
 * Page layouts and body copy live in `src/components/case-studies/*`.
 */
export const projectDataRegistry: Record<string, CaseStudyContent> = {
  "cisco-policy-copilot": entry(
    "cisco-policy-copilot",
    "Cisco - Policy Copilot",
    "2026",
    "Cisco platform specific network security workflow design and overview details.",
    {
      services: ["Product Design", "UX Research", "Prototyping"],
      client: "Cisco",
      location: "San Jose, CA",
      infoText:
        "Reimagined how security policy telemetry is surfaced for network practitioners — translating rule diffs, validation errors, and deployment states into a single conversational audit surface.",
    },
  ),
  "freshprints-design-system": entry(
    "freshprints-design-system",
    "FreshPrints - Design System",
    "2025",
    "Built a scalable design system from 0 to 1",
    {
      services: ["Design Systems", "UI Architecture", "Documentation"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Audited hundreds of one-off UI patterns across merchant tooling and consolidated them into a unified token, component, and documentation library designers and engineers could ship from without renegotiating spacing every sprint.",
    },
  ),
  "design-tool": entry(
    "design-tool",
    "FreshPrints - Design Tool",
    "2025",
    "Design Tool canvas workflows, editor surfaces, and collaboration patterns.",
    {
      services: ["Product Design", "Interaction Design", "Prototyping"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Designed canvas editor workflows that balance structure and spontaneity — enabling parallel attention across layers, assets, and live collaboration without overwhelming the editing surface.",
    },
  ),
  "design-polling": entry(
    "design-polling",
    "FreshPrints - Poll on your design",
    "2025",
    "Design Polling specific canvas layouts and user engagement workflows.",
    {
      services: ["Product Design", "UX Research", "UI Design"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Built async design review flows that close the loop between vote and revision — surfacing aggregated feedback and participant states directly inside the canvas workspace.",
    },
  ),
  "freshprints-image-gen": entry(
    "freshprints-image-gen",
    "FreshPrints - Image Gen AI",
    "2025",
    "Generative image tooling, prompt flows, and asset review interfaces.",
    {
      services: ["Product Design", "AI UX", "Design Systems"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Designed generative image tooling that keeps prompt craft, asset review, and governance in one continuous flow — so teams can iterate on AI output without leaving the production pipeline.",
    },
  ),
  saltbot: entry(
    "saltbot",
    "Saltbot (Saltmine)",
    "2024",
    "Saltbot conversational assistant flows and automation guardrails.",
    {
      services: ["Conversation Design", "Product Design", "Prototyping"],
      client: "Saltmine",
      location: "Remote",
      infoText:
        "Designed conversational assistant flows with predictable escalation paths and automation guardrails — earning trust through clarity about when the bot acts and when a human should step in.",
    },
  ),
  "saltmine-sync": entry(
    "saltmine-sync",
    "Saltmine - Sync",
    "2024",
    "Saltmine-Sync data reconciliation views and sync health monitoring.",
    {
      services: ["Product Design", "Data Visualization", "UI Design"],
      client: "Saltmine",
      location: "Remote",
      infoText:
        "Built data reconciliation views that surface drift before it becomes an incident — giving operators sync health monitoring and actionable context under operational load.",
    },
  ),
  "kalash-rewards": entry(
    "kalash-rewards",
    "Kalash - Rewards",
    "2024",
    "Kalash Rewards loyalty mechanics, redemption paths, and member dashboards.",
    {
      services: ["Product Design", "UX Research", "UI Design"],
      client: "Kalash",
      location: "Mumbai, India",
      infoText:
        "Designed loyalty mechanics and member dashboards that make redemption paths obvious — motivating engagement without noise through progressive disclosure and clear reward states.",
    },
  ),
  "piggy-mutual-fund": entry(
    "piggy-mutual-fund",
    "Piggy - Mutual Fund",
    "2023",
    "Piggy Mutual Fund onboarding, portfolio summaries, and investment education.",
    {
      services: ["Product Design", "UX Research", "UI Design"],
      client: "Piggy",
      location: "Bangalore, India",
      infoText:
        "Designed mutual fund onboarding and portfolio summaries that weave investment education into action — building confidence for first-time investors through progressive disclosure, not bolt-on tutorials.",
    },
  ),
  "open-money": entry(
    "open-money",
    "Open Money",
    "2021",
    "Open Money payments infrastructure, account flows, and trust patterns.",
    {
      services: ["Product Design", "Brand Design", "UI Design"],
      client: "Open Money",
      location: "Bangalore, India",
      infoText:
        "Designed payments infrastructure and account flows that feel calm even when rails are complex — establishing trust as a designed system across verification, transfers, and account management.",
    },
  ),
};

export const PROJECT_CONTENT_SLUGS = Object.keys(
  projectDataRegistry,
) as (keyof typeof projectDataRegistry)[];

export type ProjectContentSlug = (typeof PROJECT_CONTENT_SLUGS)[number];

export function getCaseStudyContent(slug: string): CaseStudyContent | undefined {
  return projectDataRegistry[slug];
}

export function getCaseStudySlugs(): string[] {
  return PROJECT_CONTENT_SLUGS;
}

export function getAllCaseStudies(): CaseStudyContent[] {
  return PROJECT_CONTENT_SLUGS.map((slug) => projectDataRegistry[slug]!);
}

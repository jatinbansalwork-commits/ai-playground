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
    "✅ FreshPrints - Design System",
    "2025",
    "Built a scalable design system from 0 to 1",
    {
      services: ["Design Systems", "UI Architecture", "Documentation"],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Fresh Prints' e-commerce platform has been a favorite for schools, colleges, sororities, fraternities, clubs, and sports teams across the USA for over a decade. Now, with the addition of content creation, the platform is growing even further. However, the current design and UI technology are struggling with scalability and consistency. As Fresh Prints looks to expand globally, it's crucial to elevate our systems and design standards to match the expectations of modern creators.",
    },
  ),
  "design-tool": entry(
    "design-tool",
    "FreshPrints - Heal Tool",
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
    "✅ FreshPrints - Image Gen AI",
    "2025",
    "Generative image tooling, prompt flows, and asset review interfaces.",
    {
      services: [
        "UX / UI for desktop + mobile",
        "Shipped MVP",
        "Design",
        "Conceptualization",
        "Dev handoff",
        "Discovery",
        "Audit",
        "Motion Graphic",
      ],
      client: "FreshPrints",
      location: "New York, NY",
      infoText:
        "Fresh Prints' e-commerce platform has been a favorite for schools, colleges, sororities, fraternities, clubs, and sports teams across the USA for over a decade. Now, with the addition of content creation, the platform is growing even further. However, the current design and UI technology are struggling with scalability and consistency. As Fresh Prints looks to expand globally, it's crucial to elevate our systems and design standards to match the expectations of modern creators.",
    },
  ),
  saltbot: entry(
    "saltbot",
    "✅ Saltbot AI (Saltmine)",
    "2024",
    "Saltbot conversational assistant flows and automation guardrails.",
    {
      services: [
        "Micro-Interaction",
        "Dev handoff",
        "Discovery",
        "Early tech explores",
        "UX / UI for desktop + mobile",
        "Conceptualization",
      ],
      client: "Saltmine",
      location: "Bengaluru",
      infoText:
        "Our first AI-powered Report Analytics Tool at Saltmine. Saltbot makes it easy to generate detailed reports on employee headcount—no more tedious data pulling or complicated navigation. With just a few clicks, you can create and visualize exactly the data you need, all in 5 seconds or less. Say goodbye to cluttered spreadsheets and hello to clear, actionable insights!",
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
    "Kalash - Year end recap",
    "2024",
    "Piggy Mutual Fund onboarding, portfolio summaries, and investment education.",
    {
      services: ["Product Design", "UX Research", "UI Design"],
      client: "Piggy",
      location: "Bangalore, India",
      infoText:
        "Designed mutual fund onboarding and portfolio summaries that weave investment education into action — building confidence for first-time investors through progressive disclosure, not bolt-on tutorials.",
    },
  ),
  "new-project": entry(
    "new-project",
    "Piggy - Reduced Mutual Fund Support Ticket",
    "2023",
    "Case study overview coming soon.",
    {
      services: ["Product Design"],
      client: "TBD",
      location: "TBD",
      infoText: "Project details will be published here.",
    },
  ),
  "project-2": entry(
    "project-2",
    "Piggy - Personalised Mutual Fund Recomendation",
    "2022",
    "Case study overview coming soon.",
    {
      services: ["Product Design"],
      client: "TBD",
      location: "TBD",
      infoText: "Project details will be published here.",
    },
  ),
  "open-money": entry(
    "open-money",
    "✅ Open Money",
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

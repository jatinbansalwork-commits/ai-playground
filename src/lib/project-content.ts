export interface CaseStudyContent {
  slug: string;
  title: string;
  year: string;
  overviewText: string;
}

function entry(
  slug: string,
  title: string,
  year: string,
  overviewText: string,
): CaseStudyContent {
  return { slug, title, year, overviewText };
}

/**
 * Case study metadata — title, year, and SEO copy for `/projects/[slug]`.
 * Page layouts and body copy live in `src/components/case-studies/*`.
 */
export const projectDataRegistry: Record<string, CaseStudyContent> = {
  "cisco-policy-copilot": entry(
    "cisco-policy-copilot",
    "Cisco-Policy Copilot",
    "2026",
    "Cisco platform specific network security workflow design and overview details.",
  ),
  "freshprints-design-system": entry(
    "freshprints-design-system",
    "FreshPrints Design System",
    "2025",
    "Component design library specifications and tokens architecture details.",
  ),
  "design-tool": entry(
    "design-tool",
    "Design Tool",
    "2025",
    "Design Tool canvas workflows, editor surfaces, and collaboration patterns.",
  ),
  "design-polling": entry(
    "design-polling",
    "Design Polling",
    "2025",
    "Design Polling specific canvas layouts and user engagement workflows.",
  ),
  "freshprints-image-gen": entry(
    "freshprints-image-gen",
    "FreshPrints Image Gen",
    "2025",
    "Generative image tooling, prompt flows, and asset review interfaces.",
  ),
  saltbot: entry(
    "saltbot",
    "Saltbot",
    "2024",
    "Saltbot conversational assistant flows and automation guardrails.",
  ),
  "saltmine-sync": entry(
    "saltmine-sync",
    "Saltmine-Sync",
    "2024",
    "Saltmine-Sync data reconciliation views and sync health monitoring.",
  ),
  "kalash-rewards": entry(
    "kalash-rewards",
    "Kalash Rewards",
    "2024",
    "Kalash Rewards loyalty mechanics, redemption paths, and member dashboards.",
  ),
  "piggy-mutual-fund": entry(
    "piggy-mutual-fund",
    "Piggy Mutual Fund",
    "2023",
    "Piggy Mutual Fund onboarding, portfolio summaries, and investment education.",
  ),
  "open-money": entry(
    "open-money",
    "Open Money",
    "2021",
    "Open Money payments infrastructure, account flows, and trust patterns.",
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

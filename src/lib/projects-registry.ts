export interface ProjectEntry {
  slug: string;
  title: string;
  year: string;
}

export const PROJECTS_PAGE = {
  title: "Projects",
  description: "Selected product and interface work.",
} as const;

/** Kebab-case handles for `/projects/[slug]` case study routes. */
export const PROJECT_CASE_STUDY_SLUGS = [
  "cisco-policy-copilot",
  "freshprints-design-system",
  "design-tool",
  "design-polling",
  "freshprints-image-gen",
  "saltbot",
  "saltmine-sync",
  "kalash-rewards",
  "piggy-mutual-fund",
  "open-money",
] as const;

export type ProjectCaseStudySlug = (typeof PROJECT_CASE_STUDY_SLUGS)[number];

export function projectTitleToSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function getProjectCaseStudyHref(title: string): string {
  return `/projects/${projectTitleToSlug(title)}`;
}

/**
 * Professional case studies — edit this array only.
 * Do not import from `experiments-registry.ts`.
 */
export const PROJECTS_REGISTRY: ProjectEntry[] = [
  {
    slug: "cisco-policy-copilot",
    title: "Cisco-Policy Copilot",
    year: "2026",
  },
  {
    slug: "freshprints-design-system",
    title: "FreshPrints Design System",
    year: "2025",
  },
  {
    slug: "design-tool",
    title: "Design Tool",
    year: "2025",
  },
  {
    slug: "design-polling",
    title: "Design Polling",
    year: "2025",
  },
  {
    slug: "freshprints-image-gen",
    title: "FreshPrints Image Gen",
    year: "2025",
  },
  {
    slug: "saltbot",
    title: "Saltbot",
    year: "2024",
  },
  {
    slug: "saltmine-sync",
    title: "Saltmine-Sync",
    year: "2024",
  },
  {
    slug: "kalash-rewards",
    title: "Kalash Rewards",
    year: "2024",
  },
  {
    slug: "piggy-mutual-fund",
    title: "Piggy Mutual Fund",
    year: "2023",
  },
  {
    slug: "open-money",
    title: "Open Money",
    year: "2021",
  },
];

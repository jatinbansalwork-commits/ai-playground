import {
  getAllCaseStudies,
  getCaseStudySlugs,
  type ProjectContentSlug,
} from "@/lib/project-content";

export interface ProjectEntry {
  slug: string;
  title: string;
  year: string;
}

export const PROJECTS_PAGE = {
  title: "Projects",
  description: "Selected product and interface work.",
} as const;

/** Flagship case study surfaced on the index "Recent Work" slide (`/Recentwork`). */
export const FEATURED_CASE_STUDY_SLUG = "cisco-policy-copilot" as const;

/** Kebab-case handles for `/projects/[slug]` case study routes. */
export const PROJECT_CASE_STUDY_SLUGS = getCaseStudySlugs() as ProjectContentSlug[];

export type ProjectCaseStudySlug = ProjectContentSlug;

export function getProjectCaseStudyHref(slug: string): string {
  return `/projects/${slug}`;
}

/**
 * Professional case studies — index rows derived from `project-content.ts`.
 * Edit per-project copy in `projectDataRegistry`, not here.
 */
export const PROJECTS_REGISTRY: ProjectEntry[] = getAllCaseStudies().map(
  ({ slug, title, year }) => ({ slug, title, year }),
);

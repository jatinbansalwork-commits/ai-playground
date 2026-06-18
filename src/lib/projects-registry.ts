import {
  getCaseStudySlugs,
  type ProjectContentSlug,
} from "@/lib/project-content";
import { PROJECTS_LIST, type ProjectRowItem } from "@/lib/projects-list-data";

/** @deprecated Use `ProjectRowItem` from `projects-list-data.ts`. */
export type ProjectEntry = ProjectRowItem;

export const PROJECTS_PAGE = {
  title: "Projects",
  description: "Selected product and interface work.",
} as const;

/** Flagship case study — available at `/projects/cisco-policy-copilot`. */
export const FEATURED_CASE_STUDY_SLUG = "cisco-policy-copilot" as const;

/** Kebab-case handles for `/projects/[slug]` case study routes. */
export const PROJECT_CASE_STUDY_SLUGS = getCaseStudySlugs() as ProjectContentSlug[];

export type ProjectCaseStudySlug = ProjectContentSlug;

export function getProjectCaseStudyHref(slug: string): string {
  return `/projects/${slug}`;
}

/** @deprecated Use `PROJECTS_LIST` from `projects-list-data.ts`. */
export const PROJECTS_REGISTRY: ProjectRowItem[] = PROJECTS_LIST;

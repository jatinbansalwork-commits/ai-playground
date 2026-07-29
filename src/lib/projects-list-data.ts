import { cdnAsset } from "@/lib/asset-cdn";
import { JB_ILLUSTRATIONS } from "@/lib/jb-illustration-library";
import { getAllCaseStudies } from "@/lib/project-content";

/**
 * Projects index row — includes a dedicated hover asset that is never used
 * inside `/projects/[slug]` case study layouts.
 */
export interface ProjectRowItem {
  id: string;
  slug: string;
  title: string;
  year: string;
  /** Right-hand label on the projects index; falls back to `year` when omitted. */
  listAside?: string;
  hoverThumbnail: string;
  /**
   * When false, the row matches the list layout but is not a link.
   * Defaults to true for case-study rows.
   */
  navigable?: boolean;
}

/** Per-slug product info shown instead of the year on the projects index. */
export const LIST_ASIDE_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": "Reduce Policy Generation Time by 40%",
  "saltbot-ai-saltmine": "Reimagining Analytics with AI",
  "freshprints-image-gen-ai": "Image Gen AI",
  "freshprints-design-system":
    "Stopped UI debates and helped 4 product teams ship faster",
  "kalash-rewards": "Getting India to save in gold digitally",
  "piggy-reduced-mutual-fund-support-tickets": "Reduced Support Tickets",
};

/**
 * Per-slug hover thumbnail overrides (CDN or `/public` paths).
 * @example
 * import { cdnAsset } from "@/lib/asset-cdn";
 * HOVER_THUMBNAIL_OVERRIDES["cisco-policy-copilot"] =
 *   cdnAsset("/thumbnails/cisco-hover.jpg");
 */
export const HOVER_THUMBNAIL_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": JB_ILLUSTRATIONS["policy-copilot-projects-hover"],
  "freshprints-design-system": cdnAsset("/Hover/FP%20DS"),
  "freshprints-image-gen-ai": cdnAsset("/Hover/FP%20AI"),
  "saltbot-ai-saltmine": cdnAsset("/Hover/saltbot"),
  "kalash-year-end-recap": cdnAsset("/Hover/Kalash%201%20cover.png"),
  "kalash-rewards": cdnAsset("/Hover/ticker"),
  "piggy-reduced-mutual-fund-support-tickets": cdnAsset("/Hover/intro"),
};

/** Square 1:1 placeholder until real hover assets are uploaded. */
export const HOVER_THUMBNAIL_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/></svg>',
)}`;

function hoverThumbnailForSlug(slug: string): string {
  return HOVER_THUMBNAIL_OVERRIDES[slug] ?? HOVER_THUMBNAIL_PLACEHOLDER;
}

/** Hidden from the projects index until the case study is ready to promote. */
const HIDDEN_PROJECT_SLUGS = new Set([
  "freshprints-heal-tool",
  "kalash-rewards",
  "kalash-year-end-recap",
  "piggy-reduced-mutual-fund-support-tickets",
  "piggy-personalised-mutual-fund-recommendation",
  "saltmine-sync",
]);

/** Draft case studies — excluded from sitemap and marked noindex. */
const NOINDEX_PROJECT_SLUGS = new Set([
  "freshprints-heal-tool",
  "kalash-rewards",
  "kalash-year-end-recap",
  "piggy-reduced-mutual-fund-support-tickets",
  "piggy-personalised-mutual-fund-recommendation",
  "saltmine-sync",
]);

export function isHiddenProjectSlug(slug: string): boolean {
  return HIDDEN_PROJECT_SLUGS.has(slug);
}

export function isNoIndexProjectSlug(slug: string): boolean {
  return NOINDEX_PROJECT_SLUGS.has(slug);
}

/** Case studies that should be discoverable in search, including off-index launches. */
export function getIndexableCaseStudySlugs(): string[] {
  return getAllCaseStudies()
    .filter((study) => !NOINDEX_PROJECT_SLUGS.has(study.slug))
    .map((study) => study.slug);
}

/** Canonical projects index dataset — titles/years sync from `project-content.ts`. */
const LIVE_PROJECTS_LIST: ProjectRowItem[] = getAllCaseStudies()
  .filter((study) => !HIDDEN_PROJECT_SLUGS.has(study.slug))
  .map((study, index) => ({
    id: String(index + 1),
    slug: study.slug,
    title: study.title,
    year: study.year,
    listAside: LIST_ASIDE_OVERRIDES[study.slug],
    hoverThumbnail: hoverThumbnailForSlug(study.slug),
    navigable: true,
  }));

/**
 * Display-only rows — same visual as case-study rows, no navigation.
 * Inserted after `afterSlug` when present; otherwise appended.
 */
const DISPLAY_ONLY_PROJECT_ROWS: {
  afterSlug: string;
  row: Omit<ProjectRowItem, "id" | "navigable">;
}[] = [
  {
    afterSlug: "freshprints-design-system",
    row: {
      slug: "freshprints-display",
      title: "FreshPrints",
      year: "2025",
      listAside:
        "Increased engagement of the Heal Tool by 15% through a Gen AI feature",
      hoverThumbnail: HOVER_THUMBNAIL_PLACEHOLDER,
    },
  },
];

function withDisplayOnlyRows(projects: ProjectRowItem[]): ProjectRowItem[] {
  const next = [...projects];
  for (const entry of DISPLAY_ONLY_PROJECT_ROWS) {
    const insertAt = next.findIndex((project) => project.slug === entry.afterSlug);
    const row: ProjectRowItem = {
      ...entry.row,
      id: `display-${entry.row.slug}`,
      navigable: false,
    };
    if (insertAt === -1) {
      next.push(row);
    } else {
      next.splice(insertAt + 1, 0, row);
    }
  }
  return next.map((project, index) => ({ ...project, id: String(index + 1) }));
}

export const PROJECTS_LIST: ProjectRowItem[] = withDisplayOnlyRows(LIVE_PROJECTS_LIST);

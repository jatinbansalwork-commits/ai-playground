import { cdnAsset } from "@/lib/asset-cdn";
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
  /** Pill tag on the projects index card; falls back to Case Study / Coming Soon. */
  listTag?: string;
  hoverThumbnail: string;
  /**
   * Scale factor for the hover thumb inside the phone frame (crops letterboxing).
   * Omit when the thumb should fill at 1×.
   */
  thumbZoom?: number;
  /**
   * When false, the row matches the list layout but is not a link.
   * Defaults to true for case-study rows.
   */
  navigable?: boolean;
  /**
   * When set, the card opens this URL in a new tab instead of `/projects/[slug]`.
   */
  externalHref?: string;
}

/** Per-slug product info shown instead of the year on the projects index. */
export const LIST_ASIDE_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": "Reduce policy generation time by 40%",
  "saltbot-ai-saltmine": "Reimagining Analytics with AI",
  "freshprints-image-gen-ai":
    "#1 driver of DAU growth for the FreshPrints AI feature",
  "freshprints-design-system":
    "A design system that stopped UI debates and helped 4 product teams ship faster",
  "kalash-mystery-box": "Bitcoin on every save",
  "kalash-coins": "Increase conversation with less tech/product effort",
  "kalash-rewards": "Getting India to save in gold digitally",
  "piggy-reduced-mutual-fund-support-tickets": "Reduced support tickets",
};

/** Per-slug card title overrides on the projects index. */
export const LIST_TITLE_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": "Cisco - Policy Copilot",
  "freshprints-image-gen-ai": "FreshPrints - Image AI",
  "kalash-coins": "Piggy - Mutual Fund",
};

/** Per-slug pill tag overrides on the projects index. */
export const LIST_TAG_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot": "Zero to One Experience",
  "saltbot-ai-saltmine": "Zero to One Experience",
  "freshprints-image-gen-ai": "Product Led Growth",
  "freshprints-design-system": "Design System",
  "kalash-mystery-box": "Product Led Growth",
  "kalash-coins": "Product Led Growth",
};

/**
 * Per-slug hover thumbnail overrides (CDN or `/public` paths).
 * @example
 * import { cdnAsset } from "@/lib/asset-cdn";
 * HOVER_THUMBNAIL_OVERRIDES["cisco-policy-copilot"] =
 *   cdnAsset("/thumbnails/cisco-hover.jpg");
 */
export const HOVER_THUMBNAIL_OVERRIDES: Partial<Record<string, string>> = {
  "cisco-policy-copilot":
    "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/thumbnail/9.svg",
  "freshprints-design-system":
    "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/thumbnail/1213.svg",
  "freshprints-image-gen-ai": cdnAsset("/Hover/FP%20AI"),
  "saltbot-ai-saltmine":
    "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/thumbnail/COVER1.svg",
  "kalash-mystery-box":
    "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/thumbnail/Frame%20132131506912.svg",
  "kalash-coins":
    "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/thumbnail/Frame%201321314967.svg",
  "kalash-year-end-recap": cdnAsset("/Hover/Kalash%201%20cover.png"),
  "kalash-rewards": cdnAsset("/Hover/ticker"),
  "piggy-reduced-mutual-fund-support-tickets": cdnAsset("/Hover/intro"),
};

/** Per-slug hover thumb scale inside the phone frame (overflow clipped). */
const HOVER_THUMB_ZOOM_BY_SLUG: Record<string, number> = {
  "freshprints-image-gen-ai": 1.44,
  "kalash-coins": 1.15,
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

/** Display order on `/projects` — remaining visible case studies follow registry order. */
const PROJECTS_INDEX_ORDER = [
  "cisco-policy-copilot",
  "freshprints-image-gen-ai",
  "freshprints-design-system",
  "saltbot-ai-saltmine",
  "kalash-coins",
  "kalash-mystery-box",
] as const;

function projectsIndexSortKey(slug: string): number {
  const index = (PROJECTS_INDEX_ORDER as readonly string[]).indexOf(slug);
  return index === -1 ? PROJECTS_INDEX_ORDER.length : index;
}

/** Visible on the index but not linked — Coming Soon cursor on hover. */
const NON_NAVIGABLE_INDEX_SLUGS = new Set([
  "kalash-mystery-box",
]);

/** Per-slug external deck / demo links — open in a new tab from the projects index. */
export const EXTERNAL_HREF_OVERRIDES: Partial<Record<string, string>> = {
  "kalash-coins": "https://www.figma.com/deck/noJzkQN8UaCro99JChbUFM",
};

/** True when the index card links to an on-site `/projects/[slug]` case study. */
export function isOnSiteCaseStudyRow(project: ProjectRowItem): boolean {
  return project.navigable !== false && !project.externalHref;
}

/** Canonical projects index dataset — titles/years sync from `project-content.ts`. */
const LIVE_PROJECTS_LIST: ProjectRowItem[] = getAllCaseStudies()
  .filter((study) => !HIDDEN_PROJECT_SLUGS.has(study.slug))
  .sort(
    (a, b) => projectsIndexSortKey(a.slug) - projectsIndexSortKey(b.slug),
  )
  .map((study, index) => ({
    id: String(index + 1),
    slug: study.slug,
    title: LIST_TITLE_OVERRIDES[study.slug] ?? study.title,
    year: study.year,
    listAside: LIST_ASIDE_OVERRIDES[study.slug],
    listTag: LIST_TAG_OVERRIDES[study.slug],
    hoverThumbnail: hoverThumbnailForSlug(study.slug),
    thumbZoom: HOVER_THUMB_ZOOM_BY_SLUG[study.slug],
    navigable: !NON_NAVIGABLE_INDEX_SLUGS.has(study.slug),
    externalHref: EXTERNAL_HREF_OVERRIDES[study.slug],
  }));

export const PROJECTS_LIST: ProjectRowItem[] = LIVE_PROJECTS_LIST;

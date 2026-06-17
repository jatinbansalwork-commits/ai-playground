import { ROUTES } from "@/lib/constants";
import { getExperimentCategories } from "@/lib/experiments-registry";

export const EXPERIMENTS_FILTERS = [
  { id: "all", label: "All" },
  { id: "motion-graphic", label: "Motion Graphic" },
  { id: "ai-experiment", label: "AI Experiment" },
  { id: "illustration", label: "Illustration" },
] as const;

export type ExperimentFilterId = (typeof EXPERIMENTS_FILTERS)[number]["id"];

export type ExperimentCategory =
  | Exclude<ExperimentFilterId, "all">
  | "article";

export { getExperimentCategories };

export function filterExperimentItems<T extends { slug: string }>(
  items: T[],
  filter: ExperimentFilterId,
): T[] {
  if (filter === "all") return items;

  return items.filter((item) => {
    const categories = getExperimentCategories(item.slug);
    return categories.includes(filter);
  });
}

/** Which category drives layout when an item has multiple tags. */
const EXPERIMENT_CATEGORY_PRIORITY: readonly ExperimentCategory[] = [
  "motion-graphic",
  "illustration",
  "article",
  "ai-experiment",
];

export interface ExperimentDisplayEntry<T extends { slug: string }> {
  item: T;
  displayCategory: ExperimentCategory;
  instanceKey: string;
}

/** Expand each source row into one card per assigned category (length scales with registry/CMS). */
export function getExperimentDisplayEntries<T extends { slug: string }>(
  items: T[],
  filter: ExperimentFilterId,
): ExperimentDisplayEntry<T>[] {
  const filtered = filterExperimentItems(items, filter);

  if (filter !== "all") {
    return filtered.map((item) => ({
      item,
      displayCategory: filter,
      instanceKey: item.slug,
    }));
  }

  const entries: ExperimentDisplayEntry<T>[] = [];

  for (const item of filtered) {
    const categories = getExperimentCategories(item.slug);

    for (const category of EXPERIMENT_CATEGORY_PRIORITY) {
      if (category === "article") continue;

      if (categories.includes(category)) {
        entries.push({
          item,
          displayCategory: category,
          instanceKey: `${item.slug}::${category}`,
        });
      }
    }
  }

  return entries;
}

/** Unified 1:1 media shell — all experiment preview slots use a square ratio. */
const EXPERIMENT_MEDIA_SQUARE = {
  aspectRatio: "1 / 1",
  aspectClass: "aspect-square",
} as const;

const EXPERIMENT_MEDIA_VIDEO = {
  aspectRatio: "16 / 9",
  aspectClass: "aspect-video",
} as const;

const EXPERIMENT_MEDIA_WIDESCREEN = {
  aspectRatio: "16 / 10",
  aspectClass: "aspect-[16/10]",
} as const;

interface ExperimentAspectOverride {
  /** Omit to apply on every category tab for this slug. */
  category?: ExperimentCategory;
  aspectClass: string;
}

/** Per-slug preview aspect overrides. */
const EXPERIMENT_PREVIEW_ASPECT_OVERRIDES: Partial<
  Record<string, ExperimentAspectOverride>
> = {
  "click-sound": { aspectClass: EXPERIMENT_MEDIA_VIDEO.aspectClass },
  "clip-reveal": {
    category: "ai-experiment",
    aspectClass: EXPERIMENT_MEDIA_VIDEO.aspectClass,
  },
  "motion-graphic-2": { aspectClass: EXPERIMENT_MEDIA_WIDESCREEN.aspectClass },
  "motion-graphic-7": { aspectClass: EXPERIMENT_MEDIA_WIDESCREEN.aspectClass },
  "motion-graphic-9": { aspectClass: EXPERIMENT_MEDIA_WIDESCREEN.aspectClass },
};

/** Hard layout rules per category — aspect ratio + grid width. */
export const EXPERIMENT_CATEGORY_LAYOUT: Record<
  ExperimentCategory,
  { aspectRatio: string; span: string; aspectClass: string }
> = {
  "motion-graphic": {
    ...EXPERIMENT_MEDIA_SQUARE,
    span: "md:col-span-2 md:row-span-1",
  },
  illustration: {
    ...EXPERIMENT_MEDIA_SQUARE,
    span: "md:col-span-1 md:row-span-1",
  },
  article: {
    ...EXPERIMENT_MEDIA_SQUARE,
    span: "md:col-span-1 md:row-span-1",
  },
  "ai-experiment": {
    ...EXPERIMENT_MEDIA_SQUARE,
    span: "md:col-span-1 md:row-span-1",
  },
};

export function getExperimentDisplayCategory(
  slug: string,
  filter: ExperimentFilterId,
  displayCategory?: ExperimentCategory,
): ExperimentCategory {
  if (displayCategory) return displayCategory;

  if (filter !== "all") {
    return filter;
  }

  const categories = getExperimentCategories(slug);
  for (const category of EXPERIMENT_CATEGORY_PRIORITY) {
    if (categories.includes(category)) return category;
  }

  return "ai-experiment";
}

export function getExperimentPreviewAspectRatio(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): string {
  return EXPERIMENT_CATEGORY_LAYOUT[
    getExperimentDisplayCategory(slug, filter, displayCategory)
  ].aspectRatio;
}

export function getExperimentPreviewAspectClass(
  category: ExperimentCategory,
  filter: ExperimentFilterId = "all",
  slug?: string,
): string {
  return getExperimentAspectClass(category, filter, slug);
}

/** Category + active filter drive preview shell dimensions. */
export function getExperimentAspectClass(
  category: ExperimentCategory,
  _filter: ExperimentFilterId,
  slug?: string,
): string {
  const override = slug ? EXPERIMENT_PREVIEW_ASPECT_OVERRIDES[slug] : undefined;
  if (override && (!override.category || override.category === category)) {
    return `w-full ${override.aspectClass}`;
  }

  return `w-full ${EXPERIMENT_MEDIA_SQUARE.aspectClass}`;
}

export function getExperimentGridSpan(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): string {
  return EXPERIMENT_CATEGORY_LAYOUT[
    getExperimentDisplayCategory(slug, filter, displayCategory)
  ].span;
}

/** Only Article and AI Experiment containers render a CTA button. */
const EXPERIMENT_CTA_CATEGORIES = new Set<ExperimentCategory>([
  "article",
  "ai-experiment",
]);

export function shouldShowExperimentCta(category: ExperimentCategory): boolean {
  return EXPERIMENT_CTA_CATEGORIES.has(category);
}

/** Stable DOM ids for motion-graphic bento cards (browser preview / deep links). */
const MOTION_GRAPHIC_CARD_IDS: Record<string, string> = {
  "minimap-tracker": "motion-graphic-minimap-tracker",
  "clip-reveal": "motion-graphic-focus-mode",
  "motion-graphic-1": "motion-graphic-1",
  "motion-graphic-2": "motion-graphic-2",
  "motion-graphic-3": "motion-graphic-3",
  "motion-graphic-4": "motion-graphic-4",
  "motion-graphic-5": "motion-graphic-5",
  "motion-graphic-6": "motion-graphic-6",
  "motion-graphic-7": "motion-graphic-7",
  "motion-graphic-8": "motion-graphic-8",
  "motion-graphic-9": "motion-graphic-9",
};

export function getMotionGraphicCardId(
  slug: string,
  category: ExperimentCategory,
): string | undefined {
  if (category !== "motion-graphic") return undefined;
  return MOTION_GRAPHIC_CARD_IDS[slug];
}

/** Stable DOM ids for ai-experiment bento cards (registry order). */
const AI_EXPERIMENT_CARD_IDS: Record<string, string> = {
  "scroll-slider": "ai-experiment-1",
  "clip-reveal": "ai-experiment-2",
  "spring-physics": "ai-experiment-3",
  "ghost-spacer": "ai-experiment-4",
  "click-sound": "ai-experiment-5",
};

export function getAiExperimentCardId(
  slug: string,
  category: ExperimentCategory,
): string | undefined {
  if (category !== "ai-experiment") return undefined;
  return AI_EXPERIMENT_CARD_IDS[slug];
}

/** Stable DOM ids for illustration bento cards (registry order). */
const ILLUSTRATION_CARD_IDS: Record<string, string> = {
  "wireframe-mode": "illustration-1",
  "illustration-gold-jar": "illustration-2",
  "illustration-ticket-mark": "illustration-3",
  "illustration-coin-stack": "illustration-4",
  "illustration-pass-stub": "illustration-5",
  "illustration-savings-vault": "illustration-6",
  "illustration-brand-ticket": "illustration-7",
  "illustration-8": "illustration-8",
  "illustration-9": "illustration-9",
};

export function getIllustrationCardId(
  slug: string,
  category: ExperimentCategory,
): string | undefined {
  if (category !== "illustration") return undefined;
  return ILLUSTRATION_CARD_IDS[slug];
}

export function getExperimentCardId(
  slug: string,
  category: ExperimentCategory,
): string | undefined {
  return (
    getMotionGraphicCardId(slug, category) ??
    getAiExperimentCardId(slug, category) ??
    getIllustrationCardId(slug, category)
  );
}

/** Article & AI Experiment — interactive shell with metadata + CTA. */
export function isFunctionalExperimentCategory(
  category: ExperimentCategory,
): boolean {
  return shouldShowExperimentCta(category);
}

/** Illustration and motion graphic containers are media-only — no links or CTAs. */
export function shouldDisableExperimentNavigation(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): boolean {
  const category = getExperimentDisplayCategory(slug, filter, displayCategory);
  return !shouldShowExperimentCta(category);
}

export function shouldHideExperimentCta(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): boolean {
  const category = getExperimentDisplayCategory(slug, filter, displayCategory);
  return !shouldShowExperimentCta(category);
}

export function getExperimentCtaLabel(
  filter: ExperimentFilterId,
  slug: string,
  _articleSlugs: string[] = [],
  displayCategory?: ExperimentCategory,
): string | null {
  const category = getExperimentDisplayCategory(slug, filter, displayCategory);

  if (!shouldShowExperimentCta(category)) return null;
  if (category === "article") return "Read Essay";
  if (category === "ai-experiment") return "Try Now";

  return null;
}

export const EXPERIMENTS_GALLERY_FILTER_PARAM = "filter";

export function isExperimentFilterId(
  value: string | null | undefined,
): value is ExperimentFilterId {
  return EXPERIMENTS_FILTERS.some((entry) => entry.id === value);
}

export function parseExperimentFilterId(
  value: string | null | undefined,
): ExperimentFilterId {
  if (value === "article") return "all";
  return isExperimentFilterId(value) ? value : "all";
}

export function getExperimentsGalleryHref(
  filter: ExperimentFilterId = "all",
): string {
  if (filter === "all") return ROUTES.craft;
  return `${ROUTES.craft}?${EXPERIMENTS_GALLERY_FILTER_PARAM}=${filter}`;
}

export function getExperimentsFilterLabel(filter: ExperimentFilterId): string {
  return (
    EXPERIMENTS_FILTERS.find((entry) => entry.id === filter)?.label ?? "All"
  );
}


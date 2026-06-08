import { getExperimentCategories } from "@/lib/experiments-registry";

export const EXPERIMENTS_FILTERS = [
  { id: "all", label: "All" },
  { id: "article", label: "Article" },
  { id: "ai-experiment", label: "AI Experiment" },
  { id: "illustration", label: "illustration" },
  { id: "motion-graphic", label: "Motion Graphic" },
] as const;

export type ExperimentFilterId = (typeof EXPERIMENTS_FILTERS)[number]["id"];

export type ExperimentCategory = Exclude<ExperimentFilterId, "all">;

export { getExperimentCategories };

export function filterExperimentItems<T extends { slug: string }>(
  items: T[],
  filter: ExperimentFilterId,
  articleSlugs: string[] = [],
): T[] {
  if (filter === "all") return items;

  const articleSet = new Set(articleSlugs);

  return items.filter((item) => {
    if (filter === "article") {
      return articleSet.has(item.slug);
    }

    return getExperimentCategories(item.slug).includes(filter);
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
  articleSlugs: string[] = [],
): ExperimentDisplayEntry<T>[] {
  const filtered = filterExperimentItems(items, filter, articleSlugs);

  if (filter !== "all") {
    const displayCategory: ExperimentCategory =
      filter === "article" ? "article" : filter;

    return filtered.map((item) => ({
      item,
      displayCategory,
      instanceKey: item.slug,
    }));
  }

  const entries: ExperimentDisplayEntry<T>[] = [];

  for (const item of filtered) {
    const categories = getExperimentCategories(item.slug);

    for (const category of EXPERIMENT_CATEGORY_PRIORITY) {
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

/** Hard layout rules per category — aspect ratio + grid width. */
export const EXPERIMENT_CATEGORY_LAYOUT: Record<
  ExperimentCategory,
  { aspectRatio: string; span: string; aspectClass: string }
> = {
  "motion-graphic": {
    aspectRatio: "16 / 9",
    aspectClass: "aspect-video",
    span: "md:col-span-2 md:row-span-1",
  },
  illustration: {
    aspectRatio: "3 / 4",
    aspectClass: "aspect-[3/4]",
    span: "md:col-span-1 md:row-span-1",
  },
  article: {
    aspectRatio: "3 / 2",
    aspectClass: "aspect-[3/2]",
    span: "md:col-span-1 md:row-span-1",
  },
  "ai-experiment": {
    aspectRatio: "3 / 2",
    aspectClass: "aspect-[3/2]",
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
    return filter === "article" ? "article" : filter;
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
): string {
  return EXPERIMENT_CATEGORY_LAYOUT[category].aspectClass;
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

/** Illustration and motion graphic containers are media-only — no links or CTAs. */
export function shouldDisableExperimentNavigation(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): boolean {
  const category = getExperimentDisplayCategory(slug, filter, displayCategory);
  return category === "illustration" || category === "motion-graphic";
}

export function shouldHideExperimentCta(
  filter: ExperimentFilterId,
  slug: string,
  displayCategory?: ExperimentCategory,
): boolean {
  return shouldDisableExperimentNavigation(filter, slug, displayCategory);
}

export function getExperimentCtaLabel(
  filter: ExperimentFilterId,
  slug: string,
  articleSlugs: string[] = [],
  displayCategory?: ExperimentCategory,
): string | null {
  const category = getExperimentDisplayCategory(slug, filter, displayCategory);

  if (category === "illustration" || category === "motion-graphic") {
    return null;
  }

  if (category === "article") return "Read Essay";
  if (category === "ai-experiment") return "Try Now";

  if (filter === "article") return "Read Essay";
  if (filter === "ai-experiment") return "Try Now";

  return articleSlugs.includes(slug) ? "Read Essay" : "Try Now";
}


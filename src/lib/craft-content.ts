export type CraftCta = "View Prototype" | "Read Essay" | "View Production";

export interface CraftItem {
  slug: string;
  title: string;
  date: string;
  previewClass: string;
  aspectRatio?: string;
  theme?: "light" | "dark";
  metaPosition?: "top" | "bottom";
  cta?: CraftCta;
  external?: boolean;
  href?: string;
}

export interface CraftArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface CraftArticle {
  slug: string;
  title: string;
  date?: string;
  sections: CraftArticleSection[];
}

export interface CraftSection {
  id: string;
  title: string;
  href: string;
  description: string;
  items: CraftItem[];
  articles: Record<string, CraftArticle>;
}

/** Unmounted craft galleries — kept for `article-pages` fallback typing only. */
export const CRAFT_SECTIONS: Record<string, CraftSection> = {};

export const SECTION_IDS = Object.keys(CRAFT_SECTIONS) as Array<
  keyof typeof CRAFT_SECTIONS
>;

export function getCraftSection(id: string): CraftSection | undefined {
  return CRAFT_SECTIONS[id];
}

export function getArticleSlugs(sectionId: string): string[] {
  const section = getCraftSection(sectionId);
  if (!section) return [];
  return Object.keys(section.articles);
}

export function getAdjacentArticles(sectionId: string, slug: string) {
  const section = getCraftSection(sectionId);
  if (!section) return { prev: null, next: null };

  const slugs = section.items
    .filter((item) => section.articles[item.slug])
    .map((item) => item.slug);
  const index = slugs.indexOf(slug);

  return {
    prev: index > 0 ? slugs[index - 1] : null,
    next: index >= 0 && index < slugs.length - 1 ? slugs[index + 1] : null,
  };
}

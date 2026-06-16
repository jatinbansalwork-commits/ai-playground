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
  paragraphs?: string[];
  blocks?: CraftArticleBlock[];
}

export interface CraftArticleChecklistCategory {
  title: string;
  questions: string[];
}

export type CraftArticleProcessStepBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "chips"; items: string[] }
  | {
      type: "image";
      src?: string;
      alt?: string;
      aspect?: "video" | "natural";
    };

export interface CraftArticleProcessStep {
  title: string;
  body: CraftArticleProcessStepBlock[];
}

export type CraftArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "divider" }
  | { type: "list"; items: string[]; variant?: "bullets" | "chips" }
  | {
      type: "checklist-table";
      categories: CraftArticleChecklistCategory[];
    }
  | {
      type: "process-steps";
      steps: CraftArticleProcessStep[];
    }
  | {
      type: "workflow-flow";
      steps: string[];
    }
  | {
      type: "image";
      src?: string;
      alt?: string;
      caption?: string;
      aspect?: "video" | "natural";
    };

export function getArticleSectionBlocks(
  section: CraftArticleSection,
): CraftArticleBlock[] {
  if (section.blocks?.length) return section.blocks;

  return (section.paragraphs ?? []).map((text) => ({
    type: "paragraph" as const,
    text,
  }));
}

export function getArticleExcerptText(
  sections: CraftArticleSection[],
  maxLength = 180,
): string {
  const firstParagraph = sections
    .flatMap((section) => getArticleSectionBlocks(section))
    .find((block) => block.type === "paragraph");

  if (!firstParagraph || firstParagraph.type !== "paragraph") return "";

  if (firstParagraph.text.length <= maxLength) return firstParagraph.text;
  return `${firstParagraph.text.slice(0, maxLength).trimEnd()}…`;
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
  /** Gallery back link — defaults to `href` when omitted. */
  backHref?: string;
  backLabel?: string;
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

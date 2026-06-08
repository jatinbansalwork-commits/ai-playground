import { CRAFT_PREVIEW } from "@/lib/craft-colors";
import { ROUTES } from "@/lib/constants";

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

const MODELS_ITEMS: CraftItem[] = [
  {
    slug: "inference-v3",
    title: "Inference v3.2",
    date: "June 2026",
    previewClass: CRAFT_PREVIEW.blue,
    cta: "View Production",
  },
  {
    slug: "latency-bench",
    title: "Latency Bench",
    date: "May 2026",
    previewClass: CRAFT_PREVIEW.graySoft,
    cta: "View Prototype",
  },
  {
    slug: "token-stream",
    title: "Token Stream",
    date: "April 2026",
    previewClass: CRAFT_PREVIEW.dark,
    cta: "View Prototype",
  },
];

const ARCHIVE_ITEMS: CraftItem[] = [
  {
    slug: "playground-v1",
    title: "Playground v1",
    date: "January 2026",
    previewClass: CRAFT_PREVIEW.grayLight,
    cta: "View Production",
  },
  {
    slug: "vertical-stack",
    title: "Vertical Stack",
    date: "December 2025",
    previewClass: CRAFT_PREVIEW.grayMid,
    cta: "Read Essay",
  },
];

export const CRAFT_SECTIONS: Record<string, CraftSection> = {
  models: {
    id: "models",
    title: "Models",
    href: ROUTES.recentWork,
    description: "Model interfaces and inference tooling.",
    items: MODELS_ITEMS,
    articles: {},
  },
  archive: {
    id: "archive",
    title: "Me",
    href: "/archive",
    description: "Previous iterations and retired experiments.",
    items: ARCHIVE_ITEMS,
    articles: {},
  },
};

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

import { CRAFT_PREVIEW } from "@/lib/craft-colors";
import { ROUTES, SITE_NAME } from "@/lib/constants";
import type { CraftSection } from "@/lib/craft-content";
import type { ExperimentCategory } from "@/lib/experiments-filters";
import type { ExperimentMedia } from "@/lib/experiment-media";
import { EXPERIMENT_CDN_MEDIA } from "@/lib/asset-cdn";

type ExperimentMediaInput =
  | string
  | (ExperimentMedia & { src: string })
  | Partial<Record<ExperimentCategory, string | ExperimentMedia>>;

export interface ExperimentArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface ExperimentRegistryEntry {
  /** URL-safe id — also used for media filenames and article routes. */
  slug: string;
  /** Sandbox label shown on the card. */
  title: string;
  /**
   * Filter tabs this card appears on.
   * article · ai-experiment · illustration · motion-graphic
   */
  categories: ExperimentCategory[];
  /**
   * Preview media — live Vercel Blob CDN URLs from `EXPERIMENT_CDN_MEDIA`.
   */
  media?: ExperimentMediaInput;
  /** Essay page content — enables "Read Essay" when present. */
  article?: {
    date?: string;
    sections: ExperimentArticleSection[];
  };
  external?: boolean;
  href?: string;
}

/** Lightweight row consumed by the /fun bento grid — not shared with projects. */
export interface ExperimentGalleryItem {
  slug: string;
  title: string;
  date: string;
  external?: boolean;
  href?: string;
}

export const EXPERIMENTS_PAGE = {
  title: "Experiments",
  description: "Interaction prototypes and interface studies.",
  href: ROUTES.fun,
} as const;

/**
 * ═══════════════════════════════════════════════════════════════════
 *  EXPERIMENTS REGISTRY — sandbox / creative prototypes only
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Professional case studies live in `projects-registry.ts`.
 *
 *  Categories control filter tabs + container shape:
 *    motion-graphic → 16:9 full width, no link, no CTA
 *    illustration   → 3:4 half width, no link, no CTA
 *    article        → 3:2 full width, Read Essay CTA
 *    ai-experiment  → 3:2 full width, Try Now CTA
 */
export const EXPERIMENTS_REGISTRY: ExperimentRegistryEntry[] = [
  {
    slug: "scroll-slider",
    title: "FriendCaptcha",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["scroll-slider"],
    external: true,
    href: "https://friend-captcha.vercel.app/",
  },
  {
    slug: "wireframe-mode",
    title: "Wireframe Mode",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["wireframe-mode"],
  },
  {
    slug: "minimap-tracker",
    title: "Minimap Tracker",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["minimap-tracker"],
  },
  {
    slug: "clip-reveal",
    title: "Focus Mode",
    categories: ["ai-experiment", "motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["clip-reveal"],
    external: true,
    href: "https://focus-mode-ten.vercel.app/",
  },
  {
    slug: "spring-physics",
    title: "Miner Gift",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["spring-physics"],
    external: true,
    href: "https://miner-seven-rho.vercel.app/",
  },
  {
    slug: "ghost-spacer",
    title: "Lock in Police",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["ghost-spacer"],
    external: true,
    href: "https://lock-in-police.vercel.app/",
  },
  {
    slug: "click-sound",
    title: "DoodleLab",
    categories: ["ai-experiment"],
    media: EXPERIMENT_CDN_MEDIA["click-sound"],
    external: true,
    href: "https://doodlelab-ai.vercel.app/",
  },
  {
    slug: "illustration-gold-jar",
    title: "Gold Jar",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-gold-jar"],
  },
  {
    slug: "illustration-ticket-mark",
    title: "Ticket Mark",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-ticket-mark"],
  },
  {
    slug: "illustration-coin-stack",
    title: "Coin Stack",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-coin-stack"],
  },
  {
    slug: "illustration-pass-stub",
    title: "Pass Stub",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-pass-stub"],
  },
  {
    slug: "illustration-savings-vault",
    title: "Savings Vault",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-savings-vault"],
  },
  {
    slug: "illustration-brand-ticket",
    title: "Brand Ticket",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-brand-ticket"],
  },
  {
    slug: "illustration-slot-01",
    title: "Illustration Slot 01",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-slot-01"],
  },
  {
    slug: "illustration-slot-02",
    title: "Illustration Slot 02",
    categories: ["illustration"],
    media: EXPERIMENT_CDN_MEDIA["illustration-slot-02"],
  },
  {
    slug: "motion-graphic-slot-01",
    title: "Motion Graphic Slot 01",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-01"],
  },
  {
    slug: "motion-graphic-slot-02",
    title: "Motion Graphic Slot 02",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-02"],
  },
  {
    slug: "motion-graphic-slot-03",
    title: "Motion Graphic Slot 03",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-03"],
  },
  {
    slug: "motion-graphic-slot-04",
    title: "Motion Graphic Slot 04",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-04"],
  },
  {
    slug: "motion-graphic-slot-05",
    title: "Motion Graphic Slot 05",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-05"],
  },
  {
    slug: "motion-graphic-slot-07",
    title: "Motion Graphic Slot 07",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-07"],
  },
  {
    slug: "motion-graphic-slot-08",
    title: "Motion Graphic Slot 08",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-08"],
  },
  {
    slug: "motion-graphic-slot-09",
    title: "Motion Graphic Slot 09",
    categories: ["motion-graphic"],
    media: EXPERIMENT_CDN_MEDIA["motion-graphic-slot-09"],
  },
];

/** Slugs in gallery order — derived from registry. */
export const EXPERIMENT_SLUG_ORDER = EXPERIMENTS_REGISTRY.map(
  (entry) => entry.slug,
);

export function getExperimentRegistryEntry(
  slug: string,
): ExperimentRegistryEntry | undefined {
  return EXPERIMENTS_REGISTRY.find((entry) => entry.slug === slug);
}

export function getExperimentCategories(slug: string): ExperimentCategory[] {
  return getExperimentRegistryEntry(slug)?.categories ?? ["ai-experiment"];
}

export function getExperimentGalleryItems(): ExperimentGalleryItem[] {
  return EXPERIMENTS_REGISTRY.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    date: entry.article?.date ?? "",
    external: entry.external,
    href: entry.href,
  }));
}

export function getExperimentArticleSlugs(): string[] {
  return EXPERIMENTS_REGISTRY.filter((entry) => entry.article).map(
    (entry) => entry.slug,
  );
}

export function getExperimentArticle(slug: string) {
  const entry = getExperimentRegistryEntry(slug);
  if (!entry?.article) return undefined;

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.article.date,
    sections: entry.article.sections,
  };
}

export function getAdjacentExperimentArticles(slug: string) {
  const slugs = getExperimentArticleSlugs();
  const index = slugs.indexOf(slug);

  return {
    prev: index > 0 ? slugs[index - 1]! : null,
    next: index >= 0 && index < slugs.length - 1 ? slugs[index + 1]! : null,
  };
}

/** Section shell for experiment essay pages — isolated from craft/projects. */
export function getExperimentsArticleSection(): CraftSection {
  return {
    id: "experiments",
    title: EXPERIMENTS_PAGE.title,
    href: EXPERIMENTS_PAGE.href,
    description: EXPERIMENTS_PAGE.description,
    items: getExperimentGalleryItems().map((item) => ({
      ...item,
      previewClass: CRAFT_PREVIEW.grayMid,
    })),
    articles: Object.fromEntries(
      getExperimentArticleSlugs()
        .map((slug) => {
          const article = getExperimentArticle(slug);
          return article ? [slug, article] : null;
        })
        .filter((entry): entry is [string, NonNullable<ReturnType<typeof getExperimentArticle>>] =>
          entry !== null,
        ),
    ),
  };
}

export const EXPERIMENTS_METADATA = {
  title: `${EXPERIMENTS_PAGE.title} · ${SITE_NAME}`,
  description: EXPERIMENTS_PAGE.description,
} as const;

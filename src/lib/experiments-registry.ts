import type { ExperimentCategory } from "@/lib/experiments-filters";
import type { ExperimentMedia } from "@/lib/experiment-media";

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
  /** Label shown on the card. */
  title: string;
  /**
   * Filter tabs this card appears on.
   * article · ai-experiment · illustration · motion-graphic
   */
  categories: ExperimentCategory[];
  /**
   * Preview media (optional).
   * Drop files in public/assets/experiments/ then set path or URL here.
   */
  media?: ExperimentMediaInput;
  /** Essay page content — enables "Read Essay" when present. */
  article?: {
    date: string;
    sections: ExperimentArticleSection[];
  };
  external?: boolean;
  href?: string;
}

/**
 * ═══════════════════════════════════════════════════════════════════
 *  EXPERIMENTS REGISTRY — edit this file only
 * ═══════════════════════════════════════════════════════════════════
 *
 *  ADD a container → copy a block below, set slug / title / categories
 *  REMOVE a container → delete its block
 *  REORDER on All → move blocks up or down (top = first)
 *
 *  Media (optional):
 *    media: "/assets/experiments/my-slug.jpg"
 *    media: "/assets/experiments/my-slug.mp4"
 *    media: "https://example.com/clip.gif"
 *
 *  Categories control filter tabs + container shape:
 *    motion-graphic → 16:9 full width, no link
 *    illustration   → 3:4 half width, no link
 *    article        → 3:2 half width (half illustration height), Read Essay if article set
 *    ai-experiment  → 3:2 half width (half illustration height), Try Now
 */
export const EXPERIMENTS_REGISTRY: ExperimentRegistryEntry[] = [
  {
    slug: "scroll-slider",
    title: "Design Polling",
    categories: ["article", "ai-experiment", "motion-graphic"],
    // media: "/assets/experiments/scroll-slider.mp4",
    article: {
      date: "June 2026",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "The index experience maps vertical scroll to horizontal frame translation across the homepage canvas.",
            "A tall ghost spacer creates scroll range while the visible canvas stays fixed. Scroll position maps linearly to track offset across eight frames.",
          ],
        },
        {
          id: "scroll-range",
          title: "Scroll Range",
          paragraphs: [
            "Seven steps of 744px yield 5,208px total scroll. Each step snaps to a frame index with spring physics (600/80 stiffness/damping).",
            "Both scrollLeft and scrollTop stay synced for diagonal 2D scroll surfaces.",
          ],
        },
        {
          id: "scale",
          title: "Scale",
          paragraphs: [
            "Canvas scale fits the viewport on load, then shrinks toward 0.6 as scroll depth increases using base − scroll × 0.0001.",
          ],
        },
      ],
    },
  },
  {
    slug: "wireframe-mode",
    title: "Saltbot",
    categories: ["ai-experiment", "illustration"],
    // media: "/assets/experiments/wireframe-mode.jpg",
    article: {
      date: "May 2026",
      sections: [
        {
          id: "debug-toggle",
          title: "Debug Toggle",
          paragraphs: [
            "The center cross toggles wireframe mode — transparent fills, 1px strokes, all frames visible at once.",
            "On dark backgrounds, strokes switch to white for contrast.",
          ],
        },
      ],
    },
  },
  {
    slug: "minimap-tracker",
    title: "Saltmine-Sync",
    categories: ["ai-experiment", "motion-graphic"],
    // media: "/assets/experiments/minimap-tracker.mp4",
  },
  {
    slug: "clip-reveal",
    title: "Clip Reveal Labels",
    categories: ["ai-experiment", "motion-graphic"],
    // media: "/assets/experiments/clip-reveal.mp4",
  },
  {
    slug: "spring-physics",
    title: "Kalash Rewards",
    categories: ["article", "ai-experiment"],
    // media: "/assets/experiments/spring-physics.jpg",
  },
  {
    slug: "ghost-spacer",
    title: "Ghost Spacer",
    categories: ["ai-experiment"],
    // media: "/assets/experiments/ghost-spacer.jpg",
  },
  {
    slug: "click-sound",
    title: "Piggy Mutual Fund",
    categories: ["ai-experiment"],
    // media: "/assets/experiments/click-sound.mp4",
  },
  {
    slug: "scale-on-scroll",
    title: "Scale on Scroll",
    categories: ["ai-experiment", "motion-graphic"],
    // media: "/assets/experiments/scale-on-scroll.mp4",
  },
  {
    slug: "blend-circle",
    title: "Blend Circle",
    categories: ["ai-experiment", "illustration", "motion-graphic"],
    // media: {
    //   illustration: "/assets/experiments/blend-circle.jpg",
    //   "motion-graphic": "/assets/experiments/blend-circle.mp4",
    // },
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

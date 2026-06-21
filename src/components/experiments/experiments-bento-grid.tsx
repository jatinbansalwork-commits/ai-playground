"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import type {
  ExperimentDisplayEntry,
  ExperimentFilterId,
} from "@/lib/experiments-filters";
import { getExperimentCtaLabel } from "@/lib/experiments-filters";
import { getExperimentGridSpanClass } from "@/lib/experiments-grid-layout";
import { useExperimentsGrid } from "@/hooks/use-experiments-grid";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springBentoHover } from "@/lib/spring";
import { ExperimentsBentoCard } from "@/components/experiments/experiments-bento-card";

interface ExperimentsBentoGridProps {
  /** Source collection — any length from registry, CMS, or API. */
  items: ExperimentGalleryItem[];
  sectionHref: string;
  articleSlugs?: string[];
  filter?: ExperimentFilterId;
  shuffleSeed?: number;
  preserveItemOrder?: boolean;
  /** Landmark label for the grid region (1.3.1). */
  sectionLabel?: string;
  sectionHeadingId?: string;
  /** When false, omit grid horizontal padding (page shell already pads). Default true. */
  contentPadding?: boolean;
  /** Extra classes on the grid root. */
  className?: string;
}

export function ExperimentsBentoGrid({
  items,
  sectionHref,
  articleSlugs = [],
  filter = "all",
  shuffleSeed = 0,
  preserveItemOrder = false,
  sectionLabel,
  sectionHeadingId = "experiments-grid-heading",
  contentPadding = true,
  className = "",
}: ExperimentsBentoGridProps) {
  const reducedMotion = useReducedMotion();
  const articleSet = new Set(articleSlugs);
  const { randomizedCards } = useExperimentsGrid({
    items,
    filter,
    articleSlugs,
    shuffleSeed,
    preserveItemOrder,
  });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const leftColumnCards = useMemo(
    () => randomizedCards.filter((_, idx) => idx % 2 === 0),
    [randomizedCards],
  );

  const rightColumnCards = useMemo(
    () => randomizedCards.filter((_, idx) => idx % 2 !== 0),
    [randomizedCards],
  );

  function renderCard(entry: ExperimentDisplayEntry<ExperimentGalleryItem>) {
    const { item, displayCategory, instanceKey } = entry;
    const isDimmed = hoveredKey !== null && hoveredKey !== instanceKey;

    return (
      <motion.div
        key={instanceKey}
        className={`min-w-0 ${getExperimentGridSpanClass(filter, displayCategory)}`}
        animate={{ opacity: reducedMotion || !isDimmed ? 1 : 0.4 }}
        transition={reducedMotion ? { duration: 0 } : springBentoHover}
        onHoverStart={
          reducedMotion ? undefined : () => setHoveredKey(instanceKey)
        }
        onHoverEnd={reducedMotion ? undefined : () => setHoveredKey(null)}
      >
        <ExperimentsBentoCard
          item={item}
          sectionHref={sectionHref}
          hasArticle={articleSet.has(item.slug)}
          filter={filter}
          displayCategory={displayCategory}
          articleSlugs={articleSlugs}
          ctaLabel={getExperimentCtaLabel(
            filter,
            item.slug,
            articleSlugs,
            displayCategory,
          )}
        />
      </motion.div>
    );
  }

  const embeddedInPageShell = !contentPadding;

  const grid = (
    <div
      className={[
        "experiments-bento-grid flex w-full flex-col items-start justify-center gap-6 md:flex-row",
        embeddedInPageShell ? "" : "mx-auto max-w-5xl",
        contentPadding ? "px-4" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {leftColumnCards.map((entry) => renderCard(entry))}
      </div>

      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {rightColumnCards.map((entry) => renderCard(entry))}
      </div>
    </div>
  );

  if (!sectionLabel) return grid;

  return (
    <section aria-labelledby={sectionHeadingId}>
      <h2 id={sectionHeadingId} className="sr-only">
        {sectionLabel}
      </h2>
      {grid}
    </section>
  );
}

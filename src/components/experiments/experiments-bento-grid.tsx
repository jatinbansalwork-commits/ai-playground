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
import { springBentoHover } from "@/lib/spring";
import { ExperimentsBentoCard } from "@/components/experiments/experiments-bento-card";

interface ExperimentsBentoGridProps {
  /** Source collection — any length from registry, CMS, or API. */
  items: ExperimentGalleryItem[];
  sectionHref: string;
  articleSlugs?: string[];
  filter?: ExperimentFilterId;
  shuffleSeed?: number;
}

export function ExperimentsBentoGrid({
  items,
  sectionHref,
  articleSlugs = [],
  filter = "all",
  shuffleSeed = 0,
}: ExperimentsBentoGridProps) {
  const articleSet = new Set(articleSlugs);
  const { randomizedCards } = useExperimentsGrid({
    items,
    filter,
    articleSlugs,
    shuffleSeed,
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
        animate={{ opacity: isDimmed ? 0.4 : 1 }}
        transition={springBentoHover}
        onHoverStart={() => setHoveredKey(instanceKey)}
        onHoverEnd={() => setHoveredKey(null)}
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

  return (
    <div className="experiments-bento-grid mx-auto flex w-full max-w-5xl flex-col items-start justify-center gap-6 px-4 md:flex-row">
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {leftColumnCards.map((entry) => renderCard(entry))}
      </div>

      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {rightColumnCards.map((entry) => renderCard(entry))}
      </div>
    </div>
  );
}

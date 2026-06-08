"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CraftItem } from "@/lib/craft-content";
import type {
  ExperimentDisplayEntry,
  ExperimentFilterId,
} from "@/lib/experiments-filters";
import {
  getExperimentCtaLabel,
  shouldHideExperimentCta,
} from "@/lib/experiments-filters";
import { useExperimentsDualRail } from "@/hooks/use-experiments-dual-rail";
import { springBentoHover } from "@/lib/spring";
import { ExperimentsBentoCard } from "@/components/experiments/experiments-bento-card";

interface ExperimentsBentoGridProps {
  /** Source collection — any length from registry, CMS, or API. */
  items: CraftItem[];
  sectionHref: string;
  articleSlugs?: string[];
  filter?: ExperimentFilterId;
}

export function ExperimentsBentoGrid({
  items,
  sectionHref,
  articleSlugs = [],
  filter = "all",
}: ExperimentsBentoGridProps) {
  const articleSet = new Set(articleSlugs);
  const { leftRailData, rightRailData } = useExperimentsDualRail({
    items,
    filter,
    articleSlugs,
  });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  function renderCard(entry: ExperimentDisplayEntry<CraftItem>) {
    const { item, displayCategory, instanceKey } = entry;
    const showCtaSlot = !shouldHideExperimentCta(
      filter,
      item.slug,
      displayCategory,
    );
    const isDimmed = hoveredKey !== null && hoveredKey !== instanceKey;

    return (
      <motion.div
        key={instanceKey}
        className="min-w-0 w-full"
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
          ctaLabel={getExperimentCtaLabel(
            filter,
            item.slug,
            articleSlugs,
            displayCategory,
          )}
          showCtaSlot={showCtaSlot}
        />
      </motion.div>
    );
  }

  return (
    <div className="experiments-bento-grid mx-auto w-full max-w-5xl">
      <div className="flex w-full flex-col items-start gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {leftRailData.map((entry) => renderCard(entry))}
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {rightRailData.map((entry) => renderCard(entry))}
        </div>
      </div>
    </div>
  );
}

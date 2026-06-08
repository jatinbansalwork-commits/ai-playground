"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import {
  getExperimentDisplayEntries,
  type ExperimentDisplayEntry,
} from "@/lib/experiments-filters";
import { sortExperimentsBentoItems } from "@/lib/experiments-bento";
import { splitIntoDualRails } from "@/lib/experiments-dual-rail";

interface UseExperimentsDualRailOptions<T extends { slug: string }> {
  items: T[];
  filter: ExperimentFilterId;
  articleSlugs?: string[];
}

interface UseExperimentsDualRailResult<T extends { slug: string }> {
  randomizedCards: ExperimentDisplayEntry<T>[];
  leftRailData: ExperimentDisplayEntry<T>[];
  rightRailData: ExperimentDisplayEntry<T>[];
}

/**
 * Resolves any-length card collections, shuffles client-side, and splits into twin rails.
 */
export function useExperimentsDualRail<T extends { slug: string }>({
  items,
  filter,
  articleSlugs = [],
}: UseExperimentsDualRailOptions<T>): UseExperimentsDualRailResult<T> {
  const [randomizedCards, setRandomizedCards] = useState<
    ExperimentDisplayEntry<T>[]
  >([]);

  const articleSlugsKey = articleSlugs.join(",");

  const allCardsCollection = useMemo(() => {
    const orderedItems = sortExperimentsBentoItems(items);
    return getExperimentDisplayEntries(orderedItems, "all", articleSlugs);
  }, [items, articleSlugsKey]);

  useEffect(() => {
    let currentSet: ExperimentDisplayEntry<T>[];

    if (filter === "all") {
      currentSet = allCardsCollection;
    } else if (filter === "article") {
      const orderedItems = sortExperimentsBentoItems(items);
      currentSet = getExperimentDisplayEntries(
        orderedItems,
        "article",
        articleSlugs,
      );
    } else {
      currentSet = allCardsCollection.filter(
        (entry) => entry.displayCategory === filter,
      );
    }

    const shuffled = [...currentSet].sort(() => Math.random() - 0.5);
    setRandomizedCards(shuffled);
  }, [filter, allCardsCollection, items, articleSlugsKey]);

  const { leftRail, rightRail } = useMemo(
    () => splitIntoDualRails(randomizedCards),
    [randomizedCards],
  );

  return {
    randomizedCards,
    leftRailData: leftRail,
    rightRailData: rightRail,
  };
}

"use client";

import { useMemo } from "react";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import {
  getExperimentDisplayEntries,
  type ExperimentDisplayEntry,
} from "@/lib/experiments-filters";
import { sortExperimentsBentoItems } from "@/lib/experiments-bento";

interface UseExperimentsGridOptions<T extends { slug: string }> {
  items: T[];
  filter: ExperimentFilterId;
  articleSlugs?: string[];
}

interface UseExperimentsGridResult<T extends { slug: string }> {
  randomizedCards: ExperimentDisplayEntry<T>[];
}

function hashInstanceKey(seed: string, instanceKey: string): number {
  const value = `${seed}::${instanceKey}`;
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return hash;
}

/** Stable pseudo-random order — pure, hydration-safe, scales to large collections. */
function shuffleDisplayEntries<T extends { slug: string }>(
  entries: ExperimentDisplayEntry<T>[],
  seed: string,
): ExperimentDisplayEntry<T>[] {
  return [...entries].sort(
    (left, right) =>
      hashInstanceKey(seed, left.instanceKey) -
      hashInstanceKey(seed, right.instanceKey),
  );
}

/** Resolves any-length card collections and shuffles client-side. */
export function useExperimentsGrid<T extends { slug: string }>({
  items,
  filter,
  articleSlugs = [],
}: UseExperimentsGridOptions<T>): UseExperimentsGridResult<T> {
  const allCardsCollection = useMemo(() => {
    const orderedItems = sortExperimentsBentoItems(items);
    return getExperimentDisplayEntries(orderedItems, "all", articleSlugs);
  }, [items, articleSlugs]);

  const filteredCards = useMemo(() => {
    if (filter === "all") return allCardsCollection;

    if (filter === "article") {
      const orderedItems = sortExperimentsBentoItems(items);
      return getExperimentDisplayEntries(orderedItems, "article", articleSlugs);
    }

    return allCardsCollection.filter(
      (entry) => entry.displayCategory === filter,
    );
  }, [filter, allCardsCollection, items, articleSlugs]);

  const collectionKey = useMemo(
    () =>
      `${filter}::${filteredCards.map((entry) => entry.instanceKey).join("|")}`,
    [filter, filteredCards],
  );

  const randomizedCards = useMemo(
    () => shuffleDisplayEntries(filteredCards, collectionKey),
    [collectionKey, filteredCards],
  );

  return {
    randomizedCards,
  };
}

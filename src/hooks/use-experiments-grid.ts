"use client";

import { useMemo } from "react";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import {
  getExperimentDisplayEntries,
  type ExperimentDisplayEntry,
} from "@/lib/experiments-filters";
import { sortExperimentsBentoItems } from "@/lib/experiments-bento";
import { shuffleWithSeed } from "@/lib/shuffle-seed";

interface UseExperimentsGridOptions<T extends { slug: string }> {
  items: T[];
  filter: ExperimentFilterId;
  articleSlugs?: string[];
  /** Changes re-order cards via seeded Fisher–Yates shuffle. `0` keeps registry order. */
  shuffleSeed?: number;
  /** Keep `items` order instead of sorting by registry rank. */
  preserveItemOrder?: boolean;
}

interface UseExperimentsGridResult<T extends { slug: string }> {
  randomizedCards: ExperimentDisplayEntry<T>[];
}

/** Resolves any-length card collections and shuffles client-side. */
export function useExperimentsGrid<T extends { slug: string }>({
  items,
  filter,
  articleSlugs = [],
  shuffleSeed = 0,
  preserveItemOrder = false,
}: UseExperimentsGridOptions<T>): UseExperimentsGridResult<T> {
  const allCardsCollection = useMemo(() => {
    const orderedItems = preserveItemOrder
      ? items
      : sortExperimentsBentoItems(items);
    return getExperimentDisplayEntries(orderedItems, "all");
  }, [items, preserveItemOrder]);

  const filteredCards = useMemo(() => {
    if (filter === "all") return allCardsCollection;

    const orderedItems = preserveItemOrder
      ? items
      : sortExperimentsBentoItems(items);
    return getExperimentDisplayEntries(orderedItems, filter);
  }, [filter, items, allCardsCollection, preserveItemOrder]);

  const randomizedCards = useMemo(() => {
    if (shuffleSeed === 0) return filteredCards;

    const seed = shuffleSeed ^ filteredCards.length;
    return shuffleWithSeed(filteredCards, seed);
  }, [filteredCards, shuffleSeed]);

  return {
    randomizedCards,
  };
}

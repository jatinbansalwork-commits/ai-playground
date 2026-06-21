"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import {
  EXPERIMENTS_GALLERY_FILTER_PARAM,
  parseExperimentFilterId,
  type ExperimentFilterId,
} from "@/lib/experiments-filters";
import { ExperimentsBentoGrid } from "@/components/experiments/experiments-bento-grid";
import { ExperimentsFilterBar } from "@/components/experiments/experiments-filter-bar";
import { useCraftPageAnalytics } from "@/hooks/use-craft-page-analytics";
import { trackCraftFilter } from "@/lib/analytics";
import { randomShuffleSeed } from "@/lib/shuffle-seed";

interface ExperimentsGalleryClientProps {
  items: ExperimentGalleryItem[];
  sectionHref: string;
  articleSlugs: string[];
}

export function ExperimentsGalleryClient({
  items,
  sectionHref,
  articleSlugs,
}: ExperimentsGalleryClientProps) {
  return (
    <Suspense fallback={null}>
      <ExperimentsGalleryClientInner
        items={items}
        sectionHref={sectionHref}
        articleSlugs={articleSlugs}
      />
    </Suspense>
  );
}

function ExperimentsGalleryClientInner({
  items,
  sectionHref,
  articleSlugs,
}: ExperimentsGalleryClientProps) {
  useCraftPageAnalytics();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<ExperimentFilterId>(() =>
    parseExperimentFilterId(searchParams.get(EXPERIMENTS_GALLERY_FILTER_PARAM)),
  );
  const [shuffleSeed, setShuffleSeed] = useState(0);

  function handleFilterChange(nextFilter: ExperimentFilterId): void {
    if (nextFilter !== filter) {
      trackCraftFilter(nextFilter);
    }
    setFilter(nextFilter);
  }

  useEffect(() => {
    setFilter(
      parseExperimentFilterId(searchParams.get(EXPERIMENTS_GALLERY_FILTER_PARAM)),
    );
  }, [searchParams]);

  useEffect(() => {
    setShuffleSeed(randomShuffleSeed());
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <h1 className="sr-only">Craft</h1>
      <div className="mb-6 flex justify-center">
        <ExperimentsFilterBar value={filter} onChange={handleFilterChange} />
      </div>

      <ExperimentsBentoGrid
        items={items}
        sectionHref={sectionHref}
        articleSlugs={articleSlugs}
        filter={filter}
        shuffleSeed={shuffleSeed}
      />
    </div>
  );
}

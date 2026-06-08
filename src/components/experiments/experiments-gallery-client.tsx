"use client";

import { useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import { ExperimentsBentoGrid } from "@/components/experiments/experiments-bento-grid";
import { ExperimentsFilterBar } from "@/components/experiments/experiments-filter-bar";

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
  const [filter, setFilter] = useState<ExperimentFilterId>("all");

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <h1 className="sr-only">Fun</h1>
      <div className="mb-6 flex justify-center">
        <ExperimentsFilterBar value={filter} onChange={setFilter} />
      </div>

      <ExperimentsBentoGrid
        items={items}
        sectionHref={sectionHref}
        articleSlugs={articleSlugs}
        filter={filter}
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import type { CraftItem } from "@/lib/craft-content";
import { SITE_NAME } from "@/lib/constants";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import { ExperimentsBentoGrid } from "@/components/experiments/experiments-bento-grid";
import { ExperimentsFilterBar } from "@/components/experiments/experiments-filter-bar";

interface ExperimentsGalleryClientProps {
  items: CraftItem[];
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
    <main
      data-sheet="experiments"
      className="relative min-h-screen bg-[#1a1a1a] text-white"
    >
      <Link
        href="/"
        aria-label={`Back to ${SITE_NAME}`}
        className="absolute top-8 left-8 z-20 flex size-12 items-center justify-center text-4xl leading-none text-neutral-500 transition-colors hover:text-white md:left-12"
      >
        ←
      </Link>

      <div className="mx-auto max-w-6xl px-8 pt-24 pb-16">
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
    </main>
  );
}

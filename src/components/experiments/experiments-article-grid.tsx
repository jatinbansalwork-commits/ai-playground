"use client";

import { useMemo } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { hasExperimentArticle } from "@/lib/experiments-registry";
import { sortExperimentsBentoItems } from "@/lib/experiments-bento";
import { ExperimentsArticleCard } from "@/components/experiments/experiments-article-card";

interface ExperimentsArticleGridProps {
  items: ExperimentGalleryItem[];
  sectionHref: string;
}

export function ExperimentsArticleGrid({
  items,
  sectionHref,
}: ExperimentsArticleGridProps) {
  const articles = useMemo(
    () =>
      sortExperimentsBentoItems(items).filter((item) =>
        hasExperimentArticle(item.slug),
      ),
    [items],
  );

  if (articles.length === 0) {
    return (
      <p className="mx-auto max-w-2xl px-4 text-center text-sm text-neutral-400">
        Essays coming soon.
      </p>
    );
  }

  return (
    <div className="experiments-article-grid mx-auto flex w-full max-w-3xl flex-col gap-6 px-4">
      {articles.map((item) => (
        <ExperimentsArticleCard
          key={item.slug}
          item={item}
          sectionHref={sectionHref}
        />
      ))}
    </div>
  );
}

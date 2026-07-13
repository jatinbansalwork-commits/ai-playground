"use client";

import { CraftGrid } from "@/components/craft/craft-grid";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { useCraftPageAnalytics } from "@/hooks/use-craft-page-analytics";
import { CRAFT_PAGE_INTRO } from "@/lib/craft-page-data";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";

interface CraftPageProps {
  items: ExperimentGalleryItem[];
}

export function CraftPage({ items }: CraftPageProps) {
  useSubpageScrollReset();
  useCraftPageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="experiments"
      tabIndex={-1}
      className="craft-page ideas-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-background text-white"
    >
      <div className="craft-page__shell ideas-page__shell">
        <header className="craft-page__header ideas-page__header">
          <h1 className="craft-page__title ideas-page__title">
            {CRAFT_PAGE_INTRO.title}
          </h1>
          <p className="craft-page__lede ideas-page__lede">
            {CRAFT_PAGE_INTRO.description}
          </p>
        </header>

        <CraftGrid items={items} />
      </div>
    </main>
  );
}

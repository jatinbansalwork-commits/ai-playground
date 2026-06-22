"use client";

import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { CraftGrid } from "@/components/craft/craft-grid";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { useCraftPageAnalytics } from "@/hooks/use-craft-page-analytics";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
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
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Home")}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

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

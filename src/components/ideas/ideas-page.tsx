"use client";

import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { IdeasGrid } from "@/components/ideas/ideas-grid";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { useIdeasPageAnalytics } from "@/hooks/use-ideas-page-analytics";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { IDEAS_PAGE_INTRO } from "@/lib/ideas-page-data";
import { getIdeasGalleryItems } from "@/lib/experiments-registry";

const IDEAS_GALLERY_ITEMS = getIdeasGalleryItems();

export function IdeasPage() {
  useSubpageScrollReset();
  useIdeasPageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="ideas"
      tabIndex={-1}
      className="ideas-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-background text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Home")}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <div className="ideas-page__shell">
        <header className="ideas-page__header">
          <h1 className="ideas-page__title">{IDEAS_PAGE_INTRO.title}</h1>
          <p className="ideas-page__lede">{IDEAS_PAGE_INTRO.question}</p>
          <p className="ideas-page__lede">{IDEAS_PAGE_INTRO.answer}</p>
        </header>

        <IdeasGrid items={IDEAS_GALLERY_ITEMS} />
      </div>
    </main>
  );
}

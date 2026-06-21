"use client";

import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ExperimentsBentoGrid } from "@/components/experiments/experiments-bento-grid";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { useIdeasPageAnalytics } from "@/hooks/use-ideas-page-analytics";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { getIdeasGalleryItems } from "@/lib/experiments-registry";

const IDEAS_INTRO = {
  question:
    "Something I get asked a lot is: JB, why do you have so much time outside of work?",
  answer: "My answer is: I have no idea.",
} as const;

const IDEAS_EXPERIMENTS_HEADING_ID = "ideas-experiments-heading";

const IDEAS_GALLERY_ITEMS = getIdeasGalleryItems();

export function IdeasPage() {
  useSubpageScrollReset();
  useIdeasPageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="ideas"
      tabIndex={-1}
      className="ideas-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-[#1a1a1a] text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Home")}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <div className="mx-auto w-full max-w-6xl px-4 py-24 pb-32 md:px-8">
        <div
          className={`mb-10 w-full px-4 py-8 md:px-6 md:py-10 ${EXPERIMENTS_CARD.shell} rounded-[1.75rem]`}
        >
          <header>
            <h1 className="text-4xl font-normal tracking-tight text-white md:text-5xl">
              Some other things I do
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-300 md:text-lg">
              {IDEAS_INTRO.question}
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-300 md:text-lg">
              {IDEAS_INTRO.answer}
            </p>
          </header>
        </div>

        <ExperimentsBentoGrid
          items={IDEAS_GALLERY_ITEMS}
          sectionHref={ROUTES.ideas}
          filter="ai-experiment"
          preserveItemOrder
          sectionHeadingId={IDEAS_EXPERIMENTS_HEADING_ID}
          sectionLabel="Side projects and experiments"
          contentPadding={false}
        />
      </div>
    </main>
  );
}

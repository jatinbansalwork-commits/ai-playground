import { ExperimentsGalleryClient } from "@/components/experiments/experiments-gallery-client";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import {
  EXPERIMENTS_PAGE,
  getExperimentArticleSlugs,
  getExperimentGalleryItems,
} from "@/lib/experiments-registry";

export default function CraftPage() {
  return (
    <main
      id="main-content"
      data-sheet="experiments"
      className="fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-[#1a1a1a] text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-24 pt-24">
        <ExperimentsGalleryClient
          items={getExperimentGalleryItems()}
          sectionHref={EXPERIMENTS_PAGE.href}
          articleSlugs={getExperimentArticleSlugs()}
        />
      </div>
    </main>
  );
}

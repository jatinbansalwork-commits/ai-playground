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

export default function FunPage() {
  return (
    <main
      id="main-content"
      data-sheet="experiments"
      className="relative flex min-h-screen w-full flex-col items-center justify-start bg-[#1a1a1a] pt-24 pb-24 text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <ExperimentsGalleryClient
        items={getExperimentGalleryItems()}
        sectionHref={EXPERIMENTS_PAGE.href}
        articleSlugs={getExperimentArticleSlugs()}
      />
    </main>
  );
}

import { ExperimentsGalleryClient } from "@/components/experiments/experiments-gallery-client";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { BACK_LINK_CLASS } from "@/lib/a11y";
import { SITE_NAME } from "@/lib/constants";
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
        href="/"
        scroll={true}
        aria-label={`Back to ${SITE_NAME}`}
        className={`absolute top-8 left-8 z-50 md:top-12 md:left-12 ${BACK_LINK_CLASS}`}
      >
        ←
      </ScrollResetLink>

      <ExperimentsGalleryClient
        items={getExperimentGalleryItems()}
        sectionHref={EXPERIMENTS_PAGE.href}
        articleSlugs={getExperimentArticleSlugs()}
      />
    </main>
  );
}

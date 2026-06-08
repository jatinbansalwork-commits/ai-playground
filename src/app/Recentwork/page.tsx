import { CiscoCaseStudiesPage } from "@/components/models/cisco-platform-page";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { BACK_LINK_CLASS } from "@/lib/a11y";
import { SITE_NAME } from "@/lib/constants";

export default function RecentWorkPage() {
  return (
    <main
      id="main-content"
      data-sheet="models"
      className="relative flex min-h-screen w-full flex-col items-start justify-start bg-[#1a1a1a] px-8 pb-12 pt-24 text-white"
    >
      <ScrollResetLink
        href="/"
        scroll={true}
        aria-label={`Back to ${SITE_NAME}`}
        className={`absolute top-8 left-8 z-50 md:top-12 md:left-12 ${BACK_LINK_CLASS}`}
      >
        ←
      </ScrollResetLink>

      <CiscoCaseStudiesPage />
    </main>
  );
}

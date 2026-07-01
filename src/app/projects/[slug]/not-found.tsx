import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";

export default function CaseStudyNotFound() {
  return (
    <main
      id="main-content"
      data-sheet="case-study"
      className="case-study-main fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-white"
    >
      <ScrollResetLink
        href={ROUTES.projects}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Projects")}
      >
        <NavBackLinkLabel destination="Projects" />
      </ScrollResetLink>

      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-medium tracking-tight">Case study not found</h1>
        <p className="mt-3 text-sm text-neutral-400">
          That project link may be outdated. Browse the full list on Projects.
        </p>
        <ScrollResetLink
          href={ROUTES.projects}
          scroll={true}
          className="mt-6 inline-flex min-h-11 items-center text-sm text-neutral-300 underline decoration-neutral-500 underline-offset-4 hover:text-white"
        >
          Back to Projects
        </ScrollResetLink>
      </div>
    </main>
  );
}

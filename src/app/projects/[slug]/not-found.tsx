import { ScrollResetLink } from "@/components/scroll-reset-link";
import { SITE_BACK_TYPEFACE } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";

export default function CaseStudyNotFound() {
  return (
    <main
      id="main-content"
      data-sheet="case-study"
      className="case-study-main fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-white px-4 text-neutral-900"
    >
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-medium tracking-tight">Case study not found</h1>
        <p className="mt-3 text-sm text-neutral-500">
          That project link may be outdated. Browse the full list on Projects.
        </p>
        <ScrollResetLink
          href={ROUTES.projects}
          scroll={true}
          className={`mt-6 inline-flex min-h-11 items-center ${SITE_BACK_TYPEFACE} text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900`}
          style={SITE_BACK_LINK_STYLE}
        >
          Back to Projects
        </ScrollResetLink>
      </div>
    </main>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { CaseStudyFooterActions } from "@/components/case-studies/case-study-footer-actions";
import { CaseStudySkipLink } from "@/components/case-studies/case-study-skip-link";
import { CaseStudyTocProvider } from "@/components/case-studies/case-study-toc-context";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import ScrollMinimapRuler from "@/components/ScrollMinimapRuler";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { useCaseStudyHashFocus } from "@/hooks/use-case-study-hash-focus";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { CASE_STUDY_BODY_ID, CASE_STUDY_TITLE_ID } from "@/lib/case-study-a11y";

interface CaseStudyPageShellProps {
  backHref: string;
  backDestination: string;
  children: ReactNode;
}

export function CaseStudyPageShell({
  backHref,
  backDestination,
  children,
}: CaseStudyPageShellProps) {
  const scrollRootRef = useRef<HTMLElement>(null);
  useCaseStudyHashFocus();

  return (
    <CaseStudyTocProvider>
      <main
        ref={scrollRootRef}
        id="main-content"
        data-sheet="case-study"
        className="case-study-main fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-[#1a1a1a] text-white"
        tabIndex={-1}
      >
        <CaseStudySkipLink />
        <ScrollResetLink
          href={backHref}
          scroll={true}
          className={NAV_BACK_LINK_CLASS}
          aria-label={backNavigationLabel(backDestination)}
        >
          <NavBackLinkLabel destination={backDestination} />
        </ScrollResetLink>

        <article
          id={CASE_STUDY_BODY_ID}
          tabIndex={-1}
          aria-labelledby={CASE_STUDY_TITLE_ID}
          className="mx-auto w-full max-w-5xl px-8 pb-12 pt-24 outline-none"
        >
          {children}
          <CaseStudyFooterActions backHref={backHref} />
        </article>
      </main>

      <ScrollMinimapRuler scrollRootRef={scrollRootRef} />
    </CaseStudyTocProvider>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { CaseStudyFooterActions } from "@/components/case-studies/case-study-footer-actions";
import { CaseStudySkipLink } from "@/components/case-studies/case-study-skip-link";
import { CaseStudyTocProvider } from "@/components/case-studies/case-study-toc-context";
import { ScrollMinimapRuler } from "@/components/models/scroll-minimap-ruler";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { useCaseStudyPageAnalytics } from "@/hooks/use-case-study-page-analytics";
import { useCaseStudyHashFocus } from "@/hooks/use-case-study-hash-focus";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import type { ProjectOpenSource } from "@/lib/analytics";
import {
  CASE_STUDY_BODY_ID,
  CASE_STUDY_TITLE_ID,
} from "@/lib/case-study-a11y";

interface CaseStudyPageShellProps {
  backHref: string;
  backDestination: string;
  /** Top-left back control — defaults to `backHref` / `backDestination`. */
  navBackHref?: string;
  navBackDestination?: string;
  dataSheet?: "case-study";
  /** Case study slug for analytics (`project_open`, scroll depth). */
  analyticsSlug?: string;
  analyticsTitle?: string;
  analyticsSource?: ProjectOpenSource;
  children: ReactNode;
}

export function CaseStudyPageShell({
  backHref,
  backDestination,
  navBackHref = backHref,
  navBackDestination = backDestination,
  dataSheet = "case-study",
  analyticsSlug,
  analyticsTitle,
  analyticsSource,
  children,
}: CaseStudyPageShellProps) {
  const scrollRootRef = useRef<HTMLElement>(null);
  useCaseStudyHashFocus();
  useCaseStudyPageAnalytics({
    slug: analyticsSlug,
    title: analyticsTitle,
    source: analyticsSource,
    scrollRootRef,
  });

  return (
    <CaseStudyTocProvider>
      <main
        ref={scrollRootRef}
        id="main-content"
        data-sheet={dataSheet}
        className="case-study-main no-scrollbar fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-background text-white"
        tabIndex={-1}
      >
        <CaseStudySkipLink />
        <ScrollResetLink
          href={navBackHref}
          scroll={true}
          className={NAV_BACK_LINK_CLASS}
          aria-label={backNavigationLabel(navBackDestination)}
        >
          <NavBackLinkLabel destination={navBackDestination} />
        </ScrollResetLink>

        <article
          id={CASE_STUDY_BODY_ID}
          tabIndex={-1}
          aria-labelledby={CASE_STUDY_TITLE_ID}
          className="case-study-body mx-auto w-full max-w-5xl px-4 outline-none sm:px-8"
        >
          {children}
          <CaseStudyFooterActions backHref={backHref} />
        </article>
      </main>

      <ScrollMinimapRuler scrollRootRef={scrollRootRef} />
    </CaseStudyTocProvider>
  );
}

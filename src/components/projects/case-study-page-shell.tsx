"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { CaseStudyFooterActions } from "@/components/case-studies/case-study-footer-actions";
import { CaseStudySkipLink } from "@/components/case-studies/case-study-skip-link";
import { CaseStudyTocProvider } from "@/components/case-studies/case-study-toc-context";
import { ScrollMinimapRuler } from "@/components/models/scroll-minimap-ruler";
import { useCaseStudyPageAnalytics } from "@/hooks/use-case-study-page-analytics";
import { useSessionBackNavigation } from "@/hooks/use-session-back-navigation";
import { useCaseStudyHashFocus } from "@/hooks/use-case-study-hash-focus";
import type { ProjectOpenSource } from "@/lib/analytics";
import { CASE_STUDY_EDITORIAL_CLASS } from "@/components/case-studies/case-study-editorial-fonts";
import {
  CASE_STUDY_BODY_ID,
  CASE_STUDY_TITLE_ID,
  scrollCaseStudyRootToTop,
} from "@/lib/case-study-a11y";

interface CaseStudyPageShellProps {
  backHref: string;
  backDestination: string;
  /** @deprecated Top-left back control removed — kept for call-site compatibility. */
  navBackHref?: string;
  /** @deprecated Top-left back control removed — kept for call-site compatibility. */
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
  dataSheet = "case-study",
  analyticsSlug,
  analyticsTitle,
  analyticsSource,
  children,
}: CaseStudyPageShellProps) {
  const scrollRootRef = useRef<HTMLElement>(null);
  const back = useSessionBackNavigation({
    href: backHref,
    destination: backDestination,
  });
  const resolvedBackHref = back.href;
  const resolvedBackDestination = back.destination;

  useCaseStudyHashFocus();
  useCaseStudyPageAnalytics({
    slug: analyticsSlug,
    title: analyticsTitle,
    source: analyticsSource,
    scrollRootRef,
  });

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollCaseStudyRootToTop();
  }, []);

  return (
    <CaseStudyTocProvider>
      <main
        ref={scrollRootRef}
        id="main-content"
        data-sheet={dataSheet}
        className="case-study-main fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-background text-white"
        tabIndex={-1}
      >
        <CaseStudySkipLink />

        <article
          id={CASE_STUDY_BODY_ID}
          tabIndex={-1}
          aria-labelledby={CASE_STUDY_TITLE_ID}
          className={`case-study-body ${CASE_STUDY_EDITORIAL_CLASS} mx-auto w-full max-w-5xl px-4 outline-none sm:px-8`}
        >
          <div className="case-study-editorial-flow">{children}</div>
          <CaseStudyFooterActions
            backHref={resolvedBackHref}
            backDestination={resolvedBackDestination}
          />
        </article>
      </main>

      <ScrollMinimapRuler scrollRootRef={scrollRootRef} />
    </CaseStudyTocProvider>
  );
}

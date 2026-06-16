"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import {
  CASE_STUDY_FOOTER_NAV_LABEL,
  FOCUS_RING,
  TARGET_HIT_AREA,
} from "@/lib/a11y";
import { scrollCaseStudyRootToTop } from "@/lib/case-study-a11y";
import { ROUTES } from "@/lib/constants";

const CASE_STUDY_BUTTON_CLASS = [
  TARGET_HIT_AREA,
  "rounded-lg border border-white/15 bg-white/5 px-6",
  "font-sans text-sm font-medium text-neutral-300",
  "transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white",
  FOCUS_RING,
].join(" ");

const CASE_STUDY_BUTTON_PRIMARY_CLASS = [
  TARGET_HIT_AREA,
  "rounded-lg border border-[#6B36FF]/40 bg-[#6B36FF]/15 px-6",
  "font-sans text-sm font-medium text-[#D4BBFF]",
  "transition-colors hover:border-[#6B36FF]/60 hover:bg-[#6B36FF]/25 hover:text-white",
  FOCUS_RING,
].join(" ");

interface CaseStudyFooterActionsProps {
  backHref: string;
}

export function CaseStudyFooterActions({ backHref }: CaseStudyFooterActionsProps) {
  return (
    <nav
      aria-label={CASE_STUDY_FOOTER_NAV_LABEL}
      className="flex flex-wrap justify-center gap-4 pt-12"
    >
      <ScrollResetLink
        href={backHref}
        scroll={true}
        className={CASE_STUDY_BUTTON_PRIMARY_CLASS}
      >
        Back to projects
      </ScrollResetLink>

      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={CASE_STUDY_BUTTON_CLASS}
      >
        Back to home
      </ScrollResetLink>

      <button
        type="button"
        onClick={scrollCaseStudyRootToTop}
        className={CASE_STUDY_BUTTON_CLASS}
        aria-label="Scroll to top of case study"
      >
        Scroll to top
      </button>
    </nav>
  );
}

"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { CASE_STUDY_FOOTER_NAV_LABEL, FOCUS_RING, SITE_BACK_TYPEFACE, TARGET_HIT_AREA } from "@/lib/a11y";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";
import { ROUTES } from "@/lib/constants";

const CASE_STUDY_BUTTON_CLASS = [
  TARGET_HIT_AREA,
  "h-11 w-full rounded-lg border border-white/15 bg-white/5 px-6 sm:w-auto",
  `${SITE_BACK_TYPEFACE} text-sm font-medium text-neutral-300`,
  "transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white",
  "touch-manipulation",
  FOCUS_RING,
].join(" ");

const CASE_STUDY_BUTTON_PRIMARY_CLASS = [
  TARGET_HIT_AREA,
  "h-11 w-full rounded-lg border border-brand-accent/40 bg-brand-accent/15 px-6 sm:w-auto",
  `${SITE_BACK_TYPEFACE} text-sm font-medium text-brand-accent-soft`,
  "transition-colors hover:border-brand-accent/60 hover:bg-brand-accent/25 hover:text-white",
  "touch-manipulation",
  FOCUS_RING,
].join(" ");

interface CaseStudyFooterActionsProps {
  backHref: string;
  backDestination: string;
}

function secondaryBackLink(backHref: string): { href: string; label: string } {
  if (backHref === ROUTES.home) {
    return { href: ROUTES.projects, label: "Back to projects" };
  }

  return { href: ROUTES.home, label: "Back to home" };
}

export function CaseStudyFooterActions({
  backHref,
  backDestination,
}: CaseStudyFooterActionsProps) {
  const secondary = secondaryBackLink(backHref);
  const primaryLabel =
    backDestination === "Home"
      ? "Back to home"
      : backDestination === "Projects"
        ? "Back to projects"
        : `Back to ${backDestination.toLowerCase()}`;

  return (
    <footer className="case-study-footer pt-12">
      <div className="flex min-h-11 items-center gap-4">
        <nav
          aria-label={CASE_STUDY_FOOTER_NAV_LABEL}
          className="flex w-full flex-1 flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <ScrollResetLink
            href={backHref}
            scroll={true}
            className={CASE_STUDY_BUTTON_PRIMARY_CLASS}
            style={SITE_BACK_LINK_STYLE}
          >
            {primaryLabel}
          </ScrollResetLink>

          <ScrollResetLink
            href={secondary.href}
            scroll={true}
            className={CASE_STUDY_BUTTON_CLASS}
            style={SITE_BACK_LINK_STYLE}
          >
            {secondary.label}
          </ScrollResetLink>
        </nav>

        <div className="size-11 shrink-0" aria-hidden />
      </div>
    </footer>
  );
}

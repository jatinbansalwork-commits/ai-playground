/** Shared WCAG 2.2 AA hooks for `/projects/[slug]` case study routes. */

export const CASE_STUDY_TITLE_ID = "case-study-title";
export const CASE_STUDY_BODY_ID = "case-study-body";

/** Clears sticky chrome when scrolling to in-page targets (2.4.11). */
export const CASE_STUDY_HEADING_SCROLL_MARGIN = "scroll-mt-32 scroll-pt-32";

export function getCaseStudyScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollCaseStudyRootToTop() {
  const main = document.getElementById("main-content");
  const behavior = getCaseStudyScrollBehavior();

  if (main) {
    main.scrollTo({ top: 0, behavior });
    return;
  }

  window.scrollTo({ top: 0, behavior });
}

export function focusCaseStudyHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }

  target.focus({ preventScroll: true });
}

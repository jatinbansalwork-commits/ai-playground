/** Shared WCAG 2.2 AA hooks for `/projects/[slug]` case study routes. */

export const CASE_STUDY_TITLE_ID = "case-study-title";
export const CASE_STUDY_BODY_ID = "case-study-body";

/** Top padding on case study body — keeps hero clear of the back control. */
export const CASE_STUDY_CONTENT_TOP_PADDING_PX = 200;

/** Bottom padding below case study footer actions. */
export const CASE_STUDY_FOOTER_BOTTOM_PADDING_PX = 200;

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

function getNearestScrollParent(element: HTMLElement): HTMLElement | null {
  let node = element.parentElement;

  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

/** Scroll inside the nearest overflow parent — avoids hijacking the case study page. */
export function scrollIntoNearestScrollParent(
  element: HTMLElement | null,
  options?: { behavior?: ScrollBehavior; block?: "start" | "center" | "end" },
) {
  if (!element || typeof window === "undefined") return;

  const behavior = options?.behavior ?? "auto";
  const block = options?.block ?? "end";
  const scrollParent = getNearestScrollParent(element);

  if (!scrollParent || scrollParent.classList.contains("case-study-main")) {
    element.scrollIntoView({ behavior, block: "nearest" });
    return;
  }

  const parentRect = scrollParent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top - parentRect.top + scrollParent.scrollTop;

  let target = elementTop;
  if (block === "end") {
    target = elementTop - scrollParent.clientHeight + element.offsetHeight;
  } else if (block === "center") {
    target = elementTop - (scrollParent.clientHeight - element.offsetHeight) / 2;
  }

  scrollParent.scrollTo({
    top: Math.max(0, target),
    behavior,
  });
}

/** Clears sticky nav when scrolling an in-article embed (e.g. Policy Copilot) into view. */
const CASE_STUDY_EMBED_SCROLL_CLEARANCE_PX = 128;

export function scrollCaseStudyWorkspaceIntoView(
  element: HTMLElement | null,
  behavior?: ScrollBehavior,
) {
  if (!element || typeof window === "undefined") return;

  const scrollBehavior = behavior ?? getCaseStudyScrollBehavior();
  const scrollRoot = element.closest(".case-study-main") as HTMLElement | null;

  if (scrollRoot) {
    const rootTop = scrollRoot.getBoundingClientRect().top;
    const elTop = element.getBoundingClientRect().top;
    const target =
      scrollRoot.scrollTop + (elTop - rootTop) - CASE_STUDY_EMBED_SCROLL_CLEARANCE_PX;

    scrollRoot.scrollTo({ top: Math.max(0, target), behavior: scrollBehavior });
    return;
  }

  element.scrollIntoView({ behavior: scrollBehavior, block: "start" });
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

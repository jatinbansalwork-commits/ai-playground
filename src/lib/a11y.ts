/**
 * JB Portfolio — WCAG 2.2 Level AA accessibility tokens and helpers.
 *
 * Success criteria mapped to this codebase:
 *
 * | Criterion | Requirement | Implementation |
 * |-----------|-------------|----------------|
 * | 1.1.1 Non-text Content | Alt text for meaningful images/media | `experiment-media` alt, `aria-hidden` on decorative previews |
 * | 1.3.1 Info and Relationships | Semantic structure | `main`, `nav`, `h1`, `aria-label` on unlabelled controls |
 * | 1.4.3 Contrast (Minimum) | 4.5:1 body text; 3:1 large text/UI | Dark sheets: `#ededed` / `#ffffff` on `#1a1a1a` |
 * | 2.1.1 Keyboard | All functionality via keyboard | Slider Prev/Next, filter tabs, links, modals |
 * | 2.4.1 Bypass Blocks | Skip repetitive content | `SkipToContentLink` + `CaseStudySkipLink` → article body |
 * | 2.4.3 Focus Order | Logical tab sequence | DOM order matches visual order on each route |
 * | 2.4.7 Focus Visible | Visible focus indicator | `FOCUS_RING` on every custom interactive control |
 * | 2.4.11 Focus Not Obscured (Minimum) | Focus not fully hidden by sticky UI | `outline-offset-2`, `#main-content { scroll-margin-top }` |
 * | 2.5.7 Dragging Movements | No drag-only operation | Index slider: keyboard + `IndexSlideNav` buttons |
 * | 2.5.8 Target Size (Minimum) | 24×24 CSS px pointer target | `TARGET_HIT_AREA` (44×44 — exceeds minimum) |
 * | 2.3.3 Animation from Interactions | Respect reduced motion | `globals.css` + `useReducedMotion` hook |
 * | 3.2.6 Consistent Help | Help in consistent location | JBAI chat — fixed bottom-right on all routes |
 * | 3.3.7 Redundant Entry | Avoid re-entering known data | N/A — no multi-step forms |
 * | 3.3.8 Accessible Authentication (Minimum) | No cognitive-only auth | N/A — no authentication |
 * | 4.1.2 Name, Role, Value | Correct ARIA on components | `aria-pressed`, `aria-live`, `aria-modal`, labels |
 *
 * @see https://www.w3.org/TR/WCAG22/
 */

/** Focus indicator colour — 3:1+ against `#1a1a1a` (satisfies 2.4.7 / 2.4.11). */
export const FOCUS_RING_COLOR = "#3291ff";

/**
 * Visible focus ring for custom controls (2.4.7, 2.4.11).
 * Uses `focus-visible` so pointer clicks do not leave a persistent ring.
 */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3291ff]";

/** WCAG 2.2 AA 2.5.8 minimum pointer target — 24×24 CSS px. */
export const TARGET_SIZE_AA_MIN_PX = 24;

/** Recommended touch target — 44×44 CSS px (Apple HIG / exceeds 2.5.8). */
export const TARGET_SIZE_RECOMMENDED_PX = 44;

/** Minimum hit area applied to icon and text navigation controls (2.5.8). */
export const TARGET_HIT_AREA =
  "inline-flex min-h-11 min-w-11 items-center justify-center";

/** @deprecated Use `TARGET_HIT_AREA`. */
export const ICON_BUTTON_HIT_AREA = TARGET_HIT_AREA;

/** Large icon back control (`←`) — fun, archive, minimap exits. */
export const BACK_LINK_CLASS =
  `${TARGET_HIT_AREA} text-4xl leading-none text-neutral-400 transition-colors hover:text-white ${FOCUS_RING}`;

/**
 * Text back control — Track A/B navigation flows.
 * Hit area padded to 44×44 while label remains text-sized (2.5.8).
 */
export const NAV_BACK_LINK_CLASS =
  `absolute top-8 left-8 z-50 ${TARGET_HIT_AREA} px-3 text-sm text-neutral-400 transition-colors hover:text-white ${FOCUS_RING}`;

/** Full-width list row — 44px min height for pointer targets (2.5.8). */
export const PROJECTS_ROW_LINK_CLASS =
  "projects-row group flex w-full min-h-11 flex-row items-center justify-between py-2 text-lg";

/** External text link in case study meta — contrast + focus + hit area. */
export const CASE_STUDY_EXTERNAL_LINK_CLASS =
  `inline-flex min-h-11 items-center px-1 font-sans text-sm font-medium text-neutral-400 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-white hover:decoration-white ${FOCUS_RING}`;

/**
 * Skip link — bypasses chrome to main content (2.4.1).
 * Hidden until keyboard focus; appears top-left above all layers.
 */
export const SKIP_LINK_CLASS =
  `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black ${FOCUS_RING}`;

/** Announces external navigation in link accessible names (4.1.2). */
export function externalLinkLabel(title: string): string {
  return `${title} (opens in new tab)`;
}

/** Case study in-page navigation — contrast + 44px target (2.5.8). */
export const CASE_STUDY_IN_PAGE_LINK_CLASS =
  `inline-flex min-h-11 items-center rounded-sm px-1 text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-white focus-visible:text-white focus-visible:underline ${FOCUS_RING}`;

/** Case study footer / utility controls. */
export const CASE_STUDY_FOOTER_NAV_LABEL = "Case study page actions";

/** Returns a descriptive back-navigation label for screen readers. */
export function backNavigationLabel(destination: string): string {
  return `Back to ${destination}`;
}

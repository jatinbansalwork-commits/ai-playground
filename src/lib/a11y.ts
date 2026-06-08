/** Shared WCAG 2.2 AA focus ring — 3:1+ against dark surfaces. */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3291ff]";

/** Minimum 44×44px touch target for icon / back controls (exceeds 2.5.8 minimum). */
export const ICON_BUTTON_HIT_AREA =
  "inline-flex min-h-11 min-w-11 items-center justify-center";

export const BACK_LINK_CLASS =
  `${ICON_BUTTON_HIT_AREA} text-4xl leading-none text-neutral-400 transition-colors hover:text-white ${FOCUS_RING}`;

export function externalLinkLabel(title: string): string {
  return `${title} (opens in new tab)`;
}

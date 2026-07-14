export const CASE_STUDY_TEXT_COLUMN = "max-w-4xl";

/** Readable line length for body copy, quotes, and lists. */
export const CASE_STUDY_READING_COLUMN = CASE_STUDY_TEXT_COLUMN;

/** Stack gap inside a section — body, lists, media (pair rules in CSS). */
export const CASE_STUDY_SECTION_INNER = "case-study-stack";

/**
 * Major chapter band — Medium/Notion hairline + air before the next beat.
 * Prefer this (or `CaseStudyDivider`) between chapters, not before every H2.
 */
export const CASE_STUDY_SECTION_MAJOR =
  "border-t border-neutral-200 pt-8 mt-0";

export const CASE_STUDY_SECTION_DEFAULT = "pt-0";

export const CASE_STUDY_SECTION_TIGHT = "pt-0";

export const CASE_STUDY_SUBSECTION = `${CASE_STUDY_TEXT_COLUMN} case-study-stack`;

/** Section kicker — PROJECT OVERVIEW, UX Principle Applied, etc. */
export const CASE_STUDY_LABEL =
  "text-xs font-medium uppercase tracking-wider text-neutral-500";

/** Opening chapter line (demoted from h1 — hero keeps the page title). */
export const CASE_STUDY_CHAPTER =
  `${CASE_STUDY_TEXT_COLUMN} text-[1.75rem] md:text-[2rem] font-medium text-neutral-800 font-sans leading-relaxed tracking-normal antialiased`;

export const CASE_STUDY_TOC_LINK =
  "inline-flex min-h-11 items-center rounded-sm text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900 focus-visible:underline";

export const CASE_STUDY_TOC_LINK_ACTIVE = "text-sky-700";

export const CASE_STUDY_PROGRESS_LINK =
  "inline-flex min-h-11 shrink-0 items-center rounded-sm px-1 text-xs font-medium tracking-wide text-neutral-500 transition-colors hover:text-neutral-900 whitespace-nowrap focus-visible:underline underline-offset-4";

export const CASE_STUDY_PROGRESS_LINK_ACTIVE = "text-neutral-900";

/**
 * Default prose band — Medium-style pair spacing via `.case-study-stack`
 * (not a uniform Tailwind `space-y-*`).
 */
export const CASE_STUDY_PROSE_INNER = "case-study-stack w-full md:col-span-3";

/** Tighter band for dense card-like passages. */
export const CASE_STUDY_PROSE_INNER_DENSE =
  "case-study-stack case-study-stack--dense w-full md:col-span-3";

/** Wide media / gallery band inside the case study canvas. */
export const CASE_STUDY_WIDE_WRAPPER =
  "case-study-block case-study-block--media w-full max-w-5xl mx-auto";

/** Shared 3-column canvas — hero and meta specs align on the left rail. */
export const CASE_STUDY_PAGE_GRID =
  "w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16";

export const CASE_STUDY_LEFT_COLUMN = "md:col-span-1";

export const CASE_STUDY_HERO_COLUMN = "space-y-6 md:col-span-3";

/**
 * Medium / Notion chapter rule — full reading-column hairline.
 * Use between major narrative beats, not before every H2.
 */
export const CASE_STUDY_DIVIDER =
  "case-study-chapter-divider border-0 border-t border-neutral-200";

export const CASE_STUDY_PARAGRAPH =
  "text-base md:text-lg text-neutral-700 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_PARAGRAPH_DENSE =
  "text-base md:text-lg text-neutral-700 font-sans leading-relaxed tracking-normal antialiased";

/** Half dense gap — pairs with CASE_STUDY_TIGHT_STACK (space-y-0.5). */
export const CASE_STUDY_PARAGRAPH_TIGHT =
  "text-base md:text-lg text-neutral-700 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_TIGHT_STACK = "space-y-0.5";

export const CASE_STUDY_QUOTE =
  "text-lg md:text-xl text-neutral-900 font-medium leading-relaxed tracking-tight border-l-2 border-sky-500 pl-6 antialiased";

export const CASE_STUDY_LEAD =
  "text-base md:text-lg text-neutral-700 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_DISPLAY_LINE =
  "text-[2rem] md:text-4xl font-bold text-neutral-900 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_YEAR =
  "text-sm font-medium tracking-wide text-neutral-500";

export const CASE_STUDY_SUBHEADING =
  "text-xl md:text-2xl font-semibold tracking-tight text-neutral-900";

export const CASE_STUDY_H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-neutral-900";

export const CASE_STUDY_H1 =
  "text-[32px] font-medium text-neutral-800 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_H3 =
  "text-lg md:text-xl font-semibold tracking-tight text-neutral-900";

export const CASE_STUDY_H4 =
  "text-base md:text-lg font-semibold tracking-tight text-neutral-800";

export const CASE_STUDY_LIST =
  "list-disc list-outside pl-5 space-y-1.5 text-neutral-700 antialiased";

export const CASE_STUDY_CAPTION =
  "text-center text-xs tracking-wide text-neutral-500 antialiased";

export const CASE_STUDY_META_LABEL =
  "text-xs font-mono tracking-wider text-neutral-500 uppercase";

export const CASE_STUDY_META_VALUE =
  "text-sm text-neutral-700 font-sans leading-relaxed";

export const CASE_STUDY_META_INFO =
  "text-sm md:text-base text-neutral-700 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_INFO =
  "flex items-center gap-3 rounded-xl border border-amber-400/40 bg-amber-50 px-4 py-3 text-base leading-relaxed text-amber-950 md:px-5 md:py-4 md:text-lg antialiased";

export const CASE_STUDY_META_GRID =
  `${CASE_STUDY_PAGE_GRID} pt-10 pb-10 border-b border-neutral-200`;

/** Fixed scroll-up control — inset from viewport right (offset from article rail). */
export const CASE_STUDY_FOOTER_SCROLL_INSET =
  "right-[max(1rem,calc((100vw-min(100vw,64rem))/2+2rem-350px))]";

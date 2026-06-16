export const CASE_STUDY_TEXT_COLUMN = "max-w-3xl";

/** Readable line length for body copy, quotes, and lists. */
export const CASE_STUDY_READING_COLUMN = CASE_STUDY_TEXT_COLUMN;

export const CASE_STUDY_SECTION_INNER = "space-y-8";

export const CASE_STUDY_SECTION_MAJOR =
  "pt-16 mt-2 border-t border-neutral-800/40 first:border-t-0 first:pt-0 first:mt-0";

export const CASE_STUDY_SECTION_DEFAULT = "pt-10 first:pt-0";

export const CASE_STUDY_SECTION_TIGHT = "pt-6 first:pt-0";

export const CASE_STUDY_SUBSECTION = `${CASE_STUDY_TEXT_COLUMN} space-y-5`;

/** Section kicker — PROJECT OVERVIEW, UX Principle Applied, etc. */
export const CASE_STUDY_LABEL =
  "text-xs font-medium uppercase tracking-wider text-neutral-400";

/** Opening chapter line (demoted from h1 — hero keeps the page title). */
export const CASE_STUDY_CHAPTER =
  `${CASE_STUDY_TEXT_COLUMN} text-[1.75rem] md:text-[2rem] font-medium text-neutral-200 font-sans leading-relaxed tracking-normal antialiased`;

export const CASE_STUDY_TOC_LINK =
  "inline-flex min-h-11 items-center rounded-sm text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-white focus-visible:text-white focus-visible:underline";

export const CASE_STUDY_TOC_LINK_ACTIVE = "text-[#C9B0FF]";

export const CASE_STUDY_PROGRESS_LINK =
  "inline-flex min-h-11 shrink-0 items-center rounded-sm px-1 text-xs font-medium tracking-wide text-neutral-400 transition-colors hover:text-white whitespace-nowrap focus-visible:underline underline-offset-4";

export const CASE_STUDY_PROGRESS_LINK_ACTIVE = "text-white";

/** Prose band — full canvas width, left-aligned to hero rail. */
export const CASE_STUDY_PROSE_INNER =
  "w-full space-y-6 md:col-span-3";

/** Tighter vertical rhythm — half the default prose gap. */
export const CASE_STUDY_PROSE_INNER_DENSE =
  "w-full space-y-3 md:col-span-3";

/** Wide media / gallery band inside the case study canvas. */
export const CASE_STUDY_WIDE_WRAPPER = "w-full max-w-5xl mx-auto";

/** Shared 3-column canvas — hero and meta specs align on the left rail. */
export const CASE_STUDY_PAGE_GRID =
  "w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16";

export const CASE_STUDY_LEFT_COLUMN = "md:col-span-1";

export const CASE_STUDY_HERO_COLUMN = "space-y-6 md:col-span-3";

/** Section rule — spacing comes from the prose stack, not padding on the divider. */
export const CASE_STUDY_DIVIDER = "border-t border-neutral-800/40";

export const CASE_STUDY_PARAGRAPH =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_PARAGRAPH_DENSE =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

/** Half dense gap — pairs with CASE_STUDY_TIGHT_STACK (space-y-1.5). */
export const CASE_STUDY_PARAGRAPH_TIGHT =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_TIGHT_STACK = "space-y-1.5";

export const CASE_STUDY_QUOTE =
  "text-lg md:text-xl text-white font-medium leading-relaxed tracking-tight border-l-2 border-[#6B36FF] pl-6 antialiased";

export const CASE_STUDY_LEAD =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_DISPLAY_LINE =
  "text-[2rem] md:text-4xl font-bold text-white font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_YEAR =
  "text-sm font-medium tracking-wide text-neutral-400";

export const CASE_STUDY_SUBHEADING =
  "text-xl md:text-2xl font-semibold tracking-tight text-white";

export const CASE_STUDY_H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-white";

export const CASE_STUDY_H1 =
  "text-[32px] font-medium text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_H3 =
  "text-lg md:text-xl font-semibold tracking-tight text-white";

export const CASE_STUDY_LIST =
  "list-disc list-outside pl-5 space-y-3 text-neutral-300 antialiased";

export const CASE_STUDY_CAPTION =
  "text-xs tracking-wide text-neutral-400 antialiased";

export const CASE_STUDY_META_LABEL =
  "text-xs font-mono tracking-wider text-neutral-400 uppercase";

export const CASE_STUDY_META_VALUE =
  "text-sm text-neutral-300 font-sans leading-relaxed";

export const CASE_STUDY_META_INFO =
  "text-sm md:text-base text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_META_GRID =
  `${CASE_STUDY_PAGE_GRID} pt-12 pb-16 border-b border-neutral-800/40 my-12`;

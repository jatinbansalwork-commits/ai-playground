/** Prose band — full canvas width, left-aligned to hero rail. */
export const CASE_STUDY_PROSE_INNER =
  "w-full space-y-6 md:col-span-3";

/** Tighter vertical rhythm — half the default prose gap (space-y-3, no paragraph tail margin). */
export const CASE_STUDY_PROSE_INNER_DENSE =
  "w-full space-y-3 md:col-span-3";

/** Wide media / gallery band inside the case study canvas. */
export const CASE_STUDY_WIDE_WRAPPER = "w-full max-w-5xl mx-auto";

/** Shared 3-column canvas — hero and meta specs align on the left rail. */
export const CASE_STUDY_PAGE_GRID =
  "w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16";

export const CASE_STUDY_LEFT_COLUMN = "md:col-span-1";

export const CASE_STUDY_HERO_COLUMN = "space-y-6 md:col-span-3";

export const CASE_STUDY_PARAGRAPH =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal mb-6 antialiased";

export const CASE_STUDY_PARAGRAPH_DENSE =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal mb-3 antialiased";

/** Half dense gap — pairs with CASE_STUDY_TIGHT_STACK (space-y-1.5). */
export const CASE_STUDY_PARAGRAPH_TIGHT =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal mb-0 antialiased";

export const CASE_STUDY_TIGHT_STACK = "space-y-1.5";

export const CASE_STUDY_QUOTE =
  "text-lg md:text-xl text-white font-medium leading-relaxed tracking-tight border-l-2 border-[#6B36FF] pl-6 my-2 antialiased";

export const CASE_STUDY_LEAD =
  "text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_YEAR =
  "text-sm font-medium tracking-wide text-neutral-400";

export const CASE_STUDY_SUBHEADING =
  "text-xl md:text-2xl font-semibold tracking-tight text-white mt-12 mb-4";

export const CASE_STUDY_H3 =
  "text-lg md:text-xl font-semibold tracking-tight text-white mb-4";

export const CASE_STUDY_LIST =
  "list-disc list-outside pl-5 space-y-3 text-neutral-300 my-6 antialiased";

export const CASE_STUDY_CAPTION =
  "text-xs tracking-wide text-neutral-400 antialiased";

export const CASE_STUDY_META_LABEL =
  "text-[11px] font-mono tracking-wider text-neutral-500 uppercase";

export const CASE_STUDY_META_VALUE =
  "text-sm text-neutral-300 font-sans leading-relaxed";

export const CASE_STUDY_META_INFO =
  "text-sm md:text-base text-neutral-300 font-sans leading-relaxed tracking-normal antialiased";

export const CASE_STUDY_META_GRID =
  `${CASE_STUDY_PAGE_GRID} pt-12 pb-16 border-b border-neutral-800/40 my-12`;

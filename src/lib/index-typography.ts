/**
 * Locked slider typography — normal and wireframe modes share these classes
 * so glyph bounds stay identical when toggling wireframe fill rendering.
 */
export const INDEX_SLIDE_TYPE = "index-slide-type font-sans";

export const INDEX_SLIDE_HERO = `${INDEX_SLIDE_TYPE} font-normal tracking-tight leading-[1.05] text-black`;

export const INDEX_SLIDE_HERO_SIZE_PX = 80;

export const INDEX_SLIDE_MONOGRAM = `${INDEX_SLIDE_TYPE} font-normal tracking-tighter leading-none whitespace-nowrap text-black`;

export const INDEX_SLIDE_MONOGRAM_SCALE = 1.8;
export const INDEX_SLIDE_MONOGRAM_FONT_OFFSET = 480;

export function getIndexMonogramFontSize(label: string): number {
  if (label.length <= 1) return 792;
  if (label.length <= 3) return 352;
  if (label.length <= 8) return 216;
  return 168;
}

export const INDEX_SLIDE_LABEL = `${INDEX_SLIDE_TYPE} font-normal tracking-tight leading-none text-[1.2rem] text-neutral-500`;

export const INDEX_SLIDE_CONTACT = `${INDEX_SLIDE_TYPE} font-normal tracking-tight leading-none text-black`;

export const INDEX_SLIDE_CONTACT_SIZE_PX = 102;

export const INDEX_SLIDE_MANIFEST = `${INDEX_SLIDE_TYPE} font-normal tracking-tight leading-[1.15] text-white`;

export const INDEX_SLIDE_MANIFEST_SIZE_PX = 90;

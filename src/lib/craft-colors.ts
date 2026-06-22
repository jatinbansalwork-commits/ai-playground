/** Gallery accent palette — dark canvas, high-saturation preview pops. */
export const CRAFT_PREVIEW = {
  blue: "craft-preview-blue bg-[#3291ff]",
  yellow: "craft-preview-yellow bg-[#FFEF00]",
  orange: "craft-preview-orange bg-[#FF6100]",
  mint: "craft-preview-mint bg-[#99FFE4]",
  peach: "craft-preview-peach bg-[#FFC799]",
  grayLight: "craft-preview-grayLight bg-[#ececec]",
  grayMid: "craft-preview-grayMid bg-[#f3f3f3]",
  graySoft: "craft-preview-graySoft bg-neutral-100",
  white: "craft-preview-white bg-[#FAFAFA]",
  dark: "craft-preview-dark bg-[#2a2a2a]",
  canvas: "craft-preview-canvas bg-[#09090b]",
} as const;

/** Dark-theme neutral gray scale. */
export const CRAFT_GRAY = {
  gray2: "#1c1c1c",
  gray3: "#222222",
  gray4: "#282828",
  gray5: "#2d2d2d",
  gray9: "#707070",
  gray12: "#ececec",
} as const;

export type CraftPreviewTone = keyof typeof CRAFT_PREVIEW;

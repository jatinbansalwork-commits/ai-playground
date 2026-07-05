import type { HeroPillIconId } from "@/components/slider/hero-pill-icons";

export interface HeroPillDefinition {
  id: string;
  label?: string;
  color: string;
  icon: HeroPillIconId;
  bordered?: boolean;
  /** Measured pill width at desktop scale. */
  width: number;
  iconOnly?: boolean;
}

/** Hero physics pill definitions — order, copy, colours, and sizes. */
export const HERO_PILLS: HeroPillDefinition[] = [
  { id: "pill-10", color: "#D9C9FF", icon: "pound", width: 58, iconOnly: true },
  {
    id: "pill-12",
    label: "thinking systems",
    color: "#FBCFE8",
    icon: "globe",
    width: 213,
  },
  { id: "pill-30", color: "#FDCF00", icon: "sparkle", width: 58, iconOnly: true },
  {
    id: "pill-01",
    label: "Prototyping",
    color: "#F4F4F5",
    icon: "flow",
    bordered: true,
    width: 174,
  },
  {
    id: "pill-02",
    label: "Improving UX",
    color: "#FDCF00",
    icon: "smile",
    width: 182,
  },
  {
    id: "pill-20",
    color: "#F4F4F5",
    icon: "cursor",
    bordered: true,
    width: 58,
    iconOnly: true,
  },
  {
    id: "pill-03",
    label: "Making it pop",
    color: "#FF894A",
    icon: "layers",
    width: 190,
  },
  { id: "pill-40", color: "#FF894A", icon: "send", width: 58, iconOnly: true },
  {
    id: "pill-04",
    label: "testing",
    color: "#D9C9FF",
    icon: "test",
    width: 143,
  },
  {
    id: "pill-11",
    label: "reframing problems",
    color: "#5ADBA5",
    icon: "grid",
    width: 229,
  },
  {
    id: "pill-05",
    label: "Rounding corners",
    color: "#D9F99D",
    icon: "corner",
    width: 213,
  },
  {
    id: "pill-13",
    label: "Moving rectangles",
    color: "#A3D9FF",
    icon: "move",
    width: 221,
  },
  { id: "pill-50", color: "#A3D9FF", icon: "badge", width: 58, iconOnly: true },
];

export const HERO_PILL_HEIGHT_PX = 58;
export const HERO_PILL_ICON_SIZE_PX = 18;
export const HERO_PILL_PADDING_ICON_PX = 20;
export const HERO_PILL_PADDING_TEXT_X_PX = 30;
export const HERO_PILL_PADDING_TEXT_Y_PX = 20;
export const HERO_PILL_GAP_PX = 10;
export const HERO_PILL_TEXT_COLOR = "#09090B";
export const HERO_PILL_BORDER_COLOR = "#E4E4E7";

/** Site primary accent — Moving rectangles / badge pills. */
export const HERO_BRAND_BLUE = "#A3D9FF";

/** Readable on solid brand fills */
export const HERO_BRAND_BLUE_FOREGROUND = HERO_PILL_TEXT_COLOR;

/** Soft tint for labels and chips on dark surfaces */
export const HERO_BRAND_BLUE_SOFT = "#C8E8FF";

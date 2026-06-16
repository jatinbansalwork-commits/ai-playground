export type FrameVariant = "main" | "slide" | "default";

export interface HeroFrame {
  id: string;
  type: "hero";
  variant: "main";
  label: string;
}

export interface SectionFrame {
  id: string;
  type: "section";
  variant: "slide";
  label: string;
  monogram?: string;
  /** Multiplier on the default monogram font size (e.g. 1.5 = 150% larger). */
  monogramScale?: number;
  /** Added to the computed monogram font size in px. */
  monogramFontOffset?: number;
  /** Pan oversized text inside the frame mask. */
  monogramPan?: boolean;
  /** Reveal monogram text with a typewriter effect. */
  monogramTyping?: boolean;
  /** Centered image instead of monogram text. */
  monogramImage?: string;
  /** Hide the small label above the slide panel. */
  hideSlideLabel?: boolean;
  /** Mask pan loop duration in seconds. */
  monogramPanDuration?: number;
  lottie?: string;
  /** Remap near-black Lottie fills (e.g. bouncing ball) to this hex color. */
  lottieFillAccent?: string;
  /** Bento 3:4 video thumbnail instead of monogram text. */
  videoThumbnail?: boolean;
  href: string;
  /** Open section link in a new browser tab. */
  openInNewTab?: boolean;
  badge?: string;
}

export interface ContactFrame {
  id: string;
  type: "contact";
  variant: "default";
  label: string;
}

export interface ManifestFrame {
  id: string;
  type: "manifest";
  variant: "default";
  label: string;
}

export type Frame =
  | HeroFrame
  | SectionFrame
  | ContactFrame
  | ManifestFrame;

export const SITE_NAME = "JB Portfolio";

export const ROUTES = {
  home: "/",
  /** Track A — featured case study from the index "Recent Work" slide. */
  recentWork: "/Recentwork",
  fun: "/fun",
  projects: "/projects",
  archive: "/archive",
} as const;

export const FRAMES = [
  {
    id: "hero",
    type: "hero" as const,
    variant: "main" as const,
    label: SITE_NAME,
  },
  {
    id: "models",
    type: "section" as const,
    variant: "slide" as const,
    label: "Recent Work",
    monogram: "Recent Work",
    monogramScale: 1.5,
    monogramFontOffset: 400,
    monogramPan: true,
    monogramPanDuration: 14,
    badge: "v3.2",
    href: ROUTES.recentWork,
  },
  {
    id: "experiments",
    type: "section" as const,
    variant: "slide" as const,
    label: "Fun",
    lottie: "/assets/lottie/experiments-fun.json",
    lottieFillAccent: "#6B36FF",
    href: ROUTES.fun,
  },
  {
    id: "projects",
    type: "section" as const,
    variant: "slide" as const,
    label: "Projects",
    monogram: "Projects",
    monogramScale: 1.5,
    monogramFontOffset: 400,
    monogramPan: true,
    monogramPanDuration: 15,
    href: ROUTES.projects,
  },
  {
    id: "archive",
    type: "section" as const,
    variant: "slide" as const,
    label: "Me",
    videoThumbnail: true,
    href: ROUTES.archive,
  },
  {
    id: "contact",
    type: "contact" as const,
    variant: "default" as const,
    label: "Contact",
  },
  {
    id: "manifest",
    type: "manifest" as const,
    variant: "default" as const,
    label: "Manifest",
  },
] as const;

/** Total slides on the index page — derived from `FRAMES`. */
export const SLIDE_COUNT = FRAMES.length;

export const FRAME_WIDTH = 1200;
export const FRAME_HEIGHT = 720;
export const FRAME_STRIDE = 1240;
export const SCROLL_PER_FRAME = 744;

/** Scroll distance from first to last slide. */
export const SCROLL_RANGE = (SLIDE_COUNT - 1) * SCROLL_PER_FRAME;

/** Full horizontal track width for all frames. */
export const TRACK_WIDTH = FRAME_WIDTH + (SLIDE_COUNT - 1) * FRAME_STRIDE;

export const MINIMAP_LINE_WIDTH = 1;
export const MINIMAP_LINE_GAP = 9;
export const MINIMAP_LINE_HEIGHT = 18;
export const MINIMAP_LINE_COUNT = 20;
export const MINIMAP_TRACKER_WIDTH = 30;
export const MINIMAP_RANGE = 160;

/** Canvas scale floor + viewport fit for the index slider. */
export const SCALE_MIN = 0.6;
export const SCALE_BASE_MIN = 0.2;
export const SCALE_SCROLL_FACTOR = 0.0001;
export const SCALE_VIEWPORT_WIDTH = 1300;
export const SCALE_VIEWPORT_HEIGHT = 1020;

export const HERO_LINES = [
  "JB is a Product Designer",
  "working on",
  "cybersecurity by day",
  "and AI experiments",
  "by night.",
] as const;

export const HERO_COPY = HERO_LINES.join(" ");

export const MANIFEST_LINES = [
  "Make it soulful.",
  "Make it fast.",
  "Make it beautiful.",
  "Make it consistent.",
  "Make it timeless.",
  "Make it.",
] as const;

export const CONTACT_LINKS = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/jatin-bansal-design/",
    position: "top-left" as const,
  },
  {
    label: "JB Manual",
    href: "https://uxjatin.notion.site/Jatin-user-manual-4026f4a37be346d98265f180d53ce38e",
    position: "top-right" as const,
  },
  {
    label: "Portfolio 2.0",
    href: "https://jatins-exceptional-site-de44c3.webflow.io/",
    position: "bottom-left" as const,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/18SdU4YHBhYxfRyWCt6I7oXBoFVxGPcvT/view?usp=sharing",
    position: "bottom-right" as const,
  },
] as const;

export const CONTACT_EMAIL = "jatinbansal.work@gmail.com";

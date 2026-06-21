export const SITE_NAME = "JB Portfolio";

export const ROUTES = {
  home: "/",
  craft: "/craft",
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
    id: "projects",
    type: "section" as const,
    variant: "slide" as const,
    label: "Projects",
    monogram: "Projects",
    monogramPan: true,
    monogramPanDuration: 14,
    href: ROUTES.projects,
  },
  {
    id: "design-review-checklist",
    type: "section" as const,
    variant: "slide" as const,
    label: "Design Review",
    monogramImage: "/assets/index/article-cursor-hand.png",
    href: `${ROUTES.craft}/design-review-checklist`,
  },
  {
    id: "experiments",
    type: "section" as const,
    variant: "slide" as const,
    label: "Craft",
    monogram: "Craft",
    monogramPan: true,
    monogramPanDuration: 14,
    href: ROUTES.craft,
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

/** Bottom offset for floating chrome above the pinned index footer (slide nav + chat). */
export const INDEX_FLOATING_BOTTOM = "bottom-14";

/** Mobile index chat FAB — above slide nav so Prev/Next stay tappable. */
export const AI_CHAT_FAB_MOBILE_INDEX_BOTTOM = "bottom-28";

/** Chat ball diameter — keep in sync with `AiChatFab` trigger size. */
export const AI_CHAT_BALL_SIZE_PX = 72;

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
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jatin-bansal-design/",
    position: "top-left" as const,
  },
  {
    label: "JB Manual",
    href: "https://uxjatin.notion.site/Jatin-user-manual-4026f4a37be346d98265f180d53ce38e",
    position: "top-right" as const,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/18SdU4YHBhYxfRyWCt6I7oXBoFVxGPcvT/view?usp=sharing",
    position: "bottom-right" as const,
  },
] as const;

export const CONTACT_EMAIL = "jatinbansal.work@gmail.com";

/** Direct line for hiring enquiries in JB_AI. */
export const JB_CONTACT_PHONE = "6362408280";
export const JB_CONTACT_PHONE_TEL = `tel:+91${JB_CONTACT_PHONE}`;

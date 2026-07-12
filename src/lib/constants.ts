export const SITE_NAME = "JB Portfolio";

/** Platform page canvas — matches detail.design `--surface`. */
export const SITE_CANVAS = "#09090b";

export const ROUTES = {
  home: "/",
  craft: "/craft",
  projects: "/projects",
  ciscoPolicyCopilot: "/projects/cisco-policy-copilot",
  ideas: "/ideas",
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
    id: "cisco-policy-copilot",
    type: "section" as const,
    variant: "slide" as const,
    label: "Recent",
    monogram: "Cisco",
    monogramPan: true,
    monogramPanDuration: 14,
    href: ROUTES.ciscoPolicyCopilot,
  },
  {
    id: "archive",
    type: "section" as const,
    variant: "slide" as const,
    label: "Field Notes",
    fieldNotesTitle: "JB's Field Notes",
    href: ROUTES.archive,
  },
  {
    id: "ideas",
    type: "section" as const,
    variant: "slide" as const,
    label: "AI Labs",
    monogramImage: "/assets/index/ideas-monogram.png",
    href: ROUTES.ideas,
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
    mobileNavLabel: "Review",
    monogramImage: "/assets/index/article-cursor-hand.png",
    monogramWireframeImage: "/assets/index/article-cursor-hand-wireframe.png",
    href: `${ROUTES.craft}/design-review-checklist`,
  },
  {
    id: "experiments",
    type: "section" as const,
    variant: "slide" as const,
    label: "Illustration",
    monogramImage: "/assets/index/craft-monogram.png",
    monogramWireframeImage: "/assets/index/craft-monogram-wireframe.png",
    href: ROUTES.craft,
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
/** Desktop / fine-pointer scroll distance between slides — matches rauno.me. */
export const SCROLL_PER_FRAME = 744;
/** Shorter travel on touch — closer to rauno.me mobile scrub length. */
export const SCROLL_PER_FRAME_TOUCH = 400;

/** Scroll distance from first to last slide. */
export const SCROLL_RANGE = (SLIDE_COUNT - 1) * SCROLL_PER_FRAME;

/** Full horizontal track width for all frames. */
export const TRACK_WIDTH = FRAME_WIDTH + (SLIDE_COUNT - 1) * FRAME_STRIDE;

/** Intra-slide parallax — Rauno-style content lag inside slide panels. */
export const PARALLAX_STEP_DIVISOR_DESKTOP = 3;
export const PARALLAX_STEP_DIVISOR_TOUCH = 5;
export const PARALLAX_MAX_DEFAULT = Math.round(FRAME_STRIDE * 0.65);

export const MINIMAP_LINE_WIDTH = 1;
export const MINIMAP_LINE_GAP = 9;
export const MINIMAP_LINE_HEIGHT = 18;
export const MINIMAP_LINE_COUNT = 20;
export const MINIMAP_TRACKER_WIDTH = 30;
export const MINIMAP_RANGE = 160;

/** Bottom offset for floating index chrome (slide nav + chat) — respects home-indicator safe area. */
export const INDEX_FLOATING_BOTTOM =
  "bottom-[max(2rem,env(safe-area-inset-bottom))]";

/** Mobile index chat FAB — above slide nav so Prev/Next stay tappable. */
export const AI_CHAT_FAB_MOBILE_INDEX_BOTTOM =
  "bottom-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))]";

/** Scroll hint sits above slide nav + safe area. */
export const INDEX_SCROLL_HINT_BOTTOM =
  "bottom-[max(7.25rem,calc(env(safe-area-inset-bottom)+6.25rem))]";

/** Minimap / top index chrome — clear notch and Dynamic Island. */
export const INDEX_MINIMAP_TOP =
  "top-[max(4rem,env(safe-area-inset-top))]";

/** Chat ball diameter — keep in sync with `AiChatFab` trigger size. */
export const AI_CHAT_BALL_SIZE_PX = 72;

/** Canvas scale floor + viewport fit for the index slider. */
export const SCALE_MIN = 0.6;
export const SCALE_BASE_MIN = 0.2;
export const SCALE_SCROLL_FACTOR = 0.0001;
export const SCALE_VIEWPORT_WIDTH = 1300;
export const SCALE_VIEWPORT_HEIGHT = 1020;
/** Hero slide rests 5% larger; fades to 1× over the first scroll segment. */
export const INDEX_HERO_STAGE_SCALE = 1.05;
/** Manifest slide rests 15% larger; fades to 1× over the last scroll segment. */
export const INDEX_MANIFEST_STAGE_SCALE = 1.15;

export const HERO_LINES = [
  "Howdy, I'm JB.",
  "Designing AI products, prototyping them in code, and raising the bar for design craft at Cisco.",
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

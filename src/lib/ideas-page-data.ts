/** Editorial copy for `/ideas` — detail.design-style cards. */
import type { IdeasCardPreviewSize } from "@/lib/ideas-card-sizes";

export const IDEAS_PAGE_INTRO = {
  title: "Some other things I do",
  question:
    "Something I get asked a lot is: JB, why do you have so much time outside of work?",
  answer: "My answer is: I have no idea.",
} as const;

export interface IdeasCardMeta {
  subtext: string;
  chips: readonly string[];
  editorNote: string;
  /** Fixed preview frame — media is cropped to fit, not the other way around. */
  previewSize: IdeasCardPreviewSize;
}

export const IDEAS_DETAIL_AUTHOR = {
  name: "JB",
  initials: "JB",
} as const;

const IDEAS_CARD_META: Record<string, IdeasCardMeta> = {
  "ghost-spacer": {
    subtext: "An accountability timer that keeps you locked in when focus slips.",
    chips: ["AI experiment"],
    editorNote:
      "A focus timer that helps people stay accountable during work sessions. I designed the timer, warning alerts, and countdown screens in Figma Make, then built and deployed it using Cursor.",
    previewSize: "tall",
  },
  "spring-physics": {
    subtext: "A gift reveal mini-app built around spring physics and delight.",
    chips: ["AI experiment", "Motion"],
    editorNote:
      "A small interactive gift-opening experience with fun spring animations. I explored the reveal flow in Figma Make, then built the motion, timing, and interactions in Cursor.",
    previewSize: "compact",
  },
  "click-sound": {
    subtext: "Sketch-to-image playground powered by generative AI.",
    chips: ["AI experiment"],
    editorNote:
      "A tool where users can draw a rough sketch and turn it into an AI-generated image. I designed the drawing flow in Figma Make, used Gemini for image generation, and built the experience in Cursor.",
    previewSize: "standard",
  },
  "scroll-slider": {
    subtext: "A playful CAPTCHA that asks you to prove you are friends.",
    chips: ["AI experiment"],
    editorNote:
      "A fun CAPTCHA-style game where friends answer simple questions about each other. I created the first prototype in Figma Make, then built the full working game in Cursor over a weekend.",
    previewSize: "wide",
  },
  "clip-reveal": {
    subtext: "Distraction-free browsing with a clip-reveal focus shell.",
    chips: ["AI experiment", "Motion"],
    editorNote:
      "A clean reading space designed to remove distractions and help users focus. I designed the layout and reading flow in Figma Make, then built the animations and transitions in Cursor.",
    previewSize: "tall",
  },
};

export function getIdeasCardMeta(slug: string): IdeasCardMeta {
  return (
    IDEAS_CARD_META[slug] ?? {
      subtext: "Side project and interface experiment.",
      chips: ["AI experiment"],
      editorNote:
        "Side project built with Figma Make for interaction design and Cursor for production code.",
      previewSize: "standard",
    }
  );
}

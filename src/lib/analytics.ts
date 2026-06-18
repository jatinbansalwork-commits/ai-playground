import { track } from "@vercel/analytics";

export type ProjectOpenSource = "projects";

export type ContactMethod = "linkedin" | "email" | "jb_manual";

export type CaseStudyScrollDepth = 25 | 50 | 75 | 100;

export type IndexNavigateMethod = "scroll" | "nav" | "keyboard" | "minimap";

export function trackContactClick(method: ContactMethod): void {
  track("contact_click", { method });
}

export function trackResumeDownload(): void {
  track("resume_download");
}

export function trackProjectOpen(
  slug: string,
  source: ProjectOpenSource,
): void {
  track("project_open", { slug, source });
}

export function trackCraftItemClick(properties: {
  slug: string;
  category: string;
  external: boolean;
}): void {
  track("craft_item_click", properties);
}

export function trackCaseStudyScrollDepth(
  slug: string,
  depth: CaseStudyScrollDepth,
): void {
  track("case_study_scroll_depth", { slug, depth: String(depth) });
}

export function trackIndexFrameView(properties: {
  frame_id: string;
  frame_label: string;
  index: number;
}): void {
  track("index_frame_view", {
    frame_id: properties.frame_id,
    frame_label: properties.frame_label,
    index: String(properties.index),
  });
}

export function trackIndexFrameNavigate(properties: {
  from: string;
  to: string;
  method: IndexNavigateMethod;
}): void {
  track("index_frame_navigate", properties);
}

export function trackExternalDemoOpen(properties: {
  slug: string;
  url: string;
}): void {
  track("external_demo_open", properties);
}

export function trackCaseStudyRevealImpression(properties: {
  slug: string;
  remaining_hours: string;
}): void {
  track("case_study_reveal_impression", properties);
}

export function trackCaseStudyRevealed(slug: string): void {
  track("case_study_revealed", { slug });
}

export type MediaPlaySurface = "case-study" | "craft";

export type AiChatOpenSource =
  | "fab"
  | "cta"
  | "projects"
  | "craft"
  | "case-study-hero"
  | "case-study-footer";

export function mediaIdFromSrc(src: string): string {
  const normalized = src.split("?")[0]?.split("#")[0] ?? src;
  const segment = normalized.split("/").pop();
  if (!segment) return src;
  return segment.replace(/\.[^.]+$/, "");
}

export function trackMediaPlay(properties: {
  surface: MediaPlaySurface;
  media_id: string;
  slug?: string;
}): void {
  track("media_play", {
    surface: properties.surface,
    media_id: properties.media_id,
    ...(properties.slug ? { slug: properties.slug } : {}),
  });
}

export function trackAiChatOpen(source: AiChatOpenSource = "fab"): void {
  track("ai_chat_open", { source });
}

export function trackAiChatChipClick(intentId: string): void {
  track("ai_chat_chip_click", { intent_id: intentId });
}

export function trackAiChatMessage(source: "chip" | "typed"): void {
  track("ai_chat_message", { source });
}

export function trackAiChatReplySource(
  source: "static" | "openai" | "fallback",
): void {
  track("ai_chat_reply", { source });
}

export function trackAiChatClose(messageCount: number): void {
  track("ai_chat_close", { message_count: String(messageCount) });
}

export function trackAiChatWireframeToggle(enabled: boolean): void {
  track("ai_chat_wireframe_toggle", { enabled: enabled ? "1" : "0" });
}

export function trackAiChatGif(giphyId?: string): void {
  track("ai_chat_gif", {
    ...(giphyId ? { giphy_id: giphyId } : {}),
  });
}

export function trackAiChatError(reason: "network" | "stream"): void {
  track("ai_chat_error", { reason });
}

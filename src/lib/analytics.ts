import { track } from "@vercel/analytics";

export type ProjectOpenSource = "projects";

export type ContactMethod = "linkedin" | "email" | "jb_manual";

export type CaseStudyScrollDepth = 25 | 50 | 75 | 100;

export type IndexNavigateMethod = "scroll" | "nav" | "keyboard" | "minimap";

export function trackContactClick(method: ContactMethod): void {
  track("contact_click", { method });
}

/** Once per session — landing context; pair with Countries filter in Vercel Analytics. */
export function trackSiteEntry(properties: {
  landing_path: string;
  referrer_host: string;
  timezone: string;
  locale: string;
}): void {
  track("site_entry", properties);
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

/** Design review essay page load (`/craft/design-review-checklist`). */
export function trackDesignReviewView(slug: string): void {
  track("design_review_view", { slug });
}

/** Ideas gallery page load (`/ideas`). */
export function trackIdeasView(): void {
  track("ideas_view");
}

/** Craft gallery page load (`/craft`). */
export function trackCraftView(): void {
  track("craft_view");
}

/** Projects index page load (`/projects`). */
export function trackProjectsView(): void {
  track("projects_view");
}

/** Me / archive page load (`/archive`). */
export function trackArchiveView(): void {
  track("archive_view");
}

export type IdeasExperimentViewSource = "click";

/** AI experiment opened from the Ideas gallery — external demo click. */
export function trackIdeasExperimentView(properties: {
  slug: string;
  source: IdeasExperimentViewSource;
  external?: boolean;
}): void {
  track("ideas_experiment_view", {
    slug: properties.slug,
    source: properties.source,
    ...(properties.external !== undefined
      ? { external: properties.external ? "1" : "0" }
      : {}),
  });
}

/** Ideas gallery card CTA click — Try Now on `/ideas`. */
export function trackIdeasItemClick(properties: {
  slug: string;
  cta: string;
  url: string;
}): void {
  track("ideas_item_click", properties);
}

export function trackCraftItemClick(properties: {
  slug: string;
  category: string;
  external: boolean;
}): void {
  track("craft_item_click", properties);
}

/** Craft gallery filter tab change. */
export function trackCraftFilter(filter: string): void {
  track("craft_filter", { filter });
}

/** Index slide link click — visitor leaves the slider for a section. */
export function trackIndexSlideClick(properties: {
  frame_id: string;
  frame_label: string;
  href: string;
}): void {
  track("index_slide_click", properties);
}

/** Projects index row click — before case study navigation. */
export function trackProjectListClick(slug: string): void {
  track("project_list_click", { slug });
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

export type MediaPlaySurface = "case-study" | "craft" | "ideas";

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

/** Detected visitor goal for the latest message — hiring, resume, Saltbot, etc. */
export function trackAiChatIntent(properties: {
  intent_id: string;
  confidence: "high" | "low";
  input?: "chip" | "typed";
}): void {
  track("ai_chat_intent", {
    intent_id: properties.intent_id,
    confidence: properties.confidence,
    ...(properties.input ? { input: properties.input } : {}),
  });
}

/** Fired when the chat closes — breakdown of the session transcript. */
export function trackAiChatSessionMessages(properties: {
  user_messages: number;
  assistant_messages: number;
  total_messages: number;
  gifs_shown: number;
}): void {
  track("ai_chat_session_messages", {
    user_messages: String(properties.user_messages),
    assistant_messages: String(properties.assistant_messages),
    total_messages: String(properties.total_messages),
    gifs_shown: String(properties.gifs_shown),
  });
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

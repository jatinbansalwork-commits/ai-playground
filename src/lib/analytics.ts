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

/** Projects index row click — before case study navigation. */
export function trackProjectListClick(properties: {
  slug: string;
  title: string;
  year: string;
}): void {
  track("project_list_click", properties);
}

export function trackProjectOpen(
  slug: string,
  source: ProjectOpenSource,
  title?: string,
): void {
  track("project_open", {
    slug,
    source,
    ...(title ? { title } : {}),
  });
}

/** Design review essay page load (`/craft/design-review-checklist`). */
export function trackDesignReviewView(slug: string): void {
  track("design_review_view", { slug });
}

/** AI Experiment gallery page load (`/ideas`). */
export function trackAiExperimentView(): void {
  track("ai_experiment_view");
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

/** JB's Case Notes article page load (`/notes/1`). */
export function trackFieldNotesView(properties: {
  note_id: string;
  title: string;
}): void {
  track("field_notes_view", {
    note_id: properties.note_id,
    title: properties.title,
  });
}

/** AI Experiment detail modal opened from the gallery grid. */
export function trackAiExperimentDetailView(slug: string): void {
  track("ai_experiment_detail_view", { slug });
}

/** AI Experiment gallery interaction — detail modal or live demo CTA. */
export function trackAiExperimentItemClick(properties: {
  slug: string;
  cta: "card" | "live-demo" | string;
  url: string;
}): void {
  track("ai_experiment_item_click", properties);
}

export function trackCraftItemClick(properties: {
  slug: string;
  category: string;
  external: boolean;
}): void {
  track("craft_item_click", properties);
}

/** Craft gallery filter tab change — legacy bento gallery only. */
export function trackCraftFilter(filter: string): void {
  track("craft_filter", { filter });
}

/** Index slide link click — visitor leaves the slider for a section (or opens an external tab). */
export function trackIndexSlideClick(properties: {
  frame_id: string;
  frame_label: string;
  href: string;
  external?: boolean;
}): void {
  track("index_slide_click", {
    frame_id: properties.frame_id,
    frame_label: properties.frame_label,
    href: properties.href,
    ...(properties.external != null ? { external: properties.external } : {}),
  });
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
  surface?: "ai-experiment" | "craft";
}): void {
  track("external_demo_open", {
    slug: properties.slug,
    url: properties.url,
    ...(properties.surface ? { surface: properties.surface } : {}),
  });
}

export type MediaPlaySurface = "case-study" | "craft" | "ai-experiment";

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
  goal?: string;
}): void {
  track("ai_chat_intent", {
    intent_id: properties.intent_id,
    confidence: properties.confidence,
    ...(properties.input ? { input: properties.input } : {}),
    ...(properties.goal ? { goal: properties.goal.slice(0, 120) } : {}),
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

export function trackAiChatDarkroomToggle(enabled: boolean): void {
  track("ai_chat_darkroom_toggle", { enabled: enabled ? "1" : "0" });
}

export function trackAiChatSecretUnlock(secret: string): void {
  track("ai_chat_secret", { secret: secret.slice(0, 40) });
}

export function trackGoogleEasterEgg(kind: "barrel_roll" | "askew" | "feeling_lucky"): void {
  track("google_easter_egg", { kind });
}

export function trackCursorLabelCycle(label: string): void {
  track("cursor_label_cycle", { label: label.slice(0, 40) });
}

export function trackManifestVisit(count: number): void {
  track("manifest_visit", { count: String(count) });
}

export function trackAiChatGif(giphyId?: string): void {
  track("ai_chat_gif", {
    ...(giphyId ? { giphy_id: giphyId } : {}),
  });
}

export function trackAiChatError(reason: "network" | "stream"): void {
  track("ai_chat_error", { reason });
}

/** Policy Copilot interactive demo — Cisco case study hero workspace. */
export type PolicyCopilotDemoAction =
  | "prompt_select"
  | "understand_intent"
  | "clarification_answer"
  | "clarification_field_edit"
  | "clarification_field_why"
  | "draft_revealed"
  | "validation_complete"
  | "simulation_visible"
  | "recommendation_apply"
  | "recommendation_dismiss"
  | "approve"
  | "reset"
  | "dashboard_stat";

export function trackPolicyCopilotDemo(properties: {
  action: PolicyCopilotDemoAction;
  scenario_id?: string;
  prompt?: string;
  clarification_id?: string;
  recommendation_id?: string;
  confidence?: number;
}): void {
  track("policy_copilot_demo", {
    action: properties.action,
    slug: "cisco-policy-copilot",
    ...(properties.scenario_id ? { scenario_id: properties.scenario_id } : {}),
    ...(properties.prompt ? { prompt: properties.prompt.slice(0, 80) } : {}),
    ...(properties.clarification_id
      ? { clarification_id: properties.clarification_id }
      : {}),
    ...(properties.recommendation_id
      ? { recommendation_id: properties.recommendation_id }
      : {}),
    ...(properties.confidence != null
      ? { confidence: String(properties.confidence) }
      : {}),
  });
}

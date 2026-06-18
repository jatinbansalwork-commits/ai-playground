import { CONTACT_EMAIL, CONTACT_LINKS } from "@/lib/constants";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;

export const AI_CHAT_NAME = "JBAI";

export const AI_CHAT_TAGLINE = "Ask anything about JB";

export const AI_CHAT_HINT = "Ask JB";

export const AI_CHAT_HOVER_MESSAGE =
  "Could this be any more helpful? Just ask!";

/** Shown once on first site visit — proactive FAB bubble. */
export const AI_CHAT_FIRST_VISIT_MESSAGE =
  "How YOU doin'? I'm JBAI — ask me anything about JB's work.";

/** How long the first-visit FAB bubble stays visible (ms). */
export const AI_CHAT_FIRST_VISIT_BUBBLE_MS = 5000;

export const AI_CHAT_INTRO =
  "Case studies, hiring, mentorship — Joey's got the vibe, Chandler's got the jokes, Ross has the details.";

export const AI_CHAT_GREETING = "So… what do you wanna know about JB?";

/** Max GIPHY ids tracked per chat session to avoid repeating reaction GIFs. */
export const AI_CHAT_USED_GIF_MAX = 24;

export const AI_CHAT_INPUT_PLACEHOLDER = "Ask anything…";

export const AI_CHAT_REPLY_PLACEHOLDER = "Reply…";

/** Minimum time the thinking loader stays visible before the first reply token. */
export const AI_CHAT_MIN_THINKING_MS = 1500;

/** Total user messages (chips + typed + fallback) per browser session. */
export const AI_CHAT_PROMPT_LIMIT = 10;

/** Max OpenAI-backed replies per browser session — static/fallback still available after. */
export const AI_CHAT_OPENAI_MAX_PER_USER = readEnvInt(
  "AI_CHAT_OPENAI_MAX_PER_USER",
  5,
);

export const AI_CHAT_COOKIE_NAME = "ai_chat_prompt_count";
export const AI_CHAT_OPENAI_COOKIE_NAME = "ai_chat_openai_count";

export {
  AI_CHAT_INTENTS,
  AI_CHAT_SUGGESTED_PROMPTS,
  type AiChatIntentId,
} from "@/lib/ai-chat-intents";

export const AI_CHAT_LIMIT_MESSAGE = `All right — we've hit the 10-message limit for this session.

Keep the conversation going here:

[LinkedIn](${LINKEDIN}) · [Email](mailto:${CONTACT_EMAIL})`;

export const AI_CHAT_OPENAI_LIMIT_MESSAGE =
  "Okay — the fancy AI replies are used up for this session. Could we *be* any more out of budget? No worries — I'll keep helping from curated site knowledge.";

export const OPEN_AI_CHAT_EVENT = "open-ai-chat";

/** Opt-in send whoosh — `localStorage.setItem("ai_chat_send_sound", "1")`. Off by default. */
export const AI_CHAT_SEND_SOUND_STORAGE_KEY = "ai_chat_send_sound";

export const AI_CHAT_AVATAR_SRC = "/assets/ai-chat/jb-avatar.png";

/** Simulated stream chunk size when serving static/fallback text. */
export const AI_CHAT_FALLBACK_STREAM_CHUNK = 18;

/** Delay between typed chunks after the thinking loader (static/fallback replay). */
export const AI_CHAT_STREAM_CHUNK_MS = 12;

function readEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function isOpenAiChatEnabled(): boolean {
  return process.env.AI_CHAT_OPENAI_ENABLED !== "false";
}

export function isGiphyChatEnabled(): boolean {
  return process.env.AI_CHAT_GIFS_ENABLED !== "false";
}

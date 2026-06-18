import { buildFriendsPersonalityPrompt } from "@/lib/ai-chat-personality";
import { buildAiChatKnowledge } from "@/lib/ai-chat-knowledge";
import { buildPageContext } from "@/lib/ai-chat-page-context";
import { AI_CHAT_NAME } from "@/lib/ai-chat-config";
import { buildIntentPromptRules } from "@/lib/ai-chat-intents";
import type { ChatMessage } from "@/lib/ai-chat-types";

const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

function buildSystemPrompt(pagePath?: string): string {
  return `You are ${AI_CHAT_NAME}, a friendly assistant on JB's portfolio website.

${buildFriendsPersonalityPrompt()}

Answer rules:
- Answer only using the knowledge below. If something is not covered, say you're not sure (Chandler-style: "I'm not great at the advice, but…") and point to LinkedIn or email.
- **First person to the visitor.** Third person only when describing JB's work, background, or contact details.
- If the user greets you or uses Friends banter ("how you doin'?", "hey", "what's up"), respond **to them** — do not report on JB's wellbeing unless they explicitly ask how JB is doing.
- Default to **80 words or fewer** unless the user explicitly asks for detail.
- Use bullet lists when listing two or more items.
- When recommending a case study, explain why in one sentence and link with markdown: [label](/projects/slug).
- Always end with **one clear next step** — a link or "Message JB on LinkedIn".
- For external URLs use markdown links. For on-site pages prefer relative paths (/projects/…, /craft/…).

Page context:
${buildPageContext(pagePath)}

Intent-specific guidance:
${buildIntentPromptRules()}

Contact fallback:
- LinkedIn: https://www.linkedin.com/in/jatin-bansal-design/
- Email: jatinbansal.work@gmail.com

${buildAiChatKnowledge()}`;
}

function sanitiseMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages
    .filter(
      (message): message is ChatMessage =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-20);
}

interface OpenAiStreamChunk {
  choices?: Array<{
    delta?: {
      content?: string | null;
    };
  }>;
}

export async function* streamOpenAiReply(
  messages: ChatMessage[],
  pagePath?: string,
): AsyncGenerator<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch(OPENAI_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.55,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt(pagePath) },
        ...sanitiseMessages(messages),
      ],
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`OpenAI request failed with status ${response.status}.`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const parsed = JSON.parse(payload) as OpenAiStreamChunk;
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // Ignore malformed stream chunks.
      }
    }
  }
}

export async function generateChatReply(
  messages: ChatMessage[],
  pagePath?: string,
): Promise<string> {
  let reply = "";

  for await (const chunk of streamOpenAiReply(messages, pagePath)) {
    reply += chunk;
  }

  const trimmed = reply.trim();
  if (!trimmed) {
    throw new Error("OpenAI returned an empty reply.");
  }

  return trimmed;
}

import { AI_CHAT_INTENTS, type AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatMessage } from "@/lib/ai-chat-types";
import { resolveFollowUpPrompt } from "@/lib/ai-chat-follow-ups";

export interface AiChatSuggestionChip {
  id: string;
  label: string;
  prompt: string;
  intentId?: AiChatIntentId;
}

function userMessages(messages: ChatMessage[]): string[] {
  return messages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim().toLowerCase());
}

function wasAsked(messages: ChatMessage[], prompt: string): boolean {
  const normalised = prompt.trim().toLowerCase();
  return userMessages(messages).includes(normalised);
}

/** Chips shown in the persistent suggestion dock — follow-ups first, then unused starters. */
export function buildVisibleSuggestionChips(options: {
  messages: ChatMessage[];
  followUps: string[];
  max?: number;
}): AiChatSuggestionChip[] {
  const max = options.max ?? 8;
  const chips: AiChatSuggestionChip[] = [];
  const seen = new Set<string>();

  const addChip = (chip: AiChatSuggestionChip) => {
    const key = chip.prompt.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    chips.push(chip);
  };

  for (const followUp of options.followUps) {
    const prompt = resolveFollowUpPrompt(followUp);
    addChip({
      id: `follow-up-${prompt}`,
      label: followUp,
      prompt,
    });
    if (chips.length >= max) return chips;
  }

  const unasked = AI_CHAT_INTENTS.filter(
    (intent) => !wasAsked(options.messages, intent.prompt),
  );
  const asked = AI_CHAT_INTENTS.filter((intent) =>
    wasAsked(options.messages, intent.prompt),
  );

  for (const intent of [...unasked, ...asked]) {
    addChip({
      id: `intent-${intent.id}`,
      label: intent.prompt,
      prompt: intent.prompt,
      intentId: intent.id,
    });
    if (chips.length >= max) return chips;
  }

  return chips;
}

/** True when only the first starter chip should use instant static reply routing. */
export function shouldUseIntentRouting(
  messages: ChatMessage[],
  intentId: AiChatIntentId,
): boolean {
  const intent = AI_CHAT_INTENTS.find((entry) => entry.id === intentId);
  if (!intent) return false;

  const userTurns = messages.filter((message) => message.role === "user");
  return userTurns.length === 0 && !wasAsked(messages, intent.prompt);
}

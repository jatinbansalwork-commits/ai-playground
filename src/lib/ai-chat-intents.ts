import { CONTACT_EMAIL, CONTACT_LINKS, JB_CONTACT_PHONE, JB_CONTACT_PHONE_TEL, ROUTES } from "@/lib/constants";

const LINKEDIN = CONTACT_LINKS.find((link) => link.label === "LinkedIn")!.href;
const RESUME = CONTACT_LINKS.find((link) => link.label === "Resume")!.href;
const JB_MANUAL = CONTACT_LINKS.find((link) => link.label === "JB Manual")!.href;

export type AiChatIntentId =
  | "strongest-project"
  | "cisco"
  | "process"
  | "reach";

export interface AiChatIntent {
  id: AiChatIntentId;
  prompt: string;
  /** Injected into the system prompt — guides OpenAI on follow-up turns. */
  instruction: string;
  /** Instant first reply when the user taps this chip (no OpenAI call). */
  staticReply: string;
}

export const AI_CHAT_INTENTS: readonly AiChatIntent[] = [
  {
    id: "strongest-project",
    prompt: "What's JB's strongest project?",
    instruction:
      "If they ask for JB's strongest / best / flagship project: compare 1–2 strengths (Policy Copilot for high-stakes AI UX, Saltbot for speed, Piggy for research impact). Lead with Policy Copilot + ~40% policy-generation time, mention Piggy 19% tickets or Saltbot ~5s analytics as runners-up. End with a clear next step and markdown case study links. Warm third-person about JB; one Friends line max.",
    staticReply: `That's a tough call — they shine in different ways — but if I had to pick, **Cisco Policy Copilot** stands out for clarity under real pressure.

Firewall policy is high-stakes: one wrong rule and you break access or open risk. JB flipped the order — start with the business ask, reflect understanding, then draft — so admins aren't stuck holding intent and ports in the same thread. The case positions **~40% less policy-generation time**, with humans still owning Approve.

**Saltbot** is the other flagship for AI UX: analytics answers in ~5 seconds instead of spreadsheets. And **Piggy** shows research punch — **19% fewer** mutual-fund support tickets from clearer status and flows.

Core pattern: find the real pain, then ship something measurable.

Want [Policy Copilot](${ROUTES.ciscoPolicyCopilot}), [Saltbot](${ROUTES.projects}/saltbot-ai-saltmine), or [Piggy](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets) next?`,
  },
  {
    id: "cisco",
    prompt: "Tell me about Cisco Policy Copilot",
    instruction:
      "If they ask about Cisco Policy Copilot / firewall AI: cover intent-first flow, validation, human approve, ~40% time claim, and link the full case plus JB's Case Notes #1 for the short read. Warm, concrete, metrics over fluff. One Friends line max.",
    staticReply: `Policy Copilot is JB's flagship at Cisco — AI-assisted firewall policy for Hybrid Mesh Firewall.

Admins describe outcomes in plain language; Copilot reflects who/what/conditions, maps inventory objects, runs visible validation, and keeps every draft out of production until a human approves. There's also **[JB's Case Notes #1](${ROUTES.fieldNotesOne})** — a shorter note on why dumping a full policy draft into chat fails, and why a side-by-side workspace works better.

Want the [full case](${ROUTES.ciscoPolicyCopilot}), the Case Notes, or how he thinks about trust in AI?`,
  },
  {
    id: "process",
    prompt: "What's his design process?",
    instruction:
      "If they ask about JB's process / how he works: intent-first, prototype-in-code, ship systems (FreshPrints 4 teams), measure impact (Piggy 19%, Kalash 1M+). Numbered steps optional. Link one proof case study. One Friends line max.",
    staticReply: `JB works **intent-first, prototype-in-code**. Roughly:

1. **Start with the real ask** — business language before control panels ([Policy Copilot](${ROUTES.ciscoPolicyCopilot}))
2. **Prove it in product** — interactive demos, not slideware
3. **Ship systems** — FreshPrints design system stopped UI debates and helped **4 product teams** ship faster
4. **Measure impact** — Piggy −19% tickets; Kalash gold savings for **1M+** users

Craft + AI Labs sit beside the case studies when you want process experiments.

Want to see that in a case — [Policy Copilot](${ROUTES.ciscoPolicyCopilot}), [FreshPrints](${ROUTES.projects}/freshprints-design-system), or [Piggy](${ROUTES.projects}/piggy-reduced-mutual-fund-support-tickets)?`,
  },
  {
    id: "reach",
    prompt: "How do I reach him?",
    instruction:
      "If they ask how to reach / contact JB: share LinkedIn, email, resume, and JB Manual. For hiring specifically, prefer the phone number. Soft CTA — offer a case first or hiring next. One Friends line max.",
    staticReply: `Best ways to connect:

- **[LinkedIn](${LINKEDIN})**
- **[Email](mailto:${CONTACT_EMAIL})**
- **[Resume](${RESUME})**
- **[JB Manual](${JB_MANUAL})** for how he likes to work
- Hiring? Call **[${JB_CONTACT_PHONE}](${JB_CONTACT_PHONE_TEL})**

Want a case first, or jump straight to hiring?`,
  },
] as const;

export const AI_CHAT_SUGGESTED_PROMPTS = AI_CHAT_INTENTS.map(
  (intent) => intent.prompt,
);

const intentById = new Map(AI_CHAT_INTENTS.map((intent) => [intent.id, intent]));
const intentByPrompt = new Map(
  AI_CHAT_INTENTS.map((intent) => [intent.prompt, intent]),
);

export function getAiChatIntent(id: AiChatIntentId): AiChatIntent | undefined {
  return intentById.get(id);
}

export function resolveAiChatIntentFromPrompt(
  prompt: string,
): AiChatIntent | undefined {
  return intentByPrompt.get(prompt.trim());
}

export function getChipStaticReply(id: AiChatIntentId): string | undefined {
  return intentById.get(id)?.staticReply;
}

export function buildIntentPromptRules(): string {
  return AI_CHAT_INTENTS.map(
    (intent) => `- ${intent.instruction}`,
  ).join("\n");
}

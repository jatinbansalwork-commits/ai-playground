import { ROUTES } from "@/lib/constants";

function normaliseSecret(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[?!.,]+$/g, "")
    .replace(/\s+/g, " ");
}

/** Chat passwords — Friends-flavoured joke + a public case link. */
const SECRET_REPLIES: ReadonlyArray<{
  match: (text: string) => boolean;
  reply: string;
}> = [
  {
    match: (text) => text === "pivot" || text === "we were on a break",
    reply: `Okay, hear me out — **PIVOT!** (Ross energy, sorry.)

That scramble is basically Policy Copilot: start with the messy ask, then turn it into something you can actually approve.

Peek at [Cisco Policy Copilot](${ROUTES.ciscoPolicyCopilot}) when you're ready for the grown-up version.`,
  },
  {
    match: (text) =>
      text === "could this be any more" ||
      text.includes("could this be any more") ||
      text === "could this *be* any more",
    reply: `Could this *be* any more Chandler?

Fine — here's the real bit: JB ships systems so teams stop debating buttons. Start with [FreshPrints Design System](${ROUTES.projects}/freshprints-design-system).`,
  },
  {
    match: (text) => text === "friends" || text === "central perk",
    reply: `How YOU doin'? You found a soft secret.

I'm JB_AI — Joey warmth, Chandler asides, Ross structure. Want proof JB designs for speed? [Saltbot](${ROUTES.projects}/saltbot-ai-saltmine) gets analytics answers in ~5 seconds.`,
  },
];

export function resolveChatSecretReply(text: string): string | null {
  const normalised = normaliseSecret(text);
  if (!normalised) return null;

  for (const secret of SECRET_REPLIES) {
    if (secret.match(normalised)) return secret.reply;
  }

  return null;
}

export function isChatSecretPrompt(text: string): boolean {
  return resolveChatSecretReply(text) !== null;
}

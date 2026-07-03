export type SpeedTier = "fast" | "balanced" | "slow";

export type Sentiment = "Positive" | "Neutral" | "Analytical";

export type ResponseBlock =
  | { type: "paragraph"; text: string; anchor: string }
  | { type: "bullets"; lead?: string; items: string[]; anchor: string }
  | { type: "code"; language: string; code: string; anchor: string };

export interface PromptForkModel {
  id: string;
  name: string;
  latencyMs: number;
  speedTier: SpeedTier;
  tokenCount: number;
  sentiment: Sentiment;
  cost: string;
  blocks: ResponseBlock[];
}

export const PROMPT_FORK_HINT = "Press Enter to fork across 3 models";

export const PROMPT_FORK_FORK_ANIMATION_MS = 600;

export const PROMPT_FORK_STREAM_CHUNK_SIZE = 3;

export const PROMPT_FORK_STREAM_DELAY_MS = 16;

export const PROMPT_FORK_VARIANCE_THRESHOLD = 0.35;

export const PROMPT_FORK_MODELS: PromptForkModel[] = [
  {
    id: "a",
    name: "Sonnet 3.5",
    latencyMs: 1200,
    speedTier: "fast",
    tokenCount: 142,
    sentiment: "Positive",
    cost: "$0.0021",
    blocks: [
      {
        type: "paragraph",
        anchor: "intro",
        text: "Here is a quick take on building resilient AI comparison UIs:",
      },
      {
        type: "bullets",
        anchor: "points",
        lead: "Key principles",
        items: [
          "Show latency per model — users trust what they can measure",
          "Stream tokens to signal progress, not just spinners",
          "Align structural sections so differences are scannable",
        ],
      },
      {
        type: "paragraph",
        anchor: "close",
        text: "Keep the first response short. Speed beats depth when prototyping.",
      },
    ],
  },
  {
    id: "b",
    name: "GPT-4o",
    latencyMs: 2500,
    speedTier: "balanced",
    tokenCount: 287,
    sentiment: "Neutral",
    cost: "$0.0048",
    blocks: [
      {
        type: "paragraph",
        anchor: "intro",
        text: "When designing interfaces for multi-model AI comparison, the primary challenge is communicating asynchronous completion without overwhelming the user. Each model may finish at a different time, and the interface should make that variance legible rather than hiding it behind a single global loading state.",
      },
      {
        type: "paragraph",
        anchor: "points",
        text: "A balanced approach pairs per-column progress indicators with a shared prompt context anchored at the top. Users can scan horizontally once all columns settle, comparing tone, structure, and factual emphasis. Skeleton placeholders should mirror the final card layout to minimise layout shift.",
      },
      {
        type: "paragraph",
        anchor: "close",
        text: "For portfolio demonstrations, simulated latency with realistic stagger (fast, balanced, reasoning) effectively communicates the UX problem without requiring live API calls.",
      },
    ],
  },
  {
    id: "c",
    name: "DeepSeek-R1",
    latencyMs: 4000,
    speedTier: "slow",
    tokenCount: 512,
    sentiment: "Analytical",
    cost: "$0.0092",
    blocks: [
      {
        type: "paragraph",
        anchor: "intro",
        text: "Multi-model comparison UIs can be modelled as a fork-join pipeline: a single prompt fans out to N inference workers, each with independent latency distributions L_i ~ f(theta_i). The rendering layer must handle partial results — columns transition from loading → streaming → settled independently.",
      },
      {
        type: "paragraph",
        anchor: "points",
        text: "Anchor alignment maps semantically equivalent sections across responses using pre-indexed block identifiers. Variance highlighting applies sentence-level Jaccard similarity; sentences below threshold tau are tinted to surface divergent reasoning paths.",
      },
      {
        type: "code",
        anchor: "close",
        language: "typescript",
        code: `async function forkPrompt(prompt: string, models: Model[]) {
  const streams = models.map((m) =>
    infer(m, prompt).then((r) => streamTokens(r, m.latencyMs))
  );
  return Promise.all(streams);
}`,
      },
    ],
  },
];

export function blocksToPlainText(blocks: ResponseBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "bullets") {
        const lead = block.lead ? `${block.lead}\n` : "";
        const items = block.items.map((item) => `• ${item}`).join("\n");
        return `${lead}${items}`;
      }
      return `\`\`\`${block.language}\n${block.code}\n\`\`\``;
    })
    .join("\n\n");
}

export function getSpeedBadgeClass(tier: SpeedTier): string {
  switch (tier) {
    case "fast":
      return "bg-emerald-700 text-white";
    case "balanced":
      return "bg-amber-700 text-white";
    case "slow":
      return "bg-red-700 text-white";
  }
}

export function getSentimentBadgeClass(sentiment: Sentiment): string {
  switch (sentiment) {
    case "Positive":
      return "bg-blue-700 text-white";
    case "Neutral":
      return "bg-purple-700 text-white";
    case "Analytical":
      return "bg-indigo-700 text-white";
  }
}

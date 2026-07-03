import {
  PROMPT_FORK_VARIANCE_THRESHOLD,
  type ResponseBlock,
} from "@/components/prompt-fork/prompt-fork-config";

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean),
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function computeVariantSentenceIndices(
  allModelTexts: string[][],
): Set<number> {
  const variantIndices = new Set<number>();
  const maxSentences = Math.max(...allModelTexts.map((texts) => texts.length));

  for (let index = 0; index < maxSentences; index += 1) {
    const sentences = allModelTexts.map((texts) => texts[index] ?? "");
    const tokens = sentences.map((sentence) => tokenize(sentence));

    let minSimilarity = 1;
    for (let i = 0; i < tokens.length; i += 1) {
      for (let j = i + 1; j < tokens.length; j += 1) {
        minSimilarity = Math.min(
          minSimilarity,
          jaccardSimilarity(tokens[i]!, tokens[j]!),
        );
      }
    }

    if (minSimilarity < PROMPT_FORK_VARIANCE_THRESHOLD) {
      variantIndices.add(index);
    }
  }

  return variantIndices;
}

export function extractAnchorTexts(blocks: ResponseBlock[]): string[] {
  const byAnchor = new Map<string, string[]>();

  for (const block of blocks) {
    const existing = byAnchor.get(block.anchor) ?? [];
    if (block.type === "paragraph") {
      existing.push(block.text);
    } else if (block.type === "bullets") {
      if (block.lead) existing.push(block.lead);
      existing.push(...block.items);
    } else {
      existing.push(block.code);
    }
    byAnchor.set(block.anchor, existing);
  }

  return Array.from(byAnchor.keys());
}

export function getVarianceTintClass(
  columnIndex: number,
  isVariant: boolean,
): string {
  if (!isVariant) return "";
  return columnIndex % 2 === 0 ? "bg-amber-500/15" : "bg-teal-500/15";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function replayTokenStream(
  text: string,
  options: {
    chunkSize: number;
    chunkDelayMs: number;
    reducedMotion: boolean;
    onChunk: (accumulated: string) => void;
  },
): Promise<void> {
  if (options.reducedMotion || options.chunkDelayMs === 0) {
    options.onChunk(text);
    return;
  }

  const chunks: string[] = [];
  for (let index = 0; index < text.length; index += options.chunkSize) {
    chunks.push(text.slice(index, index + options.chunkSize));
  }

  let accumulated = "";
  for (let index = 0; index < chunks.length; index += 1) {
    accumulated += chunks[index];
    options.onChunk(accumulated);
    if (index < chunks.length - 1) {
      await sleep(options.chunkDelayMs);
    }
  }
}

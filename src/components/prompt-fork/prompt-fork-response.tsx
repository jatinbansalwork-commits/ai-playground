"use client";

import type { ResponseBlock } from "@/components/prompt-fork/prompt-fork-config";
import {
  getVarianceTintClass,
  splitSentences,
} from "@/components/prompt-fork/prompt-fork-variance";

interface PromptForkResponseProps {
  blocks: ResponseBlock[];
  streamedLength: number;
  isStreaming: boolean;
  activeAnchor: string | null;
  onAnchorEnter: (anchor: string) => void;
  onAnchorLeave: () => void;
  highlightVariance: boolean;
  variantSentenceIndices: Set<number>;
  columnIndex: number;
}

interface BlockMeta {
  block: ResponseBlock;
  blockIndex: number;
  plain: string;
  blockStart: number;
  blockEnd: number;
  sentenceOffset: number;
}

function getBlockPlainText(block: ResponseBlock): string {
  if (block.type === "paragraph") return block.text;
  if (block.type === "bullets") {
    const parts = [...(block.lead ? [block.lead] : []), ...block.items.map((i) => `• ${i}`)];
    return parts.join("\n");
  }
  return block.code;
}

function buildBlockMeta(blocks: ResponseBlock[]): BlockMeta[] {
  const meta: BlockMeta[] = [];
  let consumed = 0;
  let sentenceOffset = 0;

  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex += 1) {
    const block = blocks[blockIndex]!;
    const plain = getBlockPlainText(block);
    const blockStart = consumed;
    const blockEnd = blockStart + plain.length;
    meta.push({ block, blockIndex, plain, blockStart, blockEnd, sentenceOffset });

    if (block.type === "paragraph") {
      sentenceOffset += splitSentences(block.text).length;
    }

    consumed = blockEnd + (blockIndex < blocks.length - 1 ? 2 : 0);
  }

  return meta;
}

function renderParagraphWithVariance(
  text: string,
  options: {
    highlightVariance: boolean;
    variantSentenceIndices: Set<number>;
    columnIndex: number;
    sentenceOffset: number;
  },
) {
  const sentences = splitSentences(text);

  return sentences.map((sentence, index) => {
    const globalIndex = options.sentenceOffset + index;
    const isVariant = options.variantSentenceIndices.has(globalIndex);
    const tint = getVarianceTintClass(options.columnIndex, isVariant);

    return (
      <span
        key={globalIndex}
        className={
          options.highlightVariance && isVariant
            ? `rounded-sm px-0.5 ${tint}`
            : undefined
        }
      >
        {sentence}
        {index < sentences.length - 1 ? " " : ""}
      </span>
    );
  });
}

export function PromptForkResponse({
  blocks,
  streamedLength,
  isStreaming,
  activeAnchor,
  onAnchorEnter,
  onAnchorLeave,
  highlightVariance,
  variantSentenceIndices,
  columnIndex,
}: PromptForkResponseProps) {
  const blockMeta = buildBlockMeta(blocks);

  return (
    <div className="flex flex-col gap-4 text-sm leading-relaxed text-neutral-200">
      {blockMeta.map(({ block, blockIndex, plain, blockStart, blockEnd, sentenceOffset }) => {
        if (streamedLength <= blockStart) return null;

        const visibleChars = Math.min(streamedLength - blockStart, plain.length);
        const isBlockComplete = streamedLength >= blockEnd;
        const isHighlighted = activeAnchor === block.anchor;

        const sectionClass = `rounded-lg px-2 py-1.5 -mx-2 transition-colors ${
          isHighlighted ? "bg-white/[0.06]" : ""
        }`;

        if (block.type === "paragraph") {
          const displayText = isBlockComplete ? block.text : plain.slice(0, visibleChars);

          const content =
            highlightVariance && isBlockComplete
              ? renderParagraphWithVariance(block.text, {
                  highlightVariance,
                  variantSentenceIndices,
                  columnIndex,
                  sentenceOffset,
                })
              : displayText;

          return (
            <section
              key={`${block.anchor}-${blockIndex}`}
              data-anchor={block.anchor}
              className={sectionClass}
              onMouseEnter={() => onAnchorEnter(block.anchor)}
              onMouseLeave={onAnchorLeave}
            >
              <p>
                {content}
                {isStreaming && !isBlockComplete && (
                  <span
                    className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#6b36ff]"
                    aria-hidden
                  />
                )}
              </p>
            </section>
          );
        }

        if (block.type === "bullets") {
          if (!isBlockComplete && visibleChars < (block.lead?.length ?? 0)) {
            return (
              <section
                key={`${block.anchor}-${blockIndex}`}
                data-anchor={block.anchor}
                className={sectionClass}
                onMouseEnter={() => onAnchorEnter(block.anchor)}
                onMouseLeave={onAnchorLeave}
              >
                <p className="font-medium text-neutral-100">
                  {block.lead?.slice(0, visibleChars)}
                  <span
                    className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#6b36ff]"
                    aria-hidden
                  />
                </p>
              </section>
            );
          }

          return (
            <section
              key={`${block.anchor}-${blockIndex}`}
              data-anchor={block.anchor}
              className={sectionClass}
              onMouseEnter={() => onAnchorEnter(block.anchor)}
              onMouseLeave={onAnchorLeave}
            >
              {block.lead && (
                <p className="mb-2 font-medium text-neutral-100">{block.lead}</p>
              )}
              <ul className="list-disc space-y-1.5 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              {isStreaming && !isBlockComplete && (
                <span
                  className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#6b36ff]"
                  aria-hidden
                />
              )}
            </section>
          );
        }

        const displayCode = isBlockComplete ? block.code : block.code.slice(0, visibleChars);

        return (
          <section
            key={`${block.anchor}-${blockIndex}`}
            data-anchor={block.anchor}
            className={sectionClass}
            onMouseEnter={() => onAnchorEnter(block.anchor)}
            onMouseLeave={onAnchorLeave}
          >
            <div className="overflow-x-auto rounded-lg bg-[#1a1a1a] p-3 ring-1 ring-inset ring-white/[0.06]">
              <div className="mb-2 text-xs font-medium text-neutral-500">
                {block.language}
              </div>
              <pre className="font-mono text-xs leading-relaxed text-emerald-300">
                <code>{displayCode}</code>
                {isStreaming && !isBlockComplete && (
                  <span
                    className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-[#6b36ff]"
                    aria-hidden
                  />
                )}
              </pre>
            </div>
          </section>
        );
      })}
    </div>
  );
}

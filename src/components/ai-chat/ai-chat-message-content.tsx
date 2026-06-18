"use client";

import type { ReactNode } from "react";
import { externalLinkLabel, FOCUS_RING } from "@/lib/a11y";

type MessageBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; lead?: string; items: string[] }
  | { type: "actions"; items: Array<{ label: string; href: string }> };

function extractActionLinks(text: string): Array<{ label: string; href: string }> {
  const links: Array<{ label: string; href: string }> = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    links.push({ label: match[1], href: match[2] });
  }

  return links;
}

function isActionRow(text: string): boolean {
  return (
    text.includes("·") &&
    !text.includes("\n") &&
    /\[.+?\]\(.+?\)/.test(text)
  );
}

function hasBulletList(text: string): boolean {
  return text
    .split("\n")
    .some((line) => /^[-*]\s+/.test(line.trim()));
}

function parseListBlock(text: string): { lead?: string; items: string[] } {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const first = lines[0];

  if (first && !/^[-*]\s+/.test(first)) {
    const items = lines
      .slice(1)
      .map((line) => line.replace(/^[-*]\s+/, "").trim())
      .filter(Boolean);

    if (items.length > 0) {
      return { lead: first.replace(/:$/, ""), items };
    }
  }

  return {
    items: lines
      .map((line) => line.replace(/^[-*]\s+/, "").trim())
      .filter(Boolean),
  };
}

function parseBlocks(content: string): MessageBlock[] {
  const blocks = content.trim().split(/\n{2,}/).filter(Boolean);
  const parsed: MessageBlock[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();

    if (isActionRow(trimmed)) {
      parsed.push({ type: "actions", items: extractActionLinks(trimmed) });
      continue;
    }

    if (hasBulletList(trimmed)) {
      const list = parseListBlock(trimmed);
      if (list.items.length > 0) {
        parsed.push({ type: "list", lead: list.lead, items: list.items });
        continue;
      }
    }

    parsed.push({
      type: "paragraph",
      text: trimmed.replace(/\n/g, " "),
    });
  }

  return parsed;
}

function renderLink(
  label: string,
  href: string,
  key: string,
  strong: boolean,
): ReactNode {
  const external = /^https?:\/\//i.test(href);
  const className = [
    "underline decoration-[#6B36FF]/50 underline-offset-[3px] transition-colors hover:text-white hover:decoration-[#6B36FF]",
    strong ? "font-semibold text-white" : "text-[#d4c4ff]",
    FOCUS_RING,
  ].join(" ");

  return (
    <a
      key={key}
      href={href}
      className={className}
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": externalLinkLabel(label),
          }
        : {})}
    >
      {label}
    </a>
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  const combined =
    /(\*\*\[[^\]]+\]\([^)]+\)\*\*|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

  let match: RegExpExecArray | null;
  while ((match = combined.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(
        <span key={`${keyPrefix}-text-${key++}`}>
          {text.slice(cursor, match.index)}
        </span>,
      );
    }

    const token = match[0];
    const boldLink = token.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
    if (boldLink) {
      nodes.push(
        renderLink(boldLink[1], boldLink[2], `${keyPrefix}-bl-${key++}`, true),
      );
      cursor = match.index + token.length;
      continue;
    }

    const bold = token.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${key++}`}
          className="font-semibold text-white"
        >
          {bold[1]}
        </strong>,
      );
      cursor = match.index + token.length;
      continue;
    }

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      nodes.push(renderLink(link[1], link[2], `${keyPrefix}-l-${key++}`, false));
      cursor = match.index + token.length;
      continue;
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) {
    nodes.push(
      <span key={`${keyPrefix}-tail-${key++}`}>{text.slice(cursor)}</span>,
    );
  }

  return nodes.length > 0 ? nodes : [text];
}

function MessageParagraph({ text }: { text: string }) {
  return (
    <p className="text-[14px] leading-[1.65] text-neutral-200">
      {renderInline(text, "p")}
    </p>
  );
}

function MessageList({ lead, items }: { lead?: string; items: string[] }) {
  return (
    <div className="space-y-2.5">
      {lead ? (
        <p className="text-[13px] font-medium tracking-normal text-white">
          {lead}:
        </p>
      ) : null}
      <ul className="m-0 list-none space-y-2.5 p-0">
        {items.map((item, index) => (
          <li key={`${lead ?? "list"}-${index}`} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-[#6B36FF]"
            />
            <span className="min-w-0 text-[14px] leading-[1.65] text-neutral-200">
              {renderInline(item, `li-${index}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageActions({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-3">
      {items.map((item) => {
        const external = /^https?:\/\//i.test(item.href);
        return (
          <a
            key={`${item.label}-${item.href}`}
            href={item.href}
            className={`inline-flex min-h-9 items-center rounded-full bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-neutral-100 ring-1 ring-inset ring-white/[0.08] transition-colors hover:bg-white/[0.1] hover:text-white ${FOCUS_RING}`}
            {...(external
              ? {
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": externalLinkLabel(item.label),
                }
              : {})}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

interface AiChatMessageContentProps {
  content: string;
}

export function AiChatMessageContent({ content }: AiChatMessageContentProps) {
  const blocks = parseBlocks(content);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3.5">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <MessageParagraph key={`block-${index}`} text={block.text} />;
        }

        if (block.type === "list") {
          return (
            <MessageList
              key={`block-${index}`}
              lead={block.lead}
              items={block.items}
            />
          );
        }

        return (
          <MessageActions key={`block-${index}`} items={block.items} />
        );
      })}
    </div>
  );
}

/** @deprecated Use `<AiChatMessageContent />` */
export function renderAiChatMessageContent(content: string): ReactNode {
  return <AiChatMessageContent content={content} />;
}

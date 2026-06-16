"use client";

import Link from "next/link";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import type {
  ExperimentCategory,
  ExperimentFilterId,
} from "@/lib/experiments-filters";
import {
  getExperimentCtaLabel,
  getExperimentDisplayCategory,
  getExperimentPreviewAspectClass,
  getExperimentCardId,
  isFunctionalExperimentCategory,
} from "@/lib/experiments-filters";
import { getExperimentMedia } from "@/lib/experiment-media";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { ExperimentsPreviewMedia } from "@/components/experiments/experiments-preview-media";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";

interface ExperimentsBentoCardProps {
  item: ExperimentGalleryItem;
  sectionHref: string;
  hasArticle?: boolean;
  filter?: ExperimentFilterId;
  displayCategory?: ExperimentCategory;
  ctaLabel?: string | null;
  articleSlugs?: string[];
}

export function ExperimentsBentoCard({
  item,
  sectionHref,
  hasArticle = true,
  filter = "all",
  displayCategory,
  ctaLabel = null,
  articleSlugs = [],
}: ExperimentsBentoCardProps) {
  const href = item.external ? item.href ?? "#" : `${sectionHref}/${item.slug}`;
  const resolvedCategory = getExperimentDisplayCategory(
    item.slug,
    filter,
    displayCategory,
  );
  const isFunctionalBlock = isFunctionalExperimentCategory(resolvedCategory);
  const interactive =
    isFunctionalBlock && (hasArticle || item.external || resolvedCategory === "ai-experiment");
  const media = getExperimentMedia(item.slug, resolvedCategory);
  const aspectClass = getExperimentPreviewAspectClass(
    resolvedCategory,
    filter,
    item.slug,
  );
  const resolvedCtaLabel = isFunctionalBlock
    ? (ctaLabel ??
      getExperimentCtaLabel(filter, item.slug, articleSlugs, displayCategory))
    : null;
  const cardId = getExperimentCardId(item.slug, resolvedCategory);

  const className = [
    `experiments-bento-cell group relative flex w-full shrink-0 flex-col overflow-hidden p-2 transition-colors ${FOCUS_RING}`,
    EXPERIMENTS_CARD.shell,
    interactive
      ? "hover:border-white/[0.12] hover:bg-[#2a2a2a] cursor-pointer"
      : "cursor-default",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <div className="flex min-h-0 flex-col">
      <div
        className={`relative isolate w-full shrink-0 overflow-hidden ${EXPERIMENTS_CARD.preview} ${aspectClass}`}
      >
        {media ? (
          <ExperimentsPreviewMedia media={media} title={item.title} />
        ) : null}

        {isFunctionalBlock ? (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-3 pt-8">
            <h2 className="truncate text-sm font-normal tracking-normal text-white">
              {item.title}
            </h2>
          </div>
        ) : null}
      </div>

      {isFunctionalBlock && resolvedCtaLabel ? (
        <div className="mt-4 w-full">
          <span
            className={`flex w-full items-center justify-center rounded-xl py-2.5 text-xs font-medium tracking-normal transition-colors ${EXPERIMENTS_CARD.cta}`}
          >
            {resolvedCtaLabel}
          </span>
        </div>
      ) : null}
    </div>
  );

  if (!isFunctionalBlock) {
    return (
      <article id={cardId} className={className}>
        <h2 className="sr-only">{item.title}</h2>
        {inner}
      </article>
    );
  }

  if (!interactive) {
    return (
      <article id={cardId} className={className} aria-label={item.title}>
        {inner}
      </article>
    );
  }

  if (item.external) {
    return (
      <a
        id={cardId}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={externalLinkLabel(item.title)}
      >
        {inner}
      </a>
    );
  }

  if (resolvedCategory === "article" && !hasArticle) {
    return (
      <article id={cardId} className={className} aria-label={item.title}>
        {inner}
      </article>
    );
  }

  return (
    <Link id={cardId} href={href} className={className} aria-label={item.title}>
      {inner}
    </Link>
  );
}

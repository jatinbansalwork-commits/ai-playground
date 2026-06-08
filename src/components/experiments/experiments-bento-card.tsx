"use client";

import Link from "next/link";
import type { CraftItem } from "@/lib/craft-content";
import type {
  ExperimentCategory,
  ExperimentFilterId,
} from "@/lib/experiments-filters";
import {
  getExperimentDisplayCategory,
  getExperimentPreviewAspectClass,
  shouldDisableExperimentNavigation,
} from "@/lib/experiments-filters";
import { getExperimentMedia } from "@/lib/experiment-media";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { ExperimentsPreviewMedia } from "@/components/experiments/experiments-preview-media";

interface ExperimentsBentoCardProps {
  item: CraftItem;
  sectionHref: string;
  hasArticle?: boolean;
  filter?: ExperimentFilterId;
  displayCategory?: ExperimentCategory;
  ctaLabel?: string | null;
  showCtaSlot?: boolean;
}

export function ExperimentsBentoCard({
  item,
  sectionHref,
  hasArticle = true,
  filter = "all",
  displayCategory,
  ctaLabel = null,
  showCtaSlot = true,
}: ExperimentsBentoCardProps) {
  const href = item.external ? item.href ?? "#" : `${sectionHref}/${item.slug}`;
  const resolvedCategory = getExperimentDisplayCategory(
    item.slug,
    filter,
    displayCategory,
  );
  const mediaContainer = shouldDisableExperimentNavigation(
    filter,
    item.slug,
    displayCategory,
  );
  const interactive = !mediaContainer && (hasArticle || item.external);
  const media = getExperimentMedia(item.slug, resolvedCategory);
  const aspectClass = getExperimentPreviewAspectClass(resolvedCategory);

  const className = [
    "experiments-bento-cell group relative flex w-full shrink-0 flex-col overflow-hidden p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400",
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

        <div
          className={`absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-8 ${
            media
              ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              : ""
          }`}
        >
          <h2 className="truncate text-sm font-normal tracking-normal text-white">
            {item.title}
          </h2>
          {item.date ? (
            <p className="mt-0.5 truncate text-xs tracking-normal text-neutral-500">
              {item.date}
            </p>
          ) : null}
        </div>
      </div>

      {showCtaSlot ? (
        ctaLabel ? (
          <span
            className={`mt-1.5 flex h-10 shrink-0 items-center justify-center rounded-lg text-sm font-medium tracking-normal ${EXPERIMENTS_CARD.cta}`}
          >
            {ctaLabel}
          </span>
        ) : (
          <span className="mt-1.5 h-10 shrink-0" aria-hidden />
        )
      ) : null}
    </div>
  );

  if (!interactive) {
    return (
      <article className={className} aria-label={item.title}>
        {inner}
      </article>
    );
  }

  if (item.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={item.title}
      >
        {inner}
      </a>
    );
  }

  if (!hasArticle) {
    return (
      <article className={className} aria-label={item.title}>
        {inner}
      </article>
    );
  }

  return (
    <Link href={href} className={className} aria-label={item.title}>
      {inner}
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getExperimentArticleExcerpt } from "@/lib/experiments-registry";
import { getExperimentMedia } from "@/lib/experiment-media";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { ExperimentsPreviewMedia } from "@/components/experiments/experiments-preview-media";
import { FOCUS_RING } from "@/lib/a11y";

interface ExperimentsArticleCardProps {
  item: ExperimentGalleryItem;
  sectionHref: string;
}

export function ExperimentsArticleCard({
  item,
  sectionHref,
}: ExperimentsArticleCardProps) {
  const href = `${sectionHref}/${item.slug}`;
  const media = getExperimentMedia(item.slug, "article");
  const excerpt = getExperimentArticleExcerpt(item.slug);

  const className = [
    `experiments-article-card group relative flex w-full flex-col overflow-hidden p-2 transition-colors ${FOCUS_RING}`,
    EXPERIMENTS_CARD.shell,
    "hover:border-white/[0.12] hover:bg-[#2a2a2a]",
  ].join(" ");

  return (
    <Link href={href} className={className} aria-label={item.title}>
      <div className="flex min-h-0 flex-col gap-5 md:flex-row md:items-stretch">
        <div
          className={`relative isolate w-full shrink-0 overflow-hidden md:w-[42%] ${EXPERIMENTS_CARD.preview} aspect-[3/2] md:aspect-auto md:min-h-[180px]`}
        >
          {media ? (
            <ExperimentsPreviewMedia media={media} title={item.title} slug={item.slug} />
          ) : (
            <div className="h-full w-full bg-[#333333]" aria-hidden />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 pb-2 md:py-3 md:pr-3">
          {item.date ? (
            <time
              className="text-xs tracking-normal text-neutral-500"
              dateTime={item.date}
            >
              {item.date}
            </time>
          ) : null}
          <h2 className="mt-1 text-lg font-normal tracking-normal text-white">
            {item.title}
          </h2>
          {excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">
              {excerpt}
            </p>
          ) : null}
          <span
            className={`mt-4 inline-flex w-fit items-center rounded-xl px-4 py-2 text-xs font-medium tracking-normal transition-colors ${EXPERIMENTS_CARD.cta}`}
          >
            Read
          </span>
        </div>
      </div>
    </Link>
  );
}

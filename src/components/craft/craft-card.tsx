"use client";

import { useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getExperimentMedia } from "@/lib/experiment-media";
import { getExperimentPreviewAspectRatio } from "@/lib/experiments-filters";
import { getCraftCardMeta } from "@/lib/craft-page-data";
import { CraftCardPreview } from "@/components/craft/craft-card-preview";
import { shouldUpdateCraftAspect } from "@/lib/craft-gallery-aspects";
import { parseCssAspectRatio } from "@/lib/craft-card-sizes";

interface CraftCardProps {
  item: ExperimentGalleryItem;
  priority?: boolean;
  onMediaMeasure?: (slug: string, width: number, height: number) => void;
}

export function CraftCard({ item, priority = false, onMediaMeasure }: CraftCardProps) {
  const { category } = getCraftCardMeta(item.slug);
  const media = getExperimentMedia(item.slug, category);
  const [aspectRatio, setAspectRatio] = useState(() =>
    getExperimentPreviewAspectRatio("all", item.slug, category),
  );

  return (
    <article className="ideas-card w-full">
      <h2 className="sr-only">{item.title}</h2>
      <div
        className="ideas-card__preview craft-card__preview"
        style={{ aspectRatio }}
      >
        {media ? (
          <CraftCardPreview
            media={media}
            title={item.title}
            slug={item.slug}
            priority={priority}
            onMeasure={(width, height) => {
              const widthOverHeight = width / height;
              const current = parseCssAspectRatio(aspectRatio);
              if (shouldUpdateCraftAspect(current, widthOverHeight)) {
                setAspectRatio(`${width} / ${height}`);
              }
              onMediaMeasure?.(item.slug, width, height);
            }}
          />
        ) : null}
      </div>
    </article>
  );
}

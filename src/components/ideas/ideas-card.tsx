"use client";

import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getExperimentMedia } from "@/lib/experiment-media";
import { getIdeasCardPreviewHeightStyle } from "@/lib/ideas-card-sizes";
import { getIdeasCardMeta } from "@/lib/ideas-page-data";
import { IdeasCardPreview } from "@/components/ideas/ideas-card-preview";
import { FOCUS_RING } from "@/lib/a11y";

interface IdeasCardProps {
  item: ExperimentGalleryItem;
  onSelect: (item: ExperimentGalleryItem) => void;
}

export function IdeasCard({ item, onSelect }: IdeasCardProps) {
  const media = getExperimentMedia(item.slug, "ai-experiment");
  const { subtext, chips, previewSize } = getIdeasCardMeta(item.slug);
  const previewHeightStyle = getIdeasCardPreviewHeightStyle(previewSize);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`View ${item.title}`}
      className={`ideas-card group w-full text-left ${FOCUS_RING}`}
    >
      <div
        className="ideas-card__preview"
        data-preview-size={previewSize}
        style={previewHeightStyle}
      >
        {media ? (
          <IdeasCardPreview media={media} title={item.title} slug={item.slug} />
        ) : null}
      </div>

      <div className="ideas-card__body">
        <h2 className="ideas-card__title">{item.title}</h2>
        <p className="ideas-card__subtext">{subtext}</p>
        <ul className="ideas-card__chips" aria-label="Tags">
          {chips.map((chip) => (
            <li key={chip}>
              <span className="ideas-card__chip">
                <span className="ideas-card__chip-icon" aria-hidden>
                  #
                </span>
                {chip}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

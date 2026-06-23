"use client";

import { getIdeasCardPreviewHeightStyle } from "@/lib/ideas-card-sizes";
import { IDEAS_PLACEHOLDER_CARD } from "@/lib/ideas-page-data";
import { FOCUS_RING } from "@/lib/a11y";

interface IdeasPlaceholderCardProps {
  onSelect: () => void;
}

export function IdeasPlaceholderCard({ onSelect }: IdeasPlaceholderCardProps) {
  const previewHeightStyle = getIdeasCardPreviewHeightStyle(
    IDEAS_PLACEHOLDER_CARD.previewSize,
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View ${IDEAS_PLACEHOLDER_CARD.title}`}
      className={`ideas-card ideas-card--placeholder group w-full text-left ${FOCUS_RING}`}
    >
      <div
        className="ideas-card__preview ideas-card__preview--placeholder"
        data-preview-size={IDEAS_PLACEHOLDER_CARD.previewSize}
        style={previewHeightStyle}
      >
        <div className="ideas-card__preview-placeholder" aria-hidden />
      </div>

      <div className="ideas-card__body">
        <h2 className="ideas-card__title">{IDEAS_PLACEHOLDER_CARD.title}</h2>
        <p className="ideas-card__subtext">{IDEAS_PLACEHOLDER_CARD.subtext}</p>
        <ul className="ideas-card__chips" aria-label="Tags">
          {IDEAS_PLACEHOLDER_CARD.chips.map((chip) => (
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

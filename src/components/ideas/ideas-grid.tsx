"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { IdeasCard } from "@/components/ideas/ideas-card";
import { IdeasDetailModal } from "@/components/ideas/ideas-detail-modal";
import { IdeasPlaceholderCard } from "@/components/ideas/ideas-placeholder-card";
import { IdeasPlaceholderModal } from "@/components/ideas/ideas-placeholder-modal";
import {
  useIdeasMasonryColumnCount,
  useIdeasMasonryLayout,
} from "@/hooks/use-ideas-masonry-layout";
import { getIdeasCardEstimatedHeightPx } from "@/lib/ideas-card-sizes";
import {
  IDEAS_GRID_PLACEHOLDER_COUNT,
  getIdeasCardMeta,
} from "@/lib/ideas-page-data";
import { IDEAS_MASONRY_GAP_PX } from "@/lib/ideas-masonry";

interface IdeasGridProps {
  items: ExperimentGalleryItem[];
}

function getColumnHeightPx(items: readonly ExperimentGalleryItem[]): number {
  return items.reduce((sum, item) => {
    const { previewSize } = getIdeasCardMeta(item.slug);
    return sum + getIdeasCardEstimatedHeightPx(previewSize) + IDEAS_MASONRY_GAP_PX;
  }, 0);
}

export function IdeasGrid({ items }: IdeasGridProps) {
  const [selectedItem, setSelectedItem] =
    useState<ExperimentGalleryItem | null>(null);
  const [placeholderOpen, setPlaceholderOpen] = useState(false);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const placeholderTriggerRef = useRef<HTMLElement | null>(null);
  const columnCount = useIdeasMasonryColumnCount();
  const masonryColumns = useIdeasMasonryLayout(items, columnCount);

  const placeholderColumnIndex = useMemo(() => {
    if (IDEAS_GRID_PLACEHOLDER_COUNT <= 0 || columnCount <= 0) return -1;

    const heights = masonryColumns.map(getColumnHeightPx);
    let shortestColumn = 0;

    for (let columnIndex = 1; columnIndex < heights.length; columnIndex += 1) {
      if (heights[columnIndex] < heights[shortestColumn]) {
        shortestColumn = columnIndex;
      }
    }

    return shortestColumn;
  }, [columnCount, masonryColumns]);

  const handleSelect = useCallback(
    (item: ExperimentGalleryItem, trigger: HTMLElement) => {
      detailTriggerRef.current = trigger;
      setSelectedItem(item);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handlePlaceholderSelect = useCallback((trigger: HTMLElement) => {
    placeholderTriggerRef.current = trigger;
    setPlaceholderOpen(true);
  }, []);

  const handlePlaceholderClose = useCallback(() => {
    setPlaceholderOpen(false);
  }, []);

  return (
    <>
      <div className="ideas-grid">
        {masonryColumns.map((columnItems, columnIndex) => (
          <div
            key={`ideas-column-${columnIndex}`}
            className="ideas-grid__column"
          >
            {columnItems.map((item) => (
              <div key={item.slug} className="ideas-grid__item">
                <IdeasCard item={item} onSelect={handleSelect} />
              </div>
            ))}
            {placeholderColumnIndex === columnIndex ? (
              <div className="ideas-grid__item">
                <IdeasPlaceholderCard onSelect={handlePlaceholderSelect} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <IdeasDetailModal
        item={selectedItem}
        onClose={handleClose}
        returnFocusRef={detailTriggerRef}
      />
      <IdeasPlaceholderModal
        open={placeholderOpen}
        onClose={handlePlaceholderClose}
        returnFocusRef={placeholderTriggerRef}
      />
    </>
  );
}

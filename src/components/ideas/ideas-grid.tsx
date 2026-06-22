"use client";

import { useCallback, useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { IdeasCard } from "@/components/ideas/ideas-card";
import { IdeasDetailModal } from "@/components/ideas/ideas-detail-modal";
import {
  useIdeasMasonryColumnCount,
  useIdeasMasonryLayout,
} from "@/hooks/use-ideas-masonry-layout";

interface IdeasGridProps {
  items: ExperimentGalleryItem[];
}

export function IdeasGrid({ items }: IdeasGridProps) {
  const [selectedItem, setSelectedItem] =
    useState<ExperimentGalleryItem | null>(null);
  const columnCount = useIdeasMasonryColumnCount();
  const masonryColumns = useIdeasMasonryLayout(items, columnCount);

  const handleSelect = useCallback((item: ExperimentGalleryItem) => {
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
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
          </div>
        ))}
      </div>

      <IdeasDetailModal item={selectedItem} onClose={handleClose} />
    </>
  );
}

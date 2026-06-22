"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getIdeasCardEstimatedHeightPx } from "@/lib/ideas-card-sizes";
import {
  distributeIdeasMasonryItems,
  getIdeasMasonryColumnCount,
} from "@/lib/ideas-masonry";
import { getIdeasCardMeta } from "@/lib/ideas-page-data";

export function useIdeasMasonryColumnCount(): number {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const update = () => {
      setColumnCount(
        getIdeasMasonryColumnCount({ width: window.innerWidth }),
      );
    };

    update();
    const media = window.matchMedia("(min-width: 640px)");
    const mediaLg = window.matchMedia("(min-width: 1024px)");
    media.addEventListener("change", update);
    mediaLg.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      mediaLg.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return columnCount;
}

export function useIdeasMasonryLayout(
  items: readonly ExperimentGalleryItem[],
  columnCount: number,
) {
  const columns = useMemo(() => {
    if (columnCount <= 1) {
      return [items.slice()];
    }

    return distributeIdeasMasonryItems(items, columnCount, (item) =>
      getIdeasCardEstimatedHeightPx(getIdeasCardMeta(item.slug).previewSize),
    );
  }, [items, columnCount]);

  return columns;
}

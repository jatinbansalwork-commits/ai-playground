"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import {
  getCraftCardHeightFromAspect,
  parseCssAspectRatio,
} from "@/lib/craft-card-sizes";
import {
  distributeCraftMasonryItems,
  getCraftMasonryColumnCount,
} from "@/lib/craft-masonry";
import { getExperimentPreviewAspectRatio } from "@/lib/experiments-filters";
import { getCraftCardMeta } from "@/lib/craft-page-data";

const CRAFT_GRID_MAX_WIDTH_PX = 1152; // 72rem
const CRAFT_GRID_GAP_PX = 24;
const CRAFT_GRID_INLINE_PADDING_PX = 40;

function estimateColumnWidth(viewportWidth: number, columnCount: number): number {
  const shellWidth = Math.min(viewportWidth, CRAFT_GRID_MAX_WIDTH_PX);
  const contentWidth = Math.max(shellWidth - CRAFT_GRID_INLINE_PADDING_PX, 0);
  const totalGap = CRAFT_GRID_GAP_PX * Math.max(columnCount - 1, 0);
  return Math.max((contentWidth - totalGap) / columnCount, 0);
}

export function useCraftMasonryColumnCount(): number {
  const [columnCount, setColumnCount] = useState(() => {
    if (typeof window === "undefined") return 2;
    return getCraftMasonryColumnCount({ width: window.innerWidth });
  });

  useEffect(() => {
    const update = () => {
      setColumnCount(getCraftMasonryColumnCount({ width: window.innerWidth }));
    };

    update();
    const media = window.matchMedia("(min-width: 640px)");
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return columnCount;
}

export function useCraftMasonryLayout(
  items: readonly ExperimentGalleryItem[],
  columnCount: number,
  measuredAspects: Record<string, number>,
) {
  const [columnWidth, setColumnWidth] = useState(() =>
    estimateColumnWidth(
      typeof window !== "undefined" ? window.innerWidth : CRAFT_GRID_MAX_WIDTH_PX,
      columnCount,
    ),
  );

  useEffect(() => {
    const update = () => {
      setColumnWidth(estimateColumnWidth(window.innerWidth, columnCount));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [columnCount]);

  const columns = useMemo(() => {
    if (columnCount <= 1) {
      return [items.slice()];
    }

    return distributeCraftMasonryItems(items, columnCount, (item) => {
      const measured = measuredAspects[item.slug];
      const { category } = getCraftCardMeta(item.slug);
      const widthOverHeight =
        measured ??
        parseCssAspectRatio(
          getExperimentPreviewAspectRatio("all", item.slug, category),
        );

      return getCraftCardHeightFromAspect(columnWidth, widthOverHeight);
    });
  }, [columnCount, columnWidth, items, measuredAspects]);

  return columns;
}

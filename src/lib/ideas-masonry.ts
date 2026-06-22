import { getIdeasCardMeta } from "@/lib/ideas-page-data";

/** Vertical gap between stacked cards — matches detail.design (~24px). */
export const IDEAS_MASONRY_GAP_PX = 24;

export interface IdeasMasonryColumnCountOptions {
  width: number;
}

/** Responsive column count — 1 / 2 / 3 like detail.design. */
export function getIdeasMasonryColumnCount({
  width,
}: IdeasMasonryColumnCountOptions): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

/**
 * Shortest-column masonry — uses fixed per-card height estimates from preview size tokens.
 */
export function distributeIdeasMasonryItems<T>(
  items: readonly T[],
  columnCount: number,
  estimateCardHeight: (item: T) => number,
): T[][] {
  if (columnCount <= 1) {
    return [items.slice()];
  }

  const columns = Array.from({ length: columnCount }, () => [] as T[]);
  const columnHeights = new Array<number>(columnCount).fill(0);

  for (const item of items) {
    let targetColumn = 0;
    for (let i = 1; i < columnCount; i += 1) {
      if (columnHeights[i] < columnHeights[targetColumn]) {
        targetColumn = i;
      }
    }

    columns[targetColumn].push(item);
    columnHeights[targetColumn] +=
      estimateCardHeight(item) + IDEAS_MASONRY_GAP_PX;
  }

  return columns;
}

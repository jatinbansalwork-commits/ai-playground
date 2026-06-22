import {
  distributeIdeasMasonryItems,
  IDEAS_MASONRY_GAP_PX,
} from "@/lib/ideas-masonry";

export const CRAFT_MASONRY_GAP_PX = IDEAS_MASONRY_GAP_PX;

export interface CraftMasonryColumnCountOptions {
  width: number;
}

/** Responsive column count — 1 column mobile, 2 columns desktop. */
export function getCraftMasonryColumnCount({
  width,
}: CraftMasonryColumnCountOptions): number {
  if (width >= 640) return 2;
  return 1;
}

export const distributeCraftMasonryItems = distributeIdeasMasonryItems;

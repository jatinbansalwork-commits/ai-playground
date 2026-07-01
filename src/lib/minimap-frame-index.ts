import { MINIMAP_LINE_COUNT } from "@/lib/constants";

/** Map a minimap tick index to the nearest slider frame index. */
export function minimapLineToFrameIndex(
  lineIndex: number,
  frameCount: number,
): number {
  if (frameCount <= 1) return 0;

  const clampedLine = Math.max(0, Math.min(lineIndex, MINIMAP_LINE_COUNT - 1));
  const progress = clampedLine / (MINIMAP_LINE_COUNT - 1);
  return Math.round(progress * (frameCount - 1));
}

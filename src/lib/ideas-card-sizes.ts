/** Fixed preview frame sizes — card dictates dimensions, media fills the frame. */
export type IdeasCardPreviewSize = "compact" | "standard" | "wide" | "tall";

/** Preview band height in px (body copy adds ~112px below). */
export const IDEAS_CARD_PREVIEW_HEIGHT_PX: Record<IdeasCardPreviewSize, number> = {
  compact: 160,
  standard: 280,
  wide: 220,
  tall: 400,
};

const IDEAS_CARD_BODY_HEIGHT_PX = 112;

export function getIdeasCardPreviewHeightStyle(
  size: IdeasCardPreviewSize,
): { height: number } {
  return { height: IDEAS_CARD_PREVIEW_HEIGHT_PX[size] };
}

export function getIdeasCardEstimatedHeightPx(size: IdeasCardPreviewSize): number {
  return IDEAS_CARD_PREVIEW_HEIGHT_PX[size] + IDEAS_CARD_BODY_HEIGHT_PX;
}

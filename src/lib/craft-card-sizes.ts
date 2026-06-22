/** Parse CSS aspect-ratio strings like `16 / 9` into width ÷ height. */
export function parseCssAspectRatio(ratio: string): number {
  const parts = ratio.split("/").map((part) => Number.parseFloat(part.trim()));
  if (parts.length !== 2 || !parts[0] || !parts[1]) return 1;
  return parts[0] / parts[1];
}

export function getCraftCardHeightFromAspect(
  columnWidth: number,
  widthOverHeight: number,
): number {
  if (widthOverHeight <= 0) return columnWidth;
  return columnWidth / widthOverHeight;
}

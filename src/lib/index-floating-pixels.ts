/** Mosaic.select floating pixel palette (blue, red, cream). */
export const INDEX_FLOATING_PIXEL_COLORS = [
  "#0443B5",
  "#E0223E",
  "#FBFAF9",
] as const;

/** Viewport-wide field — sparse like the Mosaic hero. */
export const INDEX_FLOATING_PIXEL_COUNT = 32;
export const INDEX_FLOATING_PIXEL_BASE_SIZE = 6;
/** Matches Mosaic `Rectangle_Random` speed prop (default ~1). */
export const INDEX_FLOATING_PIXEL_SPEED = 1;
export const INDEX_FLOATING_PIXEL_REPULSION_RADIUS = 200;
export const INDEX_FLOATING_PIXEL_REPULSION_FORCE = 1.2;

/** Deterministic pseudo-random generator for stable pixel layouts. */
export function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getViewportPixelCount(width: number, height: number) {
  const area = width * height;
  return Math.min(
    48,
    Math.max(INDEX_FLOATING_PIXEL_COUNT, Math.round(area / 42_000)),
  );
}

import { HERO_PILLS } from "@/lib/hero-pills-data";

/** Floating pixel palette — unique hero pill fill colours. */
export const INDEX_FLOATING_PIXEL_COLORS: readonly string[] = [
  ...new Set(HERO_PILLS.map((pill) => pill.color)),
];

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
  const isNarrow = width < 768;
  const maxCount = isNarrow ? 24 : 48;
  const areaDivisor = isNarrow ? 52_000 : 42_000;
  const baseCount = isNarrow
    ? Math.min(INDEX_FLOATING_PIXEL_COUNT, 20)
    : INDEX_FLOATING_PIXEL_COUNT;

  return Math.min(
    maxCount,
    Math.max(baseCount, Math.round(area / areaDivisor)),
  );
}

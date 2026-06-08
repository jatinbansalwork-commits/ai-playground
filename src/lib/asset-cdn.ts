const CDN_BASE =
  process.env.NEXT_PUBLIC_BLOB_CDN_BASE?.replace(/\/$/, "") ??
  "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com";

const ABSOLUTE_URL = /^https?:\/\//i;
const BLOB_HOST = /\.blob\.vercel-storage\.com/i;

/** Canonical Vercel Blob public origin for this project. */
export const BLOB_CDN_ORIGIN = CDN_BASE;

export function isAbsoluteAssetUrl(src: string): boolean {
  return ABSOLUTE_URL.test(src);
}

export function isRemoteCdnUrl(src: string): boolean {
  if (!isAbsoluteAssetUrl(src)) return false;
  if (BLOB_HOST.test(src)) return true;
  return CDN_BASE !== "" && src.startsWith(CDN_BASE);
}

/**
 * Builds a live Blob CDN URL from a `/public`-style path segment.
 * Example: `/assets/experiments/scroll-slider.mp4`
 */
export function cdnAsset(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BLOB_CDN_ORIGIN}${normalizedPath}`;
}

/**
 * Resolves registry paths to live CDN URLs when `NEXT_PUBLIC_BLOB_CDN_BASE` is set.
 * Absolute URLs pass through unchanged; local `/public` paths stay relative when no CDN is configured.
 */
export function resolveAssetUrl(src: string): string {
  if (!src) return src;
  if (isAbsoluteAssetUrl(src)) return src;

  const normalizedPath = src.startsWith("/") ? src : `/${src}`;
  if (!CDN_BASE) return normalizedPath;

  return `${CDN_BASE}${normalizedPath}`;
}

export function getBlobCdnBase(): string {
  return CDN_BASE;
}

/**
 * Live experiment preview assets on Vercel Blob — keyed by registry slug.
 * Multi-category entries use per-category keys so motion-graphic videos
 * never share paths with article / ai-experiment previews.
 */
export const EXPERIMENT_CDN_MEDIA = {
  "scroll-slider": cdnAsset("/assets/experiments/scroll-slider-cover.jpg"),
  "wireframe-mode": cdnAsset("/kddVPtRKUV1wGirlo4ho2RIypg.webp"),
  "minimap-tracker": cdnAsset("/IMG_6656.mp4"),
  "clip-reveal": {
    "ai-experiment": cdnAsset("/assets/experiments/clip-reveal-cover.jpg"),
    "motion-graphic": cdnAsset("/pDBtnxUzJmrLJ2YlDXld932Skhs.mp4"),
  },
  "spring-physics": cdnAsset("/assets/experiments/spring-physics.jpg"),
  "ghost-spacer": cdnAsset("/assets/experiments/ghost-spacer.jpg"),
  "click-sound": cdnAsset("/assets/experiments/click-sound.mp4"),
  "scale-on-scroll": {
    "ai-experiment": cdnAsset("/assets/experiments/scale-on-scroll-cover.jpg"),
    "motion-graphic": cdnAsset("/mgSFjnByFieompNVtqKVZ5gRE0.mp4"),
  },
  "illustration-gold-jar": cdnAsset("/jar.png"),
  "illustration-ticket-mark": cdnAsset("/TIcket.png"),
  "illustration-coin-stack": cdnAsset("/mWI4cFrnSgDolWqxydcUnfyhaE.avif"),
  "illustration-pass-stub": cdnAsset("/DGNxIehGCQSruXK14E8gJCNB6a4.webp"),
  "illustration-savings-vault": cdnAsset("/qP5YVSpFq05EhrX4zhqeSIxtit4.avif"),
  "illustration-brand-ticket": cdnAsset("/P6r4FYRwrzoeiot6tTArrPFSQI.webp"),
  "illustration-slot-01": cdnAsset("/Frame%201321314914.png"),
  "illustration-slot-02": cdnAsset("/Frame%201321314967.png"),
  "motion-graphic-slot-01": cdnAsset("/9L4mIylEa79TkW75HIuwCzQxE.mp4"),
  "motion-graphic-slot-02": cdnAsset("/WRfEXvj0Fy7XlCGS1DPYVnLD6OM.mp4"),
  "motion-graphic-slot-03": cdnAsset("/UaoftDpqn187UvBDpp6GsCDVFyU.mp4"),
  "motion-graphic-slot-04": cdnAsset("/UP3Nn2hAjJmYcjYDyozMbtBA8D4.mp4"),
  "motion-graphic-slot-05": cdnAsset("/IMG_6657.mp4"),
  "motion-graphic-slot-07": cdnAsset("/IMG_6658.mp4"),
} as const;

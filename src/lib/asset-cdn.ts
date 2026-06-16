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
  if (src.startsWith("data:")) return src;
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
  "scroll-slider": cdnAsset(
    "/AI%20experiment/Screenshot%202026-06-09%20at%204.08.20%E2%80%AFPM.png",
  ),
  "wireframe-mode": cdnAsset("/kddVPtRKUV1wGirlo4ho2RIypg.webp"),
  "minimap-tracker": cdnAsset("/Hover/phone.mp4"),
  "clip-reveal": {
    "ai-experiment": {
      src: cdnAsset("/AI%20experiment/Froggy"),
      type: "video" as const,
    },
    "motion-graphic": cdnAsset("/pDBtnxUzJmrLJ2YlDXld932Skhs.mp4"),
  },
  "spring-physics": cdnAsset("/AI%20experiment/miner.mp4"),
  "ghost-spacer": cdnAsset("/AI%20experiment/ALERT.mp4"),
  "click-sound": cdnAsset("/AI%20experiment/doodlelab.mp4"),
  "illustration-gold-jar": cdnAsset("/jar.png"),
  "illustration-ticket-mark": cdnAsset("/TIcket.png"),
  "illustration-coin-stack": cdnAsset("/mWI4cFrnSgDolWqxydcUnfyhaE.avif"),
  "illustration-pass-stub": cdnAsset("/DGNxIehGCQSruXK14E8gJCNB6a4.webp"),
  "illustration-savings-vault": cdnAsset("/qP5YVSpFq05EhrX4zhqeSIxtit4.avif"),
  "illustration-brand-ticket": cdnAsset("/P6r4FYRwrzoeiot6tTArrPFSQI.webp"),
  "illustration-8": cdnAsset("/Frame%201321314914.png"),
  "illustration-9": cdnAsset("/Frame%201321314967.png"),
  "motion-graphic-1": cdnAsset("/9L4mIylEa79TkW75HIuwCzQxE.mp4"),
  "motion-graphic-2": cdnAsset("/JGAEwcjrlYlecJ5u9sucL6bfCXI.mp4"),
  "motion-graphic-3": cdnAsset("/UaoftDpqn187UvBDpp6GsCDVFyU.mp4"),
  "motion-graphic-4": cdnAsset("/UP3Nn2hAjJmYcjYDyozMbtBA8D4.mp4"),
  "motion-graphic-5": cdnAsset("/Hover/cycle%201.mp4"),
  "motion-graphic-6": cdnAsset("/Hover/cycle%202.mp4"),
  "motion-graphic-7": cdnAsset("/1425XAHPiav1RbL3397N87ens.mp4"),
  "motion-graphic-8": cdnAsset(
    "/Motion%20graphic/WRfEXvj0Fy7XlCGS1DPYVnLD6OM%20%281%29.mp4",
  ),
  "motion-graphic-9": cdnAsset("/video%20232321"),
  "design-review-checklist-cover": cdnAsset(
    "/Review%20Checklist/checklistCover.png",
  ),
} as const;

/** Case study hero / showcase media — keyed by project slug. */
export const CASE_STUDY_CDN_MEDIA = {
  "freshprints-design-system": cdnAsset("/Freshprints/FP_DS.mp4"),
  "freshprints-design-system-primitives": cdnAsset("/Freshprints/Image.png"),
  "freshprints-design-system-swatch": cdnAsset("/Freshprints/swatch1.png"),
  "freshprints-design-system-tokens": cdnAsset("/Freshprints/Token%201.png"),
  "freshprints-design-system-documentation": cdnAsset(
    "/Freshprints/documentation.png",
  ),
  "freshprints-design-system-impact": cdnAsset("/Freshprints/Dp.png"),
  "freshprints-design-system-ds-card-1": cdnAsset("/Freshprints/ds/Card-1.png"),
  "freshprints-design-system-ds-card-2": cdnAsset("/Freshprints/ds/Card-2.png"),
  "freshprints-design-system-ds-card-3": cdnAsset("/Freshprints/ds/Card-3.png"),
  "freshprints-design-system-ds-card-4": cdnAsset("/Freshprints/ds/Card-4.png"),
  "freshprints-design-system-ds-card-5": cdnAsset("/Freshprints/ds/Card-5.png"),
  "freshprints-design-system-ds-card-6": cdnAsset("/Freshprints/ds/Card.png"),
  "freshprints-image-gen-hero": cdnAsset("/FreshPrints%20Ai/Cover"),
  "freshprints-image-gen-video-2": cdnAsset("/problem"),
  "freshprints-image-gen-video-3": cdnAsset("/FreshPrints%20Ai/AI"),
  "freshprints-image-gen-01": cdnAsset("/FreshPrints%20Ai/user%20skip"),
  "freshprints-image-gen-02": cdnAsset("/FreshPrints%20Ai/problem"),
  "freshprints-image-gen-03": cdnAsset("/Freshprints/image-gen-03.png"),
  "freshprints-image-gen-04": cdnAsset("/FreshPrints%20Ai/task"),
  "freshprints-image-gen-05": cdnAsset("/FreshPrints%20Ai/Prompt"),
  "freshprints-image-gen-06": cdnAsset("/FreshPrints%20Ai/mobile.png"),
  "freshprints-image-gen-07": cdnAsset("/Freshprints/image-gen-07.png"),
  "freshprints-image-gen-08": cdnAsset("/FreshPrints%20Ai/cat"),
  "freshprints-image-gen-09": cdnAsset("/FreshPrints%20Ai/mobile%202"),
  "freshprints-image-gen-10": cdnAsset("/FreshPrints%20Ai/Refine"),
  saltbot: cdnAsset("/Saltbot/saltbot.mp4"),
  "saltbot-conversation-thread": cdnAsset("/Saltbot/saltbot%202.mp4"),
  "saltbot-automation-guardrails": cdnAsset("/Saltbot/saltbot%203.mp4"),
  "saltbot-insights-video-1": cdnAsset("/Saltbot/saltbot%205.avif"),
  "saltbot-insights-grid-01": cdnAsset("/Saltbot/2345.png"),
  "saltbot-insights-grid-02": cdnAsset("/Saltbot/1234.png"),
  "saltbot-insights-video-2": cdnAsset("/Saltbot/saltbot%204.mp4"),
  "kalash-year-end-recap-hero": cdnAsset(
    "/Kalash%20year%20end%20rewards/2.png",
  ),
  "kalash-year-end-recap-rewards": cdnAsset(
    "/Kalash%20year%20end%20rewards/1.png",
  ),
  "kalash-year-end-recap-milestones": cdnAsset(
    "/Kalash%20year%20end%20rewards/3.1.png",
  ),
  "kalash-year-end-recap-shareable": cdnAsset(
    "/Kalash%20year%20end%20rewards/3.2.png",
  ),
  "kalash-year-end-recap-engagement": cdnAsset(
    "/Kalash%20year%20end%20rewards/8.png",
  ),
  "kalash-year-end-recap-share-cards": cdnAsset(
    "/Kalash%20year%20end%20rewards/9.png",
  ),
  "kalash-year-end-recap-closing": cdnAsset(
    "/Kalash%20year%20end%20rewards/7.png",
  ),
  "kalash-year-end-recap-impact": cdnAsset(
    "/Kalash%20year%20end%20rewards/6.png",
  ),
  "kalash-rewards-hero": cdnAsset("/Kalash%20-%20gold/2"),
  "kalash-rewards-k1": cdnAsset("/Kalash%20-%20gold/k1"),
  "kalash-rewards-k2": cdnAsset("/Kalash%20-%20gold/k2"),
  "kalash-rewards-p1": cdnAsset("/Kalash%20-%20gold/P1.png"),
  "kalash-rewards-p2": cdnAsset("/Kalash%20-%20gold/P2.png"),
  "kalash-rewards-p3": cdnAsset("/Kalash%20-%20gold/P3.png"),
  "kalash-rewards-p4": cdnAsset("/Kalash%20-%20gold/P4.png"),
  "kalash-rewards-p5": cdnAsset("/Kalash%20-%20gold/P5.png"),
  "kalash-rewards-p6": cdnAsset("/Kalash%20-%20gold/P6.png"),
  "kalash-rewards-k3": cdnAsset("/Kalash%20-%20gold/k3"),
  "kalash-rewards-k4": cdnAsset("/Kalash%20-%20gold/k4"),
  "kalash-rewards-k6": cdnAsset("/Kalash%20-%20gold/k6"),
  "kalash-rewards-k8": cdnAsset("/Kalash%20-%20gold/k8"),
  "kalash-rewards-k9": cdnAsset("/Kalash%20-%20gold/k9"),
  "kalash-rewards-k10": cdnAsset("/Kalash%20-%20gold/k10"),
  "kalash-rewards-k12": cdnAsset("/Kalash%20-%20gold/k12"),
  "kalash-rewards-k13": cdnAsset("/Kalash%20-%20gold/k13"),
  "kalash-rewards-k14": cdnAsset("/Kalash%20-%20gold/k14"),
  "kalash-rewards-k17": cdnAsset("/Kalash%20-%20gold/k17"),
  "piggy-support-tickets-breakdown": cdnAsset("/Piggy-tickets/1.png"),
  "piggy-support-tickets-hero": cdnAsset("/Piggy-tickets/intro"),
  "piggy-support-tickets-icon-1": cdnAsset("/Piggy-tickets/icon%201.png"),
  "piggy-support-tickets-icon-2": cdnAsset("/Piggy-tickets/icon%202.png"),
  "piggy-support-tickets-icon-3": cdnAsset("/Piggy-tickets/icon%203.png"),
  "piggy-support-tickets-icon-4": cdnAsset("/Piggy-tickets/icon%204.png"),
  "piggy-support-tickets-findings": cdnAsset("/Piggy-tickets/Finding.png"),
  "piggy-support-tickets-current-flow": cdnAsset("/Piggy-tickets/Current%20Flow.png"),
  "piggy-support-tickets-solution-1": cdnAsset("/Piggy-tickets/Current%20version.png"),
  "piggy-support-tickets-solution-2": cdnAsset("/Piggy-tickets/New"),
  "piggy-support-tickets-updated-journey-card": cdnAsset("/card.png"),
  "piggy-support-tickets-solution-4": cdnAsset("/Piggy-tickets/happy%20hour"),
  "piggy-support-tickets-post-purchase-1": cdnAsset(
    "/Piggy-tickets/New%20Post%20Purchase.png",
  ),
  "piggy-support-tickets-post-purchase-2": cdnAsset(
    "/Piggy-tickets/old%20Post%20Purchase.png",
  ),
  "cisco-policy-copilot-overview": cdnAsset("/Cisco/Main%20Comp.mp4"),
  "cisco-policy-copilot-trust": cdnAsset("/Cisco/1.png"),
  "cisco-policy-copilot-rating": cdnAsset("/Cisco/Rating.png"),
} as const;

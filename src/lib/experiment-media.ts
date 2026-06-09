import type { ExperimentCategory } from "@/lib/experiments-filters";
import { EXPERIMENTS_REGISTRY } from "@/lib/experiments-registry";
import { resolveAssetUrl } from "@/lib/asset-cdn";

export type ExperimentMediaType = "image" | "gif" | "video";

export interface ExperimentMedia {
  src: string;
  type: ExperimentMediaType;
  poster?: string;
  alt?: string;
}

type ExperimentMediaInput =
  | string
  | (ExperimentMedia & { src: string })
  | Partial<Record<ExperimentCategory, string | ExperimentMedia>>;

const VIDEO_EXT = /\.(mp4|webm|mov)(\?|#|$)/i;
const GIF_EXT = /\.gif(\?|#|$)/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|svg)(\?|#|$)/i;

const registryBySlug = new Map(
  EXPERIMENTS_REGISTRY.map((entry) => [entry.slug, entry]),
);

function detectMediaType(src: string): ExperimentMediaType | null {
  if (VIDEO_EXT.test(src)) return "video";
  if (GIF_EXT.test(src)) return "gif";
  if (IMAGE_EXT.test(src)) return "image";
  return null;
}

function normalizeMediaInput(
  input: string | ExperimentMedia,
): ExperimentMedia | null {
  if (typeof input === "string") {
    const resolvedSrc = resolveAssetUrl(input);
    const type = detectMediaType(resolvedSrc);
    if (!type) return null;
    return { src: resolvedSrc, type };
  }

  const resolvedSrc = resolveAssetUrl(input.src);
  const type = input.type ?? detectMediaType(resolvedSrc);
  if (!type) return null;

  return {
    src: resolvedSrc,
    type,
    poster: input.poster ? resolveAssetUrl(input.poster) : undefined,
    alt: input.alt,
  };
}

function isCategoryMediaMap(
  mediaEntry: ExperimentMediaInput,
): mediaEntry is Partial<Record<ExperimentCategory, string | ExperimentMedia>> {
  return typeof mediaEntry === "object" && !("src" in mediaEntry);
}

/** Motion-graphic videos must not leak into article / ai-experiment tabs. */
function isVideoBlockedForCategory(
  media: ExperimentMedia,
  category: ExperimentCategory,
  categories: ExperimentCategory[],
): boolean {
  if (media.type !== "video") return false;
  if (category !== "article" && category !== "ai-experiment") return false;
  return categories.includes("motion-graphic");
}

export function getExperimentMedia(
  slug: string,
  category?: ExperimentCategory,
): ExperimentMedia | null {
  const entry = registryBySlug.get(slug);
  if (!entry?.media || !category) return null;

  const mediaEntry = entry.media as ExperimentMediaInput;

  if (isCategoryMediaMap(mediaEntry)) {
    const categoryEntry = mediaEntry[category];
    if (!categoryEntry) return null;

    const media = normalizeMediaInput(categoryEntry);
    if (!media) return null;

    return media;
  }

  const media = normalizeMediaInput(mediaEntry);
  if (!media) return null;

  if (isVideoBlockedForCategory(media, category, entry.categories)) {
    return null;
  }

  return media;
}

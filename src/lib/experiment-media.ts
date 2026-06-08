import type { ExperimentCategory } from "@/lib/experiments-filters";
import { EXPERIMENTS_REGISTRY } from "@/lib/experiments-registry";

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

const VIDEO_EXT = /\.(mp4|webm|mov)(\?|$)/i;
const GIF_EXT = /\.gif(\?|$)/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|svg)(\?|$)/i;

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
    const type = detectMediaType(input);
    if (!type) return null;
    return { src: input, type };
  }

  const type = input.type ?? detectMediaType(input.src);
  if (!type) return null;

  return {
    src: input.src,
    type,
    poster: input.poster,
    alt: input.alt,
  };
}

export function getExperimentMedia(
  slug: string,
  category?: ExperimentCategory,
): ExperimentMedia | null {
  const entry = EXPERIMENTS_REGISTRY.find((item) => item.slug === slug);
  if (!entry?.media) return null;

  const mediaEntry = entry.media as ExperimentMediaInput;

  if (typeof mediaEntry === "string" || "src" in mediaEntry) {
    return normalizeMediaInput(mediaEntry);
  }

  if (!category) return null;

  const categoryEntry = mediaEntry[category];
  if (!categoryEntry) return null;

  return normalizeMediaInput(categoryEntry);
}

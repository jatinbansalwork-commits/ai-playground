import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getExperimentMedia } from "@/lib/experiment-media";
import { getCraftPrimaryCategory } from "@/lib/craft-page-data";

export const CRAFT_GALLERY_PRELOAD_COUNT = 6;

export interface CraftPreloadResource {
  href: string;
  as: "image" | "fetch";
}

/** URLs to warm for above-the-fold craft cards — shared by server + client preload. */
export function getCraftGalleryPreloadResources(
  items: readonly ExperimentGalleryItem[],
): CraftPreloadResource[] {
  const resources: CraftPreloadResource[] = [];

  for (const item of items.slice(0, CRAFT_GALLERY_PRELOAD_COUNT)) {
    const media = getExperimentMedia(item.slug, getCraftPrimaryCategory(item.slug));
    if (!media) continue;

    const href =
      media.type === "video" ? (media.poster ?? media.src) : media.src;

    resources.push({
      href,
      as: media.type === "video" && !media.poster ? "fetch" : "image",
    });
  }

  return resources;
}

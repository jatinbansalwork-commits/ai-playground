import { parseCssAspectRatio } from "@/lib/craft-card-sizes";
import { getCraftPrimaryCategory } from "@/lib/craft-page-data";
import { getExperimentPreviewAspectRatio } from "@/lib/experiments-filters";

/** Seed masonry with stable aspect estimates before media bytes arrive. */
export function buildInitialCraftAspectMap(
  items: readonly { slug: string }[],
): Record<string, number> {
  return Object.fromEntries(
    items.map((item) => {
      const category = getCraftPrimaryCategory(item.slug);
      const widthOverHeight = parseCssAspectRatio(
        getExperimentPreviewAspectRatio("all", item.slug, category),
      );

      return [item.slug, widthOverHeight];
    }),
  );
}

export function shouldUpdateCraftAspect(
  current: number | undefined,
  next: number,
  tolerance = 0.04,
): boolean {
  if (!current) return true;
  return Math.abs(current - next) / current > tolerance;
}

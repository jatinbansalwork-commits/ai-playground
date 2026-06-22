import { ROUTES, SITE_CANVAS } from "@/lib/constants";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import { getExperimentGridSpan } from "@/lib/experiments-filters";
import { EXPERIMENT_SLUG_ORDER } from "@/lib/experiments-registry";

/** Routes where bento preview videos may autoplay on hover (Craft + Ideas galleries). */
export function isExperimentsBentoPreviewRoute(pathname: string): boolean {
  return pathname === ROUTES.craft || pathname === ROUTES.ideas;
}

export interface ExperimentsBentoConfig {
  span: string;
}

/** Page canvas — deep black wrapper behind the grid. */
export const EXPERIMENTS_CANVAS = SITE_CANVAS;

/** Unified card tokens — identical on every tile. */
export const EXPERIMENTS_CARD = {
  shell:
    "bg-[#262626] border border-white/[0.04] rounded-2xl",
  preview: "rounded-xl bg-[#262626] ring-1 ring-inset ring-white/[0.04]",
  title: "text-white",
  date: "text-neutral-400",
  cta: "bg-[#333333] text-neutral-100 ring-1 ring-inset ring-white/[0.08] transition-colors group-hover:bg-[#3f3f3f] group-hover:text-white group-hover:ring-white/[0.12]",
} as const;

/** Filter toggle group — mirrors card shell + CTA pill states. */
export const EXPERIMENTS_TOGGLE = {
  track:
    "experiments-filter-bar inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-white/[0.04] bg-[#262626] p-1",
  button:
    "relative min-h-11 rounded-lg px-3 py-2 text-xs font-medium tracking-normal whitespace-nowrap",
  pill: "absolute inset-0 rounded-lg bg-[#333333] ring-1 ring-inset ring-white/[0.08]",
  labelActive: "relative z-10 text-neutral-100",
  labelInactive:
    "relative z-10 text-neutral-400 transition-colors hover:text-neutral-100",
} as const;

export function getExperimentsBentoConfig(
  slug: string,
  filter: ExperimentFilterId = "all",
): ExperimentsBentoConfig {
  return { span: getExperimentGridSpan(filter, slug) };
}

export function sortExperimentsBentoItems<T extends { slug: string }>(
  items: T[],
): T[] {
  const rank = new Map<string, number>(
    EXPERIMENT_SLUG_ORDER.map((slug, index) => [slug, index]),
  );

  return [...items].sort(
    (a, b) =>
      (rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}

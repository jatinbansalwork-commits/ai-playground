import type {
  ExperimentCategory,
  ExperimentFilterId,
} from "@/lib/experiments-filters";

/** Flex-rail card shell width token. */
export function getExperimentGridSpanClass(
  _filter: ExperimentFilterId,
  _category: ExperimentCategory,
): string {
  return "w-full";
}

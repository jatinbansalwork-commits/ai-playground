/** Editorial copy and card metadata for `/craft`. */
import { getExperimentCategories } from "@/lib/experiments-registry";
import type { ExperimentCategory } from "@/lib/experiments-filters";

export const CRAFT_PAGE_INTRO = {
  title: "Craft",
  description:
    "When inspiration strikes or I want to challenge myself, I design purely for fun—whether it's slide decks, illustrations, icons, or interfaces. I love learning and continually refining my craft!",
} as const;

export interface CraftCardMeta {
  subtext: string;
  chips: readonly string[];
  editorNote: string;
  category: ExperimentCategory;
}

const CATEGORY_CHIP_LABEL: Record<"motion-graphic" | "illustration", string> = {
  "motion-graphic": "Motion graphic",
  illustration: "Illustration",
};

export function getCraftPrimaryCategory(slug: string): ExperimentCategory {
  const categories = getExperimentCategories(slug);

  if (categories.includes("motion-graphic")) return "motion-graphic";
  if (categories.includes("illustration")) return "illustration";
  if (categories.includes("article")) return "article";

  return categories[0] ?? "illustration";
}

function getDefaultSubtext(category: ExperimentCategory): string {
  if (category === "motion-graphic") {
    return "Motion interface exploration.";
  }

  return "Interface illustration study.";
}

function getChipLabel(category: ExperimentCategory): string {
  if (category === "motion-graphic" || category === "illustration") {
    return CATEGORY_CHIP_LABEL[category];
  }

  return "Craft";
}

export function getCraftCardMeta(slug: string): CraftCardMeta {
  const category = getCraftPrimaryCategory(slug);

  return {
    subtext: getDefaultSubtext(category),
    chips: [getChipLabel(category)],
    editorNote: "No editor's note yet",
    category,
  };
}

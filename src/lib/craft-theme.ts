import type { CraftItem } from "@/lib/craft-content";

const LIGHT_PREVIEW_KEYS = new Set([
  "grayLight",
  "grayMid",
  "graySoft",
  "white",
]);

export function getCraftTheme(item: CraftItem): "light" | "dark" {
  if (item.theme) return item.theme;

  const key = item.previewClass.match(/craft-preview-(\w+)/)?.[1];
  if (key && LIGHT_PREVIEW_KEYS.has(key)) return "light";

  return "dark";
}

export function getCraftMetaPosition(
  item: CraftItem,
): "top" | "bottom" {
  if (item.metaPosition) return item.metaPosition;
  return getCraftTheme(item) === "light" ? "top" : "bottom";
}

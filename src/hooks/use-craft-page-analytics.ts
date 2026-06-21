"use client";

import { usePageViewOnce } from "@/hooks/use-page-view-analytics";
import { trackCraftView } from "@/lib/analytics";

export function useCraftPageAnalytics(): void {
  usePageViewOnce(trackCraftView);
}

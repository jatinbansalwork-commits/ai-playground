"use client";

import { usePageViewOnce } from "@/hooks/use-page-view-analytics";
import { trackIdeasView } from "@/lib/analytics";

export function useIdeasPageAnalytics(): void {
  usePageViewOnce(trackIdeasView);
}

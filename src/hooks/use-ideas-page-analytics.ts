"use client";

import { usePageViewOnce } from "@/hooks/use-page-view-analytics";
import { trackAiExperimentView } from "@/lib/analytics";

export function useIdeasPageAnalytics(): void {
  usePageViewOnce(trackAiExperimentView);
}

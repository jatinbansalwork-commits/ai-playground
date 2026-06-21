"use client";

import { usePageViewOnce } from "@/hooks/use-page-view-analytics";
import { trackProjectsView } from "@/lib/analytics";

export function useProjectsPageAnalytics(): void {
  usePageViewOnce(trackProjectsView);
}

"use client";

import { usePageViewOnce } from "@/hooks/use-page-view-analytics";
import { trackArchiveView } from "@/lib/analytics";

export function useArchivePageAnalytics(): void {
  usePageViewOnce(trackArchiveView);
}

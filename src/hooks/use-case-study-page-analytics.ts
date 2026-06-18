"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  trackCaseStudyScrollDepth,
  trackProjectOpen,
  type CaseStudyScrollDepth,
  type ProjectOpenSource,
} from "@/lib/analytics";

const SCROLL_DEPTH_THRESHOLDS: CaseStudyScrollDepth[] = [25, 50, 75, 100];

interface UseCaseStudyPageAnalyticsOptions {
  slug?: string;
  source?: ProjectOpenSource;
  scrollRootRef: RefObject<HTMLElement | null>;
}

export function useCaseStudyPageAnalytics({
  slug,
  source,
  scrollRootRef,
}: UseCaseStudyPageAnalyticsOptions): void {
  const firedDepthsRef = useRef<Set<CaseStudyScrollDepth>>(new Set());
  const openedRef = useRef(false);

  useEffect(() => {
    if (!slug || !source || openedRef.current) return;

    openedRef.current = true;
    trackProjectOpen(slug, source);
  }, [slug, source]);

  useEffect(() => {
    if (!slug) return;

    const studySlug = slug;
    const root = scrollRootRef.current;
    if (!root) return;

    const firedDepths = firedDepthsRef.current;

    function updateScrollDepth(): void {
      const scrollHeight = root.scrollHeight - root.clientHeight;
      if (scrollHeight <= 0) {
        if (!firedDepths.has(100)) {
          firedDepths.add(100);
          trackCaseStudyScrollDepth(studySlug, 100);
        }
        return;
      }

      const progress = (root.scrollTop / scrollHeight) * 100;

      for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
        if (progress >= threshold && !firedDepths.has(threshold)) {
          firedDepths.add(threshold);
          trackCaseStudyScrollDepth(studySlug, threshold);
        }
      }
    }

    updateScrollDepth();
    root.addEventListener("scroll", updateScrollDepth, { passive: true });

    return () => {
      root.removeEventListener("scroll", updateScrollDepth);
    };
  }, [scrollRootRef, slug]);
}

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
  title?: string;
  source?: ProjectOpenSource;
  scrollRootRef: RefObject<HTMLElement | null>;
}

export function useCaseStudyPageAnalytics({
  slug,
  title,
  source,
  scrollRootRef,
}: UseCaseStudyPageAnalyticsOptions): void {
  const firedDepthsRef = useRef<Set<CaseStudyScrollDepth>>(new Set());
  const openedRef = useRef(false);

  useEffect(() => {
    if (!slug || !source || openedRef.current) return;

    openedRef.current = true;
    trackProjectOpen(slug, source, title);
  }, [slug, source, title]);

  useEffect(() => {
    if (!slug) return;

    const studySlug = slug;
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot) return;

    const firedDepths = firedDepthsRef.current;

    function updateScrollDepth(): void {
      const node = scrollRootRef.current;
      if (!node) return;

      const scrollHeight = node.scrollHeight - node.clientHeight;
      if (scrollHeight <= 0) {
        if (!firedDepths.has(100)) {
          firedDepths.add(100);
          trackCaseStudyScrollDepth(studySlug, 100);
        }
        return;
      }

      const progress = (node.scrollTop / scrollHeight) * 100;

      for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
        if (progress >= threshold && !firedDepths.has(threshold)) {
          firedDepths.add(threshold);
          trackCaseStudyScrollDepth(studySlug, threshold);
        }
      }
    }

    updateScrollDepth();
    scrollRoot.addEventListener("scroll", updateScrollDepth, { passive: true });

    return () => {
      scrollRoot.removeEventListener("scroll", updateScrollDepth);
    };
  }, [scrollRootRef, slug]);
}

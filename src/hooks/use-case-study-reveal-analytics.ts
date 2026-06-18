"use client";

import { useEffect, useRef } from "react";
import {
  trackCaseStudyRevealImpression,
  trackCaseStudyRevealed,
} from "@/lib/analytics";

interface UseCaseStudyRevealAnalyticsOptions {
  slug: string;
  ready: boolean;
  isRevealed: boolean;
  remainingMs: number;
}

export function useCaseStudyRevealAnalytics({
  slug,
  ready,
  isRevealed,
  remainingMs,
}: UseCaseStudyRevealAnalyticsOptions): void {
  const impressionTrackedRef = useRef(false);
  const revealedTrackedRef = useRef(false);
  const wasLockedRef = useRef(false);

  useEffect(() => {
    if (!ready || isRevealed || impressionTrackedRef.current) return;

    impressionTrackedRef.current = true;
    wasLockedRef.current = true;
    trackCaseStudyRevealImpression({
      slug,
      remaining_hours: String(Math.ceil(remainingMs / (60 * 60 * 1000))),
    });
  }, [isRevealed, ready, remainingMs, slug]);

  useEffect(() => {
    if (!ready) return;

    if (!isRevealed) {
      wasLockedRef.current = true;
      return;
    }

    if (!wasLockedRef.current || revealedTrackedRef.current) return;

    revealedTrackedRef.current = true;
    trackCaseStudyRevealed(slug);
  }, [isRevealed, ready, slug]);
}

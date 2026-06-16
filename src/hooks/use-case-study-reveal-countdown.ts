"use client";

import { useEffect, useState } from "react";
import {
  getCaseStudyRevealRemainingMs,
  getCaseStudyRevealUnlockAtMs,
} from "@/lib/case-study-reveal-schedule";

export function formatRevealCountdown(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isComplete: remainingMs <= 0,
  };
}

/** Worldwide countdown to a fixed UTC unlock instant — not per-browser storage. */
export function useCaseStudyRevealCountdown(unlockAtMs: number) {
  const [remainingMs, setRemainingMs] = useState(() =>
    getCaseStudyRevealRemainingMs(unlockAtMs),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function tick() {
      setRemainingMs(getCaseStudyRevealRemainingMs(unlockAtMs));
    }

    tick();
    setReady(true);

    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [unlockAtMs]);

  const countdown = formatRevealCountdown(remainingMs);

  return {
    ready,
    remainingMs,
    isRevealed: countdown.isComplete,
    countdown,
  };
}

export function useCaseStudyRevealCountdownForSlug(slug: string) {
  const unlockAtMs = getCaseStudyRevealUnlockAtMs(slug);
  const effectiveUnlockAtMs = unlockAtMs ?? Date.now();
  const state = useCaseStudyRevealCountdown(effectiveUnlockAtMs);

  if (unlockAtMs === null) {
    return {
      ready: true,
      remainingMs: 0,
      isRevealed: true,
      countdown: formatRevealCountdown(0),
      unlockAtMs: null,
    };
  }

  return { ...state, unlockAtMs };
}

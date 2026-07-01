"use client";

import { useEffect, useState } from "react";
import {
  getCaseStudyRevealState,
  getCaseStudyRevealRemainingMs,
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

/** Worldwide countdown — not per-browser storage. */
export function useCaseStudyRevealCountdownForSlug(slug: string) {
  const [revealState, setRevealState] = useState(() => getCaseStudyRevealState(slug));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function tick() {
      setRevealState(getCaseStudyRevealState(slug));
    }

    tick();
    setReady(true);

    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [slug]);

  if (!revealState) {
    return {
      ready: true,
      remainingMs: 0,
      isRevealed: true,
      countdown: formatRevealCountdown(0),
      isScheduled: false,
    };
  }

  const countdown = formatRevealCountdown(revealState.remainingMs);

  return {
    ready,
    remainingMs: revealState.remainingMs,
    isRevealed: revealState.isRevealed,
    countdown,
    isScheduled: true,
  };
}

/** @deprecated Prefer `useCaseStudyRevealCountdownForSlug` for slug-based schedules. */
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

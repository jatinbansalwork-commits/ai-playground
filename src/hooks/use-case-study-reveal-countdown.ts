"use client";

import { useEffect, useState } from "react";

const REVEAL_DURATION_MS = 20 * 60 * 60 * 1000;

function readDeadline(storageKey: string, durationMs: number): number {
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    const parsed = Number(stored);
    if (!Number.isNaN(parsed) && parsed > Date.now()) {
      return parsed;
    }
  }

  const deadline = Date.now() + durationMs;
  localStorage.setItem(storageKey, String(deadline));
  return deadline;
}

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

export function useCaseStudyRevealCountdown(
  storageKey: string,
  durationMs: number = REVEAL_DURATION_MS,
) {
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const deadline = readDeadline(storageKey, durationMs);

    function tick() {
      setRemainingMs(Math.max(0, deadline - Date.now()));
    }

    tick();
    setReady(true);

    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [durationMs, storageKey]);

  const countdown = formatRevealCountdown(remainingMs);

  return {
    ready,
    remainingMs,
    isRevealed: countdown.isComplete,
    countdown,
  };
}

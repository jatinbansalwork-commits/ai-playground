"use client";

import { useEffect, useState } from "react";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function readDeadline(storageKey: string): number {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    const parsed = Number(stored);
    if (!Number.isNaN(parsed)) return parsed;
  }

  const deadline = Date.now() + TWENTY_FOUR_HOURS_MS;
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

export function useCaseStudyRevealCountdown(storageKey: string) {
  const [remainingMs, setRemainingMs] = useState(TWENTY_FOUR_HOURS_MS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const deadline = readDeadline(storageKey);

    function tick() {
      setRemainingMs(Math.max(0, deadline - Date.now()));
    }

    tick();
    setReady(true);

    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [storageKey]);

  const countdown = formatRevealCountdown(remainingMs);

  return {
    ready,
    remainingMs,
    isRevealed: countdown.isComplete,
    countdown,
  };
}

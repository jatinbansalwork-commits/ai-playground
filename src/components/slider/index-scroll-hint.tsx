"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FOCUS_RING } from "@/lib/a11y";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INDEX_SCROLL_HINT_KEY = "index_scroll_hint_dismissed";
const SHOW_DELAY_MS = 1200;
const AUTO_DISMISS_MS = 8000;

interface IndexScrollHintProps {
  activeFrameIndex: number;
}

/** One-time hint for horizontal index navigation — dismissible, respects reduced motion. */
export function IndexScrollHint({ activeFrameIndex }: IndexScrollHintProps) {
  const reducedMotion = useReducedMotion();
  const hintId = useId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(INDEX_SCROLL_HINT_KEY)) return;

    const showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      window.localStorage.setItem(INDEX_SCROLL_HINT_KEY, "1");
    }, SHOW_DELAY_MS + AUTO_DISMISS_MS);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (activeFrameIndex <= 0) return;
    setVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INDEX_SCROLL_HINT_KEY, "1");
    }
  }, [activeFrameIndex]);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INDEX_SCROLL_HINT_KEY, "1");
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      id={hintId}
      role="status"
      className={`index-scroll-hint pointer-events-auto fixed bottom-[calc(3.5rem+3.75rem)] left-1/2 z-40 flex max-w-sm -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-neutral-200 backdrop-blur-sm${reducedMotion ? "" : " index-scroll-hint--motion"}`}
    >
      <span>Scroll or swipe to explore</span>
      <button
        type="button"
        onClick={dismiss}
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs text-neutral-400 transition-colors hover:text-white ${FOCUS_RING}`}
        aria-label="Dismiss scroll hint"
      >
        Got it
      </button>
    </div>
  );
}

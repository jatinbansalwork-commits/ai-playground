"use client";

import { useLayoutEffect } from "react";
import { SCROLL_RANGE } from "@/lib/constants";

export function resetDocumentScroll() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollLeft = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollLeft = 0;
  document.body.scrollTop = 0;

  if (document.scrollingElement) {
    document.scrollingElement.scrollLeft = 0;
    document.scrollingElement.scrollTop = 0;
  }
}

/** Synchronous pre-paint reset — no delayed retries that cause scroll flicker. */
export function scheduleScrollReset() {
  resetDocumentScroll();

  const frame = requestAnimationFrame(resetDocumentScroll);

  return () => {
    cancelAnimationFrame(frame);
  };
}

/** Reset document scroll when entering the index slider (e.g. after craft pages). */
export function useIndexScrollReset() {
  useLayoutEffect(() => {
    resetDocumentScroll();
  }, []);
}

/** Reset scroll on section subpages (models, fun, projects, etc.). */
export function useSubpageScrollReset() {
  useLayoutEffect(() => {
    resetDocumentScroll();
  }, []);
}

export function getGhostSpacerSize() {
  if (typeof window === "undefined") {
    return {
      width: 1200 + SCROLL_RANGE,
      height: 900 + SCROLL_RANGE,
    };
  }

  return {
    width: window.innerWidth + SCROLL_RANGE,
    height: window.innerHeight + SCROLL_RANGE,
  };
}

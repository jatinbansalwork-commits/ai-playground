"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { SCROLL_RANGE } from "@/lib/constants";

export function resetDocumentScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollLeft = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollLeft = 0;
  document.body.scrollTop = 0;
}

/** Reset document scroll when entering the index slider (e.g. after craft pages). */
export function useIndexScrollReset() {
  useLayoutEffect(() => {
    resetDocumentScroll();
  }, []);
}

/** Clear index slider scroll when leaving `/` for any subpage. */
export function ScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname === "/") return;

    resetDocumentScroll();

    // Run again after paint — beats browser scroll restoration and index handoff.
    const frame = requestAnimationFrame(() => {
      resetDocumentScroll();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
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

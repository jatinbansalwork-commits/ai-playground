"use client";

import { useEffect, useRef } from "react";

/** Fire a page-view analytics event once per mount. */
export function usePageViewOnce(trackPageView: () => void): void {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackPageView();
  }, [trackPageView]);
}

"use client";

import { useEffect } from "react";
import { focusCaseStudyHashTarget } from "@/lib/case-study-a11y";

/** Moves keyboard focus to the in-page heading matching `location.hash` (2.4.1 / 2.4.3). */
export function useCaseStudyHashFocus() {
  useEffect(() => {
    focusCaseStudyHashTarget();

    window.addEventListener("hashchange", focusCaseStudyHashTarget);
    return () => window.removeEventListener("hashchange", focusCaseStudyHashTarget);
  }, []);
}

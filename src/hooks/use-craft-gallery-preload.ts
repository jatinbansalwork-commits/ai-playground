"use client";

import { useEffect } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getCraftGalleryPreloadResources } from "@/lib/craft-gallery-preload";

/** Client-side preload for SPA navigations to `/craft`. */
export function useCraftGalleryPreload(items: readonly ExperimentGalleryItem[]) {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    for (const { href, as } of getCraftGalleryPreloadResources(items)) {
      if (document.querySelector(`link[rel="preload"][href="${href}"]`)) {
        continue;
      }

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = as;
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    }

    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, [items]);
}

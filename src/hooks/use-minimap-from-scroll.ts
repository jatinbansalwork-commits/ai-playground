"use client";

import { useEffect } from "react";
import { MINIMAP_RANGE } from "@/lib/constants";
import { useSliderContext } from "@/context/slider-context";

export function useMinimapFromScroll() {
  const { minimapX } = useSliderContext();

  useEffect(() => {
    const update = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      minimapX.set(progress * MINIMAP_RANGE);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [minimapX]);
}

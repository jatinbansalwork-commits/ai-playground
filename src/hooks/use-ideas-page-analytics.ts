"use client";

import { useEffect, useRef } from "react";
import { trackIdeasView } from "@/lib/analytics";

export function useIdeasPageAnalytics(): void {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackIdeasView();
  }, []);
}

"use client";

import { useEffect } from "react";

export default function CacheManager() {
  useEffect(() => {
    const handleUnloadAndFlush = () => {
      sessionStorage.clear();

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    };

    window.addEventListener("beforeunload", handleUnloadAndFlush);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      window.removeEventListener("beforeunload", handleUnloadAndFlush);
    };
  }, []);

  return null;
}

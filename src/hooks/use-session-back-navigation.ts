"use client";

import { useLayoutEffect, useState } from "react";
import {
  type SessionBackContext,
  readSessionBackContext,
  subscribeSessionBackContext,
} from "@/lib/session-navigation";

export function useSessionBackNavigation(
  fallback: SessionBackContext,
): SessionBackContext {
  const [back, setBack] = useState<SessionBackContext>(() => {
    if (typeof window === "undefined") return fallback;
    return readSessionBackContext() ?? fallback;
  });

  useLayoutEffect(() => {
    const sync = () => setBack(readSessionBackContext() ?? fallback);
    sync();
    return subscribeSessionBackContext(sync);
  }, [fallback.href, fallback.destination]);

  return back;
}

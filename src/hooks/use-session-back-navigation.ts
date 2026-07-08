"use client";

import { useEffect, useState } from "react";
import {
  type SessionBackContext,
  readSessionBackContext,
  subscribeSessionBackContext,
} from "@/lib/session-navigation";

export function useSessionBackNavigation(
  fallback: SessionBackContext,
): SessionBackContext {
  const [back, setBack] = useState(fallback);

  useEffect(() => {
    const sync = () => setBack(readSessionBackContext() ?? fallback);
    sync();
    return subscribeSessionBackContext(sync);
  }, [fallback.href, fallback.destination]);

  return back;
}

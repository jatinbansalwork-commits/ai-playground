"use client";

import { useState } from "react";
import {
  type SessionBackContext,
  readSessionBackContext,
} from "@/lib/session-navigation";

export function useSessionBackNavigation(
  fallback: SessionBackContext,
): SessionBackContext {
  const [back] = useState(() => {
    if (typeof window === "undefined") return fallback;
    return readSessionBackContext() ?? fallback;
  });

  return back;
}

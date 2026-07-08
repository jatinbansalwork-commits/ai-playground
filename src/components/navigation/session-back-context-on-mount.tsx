"use client";

import { useLayoutEffect } from "react";
import {
  type SessionBackContext,
  saveSessionBackContext,
} from "@/lib/session-navigation";

interface SessionBackContextOnMountProps {
  context: SessionBackContext;
}

/** Ensures list pages own their back target after client navigations and browser back. */
export function SessionBackContextOnMount({ context }: SessionBackContextOnMountProps) {
  useLayoutEffect(() => {
    saveSessionBackContext(context);
  }, [context.href, context.destination]);

  return null;
}

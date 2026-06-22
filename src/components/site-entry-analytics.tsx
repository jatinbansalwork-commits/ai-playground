"use client";

import { useEffect } from "react";
import { trackSiteEntry } from "@/lib/analytics";

const SESSION_KEY = "site-entry-tracked";

function getReferrerHost(): string {
  if (typeof document === "undefined" || !document.referrer) return "direct";

  try {
    return new URL(document.referrer).hostname || "direct";
  } catch {
    return "direct";
  }
}

/** Fires `site_entry` once per browser session for geo + behaviour correlation in Vercel. */
export function SiteEntryAnalytics(): null {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    sessionStorage.setItem(SESSION_KEY, "1");

    trackSiteEntry({
      landing_path: window.location.pathname,
      referrer_host: getReferrerHost(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language,
    });
  }, []);

  return null;
}

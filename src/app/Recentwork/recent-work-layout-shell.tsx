"use client";

import { useEffect, type ReactNode } from "react";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import ScrollMinimapRuler from "@/components/ScrollMinimapRuler";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";

export function RecentWorkLayoutShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <main
      id="main-content"
      data-sheet="recent-work"
      className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-y-auto bg-[#1a1a1a] px-8 pb-12 pt-24 text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <ScrollMinimapRuler />

      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </main>
  );
}

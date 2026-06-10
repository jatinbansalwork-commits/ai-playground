"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import ScrollMinimapRuler from "@/components/ScrollMinimapRuler";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";

export function RecentWorkLayoutShell({ children }: { children: ReactNode }) {
  const scrollRootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    scrollRootRef.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      ref={scrollRootRef}
      id="main-content"
      data-sheet="recent-work"
      className="fixed inset-0 z-10 flex h-screen w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden bg-[#1a1a1a] px-8 pb-12 pt-24 text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <ScrollMinimapRuler scrollRootRef={scrollRootRef} />

      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </main>
  );
}

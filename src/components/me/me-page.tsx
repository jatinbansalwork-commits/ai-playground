"use client";

import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { useArchivePageAnalytics } from "@/hooks/use-archive-page-analytics";
import { backNavigationLabel, NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";

export function MePage() {
  useArchivePageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="me"
      className="relative flex min-h-screen items-center justify-start bg-background px-8 pt-24 pb-16 text-white"
    >
      <h1 className="sr-only">Me</h1>

      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Home")}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <MeIntroVideo variant="page" />
    </main>
  );
}

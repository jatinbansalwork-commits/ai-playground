"use client";

import { NavBackLink } from "@/components/navigation/nav-back-link";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { useArchivePageAnalytics } from "@/hooks/use-archive-page-analytics";
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

      <NavBackLink href={ROUTES.home} destination="Home" />

      <MeIntroVideo variant="page" />
    </main>
  );
}

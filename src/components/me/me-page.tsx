"use client";

import { SessionNavBackLink } from "@/components/navigation/session-nav-back-link";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { useArchivePageAnalytics } from "@/hooks/use-archive-page-analytics";
import { BACK_HOME } from "@/lib/session-navigation";

export function MePage() {
  useArchivePageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="me"
      className="relative flex min-h-screen items-center justify-start bg-background px-8 pt-24 pb-16 text-white"
    >
      <h1 className="sr-only">JB&apos;s Field Notes</h1>

      <SessionNavBackLink fallback={BACK_HOME} />

      <MeIntroVideo variant="page" />
    </main>
  );
}

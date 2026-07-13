"use client";

import { MeIntroVideo } from "@/components/me/me-intro-video";
import { useArchivePageAnalytics } from "@/hooks/use-archive-page-analytics";

export function MePage() {
  useArchivePageAnalytics();

  return (
    <main
      id="main-content"
      data-sheet="me"
      className="relative flex min-h-screen items-center justify-start bg-background px-8 pt-24 pb-16 text-white"
    >
      <h1 className="sr-only">About JB</h1>

      <MeIntroVideo variant="page" />
    </main>
  );
}

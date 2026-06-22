"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { useArchivePageAnalytics } from "@/hooks/use-archive-page-analytics";
import { BACK_LINK_CLASS } from "@/lib/a11y";
import { SITE_NAME } from "@/lib/constants";

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
        href="/"
        scroll={true}
        aria-label={`Back to ${SITE_NAME}`}
        className={`absolute top-8 left-8 z-20 md:left-12 ${BACK_LINK_CLASS}`}
      >
        ←
      </ScrollResetLink>

      <MeIntroVideo variant="page" />
    </main>
  );
}

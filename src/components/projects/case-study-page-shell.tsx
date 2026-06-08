import type { ReactNode } from "react";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import ScrollMinimapRuler from "@/components/ScrollMinimapRuler";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";

interface CaseStudyPageShellProps {
  backHref: string;
  backDestination: string;
  children: ReactNode;
}

export function CaseStudyPageShell({
  backHref,
  backDestination,
  children,
}: CaseStudyPageShellProps) {
  return (
    <main
      id="main-content"
      data-sheet="case-study"
      className="relative flex min-h-screen w-full flex-col items-start justify-start bg-[#1a1a1a] px-8 pb-12 pt-24 text-white"
    >
      <ScrollResetLink
        href={backHref}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination={backDestination} />
      </ScrollResetLink>

      <ScrollMinimapRuler />

      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </main>
  );
}

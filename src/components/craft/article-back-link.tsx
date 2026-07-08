"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { useSessionBackNavigation } from "@/hooks/use-session-back-navigation";
import { FOCUS_RING } from "@/lib/a11y";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";
import type { SessionBackContext } from "@/lib/session-navigation";

interface ArticleBackLinkProps {
  fallback: SessionBackContext;
  className?: string;
}

export function ArticleBackLink({ fallback, className = "" }: ArticleBackLinkProps) {
  const back = useSessionBackNavigation(fallback);

  return (
    <ScrollResetLink
      href={back.href}
      scroll={true}
      className={[className, FOCUS_RING, "text-left"].filter(Boolean).join(" ")}
      style={SITE_BACK_LINK_STYLE}
    >
      <NavBackLinkLabel destination={back.destination} />
    </ScrollResetLink>
  );
}

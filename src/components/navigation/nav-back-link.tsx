"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { NAV_BACK_LINK_CLASS, backNavigationLabel } from "@/lib/a11y";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";

interface NavBackLinkProps {
  href: string;
  destination: string;
  className?: string;
  showBackPrefix?: boolean;
}

/** Top-left “Back to …” control — IBM Plex on the interactive element. */
export function NavBackLink({
  href,
  destination,
  className = NAV_BACK_LINK_CLASS,
  showBackPrefix,
}: NavBackLinkProps) {
  return (
    <ScrollResetLink
      href={href}
      scroll={true}
      className={className}
      style={SITE_BACK_LINK_STYLE}
      aria-label={backNavigationLabel(destination)}
    >
      <NavBackLinkLabel destination={destination} showBackPrefix={showBackPrefix} />
    </ScrollResetLink>
  );
}

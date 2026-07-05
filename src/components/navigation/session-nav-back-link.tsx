"use client";

import { NavBackLink } from "@/components/navigation/nav-back-link";
import { useSessionBackNavigation } from "@/hooks/use-session-back-navigation";
import type { SessionBackContext } from "@/lib/session-navigation";

interface SessionNavBackLinkProps {
  fallback: SessionBackContext;
  className?: string;
  showBackPrefix?: boolean;
}

/** Top-left back control — reads session entry context, falls back to `fallback`. */
export function SessionNavBackLink({
  fallback,
  className,
  showBackPrefix,
}: SessionNavBackLinkProps) {
  const back = useSessionBackNavigation(fallback);

  return (
    <NavBackLink
      href={back.href}
      destination={back.destination}
      className={className}
      showBackPrefix={showBackPrefix}
    />
  );
}

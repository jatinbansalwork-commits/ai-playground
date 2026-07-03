"use client";

import { useRouter } from "next/navigation";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { backNavigationLabel, FOCUS_RING } from "@/lib/a11y";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";

interface ArticleBackLinkProps {
  fallbackHref: string;
  destination: string;
  className?: string;
}

export function ArticleBackLink({
  fallbackHref,
  destination,
  className = "",
}: ArticleBackLinkProps) {
  const router = useRouter();

  function handleBack() {
    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={[className, FOCUS_RING, "text-left"].filter(Boolean).join(" ")}
      style={SITE_BACK_LINK_STYLE}
      aria-label={backNavigationLabel(destination)}
    >
      <NavBackLinkLabel destination={destination} />
    </button>
  );
}

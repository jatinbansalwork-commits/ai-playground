"use client";

import { useRouter } from "next/navigation";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { backNavigationLabel, FOCUS_RING } from "@/lib/a11y";

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
      aria-label={backNavigationLabel(destination)}
    >
      <NavBackLinkLabel destination={destination} />
    </button>
  );
}

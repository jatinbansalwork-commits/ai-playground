"use client";

import { useRouter } from "next/navigation";
import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { backNavigationLabel } from "@/lib/a11y";
import { FOCUS_RING } from "@/lib/a11y";

interface ArticleBackLinkProps {
  fallbackHref: string;
  destination: string;
  className?: string;
}

function canNavigateBack(): boolean {
  if (typeof window === "undefined") return false;

  if (window.history.length > 1) return true;

  if (!document.referrer) return false;

  try {
    return new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}

export function ArticleBackLink({
  fallbackHref,
  destination,
  className = "",
}: ArticleBackLinkProps) {
  const router = useRouter();

  function handleBack() {
    if (canNavigateBack()) {
      router.back();
      return;
    }

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

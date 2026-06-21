"use client";

import { useEffect, useRef } from "react";
import { trackDesignReviewView } from "@/lib/analytics";
import { isArticleOnlyExperiment } from "@/lib/experiments-registry";

const DESIGN_REVIEW_SLUG = "design-review-checklist";

interface CraftArticlePageAnalyticsProps {
  slug: string;
}

export function CraftArticlePageAnalytics({
  slug,
}: CraftArticlePageAnalyticsProps): null {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    if (slug === DESIGN_REVIEW_SLUG || isArticleOnlyExperiment(slug)) {
      trackDesignReviewView(slug);
    }
  }, [slug]);

  return null;
}

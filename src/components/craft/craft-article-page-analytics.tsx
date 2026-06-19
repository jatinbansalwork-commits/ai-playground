"use client";

import { useEffect, useRef } from "react";
import {
  trackCraftExperimentView,
  trackDesignReviewView,
} from "@/lib/analytics";
import {
  getExperimentCategories,
  isArticleOnlyExperiment,
} from "@/lib/experiments-registry";

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

    if (getExperimentCategories(slug).includes("ai-experiment")) {
      trackCraftExperimentView({ slug, source: "page", external: false });
    }
  }, [slug]);

  return null;
}

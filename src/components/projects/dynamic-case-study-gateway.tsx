"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { notFound, useParams } from "next/navigation";
import { CaseStudyPageShell } from "@/components/projects/case-study-page-shell";
import { ROUTES } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";

const caseStudyComponents: Record<string, ComponentType> = {
  "cisco-policy-copilot": dynamic(
    () => import("@/components/case-studies/CiscoPolicyCopilot"),
  ),
  "freshprints-design-system": dynamic(
    () => import("@/components/case-studies/FreshprintsDesignSystem"),
  ),
  "freshprints-heal-tool": dynamic(
    () => import("@/components/case-studies/DesignTool"),
  ),
  "freshprints-image-gen-ai": dynamic(
    () => import("@/components/case-studies/FreshprintsImageGen"),
  ),
  "saltbot-ai-saltmine": dynamic(() => import("@/components/case-studies/Saltbot")),
  "saltmine-sync": dynamic(() => import("@/components/case-studies/SaltmineSync")),
  "kalash-rewards": dynamic(() => import("@/components/case-studies/KalashRewards")),
  "kalash-year-end-recap": dynamic(
    () => import("@/components/case-studies/PiggyMutualFund"),
  ),
  "piggy-reduced-mutual-fund-support-tickets": dynamic(
    () => import("@/components/case-studies/NewProject"),
  ),
  "piggy-personalised-mutual-fund-recommendation": dynamic(
    () => import("@/components/case-studies/ProjectTwo"),
  ),
};

/** Track B step 2 — deep-dive case study; back returns to the projects index. */
export default function DynamicCaseStudyGateway() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const TargetCaseStudyLayout = caseStudyComponents[slug];

  if (!TargetCaseStudyLayout) {
    notFound();
  }

  const content = getCaseStudyContent(slug);

  return (
    <CaseStudyPageShell
      backHref={ROUTES.projects}
      backDestination="Projects"
      analyticsSlug={slug}
      analyticsTitle={content?.title}
      analyticsSource="projects"
    >
      <TargetCaseStudyLayout />
    </CaseStudyPageShell>
  );
}

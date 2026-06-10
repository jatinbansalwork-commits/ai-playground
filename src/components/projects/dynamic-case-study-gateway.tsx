"use client";

import type { ComponentType } from "react";
import { notFound, useParams } from "next/navigation";
import { CaseStudyPageShell } from "@/components/projects/case-study-page-shell";
import CiscoPolicyCopilotContent from "@/components/case-studies/CiscoPolicyCopilot";
import DesignPollingContent from "@/components/case-studies/DesignPolling";
import DesignToolContent from "@/components/case-studies/DesignTool";
import FreshprintsDesignSystemContent from "@/components/case-studies/FreshprintsDesignSystem";
import FreshprintsImageGenContent from "@/components/case-studies/FreshprintsImageGen";
import KalashRewardsContent from "@/components/case-studies/KalashRewards";
import NewProjectContent from "@/components/case-studies/NewProject";
import OpenMoneyContent from "@/components/case-studies/OpenMoney";
import ProjectTwoContent from "@/components/case-studies/ProjectTwo";
import PiggyMutualFundContent from "@/components/case-studies/PiggyMutualFund";
import SaltbotContent from "@/components/case-studies/Saltbot";
import SaltmineSyncContent from "@/components/case-studies/SaltmineSync";
import { ROUTES } from "@/lib/constants";

const caseStudyComponents: Record<string, ComponentType> = {
  "cisco-policy-copilot": CiscoPolicyCopilotContent,
  "freshprints-design-system": FreshprintsDesignSystemContent,
  "design-tool": DesignToolContent,
  "design-polling": DesignPollingContent,
  "freshprints-image-gen": FreshprintsImageGenContent,
  saltbot: SaltbotContent,
  "saltmine-sync": SaltmineSyncContent,
  "kalash-rewards": KalashRewardsContent,
  "piggy-mutual-fund": PiggyMutualFundContent,
  "new-project": NewProjectContent,
  "project-2": ProjectTwoContent,
  "open-money": OpenMoneyContent,
};

/** Track B step 2 — deep-dive case study; back returns to the projects index. */
export default function DynamicCaseStudyGateway() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const TargetCaseStudyLayout = caseStudyComponents[slug];

  if (!TargetCaseStudyLayout) {
    notFound();
  }

  return (
    <CaseStudyPageShell
      backHref={ROUTES.projects}
      backDestination="Projects"
    >
      <TargetCaseStudyLayout />
    </CaseStudyPageShell>
  );
}

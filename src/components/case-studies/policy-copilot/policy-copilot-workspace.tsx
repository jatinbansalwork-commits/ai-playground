"use client";

import { PolicyCopilotLiving } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import { CLAUDE, workspaceFrameClasses } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import type { PolicyCopilotPresentation } from "@/components/case-studies/policy-copilot/policy-copilot-presentation";
import { trackPolicyCopilotDemo } from "@/lib/analytics";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

export function PolicyCopilotWorkspace({
  className = "",
  presentation,
}: {
  className?: string;
  presentation?: PolicyCopilotPresentation;
}) {
  const frame = workspaceFrameClasses();
  const isPresentation = Boolean(presentation);

  function handleReset() {
    trackPolicyCopilotDemo({ action: "reset" });
  }

  return (
    <div
      className={cn(frame.frame, className)}
      style={{
        backgroundColor: CLAUDE.bg,
        borderColor: CLAUDE.border,
        boxShadow: frame.shadow,
      }}
      role={isPresentation ? "img" : "application"}
      aria-label={
        isPresentation
          ? presentation === "intent-summary"
            ? "Policy Copilot intent summary — reflection panel with users, applications, zones, and confirmation, read-only"
            : presentation === "business-intent"
              ? "Policy Copilot business intent — workspace with natural-language input and suggested prompts, read-only"
              : presentation === "living-workspace"
                ? "Policy Copilot living workspace — continuous canvas with mapped entities, topology, and draft policy, read-only"
                : presentation === "continuous-validation"
                  ? "Policy Copilot continuous validation — safety checks running in the workspace with author panel and compliance results, read-only"
                  : presentation === "simulation-impact"
                    ? "Policy Copilot simulation and impact — blast radius preview and pre-deploy simulation in the workspace, read-only"
                    : "Policy Copilot workspace preview, read-only"
          : "Policy Copilot living workspace"
      }
    >
      <PolicyCopilotLiving
        presentation={presentation}
        onReset={isPresentation ? undefined : handleReset}
        className="h-full"
      />
    </div>
  );
}

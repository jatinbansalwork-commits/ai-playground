"use client";

import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Continuous validation — safety checks, compliance results, and author panel in the Policy Copilot workspace as the policy evolves.";

export function PolicyCopilotContinuousValidationWorkspace() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={WORKSPACE_EMBED_SHELL}>
        <PolicyCopilotWorkspace presentation="continuous-validation" />
      </div>
    </div>
  );
}

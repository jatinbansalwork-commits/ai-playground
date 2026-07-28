"use client";

import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Simulation and impact — impact preview, pre-deploy simulation strip, and deployment readiness in the Policy Copilot workspace.";

export function PolicyCopilotSimulationImpactWorkspace() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={WORKSPACE_EMBED_SHELL}>
        <PolicyCopilotWorkspace presentation="simulation-impact" />
      </div>
    </div>
  );
}

"use client";

import { PolicyCopilotWorkspaceEmbedFit } from "@/components/case-studies/policy-copilot/policy-copilot-workspace-embed-fit";
import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Living workspace — a continuous canvas where recognised users, applications, network zones, compliance checks, and policy objects appear gradually as the policy preview evolves.";

export function PolicyCopilotLivingWorkspace() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={`${WORKSPACE_EMBED_SHELL} !px-0 md:!px-0`}>
        <PolicyCopilotWorkspaceEmbedFit>
          <PolicyCopilotWorkspace presentation="living-workspace" />
        </PolicyCopilotWorkspaceEmbedFit>
      </div>
    </div>
  );
}

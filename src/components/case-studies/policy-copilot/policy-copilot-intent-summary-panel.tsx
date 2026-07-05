"use client";

import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Intent summary — Policy Copilot reflects understanding of users, applications, devices, assumptions, and clarifications before generating a policy.";

export function PolicyCopilotIntentSummaryPanel() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={WORKSPACE_EMBED_SHELL}>
        <PolicyCopilotWorkspace presentation="intent-summary" />
      </div>
    </div>
  );
}

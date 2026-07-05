"use client";

import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Draft policy — structured preview with firewall objects, relationships, and inline explanations traced back to confirmed administrator decisions.";

export function PolicyCopilotDraftPolicy() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={WORKSPACE_EMBED_SHELL}>
        <PolicyCopilotWorkspace presentation="living-workspace" />
      </div>
    </div>
  );
}

"use client";

import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL, WORKSPACE_HOST_BREAKOUT } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const ILLUSTRATION_ARIA_LABEL =
  "Business intent — opening screen with natural-language input, suggested prompts, and whitespace for describing outcomes instead of technical configuration.";

export function PolicyCopilotBusinessIntent() {
  return (
    <div className={WORKSPACE_HOST_BREAKOUT} role="img" aria-label={ILLUSTRATION_ARIA_LABEL}>
      <div className={WORKSPACE_EMBED_SHELL}>
        <PolicyCopilotWorkspace presentation="business-intent" />
      </div>
    </div>
  );
}

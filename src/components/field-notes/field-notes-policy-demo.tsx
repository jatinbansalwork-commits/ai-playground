"use client";

import { PolicyCopilotFinalApproval } from "@/components/case-studies/policy-copilot/policy-copilot-final-approval";
import { PolicyCopilotWorkspaceEmbedFit } from "@/components/case-studies/policy-copilot/policy-copilot-workspace-embed-fit";
import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import {
  WORKSPACE_EMBED_SHELL,
  WORKSPACE_HOST_BREAKOUT,
} from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { FieldNotesInThreadDemo } from "@/components/field-notes/field-notes-in-thread-demo";
import type { FieldNotesPolicyDemoId } from "@/lib/field-notes-1-content";
import type { PolicyCopilotPresentation } from "@/components/case-studies/policy-copilot/policy-copilot-presentation";

const DEMO_LABEL: Record<FieldNotesPolicyDemoId, string> = {
  "in-thread-policy":
    "Chat-only sketch — draft policy dropped into the Copilot reply as a card",
  "living-workspace":
    "Policy Copilot living workspace — conversation on the left, policy draft on the right",
  "intent-summary":
    "Policy Copilot intent summary — understanding users, apps, and access before any firewall rules",
  "final-approval":
    "Policy Copilot final approval — human sign-off kept separate from the chat",
};

interface FieldNotesPolicyDemoProps {
  demo: FieldNotesPolicyDemoId;
}

function WorkspacePresentation({
  presentation,
}: {
  presentation: PolicyCopilotPresentation;
}) {
  return (
    <div className={`${WORKSPACE_EMBED_SHELL} !px-0 md:!px-0`}>
      <PolicyCopilotWorkspaceEmbedFit>
        <PolicyCopilotWorkspace presentation={presentation} />
      </PolicyCopilotWorkspaceEmbedFit>
    </div>
  );
}

/** Notes demos — in-thread chat card vs side-by-side product embeds. */
export function FieldNotesPolicyDemo({ demo }: FieldNotesPolicyDemoProps) {
  if (demo === "in-thread-policy") {
    return <FieldNotesInThreadDemo />;
  }

  return (
    <figure className="field-notes-demo" aria-label={DEMO_LABEL[demo]}>
      <div className={WORKSPACE_HOST_BREAKOUT}>
        {demo === "final-approval" ? (
          <div className="field-notes-demo__panel">
            <PolicyCopilotFinalApproval />
          </div>
        ) : (
          <WorkspacePresentation presentation={demo} />
        )}
      </div>
    </figure>
  );
}

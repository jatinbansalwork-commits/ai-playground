"use client";

import { useState } from "react";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { PolicyCopilotWorkspace } from "@/components/case-studies/policy-copilot/policy-copilot-workspace";
import { WORKSPACE_EMBED_SHELL } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { BACK_HOME, saveSessionBackContext } from "@/lib/session-navigation";

export function PolicyCopilotDevShell() {
  const [copilotKey, setCopilotKey] = useState(0);

  return (
    <main
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: "#09090b" }}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5 md:px-5">
        <p className="text-xs text-neutral-500">Dev preview — Policy Copilot desktop</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCopilotKey((key) => key + 1)}
            className="text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-300"
          >
            Start Over
          </button>
          <ScrollResetLink
            href="/projects/cisco-policy-copilot"
            onClick={() => saveSessionBackContext(BACK_HOME)}
            className="text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-200"
          >
            Open case study →
          </ScrollResetLink>
        </div>
      </header>
      <div className={`min-h-0 flex-1 ${WORKSPACE_EMBED_SHELL}`}>
        <PolicyCopilotWorkspace key={copilotKey} />
      </div>
    </main>
  );
}

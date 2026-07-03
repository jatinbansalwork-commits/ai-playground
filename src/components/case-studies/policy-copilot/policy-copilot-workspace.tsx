"use client";

import { useCallback, useEffect, useRef } from "react";
import { PolicyCopilotLiving } from "@/components/case-studies/policy-copilot/policy-copilot-living";
import { CLAUDE, workspaceFrameClasses } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { trackPolicyCopilotDemo } from "@/lib/analytics";
import { scrollCaseStudyWorkspaceIntoView } from "@/lib/case-study-a11y";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PolicyCopilotWorkspace({ className = "" }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const skipFlowScrollRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const frame = workspaceFrameClasses();

  const scrollFrameIntoView = useCallback(() => {
    scrollCaseStudyWorkspaceIntoView(
      frameRef.current,
      reducedMotion ? "auto" : undefined,
    );
  }, [reducedMotion]);

  useEffect(() => {
    if (skipFlowScrollRef.current) {
      skipFlowScrollRef.current = false;
      return;
    }
    scrollFrameIntoView();
  }, [scrollFrameIntoView]);

  function handleReset() {
    trackPolicyCopilotDemo({ action: "reset" });
  }

  return (
    <div
      ref={frameRef}
      className={cn(frame.frame, className)}
      style={{
        backgroundColor: CLAUDE.bg,
        borderColor: CLAUDE.border,
        boxShadow: frame.shadow,
      }}
      role="application"
      aria-label="Policy Copilot living workspace"
    >
      <PolicyCopilotLiving onStepChange={scrollFrameIntoView} onReset={handleReset} className="h-full" />
    </div>
  );
}

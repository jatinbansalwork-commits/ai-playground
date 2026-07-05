"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEPLOY_PROGRESS_STEPS,
  DEPLOY_REGIONS,
  EHR_JOURNEY_DEFAULTS,
  LIFECYCLE_META,
  type LifecyclePhase,
  VALIDATION_COMPLIANCE_CHECKS,
} from "@/components/case-studies/policy-copilot/policy-copilot-data";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import {
  CopilotMark,
  FlowProgress,
  PolicyCopilotFrame,
  PolicyCopilotSidebar,
  ThinkingDots,
} from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import {
  ComplianceOverlayGrid,
  DriftMemoryCard,
  ImpactForecastPanel,
  LifecycleTimeline,
  L7UpgradeBadge,
  PanelLabel,
  RelatedPolicySuggestions,
  RiskScoreCard,
  UnitTestSummary,
} from "@/components/case-studies/policy-copilot/policy-copilot-prd-ui";
import { cn, PrimaryBtn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const spring = { type: "spring" as const, stiffness: 360, damping: 28 };
const ease = [0.25, 0.1, 0.25, 1] as const;

type ChatSender = "copilot" | "user";

interface ChatMessage {
  id: string;
  sender: ChatSender;
  time: string;
  body: string;
  actions?: { label: string; primary?: boolean; onClick?: () => void }[];
}

function ChatBubble({
  message,
  delay = 0,
}: {
  message: ChatMessage;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const isUser = message.sender === "user";

  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduced ? { duration: 0 } : { ...spring, delay }}
      className={cn("max-w-[90%] rounded-2xl border px-3 py-2.5", isUser ? "self-end" : "self-start")}
      style={{
        backgroundColor: isUser ? CLAUDE.surfaceOverlay : CLAUDE.surfaceRaised,
        borderColor: CLAUDE.border,
        borderLeftWidth: isUser ? 1 : 3,
        borderLeftColor: isUser ? CLAUDE.border : CLAUDE.primary,
      }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        {isUser ? (
          <div
            className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[7px] font-bold"
            style={{ backgroundColor: CLAUDE.warning, color: "#1a1814" }}
          >
            J
          </div>
        ) : (
          <CopilotMark size={18} />
        )}
        <p className="text-[8px] font-medium" style={{ color: CLAUDE.text }}>
          {isUser ? "You" : "Policy Copilot"}
        </p>
        <p className="ml-auto text-[7px]" style={{ color: CLAUDE.textSoft }}>
          {message.time}
        </p>
      </div>
      <p className="text-[9px] leading-relaxed md:text-[10px]" style={{ color: CLAUDE.textSecondary }}>
        {message.body}
      </p>
      {message.actions?.length ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {message.actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[8px] font-medium transition-colors",
                action.primary ? "hover:opacity-90" : "hover:bg-white/[0.04]",
              )}
              style={
                action.primary
                  ? { backgroundColor: CLAUDE.primary, borderColor: CLAUDE.primary, color: "#fff" }
                  : { borderColor: CLAUDE.primaryBorder, color: CLAUDE.textSecondary }
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

function EhrTopologyDiagram() {
  return (
    <div
      className="relative rounded-xl border p-3"
      style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}
      aria-label="EHR access topology: doctors allowed, nurses denied"
    >
      <p className="mb-3 text-[8px] font-medium" style={{ color: CLAUDE.textMuted }}>
        Built from your confirmed request.
      </p>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-20 shrink-0 items-center justify-center rounded-lg border text-[8px] font-medium"
            style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
          >
            Doctor
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="h-px" style={{ backgroundColor: CLAUDE.validated }} />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-[6px] font-medium"
              style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
            >
              Allow
            </span>
          </div>
          <div
            className="flex h-10 w-24 shrink-0 items-center justify-center rounded-lg border text-[8px] font-medium"
            style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
          >
            EHR System
          </div>
        </div>
        <div className="flex justify-center">
          <span
            className="rounded-full border px-2 py-0.5 text-[6px]"
            style={{ borderColor: CLAUDE.primaryBorder, color: CLAUDE.primary, backgroundColor: CLAUDE.primaryMuted }}
          >
            Audit logging enabled
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-20 shrink-0 items-center justify-center rounded-lg border text-[8px] font-medium"
            style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
          >
            Nurses
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="h-px border-t border-dashed" style={{ borderColor: CLAUDE.risk }} />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-[6px] font-medium"
              style={{ backgroundColor: CLAUDE.riskMuted, color: CLAUDE.risk }}
            >
              Deny
            </span>
          </div>
          <div className="w-24 shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function CanvasPanel({
  phase,
  policyName,
  justification,
  reviewSchedule,
  onPolicyNameChange,
  onJustificationChange,
  onReviewScheduleChange,
  complianceDone,
  simLines,
  deployStepIndex,
  deploySubStep,
  regionStatus,
  driftResolved,
  onDriftAction,
}: {
  phase: LifecyclePhase;
  policyName: string;
  justification: string;
  reviewSchedule: string;
  onPolicyNameChange: (v: string) => void;
  onJustificationChange: (v: string) => void;
  onReviewScheduleChange: (v: string) => void;
  complianceDone: number;
  simLines: string[];
  deployStepIndex: number;
  deploySubStep: number;
  regionStatus: ("synced" | "deploying" | "pending")[];
  driftResolved: boolean;
  onDriftAction: (action: "retain" | "deprecate") => void;
}) {
  const meta =
    phase === "author"
      ? LIFECYCLE_META.author
      : phase === "validate_ready" || phase === "validate_progress"
        ? LIFECYCLE_META.validate
        : phase === "deploy_ready" || phase === "deploy_progress"
          ? LIFECYCLE_META.deploy
          : phase === "optimize"
            ? LIFECYCLE_META.optimize
            : LIFECYCLE_META.review;

  const inProgress =
    phase === "validate_progress" || phase === "deploy_progress";

  return (
    <aside className="relative z-10 flex min-h-0 min-w-0 flex-col border-l" style={{ borderColor: CLAUDE.hairline }}>
      <div className="border-b p-3 md:p-4" style={{ borderColor: CLAUDE.hairline }}>
        <FlowProgress
          step={meta.step}
          total={meta.total}
          progress={meta.progress}
          label={meta.label}
        />
        {inProgress ? (
          <p className="mt-1 text-[7px]" style={{ color: CLAUDE.textSoft }}>
            In progress…
          </p>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        <AnimatePresence mode="wait">
          {phase === "author" ? (
            <motion.div key="author" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <EhrTopologyDiagram />
              <div>
                <PanelLabel>Suggested additions</PanelLabel>
                <div className="mt-2">
                  <RelatedPolicySuggestions />
                </div>
              </div>
              <div>
                <PanelLabel>Policy details</PanelLabel>
                <p className="mt-1 text-[9px]" style={{ color: CLAUDE.textSecondary }}>
                  Created by: {EHR_JOURNEY_DEFAULTS.authorName}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                  Who owns this rule, why it exists, and when to review it.
                </p>
                <label className="mb-2 mt-2 block">
                  <span className="text-[8px]" style={{ color: CLAUDE.textSoft }}>Policy name</span>
                  <input
                    value={policyName}
                    onChange={(e) => onPolicyNameChange(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border px-2 py-1.5 text-[9px] outline-none focus:border-[rgb(92_151_238/0.45)]"
                    style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
                  />
                </label>
                <label className="mb-2 block">
                  <span className="text-[7px]" style={{ color: CLAUDE.textSoft }}>Business justification</span>
                  <input
                    value={justification}
                    onChange={(e) => onJustificationChange(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border px-2 py-1.5 text-[9px] outline-none focus:border-[rgb(92_151_238/0.45)]"
                    style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
                  />
                </label>
                <label className="block">
                  <span className="text-[7px]" style={{ color: CLAUDE.textSoft }}>Review schedule</span>
                  <select
                    value={reviewSchedule}
                    onChange={(e) => onReviewScheduleChange(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border px-2 py-1.5 text-[9px] outline-none"
                    style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised, color: CLAUDE.text }}
                  >
                    <option value="Review every 90 days">Review every 90 days</option>
                    <option value="Review every 180 days">Review every 180 days</option>
                  </select>
                </label>
              </div>
            </motion.div>
          ) : null}

          {phase === "validate_ready" ? (
            <motion.div key="val-ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-[12px] font-normal tracking-tight" style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}>
                Pre-deploy checks
              </p>
              <p className="text-[9px]" style={{ color: CLAUDE.textMuted }}>
                See who is affected and whether anything breaks.
              </p>
              <UnitTestSummary />
              <RiskScoreCard />
            </motion.div>
          ) : null}

          {phase === "validate_progress" ? (
            <motion.div key="val-prog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <PanelLabel>Compliance checks</PanelLabel>
              <ComplianceOverlayGrid doneCount={complianceDone} />
              <RiskScoreCard />
              <PanelLabel>What to expect</PanelLabel>
              <ImpactForecastPanel />
              <div
                className="rounded-lg border p-2 font-mono text-[7px] leading-relaxed"
                style={{ borderColor: CLAUDE.border, backgroundColor: "#0d0c0b", color: CLAUDE.validated }}
              >
                {simLines.map((line) => (
                  <p key={line} className={line.startsWith("> Note") ? "text-[#e8a55a]" : undefined}>
                    {line}
                  </p>
                ))}
                {complianceDone < VALIDATION_COMPLIANCE_CHECKS.length ? (
                  <span className="inline-flex items-center gap-1" style={{ color: CLAUDE.textMuted }}>
                    Running checks<ThinkingDots />
                  </span>
                ) : null}
              </div>
            </motion.div>
          ) : null}

          {phase === "deploy_ready" ? (
            <motion.div key="dep-ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-[9px] font-medium" style={{ color: CLAUDE.text }}>
                Ready to deploy
              </p>
              <div className="rounded-xl border p-2.5" style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}>
                {[
                  ["Targets", "Production firewall clusters"],
                  ["Change", "New access rule with SSL inspection and audit logging"],
                  ["Rollout", "One region at a time"],
                  ["Impact", "About +0.2ms latency · no expected downtime"],
                  ["Compliance", "Passed in simulation"],
                  ["Rollback", "Auto-rollback if errors exceed 3% in the first 5 minutes"],
                ].map(([k, v]) => (
                  <div key={k} className="mb-1.5 last:mb-0">
                    <p className="text-[7px]" style={{ color: CLAUDE.textSoft }}>{k}</p>
                    <p className="text-[8px]" style={{ color: CLAUDE.textSecondary }}>{v}</p>
                  </div>
                ))}
                <p className="mt-2 text-[7px] font-medium" style={{ color: CLAUDE.validated }}>
                  ✓ Pre-deploy checks passed
                </p>
              </div>
              <p className="text-[8px] font-medium" style={{ color: CLAUDE.textMuted }}>
                Regional deployment status
              </p>
              {DEPLOY_REGIONS.map((region, i) => (
                <div key={region.id} className="flex items-center justify-between text-[8px]">
                  <span style={{ color: CLAUDE.textSecondary }}>{region.label}</span>
                  <span style={{ color: CLAUDE.textSoft }}>{regionStatus[i] === "synced" ? "Synced" : "Pending"}</span>
                </div>
              ))}
            </motion.div>
          ) : null}

          {phase === "deploy_progress" ? (
            <motion.div key="dep-prog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-[9px] font-medium" style={{ color: CLAUDE.text }}>
                Deployment progress
              </p>
              {DEPLOY_PROGRESS_STEPS.map((step, stepIdx) => {
                const done = stepIdx < deployStepIndex;
                const active = stepIdx === deployStepIndex;
                return (
                  <div key={step.id}>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full border"
                        style={{
                          borderColor: done ? CLAUDE.primary : CLAUDE.border,
                          backgroundColor: done ? CLAUDE.primary : "transparent",
                        }}
                      >
                        {done ? (
                          <svg className="h-2 w-2 text-white" viewBox="0 0 8 8" fill="none" aria-hidden>
                            <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        ) : null}
                      </span>
                      <p className="text-[8px] font-medium" style={{ color: done || active ? CLAUDE.text : CLAUDE.textSoft }}>
                        {step.label}
                      </p>
                    </div>
                    {active || done ? (
                      <ul className="ml-5 mt-1 space-y-0.5">
                        {step.items.map((item, subIdx) => (
                          <li
                            key={item}
                            className="text-[7px]"
                            style={{
                              color:
                                done || (active && subIdx <= deploySubStep)
                                  ? CLAUDE.textMuted
                                  : CLAUDE.textSoft,
                            }}
                          >
                            · {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </motion.div>
          ) : null}

          {phase === "optimize" ? (
            <motion.div key="opt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <L7UpgradeBadge />
              <PanelLabel>Cleanup suggestions</PanelLabel>
              <DriftMemoryCard
                resolved={driftResolved}
                onRetain={() => onDriftAction("retain")}
                onDeprecate={() => onDriftAction("deprecate")}
              />
            </motion.div>
          ) : null}

          {phase === "review" ? (
            <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div
                className="rounded-xl border px-3 py-2.5 text-center"
                style={{ borderColor: CLAUDE.validatedMuted, backgroundColor: CLAUDE.validatedMuted }}
              >
                <p className="text-[10px] font-medium" style={{ color: CLAUDE.validated }}>
                  All done
                </p>
                <p className="mt-0.5 text-[9px]" style={{ color: CLAUDE.textSecondary }}>
                  Full record saved — versioned and ready for audit.
                </p>
              </div>
              <PanelLabel>Lifecycle timeline</PanelLabel>
              <LifecycleTimeline />
              <div className="rounded-xl border p-2.5" style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surface }}>
                <p className="text-[9px] font-medium" style={{ color: CLAUDE.text }}>No changes after deploy</p>
                <p className="mt-0.5 text-[8px]" style={{ color: CLAUDE.textMuted }}>
                  847 access events logged · nothing edited post-launch.
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function buildSeedMessages(intent: string): ChatMessage[] {
  return [
    { id: "m1", sender: "user", time: "11:05 AM", body: intent },
    {
      id: "m2",
      sender: "copilot",
      time: "11:05 AM",
      body: "Mapped doctors to Doctors-AD-Group, nurses to Nurses-AD-Group, and EHR to the protected app. Draft rules are ready.",
    },
    {
      id: "m3",
      sender: "user",
      time: "11:05 AM",
      body: "Looks right. Build the topology.",
    },
    {
      id: "m4",
      sender: "copilot",
      time: "11:05 AM",
      body: "Topology is ready. Add a short note on why this rule exists — it helps future audits.",
    },
  ];
}

const SIM_LINES = [
  "$ policy test --id 882",
  "> Simulating 2.4k EHR sessions…",
  "> 124 people in scope · risk: low",
  "> Note: old rule may overlap on legacy segment",
  "> Passed — no outages · HIPAA checks OK",
];

export function PolicyCopilotJourney({
  intent,
  onReset,
  onStepChange,
  className,
}: {
  intent: string;
  onReset?: () => void;
  onStepChange?: () => void;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const skipStepScrollRef = useRef(true);

  const [phase, setPhase] = useState<LifecyclePhase>("author");
  const [messages, setMessages] = useState<ChatMessage[]>(() => buildSeedMessages(intent));
  const [policyName, setPolicyName] = useState<string>(EHR_JOURNEY_DEFAULTS.policyName);
  const [justification, setJustification] = useState<string>(EHR_JOURNEY_DEFAULTS.justification);
  const [reviewSchedule, setReviewSchedule] = useState<string>(EHR_JOURNEY_DEFAULTS.reviewSchedule);
  const [composerText, setComposerText] = useState("");
  const [complianceDone, setComplianceDone] = useState(0);
  const [simLineCount, setSimLineCount] = useState(0);
  const [deployStepIndex, setDeployStepIndex] = useState(0);
  const [deploySubStep, setDeploySubStep] = useState(0);
  const [regionStatus, setRegionStatus] = useState<("synced" | "deploying" | "pending")[]>([
    "pending",
    "pending",
    "pending",
  ]);
  const [driftResolved, setDriftResolved] = useState(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const pushMessage = useCallback((msg: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: `m-${Date.now()}-${prev.length}` }]);
  }, []);

  useEffect(() => {
    if (skipStepScrollRef.current) {
      skipStepScrollRef.current = false;
      return;
    }
    onStepChange?.();
  }, [phase, onStepChange]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, phase, reducedMotion]);

  const startValidation = useCallback(() => {
    setPhase("validate_progress");
    setComplianceDone(0);
    setSimLineCount(0);
    pushMessage({
      sender: "copilot",
      time: "11:06 AM",
      body: "Running checks — HIPAA, NIST, and a simulation across 47 systems. Results are on the right.",
    });
    clearTimers();
    VALIDATION_COMPLIANCE_CHECKS.forEach((_, i) => {
      schedule(() => setComplianceDone(i + 1), 600 + i * 500);
    });
    SIM_LINES.forEach((_, i) => {
      schedule(() => setSimLineCount(i + 1), 800 + i * 400);
    });
    schedule(() => {
      pushMessage({
        sender: "copilot",
        time: "11:07 AM",
        body: "All checks passed. Ready to deploy.",
      });
      setPhase("deploy_ready");
    }, 3200);
  }, [clearTimers, pushMessage, schedule]);

  const confirmAuthor = useCallback(() => {
    pushMessage({
      sender: "copilot",
      time: "11:06 AM",
      body: "Settings look good. I can run the pre-deploy checks next.",
    });
    setPhase("validate_ready");
    schedule(() => {
      pushMessage({
        sender: "copilot",
        time: "11:06 AM",
        body: "Ready when you are.",
        actions: [
          { label: "Refine first" },
          { label: "Run checks →", primary: true, onClick: startValidation },
        ],
      });
    }, 400);
  }, [pushMessage, schedule, startValidation]);

  const startDeploy = useCallback(() => {
    setPhase("deploy_progress");
    setDeployStepIndex(0);
    setDeploySubStep(0);
    setRegionStatus(["pending", "pending", "pending"]);
    pushMessage({
      sender: "copilot",
      time: "11:08 AM",
      body: "Checks passed. Deploying to three regions — about 30–45 seconds. Watch progress on the right.",
    });
    clearTimers();
    let step = 0;
    let sub = 0;
    const tick = () => {
      const currentStep = DEPLOY_PROGRESS_STEPS[step];
      if (!currentStep) {
        setRegionStatus(["synced", "synced", "synced"]);
        schedule(() => setPhase("optimize"), 600);
        return;
      }
      setDeployStepIndex(step);
      setDeploySubStep(sub);
      if (step === 2 && sub === 1) setRegionStatus(["synced", "deploying", "pending"]);
      if (step === 2 && sub === 3) setRegionStatus(["synced", "synced", "deploying"]);
      sub += 1;
      if (sub >= currentStep.items.length) {
        step += 1;
        sub = 0;
      }
      schedule(tick, reducedMotion ? 80 : 420);
    };
    schedule(tick, 300);
  }, [clearTimers, pushMessage, reducedMotion, schedule]);

  const resolveDrift = useCallback(
    (action: "retain" | "deprecate") => {
      setDriftResolved(true);
      pushMessage({
        sender: "copilot",
        time: "11:09 AM",
        body:
          action === "deprecate"
            ? "Old rule marked for removal. Record updated."
            : "Rule kept active. Record updated.",
      });
      schedule(() => {
        pushMessage({
          sender: "copilot",
          time: "11:09 AM",
          body: "That's the full journey. Review the timeline on the right, or start a new policy.",
        });
        setPhase("review");
      }, 500);
    },
    [pushMessage, schedule],
  );

  useEffect(() => {
    if (phase !== "optimize" || driftResolved) return;
    const t = window.setTimeout(() => resolveDrift("deprecate"), reducedMotion ? 200 : 4500);
    return () => clearTimeout(t);
  }, [phase, driftResolved, reducedMotion, resolveDrift]);

  const composerDisabled =
    phase === "deploy_progress" || phase === "validate_progress" || phase === "review";

  const composerPlaceholder =
    phase === "deploy_progress"
      ? "Deploying — monitoring only…"
      : phase === "review"
        ? "Journey complete"
        : "Ask a question or suggest a change…";

  const footerCta =
    phase === "author" ? (
      <PrimaryBtn onClick={confirmAuthor}>Confirm & check →</PrimaryBtn>
    ) : phase === "validate_ready" ? (
      <PrimaryBtn onClick={startValidation}>Run checks →</PrimaryBtn>
    ) : phase === "deploy_ready" ? (
      <PrimaryBtn onClick={startDeploy}>Deploy now →</PrimaryBtn>
    ) : phase === "deploy_progress" && deployStepIndex >= DEPLOY_PROGRESS_STEPS.length - 1 ? (
      <PrimaryBtn onClick={() => setPhase("optimize")}>Continue →</PrimaryBtn>
    ) : phase === "review" ? (
      <PrimaryBtn variant="secondary" onClick={onReset}>
        Start new policy
      </PrimaryBtn>
    ) : null;

  const quickPills =
    phase === "author"
      ? ["Tighten permissions", "Add encryption", "Review settings"]
      : phase === "validate_ready" || phase === "validate_progress"
        ? ["Explain the results", "Who is affected?", "Show compliance"]
        : phase === "deploy_ready" || phase === "deploy_progress"
          ? ["Schedule for later", "Show progress", "Hand off to ops"]
          : [];

  return (
    <PolicyCopilotFrame className={className}>
      <PolicyCopilotSidebar
        variant="flow"
        activeNav="lifecycle"
        onNavChange={() => {}}
        onBack={onReset}
        onStartNewPolicy={onReset}
        onRecentSelect={() => {}}
      />
      <div className="relative z-10 grid min-h-0 min-w-0 flex-1 grid-cols-1 sm:grid-cols-2">
        <section
          className="flex min-h-0 min-w-0 flex-col border-r"
          style={{ borderColor: CLAUDE.hairline }}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3 md:p-4">
            {messages.map((msg, i) => (
              <ChatBubble key={msg.id} message={msg} delay={i > 3 ? 0.05 : 0} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {quickPills.length > 0 ? (
            <div className="flex shrink-0 flex-wrap gap-1 border-t px-3 py-2" style={{ borderColor: CLAUDE.hairline }}>
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className="rounded-full border px-2 py-0.5 text-[7px] transition-colors hover:bg-white/[0.03]"
                  style={{ borderColor: CLAUDE.primaryBorder, color: CLAUDE.textMuted }}
                >
                  {pill}
                </button>
              ))}
            </div>
          ) : null}

          <div
            className="shrink-0 border-t px-3 pb-2.5 pt-2 md:px-4"
            style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
          >
            <div className="flex items-end gap-2">
              <div
                className="relative min-w-0 flex-1 rounded-xl border"
                style={{
                  borderColor: CLAUDE.borderStrong,
                  backgroundColor: composerDisabled ? CLAUDE.surface : CLAUDE.surfaceRaised,
                  opacity: composerDisabled ? 0.7 : 1,
                }}
              >
                <textarea
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  disabled={composerDisabled}
                  rows={1}
                  placeholder={composerPlaceholder}
                  className="min-h-[2.25rem] w-full resize-none bg-transparent px-3 py-2 pr-10 text-[9px] leading-relaxed outline-none md:text-[10px] [&::placeholder]:text-[#8e8b82]"
                  style={{ color: CLAUDE.text }}
                  aria-label="Policy chat composer"
                />
                <button
                  type="button"
                  disabled={composerDisabled || !composerText.trim()}
                  className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full disabled:opacity-30"
                  style={{ backgroundColor: CLAUDE.primary }}
                  aria-label="Send message"
                >
                  <svg className="h-3 w-3 text-white" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {footerCta}
            </div>
            <p className="mt-1.5 text-center text-[7px]" style={{ color: CLAUDE.textSoft }}>
              Policy Copilot uses AI to help create firewall policies. Review before deployment.
            </p>
          </div>
        </section>

        <CanvasPanel
          phase={phase}
          policyName={policyName}
          justification={justification}
          reviewSchedule={reviewSchedule}
          onPolicyNameChange={setPolicyName}
          onJustificationChange={setJustification}
          onReviewScheduleChange={setReviewSchedule}
          complianceDone={complianceDone}
          simLines={SIM_LINES.slice(0, simLineCount)}
          deployStepIndex={deployStepIndex}
          deploySubStep={deploySubStep}
          regionStatus={regionStatus}
          driftResolved={driftResolved}
          onDriftAction={resolveDrift}
        />
      </div>
    </PolicyCopilotFrame>
  );
}

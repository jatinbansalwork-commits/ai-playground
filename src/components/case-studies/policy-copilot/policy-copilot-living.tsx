"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildAuthoringThreadHistory } from "@/components/case-studies/policy-copilot/policy-copilot-thread-history";
import { resolveAgenticEvidence } from "@/components/case-studies/policy-copilot/policy-copilot-agentic-evidence";
import {
  ComplianceSummaryPanel,
  ReasoningEvidencePanel,
} from "@/components/case-studies/policy-copilot/policy-copilot-agentic-ui";
import {
  DASHBOARD_STAT_INTROS,
  DRIFT_FLAGS,
  type ActivePolicyRow,
  type CheckIssueRow,
  type DriftFlagRow,
  type PendingReviewRow,
} from "@/components/case-studies/policy-copilot/policy-copilot-dashboard-flows";
import { DashboardDrilldownPanel } from "@/components/case-studies/policy-copilot/policy-copilot-dashboard-views";
import {
  COPILOT_RECENT_POLICIES,
  DEFAULT_PLACEHOLDER,
  STARTER_PROMPTS,
  type CopilotRecentItem,
} from "@/components/case-studies/policy-copilot/policy-copilot-data";
import {
  BUSINESS_INTENT_PLACEHOLDER,
  createBusinessIntentPresentationState,
  createContinuousValidationPresentationState,
  createIntentSummaryPresentationState,
  createLivingWorkspacePresentationState,
  createSimulationImpactPresentationState,
  type PolicyCopilotPresentation,
} from "@/components/case-studies/policy-copilot/policy-copilot-presentation";
import {
  showApprovalSummaryCanvas,
  showAuthorPanelCanvas,
  showComplianceSummaryCanvas,
  showDraftCanvas,
  showMappingCanvas,
  showOptimiseCanvas,
  showTechnicalRulesCanvas,
  showValidationCanvas,
} from "@/components/case-studies/policy-copilot/policy-copilot-canvas-focus";
import {
  journeyStepLabel,
  resolveJourneyStep,
} from "@/components/case-studies/policy-copilot/policy-copilot-journey-steps";
import { resolveIntentClarification } from "@/components/case-studies/policy-copilot/policy-copilot-intent-clarification";
import {
  LEGACY_DOCUMENT_STORY,
  resolveLivingPreset,
  REVIEW_DRIFT_STORY,
  type DashboardStatId,
  type LivingScenarioPreset,
} from "@/components/case-studies/policy-copilot/policy-copilot-living-scenarios";
import {
  entityMappingDuration,
  livingDelay,
  LIVING_DELAY_MS,
  safetyChecksDuration,
} from "@/components/case-studies/policy-copilot/policy-copilot-living-pacing";
import {
  resolveJourneyContent,
} from "@/components/case-studies/policy-copilot/policy-copilot-journey-content";
import {
  AuthorValidationPanel,
  DeployReadyCard,
  EvidenceRecommendationCard,
  GovernRecordPanel,
  GovernPolicyOverview,
  IntentBanner,
  RefineRulesReorder,
} from "@/components/case-studies/policy-copilot/policy-copilot-journey-ui";
import {
  buildResumeDiffSummary,
  clearDraftCheckpoint,
  draftCheckpointForPrompt,
  loadDraftCheckpoint,
  saveDraftCheckpoint,
  type DraftResumeCheckpoint,
} from "@/components/case-studies/policy-copilot/policy-copilot-draft-resume";
import { scrollIntoNearestScrollParent } from "@/lib/case-study-a11y";
import { CANVAS_SECTION_IDS, resolveWhyAnnotation, resolveWhyCanvasSections, SKILL_TOKENS, type CanvasSectionId } from "@/components/case-studies/policy-copilot/policy-copilot-design-system";
import {
  AgentStatusBar,
  CanvasSectionAnchor,
  ConfidenceRing,
  DeploySimulateStrip,
  EnforcementWatermark,
  GovernExportButton,
  GovernPolicyPassport,
  JourneyStepIndicatorRich,
  JourneySkillProgressBar,
  scrollToCanvasSection,
  scrollToFirstCanvasSection,
} from "@/components/case-studies/policy-copilot/policy-copilot-polish-ui";
import {
  resolveLivePreview,
} from "@/components/case-studies/policy-copilot/policy-copilot-live-preview";
import { skillForPhase } from "@/components/case-studies/policy-copilot/policy-copilot-skills";
import {
  BlastRadiusPreview,
  ConfirmUnderstandingGate,
  CopilotAnalyticsPanel,
  CopilotDashboardPanel,
  DriftDetectionPanel,
  EntityChip,
  EntityMappingProgress,
  IntentAnalyzingSkeleton,
  InviteStarterPanel,
  LegacyDocumentationPanel,
  LivePolicyPreview,
  LivingCard,
  PolicyMemoryPanel,
  RecommendationTile,
  RelatedRolesPanel,
  ResumeDraftSummaryCard,
  RiskInsightCard,
  SafetyCheckQueue,
  SafetyChecksSummary,
  ScenarioPreviewPanel,
  ThreadCanvasHandoffPulse,
  ThreadMessage,
  ThreadSuggestions,
  TechnicalRulesPanel,
  TopologyStrip,
  UnderstandingReflectionCard,
  ValidationBlockedBanner,
  WhatIfSuggestionCard,
} from "@/components/case-studies/policy-copilot/policy-copilot-living-ui";
import { CLAUDE, COPILOT_FOCUS, COPILOT_TARGET, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import {
  CopilotMark,
  PolicyCopilotFrame,
  PolicyCopilotSidebar,
  ThinkingDots,
  type CopilotNavId,
} from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import {
  resolveScenarioThreadSuggestions,
  type ThreadSuggestionDef,
} from "@/components/case-studies/policy-copilot/policy-copilot-scenario-suggestions";
import { trackPolicyCopilotDemo } from "@/lib/analytics";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

export type LivingPhase =
  | "invite"
  | "understand"
  | "clarify"
  | "sense"
  | "draft"
  | "check"
  | "refine"
  | "memory"
  | "capture"
  | "approve"
  | "ship"
  | "done";

type WorkspaceView = "dashboard" | "analytics" | "lifecycle";
type LivingFlowMode = "author" | "review" | "document";
type PolicyEntry = "portfolio" | "journey" | null;

interface ThreadItem {
  id: string;
  role: "copilot" | "user" | "insight";
  text: string;
  time?: string;
  insightKind?: "pattern" | "status" | "evidence";
  canvasLink?: string;
}

function buildSafetyChecks(preset: LivingScenarioPreset) {
  return [
    { id: "hipaa", label: preset.complianceCheck.label, detail: preset.complianceCheck.detail },
    { id: "blast", label: "Who is affected", detail: preset.blastRadius },
    { id: "risk", label: "Privilege paths", detail: preset.riskDetail },
    {
      id: "conflict",
      label: "Similar policies",
      detail:
        preset.id === "vendor-vpn"
          ? "Overlaps with Old-Vendor-VPN-Pool — MFA not enforced yet"
          : preset.id === "contractors"
            ? "Legacy exception may bypass deny rule"
            : "No conflicting allow rules",
    },
  ] as const;
}

function shouldWarnOnConflict(preset: LivingScenarioPreset): boolean {
  return preset.id === "vendor-vpn" || preset.id === "contractors";
}

const DEFAULT_PRESET = resolveLivingPreset(
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices",
);

const FLAT_RECENT_ITEMS = COPILOT_RECENT_POLICIES.flatMap((g) => g.items);

const INVITE_EXAMPLES = [
  "Allow doctors to securely access EHR from hospital-managed devices",
  "Protect the financial database",
  "Control access to patient records",
] as const;

function phaseDisplayLabel(phase: LivingPhase): string {
  const labels: Partial<Record<LivingPhase, string>> = {
    understand: "Understanding",
    clarify: "Clarify",
    sense: "Mapping",
    draft: "Draft",
    check: "Safety checks",
    refine: "Optimise",
    approve: "Approve",
    ship: "Deploying",
  };
  return labels[phase] ?? "Draft";
}

function blastRadiusGroupsFor(preset: LivingScenarioPreset) {
  const parts = preset.blastRadius.split("·").map((p) => p.trim());
  return [
    { label: "In scope", impact: preset.contextLine, tone: "allow" as const },
    {
      label: "Impact summary",
      impact: parts.join(" · ") || preset.blastRadius,
      tone: "warn" as const,
    },
    {
      label: "Risk posture",
      impact: preset.riskDetail,
      tone: "deny" as const,
    },
  ];
}

function parsePeopleFromBlastRadius(text: string) {
  const inScope = Number.parseInt(text.match(/(\d+)\s+people/)?.[1] ?? "0", 10);
  const blocked = Number.parseInt(text.match(/(\d+)\s+\w+\s+blocked/)?.[1] ?? "0", 10);
  const surprise = Number.parseInt(text.match(/(\d+)\s+surprise/)?.[1] ?? "0", 10);
  return { inScope, blocked, surprise };
}

function enforcementWatermarkMode(
  phase: LivingPhase,
  policyEntry: PolicyEntry,
): "draft" | "live" | "deploying" {
  if (phase === "ship") return "deploying";
  if (phase === "done" && policyEntry === "journey") return "live";
  return "draft";
}

function phaseConfidence(phase: LivingPhase): number {
  switch (phase) {
    case "invite":
      return 0;
    case "understand":
      return 14;
    case "clarify":
      return 24;
    case "sense":
      return 38;
    case "draft":
      return 62;
    case "check":
      return 78;
    case "refine":
      return 88;
    case "memory":
      return 86;
    case "capture":
      return 74;
    case "approve":
      return 94;
    case "ship":
      return 98;
    case "done":
      return 100;
    default:
      return 0;
  }
}

export function PolicyCopilotLiving({
  className,
  onStepChange,
  onReset,
  presentation,
}: {
  className?: string;
  onStepChange?: () => void;
  onReset?: () => void;
  presentation?: PolicyCopilotPresentation;
}) {
  const reduced = useReducedMotion();
  const isPresentation =
    presentation === "intent-summary" ||
    presentation === "business-intent" ||
    presentation === "living-workspace" ||
    presentation === "continuous-validation" ||
    presentation === "simulation-impact";
  const isBusinessIntentPresentation = presentation === "business-intent";
  const isIntentSummaryPresentation = presentation === "intent-summary";
  const presentationState = useMemo(() => {
    if (presentation === "intent-summary") return createIntentSummaryPresentationState();
    if (presentation === "business-intent") return createBusinessIntentPresentationState();
    if (presentation === "living-workspace") return createLivingWorkspacePresentationState();
    if (presentation === "continuous-validation") return createContinuousValidationPresentationState();
    if (presentation === "simulation-impact") return createSimulationImpactPresentationState();
    return null;
  }, [presentation]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const canvasEndRef = useRef<HTMLDivElement>(null);
  const canvasStickToBottomRef = useRef(true);
  const timersRef = useRef<number[]>([]);
  const skipScrollRef = useRef(true);
  const analyzingRef = useRef(false);

  const [phase, setPhase] = useState<LivingPhase>(presentationState?.phase ?? "invite");
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>(
    presentationState?.workspaceView ?? "lifecycle",
  );
  const [activeNav, setActiveNav] = useState<CopilotNavId>(presentationState?.activeNav ?? "lifecycle");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecentLabel, setActiveRecentLabel] = useState<string | undefined>(
    presentationState?.activeRecentLabel,
  );
  const [draft, setDraft] = useState(
    presentationState && "draft" in presentationState ? presentationState.draft : "",
  );
  const [intent, setIntent] = useState(presentationState?.intent ?? "");
  const scenarioPreset = useMemo(
    () => (intent.trim() ? resolveLivingPreset(intent) : DEFAULT_PRESET),
    [intent],
  );
  const intentClarification = useMemo(
    () => resolveIntentClarification(scenarioPreset),
    [scenarioPreset],
  );
  const [thread, setThread] = useState<ThreadItem[]>(presentationState?.thread ?? []);
  const [entityReveal, setEntityReveal] = useState(
    presentationState && "entityReveal" in presentationState ? presentationState.entityReveal : 0,
  );
  const [checkStatus, setCheckStatus] = useState<Record<string, "pending" | "running" | "pass" | "warn">>(
    presentationState && "initialCheckStatus" in presentationState
      ? presentationState.initialCheckStatus
      : {},
  );
  const [mfaApplied, setMfaApplied] = useState(false);
  const [siemAlertApplied, setSiemAlertApplied] = useState(false);
  const [driftResolved, setDriftResolved] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const [managedDevicesOnly, setManagedDevicesOnly] = useState(false);
  const [flowMode, setFlowMode] = useState<LivingFlowMode>(presentationState?.flowMode ?? "author");
  const [memoryCaptured, setMemoryCaptured] = useState<Record<string, boolean>>({});
  const [whatIfSelected, setWhatIfSelected] = useState<string | undefined>();
  const [relatedRoles, setRelatedRoles] = useState<Record<string, boolean>>({});
  const [riskDismissed, setRiskDismissed] = useState(
    presentationState && "riskDismissed" in presentationState ? presentationState.riskDismissed : false,
  );
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [scenarioPreviewOpen, setScenarioPreviewOpen] = useState(false);
  const [dashboardDrilldown, setDashboardDrilldown] = useState<DashboardStatId | null>(null);
  const [policyEntry, setPolicyEntry] = useState<PolicyEntry>(presentationState?.policyEntry ?? null);
  const [governPolicyRow, setGovernPolicyRow] = useState<ActivePolicyRow | null>(null);
  const [canvasHighlight, setCanvasHighlight] = useState<string | null>(null);
  const [checkLastRunSec, setCheckLastRunSec] = useState<number | undefined>(
    presentationState && "checkLastRunSec" in presentationState
      ? presentationState.checkLastRunSec
      : undefined,
  );
  const [simulateAcknowledged, setSimulateAcknowledged] = useState(
    presentationState && "simulateAcknowledged" in presentationState
      ? presentationState.simulateAcknowledged
      : false,
  );
  const [simulateRunning, setSimulateRunning] = useState(false);
  const [driftFromDashboard, setDriftFromDashboard] = useState(false);
  const [canvasPulse, setCanvasPulse] = useState(false);
  const [ruleOrder, setRuleOrder] = useState<number[]>([]);
  const [understandingConfirmed, setUnderstandingConfirmed] = useState(
    presentationState && "understandingConfirmed" in presentationState
      ? presentationState.understandingConfirmed
      : false,
  );
  const [whyAnnotation, setWhyAnnotation] = useState<{ section: CanvasSectionId; text: string } | null>(null);
  const [handoffPulse, setHandoffPulse] = useState(false);
  const [checkElapsed, setCheckElapsed] = useState(0);
  const [approvalReviewReady, setApprovalReviewReady] = useState(false);
  const [reflectionFieldOverrides, setReflectionFieldOverrides] = useState<Record<string, string>>({});
  const [resumeSummary, setResumeSummary] = useState<{
    label: string;
    items: ReturnType<typeof buildResumeDiffSummary>;
    savedAt: number;
  } | null>(null);
  const savedDraftCheckpoint = useMemo(() => loadDraftCheckpoint(), [workspaceView, phase]);

  const safetyChecks = useMemo(() => buildSafetyChecks(scenarioPreset), [scenarioPreset]);
  const entityMappings = scenarioPreset.entityMappings;
  const journeyContent = useMemo(() => resolveJourneyContent(scenarioPreset), [scenarioPreset]);
  useEffect(() => {
    setRuleOrder(journeyContent.rules.map((_, i) => i));
  }, [journeyContent.rules]);
  const agenticEvidence = useMemo(() => resolveAgenticEvidence(scenarioPreset), [scenarioPreset]);
  const inLifecycle = workspaceView === "lifecycle";
  const navigateToCanvas = useCallback((id: string) => {
    scrollToCanvasSection(id as (typeof CANVAS_SECTION_IDS)[keyof typeof CANVAS_SECTION_IDS], setCanvasHighlight);
  }, []);

  const agentStatusMessage = useMemo(() => {
    if (phase === "understand") return "Understanding your request — mapping who, what, and where";
    if (phase === "clarify") return scenarioPreset.insightLine;
    if (phase === "sense") return `Mapping ${scenarioPreset.entityMappings.map((m) => m.term).slice(0, 3).join(", ")}…`;
    if (phase === "draft") return "Draft ready — checking whether this breaks compliance or creates surprise blocks";
    if (phase === "check") return `Checking ${scenarioPreset.complianceCheck.label.toLowerCase()}, blast radius, and conflicts`;
    if (phase === "refine") return "Checks passed — review optional optimisations before deploy";
    if (phase === "approve") return "Approve when scope, compliance, and blast radius look right";
    if (phase === "ship") return "Shipping to production regions with rollback armed";
    return "";
  }, [phase, scenarioPreset]);

  const activeSkill = skillForPhase(phase, flowMode);
  const skillTokens = SKILL_TOKENS[activeSkill];
  const mappingDone = entityReveal >= entityMappings.length;
  const canvasDesaturated =
    flowMode === "author" &&
    inLifecycle &&
    (phase === "draft" || phase === "check" || phase === "refine");
  const memoryFieldsLeft = LEGACY_DOCUMENT_STORY.captureFields.filter((f) => !memoryCaptured[f.id]).length;
  const confidence = phaseConfidence(phase);
  const composerPlaceholder = isBusinessIntentPresentation
    ? BUSINESS_INTENT_PLACEHOLDER
    : DEFAULT_PLACEHOLDER;
  const canSend = draft.trim().length > 0 && phase === "invite" && inLifecycle;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  const pushThread = useCallback((item: Omit<ThreadItem, "id">) => {
    setThread((prev) => [...prev, { ...item, id: `t-${Date.now()}-${prev.length}` }]);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (isPresentation) return;
    if (!inLifecycle || flowMode !== "author") return;
    if (phase === "draft" || phase === "check" || phase === "refine") {
      saveDraftCheckpoint({
        prompt: intent,
        label: activeRecentLabel ?? scenarioPreset.contextLine.split("·")[0]?.trim() ?? "Draft policy",
        phase,
        entityReveal,
        checkStatus,
        mfaApplied,
        savedAt: Date.now(),
      });
    }
    if (phase === "done" || phase === "ship") {
      clearDraftCheckpoint();
    }
  }, [
    isPresentation,
    inLifecycle,
    flowMode,
    phase,
    intent,
    activeRecentLabel,
    scenarioPreset.contextLine,
    entityReveal,
    checkStatus,
    mfaApplied,
  ]);

  useEffect(() => {
    scrollIntoNearestScrollParent(threadEndRef.current, {
      behavior: reduced ? "auto" : "smooth",
      block: "end",
    });
  }, [thread, phase, reduced]);

  const isCanvasNearBottom = useCallback((threshold = 96) => {
    const el = canvasScrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
  }, []);

  const scrollCanvasToTop = useCallback(
    (behavior: ScrollBehavior = reduced ? "auto" : "smooth") => {
      requestAnimationFrame(() => {
        canvasScrollRef.current?.scrollTo({ top: 0, behavior });
      });
    },
    [reduced],
  );

  const scrollCanvasToEnd = useCallback(
    (options?: { behavior?: ScrollBehavior; force?: boolean }) => {
      const behavior = options?.behavior ?? (reduced ? "auto" : "smooth");
      const force = options?.force ?? false;
      if (!force && !canvasStickToBottomRef.current) return;

      requestAnimationFrame(() => {
        scrollIntoNearestScrollParent(canvasEndRef.current, {
          behavior,
          block: "end",
        });
      });
    },
    [reduced],
  );

  useEffect(() => {
    const el = canvasScrollRef.current;
    if (!el) return;

    const onScroll = () => {
      canvasStickToBottomRef.current = isCanvasNearBottom();
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [inLifecycle, isCanvasNearBottom]);

  useEffect(() => {
    canvasStickToBottomRef.current = false;
    scrollCanvasToTop("auto");
    const afterMount = window.setTimeout(() => scrollCanvasToTop(reduced ? "auto" : "smooth"), 220);
    const afterMotion = window.setTimeout(() => scrollCanvasToTop("auto"), 480);
    return () => {
      window.clearTimeout(afterMount);
      window.clearTimeout(afterMotion);
    };
  }, [phase, reduced, scrollCanvasToTop]);

  const canvasAppendsDown =
    phase === "understand" || phase === "clarify" || phase === "sense" || phase === "check";

  useEffect(() => {
    if (!canvasAppendsDown) return;
    canvasStickToBottomRef.current = true;
    scrollCanvasToEnd();
  }, [
    canvasAppendsDown,
    entityReveal,
    understandingConfirmed,
    checkStatus,
    reflectionFieldOverrides,
    whatIfSelected,
    scrollCanvasToEnd,
  ]);

  useEffect(() => {
    if (!canvasAppendsDown) return;
    const content = canvasEndRef.current?.parentElement;
    if (!content) return;

    const ro = new ResizeObserver(() => {
      scrollCanvasToEnd({ behavior: "auto" });
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [canvasAppendsDown, scrollCanvasToEnd]);

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    onStepChange?.();
  }, [phase, onStepChange]);

  useEffect(() => {
    if (phase !== "sense" || entityReveal === 0) return;
    setHandoffPulse(true);
    const t = window.setTimeout(() => setHandoffPulse(false), 500);
    return () => window.clearTimeout(t);
  }, [entityReveal, phase]);

  useEffect(() => {
    if (phase !== "check") {
      setCheckElapsed(0);
      return;
    }
    const running = safetyChecks.some((c) => checkStatus[c.id] === "running");
    if (!running) return;
    const iv = window.setInterval(() => setCheckElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phase, checkStatus, safetyChecks]);

  function resumeFromDraft(checkpoint: DraftResumeCheckpoint) {
    const preset = resolveLivingPreset(checkpoint.prompt);
    const clarification = resolveIntentClarification(preset);
    clearTimers();
    setFlowMode("author");
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    setIntent(checkpoint.prompt);
    setActiveRecentLabel(checkpoint.label);
    setEntityReveal(checkpoint.entityReveal);
    setCheckStatus(checkpoint.checkStatus);
    setMfaApplied(checkpoint.mfaApplied);
    setPhase(checkpoint.phase);
    setPolicyEntry("journey");
    setUnderstandingConfirmed(true);
    setResumeSummary({
      label: checkpoint.label,
      items: buildResumeDiffSummary(
        checkpoint,
        preset.entityMappings.length,
        buildSafetyChecks(preset).map((c) => c.id),
      ),
      savedAt: checkpoint.savedAt,
    });
    setThread(
      buildAuthoringThreadHistory(preset, clarification, checkpoint.prompt).slice(
        0,
        checkpoint.phase === "draft" ? 6 : checkpoint.phase === "check" ? 10 : 12,
      ),
    );
    trackPolicyCopilotDemo({ action: "prompt_select", prompt: checkpoint.prompt, scenario_id: `${preset.id}-resume` });
  }

  function confirmUnderstanding() {
    if (understandingConfirmed || phase !== "clarify") return;
    setUnderstandingConfirmed(true);
    pushThread({ role: "user", text: "Yes, that's right", time: "Now" });
    schedule(() => {
      pushThread({
        role: "copilot",
        text: "Thanks — I'll map your words to inventory objects next. Nothing deploys until you approve.",
        time: "Now",
      });
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
  }

  function handleReflectionFieldEdit(fieldId: string, label: string, value: string) {
    setReflectionFieldOverrides((prev) => ({ ...prev, [fieldId]: value }));
    setUnderstandingConfirmed(false);
    pushThread({ role: "user", text: `Change ${label.toLowerCase()} to: ${value}`, time: "Now" });
    schedule(() => {
      pushThread({
        role: "copilot",
        text: `Updated — ${label} now reads "${value}". Confirm the summary when you're ready and I'll map objects.`,
        time: "Now",
      });
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
    trackPolicyCopilotDemo({ action: "clarification_field_edit", scenario_id: scenarioPreset.id, clarification_id: fieldId });
  }

  function handleReflectionFieldWhy(fieldId: string, label: string, why: string) {
    pushThread({
      role: "insight",
      text: `${label}: ${why}`,
      insightKind: "evidence",
    });
    trackPolicyCopilotDemo({ action: "clarification_field_why", scenario_id: scenarioPreset.id, clarification_id: fieldId });
  }

  function whyAnnotationFor(section: CanvasSectionId) {
    return whyAnnotation?.section === section ? whyAnnotation.text : undefined;
  }

  function handleResumeDraft() {
    const checkpoint = loadDraftCheckpoint();
    if (!checkpoint) return;
    resumeFromDraft(checkpoint);
  }

  function resetFlowState() {
    setPhase("invite");
    setDraft("");
    setIntent("");
    setThread([]);
    setEntityReveal(0);
    setCheckStatus({});
    setMfaApplied(false);
    setSiemAlertApplied(false);
    setDriftResolved(false);
    setUsedSuggestions(new Set());
    setManagedDevicesOnly(false);
    setFlowMode("author");
    setMemoryCaptured({});
    setWhatIfSelected(undefined);
    setRelatedRoles({});
    setRiskDismissed(false);
    setLearnMoreOpen(false);
    setScenarioPreviewOpen(false);
    setDashboardDrilldown(null);
    setPolicyEntry(null);
    setGovernPolicyRow(null);
    setSimulateAcknowledged(false);
    setSimulateRunning(false);
    setDriftFromDashboard(false);
    setCanvasPulse(false);
    setUnderstandingConfirmed(false);
    setWhyAnnotation(null);
    setHandoffPulse(false);
    setCheckElapsed(0);
    setResumeSummary(null);
    setApprovalReviewReady(false);
    setReflectionFieldOverrides({});
    setAdminNote("");
    analyzingRef.current = false;
  }

  function handleReset() {
    clearTimers();
    resetFlowState();
    setActiveRecentLabel(undefined);
    setWorkspaceView("dashboard");
    setActiveNav("dashboard");
    onReset?.();
  }

  function handleStartNewPolicy() {
    clearTimers();
    clearDraftCheckpoint();
    resetFlowState();
    setActiveRecentLabel(undefined);
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    trackPolicyCopilotDemo({ action: "reset", scenario_id: "new" });
  }

  function handleNavChange(nav: CopilotNavId) {
    if (nav === "dashboard" && activeNav === "dashboard" && dashboardDrilldown) {
      setDashboardDrilldown(null);
      return;
    }
    setActiveNav(nav);
    setWorkspaceView(nav);
    if (nav !== "dashboard") setDashboardDrilldown(null);
  }

  function handleDashboardStat(statId: DashboardStatId) {
    setDashboardDrilldown(statId);
    trackPolicyCopilotDemo({ action: "dashboard_stat", scenario_id: statId });
  }

  function seedAuthorLifecycle(
    prompt: string,
    label: string,
    targetPhase: LivingPhase,
    threadLines: { user: string; copilot: string },
    options?: { warnCheckId?: string; entry?: PolicyEntry; fullHistory?: boolean; governClose?: ActivePolicyRow },
  ) {
    clearTimers();
    const preset = resolveLivingPreset(prompt);
    const clarification = resolveIntentClarification(preset);
    const checks = buildSafetyChecks(preset);
    setFlowMode("author");
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    setDashboardDrilldown(null);
    setIntent(prompt);
    setActiveRecentLabel(label);
    setDraft("");
    setEntityReveal(preset.entityMappings.length);
    setCheckStatus(
      Object.fromEntries(
        checks.map((c) => [c.id, options?.warnCheckId === c.id ? "warn" : "pass"] as const),
      ),
    );
    setMfaApplied(false);
    setSiemAlertApplied(false);
    setDriftResolved(false);
    setUsedSuggestions(new Set());
    setRiskDismissed(false);
    setApprovalReviewReady(false);
    setPhase(targetPhase);
    setPolicyEntry(options?.entry ?? "journey");
    setThread(
      options?.fullHistory
        ? buildAuthoringThreadHistory(
            preset,
            clarification,
            prompt,
            options.governClose
              ? {
                  policyName: options.governClose.name,
                  status: options.governClose.status,
                  regions: options.governClose.regions,
                }
              : undefined,
          )
        : [
            { id: "l-1", role: "user", text: threadLines.user, time: "Now" },
            { id: "l-2", role: "insight", text: preset.insightLine },
            { id: "l-3", role: "copilot", text: threadLines.copilot, time: "Now" },
          ],
    );
    trackPolicyCopilotDemo({ action: "prompt_select", prompt, scenario_id: preset.id });
  }

  function handleOpenActivePolicy(row: ActivePolicyRow) {
    setGovernPolicyRow(row);
    seedAuthorLifecycle(
      row.prompt,
      row.name,
      "done",
      {
        user: `Show govern record for ${row.name}`,
        copilot: `${row.name} is ${row.status.toLowerCase()} in ${row.regions}. Full audit trail is on the canvas — every stage traceable.`,
      },
      { entry: "portfolio", fullHistory: true, governClose: row },
    );
  }

  function beginEditPolicy() {
    if (phase !== "done" || policyEntry !== "portfolio") return;
    setPhase("draft");
    pushThread({
      role: "copilot",
      text: "Opening this policy for edits. Changes stay in draft until you run checks and approve again.",
      time: "Now",
    });
    trackPolicyCopilotDemo({ action: "prompt_select", scenario_id: scenarioPreset.id, prompt: intent });
  }

  function handleBackToDashboard() {
    clearTimers();
    resetFlowState();
    setWorkspaceView("dashboard");
    setActiveNav("dashboard");
  }

  function handleOpenPendingReview(row: PendingReviewRow) {
    seedAuthorLifecycle(row.prompt, row.name, "approve", {
      user: `Approve ${row.name} for deployment`,
      copilot: `${row.checksSummary}. Review the deploy summary — you're at the deploy gate.`,
    });
  }

  function handleOpenDriftFlag(row: DriftFlagRow) {
    setDashboardDrilldown(null);
    setDriftFromDashboard(true);
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    setActiveRecentLabel(row.rule);
    beginReviewFlow(
      {
        label: row.rule,
        prompt: row.prompt,
        flowMode: "review",
      },
      {
        fromDashboard: true,
        driftRow: row,
      },
    );
  }

  function handleOpenCheckIssue(row: CheckIssueRow) {
    const preset = resolveLivingPreset(row.prompt);
    const warnId = preset.id === "vendor-vpn" ? "conflict" : "hipaa";
    seedAuthorLifecycle(row.prompt, row.policy, "refine", {
      user: `Fix ${row.check} on ${row.policy}`,
      copilot: `${row.detail}. Apply the suggested fix to clear this before deploy.`,
    }, { warnCheckId: warnId });
  }

  function handleTryScenario(scenario: "ehr" | "vendor" | "drift") {
    trackPolicyCopilotDemo({ action: "prompt_select", scenario_id: scenario });
    if (scenario === "drift") {
      handleOpenDriftFlag(DRIFT_FLAGS[0]!);
      return;
    }
    clearTimers();
    clearDraftCheckpoint();
    resetFlowState();
    setActiveRecentLabel(undefined);
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    const prompt =
      scenario === "ehr"
        ? "Allow doctors to securely access Electronic Health Records from hospital-managed devices"
        : "Allow external vendor VPN access to staging only";
    beginSense(prompt);
  }

  function fixValidationWarning() {
    setMfaApplied(true);
    setCheckStatus((s) => {
      const next = { ...s };
      for (const check of safetyChecks) {
        if (next[check.id] === "warn") next[check.id] = "pass";
      }
      return next;
    });
    pushThread({
      role: "copilot",
      text: "Fix applied — warning cleared. You can continue toward approval.",
      time: "Now",
    });
    if (phase === "check") {
      schedule(() => setPhase("refine"), livingDelay(LIVING_DELAY_MS.threadReply, reduced));
    }
  }

  function handleOpenPolicy(item: CopilotRecentItem) {
    clearTimers();
    resetFlowState();
    setActiveRecentLabel(item.label);
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    const mode = item.flowMode ?? "author";
    if (mode === "review") beginReviewFlow(item);
    else if (mode === "document") beginDocumentFlow(item);
    else {
      const checkpoint = draftCheckpointForPrompt(item.prompt);
      if (checkpoint) resumeFromDraft(checkpoint);
      else beginSense(item.prompt);
    }
  }

  function beginReviewFlow(
    item: CopilotRecentItem,
    opts?: { fromDashboard?: boolean; driftRow?: DriftFlagRow },
  ) {
    setFlowMode("review");
    setIntent(item.prompt);
    setPhase("memory");
    setDriftResolved(false);
    setSimulateAcknowledged(false);
    trackPolicyCopilotDemo({
      action: "prompt_select",
      prompt: item.prompt,
      scenario_id: "review-drift",
    });
    const userLine = opts?.fromDashboard
      ? `Review drift on ${opts.driftRow?.rule ?? REVIEW_DRIFT_STORY.rule}`
      : REVIEW_DRIFT_STORY.request;
    const intro = opts?.fromDashboard ? DASHBOARD_STAT_INTROS.drift.copilot : null;
    setThread(
      opts?.fromDashboard
        ? [
            { id: `t-${Date.now()}`, role: "user", text: userLine, time: "Now" },
            { id: `t-${Date.now() + 1}`, role: "copilot", text: intro ?? "", time: "Now" },
            {
              id: `t-${Date.now() + 2}`,
              role: "insight",
              text: "Memory surfaced — full context for who approved this and why it exists.",
              insightKind: "evidence",
            },
          ]
        : [],
    );
    if (!opts?.fromDashboard) {
      pushThread({ role: "user", text: REVIEW_DRIFT_STORY.request, time: "Now" });
      pushThread({
        role: "insight",
        text: "Memory surfaced — full context for who approved this and why it exists.",
        insightKind: "evidence",
      });
    }
    schedule(() => {
      pushThread({
        role: "copilot",
        text: `I compared ${REVIEW_DRIFT_STORY.rule} to its golden intent. Drift detected — compliance impact is on the canvas.`,
        time: "Now",
        canvasLink: CANVAS_SECTION_IDS.compliance,
      });
      if (opts?.fromDashboard) {
        navigateToCanvas(CANVAS_SECTION_IDS.compliance);
      }
    }, livingDelay(LIVING_DELAY_MS.reviewBeat, reduced));
  }

  function beginDocumentFlow(item: CopilotRecentItem) {
    setFlowMode("document");
    setIntent(item.prompt);
    setPhase("capture");
    setMemoryCaptured({});
    trackPolicyCopilotDemo({
      action: "prompt_select",
      prompt: item.prompt,
      scenario_id: "document-legacy",
    });
    pushThread({ role: "user", text: LEGACY_DOCUMENT_STORY.request, time: "Now" });
    pushThread({
      role: "insight",
      text: "No institutional memory on file — capture context before changing or deleting this rule.",
    });
    schedule(() => {
      pushThread({
        role: "copilot",
        text: `Found ${LEGACY_DOCUMENT_STORY.rule}. Use the suggestions below to record justification, owner, and review cadence.`,
        time: "Now",
      });
    }, livingDelay(LIVING_DELAY_MS.reviewBeat, reduced));
  }

  function handleSuggestion(suggestion: ThreadSuggestionDef) {
    if (usedSuggestions.has(suggestion.id)) return;
    setUsedSuggestions((prev) => new Set(prev).add(suggestion.id));

    pushThread({ role: "user", text: suggestion.text, time: "Now" });

    schedule(() => {
      if (suggestion.insight) {
        pushThread({ role: "insight", text: suggestion.insight });
      }
      pushThread({ role: "copilot", text: suggestion.reply, time: "Now" });
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));

    if (suggestion.action === "runChecks" && phase === "draft") {
      schedule(() => runSafetyChecks(), livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.action === "approve" && phase === "refine") {
      schedule(() => setPhase("approve"), livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.action === "retire" && phase === "memory") {
      schedule(() => {
        setDriftResolved(true);
        setPhase("approve");
      }, livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.action === "capture") {
      const fieldId = suggestion.id;
      schedule(
        () => setMemoryCaptured((prev) => ({ ...prev, [fieldId]: true })),
        livingDelay(LIVING_DELAY_MS.captureField, reduced),
      );
    } else if (suggestion.action === "proceed" && phase === "clarify") {
      setUnderstandingConfirmed(true);
      schedule(() => proceedToMapping(), livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.action === "applyMfa") {
      schedule(() => setMfaApplied(true), livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.action === "build" && phase === "approve") {
      schedule(() => handlePrimaryAction(), livingDelay(LIVING_DELAY_MS.suggestionAction, reduced));
    } else if (suggestion.id === "managed-devices") {
      setManagedDevicesOnly(true);
    } else if (phase === "clarify") {
      const whatIf = intentClarification.whatIfOptions.find((o) => o.id === suggestion.id);
      const chip = intentClarification.clarifyChips.find((o) => o.id === suggestion.id);
      if (whatIf) setWhatIfSelected(whatIf.id);
      if (whatIf || chip) {
        /* thread reply handled above */
      }
    }
  }

  function handleWhatIfSelect(id: string) {
    const option = intentClarification.whatIfOptions.find((o) => o.id === id);
    if (!option || usedSuggestions.has(id)) return;
    setWhatIfSelected(id);
    setUsedSuggestions((prev) => new Set(prev).add(id));
    pushThread({ role: "user", text: option.label, time: "Now" });
    schedule(() => {
      if (option.insight) pushThread({ role: "insight", text: option.insight });
      pushThread({ role: "copilot", text: option.reply, time: "Now" });
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
  }

  function handleRiskAction(id: string) {
    const action = intentClarification.riskInsight.actions.find((a) => a.id === id);
    if (!action) return;
    pushThread({ role: "user", text: action.label, time: "Now" });
    schedule(() => {
      pushThread({ role: "copilot", text: action.reply, time: "Now" });
      setRiskDismissed(true);
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
  }

  function proceedToMapping() {
    if (phase !== "clarify" || !understandingConfirmed) return;
    const preset = scenarioPreset;
    setPhase("sense");
    pushThread({
      role: "copilot",
      text: "Understanding confirmed. Mapping people, applications, and devices — preparing a draft for your review, not deployment.",
      time: "Now",
    });
    preset.entityMappings.forEach((_, i) => {
      schedule(
        () => setEntityReveal(i + 1),
        livingDelay(LIVING_DELAY_MS.entityMapStart, reduced) +
          i * livingDelay(LIVING_DELAY_MS.entityMapStep, reduced),
      );
    });
    schedule(() => {
      pushThread({
        role: "insight",
        text: "Application objects resolved from inventory — no new object needed.",
      });
      pushThread({
        role: "copilot",
        text: "Draft is ready for your review — still not deployed. Run safety checks when the direction looks right.",
        time: "Now",
      });
      setPhase("draft");
    }, entityMappingDuration(preset.entityMappings.length, reduced));
  }

  function getThreadSuggestions(): ThreadSuggestionDef[] {
    const mappingDone = entityReveal >= entityMappings.length;

    if (phase === "memory") {
      const driftRule = REVIEW_DRIFT_STORY.rule;
      return [
        {
          id: "retire",
          text: "Retire rule",
          primary: true,
          reply: `${driftRule} marked for removal — rollback snapshot ready.`,
          action: "retire" as const,
        },
        {
          id: "keep-exception",
          text: "Keep exception",
          reply: "Exception renewed for 90 days with tighter time window restored.",
          insight: "Golden intent reapplied — business hours only.",
        },
        {
          id: "view-sim",
          text: "View simulation",
          reply: REVIEW_DRIFT_STORY.memory.simulation,
        },
      ].filter((s) => !usedSuggestions.has(s.id));
    }

    if (phase === "capture") {
      return LEGACY_DOCUMENT_STORY.captureFields
        .filter((f) => !memoryCaptured[f.id])
        .map((field, i) => ({
          id: field.id,
          text: `Add ${field.label.toLowerCase()}`,
          primary: i === 0,
          reply: `Recorded: ${field.example}`,
          action: "capture" as const,
        }))
        .filter((s) => !usedSuggestions.has(s.id));
    }

    return resolveScenarioThreadSuggestions({
      preset: scenarioPreset,
      clarification: intentClarification,
      phase,
      usedIds: usedSuggestions,
      mappingDone,
    });
  }

  const threadSuggestions = getThreadSuggestions();
  const footerThreadSuggestions = threadSuggestions
    .filter((s) => !(phase === "draft" && s.action === "runChecks"))
    .slice(0, phase === "draft" ? 2 : 3);

  function beginSense(text: string) {
    if (analyzingRef.current) return;
    clearDraftCheckpoint();
    const preset = resolveLivingPreset(text);
    const clarification = resolveIntentClarification(preset);
    analyzingRef.current = true;
    clearTimers();
    setFlowMode("author");
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    trackPolicyCopilotDemo({ action: "prompt_select", prompt: text, scenario_id: preset.id });
    setEntityReveal(0);
    setCheckStatus({});
    setMfaApplied(false);
    setSiemAlertApplied(false);
    setDriftResolved(false);
    setUsedSuggestions(new Set());
    setUnderstandingConfirmed(false);
    setResumeSummary(null);
    setApprovalReviewReady(false);
    setSimulateAcknowledged(false);
    setReflectionFieldOverrides({});
    setRiskDismissed(false);
    setWhyAnnotation(null);
    setIntent(text);
    setDraft("");
    setPolicyEntry("journey");
    setPhase("understand");
    setThread([{ id: `t-${Date.now()}`, role: "user", text, time: "Now" }]);

    const revealDelay = livingDelay(LIVING_DELAY_MS.understandToClarify, reduced);

    schedule(() => {
      setPhase("clarify");
      analyzingRef.current = false;
      pushThread({
        role: "copilot",
        text: `${clarification.understandingReflection.lead} ${clarification.understandingReflection.confirmPrompt}`,
        time: "Now",
      });
    }, revealDelay);
  }

  function runSafetyChecks() {
    setPhase("check");
    setCheckElapsed(0);
    const expectConflictWarn = shouldWarnOnConflict(scenarioPreset) && !mfaApplied;
    pushThread({
      role: "copilot",
      text: `Checking whether this rule breaks ${scenarioPreset.complianceCheck.label.toLowerCase()} or creates surprise blocks — each result should reduce uncertainty before you approve.`,
      time: "Now",
    });
    safetyChecks.forEach((check, i) => {
      const step = livingDelay(LIVING_DELAY_MS.checkStep, reduced);
      schedule(() => {
        setCheckStatus((s) => ({ ...s, [check.id]: "running" }));
      }, i * step);
      schedule(
        () => {
          const result =
            check.id === "conflict" && expectConflictWarn ? "warn" : "pass";
          setCheckStatus((s) => ({ ...s, [check.id]: result }));
        },
        i * step + livingDelay(LIVING_DELAY_MS.checkResolve, reduced),
      );
    });
    schedule(() => {
      setCheckLastRunSec(reduced ? 1 : 18);
      setCanvasPulse(true);
      window.setTimeout(() => setCanvasPulse(false), livingDelay(LIVING_DELAY_MS.canvasPulse, reduced));
      if (expectConflictWarn) {
        pushThread({
          role: "copilot",
          text: "Validation blocked — one check flagged a conflict. Apply vendor MFA on the canvas before you can proceed to approval.",
          time: "Now",
        });
        return;
      }
      pushThread({
        role: "copilot",
        text: "Compliance check completed successfully. Scope and compliance summaries are on the canvas — two optional optimisations below.",
        time: "Now",
      });
      setPhase("refine");
      if (!reduced) {
        window.setTimeout(() => {
          const approveCta = document.getElementById("approve-cta");
          scrollIntoNearestScrollParent(approveCta, { behavior: "smooth", block: "center" });
        }, livingDelay(LIVING_DELAY_MS.scrollToApprove, reduced));
      }
    }, safetyChecksDuration(safetyChecks.length, reduced));
  }

  function handleSubmit() {
    const text = draft.trim();
    if (!text || phase !== "invite" || analyzingRef.current) return;
    setWorkspaceView("lifecycle");
    setActiveNav("lifecycle");
    beginSense(text);
  }

  function submitAdminNote() {
    const text = adminNote.trim();
    if (!text) return;
    pushThread({ role: "user", text, time: "Now" });
    schedule(() => {
      pushThread({
        role: "copilot",
        text: "Noted — I'll factor that into the draft and audit record.",
        time: "Now",
      });
    }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
    setAdminNote("");
  }

  function handlePrimaryAction() {
    if (phase === "clarify") proceedToMapping();
    else if (phase === "draft") runSafetyChecks();
    else if (phase === "refine") {
      if (hasCheckWarnings) return;
      setApprovalReviewReady(false);
      setSimulateAcknowledged(false);
      setPhase("approve");
    } else if (phase === "memory") {
      setDriftResolved(true);
      setPhase("approve");
    } else if (phase === "capture" && memoryFieldsLeft === 0) {
      setPhase("done");
      pushThread({
        role: "copilot",
        text: "Institutional memory saved — auditors and future engineers can trust this rule.",
        time: "Now",
      });
    } else if (phase === "approve") {
      if (!simulateAcknowledged && flowMode === "author") {
        setSimulateAcknowledged(true);
        return;
      }
      if (!approvalReviewReady && flowMode === "author") {
        setApprovalReviewReady(true);
        pushThread({
          role: "copilot",
          text: "Final approval summary is on the canvas — confirm deploy when you're ready.",
          time: "Now",
        });
        return;
      }
      setPhase("ship");
      const shipMsg =
        flowMode === "review"
          ? `Retiring ${REVIEW_DRIFT_STORY.rule} across three regions…`
          : "Building secure policy across three regions…";
      pushThread({ role: "copilot", text: shipMsg, time: "Now" });
      schedule(() => {
        setPhase("done");
        setPolicyEntry("journey");
        const doneMsg =
          flowMode === "review"
            ? "Rule retired. Memory updated — drift resolved and audit trail complete."
            : flowMode === "document"
              ? "Policy is live. Full record saved — every step traceable."
              : "Policy is live. Full record saved — every step traceable.";
        pushThread({ role: "copilot", text: doneMsg, time: "Now" });
      }, livingDelay(LIVING_DELAY_MS.shipComplete, reduced));
    } else if (phase === "done" && policyEntry === "journey") {
      handleStartNewPolicy();
    }
  }

  const isGovernView = inLifecycle && phase === "done" && policyEntry === "portfolio";
  const isJourneyComplete = inLifecycle && phase === "done" && policyEntry === "journey";
  const hasCheckWarnings = safetyChecks.some((c) => checkStatus[c.id] === "warn");
  const allChecksPassed = safetyChecks.every((c) => checkStatus[c.id] === "pass");

  const journeyStep = useMemo(
    () =>
      resolveJourneyStep(phase, {
        understandingConfirmed,
        simulateAcknowledged,
        approvalReviewReady,
      }),
    [phase, understandingConfirmed, simulateAcknowledged, approvalReviewReady],
  );

  const primaryLabel =
    !inLifecycle || isGovernView
      ? null
      : phase === "clarify"
        ? understandingConfirmed
          ? "Confirm & map"
          : null
      : phase === "draft"
      ? "Run safety checks"
      : phase === "refine"
        ? hasCheckWarnings
          ? null
          : "Continue to impact review"
        : phase === "memory"
          ? "Approve retirement"
          : phase === "capture"
            ? memoryFieldsLeft === 0
              ? "Save to memory"
              : null
        : phase === "approve"
          ? flowMode === "review"
            ? "Retire rule"
            : !simulateAcknowledged
              ? "Review blast radius"
              : !approvalReviewReady
                ? "Open approval summary"
                : null
          : phase === "done" && isJourneyComplete
            ? "Start new policy"
            : null;

  const navigateToWhy = useCallback(() => {
    scrollToFirstCanvasSection(
      resolveWhyCanvasSections(phase, { flowMode, allChecksPassed, isGovernView }),
      setCanvasHighlight,
      (id) => {
        if (!id) {
          setWhyAnnotation(null);
          return;
        }
        setWhyAnnotation({
          section: id,
          text: resolveWhyAnnotation(phase, id, { flowMode, allChecksPassed }),
        });
      },
    );
  }, [phase, flowMode, allChecksPassed, isGovernView]);

  const livePreview = useMemo(
    () =>
      flowMode === "author" && workspaceView === "lifecycle"
        ? resolveLivePreview(
            phase as "invite" | "clarify" | "sense" | "draft" | "check" | "refine" | "approve" | "ship" | "done",
            scenarioPreset,
            entityReveal,
            allChecksPassed,
          )
        : null,
    [flowMode, workspaceView, phase, scenarioPreset, entityReveal, allChecksPassed],
  );
  const governLivePreview = useMemo(
    () =>
      isGovernView
        ? resolveLivePreview("done", scenarioPreset, scenarioPreset.entityMappings.length, true)
        : null,
    [isGovernView, scenarioPreset],
  );

  const showCanvas = phase !== "invite";
  const showThreadPanel = inLifecycle;
  const isInviteFocus = inLifecycle && phase === "invite";
  const isAnalyzingFocus = inLifecycle && phase === "understand";
  const showJourneyChrome = inLifecycle && !isInviteFocus;
  const showLifecycleCanvas = inLifecycle && !isGovernView;
  const showAuthorPanel =
    flowMode === "author" &&
    showAuthorPanelCanvas(phase, entityReveal, entityMappings.length);
  const showLivePreview = flowMode === "author" && showMappingCanvas(phase) && livePreview != null;
  const showTopology =
    flowMode === "author" &&
    scenarioPreset.id === "ehr" &&
    showMappingCanvas(phase);
  const enforcementMode = enforcementWatermarkMode(phase, policyEntry);
  const showProves = flowMode === "author" && phase === "check" && allChecksPassed;
  const showSummarize =
    flowMode === "author" && showComplianceSummaryCanvas(phase, allChecksPassed);
  const showIntentBanner = Boolean(intent) && inLifecycle && phase === "clarify";
  const showChecks = showValidationCanvas(phase);
  const showRecs = showOptimiseCanvas(phase);
  const canvasFillsWidth =
    phase === "refine" ||
    phase === "check" ||
    phase === "approve" ||
    isIntentSummaryPresentation ||
    // All showcase embeds (Cisco case study + JB's Field Notes) — fill the wide frame, no max-w-2xl gutter.
    isPresentation;
  const showRefineBlastRadius =
    phase === "refine" && flowMode === "author" && !approvalReviewReady;
  const collapseSafetyChecks = false;
  const driftRec = scenarioPreset.driftRec;
  const pendingRecActions = [
    !mfaApplied
      ? { id: "mfa", label: scenarioPreset.mfaTitle.replace(/^Require /i, "Apply "), onClick: () => setMfaApplied(true) }
      : null,
    driftRec && !driftResolved
      ? {
          id: "drift",
          label: `Remove ${driftRec.rule}`,
          onClick: () => setDriftResolved(true),
        }
      : null,
  ].filter(Boolean) as { id: string; label: string; onClick: () => void }[];
  const focusOnActions = phase === "refine" || phase === "approve";

  function applyEvidenceRec(id: string) {
    if (id === "mfa") setMfaApplied(true);
    else if (id === "alert") setSiemAlertApplied(true);
  }

  function isEvidenceRecApplied(id: string) {
    if (id === "mfa") return mfaApplied;
    if (id === "alert") return siemAlertApplied;
    return false;
  }

  const recommendationsBlock = showRecs ? (
    <LivingCard
      title="Optimise"
      subtitle="Evidence-based suggestions — optional"
      delay={0.14}
      accent={phase === "refine" ? "insight" : "default"}
      badge={<EnforcementWatermark mode={enforcementMode} />}
    >
      <div className="space-y-2">
        {journeyContent.evidenceRecs.map((rec, i) => (
          <EvidenceRecommendationCard
            key={rec.id}
            rec={rec}
            applied={isEvidenceRecApplied(rec.id)}
            onApply={() => applyEvidenceRec(rec.id)}
            delay={i * 0.04}
          />
        ))}
        {driftRec ? (
          <RecommendationTile
            title={`Review unused rule — ${driftRec.rule}`}
            why={driftRec.flag}
            tradeoff="Removing reduces policy sprawl."
            applied={driftResolved}
            onApply={() => setDriftResolved(true)}
          />
        ) : null}
      </div>
    </LivingCard>
  ) : null;

  const safetyChecksBlock = showChecks ? (
    collapseSafetyChecks ? (
      <LivingCard title="Safety checks" subtitle="All clear" delay={0.12} accent="success">
        <SafetyChecksSummary count={safetyChecks.length} lastRunSec={checkLastRunSec} />
      </LivingCard>
    ) : (
      <SafetyCheckQueue
        checks={safetyChecks}
        checkStatus={checkStatus}
        lastRunSec={checkElapsed || checkLastRunSec}
      />
    )
  ) : null;

  const livingUi = (
    <PolicyCopilotFrame className={cn("h-full", className)}>
      <div className={cn(isPresentation && "pointer-events-none")}>
      <PolicyCopilotSidebar
        variant={phase === "invite" && inLifecycle ? "home" : "flow"}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeRecentLabel={activeRecentLabel}
        onBack={isPresentation ? undefined : inLifecycle && phase !== "invite" ? handleReset : undefined}
        onStartNewPolicy={handleStartNewPolicy}
        onRecentSelect={handleOpenPolicy}
      />
      </div>

      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">
        {showJourneyChrome ? (
        <header
          className={cn(
            "flex shrink-0 flex-col gap-2.5 border-b px-4 py-2.5 md:px-5",
            isPresentation && "pointer-events-none",
          )}
          style={{ borderColor: CLAUDE.hairline }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <JourneyStepIndicatorRich
              activeSkill={activeSkill}
              showProgress={false}
              caseStudyStep={journeyStepLabel(journeyStep)}
            />
            <ConfidenceRing
              phase={phase}
              value={confidence}
              checksPassed={allChecksPassed}
              mappingDone={mappingDone}
            />
          </div>
          <JourneySkillProgressBar activeSkill={activeSkill} />
        </header>
        ) : null}


        {inLifecycle && agentStatusMessage && phase !== "invite" && phase !== "done" ? (
          <div className={cn(isPresentation && "pointer-events-none")}>
          <AgentStatusBar
            message={agentStatusMessage}
            phase={phase}
            onWhy={isPresentation ? undefined : navigateToWhy}
          />
          </div>
        ) : null}

        {isInviteFocus ? (
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden",
              isPresentation && "pointer-events-none",
            )}
          >
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
              <InviteStarterPanel
                onSelect={(prompt) => {
                  if (analyzingRef.current) return;
                  beginSense(prompt);
                }}
              />
            </div>
            <footer
              className="shrink-0 border-t"
              style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
            >
              <div className="flex items-end gap-3 px-4 py-3 md:px-5">
                <div
                  className={cn(
                    "relative min-w-0 flex-1 rounded-2xl transition-shadow",
                  )}
                  style={{
                    boxShadow: composerFocused
                      ? `0 0 0 1px ${skillTokens.color}88, 0 12px 40px rgb(0 0 0 / 0.2)`
                      : undefined,
                    backgroundColor: CLAUDE.surfaceRaised,
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onFocus={() => setComposerFocused(true)}
                    onBlur={() => setComposerFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    rows={isBusinessIntentPresentation ? 3 : 2}
                    placeholder={composerPlaceholder}
                    className={cn(
                      COPILOT_FOCUS,
                      "w-full resize-none bg-transparent px-4 py-3 pr-14 text-[13px] leading-relaxed outline-none [&::placeholder]:text-[#a8a49c]",
                      isBusinessIntentPresentation ? "min-h-[4.5rem]" : "min-h-[3.25rem]",
                    )}
                    style={{ color: CLAUDE.text }}
                    aria-label="Describe your policy intent"
                  />
                  {canSend ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className={cn(
                        COPILOT_FOCUS,
                        COPILOT_TARGET.iconSm,
                        "absolute bottom-2 right-2 rounded-full",
                      )}
                      style={{ backgroundColor: skillTokens.color }}
                      aria-label="Send"
                    >
                      <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
            </footer>
          </div>
        ) : (
        <>
        <div className={cn(
          "relative grid min-h-0 flex-1",
          isGovernView
            ? "grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr]"
            : showThreadPanel
              ? isIntentSummaryPresentation
                ? "grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr]"
                : "grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr]"
              : "grid-cols-1",
        )}>
          <ThreadCanvasHandoffPulse active={handoffPulse} />
          {/* Conversation thread — lifecycle and dashboard drilldowns only */}
          {showThreadPanel ? (
          <aside
            className={cn(
              "flex min-h-0 flex-col overflow-hidden border-b lg:border-b-0 lg:border-r",
              isPresentation && "pointer-events-none",
            )}
            style={{
              borderColor: driftFromDashboard && flowMode === "review" ? CLAUDE.warning : CLAUDE.hairline,
              boxShadow:
                driftFromDashboard && flowMode === "review"
                  ? `inset 3px 0 0 0 ${CLAUDE.warning}88`
                  : undefined,
            }}
          >
            <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3 md:p-4">
              {!inLifecycle && phase === "invite" && !dashboardDrilldown && thread.length === 0 ? (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <CopilotMark size={36} glow />
                  <p
                    className="mt-3 text-[14px] font-normal tracking-tight"
                    style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
                  >
                    Policy Copilot
                  </p>
                  <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                    Pick a recent policy from the sidebar, or start new to begin authoring.
                  </p>
                </motion.div>
              ) : thread.length > 0 ? (
                thread.map((msg, i) => (
                  <ThreadMessage
                    key={msg.id}
                    role={msg.role}
                    time={msg.time}
                    delay={i * 0.02}
                    insightKind={msg.insightKind}
                    canvasLink={msg.canvasLink}
                    onCanvasNavigate={navigateToCanvas}
                  >
                    {msg.text}
                  </ThreadMessage>
                ))
              ) : null}
              {inLifecycle && phase === "understand" ? (
                <ThreadMessage role="copilot" delay={0.06}>
                  <span className="inline-flex items-center gap-2" style={{ color: CLAUDE.textSecondary }}>
                    Understanding your request
                    <ThinkingDots />
                  </span>
                </ThreadMessage>
              ) : null}
              {inLifecycle && phase === "sense" && entityReveal < entityMappings.length ? (
                <ThreadMessage role="copilot">
                  {reduced ? (
                    <EntityMappingProgress mapped={entityReveal} total={entityMappings.length} />
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Mapping
                      <ThinkingDots />
                    </span>
                  )}
                </ThreadMessage>
              ) : null}
              <div ref={threadEndRef} />
            </div>
          </aside>
          ) : null}

          {/* Living canvas */}
          <main className="relative flex min-h-0 flex-1 flex-col">
            <div
              ref={canvasScrollRef}
              className={cn(
                "no-scrollbar min-h-0 flex-1 overflow-y-auto p-4 md:p-5 transition-[filter,opacity] duration-500",
                isPresentation && "pointer-events-auto",
                (workspaceView === "dashboard" || workspaceView === "analytics") &&
                  "flex items-center justify-center",
                canvasDesaturated && "opacity-[0.88] saturate-[0.72]",
                canvasPulse && !reduced && "ring-2 ring-inset",
              )}
              style={
                canvasPulse && !reduced
                  ? { boxShadow: `inset 0 0 0 2px ${CLAUDE.validated}55` }
                  : undefined
              }
            >
              <div
                className={cn(
                  "flex w-full flex-col gap-4",
                  canvasFillsWidth ? "max-w-none" : "max-w-2xl",
                  isPresentation && "pointer-events-none",
                )}
              >
              {workspaceView === "dashboard" ? (
                dashboardDrilldown ? (
                  <DashboardDrilldownPanel
                    statId={dashboardDrilldown}
                    onOpenActive={handleOpenActivePolicy}
                    onOpenPending={handleOpenPendingReview}
                    onOpenDrift={handleOpenDriftFlag}
                    onOpenCheckIssue={handleOpenCheckIssue}
                  />
                ) : (
                  <CopilotDashboardPanel
                    recentItems={FLAT_RECENT_ITEMS}
                    onOpenPolicy={handleOpenPolicy}
                    onStartNew={handleStartNewPolicy}
                    onTryScenario={isPresentation ? undefined : handleTryScenario}
                    onStatSelect={handleDashboardStat}
                    resumeDraft={
                      savedDraftCheckpoint
                        ? {
                            label: savedDraftCheckpoint.label,
                            phase: phaseDisplayLabel(savedDraftCheckpoint.phase),
                          }
                        : null
                    }
                    onResumeDraft={handleResumeDraft}
                  />
                )
              ) : workspaceView === "analytics" ? (
                <CopilotAnalyticsPanel />
              ) : (
                <>
              {resumeSummary ? (
                <ResumeDraftSummaryCard
                  label={resumeSummary.label}
                  items={resumeSummary.items}
                  savedAt={resumeSummary.savedAt}
                  onDismiss={() => setResumeSummary(null)}
                />
              ) : null}
              {phase === "memory" ? (
                <>
                  <IntentBanner intent={REVIEW_DRIFT_STORY.request} />
                  <PolicyMemoryPanel rule={REVIEW_DRIFT_STORY.rule} memory={REVIEW_DRIFT_STORY.memory} />
                  <CanvasSectionAnchor
                    id={CANVAS_SECTION_IDS.compliance}
                    highlight={canvasHighlight === CANVAS_SECTION_IDS.compliance}
                    activeSkill={activeSkill}
                  >
                    <DriftDetectionPanel
                      rule={REVIEW_DRIFT_STORY.rule}
                      goldenIntent={REVIEW_DRIFT_STORY.goldenIntent}
                      currentState={REVIEW_DRIFT_STORY.currentState}
                      detail={REVIEW_DRIFT_STORY.driftDetail}
                    />
                  </CanvasSectionAnchor>
                  <LivingCard title="Recommendation" subtitle="Based on memory and drift analysis" delay={0.12}>
                    <RecommendationTile
                      title={`Retire ${REVIEW_DRIFT_STORY.rule}`}
                      why={REVIEW_DRIFT_STORY.driftDetail}
                      tradeoff="Marketing can request a new time-boxed exception if needed."
                      applied={driftResolved}
                      insightKind="pattern"
                      onApply={() => {
                        setDriftResolved(true);
                        setPhase("approve");
                      }}
                    />
                  </LivingCard>
                </>
              ) : null}

              {phase === "capture" ? (
                <>
                  <IntentBanner intent={LEGACY_DOCUMENT_STORY.request} />
                  <CanvasSectionAnchor
                    id={CANVAS_SECTION_IDS.govern}
                    highlight={canvasHighlight === CANVAS_SECTION_IDS.govern}
                    activeSkill={activeSkill}
                  >
                    <LegacyDocumentationPanel
                      rule={LEGACY_DOCUMENT_STORY.rule}
                      problem={LEGACY_DOCUMENT_STORY.problem}
                      risk={LEGACY_DOCUMENT_STORY.risk}
                      fields={LEGACY_DOCUMENT_STORY.captureFields}
                      captured={memoryCaptured}
                    />
                  </CanvasSectionAnchor>
                </>
              ) : null}

              {isGovernView ? (
                <GovernPolicyPassport
                  exportAction={
                    <GovernExportButton
                      policyName={governPolicyRow?.name ?? activeRecentLabel ?? "policy"}
                    />
                  }
                  overview={
                    <>
                      <IntentBanner intent={intent} />
                      <GovernPolicyOverview
                        name={governPolicyRow?.name ?? activeRecentLabel ?? "Live policy"}
                        status={governPolicyRow?.status ?? "Live"}
                        regions={governPolicyRow?.regions ?? "3 regions"}
                        owner={governPolicyRow?.owner ?? scenarioPreset.approval.authorName}
                        lastChange={governPolicyRow?.lastChange}
                        blastRadius={scenarioPreset.blastRadius}
                        complianceLabel={scenarioPreset.complianceCheck.label}
                        contextLine={scenarioPreset.contextLine}
                      />
                      {governLivePreview ? (
                        <LivePolicyPreview
                          status={governLivePreview.status}
                          statusLabel="Live"
                          slots={governLivePreview.slots}
                          emptyMessage=""
                          subtitle="Current production configuration"
                        />
                      ) : null}
                    </>
                  }
                  rulesPanel={
                    <AuthorValidationPanel
                      interpretations={journeyContent.interpretations}
                      rules={journeyContent.rules}
                      stats={journeyContent.stats}
                      checksPassed
                      complianceLabel={scenarioPreset.complianceCheck.label}
                      panelMode="govern"
                    />
                  }
                  compliancePanel={
                    <ComplianceSummaryPanel
                      scope={agenticEvidence.scope}
                      compliance={agenticEvidence.compliance}
                      checksPassed
                    />
                  }
                  auditPanel={<GovernRecordPanel timeline={scenarioPreset.lifecycleTimeline} delay={0} />}
                />
              ) : null}

              <AnimatePresence mode="wait">
                {phase === "understand" && intent ? (
                  <motion.div
                    key="analyzing-canvas"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CanvasSectionAnchor
                      id={CANVAS_SECTION_IDS.reflection}
                      highlight={canvasHighlight === CANVAS_SECTION_IDS.reflection}
                      activeSkill={activeSkill}
                    >
                      <IntentAnalyzingSkeleton intent={intent} />
                    </CanvasSectionAnchor>
                  </motion.div>
                ) : phase === "clarify" && flowMode === "author" ? (
                  <motion.div
                    key="clarify-canvas"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ ...LIVING_MOTION.discover, duration: 0.35 }}
                    className="flex flex-col gap-2"
                  >
                    <CanvasSectionAnchor
                      id={CANVAS_SECTION_IDS.reflection}
                      highlight={canvasHighlight === CANVAS_SECTION_IDS.reflection}
                      activeSkill={activeSkill}
                      whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.reflection)}
                    >
                      <UnderstandingReflectionCard
                        reflection={intentClarification.understandingReflection}
                        delay={0}
                        patternHint={scenarioPreset.insightLine}
                        confidence={confidence}
                        className="w-full"
                        fieldOverrides={reflectionFieldOverrides}
                        onFieldEdit={isPresentation ? undefined : handleReflectionFieldEdit}
                        onFieldWhy={isPresentation ? undefined : handleReflectionFieldWhy}
                        interactive={!isPresentation}
                      />
                    </CanvasSectionAnchor>
                    {!isIntentSummaryPresentation ? (
                      <>
                    <WhatIfSuggestionCard
                      summary={intentClarification.intentSummary}
                      prompt={intentClarification.whatIfPrompt}
                      options={intentClarification.whatIfOptions.map((o) => ({ id: o.id, label: o.label }))}
                      selectedId={whatIfSelected}
                      onSelect={(id) => {
                        setWhatIfSelected(id);
                        const opt = intentClarification.whatIfOptions.find((o) => o.id === id);
                        if (opt) {
                          pushThread({ role: "user", text: opt.label, time: "Now" });
                          schedule(() => {
                            if (opt.insight) pushThread({ role: "insight", text: opt.insight });
                            pushThread({ role: "copilot", text: opt.reply, time: "Now" });
                          }, livingDelay(LIVING_DELAY_MS.threadReply, reduced));
                        }
                      }}
                    />
                    <ConfirmUnderstandingGate
                      confirmed={understandingConfirmed}
                      onConfirm={confirmUnderstanding}
                      confirmPrompt={intentClarification.understandingReflection.confirmPrompt}
                    />
                      </>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {showLifecycleCanvas && phase !== "memory" && phase !== "capture" ? (
                <>
              {intent && showIntentBanner ? <IntentBanner intent={intent} /> : null}

              {showTopology ? <TopologyStrip defaultOpen={phase === "sense"} showNurses /> : null}

              {showLivePreview ? (
                entityReveal === 0 ? (
                  <CanvasSectionAnchor
                    id={CANVAS_SECTION_IDS.author}
                    highlight={canvasHighlight === CANVAS_SECTION_IDS.author}
                    activeSkill={activeSkill}
                    whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.author)}
                  >
                    <LivePolicyPreview
                      status={livePreview!.status}
                      statusLabel={livePreview!.statusLabel}
                      slots={livePreview!.slots}
                      emptyMessage={livePreview!.emptyMessage}
                    />
                  </CanvasSectionAnchor>
                ) : (
                  <LivePolicyPreview
                    status={livePreview!.status}
                    statusLabel={livePreview!.statusLabel}
                    slots={livePreview!.slots}
                    emptyMessage={livePreview!.emptyMessage}
                  />
                )
              ) : null}

              {showAuthorPanel ? (
                <motion.div
                  key="author-panel"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={LIVING_MOTION.morph}
                >
                <CanvasSectionAnchor
                  id={CANVAS_SECTION_IDS.author}
                  highlight={canvasHighlight === CANVAS_SECTION_IDS.author}
                  activeSkill={activeSkill}
                  whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.author)}
                >
                  <div className="mb-2 flex justify-end">
                    <EnforcementWatermark mode={enforcementMode} />
                  </div>
                  <AuthorValidationPanel
                    interpretations={journeyContent.interpretations}
                    rules={journeyContent.rules}
                    stats={journeyContent.stats}
                    validateMode={phase === "check"}
                    checksPassed={allChecksPassed}
                    complianceLabel={scenarioPreset.complianceCheck.label}
                    delay={0.05}
                  />
                </CanvasSectionAnchor>
                </motion.div>
              ) : null}

              {livePreview?.technicalRules && showTechnicalRulesCanvas(phase) ? (
                <TechnicalRulesPanel
                  allow={livePreview.technicalRules.allow}
                  deny={livePreview.technicalRules.deny}
                  delay={0.08}
                />
              ) : null}

              {showProves ? (
                <CanvasSectionAnchor
                  id={CANVAS_SECTION_IDS.reasoning}
                  highlight={canvasHighlight === CANVAS_SECTION_IDS.reasoning}
                  activeSkill={activeSkill}
                  whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.reasoning)}
                >
                  <ReasoningEvidencePanel evidence={agenticEvidence.reasoning} delay={0.06} />
                </CanvasSectionAnchor>
              ) : null}

              {showSummarize ? (
                <CanvasSectionAnchor
                  id={CANVAS_SECTION_IDS.compliance}
                  highlight={canvasHighlight === CANVAS_SECTION_IDS.compliance}
                  activeSkill={activeSkill}
                  whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.compliance)}
                >
                  <ComplianceSummaryPanel
                    scope={agenticEvidence.scope}
                    compliance={agenticEvidence.compliance}
                    checksPassed={allChecksPassed}
                    delay={0.08}
                  />
                </CanvasSectionAnchor>
              ) : null}

              {phase !== "clarify" && flowMode === "author" && (showMappingCanvas(phase) || (showDraftCanvas(phase) && !showAuthorPanel)) ? (
                <>
                  {entityReveal > 0 && phase === "sense" ? (
                    <CanvasSectionAnchor
                      id={CANVAS_SECTION_IDS.author}
                      highlight={canvasHighlight === CANVAS_SECTION_IDS.author}
                      activeSkill={activeSkill}
                      whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.author)}
                    >
                      <LivingCard
                        key={`mapped-${scenarioPreset.id}`}
                        title="What I mapped"
                        subtitle="Natural language → real objects in your environment"
                        delay={0.05}
                        badge={<EnforcementWatermark mode={enforcementMode} />}
                      >
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {entityMappings.slice(0, entityReveal).map((row, i) => (
                            <EntityChip
                              key={row.term}
                              term={row.term}
                              resolved={row.resolved}
                              type={row.type}
                              state={i === entityReveal - 1 && phase === "sense" ? "thinking" : "confirmed"}
                              delay={i * LIVING_MOTION.stagger}
                              handoffPulse={handoffPulse && i === entityReveal - 1}
                            />
                          ))}
                        </div>
                      </LivingCard>
                    </CanvasSectionAnchor>
                  ) : null}

                  {entityReveal >= entityMappings.length && phase === "draft" && !showAuthorPanel ? (
                    <LivingCard
                      key={`rules-${scenarioPreset.id}`}
                      title="Proposed rules"
                      subtitle="In plain English — verify before anything ships"
                      delay={0.1}
                      badge={<EnforcementWatermark mode={enforcementMode} />}
                    >
                      <p className="text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
                        {scenarioPreset.ruleReasoning}
                      </p>
                      {phase === "draft" && flowMode === "author" ? (
                        <div className="mt-4 border-t pt-3" style={{ borderColor: CLAUDE.hairline }}>
                          <ScenarioPreviewPanel
                            previews={intentClarification.scenarioPreviews}
                            open={scenarioPreviewOpen}
                            onToggle={() => setScenarioPreviewOpen((v) => !v)}
                          />
                        </div>
                      ) : null}
                    </LivingCard>
                  ) : null}

                  {phase === "sense" && entityReveal >= entityMappings.length && flowMode === "author" ? (
                    <RelatedRolesPanel
                      primaryRole={scenarioPreset.contextLine.split("·")[0]?.trim() ?? "Primary group"}
                      roles={intentClarification.relatedRoles}
                      enabled={relatedRoles}
                      onToggle={(id) => setRelatedRoles((prev) => ({ ...prev, [id]: !prev[id] }))}
                    />
                  ) : null}
                </>
              ) : null}

              {phase === "refine" ? (
                <>
                  {recommendationsBlock}
                  <div
                    className={cn(
                      "grid grid-cols-1 gap-4 lg:items-start",
                      showRefineBlastRadius && "lg:grid-cols-2",
                    )}
                  >
                    <LivingCard title="Rule priority" subtitle="Drag to reorder evaluation order" delay={0.1} badge={<EnforcementWatermark mode={enforcementMode} />}>
                      <RefineRulesReorder
                        rules={journeyContent.rules}
                        order={ruleOrder}
                        onReorder={setRuleOrder}
                      />
                    </LivingCard>
                    {showRefineBlastRadius ? (
                      <BlastRadiusPreview
                        summary={scenarioPreset.blastRadius}
                        groups={blastRadiusGroupsFor(scenarioPreset)}
                        people={parsePeopleFromBlastRadius(scenarioPreset.blastRadius)}
                        delay={0.12}
                      />
                    ) : null}
                  </div>
                </>
              ) : null}

              {phase === "approve" && flowMode === "author" && !approvalReviewReady ? (
                <BlastRadiusPreview
                  summary={scenarioPreset.blastRadius}
                  groups={blastRadiusGroupsFor(scenarioPreset)}
                  people={parsePeopleFromBlastRadius(scenarioPreset.blastRadius)}
                  delay={0.12}
                />
              ) : null}

              {phase === "approve" && flowMode === "author" && !riskDismissed ? (
                <RiskInsightCard
                  body={`If credentials leak, ${scenarioPreset.riskDetail.toLowerCase()} — review blast radius before you ship.`}
                  actions={[
                    { id: "risk-review", label: "Review blast radius" },
                    { id: "risk-continue", label: "Looks right — continue" },
                  ]}
                  dismissed={riskDismissed}
                  onAction={(id) => {
                    if (id === "risk-review") navigateToCanvas(CANVAS_SECTION_IDS.compliance);
                    else setRiskDismissed(true);
                  }}
                />
              ) : null}

              {hasCheckWarnings && (phase === "check" || phase === "refine") ? (
                <ValidationBlockedBanner
                  checks={safetyChecks}
                  checkStatus={checkStatus}
                  onFix={isPresentation ? undefined : fixValidationWarning}
                  fixLabel={
                    scenarioPreset.id === "vendor-vpn" || scenarioPreset.id === "contractors"
                      ? "Apply vendor MFA requirement"
                      : "Apply fix to clear warning"
                  }
                />
              ) : null}

              {safetyChecksBlock ? (
                <CanvasSectionAnchor
                  id={CANVAS_SECTION_IDS.checks}
                  highlight={canvasHighlight === CANVAS_SECTION_IDS.checks}
                  activeSkill={activeSkill}
                  whyAnnotation={whyAnnotationFor(CANVAS_SECTION_IDS.checks)}
                >
                  {safetyChecksBlock}
                </CanvasSectionAnchor>
              ) : null}

              {phase === "approve" && flowMode === "author" && simulateAcknowledged && !approvalReviewReady ? (
                <DeploySimulateStrip
                  simulating={simulateRunning}
                  onSimulate={() => {
                    setSimulateRunning(true);
                    schedule(() => setSimulateRunning(false), livingDelay(LIVING_DELAY_MS.blastSimulation, reduced));
                  }}
                  onProceed={handlePrimaryAction}
                />
              ) : null}

              {showApprovalSummaryCanvas(phase, {
                simulateAcknowledged,
                approvalReviewReady,
                allChecksPassed,
              }) && flowMode === "author" ? (
                <DeployReadyCard
                  title="Rule ready for deployment"
                  summary={[
                    ...journeyContent.deploySummary.filter((line) => !line.startsWith("MFA ")),
                    mfaApplied ? "MFA applied" : "MFA optional",
                  ]}
                  authorName={scenarioPreset.approval.authorName}
                  reviewSchedule={scenarioPreset.approval.reviewSchedule}
                  onDeploy={isPresentation ? undefined : handlePrimaryAction}
                  delay={0.16}
                />
              ) : null}

              {phase === "approve" && flowMode === "review" ? (
                <DeployReadyCard
                  title="Ready to retire rule"
                  summary={[
                    `Retiring ${REVIEW_DRIFT_STORY.rule}`,
                    "Memory and audit trail will update",
                  ]}
                  authorName={REVIEW_DRIFT_STORY.memory.approvedBy}
                  reviewSchedule="Drift resolved"
                  onDeploy={handlePrimaryAction}
                  delay={0.16}
                />
              ) : null}

              {phase === "ship" ? (
                <LivingCard title="Deploying" subtitle="Building secure policy across regions" accent="success" delay={0.16}>
                  <p className="text-[13px]" style={{ color: CLAUDE.textSecondary }}>
                    {flowMode === "review"
                      ? `Retiring ${REVIEW_DRIFT_STORY.rule}…`
                      : scenarioPreset.approval.justification}
                  </p>
                </LivingCard>
              ) : null}

              {showLifecycleCanvas && phase === "done" && flowMode === "document" ? (
                <GovernRecordPanel
                  timeline={[
                    { stage: "Legacy rule found", time: "Now", evidence: LEGACY_DOCUMENT_STORY.rule },
                    { stage: "Memory captured", time: "Now", evidence: "Justification, owner, and review cadence recorded" },
                    { stage: "Govern ready", time: "Now", evidence: "Safe to optimise or retire later" },
                  ]}
                  delay={0.2}
                />
              ) : null}

              {showLifecycleCanvas && phase === "done" && flowMode === "author" && policyEntry === "journey" ? (
                <GovernRecordPanel timeline={scenarioPreset.lifecycleTimeline} delay={0.2} />
              ) : null}

              {showLifecycleCanvas && phase === "done" && flowMode === "review" ? (
                <GovernRecordPanel
                  timeline={[
                    { stage: "Drift detected", time: "Now", evidence: REVIEW_DRIFT_STORY.driftDetail },
                    { stage: "Retirement approved", time: "Now", evidence: REVIEW_DRIFT_STORY.memory.approvedBy },
                    { stage: "Memory updated", time: "Now", evidence: "Audit trail complete — rule removed from active set" },
                  ]}
                  delay={0.2}
                />
              ) : null}
                </>
              ) : null}
                </>
              )}
              <div ref={canvasEndRef} className="h-px shrink-0" aria-hidden />
              </div>
            </div>

          </main>
        </div>

        {/* Suggestions + primary action */}
        {!isAnalyzingFocus ? (
        <footer
          className={cn(
            "shrink-0 border-t",
            isPresentation && "pointer-events-none",
          )}
          style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
        >
          {inLifecycle && (phase === "clarify" || phase === "draft" || phase === "memory" || phase === "capture") ? (
          <ThreadSuggestions
            variant="dock"
            label={
              phase === "draft"
                ? "Recommendations"
                : phase === "clarify"
                  ? "Confirm understanding"
                  : phase === "memory"
                  ? "Review actions"
                  : "Capture memory"
            }
            items={footerThreadSuggestions.map((s) => ({
              id: s.id,
              text: s.text,
              primary: s.primary,
              consequence: s.consequence,
              reply: s.reply,
              insight: s.insight,
            }))}
            onSelect={(id) => {
              const suggestion = threadSuggestions.find((s) => s.id === id);
              if (suggestion) handleSuggestion(suggestion);
            }}
          />
          ) : null}
          {isGovernView ? (
          <div className="flex items-center justify-end gap-3 px-4 py-3 md:px-5">
            <button
              type="button"
              onClick={handleBackToDashboard}
              className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "rounded-full px-4 text-[12px] font-medium")}
              style={{ color: CLAUDE.textMuted }}
            >
              Back to dashboard
            </button>
            <motion.button
              type="button"
              onClick={beginEditPolicy}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className={cn(
                COPILOT_FOCUS,
                COPILOT_TARGET.button,
                "rounded-full px-5 text-[13px] font-medium text-white",
              )}
              style={{ backgroundColor: CLAUDE.primary }}
            >
              Edit policy
            </motion.button>
          </div>
          ) : isJourneyComplete ? (
          <div className="flex items-center justify-end gap-3 px-4 py-3 md:px-5">
            <button
              type="button"
              onClick={handleBackToDashboard}
              className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "rounded-full px-4 text-[12px] font-medium")}
              style={{ color: CLAUDE.textMuted }}
            >
              Back to dashboard
            </button>
            <motion.button
              type="button"
              onClick={handleStartNewPolicy}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className={cn(
                COPILOT_FOCUS,
                COPILOT_TARGET.button,
                "rounded-full px-5 text-[13px] font-medium text-white",
              )}
              style={{ backgroundColor: CLAUDE.primary }}
            >
              Start new policy
            </motion.button>
          </div>
          ) : primaryLabel || phase === "refine" ? (
          <div className="flex items-center gap-3 px-4 py-3 md:px-5">
            <input
              type="text"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitAdminNote();
                }
              }}
              placeholder="Add a note for the network admin record…"
              className={cn(
                COPILOT_FOCUS,
                "min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2 text-[13px] outline-none",
              )}
              style={{
                borderColor: CLAUDE.border,
                color: CLAUDE.textSecondary,
              }}
              aria-label="Add a note for the network admin record"
            />
            {phase === "refine" && !hasCheckWarnings ? (
              <button
                type="button"
                onClick={() => {
                  setApprovalReviewReady(false);
                  setSimulateAcknowledged(false);
                  setPhase("approve");
                }}
                title="All mandatory checks passed. Optimisations are evidence-based, not required."
                className={cn(COPILOT_FOCUS, COPILOT_TARGET.chip, "shrink-0 rounded-full px-4 text-[12px] font-medium")}
                style={{ color: CLAUDE.textMuted }}
              >
                Skip optimisations → Impact review
              </button>
            ) : null}
            {primaryLabel ? (
            <motion.button
              type="button"
              onClick={handlePrimaryAction}
              disabled={phase === "ship"}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className={cn(
                COPILOT_FOCUS,
                COPILOT_TARGET.button,
                "shrink-0 rounded-full px-5 text-[13px] font-medium text-white disabled:opacity-50",
              )}
              style={{ backgroundColor: CLAUDE.primary }}
            >
              {phase === "ship" ? (
                <span className="inline-flex items-center gap-2">
                  Shipping
                  <ThinkingDots />
                </span>
              ) : (
                primaryLabel
              )}
            </motion.button>
            ) : null}
          </div>
          ) : null}
        </footer>
        ) : null}
        </>
        )}
      </div>
    </PolicyCopilotFrame>
  );

  if (isPresentation) {
    const presentationAriaLabel =
      presentation === "business-intent"
        ? "Policy Copilot business intent — workspace with natural-language input and suggested prompts, read-only"
        : presentation === "living-workspace"
          ? "Policy Copilot living workspace — continuous canvas with mapped entities, topology, and draft policy, read-only"
          : "Policy Copilot intent summary — full workspace with chat and reflection canvas, read-only";

    return (
      <div className="h-full select-none" aria-label={presentationAriaLabel}>
        {livingUi}
      </div>
    );
  }

  return livingUi;
}

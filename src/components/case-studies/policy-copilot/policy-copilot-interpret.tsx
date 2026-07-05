"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  COPILOT_GREETING,
  COPILOT_GREETING_HEADLINE,
  COPILOT_INTERPRET_STEPS,
  COPILOT_STARTING_POINTS,
  INTERPRET_ANALYSIS_STEPS,
} from "@/components/case-studies/policy-copilot/policy-copilot-data";
import { CLAUDE, CLAUDE_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import {
  CopilotMark,
  FlowProgress,
  PolicyCopilotFrame,
  PolicyCopilotSidebar,
  ThinkingDots,
} from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import {
  CandidateRuleDualView,
  EntityMappingTable,
  PanelLabel,
} from "@/components/case-studies/policy-copilot/policy-copilot-prd-ui";
import { cn, PrimaryBtn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

type InterpretPhase = "compose" | "analysing" | "confirmed";

function StartingPointIcon({ id }: { id: string }) {
  const stroke = CLAUDE.primary;
  if (id === "ehr") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 2.5l4.5 2v5L8 12.5 3.5 9.5v-5L8 2.5Z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "finance") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 12V8M6.5 12V5M10 12V7M13.5 12V3" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "contractor") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.5" stroke={stroke} strokeWidth="1.1" />
        <path d="M2.5 8h11M8 2.5a5.5 5.5 0 010 11" stroke={stroke} strokeWidth="1.1" />
      </svg>
    );
  }
  if (id === "time") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.5" stroke={stroke} strokeWidth="1.1" />
        <path d="M8 5v3.5l2.5 1.5" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="4.5" y="7" width="7" height="6" rx="1" stroke={stroke} strokeWidth="1.1" />
      <path d="M6 7V5.5a2 2 0 014 0V7" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function WelcomeCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduced ? { duration: 0 } : { ...CLAUDE_MOTION.springPop, delay: 0.08 }}
      className="w-full max-w-md rounded-2xl border px-5 py-5"
      style={{
        borderColor: CLAUDE.borderStrong,
        backgroundColor: CLAUDE.surfaceRaised,
        boxShadow: "0 1px 0 rgb(250 249 245 / 0.05) inset, 0 16px 40px rgb(0 0 0 / 0.18)",
      }}
    >
      <div className="flex items-start gap-3">
        <CopilotMark size={36} glow />
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em]" style={{ color: CLAUDE.textSoft }}>
            Policy Copilot
          </p>
          <h2
            className="mt-1 text-[15px] font-normal leading-snug tracking-tight md:text-[16px]"
            style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
          >
            {COPILOT_GREETING_HEADLINE}
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed md:text-[12px]" style={{ color: CLAUDE.textSecondary }}>
            {COPILOT_GREETING}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({
  sender,
  time,
  children,
  delay = 0,
}: {
  sender: "copilot" | "user" | "thinking";
  time?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const isCopilot = sender === "copilot" || sender === "thinking";
  const isUser = sender === "user";

  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduced ? { duration: 0 } : { ...CLAUDE_MOTION.springSoft, delay }}
      className={cn(
        "max-w-[85%] rounded-2xl border px-4 py-3",
        isUser ? "self-end" : "self-start",
      )}
      style={{
        backgroundColor: isUser ? CLAUDE.surfaceOverlay : CLAUDE.surfaceRaised,
        borderColor: isUser ? CLAUDE.border : CLAUDE.borderStrong,
        borderLeftWidth: isCopilot ? 3 : 1,
        borderLeftColor: isCopilot ? CLAUDE.primary : CLAUDE.border,
        boxShadow: isUser ? undefined : "0 4px 20px rgb(0 0 0 / 0.12)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        {isUser ? (
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold"
            style={{ backgroundColor: CLAUDE.warning, color: "#1a1814" }}
          >
            J
          </div>
        ) : (
          <CopilotMark size={20} />
        )}
        <p className="text-[9px] font-medium" style={{ color: CLAUDE.text }}>
          {isUser ? "You" : "Policy Copilot"}
        </p>
        {time ? (
          <p className="ml-auto text-[8px] tabular-nums" style={{ color: CLAUDE.textSoft }}>
            {time}
          </p>
        ) : null}
      </div>
      <div className="text-[11px] leading-relaxed md:text-[12px]" style={{ color: CLAUDE.textSecondary }}>
        {children}
      </div>
    </motion.div>
  );
}

function StarterCard({
  id,
  title,
  example,
  selected,
  index,
  onSelect,
}: {
  id: string;
  title: string;
  example: string;
  selected: boolean;
  index: number;
  onSelect: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { ...CLAUDE_MOTION.springSoft, delay: 0.12 + index * CLAUDE_MOTION.stagger }
      }
      whileHover={reduced ? undefined : { y: -2, transition: CLAUDE_MOTION.springSoft }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C97EE]",
      )}
      style={{
        borderColor: selected ? CLAUDE.primaryBorder : CLAUDE.border,
        backgroundColor: selected ? CLAUDE.primaryMuted : CLAUDE.surface,
        boxShadow: selected ? `0 0 0 1px ${CLAUDE.primaryMuted}` : undefined,
      }}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: selected ? "rgb(92 151 238 / 0.22)" : CLAUDE.primaryMuted,
        }}
      >
        <StartingPointIcon id={id} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium" style={{ color: CLAUDE.text }}>
          {title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug" style={{ color: CLAUDE.textMuted }}>
          {example}
        </p>
      </div>
      <motion.span
        animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.8 }}
        className="mt-0.5 shrink-0 text-[9px]"
        style={{ color: CLAUDE.primary }}
        aria-hidden={!selected}
      >
        ✓
      </motion.span>
    </motion.button>
  );
}

function AnalysisStepRow({
  label,
  done,
  active,
  index,
}: {
  label: string;
  done: boolean;
  active: boolean;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="flex items-start gap-2.5"
    >
      <motion.span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
        animate={{
          borderColor: done ? CLAUDE.primary : active ? CLAUDE.primaryBorder : CLAUDE.border,
          backgroundColor: done ? CLAUDE.primary : "transparent",
          scale: active && !done ? [1, 1.08, 1] : 1,
        }}
        transition={active && !done ? { repeat: Infinity, duration: 1.4 } : CLAUDE_MOTION.springSoft}
      >
        {done ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2.5 w-2.5 text-white"
            viewBox="0 0 8 8"
            fill="none"
            aria-hidden
          >
            <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </motion.svg>
        ) : active ? (
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CLAUDE.primary }} />
        ) : null}
      </motion.span>
      <p
        className="text-[10px] leading-snug"
        style={{ color: done || active ? CLAUDE.text : CLAUDE.textSoft }}
      >
        {label}
      </p>
    </motion.li>
  );
}

export function PolicyCopilotInterpret({
  contentOnly = false,
  compact = false,
  draft,
  onDraftChange,
  onSubmit,
  onBack,
  onRecentSelect,
  onExploreExample,
  onStepChange,
}: {
  contentOnly?: boolean;
  compact?: boolean;
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (text: string) => void;
  onBack: () => void;
  onRecentSelect: (prompt: string) => void;
  onExploreExample: (prompt: string) => void;
  onStepChange?: () => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const skipStepScrollRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const { current, total } = COPILOT_INTERPRET_STEPS;

  const [phase, setPhase] = useState<InterpretPhase>("compose");
  const [submittedText, setSubmittedText] = useState("");
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);
  const [composerFocused, setComposerFocused] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const progress = phase === "confirmed" ? 32 : phase === "analysing" ? 24 : 16;
  const progressStatus =
    phase === "analysing" ? "In progress…" : phase === "confirmed" ? "Ready" : undefined;

  function handleStarterSelect(id: string, prompt: string) {
    setSelectedStarter(id);
    onDraftChange(prompt);
    inputRef.current?.focus();
  }

  function handleSubmit() {
    const text = draft.trim();
    if (!text || phase !== "compose") return;
    setSubmittedText(text);
    setPhase("analysing");
    onDraftChange("");
  }

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "analysing") return;
    setAnalysisStep(0);
    const intervals: number[] = [];
    INTERPRET_ANALYSIS_STEPS.forEach((_, i) => {
      intervals.push(window.setTimeout(() => setAnalysisStep(i + 1), 320 + i * 280));
    });
    const done = window.setTimeout(() => setPhase("confirmed"), 2000);
    return () => {
      intervals.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [phase]);

  useEffect(() => {
    if (skipStepScrollRef.current) {
      skipStepScrollRef.current = false;
      return;
    }
    onStepChange?.();
  }, [phase, onStepChange]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [phase, reducedMotion]);

  function handleProceed() {
    onSubmit(submittedText);
  }

  const hasConversation = phase !== "compose";
  const canSend = draft.trim().length > 0;

  const panels = (
    <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 sm:grid-cols-2">
      <section
        className="relative z-10 flex min-h-0 min-w-0 flex-col border-r"
        style={{
          borderColor: CLAUDE.hairline,
          background: `linear-gradient(180deg, ${CLAUDE.bg} 0%, ${CLAUDE.surface} 100%)`,
        }}
      >
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4 md:p-6",
            !hasConversation && "items-center justify-center",
          )}
        >
          {!hasConversation ? (
            <WelcomeCard reduced={!!reducedMotion} />
          ) : (
            <>
              <ChatBubble sender="copilot" time="11:05 AM">
                {COPILOT_GREETING_HEADLINE}. {COPILOT_GREETING}
              </ChatBubble>

              <AnimatePresence mode="popLayout">
                <ChatBubble key="user" sender="user" time="Now" delay={0.04}>
                  {submittedText}
                </ChatBubble>
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                {phase === "analysing" && (
                  <ChatBubble key="thinking" sender="thinking" delay={0.08}>
                    <span className="flex items-center gap-2">
                      Working on it
                      <ThinkingDots />
                    </span>
                  </ChatBubble>
                )}
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                {phase === "confirmed" && (
                  <ChatBubble key="confirm" sender="copilot" time="Now" delay={0.06}>
                    Here&apos;s what I understood. Check the rules on the right, then build the topology.
                  </ChatBubble>
                )}
              </AnimatePresence>
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {phase === "compose" ? (
          <motion.div
            layout
            className="shrink-0 border-t px-4 pb-3 pt-3 md:px-6 md:pb-4"
            style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
          >
            <motion.div
              animate={{
                boxShadow: composerFocused
                  ? "0 0 0 1px rgb(92 151 238 / 0.35), 0 12px 40px rgb(0 0 0 / 0.22)"
                  : "0 4px 24px rgb(0 0 0 / 0.16)",
              }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-2xl border"
              style={{
                borderColor: composerFocused ? CLAUDE.primaryBorder : CLAUDE.borderStrong,
                backgroundColor: CLAUDE.surfaceRaised,
              }}
            >
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                onFocus={() => setComposerFocused(true)}
                onBlur={() => setComposerFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                rows={2}
                placeholder="Who needs access? To what? Any restrictions?"
                className="min-h-[3rem] w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-[12px] leading-relaxed outline-none md:text-[13px] [&::placeholder]:text-[#8e8b82]"
                style={{ color: CLAUDE.text }}
                aria-label="Describe your policy intent"
              />
              <AnimatePresence>
                {canSend ? (
                  <motion.button
                    key="send"
                    type="button"
                    onClick={handleSubmit}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                    transition={CLAUDE_MOTION.springPop}
                    className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: CLAUDE.primary,
                      boxShadow: `0 4px 14px ${CLAUDE.primaryMuted}`,
                    }}
                    aria-label="Send intent"
                  >
                    <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </motion.div>
            <p className="mt-2 text-center text-[9px]" style={{ color: CLAUDE.textSoft }}>
              Enter to send · Shift+Enter for new line
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={CLAUDE_MOTION.springSoft}
            className="flex shrink-0 items-center justify-between gap-4 border-t px-4 py-3 md:px-6"
            style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surface }}
          >
            <p className="text-[10px]" style={{ color: CLAUDE.textMuted }}>
              {phase === "analysing" ? "Mapping your request…" : "Ready to build"}
            </p>
            <PrimaryBtn onClick={handleProceed} disabled={phase !== "confirmed"}>
              Build topology →
            </PrimaryBtn>
          </motion.div>
        )}
      </section>

      <aside
        className="relative z-10 hidden min-h-0 min-w-0 flex-col sm:flex"
        style={{ backgroundColor: CLAUDE.surface }}
      >
        <div
          className="border-b p-4 md:p-5"
          style={{ borderColor: CLAUDE.hairline }}
        >
          <FlowProgress
            step={current}
            total={total}
            progress={progress}
            label="Understand intent"
            status={progressStatus}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <AnimatePresence mode="wait">
            {phase === "compose" ? (
              <motion.div
                key="starters"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className="text-[9px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: CLAUDE.textSoft }}
                >
                  Quick starters
                </p>
                <p className="mt-1 text-[11px]" style={{ color: CLAUDE.textMuted }}>
                  Tap a pattern to fill the composer
                </p>
                <div className="mt-3 space-y-2">
                  {COPILOT_STARTING_POINTS.map((card, i) => (
                    <StarterCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      example={card.example}
                      selected={selectedStarter === card.id}
                      index={i}
                      onSelect={() => handleStarterSelect(card.id, card.prompt)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : phase === "analysing" ? (
              <motion.div
                key="analysing"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <p
                    className="text-[13px] font-normal tracking-tight md:text-[14px]"
                    style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
                  >
                    Analysing your request
                  </p>
                  <p className="mt-1 text-[11px]" style={{ color: CLAUDE.textMuted }}>
                    Matching names to real groups and apps…
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {INTERPRET_ANALYSIS_STEPS.map((step, i) => (
                    <AnalysisStepRow
                      key={step}
                      label={step}
                      done={i < analysisStep}
                      active={i === analysisStep}
                      index={i}
                    />
                  ))}
                </ul>
                {analysisStep < INTERPRET_ANALYSIS_STEPS.length ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 rounded-xl border p-3"
                    style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised }}
                    aria-hidden
                  >
                    <div className="h-5 w-28 animate-pulse rounded-full" style={{ backgroundColor: CLAUDE.hairline }} />
                    <div className="h-2.5 w-full animate-pulse rounded" style={{ backgroundColor: CLAUDE.hairline }} />
                    <div className="h-2.5 w-4/5 animate-pulse rounded" style={{ backgroundColor: CLAUDE.hairline }} />
                  </motion.div>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="contract"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div>
                  <PanelLabel>What I mapped</PanelLabel>
                  <div className="mt-2">
                    <EntityMappingTable compact />
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className="text-[13px] font-normal tracking-tight"
                      style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
                    >
                      Proposed rules
                    </p>
                    <span
                      className="rounded-full border px-2 py-0.5 text-[8px] font-medium"
                      style={{
                        borderColor: CLAUDE.primaryBorder,
                        color: CLAUDE.primary,
                        backgroundColor: CLAUDE.primaryMuted,
                      }}
                    >
                      Matches your wording
                    </span>
                  </div>
                  <div className="mt-2">
                    <CandidateRuleDualView compact />
                  </div>
                </div>

                <div>
                  <PanelLabel>Your original request</PanelLabel>
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mt-2 rounded-xl border-l-[3px] py-3 pl-3 pr-3"
                    style={{
                      borderLeftColor: CLAUDE.validated,
                      backgroundColor: CLAUDE.validatedMuted,
                    }}
                  >
                    <p className="text-[11px] leading-relaxed md:text-[12px]" style={{ color: CLAUDE.text }}>
                      {submittedText}
                    </p>
                  </motion.div>
                  <p className="mt-1.5 text-[9px]" style={{ color: CLAUDE.textSoft }}>
                    Saved exactly as you wrote it
                  </p>
                </div>

                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl border p-3"
                  style={{ borderColor: CLAUDE.border, backgroundColor: CLAUDE.surfaceRaised }}
                >
                  <p className="text-[11px] font-medium" style={{ color: CLAUDE.text }}>
                    No extra assumptions
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                    I only used what you wrote — nothing added from history or context.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );

  if (contentOnly) return panels;

  return (
    <PolicyCopilotFrame>
      <PolicyCopilotSidebar
        variant="flow"
        compact={compact}
        activeNav="lifecycle"
        onNavChange={() => {}}
        onBack={phase === "compose" ? onBack : undefined}
        onStartNewPolicy={onBack}
        onRecentSelect={(item) => {
          if (phase === "compose") {
            onRecentSelect(item.prompt);
            inputRef.current?.focus();
          }
        }}
      />
      {panels}
    </PolicyCopilotFrame>
  );
}

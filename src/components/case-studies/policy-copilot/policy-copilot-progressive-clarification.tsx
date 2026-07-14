"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EDITORIAL as CLAUDE, COPILOT_TYPE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const REQUEST =
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices.";

const FRAMES = [
  {
    id: "request",
    step: "1",
    title: "Business request",
    caption: "One sentence — no configuration yet",
  },
  {
    id: "gap",
    step: "2",
    title: "One clarification",
    caption: "Only the gap that blocks progress",
  },
  {
    id: "response",
    step: "3",
    title: "Administrator responds",
    caption: "Embedded action — not a chat reply",
  },
  {
    id: "update",
    step: "4",
    title: "Workspace updates",
    caption: "Intent summary refreshes instantly",
  },
] as const;

const CLARIFY_CHIPS = [
  { id: "yes", label: "Yes — looks right" },
  { id: "on-site", label: "On-site devices only" },
  { id: "locum", label: "Include locum doctors" },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Progressive clarification storyboard — business request, one embedded clarification about remote access, administrator selecting on-site devices only, and the workspace updating instantly.";

function WorkspaceChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[15.5rem] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-3 py-2">
        <p className={cn(COPILOT_TYPE.eyebrow, "text-[8px]")} style={{ color: CLAUDE.textMuted }}>
          Policy workspace
        </p>
        <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[9px] font-medium tabular-nums text-neutral-600">
          Draft · not deployed
        </span>
      </div>
      {children}
    </div>
  );
}

function RequestStrip() {
  return (
    <div className="mx-3 mt-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5">
      <p className={cn(COPILOT_TYPE.eyebrow, "text-[8px]")} style={{ color: CLAUDE.textMuted }}>
        Business intent
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">
        &ldquo;{REQUEST}&rdquo;
      </p>
    </div>
  );
}

function IntentField({
  label,
  value,
  highlight,
  resolved,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  resolved?: boolean;
}) {
  return (
    <div
      className="rounded-lg border px-2.5 py-2"
      style={{
        backgroundColor: highlight ? CLAUDE.warningMuted : "#FFFFFF",
        borderColor: highlight ? "rgb(180 83 9 / 0.35)" : CLAUDE.border,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className={cn(COPILOT_TYPE.eyebrow, "text-[7px]")} style={{ color: CLAUDE.textMuted }}>
          {label}
        </p>
        {resolved ? (
          <span className="text-[8px] font-semibold" style={{ color: CLAUDE.validated }}>
            Resolved
          </span>
        ) : null}
      </div>
      <p className="mt-0.5 text-[10px] leading-snug text-neutral-800">{value}</p>
    </div>
  );
}

function FramePanel({ frameIndex }: { frameIndex: number }) {
  const reduced = useReducedMotion();
  const frame = FRAMES[frameIndex];
  const selectedChip = frameIndex >= 2 ? "on-site" : undefined;
  const confidence = frameIndex >= 3 ? 84 : frameIndex >= 1 ? 72 : 58;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={frame.id}
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.32 }}
        className="flex h-full flex-col"
      >
        <WorkspaceChrome>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="space-y-2">
              <RequestStrip />
              {frameIndex >= 1 ? (
                <div
                  className="rounded-lg border px-2.5 py-2"
                  style={{ backgroundColor: CLAUDE.primaryMuted, borderColor: CLAUDE.primaryBorder }}
                >
                  <p className={cn(COPILOT_TYPE.eyebrow, "text-[7px]")} style={{ color: CLAUDE.primaryActive }}>
                    Connected to request
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-neutral-700">
                    Clarifications stay tied to the original intent — nothing starts over.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="space-y-1.5 rounded-lg border border-neutral-200 bg-white p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold text-neutral-900">Intent summary</p>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold tabular-nums"
                  style={{ backgroundColor: CLAUDE.primaryMuted, color: CLAUDE.primaryActive }}
                >
                  {confidence}%
                </span>
              </div>
              <IntentField label="Users" value="Doctors (Doctors-AD-Group)" />
              <IntentField label="Application" value="Electronic Health Records" />
              {frameIndex === 1 ? (
                <IntentField
                  label="I need clarification"
                  value="Remote access, or on-site managed devices only?"
                  highlight
                />
              ) : null}
              {frameIndex >= 3 ? (
                <IntentField
                  label="Access path"
                  value="On-prem clinical segment only — no remote VPN"
                  resolved
                />
              ) : frameIndex === 0 ? (
                <IntentField label="Devices" value="Hospital-managed endpoints" />
              ) : null}
            </div>
          </div>

          {frameIndex >= 2 ? (
            <div className="border-t border-neutral-200 bg-white px-3 py-2.5">
              <p className={cn(COPILOT_TYPE.eyebrow, "text-[7px]")} style={{ color: CLAUDE.textMuted }}>
                Confirm understanding
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {CLARIFY_CHIPS.map((chip) => {
                  const selected = selectedChip === chip.id;
                  return (
                    <span
                      key={chip.id}
                      className="rounded-full border px-2 py-0.5 text-[9px] font-medium"
                      style={
                        selected
                          ? {
                              borderColor: CLAUDE.primaryBorder,
                              backgroundColor: CLAUDE.primaryMuted,
                              color: CLAUDE.primaryActive,
                            }
                          : {
                              borderColor: CLAUDE.borderStrong,
                              backgroundColor: "#FFFFFF",
                              color: CLAUDE.textSecondary,
                            }
                      }
                    >
                      {chip.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : null}

          {frameIndex >= 3 ? (
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-3 mb-3 rounded-lg border px-2.5 py-2"
              style={{
                backgroundColor: CLAUDE.validatedMuted,
                borderColor: "rgb(21 128 61 / 0.28)",
              }}
            >
              <p className="text-[10px] font-semibold" style={{ color: CLAUDE.validated }}>
                Gap closed — confidence 72% → 84%
              </p>
            </motion.div>
          ) : null}
        </WorkspaceChrome>

        <p className="mt-2 text-center text-[11px] leading-snug text-neutral-600">{frame.caption}</p>
      </motion.div>
    </AnimatePresence>
  );
}

export function PolicyCopilotProgressiveClarification() {
  const reduced = useReducedMotion();
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    if (reduced) {
      setActiveFrame(FRAMES.length - 1);
      return;
    }

    let cancelled = false;
    let frame = 0;
    setActiveFrame(0);

    const tick = () => {
      if (cancelled) return;
      frame = (frame + 1) % FRAMES.length;
      setActiveFrame(frame);
    };

    const timer = window.setInterval(tick, 2400);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [reduced]);

  return (
    <figure
      className="overflow-hidden rounded-xl border border-neutral-200 case-study-light-panel"
      style={{ backgroundColor: CLAUDE.bg }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b border-neutral-200 px-4 py-4 md:px-5 md:py-5">
        <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.primaryActive }}>
          Storyboard
        </p>
        <p
          className={cn(COPILOT_TYPE.titleLg, "mt-1")}
          style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
        >
          Progressive Clarification
        </p>
        <p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-neutral-600">
          One business request, one clarification, the administrator&rsquo;s response, and the workspace
          updating instantly — embedded in the product, not a chat thread.
        </p>
      </div>

      <div className="px-3 py-5 md:px-5 md:py-6">
        <ol className="mb-4 flex flex-wrap justify-center gap-2">
          {FRAMES.map((frame, index) => {
            const isActive = index === activeFrame;
            const isComplete = index < activeFrame;
            return (
              <li key={frame.id}>
                <button
                  type="button"
                  onClick={() => setActiveFrame(index)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-left transition-colors",
                    isActive
                      ? "border-sky-300 bg-sky-50"
                      : "border-neutral-200 bg-white hover:bg-neutral-50",
                  )}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: isComplete
                        ? CLAUDE.validatedMuted
                        : isActive
                          ? CLAUDE.primaryMuted
                          : "#F5F5F5",
                      color: isComplete
                        ? CLAUDE.validated
                        : isActive
                          ? CLAUDE.primaryActive
                          : CLAUDE.textMuted,
                    }}
                  >
                    {isComplete ? "✓" : frame.step}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: isActive ? CLAUDE.text : CLAUDE.textMuted }}
                  >
                    {frame.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto max-w-2xl">
          <FramePanel frameIndex={activeFrame} />
        </div>
      </div>
    </figure>
  );
}

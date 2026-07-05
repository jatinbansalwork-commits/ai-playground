"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CLAUDE, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const REQUEST =
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices.";

const STRUCTURE_CARDS = [
  {
    id: "users",
    label: "Users recognised",
    value: "Doctors-AD-Group",
    detail: "240 doctors · clinical identity group",
  },
  {
    id: "applications",
    label: "Applications mapped",
    value: "Electronic Health Records",
    detail: "ePHI application · HTTPS 443",
  },
  {
    id: "devices",
    label: "Devices confirmed",
    value: "Hospital-managed endpoints",
    detail: "Corporate-owned clinical workstations",
  },
  {
    id: "conditions",
    label: "Access conditions",
    value: "Secure clinical access only",
    detail: "Managed devices · session logging on allow path",
  },
] as const;

const CONFIDENCE_BY_STEP = [24, 42, 61, 79, 91] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Intent becomes structure — animated cards appearing as Policy Copilot recognises users, applications, devices, and access conditions while confidence increases.";

type RowState = "pending" | "active" | "confirmed";

function rowState(index: number, activeStep: number): RowState {
  if (activeStep > index + 1) return "confirmed";
  if (activeStep === index + 1) return "active";
  return "pending";
}

function TimelineRow({
  card,
  index,
  state,
}: {
  card: (typeof STRUCTURE_CARDS)[number];
  index: number;
  state: RowState;
}) {
  const reduced = useReducedMotion();
  const isConfirmed = state === "confirmed";
  const isActive = state === "active";

  return (
    <li className="relative flex gap-3 md:gap-4">
      <div className="flex w-5 shrink-0 flex-col items-center pt-1" aria-hidden>
        <motion.span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold"
          animate={{
            backgroundColor: isConfirmed
              ? CLAUDE.validatedMuted
              : isActive
                ? CLAUDE.primaryMuted
                : CLAUDE.surfaceOverlay,
            color: isConfirmed ? CLAUDE.validated : isActive ? CLAUDE.primary : CLAUDE.textSoft,
            boxShadow: isActive
              ? `inset 0 0 0 1px ${CLAUDE.primaryBorder}, 0 0 0 4px ${CLAUDE.primaryMuted}`
              : `inset 0 0 0 1px ${CLAUDE.hairline}`,
          }}
          transition={{ duration: 0.35 }}
        >
          {isConfirmed ? "✓" : index + 1}
        </motion.span>
        {index < STRUCTURE_CARDS.length - 1 ? (
          <div
            className="mt-1 w-px flex-1 min-h-[1.75rem]"
            style={{
              background: isConfirmed
                ? `linear-gradient(to bottom, ${CLAUDE.validated}88, ${CLAUDE.hairline})`
                : CLAUDE.hairline,
            }}
          />
        ) : null}
      </div>

      <motion.div
        layout
        initial={false}
        animate={{
          opacity: state === "pending" ? 0.42 : 1,
          y: isActive && !reduced ? [0, -1, 0] : 0,
        }}
        transition={
          isActive && !reduced
            ? { y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.35 }
        }
        className="mb-3 min-w-0 flex-1 rounded-xl px-3.5 py-3 md:px-4 md:py-3.5"
        style={{
          backgroundColor: isConfirmed
            ? CLAUDE.validatedMuted
            : isActive
              ? CLAUDE.primaryMuted
              : CLAUDE.surfaceOverlay,
          boxShadow: `inset 0 0 0 1px ${
            isConfirmed ? `${CLAUDE.validated}44` : isActive ? CLAUDE.primaryBorder : CLAUDE.hairline
          }`,
        }}
      >
        {state === "pending" ? (
          <div className="space-y-2">
            <div className="h-2 w-16 rounded-full bg-white/[0.06]" />
            <div className="h-3 w-3/4 max-w-[14rem] rounded-full bg-white/[0.08]" />
            <div className="h-2 w-1/2 max-w-[10rem] rounded-full bg-white/[0.04]" />
          </div>
        ) : (
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...LIVING_MOTION.discover }}
          >
            <p
              className={cn(COPILOT_TYPE.eyebrow)}
              style={{ color: isConfirmed ? CLAUDE.validated : CLAUDE.primary }}
            >
              {card.label}
            </p>
            <p className="mt-1 text-[13px] font-medium leading-snug" style={{ color: CLAUDE.text }}>
              {card.value}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
              {card.detail}
            </p>
          </motion.div>
        )}
      </motion.div>
    </li>
  );
}

export function PolicyCopilotIntentBecomesStructure() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setActiveStep(STRUCTURE_CARDS.length);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const runCycle = () => {
      let elapsed = 0;
      setActiveStep(0);

      for (let step = 0; step <= STRUCTURE_CARDS.length; step += 1) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setActiveStep(step);
          }, elapsed),
        );
        elapsed += step === 0 ? 700 : 950;
      }

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) runCycle();
        }, elapsed + 1800),
      );
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced]);

  const confidence = CONFIDENCE_BY_STEP[Math.min(activeStep, CONFIDENCE_BY_STEP.length - 1)];
  const status =
    activeStep === 0
      ? "Parsing business intent…"
      : activeStep < STRUCTURE_CARDS.length
        ? "Building structured understanding…"
        : "Structure complete — ready to confirm";

  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: "#0D1114" }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b px-4 py-4 md:px-5 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-2xl">
            <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.warning }}>
              Motion Prototype
            </p>
            <p
              className={cn(COPILOT_TYPE.titleLg, "mt-1")}
              style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
            >
              Intent Becomes Structure
            </p>
            <p className="mt-1 text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
              A short animation showing information cards appearing one by one as the AI recognises
              users, applications, devices, and access conditions. Confidence gradually increases as
              more information is confirmed.
            </p>
          </div>
          <div className="min-w-[8.5rem] rounded-xl px-3 py-2.5 text-right">
            <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textMuted }}>
              Confidence
            </p>
            <p className="mt-1 text-[24px] font-medium tabular-nums leading-none" style={{ color: CLAUDE.text }}>
              {confidence}%
            </p>
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: CLAUDE.surfaceOverlay }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: confidence >= 80 ? CLAUDE.validated : CLAUDE.primary }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.6, ease: LIVING_MOTION.confidence.ease }}
          />
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div
          className="border-b p-4 md:border-b-0 md:border-r md:p-5"
          style={{ borderColor: CLAUDE.hairline, backgroundColor: CLAUDE.surfaceRaised }}
        >
          <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.textSoft }}>
            Business intent
          </p>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
            &ldquo;{REQUEST}&rdquo;
          </p>
          <div
            className="mt-4 rounded-xl px-3 py-2.5"
            style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
          >
            <p className="text-[11px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
              {status}
            </p>
          </div>
        </div>

        <div className="p-4 md:p-5" aria-live="polite">
          <ol className="m-0 list-none p-0">
            {STRUCTURE_CARDS.map((card, index) => (
              <TimelineRow
                key={card.id}
                card={card}
                index={index}
                state={rowState(index, activeStep)}
              />
            ))}
          </ol>
        </div>
      </div>
    </figure>
  );
}

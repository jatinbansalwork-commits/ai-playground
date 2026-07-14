"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EDITORIAL as CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const REQUEST =
  "Allow doctors to securely access Electronic Health Records from hospital-managed devices.";

const IDENTIFIED_ITEMS = [
  "Users",
  "Applications",
  "Managed devices",
  "Network zones",
  "Assumptions",
  "Missing information",
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Understanding before generation — immediate policy output compared with a reflection step that surfaces users, applications, zones, assumptions, and missing information before asking for confirmation.";

function RequestBubble() {
  return (
    <div
      className="rounded-xl border border-neutral-200 bg-white px-4 py-3.5"
    >
      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        Business request
      </p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-800">
        &ldquo;{REQUEST}&rdquo;
      </p>
    </div>
  );
}

function FastPathArrow({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex flex-col items-center py-3" aria-hidden>
      <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.16em] text-red-700">
        Immediate
      </p>
      <div className="h-6 w-px bg-gradient-to-b from-neutral-300 to-red-400/70" />
      {!reduced ? (
        <motion.svg
          className="h-3.5 w-3.5 text-red-600"
          viewBox="0 0 16 16"
          fill="none"
          animate={{ y: [0, 3, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M8 3v10M8 13l-3-3M8 13l3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ) : (
        <svg className="h-3.5 w-3.5 text-red-600" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3v10M8 13l-3-3M8 13l3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

function ReflectionPath({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex flex-col items-center py-3" aria-hidden>
      <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.16em] text-orange-700">
        Pause
      </p>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-orange-300 bg-orange-50">
        {!reduced ? (
          <motion.span
            className="absolute inset-0 rounded-full border border-orange-300/60"
            animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <svg className="h-3.5 w-3.5 text-orange-600" viewBox="0 0 16 16" fill="none">
          <path d="M5.5 4.5v7M10.5 4.5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-2 h-5 w-px bg-gradient-to-b from-orange-400/50 to-sky-500/50" />
      <svg className="h-3.5 w-3.5 text-sky-600" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 3v10M8 13l-3-3M8 13l3-3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function PolicyCopilotUnderstandingBeforeGeneration() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <div
        className="overflow-hidden rounded-lg border border-neutral-200 px-5 py-7 sm:px-7 md:py-9 case-study-light-panel"
        style={{ backgroundColor: CLAUDE.bg }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <header className="mx-auto max-w-lg text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-500">
            Understanding Before Generation
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            The first prototype answered immediately. The final experience proved understanding
            first.
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col rounded-2xl border px-5 py-6 sm:px-6"
            style={{
              borderColor: "rgb(185 28 28 / 0.28)",
              backgroundColor: "rgb(254 242 242 / 0.85)",
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-800">
              First prototype
            </p>
            <p className="mt-2 text-[13px] text-neutral-700">Generate first, understand later</p>

            <div className="mt-5 flex flex-1 flex-col">
              <RequestBubble />
              <FastPathArrow reduced={Boolean(reduced)} />
              <div
                className="rounded-xl border bg-white px-4 py-4"
                style={{ borderColor: "rgb(185 28 28 / 0.22)" }}
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-red-700">
                  Output
                </p>
                <p className="mt-2 text-[14px] font-medium leading-snug text-neutral-900">
                  &ldquo;Here&rsquo;s your policy.&rdquo;
                </p>
                <div className="mt-3 space-y-2">
                  {["Source", "Destination", "Protocol", "Ports"].map((field) => (
                    <div
                      key={field}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
                    >
                      <span className="text-[10px] font-medium text-neutral-600">{field}</span>
                      <span className="h-1.5 w-12 rounded-full bg-neutral-200" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-neutral-600">
              Answered before proving it understood the request
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col rounded-2xl border px-5 py-6 sm:px-6"
            style={{
              borderColor: CLAUDE.primaryBorder,
              backgroundColor: "rgb(239 246 255 / 0.9)",
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-sky-800">
              Slowed experience
            </p>
            <p className="mt-2 text-[13px] text-neutral-700">Reflect understanding, then confirm</p>

            <div className="mt-5 flex flex-1 flex-col">
              <RequestBubble />
              <ReflectionPath reduced={Boolean(reduced)} />

              <div
                className="rounded-xl border bg-white px-4 py-4"
                style={{ borderColor: CLAUDE.primaryBorder }}
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-sky-700">
                  It identified
                </p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Reflected understanding">
                  {IDENTIFIED_ITEMS.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.04 }}
                    >
                      <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-900">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                <p className="text-[13px] font-medium leading-snug text-neutral-900">
                  &ldquo;Here&rsquo;s what I think you mean. Did I get it right?&rdquo;
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                  Confirm understanding
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    { label: "Yes — looks right", primary: true },
                    { label: "On-site devices only", primary: false },
                    { label: "Include locum doctors", primary: false },
                  ].map((chip) => (
                    <span
                      key={chip.label}
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
                      style={
                        chip.primary
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
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-neutral-600">
              People review meaning before configuration
            </p>
          </motion.div>
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-[13px] leading-relaxed text-neutral-600">
          That small pause changed everything. People stopped reviewing configuration. They started
          reviewing meaning.
        </p>
      </div>
    </figure>
  );
}

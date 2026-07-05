"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

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
      className="rounded-xl px-4 py-3.5"
      style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
    >
      <p className="text-[9px] uppercase tracking-[0.14em] text-white/35">Business request</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-white/78">&ldquo;{REQUEST}&rdquo;</p>
    </div>
  );
}

function FastPathArrow({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex flex-col items-center py-3" aria-hidden>
      <p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-[#c64545]/70">Immediate</p>
      <div className="h-6 w-px bg-gradient-to-b from-white/15 to-[#c64545]/55" />
      {!reduced ? (
        <motion.svg
          className="h-3.5 w-3.5 text-[#c64545]/80"
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
        <svg className="h-3.5 w-3.5 text-[#c64545]/80" viewBox="0 0 16 16" fill="none">
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
      <p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-[#f97316]/75">Pause</p>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#f97316]/35 bg-[#f97316]/10">
        {!reduced ? (
          <motion.span
            className="absolute inset-0 rounded-full border border-[#f97316]/25"
            animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <svg className="h-3.5 w-3.5 text-[#f97316]" viewBox="0 0 16 16" fill="none">
          <path d="M5.5 4.5v7M10.5 4.5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-2 h-5 w-px bg-gradient-to-b from-[#f97316]/45 to-[#5C97EE]/45" />
      <svg className="h-3.5 w-3.5 text-[#5C97EE]/75" viewBox="0 0 16 16" fill="none">
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
        className="overflow-hidden rounded-lg border border-white/10 px-5 py-7 sm:px-7 md:py-9"
        style={{ backgroundColor: "#0D1114" }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <header className="mx-auto max-w-lg text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
            Understanding Before Generation
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
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
            style={{ borderColor: "rgb(198 69 69 / 0.22)", backgroundColor: "rgb(31 30 27 / 0.45)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              First prototype
            </p>
            <p className="mt-2 text-[13px] text-white/70">Generate first, understand later</p>

            <div className="mt-5 flex flex-1 flex-col">
              <RequestBubble />
              <FastPathArrow reduced={Boolean(reduced)} />
              <div
                className="rounded-xl px-4 py-4"
                style={{
                  backgroundColor: "rgb(198 69 69 / 0.08)",
                  boxShadow: "inset 0 0 0 1px rgb(198 69 69 / 0.2)",
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-[#c64545]/75">Output</p>
                <p className="mt-2 text-[14px] font-medium leading-snug text-white/90">
                  &ldquo;Here&rsquo;s your policy.&rdquo;
                </p>
                <div className="mt-3 space-y-2">
                  {["Source", "Destination", "Protocol", "Ports"].map((field) => (
                    <div
                      key={field}
                      className="flex items-center justify-between rounded-lg px-3 py-2"
                      style={{ backgroundColor: "rgb(255 255 255 / 0.03)" }}
                    >
                      <span className="text-[10px] text-white/35">{field}</span>
                      <span className="h-1.5 w-12 rounded-full bg-white/10" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[10px] leading-relaxed text-white/35">
              Answered before proving it understood the request
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col rounded-2xl border px-5 py-6 sm:px-6"
            style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: "rgb(31 30 27 / 0.45)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Slowed experience
            </p>
            <p className="mt-2 text-[13px] text-white/70">Reflect understanding, then confirm</p>

            <div className="mt-5 flex flex-1 flex-col">
              <RequestBubble />
              <ReflectionPath reduced={Boolean(reduced)} />

              <div
                className="rounded-xl px-4 py-4"
                style={{
                  backgroundColor: CLAUDE.primaryMuted,
                  boxShadow: `inset 0 0 0 1px ${CLAUDE.primaryBorder}`,
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">It identified</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Reflected understanding">
                  {IDENTIFIED_ITEMS.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.04 }}
                    >
                      <span
                        className="inline-flex rounded-full px-2.5 py-1 text-[11px] text-white/78"
                        style={{
                          backgroundColor: `rgb(92 151 238 / ${0.1 + (index % 3) * 0.04})`,
                          boxShadow: `inset 0 0 0 1px rgb(92 151 238 / ${0.18 + (index % 3) * 0.06})`,
                        }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-3 rounded-xl px-4 py-3.5"
                style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
              >
                <p className="text-[13px] font-medium leading-snug text-white/88">
                  &ldquo;Here&rsquo;s what I think you mean. Did I get it right?&rdquo;
                </p>
              </div>

              <div
                className="mt-3 rounded-xl px-4 py-3"
                style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">Confirm understanding</p>
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
                              color: CLAUDE.text,
                            }
                          : {
                              borderColor: CLAUDE.border,
                              backgroundColor: CLAUDE.surfaceOverlay,
                              color: CLAUDE.textMuted,
                            }
                      }
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[10px] leading-relaxed text-white/35">
              People review meaning before configuration
            </p>
          </motion.div>
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-[13px] leading-relaxed text-white/55">
          That small pause changed everything. People stopped reviewing configuration. They started
          reviewing meaning.
        </p>
      </div>
    </figure>
  );
}

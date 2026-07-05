"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLAUDE, COPILOT_TYPE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const OLD_QUESTION = "How can AI generate firewall policies faster?";
const NEW_QUESTION = "How can AI help administrators understand a request before creating one?";

const ILLUSTRATION_ARIA_LABEL =
  "Problem reframe — shifting from asking how AI can generate firewall policies faster to how AI can help administrators understand a request before creating one.";

function ReframeArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center px-2 py-3 md:px-4 md:py-0" aria-hidden>
      <div className="flex flex-col items-center md:flex-row">
        <div className="h-5 w-px bg-gradient-to-b from-white/15 to-[#5C97EE]/50 md:hidden" />
        <svg className="my-1 h-4 w-4 text-[#93c5fd]/70 md:mx-1 md:my-0 md:rotate-[-90deg]" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3v10M8 13l-3-3M8 13l3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="hidden h-px w-8 bg-gradient-to-r from-white/15 to-[#5C97EE]/50 md:block" />
      </div>
    </div>
  );
}

export function PolicyCopilotProblemReframe() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-lg border border-white/10"
        style={{ backgroundColor: "#0D1114" }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <div className="border-b px-5 py-4 md:px-6 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
          <p className={COPILOT_TYPE.eyebrow} style={{ color: CLAUDE.textSoft }}>
            Reframe
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/70 md:text-[15px]">
            That insight completely reframed the problem. Instead of focusing on faster policy
            generation, we focused on better decision-making.
          </p>
        </div>

        <div className="flex flex-col px-5 py-5 md:flex-row md:items-stretch md:px-6 md:py-6">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35 }}
            className="flex flex-1 flex-col rounded-xl border px-4 py-4 md:px-5 md:py-5"
            style={{ borderColor: "rgb(198 69 69 / 0.22)", backgroundColor: "rgb(198 69 69 / 0.05)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              We stopped asking
            </p>
            <blockquote className="mt-3 flex flex-1 items-center">
              <p className="text-[15px] font-medium leading-snug text-white/55 md:text-[16px]">
                &ldquo;{OLD_QUESTION}&rdquo;
              </p>
            </blockquote>
            <p className="mt-3 text-[11px] leading-relaxed text-white/35">Speed-first framing</p>
          </motion.div>

          <ReframeArrow />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-1 flex-col rounded-xl border px-4 py-4 md:px-5 md:py-5"
            style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#93c5fd]/80">
              We started asking
            </p>
            <blockquote className="mt-3 flex flex-1 items-center">
              <p className="text-[15px] font-medium leading-snug text-white md:text-[16px]">
                &ldquo;{NEW_QUESTION}&rdquo;
              </p>
            </blockquote>
            <p className="mt-3 text-[11px] leading-relaxed text-[#93c5fd]/70">Understanding-first framing</p>
          </motion.div>
        </div>

        <div
          className="border-t px-5 py-4 md:px-6 md:py-5"
          style={{ borderColor: CLAUDE.hairline, backgroundColor: "rgb(92 151 238 / 0.06)" }}
        >
          <p className="text-[13px] leading-relaxed text-white/75 md:text-[14px]">
            That shift became the foundation for everything we designed next.
          </p>
        </div>
      </motion.div>
    </figure>
  );
}

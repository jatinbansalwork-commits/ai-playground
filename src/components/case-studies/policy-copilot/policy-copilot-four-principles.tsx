"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const PRINCIPLES = [
  {
    number: "01",
    title: "Start with intent.",
    detail: "People naturally describe outcomes before they think about implementation.",
  },
  {
    number: "02",
    title: "Reflect before generating.",
    detail: "The AI should confirm its understanding before creating a policy.",
  },
  {
    number: "03",
    title: "Explain every recommendation.",
    detail: "Trust comes from understanding why, not simply accepting what.",
  },
  {
    number: "04",
    title: "Keep humans in control.",
    detail: "AI can recommend, but accountability always belongs to the administrator.",
  },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Four design principles for Policy Copilot: start with intent, reflect before generating, explain every recommendation, and keep humans in control.";

export function PolicyCopilotFourPrinciples() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-lg border border-white/10 px-4 py-5 sm:px-5 md:py-6"
        style={{ backgroundColor: "#0D1114" }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {PRINCIPLES.map((principle, index) => (
            <motion.li
              key={principle.number}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-xl border p-4"
              style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.surface }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-semibold tracking-wide text-[#93c5fd]"
                  style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
                  aria-hidden
                >
                  {principle.number}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm font-medium leading-snug text-white">{principle.title}</p>
                  <p className="text-[12px] leading-relaxed text-white/55">{principle.detail}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-4 border-t border-white/10 pt-4 text-center text-[12px] leading-relaxed text-[#93c5fd]/80 sm:text-[13px]">
          These four principles became the foundation for every interaction we designed.
        </p>
      </motion.div>
    </figure>
  );
}

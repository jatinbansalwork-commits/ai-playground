"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EDITORIAL as CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

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
        className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white px-4 py-5 sm:px-5 md:py-6 case-study-light-panel"
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {PRINCIPLES.map((principle, index) => (
            <motion.li
              key={principle.number}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-xl border bg-white p-4 shadow-sm"
              style={{ borderColor: CLAUDE.primaryBorder }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-semibold tracking-wide text-sky-700"
                  style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: CLAUDE.primaryMuted }}
                  aria-hidden
                >
                  {principle.number}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm font-semibold leading-snug text-neutral-900">
                    {principle.title}
                  </p>
                  <p className="text-[13px] leading-relaxed text-neutral-600">{principle.detail}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-4 border-t border-neutral-200 pt-4 text-center text-[13px] leading-relaxed text-sky-800">
          These four principles became the foundation for every interaction we designed.
        </p>
      </motion.div>
    </figure>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { label: "Business Request", shortLabel: "Request" },
  { label: "Recognise Users", shortLabel: "Users" },
  { label: "Identify Applications", shortLabel: "Apps" },
  { label: "Detect Missing Information", shortLabel: "Gaps" },
  { label: "Confirm Intent", shortLabel: "Confirm" },
  { label: "Generate Draft Policy", shortLabel: "Draft" },
] as const;

function StepIcon({ index }: { index: number }) {
  const className = "h-5 w-5 text-white/75";
  switch (index) {
    case 0:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M5 3.5h10a1 1 0 0 1 1 1v11l-3.5-2-3 2-3-2-3.5 2V4.5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 1:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="7" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M3.5 15.5c.8-2 2.6-3 4.5-3s3.7 1 4.5 3M11 15.5c.6-1.6 2-2.5 3.5-2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 2:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
          <rect x="11" y="3.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
          <rect x="3.5" y="11" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
          <rect x="11" y="11" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 3:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M10 7.2v3.3M10 13.2h.01"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 4:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="m6.8 10.2 2.1 2.1 4.6-4.8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M6 3.5h8l2 2v10.5H6V3.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M8.5 10.5h4M8.5 13h2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="m12.5 6.5 1.2 1.2-1.2 1.2"
            stroke="#f97316"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function FlowArrow({ index, reducedMotion }: { index: number; reducedMotion: boolean }) {
  return (
    <div
      className="relative mt-5 flex w-5 shrink-0 items-center justify-center self-start md:mt-5 md:w-7"
      aria-hidden
    >
      <svg className="h-2.5 w-full text-white/20" viewBox="0 0 28 10" fill="none">
        <path
          d="M1 5h20M18 2l5 3-5 3"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2.5 2.5"
        />
      </svg>
      {!reducedMotion ? (
        <motion.span
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.65)]"
          animate={{ x: [-9, 9], opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ) : (
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316]" />
      )}
    </div>
  );
}

export function PolicyCopilotIntentBeforeGenerationFlow() {
  const reducedMotion = useReducedMotion();

  return (
    <figure className="space-y-3">
      <div
        className="relative w-full overflow-x-hidden rounded-lg border border-white/10 px-3 py-5 sm:px-5 md:py-6"
        style={{ backgroundColor: "#0D1114" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <header className="mx-auto max-w-lg text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
            Intent Before Generation
          </p>
          <p className="mt-1.5 text-sm leading-snug text-white/55">
            A business request becomes structured understanding before any policy is generated.
          </p>
        </header>

        <div
          className="mt-5 flex justify-center overflow-x-auto overflow-y-visible pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Intent before generation flow: Business Request, Recognise Users, Identify Applications, Detect Missing Information, Confirm Intent, Generate Draft Policy"
        >
          <ol className="flex min-w-max items-start justify-center px-1 pt-0.5">
            {STEPS.map((step, index) => {
              const isGate = index === 4;
              const isOutput = index === 5;

              return (
                <li key={step.label} className="flex items-start">
                  <motion.div
                    className="flex w-[4.5rem] flex-col items-center gap-2 overflow-visible sm:w-[5.25rem] md:w-[6.5rem]"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <div className="relative overflow-visible px-1 pt-1">
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border bg-white/[0.03] md:h-11 md:w-11 ${
                          isGate
                            ? "border-[#f97316]/45 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]"
                            : isOutput
                              ? "border-emerald-400/35"
                              : "border-white/15"
                        }`}
                      >
                        <StepIcon index={index} />
                      </div>
                      <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-[#161b22] text-[8px] font-semibold text-white/55">
                        {index + 1}
                      </span>
                    </div>
                    <p
                      className="hidden text-center text-[10px] leading-snug text-white/70 md:block"
                      title={step.label}
                    >
                      {step.label}
                    </p>
                    <p className="text-center text-[9px] leading-snug text-white/70 md:hidden">
                      {step.shortLabel}
                    </p>
                  </motion.div>
                  {index < STEPS.length - 1 ? (
                    <FlowArrow index={index} reducedMotion={Boolean(reducedMotion)} />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </figure>
  );
}

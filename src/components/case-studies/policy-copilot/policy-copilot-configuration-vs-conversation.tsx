"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const FORM_FIELDS = ["Source", "Destination", "Application", "Protocol", "Zone", "Action"] as const;

const UNDERSTANDING_ROWS = [
  { label: "Request", value: "Doctors need secure EHR access" },
  { label: "Users", value: "Doctors-AD-Group" },
  { label: "Application", value: "EHR-Application-Object" },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Configuration versus conversation — a traditional firewall policy form with technical fields compared with a business request gradually transforming into structured understanding.";

function TransformArrow() {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden>
      <div className="h-5 w-px bg-gradient-to-b from-white/20 to-[#f97316]/50" />
      <svg className="h-3.5 w-3.5 text-[#f97316]/75" viewBox="0 0 16 16" fill="none">
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

export function PolicyCopilotConfigurationVsConversation() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <div
        className="overflow-hidden rounded-lg border border-white/10 px-6 py-8 sm:px-8 md:py-10"
        style={{ backgroundColor: "#0D1114" }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <header className="mx-auto max-w-md text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
            Configuration vs Conversation
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-white/50">
            Technical fields on the left. Business intent becoming structured understanding on the
            right.
          </p>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col rounded-2xl border px-5 py-6 sm:px-6 sm:py-7"
            style={{ borderColor: "rgb(198 69 69 / 0.22)", backgroundColor: "rgb(31 30 27 / 0.45)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Configuration
            </p>
            <p className="mt-2 text-[13px] text-white/70">Start with technical fields</p>
            <div className="mt-6 flex flex-1 flex-col justify-center space-y-3">
              {FORM_FIELDS.map((field) => (
                <div key={field} className="space-y-1.5">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/30">{field}</p>
                  <div
                    className="h-9 rounded-lg border border-dashed"
                    style={{ borderColor: CLAUDE.hairline, backgroundColor: "rgb(255 255 255 / 0.02)" }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[10px] leading-relaxed text-white/35">
              High cognitive load before meaning is clear
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="flex flex-col rounded-2xl border px-5 py-6 sm:px-6 sm:py-7"
            style={{ borderColor: CLAUDE.primaryBorder, backgroundColor: "rgb(31 30 27 / 0.45)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Conversation
            </p>
            <p className="mt-2 text-[13px] text-white/70">Start with business intent</p>

            <div className="mt-6 flex flex-1 flex-col">
              <div
                className="rounded-xl px-4 py-4"
                style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
              >
                <p className="text-[13px] leading-relaxed text-white/80">
                  &ldquo;Allow doctors to securely access patient records from hospital-managed
                  devices.&rdquo;
                </p>
              </div>

              <TransformArrow />

              <p className="mb-3 text-center text-[9px] uppercase tracking-[0.16em] text-white/35">
                Structured understanding
              </p>

              <div className="space-y-2.5">
                {UNDERSTANDING_ROWS.map((row, index) => (
                  <motion.div
                    key={row.label}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ duration: 0.32, delay: 0.1 + index * 0.07 }}
                    className="rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: `rgb(92 151 238 / ${0.06 + index * 0.04})`,
                      boxShadow: `inset 0 0 0 1px rgb(92 151 238 / ${0.12 + index * 0.08})`,
                    }}
                  >
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">{row.label}</p>
                    <p className="mt-1 text-[12px] leading-snug text-white/75">{row.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] leading-relaxed text-white/35">
              Meaning first — policy comes later
            </p>
          </motion.div>
        </div>
      </div>
    </figure>
  );
}

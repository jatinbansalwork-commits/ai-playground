"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  EDITORIAL,
  COPILOT_TYPE,
} from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

const REQUEST_CHANNELS = [
  { label: "Slack messages", icon: "slack" },
  { label: "Jira tickets", icon: "jira" },
  { label: "Emails", icon: "email" },
  { label: "Teams calls", icon: "teams" },
  { label: "Conversations with other teams", icon: "people" },
] as const;

const PRE_EDITOR_WORK = [
  "Gathered business context",
  "Reviewed documentation",
  "Checked existing policies",
  "Validated compliance requirements",
  "Coordinated with multiple stakeholders",
] as const;

const EDITOR_FIELDS = ["Source", "Destination", "Application", "Protocol", "Action"] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Research insight — business requests arrive through Slack, Jira, email, and calls; administrators complete context gathering and compliance work before opening the policy editor, where products incorrectly assume that hardest work is already done.";

function ChannelIcon({ type }: { type: (typeof REQUEST_CHANNELS)[number]["icon"] }) {
  const className = "h-3.5 w-3.5 shrink-0";
  switch (type) {
    case "slack":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M6.5 3.5h3v3h-3v-3zM3.5 6.5h3v3h-3v-3zM9.5 6.5h3v3h-3v-3zM6.5 9.5h3v3h-3v-3z"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      );
    case "jira":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4 4.5h8M4 8h5.5M4 11.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "email":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M2.5 4.5 8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "teams":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2.5" y="4" width="7" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
          <path d="M10 6.5h2.5a1 1 0 0 1 1 1v3.5h-3.5V6.5z" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M2.5 13c0-2 1.7-3.2 3.5-3.2S9.5 11 9.5 13"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <circle cx="11" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1" />
          <path
            d="M9.5 13c.3-1.4 1-2.2 2.5-2.2"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function FlowConnector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-3" aria-hidden>
      {label ? (
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
          {label}
        </p>
      ) : null}
      <div className="h-6 w-px bg-gradient-to-b from-orange-400/50 via-sky-500/50 to-neutral-300" />
      <svg className="mt-0.5 h-3 w-3 text-neutral-500" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 4v8M8 12l-2.5-2.5M8 12l2.5-2.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function PhaseLabel({
  step,
  title,
  tone,
}: {
  step: string;
  title: string;
  tone: "warm" | "primary" | "muted";
}) {
  const colors =
    tone === "warm"
      ? { text: "#C2410C", border: "rgb(234 88 12 / 0.35)", bg: "#FFF7ED" }
      : tone === "primary"
        ? { text: EDITORIAL.primaryActive, border: EDITORIAL.primaryBorder, bg: EDITORIAL.primaryMuted }
        : { text: EDITORIAL.textMuted, border: EDITORIAL.borderStrong, bg: "#F5F5F5" };

  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-semibold tabular-nums"
        style={{ color: colors.text, borderColor: colors.border, backgroundColor: colors.bg }}
      >
        {step}
      </span>
      <p className="text-[13px] font-semibold leading-snug text-neutral-900">{title}</p>
    </div>
  );
}

export function PolicyCopilotWorkBeforeFirewall() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-lg border border-neutral-200 case-study-light-panel"
        style={{ backgroundColor: EDITORIAL.bg }}
        aria-label={ILLUSTRATION_ARIA_LABEL}
      >
        <div className="border-b border-neutral-200 px-5 py-4 md:px-6 md:py-5">
          <p className={COPILOT_TYPE.eyebrow} style={{ color: EDITORIAL.textMuted }}>
            Research insight
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-700 md:text-base">
            One thing surprised me during research. Administrators rarely started inside the
            firewall. Their work usually began somewhere else&mdash;long before anyone opened a
            policy editor.
          </p>
        </div>

        <div className="space-y-0 px-5 py-5 md:px-6 md:py-6">
          <motion.section
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-orange-200 bg-orange-50/80 p-4 md:p-5"
          >
            <PhaseLabel step="1" title="Where business requests first appeared" tone="warm" />
            <ul className="flex flex-wrap gap-2" aria-label="Where business requests first appeared">
              {REQUEST_CHANNELS.map((channel, index) => (
                <motion.li
                  key={channel.label}
                  initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: index * 0.04 }}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-3 py-1.5 text-[12px] font-medium leading-snug text-orange-900"
                >
                  <ChannelIcon type={channel.icon} />
                  {channel.label}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <FlowConnector label="Before the editor" />

          <motion.section
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-xl border p-4 md:p-5"
            style={{
              borderColor: EDITORIAL.primaryBorder,
              backgroundColor: "rgb(239 246 255 / 0.85)",
            }}
          >
            <PhaseLabel step="2" title="The work products never saw" tone="primary" />
            <p className="mb-3 text-[13px] leading-relaxed text-neutral-700">
              Before they even opened the policy editor, they had already:
            </p>
            <ul
              className="grid gap-2 sm:grid-cols-2"
              aria-label="Work completed before opening the policy editor"
            >
              {PRE_EDITOR_WORK.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.08 + index * 0.05 }}
                  className={`flex items-center justify-center gap-2.5 rounded-lg border border-sky-200 bg-white px-3 py-2.5 text-center shadow-sm ${
                    index === PRE_EDITOR_WORK.length - 1 ? "sm:col-span-2 sm:mx-auto sm:max-w-md" : ""
                  }`}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: EDITORIAL.primaryMuted,
                      color: EDITORIAL.primaryActive,
                    }}
                    aria-hidden
                  >
                    <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 8.5l2.5 2.5 5.5-5.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-neutral-800">{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-800">
              The hardest part of the job
            </p>
          </motion.section>

          <FlowConnector />

          <motion.section
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4 md:p-5"
          >
            <PhaseLabel step="3" title="Where products start" tone="muted" />
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {EDITOR_FIELDS.map((field) => (
                <div key={field} className="space-y-1">
                  <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    {field}
                  </p>
                  <div className="h-8 rounded-md border border-dashed border-neutral-300 bg-white" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[12px] leading-relaxed text-neutral-600">
              Assumes steps 1 and 2 are already complete
            </p>
          </motion.section>
        </div>

        <div className="border-t border-neutral-200 bg-sky-50/80 px-5 py-4 md:px-6 md:py-5">
          <p className="text-[14px] leading-relaxed text-neutral-800 md:text-[15px]">
            By the time they reached the firewall, most of the thinking had already happened. The
            policy editor simply assumed all of that work was complete&mdash;even though it was the
            hardest part of the job.
          </p>
        </div>
      </motion.div>
    </figure>
  );
}

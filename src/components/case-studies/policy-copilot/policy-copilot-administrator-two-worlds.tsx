"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getJbIllustration } from "@/lib/jb-illustration-library";

const ILLUSTRATION_ARIA_LABEL =
  "A conceptual illustration showing business stakeholders speaking in business outcomes while the firewall expects identities, applications, security zones, protocols, and policy objects. A security administrator stands between the two, translating one language into the other.";

const LEGEND = [
  {
    label: "Business outcomes",
    detail: "Stakeholders speak in plain language",
    tone: "text-[#fb923c]",
    border: "border-[#fb923c]/25",
  },
  {
    label: "Translation",
    detail: "Administrator bridges both sides",
    tone: "text-[#93c5fd]",
    border: "border-white/10",
  },
  {
    label: "Firewall expects",
    detail: "Identities, zones, protocols, policies",
    tone: "text-[#93c5fd]",
    border: "border-[#60a5fa]/25",
  },
] as const;

export function PolicyCopilotAdministratorTwoWorlds() {
  const reduced = useReducedMotion();

  return (
    <figure className="space-y-3">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-lg border border-white/10"
        style={{ backgroundColor: "#0D1114" }}
      >
        <div className="relative bg-[#0a0e11]">
          <img
            src={getJbIllustration("policy-copilot-administrator-two-worlds")}
            alt={ILLUSTRATION_ARIA_LABEL}
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="grid border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
          {LEGEND.map((item) => (
            <div
              key={item.label}
              className={`border-b px-4 py-3.5 last:border-b-0 sm:border-b-0 sm:px-5 ${item.border}`}
            >
              <p className={`text-[11px] font-medium tracking-wide ${item.tone}`}>{item.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </figure>
  );
}

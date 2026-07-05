"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COPILOT_SECONDARY_STARTS, INTENT_CARD_EXAMPLE } from "@/components/case-studies/policy-copilot/policy-copilot-data";
import { CLAUDE } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import {
  CopilotMark,
  PolicyCopilotFrame,
  PolicyCopilotSidebar,
  Stagger,
} from "@/components/case-studies/policy-copilot/policy-copilot-shell";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const spring = { type: "spring" as const, stiffness: 360, damping: 28 };

export function PolicyCopilotHome({
  contentOnly = false,
  compact = false,
  onBegin,
  onRecentSelect,
  onSecondarySelect,
}: {
  contentOnly?: boolean;
  compact?: boolean;
  onBegin: () => void;
  onRecentSelect: (prompt: string) => void;
  onSecondarySelect: (prompt: string) => void;
}) {
  const reduced = useReducedMotion();

  const main = (
    <main className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center overflow-y-auto",
            compact ? "px-3 py-3 md:px-5" : "px-4 py-5 md:px-8",
          )}
        >
          <Stagger delay={0.05}>
            <div className="flex flex-col items-center">
              <CopilotMark size={compact ? 40 : 52} glow={!compact} />
              <h1
                className={cn(
                  "max-w-md text-center font-normal leading-snug tracking-tight",
                  compact
                    ? "mt-3 text-[13px] md:text-[15px]"
                    : "mt-5 text-[15px] md:text-[18px]",
                )}
                style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
              >
                What policy do you need?
              </h1>
              <p
                className={cn(
                  "mt-1.5 max-w-sm text-center leading-relaxed",
                  compact ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-[11px]",
                )}
                style={{ color: CLAUDE.textMuted }}
              >
                Describe it in plain language. Review and test before anything goes live.
              </p>
            </div>
          </Stagger>

          <Stagger delay={0.12} className={cn("w-full", compact ? "mt-4 max-w-lg" : "mt-6 max-w-xl")}>
            <motion.button
              type="button"
              onClick={onBegin}
              whileHover={reduced ? undefined : { y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              transition={spring}
              className={cn(
                "group w-full rounded-2xl border text-left transition-colors",
                compact ? "p-3" : "p-4",
                "hover:border-[rgb(92_151_238/0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C97EE]",
              )}
              style={{
                backgroundColor: CLAUDE.surfaceRaised,
                borderColor: CLAUDE.borderStrong,
                boxShadow: "0 1px 0 rgb(250 249 245 / 0.04) inset",
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105"
                    style={{ backgroundColor: CLAUDE.primaryMuted }}
                  >
                    <CopilotMark size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[11px] font-medium" style={{ color: CLAUDE.text }}>
                        Describe your intent
                      </p>
                      <span
                        className="rounded-full border px-2 py-0.5 text-[7px] font-medium"
                        style={{
                          borderColor: CLAUDE.primaryBorder,
                          color: CLAUDE.primary,
                          backgroundColor: CLAUDE.primaryMuted,
                        }}
                      >
                        Recommended
                      </span>
                    </div>
                    <p className="mt-1.5 text-[9px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                      &lsquo;{INTENT_CARD_EXAMPLE}&rsquo;
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end sm:justify-center">
                  <span
                    className="inline-flex h-9 items-center rounded-full px-4 text-[12px] font-medium text-white transition-opacity group-hover:opacity-90"
                    style={{ backgroundColor: CLAUDE.primary }}
                  >
                    Begin →
                  </span>
                </div>
              </div>
              <p
                className="mt-3 flex items-center gap-1.5 text-[8px]"
                style={{ color: CLAUDE.textSecondary }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CLAUDE.validated }}
                  aria-hidden
                />
                You approve every step before it ships
              </p>
            </motion.button>
          </Stagger>

          <Stagger delay={0.2} className={cn("w-full", compact ? "mt-4 max-w-lg" : "mt-6 max-w-xl")}>
            <p className="mb-2 text-center text-[9px]" style={{ color: CLAUDE.textSoft }}>
              Or try another path
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {COPILOT_SECONDARY_STARTS.map((card, i) => (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => onSecondarySelect(card.prompt)}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.22 + i * 0.06 }}
                  whileHover={reduced ? undefined : { y: -1 }}
                  className="rounded-xl border p-3 text-left transition-colors hover:border-[rgb(92_151_238/0.25)]"
                  style={{ backgroundColor: CLAUDE.surface, borderColor: CLAUDE.border }}
                >
                  <p className="text-[10px] font-medium" style={{ color: CLAUDE.text }}>
                    {card.title}
                  </p>
                  <p className="mt-1 text-[9px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
                    {card.description}
                  </p>
                  <p className="mt-2 text-[9px] font-medium" style={{ color: CLAUDE.primary }}>
                    {card.linkLabel}
                  </p>
                </motion.button>
              ))}
            </div>
          </Stagger>
        </div>
      </main>
  );

  if (contentOnly) return main;

  return (
    <PolicyCopilotFrame>
      <PolicyCopilotSidebar
        variant="home"
        compact={compact}
        activeNav="lifecycle"
        onNavChange={() => {}}
        onRecentSelect={(item) => onRecentSelect(item.prompt)}
      />
      {main}
    </PolicyCopilotFrame>
  );
}

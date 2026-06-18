"use client";

import {
  CASE_STUDY_META_LABEL,
} from "@/components/case-studies/case-study-editorial";
import { useCaseStudyRevealAnalytics } from "@/hooks/use-case-study-reveal-analytics";
import { useCaseStudyRevealCountdownForSlug } from "@/hooks/use-case-study-reveal-countdown";

interface CaseStudyRevealCountdownProps {
  slug: string;
  label?: string;
}

function CountdownUnit({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center gap-1">
      <span className="font-mono text-3xl font-medium tabular-nums tracking-tight text-white md:text-4xl">
        {value}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
        {unit}
      </span>
    </div>
  );
}

export function CaseStudyRevealCountdown({
  slug,
  label = "Full case study unlocks in",
}: CaseStudyRevealCountdownProps) {
  const { ready, isRevealed, countdown, remainingMs } =
    useCaseStudyRevealCountdownForSlug(slug);

  useCaseStudyRevealAnalytics({
    slug,
    ready,
    isRevealed,
    remainingMs,
  });

  if (!ready) {
    return (
      <div className="px-5 py-5 text-center" aria-hidden>
        <div className="mx-auto h-16 max-w-sm animate-pulse rounded-lg bg-white/5" />
      </div>
    );
  }

  if (isRevealed) {
    return (
      <div className="px-5 py-5 text-center">
        <p className={CASE_STUDY_META_LABEL}>Case study</p>
        <p className="mt-2 text-sm text-[#B794FF]">Now available to read.</p>
      </div>
    );
  }

  return (
    <div
      className="px-5 py-5 text-center"
      role="timer"
      aria-live="polite"
      aria-label={`${label} ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds`}
    >
      <p className={CASE_STUDY_META_LABEL}>{label}</p>
      <div className="mt-4 flex items-center justify-center gap-3 md:gap-4">
        <CountdownUnit value={countdown.hours} unit="Hours" />
        <span className="pb-5 font-mono text-2xl text-neutral-600" aria-hidden>
          :
        </span>
        <CountdownUnit value={countdown.minutes} unit="Minutes" />
        <span className="pb-5 font-mono text-2xl text-neutral-600" aria-hidden>
          :
        </span>
        <CountdownUnit value={countdown.seconds} unit="Seconds" />
      </div>
    </div>
  );
}

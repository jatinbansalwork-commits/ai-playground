"use client";

import { useId, useState } from "react";
import { CASE_STUDY_CAPTION } from "@/components/case-studies/case-study-editorial";
import { FOCUS_RING } from "@/lib/a11y";

const ROWS = [
  {
    id: "balance",
    n: "01",
    quote:
      "My money got deducted, but it doesn’t reflect in my invested balance.",
    insight:
      "Users treated mutual funds like a digital product and expected unit allotment to land instantly.",
  },
  {
    id: "in-progress",
    n: "02",
    quote:
      "My transaction status shows ‘In Progress’. Is it stuck due to some issue?",
    insight:
      "‘In Progress’ read as failure — users assumed the transfer was broken, not processing.",
  },
  {
    id: "two-days",
    n: "03",
    quote: "My transaction has been in progress for the last two days.",
    insight:
      "Allotment timelines never arrived early enough, so waiting felt like an unexplained delay.",
  },
  {
    id: "stuck",
    n: "04",
    quote: "My investment seems stuck for almost 4–5 days.",
    insight:
      "Nothing in the product explained why allotment takes time or what happens behind the scenes.",
  },
] as const;

type RowId = (typeof ROWS)[number]["id"];

function Connector({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
        active
          ? "border-[#1F7A4C]/40 bg-[#D8F0E3] text-[#145C38]"
          : "border-neutral-200 bg-white text-neutral-400"
      }`}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 7h7.5M7.5 3.5 11 7l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Quote → insight synthesis map for Piggy support research.
 * Paired rows make the mapping explicit; hover highlights the full pair.
 */
export function PiggyResearchSynthesisMap() {
  const titleId = useId();
  const descId = useId();
  const [active, setActive] = useState<RowId>(ROWS[0].id);

  return (
    <figure
      className="mx-auto w-full max-w-4xl"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseLeave={() => setActive(ROWS[0].id)}
    >
      <p id={descId} className="sr-only">
        Research synthesis map. Four user quotes about stuck or delayed mutual
        fund investments, each paired with the matching analysis insight about
        expectation, status language, timing, and education.
      </p>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#FAFAF8]">
        <header className="border-b border-neutral-200/80 px-5 py-5 sm:px-7 sm:py-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
            Support research
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
            Quote to Insight
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-[15px]">
            What users said in tickets, and what we read underneath — the
            expectation gaps that turned normal allotment into support volume.
          </p>
        </header>

        {/* Column labels — desktop */}
        <div
          className="hidden grid-cols-[4.5rem_1fr_2.5rem_1fr] gap-4 border-b border-neutral-200/70 px-5 py-3 sm:px-7 md:grid"
          aria-hidden
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-400">
            #
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            What users said
          </span>
          <span />
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#145C38]">
            What we analysed
          </span>
        </div>

        <ul className="divide-y divide-neutral-200/80" role="list">
          {ROWS.map((row) => {
            const on = active === row.id;
            return (
              <li key={row.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onMouseEnter={() => setActive(row.id)}
                  onFocus={() => setActive(row.id)}
                  className={`group grid w-full grid-cols-1 gap-4 px-5 py-5 text-left transition-colors duration-200 sm:px-7 sm:py-6 md:grid-cols-[4.5rem_1fr_2.5rem_1fr] md:items-start md:gap-4 ${FOCUS_RING} ${
                    on ? "bg-white" : "bg-transparent hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums tracking-wider transition-colors duration-200 ${
                      on ? "text-[#1F7A4C]" : "text-neutral-400"
                    }`}
                  >
                    {row.n}
                  </span>

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400 md:hidden">
                      What users said
                    </p>
                    <p
                      className={`text-[15px] leading-relaxed transition-colors duration-200 md:text-base ${
                        on ? "text-neutral-900" : "text-neutral-700"
                      }`}
                    >
                      <span className="text-neutral-400" aria-hidden>
                        &ldquo;
                      </span>
                      {row.quote}
                      <span className="text-neutral-400" aria-hidden>
                        &rdquo;
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-start md:justify-center md:pt-1">
                    <Connector active={on} />
                  </div>

                  <div className="min-w-0">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1F7A4C]/70 md:hidden">
                      What we analysed
                    </p>
                    <p
                      className={`text-[15px] leading-relaxed transition-colors duration-200 md:text-base ${
                        on ? "font-medium text-[#145C38]" : "text-neutral-600"
                      }`}
                    >
                      {row.insight}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <figcaption id={titleId} className={`mt-3 ${CASE_STUDY_CAPTION}`}>
        Research Synthesis Map
      </figcaption>
    </figure>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { CASE_STUDY_CAPTION } from "@/components/case-studies/case-study-editorial";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FOCUS_RING } from "@/lib/a11y";

const MUTUAL = {
  id: "mutual-funds",
  label: "Mutual funds",
  value: 46,
  color: "#1F7A4C",
  soft: "#D8F0E3",
  ink: "#145C38",
  blurb:
    "Almost half of investment-domain tickets — the slice this case study focuses on.",
  isFocus: true,
} as const;

const OTHER = {
  id: "other",
  label: "Other investments",
  value: 54,
  color: "#C4B8A8",
  soft: "#F3EEE8",
  ink: "#6B6156",
  blurb: "Gold, stocks, deposits, and other products outside this project’s scope.",
  isFocus: false,
} as const;

const SEGMENTS = [MUTUAL, OTHER] as const;
type SegmentId = (typeof SEGMENTS)[number]["id"];

const SIZE = 236;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER = 98;
const INNER = 62;
const GAP_DEG = 2.5;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(
  startAngle: number,
  endAngle: number,
  outerR: number,
  innerR: number,
) {
  const large = endAngle - startAngle > 180 ? 1 : 0;
  const o0 = polar(CX, CY, outerR, startAngle);
  const o1 = polar(CX, CY, outerR, endAngle);
  const i1 = polar(CX, CY, innerR, endAngle);
  const i0 = polar(CX, CY, innerR, startAngle);
  return [
    `M ${o0.x} ${o0.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o1.x} ${o1.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i0.x} ${i0.y}`,
    "Z",
  ].join(" ");
}

/** Mutual funds starts at top so the story slice reads first. */
function segmentAngles() {
  const totalGap = GAP_DEG * SEGMENTS.length;
  const available = 360 - totalGap;
  let cursor = -90 + GAP_DEG / 2;
  const out: Record<SegmentId, { start: number; end: number }> = {
    "mutual-funds": { start: 0, end: 0 },
    other: { start: 0, end: 0 },
  };

  for (const segment of SEGMENTS) {
    const span = (segment.value / 100) * available;
    out[segment.id] = { start: cursor, end: cursor + span };
    cursor = cursor + span + GAP_DEG;
  }
  return out;
}

export function PiggyTicketBreakdownChart() {
  const reduced = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SegmentId>(MUTUAL.id);
  const [hovered, setHovered] = useState<SegmentId | null>(null);
  const [entered, setEntered] = useState(reduced);

  const focus = hovered ?? active;
  const focusSegment = SEGMENTS.find((s) => s.id === focus) ?? MUTUAL;
  const angles = segmentAngles();

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const node = rootRef.current;
    if (!node) return;

    let scrollRoot: Element | null = node.parentElement;
    while (scrollRoot) {
      const { overflowY } = getComputedStyle(scrollRoot);
      if (
        overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowY === "overlay"
      ) {
        break;
      }
      scrollRoot = scrollRoot.parentElement;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { root: scrollRoot, threshold: 0.15, rootMargin: "48px 0px" },
    );
    observer.observe(node);
    const fallback = window.setTimeout(() => setEntered(true), 600);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduced]);

  return (
    <figure
      ref={rootRef}
      className="mx-auto w-full max-w-4xl"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseLeave={() => setHovered(null)}
    >
      <p id={descId} className="sr-only">
        Interactive breakdown of investment-domain support tickets. Mutual funds
        are 46 percent — the focus of this case study. Other investments are 54
        percent. Activate a segment to read its detail.
      </p>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#FAFAF8]">
        <div className="flex flex-col gap-7 px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6 md:gap-8 md:px-8">
          <header className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
              Investment-domain tickets
            </p>
            <h3
              id={titleId}
              className="mt-2 text-balance text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl"
            >
              Where Support Volume Actually Sat
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-[15px]">
              Nearly half the investment tickets pointed at one product line —
              mutual funds — so that is where we dug in.
            </p>
          </header>

          <div className="space-y-2" aria-hidden>
            <div className="flex items-baseline justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.08em]">
              <span style={{ color: MUTUAL.ink }}>Mutual funds · 46%</span>
              <span style={{ color: OTHER.ink }}>Other · 54%</span>
            </div>
            <div className="relative flex h-2.5 overflow-hidden rounded-full bg-[#EDE8E1]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: MUTUAL.color }}
                initial={false}
                animate={{ width: entered ? `${MUTUAL.value}%` : "0%" }}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.div
                className="h-full flex-1 rounded-full"
                style={{ backgroundColor: OTHER.color }}
                initial={false}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.15 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12">
            <div className="relative mx-auto aspect-square w-full max-w-[240px]">
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="absolute inset-0 h-full w-full select-none"
                role="presentation"
              >
                <circle
                  cx={CX}
                  cy={CY}
                  r={(OUTER + INNER) / 2}
                  fill="none"
                  stroke="#EDE8E1"
                  strokeWidth={OUTER - INNER}
                />

                {SEGMENTS.map((segment) => {
                  const { start, end } = angles[segment.id];
                  const isOn = focus === segment.id;
                  return (
                    <path
                      key={segment.id}
                      d={donutSlice(start, end, OUTER, INNER)}
                      fill={segment.color}
                      opacity={isOn ? 1 : segment.isFocus ? 0.75 : 0.4}
                      className="cursor-pointer transition-opacity duration-200"
                      onMouseEnter={() => setHovered(segment.id)}
                      onClick={() => setActive(segment.id)}
                      onFocus={() => setActive(segment.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${segment.label}, ${segment.value}%`}
                      aria-pressed={active === segment.id}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
                <div className="px-3" role="status" aria-live="polite">
                  <p
                    className="text-[2.75rem] font-semibold leading-none tracking-tight tabular-nums md:text-5xl"
                    style={{ color: focusSegment.ink }}
                  >
                    {focusSegment.value}
                    <span className="text-2xl font-medium text-neutral-400">
                      %
                    </span>
                  </p>
                  <p className="mt-1.5 max-w-[8rem] text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                    {focusSegment.label}
                  </p>
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-3" role="list">
              {SEGMENTS.map((segment) => {
                const isOn = focus === segment.id;
                const isHero = segment.isFocus;

                return (
                  <li key={segment.id}>
                    <button
                      type="button"
                      aria-pressed={isOn}
                      onMouseEnter={() => setHovered(segment.id)}
                      onFocus={() => setActive(segment.id)}
                      onClick={() => setActive(segment.id)}
                      className={`group relative w-full rounded-2xl px-4 py-4 text-left transition-[background-color,box-shadow] duration-200 ${FOCUS_RING} ${
                        isHero
                          ? isOn
                            ? "bg-white shadow-[0_1px_0_rgb(0_0_0/0.04),0_12px_32px_rgb(20_92_56/0.1)] ring-1 ring-[#1F7A4C]/25"
                            : "bg-white/70 ring-1 ring-neutral-200/80 hover:bg-white"
                          : isOn
                            ? "bg-white/90 ring-1 ring-neutral-200"
                            : "bg-transparent ring-1 ring-transparent hover:bg-white/50 hover:ring-neutral-200/70"
                      }`}
                    >
                      {isHero ? (
                        <span
                          className="absolute inset-y-3 left-0 w-1 rounded-full"
                          style={{ backgroundColor: segment.color }}
                          aria-hidden
                        />
                      ) : null}

                      <div
                        className={`flex items-start justify-between gap-4 ${isHero ? "pl-2" : ""}`}
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: segment.color }}
                              aria-hidden
                            />
                            <span
                              className={`text-sm font-semibold tracking-tight ${
                                isHero ? "text-neutral-900" : "text-neutral-700"
                              }`}
                            >
                              {segment.label}
                            </span>
                            {isHero ? (
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
                                style={{
                                  backgroundColor: segment.soft,
                                  color: segment.ink,
                                }}
                              >
                                Focus of this study
                              </span>
                            ) : null}
                          </div>
                          <p
                            className={`mt-2 text-sm leading-relaxed ${
                              isHero ? "text-neutral-600" : "text-neutral-500"
                            }`}
                          >
                            {segment.blurb}
                          </p>
                        </div>

                        <span
                          className="shrink-0 text-3xl font-semibold tabular-nums tracking-tight"
                          style={{
                            color: isOn || isHero ? segment.ink : "#A8A29E",
                          }}
                        >
                          {segment.value}
                          <span className="text-lg font-medium text-neutral-400">
                            %
                          </span>
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <figcaption className={`mt-3 ${CASE_STUDY_CAPTION}`}>
        Support Ticket Mix Across Investment Products
      </figcaption>
    </figure>
  );
}

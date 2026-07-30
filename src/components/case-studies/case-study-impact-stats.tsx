interface ImpactStat {
  value: string;
  label: string;
  /** Quieter supporting context under the label. */
  note?: string;
}

interface CaseStudyImpactStatsProps {
  items: ImpactStat[];
  className?: string;
  /**
   * `down` — emerald decrease cue (Key Impacts / ticket reductions).
   * `none` — plain display figures (counts, baselines).
   */
  trend?: "down" | "none";
}

function TrendDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0 text-emerald-600"
    >
      <path
        d="M10 4v10M10 14l-4-4M10 14l4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CaseStudyImpactStats({
  items,
  className = "",
  trend = "down",
}: CaseStudyImpactStatsProps) {
  return (
    <dl
      className={`grid grid-cols-1 gap-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-2 sm:gap-10 sm:p-8 ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="order-2 text-sm leading-snug text-neutral-600 md:text-base">
            {item.label}
          </dt>
          <dd className="order-1 m-0 flex items-center gap-2">
            {trend === "down" ? (
              <>
                <TrendDownIcon />
                <span className="sr-only">Decrease: </span>
              </>
            ) : null}
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-neutral-900 md:text-5xl">
              {item.value}
            </span>
          </dd>
          {item.note ? (
            <p className="order-3 m-0 text-xs leading-relaxed text-neutral-400 md:text-sm">
              {item.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

interface ImpactStat {
  value: string;
  label: string;
}

interface CaseStudyImpactStatsProps {
  items: ImpactStat[];
  className?: string;
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
}: CaseStudyImpactStatsProps) {
  return (
    <dl
      className={`grid grid-cols-1 gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8 ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="order-2 text-sm leading-relaxed text-neutral-500 md:text-base">
            {item.label}
          </dt>
          <dd className="order-1 m-0 flex items-center gap-2">
            <TrendDownIcon />
            <span className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              <span className="sr-only">Decrease: </span>
              {item.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

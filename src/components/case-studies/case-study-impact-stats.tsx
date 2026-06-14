interface ImpactStat {
  value: string;
  label: string;
}

interface CaseStudyImpactStatsProps {
  items: ImpactStat[];
}

function TrendDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0 text-emerald-400"
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

export function CaseStudyImpactStats({ items }: CaseStudyImpactStatsProps) {
  return (
    <dl className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <dt className="sr-only">{item.label}</dt>
          <dd className="flex items-center gap-2">
            <TrendDownIcon />
            <span className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {item.value}
            </span>
          </dd>
          <dd className="text-sm leading-relaxed text-neutral-400 md:text-base">
            {item.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

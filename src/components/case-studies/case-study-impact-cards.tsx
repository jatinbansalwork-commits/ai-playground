export interface ImpactCard {
  title: string;
  description: string;
  number?: number;
}

interface CaseStudyImpactCardsProps {
  items: ImpactCard[];
  className?: string;
}

export function CaseStudyImpactCards({
  items,
  className = "",
}: CaseStudyImpactCardsProps) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${className}`.trim()}
      aria-label="Impact outcomes"
    >
      {items.map((item, index) => (
        <article
          key={item.title}
          className={[
            "grid grid-cols-[3.5rem_1fr] items-start gap-x-4 gap-y-2 px-5 py-5 md:grid-cols-[4.5rem_1fr] md:gap-x-6 md:px-6 md:py-6",
            index < items.length - 1 ? "border-b border-white/10" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            className="pt-0.5 font-mono text-2xl font-medium tabular-nums leading-none text-[#B794FF] md:text-3xl"
            aria-hidden
          >
            {String(item.number ?? index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 space-y-2">
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-white">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

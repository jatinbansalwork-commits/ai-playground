interface ImpactCard {
  title: string;
  description: string;
}

interface CaseStudyImpactCardsProps {
  items: ImpactCard[];
}

export function CaseStudyImpactCards({ items }: CaseStudyImpactCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-white/15 p-6"
        >
          <h3 className="text-base font-semibold leading-snug text-[#B794FF] md:text-lg">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white md:text-base">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

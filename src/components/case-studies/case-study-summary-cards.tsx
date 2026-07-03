"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CASE_STUDY_WIDE_WRAPPER } from "@/components/case-studies/case-study-editorial";
import { CaseStudyH2 } from "@/components/case-studies/case-study-prose";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { resolveAssetUrl } from "@/lib/asset-cdn";

export type CaseStudySummaryCardVariant = "problems" | "solution" | "results";

export interface CaseStudySummaryCard {
  title: string;
  variant: CaseStudySummaryCardVariant;
  items?: ReactNode[];
  /** Full-card artwork — replaces emoji, title, and list when set. */
  imageSrc?: string;
  imageAlt?: string;
}

interface CaseStudySummaryCardsProps {
  cards: CaseStudySummaryCard[];
  className?: string;
  heading?: ReactNode;
}

const VARIANT_META: Record<
  CaseStudySummaryCardVariant,
  { accent: string; emoji: string }
> = {
  problems: {
    accent: "#d9b84a",
    emoji: "☹️",
  },
  solution: {
    accent: "#7eb8de",
    emoji: "📝",
  },
  results: {
    accent: "#72c9a8",
    emoji: "✨",
  },
};

export function CaseStudySummaryCards({
  cards,
  className = "",
  heading,
}: CaseStudySummaryCardsProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`case-study-summary ${CASE_STUDY_WIDE_WRAPPER} ${revealed ? "case-study-summary--revealed" : ""} ${className}`.trim()}
      aria-label="Project summary"
    >
      {heading ? (
        <div className="case-study-summary-heading">
          <CaseStudyH2 toc={false} className="font-normal tracking-normal">
            {heading}
          </CaseStudyH2>
        </div>
      ) : null}
      <div className="case-study-summary-cards">
        {cards.map((card, index) => {
          const meta = VARIANT_META[card.variant];

          return (
            <article
              key={card.title}
              data-variant={card.variant}
              className={`case-study-summary-card${card.imageSrc ? " case-study-summary-card--media" : ""}`.trim()}
              style={
                {
                  "--summary-accent": meta.accent,
                  "--summary-stagger": `${index * 90}ms`,
                } as React.CSSProperties
              }
            >
              {card.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveAssetUrl(card.imageSrc)}
                  alt={card.imageAlt ?? card.title}
                  className="case-study-summary-card__image"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="case-study-summary-card__surface">
                  <span className="case-study-summary-card__emoji" aria-hidden>
                    {meta.emoji}
                  </span>
                  <h2 className="case-study-summary-card__title">{card.title}</h2>
                  <ul className="case-study-summary-card__list">
                    {(card.items ?? []).map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

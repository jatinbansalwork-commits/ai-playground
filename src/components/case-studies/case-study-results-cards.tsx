import type { CSSProperties, ReactNode } from "react";
import { CASE_STUDY_WIDE_WRAPPER } from "@/components/case-studies/case-study-editorial";

export interface CaseStudyResultsCard {
  visual: ReactNode;
  title: ReactNode;
  description: string;
}

interface CaseStudyResultsCardsProps {
  cards: CaseStudyResultsCard[];
  className?: string;
}

/** Matches summary card accent colours — problems, solution, results. */
const RESULT_CARD_ACCENTS = ["#d9b84a", "#7eb8de", "#72c9a8"] as const;

function RatingVisual() {
  return (
    <div className="case-study-results-card__rating" aria-hidden>
      <p className="case-study-results-card__rating-value">4.4/5</p>
      <div className="case-study-results-card__stars">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="case-study-results-card__star case-study-results-card__star--full">
            ★
          </span>
        ))}
        <span className="case-study-results-card__star case-study-results-card__star--half">★</span>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="case-study-results-card__chat" aria-hidden>
      <p className="case-study-results-card__chat-bubble case-study-results-card__chat-bubble--muted">
        All clear for me
      </p>
      <p className="case-study-results-card__chat-bubble case-study-results-card__chat-bubble--accent">
        Yeah same
      </p>
    </div>
  );
}

function SmileyVisual() {
  return (
    <div className="case-study-results-card__smiley" aria-hidden>
      <span className="case-study-results-card__smiley-face">🙂</span>
    </div>
  );
}

export const CASE_STUDY_RESULTS_CARD_VISUALS = {
  rating: <RatingVisual />,
  chat: <ChatVisual />,
  smiley: <SmileyVisual />,
} as const;

export function CaseStudyResultsCards({
  cards,
  className = "",
}: CaseStudyResultsCardsProps) {
  return (
    <section
      className={`case-study-results ${CASE_STUDY_WIDE_WRAPPER} ${className}`.trim()}
      aria-label="Results outcomes"
    >
      <div className="case-study-results-cards">
        {cards.map((card, index) => (
          <article
            key={index}
            className="case-study-results-card"
            style={
              {
                "--summary-accent": RESULT_CARD_ACCENTS[index % RESULT_CARD_ACCENTS.length],
              } as CSSProperties
            }
          >
            <div className="case-study-results-card__surface">
              <div className="case-study-results-card__visual">{card.visual}</div>
              <h3 className="case-study-results-card__title not-italic">{card.title}</h3>
              <p className="case-study-results-card__description">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

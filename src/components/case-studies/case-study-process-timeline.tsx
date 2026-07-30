/**
 * Editorial Gantt-style design-process timeline for case studies.
 * Staggered overlapping phase bars across a short sprint (inspired by
 * common portfolio process charts — recreated, not copied as assets).
 */

type TimelineTone = "neutral" | "rose" | "violet" | "lime" | "sky";

interface TimelinePhase {
  label: string;
  /** 0–100 along the sprint axis */
  start: number;
  /** 0–100 along the sprint axis */
  end: number;
  tone: TimelineTone;
}

const TWO_WEEK_PHASES: readonly TimelinePhase[] = [
  { label: "Research", start: 0, end: 18, tone: "neutral" },
  { label: "Idea exploration", start: 12, end: 36, tone: "neutral" },
  { label: "Stakeholder feedback", start: 22, end: 55, tone: "rose" },
  { label: "Usability testing", start: 38, end: 58, tone: "rose" },
  { label: "Prototyping", start: 48, end: 70, tone: "violet" },
  { label: "Development", start: 55, end: 86, tone: "violet" },
  { label: "Launch", start: 74, end: 94, tone: "lime" },
  { label: "Measuring success metrics", start: 82, end: 100, tone: "sky" },
];

interface CaseStudyProcessTimelineProps {
  className?: string;
  /** Footer note under the chart. */
  caption?: string;
  phases?: readonly TimelinePhase[];
}

export function CaseStudyProcessTimeline({
  className = "",
  caption = "2 weeks (not to scale)",
  phases = TWO_WEEK_PHASES,
}: CaseStudyProcessTimelineProps) {
  const ariaLabel = `Design process timeline: ${phases
    .map((phase) => phase.label)
    .join(", ")}`;

  return (
    <figure
      className={`case-study-process-timeline !max-w-none ${className}`.trim()}
    >
      <div className="case-study-process-timeline__scroll">
        <div
          className="case-study-process-timeline__chart case-study-light-panel"
          role="img"
          aria-label={ariaLabel}
        >
          <div className="case-study-process-timeline__frame">
            <div className="case-study-process-timeline__weeks" aria-hidden>
              <span>Week 1</span>
              <span>Week 2</span>
            </div>
            <div className="case-study-process-timeline__midline" aria-hidden />
            <ol className="case-study-process-timeline__lanes">
              {phases.map((phase) => (
                <li
                  key={phase.label}
                  className="case-study-process-timeline__lane"
                >
                  <span
                    className={`case-study-process-timeline__bar case-study-process-timeline__bar--${phase.tone}`}
                    style={{
                      left: `${phase.start}%`,
                      width: `${Math.max(phase.end - phase.start, 8)}%`,
                    }}
                  >
                    {phase.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <figcaption className="case-study-process-timeline__caption">
        {caption}
      </figcaption>
    </figure>
  );
}

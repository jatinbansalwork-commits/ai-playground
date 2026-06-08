import { RADIAL_TIMELINE_LABELS } from "@/lib/cisco-case-studies";

const SIZE = 400;
const CENTER = SIZE / 2;
const OUTER = 156;
const INNER = 96;

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function PlatformRadialTimeline() {
  const labels = RADIAL_TIMELINE_LABELS;

  return (
    <div className="platform-radial" aria-hidden>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {Array.from({ length: 72 }).map((_, index) => {
          const angle = (Math.PI * 2 * index) / 72 - Math.PI / 2;
          const isMajor = index % 9 === 0;
          const length = isMajor ? 12 : 6;

          return (
            <line
              key={index}
              className="platform-radial-tick"
              x1={round(CENTER + Math.cos(angle) * (OUTER - length))}
              y1={round(CENTER + Math.sin(angle) * (OUTER - length))}
              x2={round(CENTER + Math.cos(angle) * OUTER)}
              y2={round(CENTER + Math.sin(angle) * OUTER)}
            />
          );
        })}

        <circle
          className="platform-radial-core"
          cx={CENTER}
          cy={CENTER}
          r={INNER / 2}
        />

        <polygon
          points={`${CENTER - 10},${CENTER - 14} ${CENTER - 10},${CENTER + 14} ${CENTER + 16},${CENTER}`}
          fill="#171717"
          opacity="0.65"
        />

        {labels.map((label, index) => {
          const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
          const x = round(CENTER + Math.cos(angle) * (OUTER + 18));
          const y = round(CENTER + Math.sin(angle) * (OUTER + 18));
          const rotate = round((angle * 180) / Math.PI);
          const flip = rotate > 90 || rotate < -90;

          return (
            <text
              key={label}
              className="platform-radial-label"
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${flip ? rotate + 180 : rotate}, ${x}, ${y})`}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

import {
  getSentimentBadgeClass,
  getSpeedBadgeClass,
  type Sentiment,
  type SpeedTier,
} from "@/components/prompt-fork/prompt-fork-config";

interface SpeedBadgeProps {
  latencyMs: number;
  tier: SpeedTier;
}

export function SpeedBadge({ latencyMs, tier }: SpeedBadgeProps) {
  const seconds = (latencyMs / 1000).toFixed(1);

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getSpeedBadgeClass(tier)}`}
    >
      {seconds}s
    </span>
  );
}

interface TokenBadgeProps {
  count: number;
}

export function TokenBadge({ count }: TokenBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-neutral-700 px-2 py-0.5 text-xs font-medium text-neutral-100">
      {count} tokens
    </span>
  );
}

interface SentimentBadgeProps {
  sentiment: Sentiment;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getSentimentBadgeClass(sentiment)}`}
    >
      {sentiment}
    </span>
  );
}

interface CostBadgeProps {
  cost: string;
}

export function CostBadge({ cost }: CostBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-200 ring-1 ring-inset ring-white/10">
      Output {cost}
    </span>
  );
}

interface TimerBadgeProps {
  label: string;
}

export function TimerBadge({ label }: TimerBadgeProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center rounded-md bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-white/10"
    >
      {label}
    </span>
  );
}

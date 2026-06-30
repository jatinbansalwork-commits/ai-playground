import type { ReactNode } from "react";

interface ActivationModelCard {
  id: string;
  name: string;
  headline: string;
  description: string;
  example: string;
  badge: string;
  accent: {
    border: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconStroke: string;
    glow: string;
  };
  icon: ReactNode;
}

function ExplicitIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
    </svg>
  );
}

function AmbientIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M7 14a4 4 0 1 1 0-8 5 5 0 0 1 9.9 1.1A3.5 3.5 0 1 1 18 16H7z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProactiveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M12 8.5v4M12 16h.01"
        strokeLinecap="round"
      />
      <path
        d="M10.3 4.5h3.4L20 18.5H4L10.3 4.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ACTIVATION_MODELS: ActivationModelCard[] = [
  {
    id: "explicit",
    name: "Explicit",
    headline: "Administrator asks for help",
    description:
      "The administrator intentionally starts the interaction.",
    example: "Create a policy allowing Engineering access to GitHub.",
    badge: "Maximum Control",
    accent: {
      border: "border-[#6B36FF]/25",
      badgeBg: "bg-[#6B36FF]/15",
      badgeText: "text-[#C9B0FF]",
      iconBg: "bg-[#6B36FF]/12",
      iconStroke: "text-[#B794FF]",
      glow: "from-[#6B36FF]/10",
    },
    icon: <ExplicitIcon className="h-5 w-5" />,
  },
  {
    id: "ambient",
    name: "Ambient",
    headline: "AI quietly assists",
    description:
      "Copilot quietly notices a missing requirement.",
    example: "This external access rule may require audit logging.",
    badge: "Low Interruption",
    accent: {
      border: "border-sky-500/25",
      badgeBg: "bg-sky-500/15",
      badgeText: "text-sky-300",
      iconBg: "bg-sky-500/12",
      iconStroke: "text-sky-400",
      glow: "from-sky-500/10",
    },
    icon: <AmbientIcon className="h-5 w-5" />,
  },
  {
    id: "proactive",
    name: "Proactive",
    headline: "AI intervenes when risk is detected",
    description: "Copilot detects meaningful risk or conflict.",
    example: "This rule may conflict with the HR access policy.",
    badge: "Highest Safety",
    accent: {
      border: "border-amber-500/25",
      badgeBg: "bg-amber-500/15",
      badgeText: "text-amber-300",
      iconBg: "bg-amber-500/12",
      iconStroke: "text-amber-400",
      glow: "from-amber-500/10",
    },
    icon: <ProactiveIcon className="h-5 w-5" />,
  },
];

interface CopilotActivationInfographicProps {
  className?: string;
}

export function CopilotActivationInfographic({
  className = "",
}: CopilotActivationInfographicProps) {
  return (
    <section
      className={`space-y-8 ${className}`.trim()}
      aria-label="Three Copilot activation models — Explicit, Ambient, and Proactive"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:gap-5">
        {ACTIVATION_MODELS.map((model) => (
          <article
            key={model.id}
            className={`group relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border bg-gradient-to-b ${model.accent.glow} to-transparent p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_12px_40px_-20px_rgba(0,0,0,0.65)] md:p-6 ${model.accent.border} bg-[#0D1114]/80`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${model.accent.iconBg} ${model.accent.iconStroke}`}
              >
                {model.icon}
              </span>
              <h3 className="text-sm font-semibold tracking-tight text-white">
                {model.name}
              </h3>
            </div>

            <p className="text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">
              {model.headline}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-[0.9375rem]">
              {model.description}
            </p>

            <blockquote
              className={`mt-5 border-l-2 pl-4 text-sm leading-relaxed text-neutral-300 md:text-[0.9375rem]`}
              style={{
                borderColor:
                  model.id === "explicit"
                    ? "rgb(107 54 255 / 0.55)"
                    : model.id === "ambient"
                      ? "rgb(14 165 233 / 0.55)"
                      : "rgb(245 158 11 / 0.55)",
              }}
            >
              &ldquo;{model.example}&rdquo;
            </blockquote>

            <div className="mt-auto pt-6">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${model.accent.badgeBg} ${model.accent.badgeText}`}
              >
                {model.badge}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="space-y-4 px-1">
        <div className="relative mx-auto max-w-3xl">
          <div
            className="h-px w-full bg-gradient-to-r from-[#6B36FF]/50 via-sky-500/40 to-amber-500/50"
            aria-hidden
          />
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-[8%] md:px-[10%]">
            {ACTIVATION_MODELS.map((model) => (
              <span
                key={model.id}
                className={`h-2 w-2 rounded-full ${
                  model.id === "explicit"
                    ? "bg-[#B794FF]"
                    : model.id === "ambient"
                      ? "bg-sky-400"
                      : "bg-amber-400"
                } ring-4 ring-[#0D1114]`}
                aria-hidden
              />
            ))}
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl items-center justify-between text-[11px] font-medium uppercase tracking-widest text-neutral-500">
          <span>Less AI intervention</span>
          <span>More AI intervention</span>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 text-center text-xs font-medium text-neutral-400">
          <span className="text-[#C9B0FF]">Explicit</span>
          <span className="text-sky-300">Ambient</span>
          <span className="text-amber-300">Proactive</span>
        </div>
      </div>
    </section>
  );
}

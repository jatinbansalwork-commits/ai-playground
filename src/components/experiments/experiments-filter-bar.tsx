"use client";

import type { ExperimentFilterId } from "@/lib/experiments-filters";
import { CRAFT_GALLERY_FILTERS } from "@/lib/experiments-filters";
import { FOCUS_RING } from "@/lib/a11y";

interface ExperimentsFilterBarProps {
  value: ExperimentFilterId;
  onChange: (value: ExperimentFilterId) => void;
}

export function ExperimentsFilterBar({
  value,
  onChange,
}: ExperimentsFilterBarProps) {
  return (
    <div
      className="experiments-filter-bar flex max-w-full flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Filter craft gallery"
    >
      {CRAFT_GALLERY_FILTERS.map((option) => {
        const active = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "all" : option.id)}
            className={[
              "rounded-full border px-4 py-2 text-xs font-medium tracking-normal whitespace-nowrap transition-colors",
              FOCUS_RING,
              active
                ? "border-white/[0.12] bg-[#333333] text-neutral-100"
                : "border-white/[0.08] bg-transparent text-neutral-400 hover:border-white/[0.12] hover:text-neutral-100",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

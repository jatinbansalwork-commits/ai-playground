"use client";

import { motion } from "framer-motion";
import type { ExperimentFilterId } from "@/lib/experiments-filters";
import { EXPERIMENTS_FILTERS } from "@/lib/experiments-filters";
import { EXPERIMENTS_TOGGLE } from "@/lib/experiments-bento";
import { FOCUS_RING } from "@/lib/a11y";
import { springSnappy } from "@/lib/spring";

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
      className={EXPERIMENTS_TOGGLE.track}
      role="group"
      aria-label="Filter experiments"
    >
      {EXPERIMENTS_FILTERS.map((option) => {
        const active = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`${EXPERIMENTS_TOGGLE.button} ${FOCUS_RING}`}
          >
            {active ? (
              <motion.span
                layoutId="experiments-filter-active-pill"
                className={EXPERIMENTS_TOGGLE.pill}
                transition={springSnappy}
                aria-hidden
              />
            ) : null}
            <span
              className={
                active
                  ? EXPERIMENTS_TOGGLE.labelActive
                  : EXPERIMENTS_TOGGLE.labelInactive
              }
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

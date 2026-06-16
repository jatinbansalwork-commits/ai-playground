"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";
import { scrollCaseStudyRootToTop } from "@/lib/case-study-a11y";
import { CASE_STUDY_FOOTER_SCROLL_INSET } from "@/components/case-studies/case-study-editorial";

const SHOW_AFTER_PX = 240;

function ScrollUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 14l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CaseStudyScrollUpButtonProps {
  scrollRootRef: RefObject<HTMLElement | null>;
}

export function CaseStudyScrollUpButton({
  scrollRootRef,
}: CaseStudyScrollUpButtonProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;

    const update = () => {
      setVisible(root.scrollTop > SHOW_AFTER_PX);
    };

    update();
    root.addEventListener("scroll", update, { passive: true });

    return () => {
      root.removeEventListener("scroll", update);
    };
  }, [scrollRootRef]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
          onClick={scrollCaseStudyRootToTop}
          aria-label="Scroll to top of case study"
          className={[
            TARGET_HIT_AREA,
            "fixed bottom-12 z-50 flex size-11 items-center justify-center",
            CASE_STUDY_FOOTER_SCROLL_INSET,
            "rounded-full border border-white/15 bg-[#1a1a1a]/90 text-neutral-300 shadow-lg backdrop-blur-sm",
            "transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white",
            FOCUS_RING,
          ].join(" ")}
        >
          <ScrollUpIcon />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

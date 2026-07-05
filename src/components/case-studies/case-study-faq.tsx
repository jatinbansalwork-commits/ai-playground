"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { CaseStudyH2 } from "@/components/case-studies/case-study-prose";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

export interface CaseStudyFaqItem {
  question: string;
  answer: string;
}

interface CaseStudyFaqProps {
  items: readonly CaseStudyFaqItem[];
  title?: string;
  className?: string;
}

function FaqItem({
  item,
  open,
  onToggle,
  panelId,
  buttonId,
}: {
  item: CaseStudyFaqItem;
  open: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-white md:py-6"
      >
        <span
          className={cn(
            "text-base font-medium leading-snug tracking-tight transition-colors md:text-lg",
            open ? "text-white" : "text-neutral-200 group-hover:text-white",
          )}
        >
          {item.question}
        </span>
        <motion.span
          aria-hidden
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-lg font-light leading-none text-neutral-500 transition-colors group-hover:text-neutral-300"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-5 text-base leading-relaxed text-neutral-400 md:pb-6">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function CaseStudyFaq({ items, title = "FAQ", className = "" }: CaseStudyFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section className={cn("w-full max-w-5xl mx-auto", className)} aria-label={title}>
      <CaseStudyH2 className="!mb-6 md:!mb-8">{title}</CaseStudyH2>
      <div className="border-t border-white/10">
        {items.map((item, index) => {
          const itemId = `${baseId}-faq-${index}`;
          const isOpen = openId === itemId;

          return (
            <FaqItem
              key={item.question}
              item={item}
              open={isOpen}
              panelId={`${itemId}-panel`}
              buttonId={`${itemId}-button`}
              onToggle={() => setOpenId(isOpen ? null : itemId)}
            />
          );
        })}
      </div>
    </section>
  );
}

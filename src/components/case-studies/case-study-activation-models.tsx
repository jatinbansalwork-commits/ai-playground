import type { ReactNode } from "react";
import { CASE_STUDY_LABEL } from "@/components/case-studies/case-study-editorial";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";

export interface ActivationModel {
  number: number;
  name: string;
  subtitle: string;
  description: string;
  example: ReactNode;
  takeaway: string;
  imageAlt: string;
  imageSrc?: string;
  /** Render a media placeholder when `imageSrc` is not set yet. */
  showImageSlot?: boolean;
  /** Place the image above or below the card copy — defaults to bottom. */
  imagePosition?: "top" | "bottom";
  /** Set to false to hide the “Example” label above `example`. */
  showExampleLabel?: boolean;
}

interface CaseStudyActivationModelsProps {
  items: ActivationModel[];
  className?: string;
  /** Large-screen column count — defaults to 2. */
  columns?: 1 | 2;
}

function ActivationModelQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-[#6B36FF] pl-4 text-sm font-medium leading-relaxed text-white md:text-base">
      {children}
    </blockquote>
  );
}

export function CaseStudyActivationModels({
  items,
  className = "",
  columns = 2,
}: CaseStudyActivationModelsProps) {
  const columnClass = columns === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2";

  return (
    <div
      className={`mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 ${columnClass} lg:gap-5 ${className}`.trim()}
      aria-label="Copilot activation models"
    >
      {items.map((item) => {
        const imagePosition = item.imagePosition ?? "bottom";
        const imageBlock =
          item.imageSrc || item.showImageSlot ? (
            <div
              className={
                imagePosition === "top"
                  ? "border-b border-white/10"
                  : "border-t border-white/10"
              }
            >
              <CaseStudyMedia
                aspect="video"
                borderless
                src={item.imageSrc}
                alt={item.imageAlt}
              />
            </div>
          ) : null;

        return (
        <article
          key={item.name}
          className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          {imagePosition === "top" ? imageBlock : null}
          <div className="flex flex-1 flex-col space-y-4 p-5 md:p-6">
            <div className="space-y-2">
              <span
                className="font-mono text-xs font-medium tabular-nums text-[#B794FF]"
                aria-hidden
              >
                {String(item.number).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-white">
                {item.name}
                {item.subtitle ? (
                  <span className="font-normal text-neutral-400"> — {item.subtitle}</span>
                ) : null}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
              {item.description}
            </p>

            <div className="space-y-3">
              {item.showExampleLabel !== false ? (
                <p className={CASE_STUDY_LABEL}>Example</p>
              ) : null}
              <div className="space-y-3 text-sm leading-relaxed text-neutral-300 md:text-base">
                {item.example}
              </div>
            </div>

            <p className="mt-auto text-sm leading-relaxed text-neutral-200 md:text-base">
              {item.takeaway}
            </p>
          </div>

          {imagePosition === "bottom" ? imageBlock : null}
        </article>
        );
      })}
    </div>
  );
}

export { ActivationModelQuote };

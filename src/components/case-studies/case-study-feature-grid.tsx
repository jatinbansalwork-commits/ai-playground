import type { ReactNode } from "react";
import { CaseStudyH2, CaseStudyParagraph } from "@/components/case-studies/case-study-prose";

export interface CaseStudyFeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface CaseStudyFeatureGridProps {
  items: CaseStudyFeatureItem[];
  className?: string;
}

function FeatureIconShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#6B36FF]/30 bg-[#6B36FF]/10 text-[#6B36FF]"
      aria-hidden
    >
      {children}
    </div>
  );
}

export function CaseStudyFeatureGrid({
  items,
  className = "",
}: CaseStudyFeatureGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 ${className}`.trim()}
    >
      {items.map((item) => (
        <article key={item.title} className="flex items-start gap-4">
          {item.icon}
          <div className="min-w-0 space-y-2">
            <CaseStudyH2>{item.title}</CaseStudyH2>
            <CaseStudyParagraph dense>{item.description}</CaseStudyParagraph>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TicketAnalysisIcon() {
  return (
    <FeatureIconShell>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </FeatureIconShell>
  );
}

export function UserResearchIcon() {
  return (
    <FeatureIconShell>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm12 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </FeatureIconShell>
  );
}

export function JourneyMappingIcon() {
  return (
    <FeatureIconShell>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6h18M3 12h12M3 18h18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    </FeatureIconShell>
  );
}

export function CompetitiveAnalysisIcon() {
  return (
    <FeatureIconShell>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v18M3 12h18M7 7l10 10M17 7 7 17"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </FeatureIconShell>
  );
}

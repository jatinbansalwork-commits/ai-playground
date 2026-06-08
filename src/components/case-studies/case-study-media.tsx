import { CASE_STUDY_CAPTION } from "@/components/case-studies/case-study-editorial";

interface CaseStudyMediaProps {
  label?: string;
  aspect?: "video" | "square" | "portrait";
  className?: string;
}

const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
} as const;

export function CaseStudyMedia({
  label,
  aspect = "video",
  className = "",
}: CaseStudyMediaProps) {
  return (
    <figure className={`space-y-3 ${className}`}>
      <div
        className={`w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 ${ASPECT_CLASS[aspect]}`}
        aria-hidden
      />
      {label ? (
        <figcaption className={CASE_STUDY_CAPTION}>{label}</figcaption>
      ) : null}
    </figure>
  );
}

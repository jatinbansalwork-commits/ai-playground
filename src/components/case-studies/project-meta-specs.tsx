import {
  CASE_STUDY_META_GRID,
  CASE_STUDY_META_INFO,
  CASE_STUDY_META_LABEL,
  CASE_STUDY_META_VALUE,
} from "@/components/case-studies/case-study-editorial";
import type { CaseStudyMetaSpecs as CaseStudyMetaSpecsData } from "@/lib/project-content";

interface ProjectMetaSpecsProps extends CaseStudyMetaSpecsData {}

export function ProjectMetaSpecs({
  services,
  client,
  location,
  infoText,
  liveLinkUrl,
}: ProjectMetaSpecsProps) {
  return (
    <div className={CASE_STUDY_META_GRID}>
      <div className="flex flex-col space-y-8 md:col-span-1">
        <div className="space-y-2">
          <h4 className={CASE_STUDY_META_LABEL}>Services</h4>
          <ul className={`${CASE_STUDY_META_VALUE} space-y-1`}>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <h4 className={CASE_STUDY_META_LABEL}>Client</h4>
          <p className={CASE_STUDY_META_VALUE}>{client}</p>
        </div>

        <div className="space-y-1">
          <h4 className={CASE_STUDY_META_LABEL}>Location</h4>
          <p className={CASE_STUDY_META_VALUE}>{location}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between space-y-6 md:col-span-2">
        <div className="space-y-2">
          <h4 className={CASE_STUDY_META_LABEL}>Info</h4>
          <p className={CASE_STUDY_META_INFO}>{infoText}</p>
        </div>

        {liveLinkUrl ? (
          <div className="pt-4 md:pt-0">
            <a
              href={liveLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm font-medium text-neutral-400 underline decoration-neutral-600 underline-offset-4 transition-all duration-200 hover:text-white hover:decoration-white"
            >
              See live project
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

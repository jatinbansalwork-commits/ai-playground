import {
  CASE_STUDY_META_GRID,
  CASE_STUDY_META_INFO,
  CASE_STUDY_META_LABEL,
  CASE_STUDY_META_VALUE,
} from "@/components/case-studies/case-study-editorial";
import {
  CASE_STUDY_EXTERNAL_LINK_CLASS,
  FOCUS_RING,
  TARGET_HIT_AREA,
  externalLinkLabel,
} from "@/lib/a11y";
import type { CaseStudyMetaSpecs as CaseStudyMetaSpecsData } from "@/lib/project-content";

interface ProjectMetaSpecsProps extends CaseStudyMetaSpecsData {}

export function ProjectMetaSpecs({
  services,
  client,
  location,
  infoText,
  liveLinkUrl,
  figmaUrl,
}: ProjectMetaSpecsProps) {
  return (
    <section className={CASE_STUDY_META_GRID} aria-label="Project details">
      <dl className="flex flex-col space-y-8 md:col-span-1">
        <div className="space-y-2">
          <dt className={CASE_STUDY_META_LABEL}>Services</dt>
          <dd>
            <ul className={`${CASE_STUDY_META_VALUE} space-y-1`}>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </dd>
        </div>

        <div className="space-y-1">
          <dt className={CASE_STUDY_META_LABEL}>Client</dt>
          <dd className={CASE_STUDY_META_VALUE}>{client}</dd>
        </div>

        <div className="space-y-1">
          <dt className={CASE_STUDY_META_LABEL}>Location</dt>
          <dd className={CASE_STUDY_META_VALUE}>{location}</dd>
        </div>
      </dl>

      <dl className="flex flex-col justify-between space-y-6 md:col-span-2">
        <div className="space-y-2">
          <dt className={CASE_STUDY_META_LABEL}>Info</dt>
          <dd className={CASE_STUDY_META_INFO}>{infoText}</dd>
          {figmaUrl ? (
            <dd>
              <a
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={externalLinkLabel("View in Figma")}
                className={`inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-4 font-sans text-sm font-medium text-neutral-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white ${TARGET_HIT_AREA} ${FOCUS_RING}`}
              >
                View in Figma
              </a>
            </dd>
          ) : null}
        </div>

        {liveLinkUrl ? (
          <dd className="pt-4 md:pt-0">
            <a
              href={liveLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={externalLinkLabel("See live project")}
              className={CASE_STUDY_EXTERNAL_LINK_CLASS}
            >
              See live project
            </a>
          </dd>
        ) : null}
      </dl>
    </section>
  );
}

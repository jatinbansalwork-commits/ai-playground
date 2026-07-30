"use client";

import Link from "next/link";
import { useProjectsPageAnalytics } from "@/hooks/use-projects-page-analytics";
import { resolveAssetUrl } from "@/lib/asset-cdn";
import {
  HOVER_THUMBNAIL_PLACEHOLDER,
  type ProjectRowItem,
} from "@/lib/projects-list-data";
import { FOCUS_RING } from "@/lib/a11y";
import { trackPortfolio1Click, trackProjectListClick } from "@/lib/analytics";
import {
  backContextForProjectsListNavigation,
  saveSessionBackContext,
} from "@/lib/session-navigation";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";
import { getCaseStudyContent } from "@/lib/project-content";

const PROJECTS_CARD_CLASS = [
  "projects-card group relative flex w-full flex-col overflow-hidden sm:flex-row sm:items-stretch",
  "text-neutral-900 transition-[filter] duration-150",
  FOCUS_RING,
].join(" ");

function ProjectCardChevron() {
  return (
    <span className="projects-card__cta" aria-hidden>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </span>
  );
}

function ProjectCardContent({ project }: { project: ProjectRowItem }) {
  const navigable = project.navigable !== false;
  const description = project.listAside ?? project.year;
  const tag =
    project.listTag ?? (navigable ? "Case Study" : "Coming Soon");
  const hasThumbnail =
    Boolean(project.hoverThumbnail) &&
    project.hoverThumbnail !== HOVER_THUMBNAIL_PLACEHOLDER;

  return (
    <>
      <div className="projects-card__media">
        <div className="projects-card__phone">
          {hasThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element -- Blob SVG card media
            <img
              src={resolveAssetUrl(project.hoverThumbnail)}
              alt=""
              className={
                project.thumbZoom != null
                  ? "projects-card__thumb projects-card__thumb--zoom"
                  : "projects-card__thumb"
              }
              style={
                project.thumbZoom != null
                  ? {
                      transform: `scale(${project.thumbZoom})`,
                      transformOrigin: "center center",
                    }
                  : undefined
              }
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className="projects-card__placeholder" aria-hidden>
              <span className="projects-card__placeholder-label">Image later</span>
            </div>
          )}
        </div>
      </div>

      <div className="projects-card__body">
        <div className="projects-card__copy">
          <h2 className="projects-card__title">{project.title}</h2>
          <p className="projects-card__description">{description}</p>
          <span className="projects-card__tag">{tag}</span>
        </div>
        <ProjectCardChevron />
      </div>
    </>
  );
}

interface ProjectCardProps {
  project: ProjectRowItem;
}

function ProjectCard({ project }: ProjectCardProps) {
  const overview = getCaseStudyContent(project.slug)?.overviewText;
  const navigable = project.navigable !== false;

  if (!navigable) {
    return (
      <div
        className={`${PROJECTS_CARD_CLASS} cursor-default`}
        title={overview}
        aria-label={`${project.title} — coming soon`}
        data-cursor-label="Coming Soon"
      >
        <ProjectCardContent project={project} />
      </div>
    );
  }

  return (
    <Link
      href={getProjectCaseStudyHref(project.slug)}
      className={PROJECTS_CARD_CLASS}
      title={overview}
      onClick={() => {
        saveSessionBackContext(backContextForProjectsListNavigation());
        trackProjectListClick({
          slug: project.slug,
          title: project.title,
          year: project.year,
        });
      }}
    >
      <ProjectCardContent project={project} />
    </Link>
  );
}

interface ProjectsListProps {
  projects: ProjectRowItem[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  useSubpageScrollReset();
  useProjectsPageAnalytics();

  return (
    <div className="projects-list-shell relative w-full">
      <nav className="flex w-full flex-col gap-4" aria-label="Projects">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <h2 className="pt-4 text-4xl font-medium tracking-tight text-neutral-900">
          <a
            href="https://itsjatin.framer.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3291ff]"
            onClick={() =>
              trackPortfolio1Click("https://itsjatin.framer.website/")
            }
          >
            Interested in portfolio 1.0? 👉
          </a>
        </h2>
      </nav>
    </div>
  );
}

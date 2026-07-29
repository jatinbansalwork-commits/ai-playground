"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectsHoverPreview } from "@/components/projects/projects-hover-preview";
import { useProjectsPageAnalytics } from "@/hooks/use-projects-page-analytics";
import type { ProjectRowItem } from "@/lib/projects-list-data";
import { PROJECTS_ROW_LINK_CLASS } from "@/lib/a11y";
import { trackPortfolio1Click, trackProjectListClick } from "@/lib/analytics";
import {
  backContextForProjectsListNavigation,
  saveSessionBackContext,
} from "@/lib/session-navigation";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";
import { getCaseStudyContent } from "@/lib/project-content";

interface ProjectRowProps {
  project: ProjectRowItem;
  onHoverStart: (project: ProjectRowItem) => void;
  onHoverEnd: () => void;
}

function ProjectRowContent({ project }: { project: ProjectRowItem }) {
  return (
    <>
      <span className="projects-row-leading">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.hoverThumbnail}
          alt=""
          className="projects-row-thumb"
          loading="lazy"
          decoding="async"
        />
        <span className="projects-row-title">{project.title}</span>
      </span>
      <span className="projects-row-spacer" aria-hidden />
      {project.listAside ? (
        <span className="projects-row-year projects-row-aside">
          {project.listAside}
        </span>
      ) : (
        <time className="projects-row-year" dateTime={project.year}>
          {project.year}
        </time>
      )}
    </>
  );
}

function ProjectRow({ project, onHoverStart, onHoverEnd }: ProjectRowProps) {
  const overview = getCaseStudyContent(project.slug)?.overviewText;
  const navigable = project.navigable !== false;

  if (!navigable) {
    return (
      <div
        className={`${PROJECTS_ROW_LINK_CLASS} cursor-default`}
        title={overview}
        aria-label={`${project.title} — coming soon`}
        data-cursor-label="Coming soon"
      >
        <ProjectRowContent project={project} />
      </div>
    );
  }

  return (
    <Link
      href={getProjectCaseStudyHref(project.slug)}
      className={PROJECTS_ROW_LINK_CLASS}
      title={overview}
      onClick={() => {
        saveSessionBackContext(backContextForProjectsListNavigation());
        trackProjectListClick({
          slug: project.slug,
          title: project.title,
          year: project.year,
        });
      }}
      onMouseEnter={() => onHoverStart(project)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(project)}
      onBlur={onHoverEnd}
    >
      <ProjectRowContent project={project} />
    </Link>
  );
}

interface ProjectsListProps {
  projects: ProjectRowItem[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  useSubpageScrollReset();
  useProjectsPageAnalytics();
  const [hoveredProject, setHoveredProject] = useState<ProjectRowItem | null>(
    null,
  );

  return (
    <div className="projects-list-shell relative w-full">
      <ProjectsHoverPreview project={hoveredProject} />

      <nav className="flex w-full flex-col space-y-8" aria-label="Projects">
        {projects.map((project) => (
          <div key={project.id} className="flex w-full flex-col">
            <ProjectRow
              project={project}
              onHoverStart={setHoveredProject}
              onHoverEnd={() => setHoveredProject(null)}
            />
          </div>
        ))}
        <h2 className="text-4xl font-medium tracking-tight text-neutral-900">
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

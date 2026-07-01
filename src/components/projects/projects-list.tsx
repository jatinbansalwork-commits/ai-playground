"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectsHoverPreview } from "@/components/projects/projects-hover-preview";
import { useProjectsPageAnalytics } from "@/hooks/use-projects-page-analytics";
import type { ProjectRowItem } from "@/lib/projects-list-data";
import { PROJECTS_ROW_LINK_CLASS } from "@/lib/a11y";
import { trackProjectListClick } from "@/lib/analytics";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { getProjectCaseStudyHref } from "@/lib/projects-registry";

interface ProjectRowProps {
  project: ProjectRowItem;
  onHoverStart: (project: ProjectRowItem) => void;
  onHoverEnd: () => void;
}

function ProjectRow({ project, onHoverStart, onHoverEnd }: ProjectRowProps) {
  return (
    <Link
      href={getProjectCaseStudyHref(project.slug)}
      className={PROJECTS_ROW_LINK_CLASS}
      onClick={() =>
        trackProjectListClick({
          slug: project.slug,
          title: project.title,
          year: project.year,
        })
      }
      onMouseEnter={() => onHoverStart(project)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(project)}
      onBlur={onHoverEnd}
    >
      <span className="projects-row-title">{project.title}</span>
      <span className="projects-row-spacer" aria-hidden />
      <time className="projects-row-year" dateTime={project.year}>
        {project.year}
      </time>
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
          <ProjectRow
            key={project.id}
            project={project}
            onHoverStart={setHoveredProject}
            onHoverEnd={() => setHoveredProject(null)}
          />
        ))}
      </nav>
    </div>
  );
}

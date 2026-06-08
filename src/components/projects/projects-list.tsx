import Link from "next/link";
import {
  getProjectCaseStudyHref,
  type ProjectEntry,
} from "@/lib/projects-registry";

interface ProjectRowProps {
  project: ProjectEntry;
}

function ProjectRow({ project }: ProjectRowProps) {
  const label = `${project.title} (${project.year})`;

  return (
    <Link
      href={getProjectCaseStudyHref(project.title)}
      className="projects-row group flex w-full flex-row items-center justify-between py-1 text-lg"
      aria-label={label}
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
  projects: ProjectEntry[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <nav className="flex w-full flex-col space-y-8" aria-label="Projects">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </nav>
  );
}

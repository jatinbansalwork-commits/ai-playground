import Link from "next/link";
import type { ProjectEntry } from "@/lib/projects-registry";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

interface ProjectRowProps {
  project: ProjectEntry;
}

function ProjectRow({ project }: ProjectRowProps) {
  const content = (
    <>
      <span className="projects-row-title">{project.title}</span>
      <span className="projects-row-spacer" aria-hidden />
      <time className="projects-row-year" dateTime={project.year}>
        {project.year}
      </time>
    </>
  );

  const className = "projects-row group";
  const label = `${project.title} (${project.year})`;
  const newTabProps = {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };

  if (isExternalHref(project.href) || project.external) {
    return (
      <a
        href={project.href}
        className={className}
        aria-label={label}
        {...newTabProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className={className}
      aria-label={label}
      {...newTabProps}
    >
      {content}
    </Link>
  );
}

interface ProjectsListProps {
  projects: ProjectEntry[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <nav className="projects-list" aria-label="Projects">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </nav>
  );
}

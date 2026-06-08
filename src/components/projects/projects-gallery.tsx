import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { PROJECTS_REGISTRY } from "@/lib/projects-registry";
import { ProjectsList } from "@/components/projects/projects-list";

export function ProjectsGallery() {
  return (
    <main
      data-sheet="projects"
      className="projects-page relative flex min-h-screen items-center justify-center text-[#ededed]"
    >
      <Link
        href="/"
        aria-label={`Back to ${SITE_NAME}`}
        className="absolute top-8 left-8 z-20 flex size-12 items-center justify-center text-4xl leading-none text-neutral-500 transition-colors hover:text-white md:left-12"
      >
        ←
      </Link>

      <div className="projects-page-content w-full max-w-[960px] px-8 md:px-32">
        <ProjectsList projects={PROJECTS_REGISTRY} />
      </div>
    </main>
  );
}

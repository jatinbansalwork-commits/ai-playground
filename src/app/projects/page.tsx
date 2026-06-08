import { ProjectsList } from "@/components/projects/projects-list";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { BACK_LINK_CLASS } from "@/lib/a11y";
import { SITE_NAME } from "@/lib/constants";
import { PROJECTS_REGISTRY } from "@/lib/projects-registry";

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      data-sheet="projects"
      className="projects-page fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-[#1a1a1a] px-4 text-white"
    >
      <ScrollResetLink
        href="/"
        scroll={true}
        aria-label={`Back to ${SITE_NAME}`}
        className={`absolute top-8 left-8 z-50 md:top-12 md:left-12 ${BACK_LINK_CLASS}`}
      >
        ←
      </ScrollResetLink>

      <div className="mx-auto flex w-full max-w-md flex-col md:w-[480px]">
        <h1 className="sr-only">Projects</h1>
        <ProjectsList projects={PROJECTS_REGISTRY} />
      </div>
    </main>
  );
}

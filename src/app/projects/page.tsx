import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ProjectsList } from "@/components/projects/projects-list";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { PROJECTS_REGISTRY } from "@/lib/projects-registry";

export default function ProjectsIndexPage() {
  return (
    <main
      id="main-content"
      data-sheet="projects"
      className="projects-page fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] px-4 text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <div className="mx-auto flex w-full max-w-md flex-col space-y-6 md:w-[480px]">
        <h1 className="sr-only">Projects</h1>
        <ProjectsList projects={PROJECTS_REGISTRY} />
      </div>
    </main>
  );
}

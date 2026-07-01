import { NavBackLinkLabel } from "@/components/navigation/nav-back-link-label";
import { ProjectsList } from "@/components/projects/projects-list";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { NAV_BACK_LINK_CLASS, backNavigationLabel } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { PROJECTS_LIST } from "@/lib/projects-list-data";

export default function ProjectsIndexPage() {
  return (
    <main
      id="main-content"
      data-sheet="projects"
      className="projects-page no-scrollbar fixed inset-0 z-10 flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background px-4 py-24 text-white"
    >
      <ScrollResetLink
        href={ROUTES.home}
        scroll={true}
        className={NAV_BACK_LINK_CLASS}
        aria-label={backNavigationLabel("Home")}
      >
        <NavBackLinkLabel destination="Home" />
      </ScrollResetLink>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center space-y-6 md:w-[672px]">
        <h1 className="sr-only">Projects</h1>
        <ProjectsList projects={PROJECTS_LIST} />
      </div>
    </main>
  );
}

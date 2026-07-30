import { NavBackLink } from "@/components/navigation/nav-back-link";
import { ProjectsList } from "@/components/projects/projects-list";
import { BACK_HOME } from "@/lib/session-navigation";
import { PROJECTS_LIST } from "@/lib/projects-list-data";

export default function ProjectsIndexPage() {
  return (
    <main
      id="main-content"
      data-sheet="projects"
      className="projects-page no-scrollbar fixed inset-0 z-10 flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-white px-4 py-24 text-neutral-900"
    >
      <NavBackLink href={BACK_HOME.href} destination="home" />

      <div className="mx-auto flex w-full max-w-[741px] flex-1 flex-col justify-start space-y-6">
        <h1 className="sr-only">Projects</h1>
        <ProjectsList projects={PROJECTS_LIST} />
      </div>
    </main>
  );
}

import { SessionNavBackLink } from "@/components/navigation/session-nav-back-link";
import { ProjectsList } from "@/components/projects/projects-list";
import { BACK_HOME } from "@/lib/session-navigation";
import { PROJECTS_LIST } from "@/lib/projects-list-data";

export default function ProjectsIndexPage() {
  return (
    <main
      id="main-content"
      data-sheet="projects"
      className="projects-page no-scrollbar fixed inset-0 z-10 flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background px-4 py-24 text-white"
    >
      <SessionNavBackLink fallback={BACK_HOME} />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center space-y-6 md:w-[672px]">
        <h1 className="sr-only">Projects</h1>
        <ProjectsList projects={PROJECTS_LIST} />
      </div>
    </main>
  );
}

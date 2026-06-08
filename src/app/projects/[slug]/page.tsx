import Link from "next/link";
import { notFound } from "next/navigation";
import { FOCUS_RING } from "@/lib/a11y";
import { PROJECT_CASE_STUDY_SLUGS } from "@/lib/projects-registry";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECT_CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  if (!PROJECT_CASE_STUDY_SLUGS.includes(slug as (typeof PROJECT_CASE_STUDY_SLUGS)[number])) {
    notFound();
  }

  const displayTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-start justify-between bg-[#1a1a1a] px-8 pt-24 pb-12 text-white selection:bg-white selection:text-black"
    >
      <nav className="fixed top-8 left-8 z-50" aria-label="Case study navigation">
        <Link
          href="/projects"
          className={`group flex min-h-11 items-center gap-2 text-sm font-normal text-neutral-400 transition-colors duration-200 hover:text-white ${FOCUS_RING}`}
        >
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          Back to Projects
        </Link>
      </nav>

      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
        <span className="mb-2 font-mono text-xs tracking-widest text-neutral-400 uppercase">
          Case Study Sandbox
        </span>
        <h1 className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
          {displayTitle}
        </h1>
        <p className="max-w-xl text-base leading-relaxed font-normal text-neutral-400">
          Detailed project overview, product scope analysis, interaction
          architectures, and design documentation assets are currently being
          compiled for this space.
        </p>
      </section>

      <footer className="mx-auto w-full max-w-3xl border-t border-white/[0.04] pt-8 font-mono text-[11px] text-neutral-600">
        © 2026 • Platform Routing Shell v1.0
      </footer>
    </main>
  );
}

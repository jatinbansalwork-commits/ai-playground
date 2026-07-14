export default function CaseStudyLoading() {
  return (
    <main
      id="main-content"
      data-sheet="case-study"
      className="case-study-main fixed inset-0 z-10 h-screen w-full overflow-y-auto bg-white px-4 pt-32 text-neutral-900 sm:px-8"
      aria-busy="true"
      aria-label="Loading case study"
    >
      <div className="mx-auto w-full max-w-5xl animate-pulse space-y-6">
        <div className="h-4 w-16 rounded bg-neutral-200" />
        <div className="h-12 w-3/4 max-w-xl rounded bg-neutral-200" />
        <div className="h-5 w-full max-w-2xl rounded bg-neutral-100" />
        <div className="h-5 w-5/6 max-w-2xl rounded bg-neutral-100" />
        <div className="mt-12 h-64 w-full rounded-lg bg-neutral-100" />
      </div>
    </main>
  );
}

export default function CaseStudyLoading() {
  return (
    <main
      id="main-content"
      data-sheet="case-study"
      className="case-study-main fixed inset-0 z-10 h-screen w-full overflow-y-auto bg-background px-4 pt-32 text-white sm:px-8"
      aria-busy="true"
      aria-label="Loading case study"
    >
      <div className="mx-auto w-full max-w-5xl animate-pulse space-y-6">
        <div className="h-4 w-16 rounded bg-white/10" />
        <div className="h-12 w-3/4 max-w-xl rounded bg-white/10" />
        <div className="h-5 w-full max-w-2xl rounded bg-white/5" />
        <div className="h-5 w-5/6 max-w-2xl rounded bg-white/5" />
        <div className="mt-12 h-64 w-full rounded-lg bg-white/5" />
      </div>
    </main>
  );
}

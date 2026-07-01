interface GalleryPageLoadingProps {
  label: string;
}

/** Route-level skeleton for Ideas and Craft gallery pages. */
export function GalleryPageLoading({ label }: GalleryPageLoadingProps) {
  return (
    <main
      id="main-content"
      className="ideas-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-background px-4 py-24 text-white sm:px-8"
      aria-busy="true"
      aria-label={label}
    >
      <div className="mx-auto w-full max-w-6xl animate-pulse space-y-10">
        <div className="h-4 w-12 rounded bg-white/10" />
        <div className="space-y-4 max-w-lg">
          <div className="h-10 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/5" />
          <div className="h-4 w-5/6 rounded bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-[4/3] w-full rounded-lg bg-white/5" />
              <div className="h-4 w-2/3 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

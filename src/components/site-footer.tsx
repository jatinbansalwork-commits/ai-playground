interface SiteFooterProps {
  /** Pin to viewport bottom — used on the index slider where document scroll is capped. */
  pinned?: boolean;
}

export function SiteFooter({ pinned = false }: SiteFooterProps) {
  return (
    <footer
      className={
        pinned
          ? "pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-[#6B36FF]/80 bg-[#6B36FF] py-3"
          : "mt-24 w-full border-t border-[#6B36FF]/80 bg-[#6B36FF] py-8"
      }
    >
      <div className="mx-auto flex w-full max-w-5xl justify-center px-6">
        <p className="text-center font-mono text-[11px] leading-relaxed tracking-wider text-white uppercase">
          2026 · Designed by JB · Amplified by AI.
        </p>
      </div>
    </footer>
  );
}

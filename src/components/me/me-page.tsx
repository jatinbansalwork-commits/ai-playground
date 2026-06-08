import Link from "next/link";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { SITE_NAME } from "@/lib/constants";

export function MePage() {
  return (
    <main
      data-sheet="me"
      className="relative flex min-h-screen items-center justify-center bg-[#1a1a1a] px-8 py-24 text-white"
    >
      <Link
        href="/"
        aria-label={`Back to ${SITE_NAME}`}
        className="absolute top-8 left-8 z-20 flex size-12 items-center justify-center text-4xl leading-none text-neutral-500 transition-colors hover:text-white md:left-12"
      >
        ←
      </Link>

      <MeIntroVideo variant="page" />
    </main>
  );
}

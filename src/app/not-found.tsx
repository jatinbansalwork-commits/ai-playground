import { ScrollResetLink } from "@/components/scroll-reset-link";
import { SITE_BACK_TYPEFACE } from "@/lib/a11y";
import {
  PRESENCE_ACCENT,
  PRESENCE_ACCENT_FOREGROUND,
  ROUTES,
  SITE_CANVAS,
} from "@/lib/constants";
import { SITE_BACK_LINK_STYLE } from "@/lib/fonts";

export default function NotFound() {
  return (
    <main
      id="main-content"
      data-sheet="not-found"
      className="fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-white"
      style={{ background: SITE_CANVAS }}
    >
      <div className="mx-auto max-w-md text-center">
        <p
          className="font-mono text-[11px] tracking-wider uppercase"
          style={{ color: PRESENCE_ACCENT }}
        >
          404
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight">
          This page ghosted us.
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Could this *be* any more missing? The link is gone — the craft
          isn&apos;t.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ScrollResetLink
            href={ROUTES.ciscoPolicyCopilot}
            scroll={true}
            className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              background: PRESENCE_ACCENT,
              color: PRESENCE_ACCENT_FOREGROUND,
            }}
          >
            Take me to Policy Copilot
          </ScrollResetLink>
          <ScrollResetLink
            href={ROUTES.home}
            scroll={true}
            className={`inline-flex min-h-11 items-center ${SITE_BACK_TYPEFACE} text-sm text-neutral-400 underline decoration-neutral-600 underline-offset-4 hover:text-white`}
            style={SITE_BACK_LINK_STYLE}
          >
            Back home
          </ScrollResetLink>
        </div>
      </div>
    </main>
  );
}

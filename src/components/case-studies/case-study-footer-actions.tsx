"use client";

import { usePathname } from "next/navigation";
import { AskJbChatButton } from "@/components/ai-chat/ask-jb-chat-button";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { CASE_STUDY_FOOTER_NAV_LABEL, FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";
import { buildCaseStudyChatPrompt } from "@/lib/ai-chat-open.client";
import { ROUTES } from "@/lib/constants";
import { getCaseStudyContent } from "@/lib/project-content";

const CASE_STUDY_BUTTON_CLASS = [
  TARGET_HIT_AREA,
  "h-11 w-full rounded-lg border border-white/15 bg-white/5 px-6 sm:w-auto",
  "font-sans text-sm font-medium text-neutral-300",
  "transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white",
  "touch-manipulation",
  FOCUS_RING,
].join(" ");

const CASE_STUDY_BUTTON_PRIMARY_CLASS = [
  TARGET_HIT_AREA,
  "h-11 w-full rounded-lg border border-[#6B36FF]/40 bg-[#6B36FF]/15 px-6 sm:w-auto",
  "font-sans text-sm font-medium text-[#D4BBFF]",
  "transition-colors hover:border-[#6B36FF]/60 hover:bg-[#6B36FF]/25 hover:text-white",
  "touch-manipulation",
  FOCUS_RING,
].join(" ");

interface CaseStudyFooterActionsProps {
  backHref: string;
}

export function CaseStudyFooterActions({ backHref }: CaseStudyFooterActionsProps) {
  const pathname = usePathname();
  const slug = pathname?.startsWith("/projects/")
    ? pathname.replace("/projects/", "").split("/")[0]
    : undefined;
  const study = slug ? getCaseStudyContent(slug) : undefined;
  const chatMessage = study ? buildCaseStudyChatPrompt(study.title) : undefined;

  return (
    <footer className="case-study-footer pt-12">
      <div className="flex min-h-11 items-center gap-4">
        <nav
          aria-label={CASE_STUDY_FOOTER_NAV_LABEL}
          className="flex w-full flex-1 flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <ScrollResetLink
            href={backHref}
            scroll={true}
            className={CASE_STUDY_BUTTON_PRIMARY_CLASS}
          >
            Back to projects
          </ScrollResetLink>

          {chatMessage ? (
            <AskJbChatButton
              variant="footer"
              source="case-study-footer"
              message={chatMessage}
              label="Ask JB about this project"
            />
          ) : null}

          <ScrollResetLink
            href={ROUTES.home}
            scroll={true}
            className={CASE_STUDY_BUTTON_CLASS}
          >
            Back to home
          </ScrollResetLink>
        </nav>

        <div className="size-11 shrink-0" aria-hidden />
      </div>
    </footer>
  );
}

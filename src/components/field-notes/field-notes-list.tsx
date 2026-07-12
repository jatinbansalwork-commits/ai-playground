"use client";

import Link from "next/link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { NavBackLink } from "@/components/navigation/nav-back-link";
import { PROJECTS_ROW_LINK_CLASS } from "@/lib/a11y";
import type { FieldNote } from "@/lib/field-notes-content";
import {
  BACK_HOME,
  backContextForNotesNavigation,
  saveSessionBackContext,
} from "@/lib/session-navigation";

interface FieldNotesListProps {
  notes: FieldNote[];
}

function FieldNoteRow({ note }: { note: FieldNote }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className={PROJECTS_ROW_LINK_CLASS}
      title={note.lede}
      onClick={() => saveSessionBackContext(backContextForNotesNavigation())}
    >
      <span className="projects-row-leading">
        <span className="projects-row-title">{note.title}</span>
      </span>
      <span className="projects-row-spacer" aria-hidden />
      <time className="projects-row-year" dateTime={note.date}>
        {note.date}
      </time>
    </Link>
  );
}

export function FieldNotesList({ notes }: FieldNotesListProps) {
  useSubpageScrollReset();

  return (
    <nav className="flex w-full flex-col space-y-8" aria-label="Field notes">
      {notes.map((note) => (
        <FieldNoteRow key={note.slug} note={note} />
      ))}
    </nav>
  );
}

export function FieldNotesPageShell({ notes }: FieldNotesListProps) {
  return (
    <main
      id="main-content"
      data-sheet="field-notes"
      className="field-notes-page no-scrollbar fixed inset-0 z-10 flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background px-4 py-24 text-white"
    >
      <NavBackLink href={BACK_HOME.href} destination={BACK_HOME.destination} />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center space-y-6 md:w-[672px]">
        <header className="space-y-3">
          <h1 className="sr-only">Field Notes</h1>
          <p className="font-sans text-sm leading-relaxed text-neutral-500">
            Process logs — problems, sketches, and what shipped.
          </p>
        </header>
        <FieldNotesList notes={notes} />
      </div>
    </main>
  );
}

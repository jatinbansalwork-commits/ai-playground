import type { CraftArticleBlock, CraftArticleSection } from "@/lib/craft-content";

export interface FieldNote {
  slug: string;
  title: string;
  date: string;
  lede: string;
  sections: CraftArticleSection[];
}

const fieldNotesRegistry: Record<string, FieldNote> = {
  "index-minimap": {
    slug: "index-minimap",
    title: "Field Note #1 — Index Minimap",
    date: "July 2026",
    lede:
      "How the homepage slider keeps orientation when nine frames live on one horizontal track.",
    sections: [
      {
        id: "problem",
        title: "Problem statement",
        blocks: [
          {
            type: "paragraph",
            text: "The portfolio index is a scroll-driven carousel: hero, recent work, galleries, contact, manifest. On a phone or trackpad, it is easy to overshoot a slide or lose track of where you are in the sequence.",
          },
        ],
      },
      {
        id: "solution-minimap",
        title: "Solution — Minimap",
        blocks: [
          {
            type: "paragraph",
            text: "A fixed minimap at the top maps scroll progress to discrete frames. Each line is a slide; the tracker shows the active position. Keyboard users get Prev/Next controls at the bottom with an aria-live slide counter.",
          },
          {
            type: "paragraph",
            text: "Clicking a minimap segment snaps the track to that frame and saves the index in session storage so back navigation from subpages restores the last slide.",
          },
        ],
      },
      {
        id: "solution-scroll-hint",
        title: "Solution — Scroll hint",
        blocks: [
          {
            type: "paragraph",
            text: "A dismissible hint appears on the hero until the user moves past frame zero, teaching horizontal scroll without blocking the first impression.",
          },
        ],
      },
    ],
  },
};

export const FIELD_NOTE_SLUGS = Object.keys(fieldNotesRegistry);

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotesRegistry[slug];
}

export function getAllFieldNotes(): FieldNote[] {
  return FIELD_NOTE_SLUGS.map((slug) => fieldNotesRegistry[slug]!);
}

export function getFieldNoteExcerpt(note: FieldNote, maxLength = 160): string {
  if (note.lede.length <= maxLength) return note.lede;
  return `${note.lede.slice(0, maxLength).trimEnd()}…`;
}

export function getAdjacentFieldNotes(slug: string): {
  prev: string | null;
  next: string | null;
} {
  const slugs = FIELD_NOTE_SLUGS;
  const index = slugs.indexOf(slug);
  return {
    prev: index > 0 ? slugs[index - 1]! : null,
    next: index >= 0 && index < slugs.length - 1 ? slugs[index + 1]! : null,
  };
}

export type { CraftArticleBlock };

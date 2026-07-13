/** JB's Field Notes #1 — Policy Copilot: chat vs policy draft. */

export type FieldNotesPolicyDemoId =
  | "in-thread-policy"
  | "living-workspace"
  | "intent-summary"
  | "final-approval";

export type FieldNotesBlock =
  | {
      type: "heading";
      id: string;
      text: string;
      /** Optional 20×20 avatar floated left of the heading. */
      avatarSrc?: string;
      avatarAlt?: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | { type: "divider" }
  | {
      type: "image";
      alt: string;
      src: string;
      width: number;
      height: number;
    }
  | {
      type: "demo";
      demo: FieldNotesPolicyDemoId;
    };

export const FIELD_NOTES_1_BLOCKS: FieldNotesBlock[] = [
  {
    type: "heading",
    id: "problem-statement",
    text: "Problem Statement",
    avatarSrc:
      "https://vpocozyaql1wuw3p.public.blob.vercel-storage.com/1517689946298.jpeg",
    avatarAlt: "",
  },
  {
    type: "paragraph",
    text: "A business request lands in chat as one sentence. The secure answer is a firewall policy with users, applications, zones, conditions, and compliance checks. During user testing, we found that administrators struggled to keep both the business request and the technical implementation in the same thread.",
  },
  {
    type: "heading",
    id: "solution-1-in-thread-draft",
    text: "Solution №1 — Drop the policy in the chat",
  },
  {
    type: "paragraph",
    text: "Easiest idea: when Copilot gets the request, paste the draft policy into the next message. Users, apps, rules—right there in the thread.",
  },
  {
    type: "paragraph",
    text: "Or a small card in the reply—“here's the policy”—so you don't even need another screen?",
  },
  {
    type: "demo",
    demo: "in-thread-policy",
  },
  {
    type: "paragraph",
    text: "Honestly, it helps for a first look. You can see what the AI thought you meant. But the moment you send another message, that draft is gone. Scroll up. Dig. Hope you find the right block.",
  },
  {
    type: "paragraph",
    text: "And chat is a bad place to review something you might edit and approve. A policy isn't a paragraph.",
  },
  {
    type: "paragraph",
    text: "The thread starts to feel like the finished work. It isn't. The policy is.",
  },
  {
    type: "paragraph",
    text: "So maybe the chat and the policy shouldn't share the same box...",
  },
  {
    type: "heading",
    id: "solution-2-split-workspace",
    text: "Solution №2 — Keep them side by side",
  },
  {
    type: "paragraph",
    text: "What if chat stays on the left for the conversation, and the policy opens on the right—and stays there while you keep talking?",
  },
  {
    type: "paragraph",
    text: "I didn't want a second app. Just two clear jobs: talk about intent on one side, look at the draft on the other. Ask a follow-up, the draft updates in place—no new wall of text.",
  },
  {
    type: "demo",
    demo: "living-workspace",
  },
  {
    type: "paragraph",
    text: "Still—if the right side opens with a full policy too early, it feels like the AI answered before it listened. How do we fix that?",
  },
  { type: "divider" },
  {
    type: "paragraph",
    text: "Show the reading first. Who's involved, which apps, what kind of access—before any firewall rules. People correct the meaning. Then the policy comes second.",
  },
  {
    type: "demo",
    demo: "intent-summary",
  },
  {
    type: "paragraph",
    text: "When something changes on the right, say what changed and why. And keep Approve separate from chatting. Talking is for figuring it out. Approving is a real decision—someone has to own it.",
  },
  {
    type: "demo",
    demo: "final-approval",
  },
  {
    type: "paragraph",
    text: "A card in chat can still point at the draft—open it, keep history on the left—but the work stays on the desktop split. Chat is the journey. The policy is what you sign off.",
  },
];

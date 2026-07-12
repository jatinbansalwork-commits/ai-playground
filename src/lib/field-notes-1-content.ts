/** Field Notes #1 — replicated from https://rauno.me/notes/1 (copy swaps later). */

export type FieldNotesBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "divider" }
  | {
      type: "image";
      alt: string;
      src: string;
      width: number;
      height: number;
    }
  | {
      type: "video";
      slot: string;
      ariaLabel: string;
      aspectRatio: number;
    };

export const FIELD_NOTES_1_BLOCKS: FieldNotesBlock[] = [
  {
    type: "heading",
    id: "problem-statement",
    text: "Problem statement",
  },
  {
    type: "paragraph",
    text: "Can we provide a link to pull me up to the start of the answer? I asked a question with a long-ish response and I'm left at the end but now need to scroll up indeterminately.",
  },
  {
    type: "image",
    alt: "Long answer from a chat agent, with a textarea at the bottom of the screen",
    src: "/assets/field-notes/1/problem.png",
    width: 2200,
    height: 1708,
  },
  {
    type: "heading",
    id: "solution-1-scroll-button",
    text: "Solution №1 — Scroll button",
  },
  {
    type: "paragraph",
    text: "We already have a “scroll to bottom” button that only appears when you are not scrolled to the bottom.",
  },
  {
    type: "paragraph",
    text: "Seemingly the simplest solution would be to add another button to the Composer that scrolls you up to the previous message?",
  },
  {
    type: "image",
    alt: "Textarea with two buttons: scroll to bottom and scroll to previous message",
    src: "/assets/field-notes/1/scroll-button.png",
    width: 2200,
    height: 945,
  },
  {
    type: "paragraph",
    text: "It actually worked better in practice than I thought. But I dislike how it only lets you jump to the previous message. What if I want to go back 5 messages, or to the beginning?",
  },
  {
    type: "paragraph",
    text: "That's a lot of clicks. And it's easy to shoot past the one you wanted. So we would need to actually implement Previous and Next buttons, but there's already a ↓ that represents “scroll to bottom” functionality...",
  },
  {
    type: "paragraph",
    text: "Plus, I feel like this area becomes crowded easily.",
  },
  {
    type: "paragraph",
    text: "Something something, solve multiple problems with a single design...",
  },
  {
    type: "heading",
    id: "solution-2-minimap",
    text: "Solution №2 — Minimap",
  },
  {
    type: "paragraph",
    text: "Could we implement a “minimap” to let you jump to any message? What would it look like?",
  },
  {
    type: "paragraph",
    text: "I didn't want an abstract minimap of chat messages like a line pattern or something less representative of the bubbles.",
  },
  {
    type: "video",
    slot: "minimap-prototype-1",
    ariaLabel: "Play video",
    aspectRatio: 1.9423558897243107,
  },
  {
    type: "paragraph",
    text: "So with that constraint in mind an obvious solution to me was to use the chat as the map...",
  },
  {
    type: "paragraph",
    text: "By temporarily collapsing the agent messages (TBD on the shortcut or interaction at this point) we end up with this sort of “stacked navigation” of user messages that one can press on to scroll to any of them.",
  },
  {
    type: "paragraph",
    text: "I dislike that it becomes very jarring quickly as the agent messages shift depending on whether you're in “minimap mode” or not... the jank gets increasingly worse when you actually choose to scroll to another message.",
  },
  {
    type: "paragraph",
    text: "How do we make this idea better?",
  },
  { type: "divider" },
  {
    type: "paragraph",
    text: "I did love the idea of collapsing the user messages, I think it's really obvious how the map works and where you can go since the relationship between the items and their destination is clear...",
  },
  {
    type: "paragraph",
    text: "So instead of the layout jank I basically just blur the rest of the conversation and animate the user messages to a stack. And pressing an item scrolls you to the destination and unblurs the conversation.",
  },
  {
    type: "video",
    slot: "minimap-prototype-2",
    ariaLabel: "Play video",
    aspectRatio: 1.6517205422314911,
  },
  {
    type: "paragraph",
    text: "To further emphasise which message you're being scrolled to I tried adding an animation delay to messages you aren't being scrolled to...",
  },
  {
    type: "paragraph",
    text: "This actually felt more awkward because now after scrolling a bunch of messages seemingly get thrown across the page.",
  },
  {
    type: "video",
    slot: "minimap-prototype-3",
    ariaLabel: "Play video",
    aspectRatio: 1.6517205422314911,
  },
  {
    type: "paragraph",
    text: "I think a reasonable solution could be to keep the hover state on the selected element for the duration of the scroll. Also, it might be useful to delay the un-blurring of the conversation until thereafter...",
  },
  {
    type: "video",
    slot: "minimap-prototype-4",
    ariaLabel: "Play video",
    aspectRatio: 1.6517205422314911,
  },
  {
    type: "paragraph",
    text: "To handle longer messages, I thought it would be neat to smoothly collapse them to a reasonable size. Two lines should be enough...?",
  },
  {
    type: "paragraph",
    text: "Also, I don't think summarising the messages with AI is a good idea. My thinking is that you're able to navigate the conversation much better if the messages are what you typed, not generated summaries which you have no memory of.",
  },
  {
    type: "video",
    slot: "minimap-prototype-5",
    ariaLabel: "Play video",
    aspectRatio: 1.730607966457023,
  },
  {
    type: "paragraph",
    text: "Another idea I considered was to transition the textarea offscreen to make more space for the messages.",
  },
  {
    type: "paragraph",
    text: "I didn't like this because there are too many moving objects on the screen now... it feels especially jarring when you actually scroll to another message.",
  },
  {
    type: "video",
    slot: "minimap-prototype-6",
    ariaLabel: "Play video",
    aspectRatio: 1.7640573318632855,
  },
  {
    type: "paragraph",
    text: "Also I kinda liked how it retains the context of what you're doing by placing the messages relative to the Composer. It's also important to retain the button that lets you enter this mode in the first place (Search icon on the top right).",
  },
];

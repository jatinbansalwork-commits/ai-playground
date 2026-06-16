interface NavBackLinkLabelProps {
  destination: string;
  showBackPrefix?: boolean;
}

/** Arrow at 2× label size (28px), optically centered with `text-sm` copy. */
export function NavBackLinkLabel({
  destination,
  showBackPrefix = true,
}: NavBackLinkLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 leading-none">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block shrink-0"
        aria-hidden
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="leading-none">
        {showBackPrefix ? `Back to ${destination}` : destination}
      </span>
    </span>
  );
}

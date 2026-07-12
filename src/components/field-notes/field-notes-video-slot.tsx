interface FieldNotesVideoSlotProps {
  slot: string;
  ariaLabel: string;
  aspectRatio: number;
}

/** Video prototype slot — play control only until assets are swapped in. */
export function FieldNotesVideoSlot({
  slot,
  ariaLabel,
  aspectRatio,
}: FieldNotesVideoSlotProps) {
  return (
    <figure className="field-notes-media field-notes-media--bleed">
      <button
        type="button"
        className="field-notes-video-slot"
        style={{ aspectRatio }}
        aria-label={ariaLabel}
        data-slot={slot}
        disabled
      >
        <span className="field-notes-video-slot__play" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.35858 13.73C4.5811 14.1486 4.19236 14.358 3.87486 14.3179C3.59778 14.283 3.34794 14.1337 3.1858 13.9063C3.00001 13.6458 3.00001 13.2043 3.00001 12.3212L3.00001 3.67875C3.00001 2.79572 3.00001 2.35421 3.1858 2.09365C3.34794 1.86626 3.59778 1.71703 3.87486 1.68208C4.19236 1.64203 4.58109 1.85135 5.35857 2.26999L14.0378 6.94343C14.6757 7.28693 14.9947 7.45868 15.0995 7.68683C15.1909 7.88561 15.1909 8.11437 15.0995 8.31315C14.9947 8.5413 14.6757 8.71306 14.0378 9.05656L5.35858 13.73Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </figure>
  );
}

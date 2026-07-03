const ICON_CLASS = "block h-4 w-4 shrink-0";

export function HomeNavIcon({ id }: { id: string }) {
  const stroke = "currentColor";
  if (id === "dashboard") {
    return (
      <svg className={ICON_CLASS} viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3 7.5 8 3.5l5 4V13H10.5V9H5.5v4H3V7.5Z"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "lifecycle") {
    return (
      <svg className={ICON_CLASS} viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 2l5 2v4c0 3.5-2.5 5.5-5 6-2.5-.5-5-2.5-5-6V4l5-2z"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={ICON_CLASS} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12V8.25M8 12V4.75M12 12V6.5"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CopilotPlusIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

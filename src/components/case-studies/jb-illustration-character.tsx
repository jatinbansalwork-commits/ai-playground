import {
  getJbIllustration,
  getJbIllustrationCharacter,
  type JbIllustrationCharacterId,
} from "@/lib/jb-illustration-library";

interface JbIllustrationCharacterProps {
  id: JbIllustrationCharacterId;
  className?: string;
  alt?: string;
}

export function JbIllustrationCharacter({
  id,
  className = "h-20 w-20",
  alt = "",
}: JbIllustrationCharacterProps) {
  const crop = getJbIllustrationCharacter(id);
  const src = getJbIllustration(crop.source);

  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: crop.width,
          height: "auto",
          left: crop.left,
          top: crop.top,
        }}
        draggable={false}
        decoding="async"
      />
    </div>
  );
}

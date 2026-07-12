import Image from "next/image";

interface FieldNotesMediaImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

/** Bleed-width still — matches Rauno field notes media slots. */
export function FieldNotesMediaImage({
  alt,
  src,
  width,
  height,
}: FieldNotesMediaImageProps) {
  return (
    <figure className="field-notes-media field-notes-media--bleed">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className="field-notes-media__image"
        priority={src.includes("problem.png")}
      />
    </figure>
  );
}

import { FieldNotesMediaImage } from "@/components/field-notes/field-notes-media-image";
import { FieldNotesVideoSlot } from "@/components/field-notes/field-notes-video-slot";
import { FIELD_NOTES_1_BLOCKS } from "@/lib/field-notes-1-content";

export function FieldNotesArticleBody() {
  return (
    <div className="field-notes-prose">
      {FIELD_NOTES_1_BLOCKS.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={`${block.id}-${index}`} id={block.id} className="field-notes-prose__heading">
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={`paragraph-${index}`} className="field-notes-prose__paragraph">
              {block.text}
            </p>
          );
        }

        if (block.type === "divider") {
          return <hr key={`divider-${index}`} className="field-notes-prose__divider" />;
        }

        if (block.type === "image") {
          return (
            <FieldNotesMediaImage
              key={`image-${index}`}
              alt={block.alt}
              src={block.src}
              width={block.width}
              height={block.height}
            />
          );
        }

        return (
          <FieldNotesVideoSlot
            key={`video-${block.slot}`}
            slot={block.slot}
            ariaLabel={block.ariaLabel}
            aspectRatio={block.aspectRatio}
          />
        );
      })}
    </div>
  );
}

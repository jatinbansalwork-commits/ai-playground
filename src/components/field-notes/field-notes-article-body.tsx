import Image from "next/image";
import { FieldNotesMediaImage } from "@/components/field-notes/field-notes-media-image";
import { FieldNotesPolicyDemo } from "@/components/field-notes/field-notes-policy-demo";
import { FIELD_NOTES_1_BLOCKS } from "@/lib/field-notes-1-content";

export function FieldNotesArticleBody() {
  return (
    <div className="field-notes-prose">
      {FIELD_NOTES_1_BLOCKS.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3
              key={`${block.id}-${index}`}
              id={block.id}
              data-heading="true"
              className={[
                "field-notes-prose__heading",
                block.avatarSrc ? "field-notes-prose__heading--with-avatar" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {block.avatarSrc ? (
                <span
                  className="field-notes-prose__avatar"
                  aria-hidden={block.avatarAlt ? undefined : true}
                >
                  <Image
                    src={block.avatarSrc}
                    alt={block.avatarAlt ?? ""}
                    width={20}
                    height={20}
                    className="field-notes-prose__avatar-image"
                    priority
                  />
                </span>
              ) : null}
              {block.text}
            </h3>
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

        return <FieldNotesPolicyDemo key={`demo-${block.demo}-${index}`} demo={block.demo} />;
      })}
    </div>
  );
}

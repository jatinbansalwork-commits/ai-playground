import type { CraftArticleBlock } from "@/lib/craft-content";
import { resolveAssetUrl } from "@/lib/asset-cdn";
import { ArticleImage } from "@/components/craft/article-image";
import { ArticleChecklistTable } from "@/components/craft/article-checklist-table";
import { ArticleProcessSteps } from "@/components/craft/article-process-steps";
import { ArticleWorkflowFlow } from "@/components/craft/article-workflow-flow";

interface ArticleSectionContentProps {
  blocks: CraftArticleBlock[];
}

export function ArticleSectionContent({ blocks }: ArticleSectionContentProps) {
  return (
    <div className="craft-article-prose space-y-3">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={`paragraph-${index}`}>{block.text}</p>;
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`quote-${index}`}
              className="border-l-2 border-blue-600 pl-6 font-medium leading-relaxed tracking-tight text-neutral-900"
            >
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "heading") {
          return (
            <h3
              key={`heading-${index}`}
              className="craft-article-section-title text-lg text-neutral-900 md:text-xl"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "divider") {
          return (
            <hr
              key={`divider-${index}`}
              className="!my-8 border-0"
              aria-hidden
            />
          );
        }

        if (block.type === "checklist-table") {
          return (
            <ArticleChecklistTable
              key={`checklist-table-${index}`}
              categories={block.categories}
            />
          );
        }

        if (block.type === "process-steps") {
          return (
            <ArticleProcessSteps
              key={`process-steps-${index}`}
              steps={block.steps}
            />
          );
        }

        if (block.type === "workflow-flow") {
          return (
            <ArticleWorkflowFlow
              key={`workflow-flow-${index}`}
              steps={block.steps}
            />
          );
        }

        if (block.type === "list") {
          if (block.variant === "chips") {
            return (
              <ul
                key={`list-${index}`}
                className="flex flex-wrap gap-3"
                aria-label="Topics"
              >
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm leading-snug text-blue-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <ul key={`list-${index}`} className="space-y-2 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-500"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type !== "image") {
          return null;
        }

        const resolvedSrc = block.src ? resolveAssetUrl(block.src) : undefined;

        return (
          <figure key={`image-${index}`} className="my-6">
            <ArticleImage
              src={resolvedSrc}
              alt={block.alt ?? ""}
              aspect={block.aspect ?? "natural"}
            />
            {block.caption ? (
              <figcaption className="mt-3 text-xs tracking-wide text-neutral-500">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

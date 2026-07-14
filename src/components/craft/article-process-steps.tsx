import type {
  CraftArticleProcessStep,
  CraftArticleProcessStepBlock,
} from "@/lib/craft-content";
import { resolveAssetUrl } from "@/lib/asset-cdn";
import { ArticleImage } from "@/components/craft/article-image";

interface ArticleProcessStepsProps {
  steps: CraftArticleProcessStep[];
}

function StepImage({
  block,
}: {
  block: Extract<CraftArticleProcessStepBlock, { type: "image" }>;
}) {
  const resolvedSrc = block.src ? resolveAssetUrl(block.src) : undefined;

  return (
    <figure className="!mt-4 overflow-hidden">
      <ArticleImage
        src={resolvedSrc}
        alt={block.alt ?? ""}
        aspect={block.aspect ?? "natural"}
        rounded="lg"
      />
    </figure>
  );
}

function StepBody({ body }: { body: CraftArticleProcessStepBlock[] }) {
  return (
    <div className="craft-article-prose mt-3 space-y-2">
      {body.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={`paragraph-${index}`}>{block.text}</p>;
        }

        if (block.type === "image") {
          return <StepImage key={`image-${index}`} block={block} />;
        }

        if (block.type === "chips") {
          return (
            <ul
              key={`chips-${index}`}
              className="flex flex-wrap gap-2"
              aria-label="Items"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm leading-snug text-blue-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <ul key={`bullets-${index}`} className="space-y-2 pl-1">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-600"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export function ArticleProcessSteps({ steps }: ArticleProcessStepsProps) {
  return (
    <ol className="space-y-0" aria-label="Review process steps">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-8 last:pb-0"
        >
          <div className="flex flex-col items-center">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-medium text-blue-700"
              aria-hidden
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span
                className="mt-2 w-px flex-1 bg-gradient-to-b from-blue-300 to-blue-100"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="min-w-0 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-5 md:px-6">
            <h3 className="craft-article-process-step__title text-lg text-neutral-900">
              {step.title}
            </h3>
            <StepBody body={step.body} />
          </div>
        </li>
      ))}
    </ol>
  );
}

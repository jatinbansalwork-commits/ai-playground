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
    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-300">
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
                  className="rounded-full border border-[#6B36FF]/40 bg-[#6B36FF]/10 px-3 py-1.5 text-sm leading-snug text-[#B794FF]"
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
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#B794FF]"
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
    <ol className="my-6 space-y-0" aria-label="Review process steps">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-8 last:pb-0"
        >
          <div className="flex flex-col items-center">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6B36FF]/50 bg-[#6B36FF]/15 text-sm font-medium text-[#B794FF]"
              aria-hidden
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span
                className="mt-2 w-px flex-1 bg-gradient-to-b from-[#6B36FF]/35 to-[#6B36FF]/10"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="min-w-0 rounded-xl border border-[#6B36FF]/20 bg-[#1a1a20] px-5 py-5 md:px-6">
            <h3 className="text-base font-normal text-white">{step.title}</h3>
            <StepBody body={step.body} />
          </div>
        </li>
      ))}
    </ol>
  );
}

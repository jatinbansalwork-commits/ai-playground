interface ArticleWorkflowFlowProps {
  steps: string[];
}

export function ArticleWorkflowFlow({ steps }: ArticleWorkflowFlowProps) {
  return (
    <div className="my-6" aria-label="Review workflow">
      <ol className="flex max-w-md flex-col">
        {steps.map((step, index) => (
          <li key={step} className="flex w-full flex-col">
            <span className="w-full rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-left text-[15px] leading-snug text-neutral-900">
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span
                className="py-2 pl-4 text-lg leading-none text-orange-500"
                aria-hidden
              >
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

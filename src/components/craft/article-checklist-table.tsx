import type { CraftArticleChecklistCategory } from "@/lib/craft-content";

interface ArticleChecklistTableProps {
  categories: CraftArticleChecklistCategory[];
}

export function ArticleChecklistTable({ categories }: ArticleChecklistTableProps) {
  return (
    <div className="craft-article-checklist overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Design review checklist</caption>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.title}
              className="border-b border-neutral-200 last:border-b-0"
            >
              <th
                scope="row"
                className={[
                  "w-[38%] align-top px-5 py-5 text-base font-normal text-neutral-900 md:px-6",
                  index % 2 === 0 ? "bg-blue-50" : "bg-neutral-50",
                ].join(" ")}
              >
                {category.title}
              </th>
              <td
                className={[
                  "px-5 py-5 text-neutral-600 md:px-6",
                  index % 2 === 0 ? "bg-white" : "bg-neutral-50/80",
                ].join(" ")}
              >
                <ul className="space-y-2">
                  {category.questions.map((question) => (
                    <li key={question} className="flex gap-2.5">
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-600"
                        aria-hidden
                      />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

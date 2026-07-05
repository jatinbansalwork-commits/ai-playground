import type { CraftArticleChecklistCategory } from "@/lib/craft-content";

interface ArticleChecklistTableProps {
  categories: CraftArticleChecklistCategory[];
}

export function ArticleChecklistTable({ categories }: ArticleChecklistTableProps) {
  return (
    <div className="craft-article-checklist my-6 overflow-hidden rounded-xl border border-brand-accent/25 bg-[#1a1a20]">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Design review checklist</caption>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.title}
              className="border-b border-brand-accent/15 last:border-b-0"
            >
              <th
                scope="row"
                className={[
                  "w-[38%] align-top px-5 py-5 text-base font-normal text-white md:px-6",
                  index % 2 === 0 ? "bg-brand-accent/14" : "bg-brand-accent/8",
                ].join(" ")}
              >
                {category.title}
              </th>
              <td
                className={[
                  "px-5 py-5 text-neutral-200 md:px-6",
                  index % 2 === 0 ? "bg-[#252530]/90" : "bg-[#202028]/90",
                ].join(" ")}
              >
                <ul className="space-y-2">
                  {category.questions.map((question) => (
                    <li key={question} className="flex gap-2.5">
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-accent-soft"
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

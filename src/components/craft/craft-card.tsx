import Link from "next/link";
import type { CraftItem } from "@/lib/craft-content";
import { externalLinkLabel } from "@/lib/a11y";
import { getCraftMetaPosition, getCraftTheme } from "@/lib/craft-theme";

interface CraftCardProps {
  item: CraftItem;
  sectionHref: string;
  hasArticle?: boolean;
}

export function CraftCard({
  item,
  sectionHref,
  hasArticle = true,
}: CraftCardProps) {
  const href = item.external ? item.href ?? "#" : `${sectionHref}/${item.slug}`;
  const theme = getCraftTheme(item);
  const metaPosition = getCraftMetaPosition(item);
  const interactive = Boolean(item.cta);
  const className = interactive
    ? `craft-card craft-card-interactive${hasArticle || item.external ? "" : " cursor-default"}`
    : "craft-card";

  const content = (
    <>
      <div
        className="craft-card-preview"
        data-theme={theme}
        data-position={metaPosition}
      >
        <div
          className="craft-card-media"
          style={{ aspectRatio: item.aspectRatio ?? "16 / 10" }}
        >
          <div className={`craft-card-fill ${item.previewClass}`} aria-hidden />
        </div>

        <div className="craft-card-meta">
          <h2 className="craft-card-title">{item.title}</h2>
          <time className="craft-card-date" dateTime={item.date}>
            {item.date}
          </time>
        </div>
      </div>

      {item.cta ? (
        <div className="craft-card-cta" data-fake-button>
          {item.cta}
        </div>
      ) : null}
    </>
  );

  if (item.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={externalLinkLabel(item.title)}
      >
        {content}
      </a>
    );
  }

  if (!hasArticle) {
    return (
      <div className={className} aria-label={item.title}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={className} aria-label={item.title}>
      {content}
    </Link>
  );
}

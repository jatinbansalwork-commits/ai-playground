type ArticleImageAspect = "video" | "natural";

interface ArticleImageProps {
  src?: string;
  alt?: string;
  aspect?: ArticleImageAspect;
  rounded?: "lg" | "xl";
  className?: string;
}

export function ArticleImage({
  src,
  alt = "",
  aspect = "natural",
  rounded = "xl",
  className = "",
}: ArticleImageProps) {
  const roundedClass = rounded === "lg" ? "rounded-lg" : "rounded-xl";

  if (!src) {
    return (
      <div
        className={[
          "flex w-full items-center justify-center border border-dashed border-neutral-700 bg-neutral-900/60",
          aspect === "video" ? "aspect-video" : "min-h-[12rem]",
          roundedClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={alt || "Image placeholder"}
      >
        <span className="text-sm text-neutral-500">Image placeholder</span>
      </div>
    );
  }

  if (aspect === "video") {
    return (
      <img
        src={src}
        alt={alt}
        className={[
          "w-full border border-neutral-800 object-cover aspect-video",
          roundedClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={[
        "block h-auto w-full border border-neutral-800/80 object-contain",
        roundedClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      loading="lazy"
      decoding="async"
    />
  );
}

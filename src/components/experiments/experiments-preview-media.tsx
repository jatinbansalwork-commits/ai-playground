import type { ExperimentMedia } from "@/lib/experiment-media";

interface ExperimentsPreviewMediaProps {
  media: ExperimentMedia;
  title: string;
}

export function ExperimentsPreviewMedia({
  media,
  title,
}: ExperimentsPreviewMediaProps) {
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt ?? title}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt={media.alt ?? title}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

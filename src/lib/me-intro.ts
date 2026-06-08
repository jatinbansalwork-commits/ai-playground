export interface MeIntroConfig {
  /** Silent ambient loop for the embedded card */
  previewSrc: string;
  /** Full-length video with audio in the modal */
  fullSrc: string;
  /** Optional poster while preview loads */
  poster?: string;
  alt: string;
  hoverTooltip: string;
}

export const ME_INTRO_CONFIG: MeIntroConfig = {
  previewSrc: "/intro-preview.mp4",
  fullSrc: "/intro-full.mp4",
  alt: "Introduction",
  hoverTooltip: "Click to listen",
};

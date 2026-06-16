import { cdnAsset } from "@/lib/asset-cdn";

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
  previewSrc: cdnAsset("/Hover/video2985925070.mp4"),
  fullSrc: cdnAsset("/Hover/video2985925070.mp4"),
  alt: "Introduction",
  hoverTooltip: "Click to listen",
};

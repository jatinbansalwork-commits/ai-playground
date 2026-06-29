import { ImageResponse } from "next/og";
import { SITE_AUTHOR } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${SITE_AUTHOR} — Product Designer Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.2em", opacity: 0.7 }}>
          PRODUCT DESIGNER PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1 }}>
            {SITE_AUTHOR}
          </div>
          <div style={{ fontSize: 36, opacity: 0.85 }}>
            Cybersecurity · Fintech · AI · Design Systems
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.6 }}>jatinbansal.vercel.app</div>
      </div>
    ),
    { ...size },
  );
}

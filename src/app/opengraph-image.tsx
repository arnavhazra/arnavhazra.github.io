import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "#e8e6e3",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8a8784",
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#c9a227",
            maxWidth: 800,
          }}
        >
          {siteConfig.positioning}
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M7 17V7l10 5-10 5Z" fill="#007AFF" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            AI 工具导航
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}
        >
          发现最适合你的 AI 工具
        </p>
      </div>
    ),
    { ...size }
  );
}

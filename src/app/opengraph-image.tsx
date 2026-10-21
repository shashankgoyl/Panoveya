import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "src/assets/images/hero-banquet-hall.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#040a17" }}>
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={675}
          style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 675, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(4,10,23,0.97) 0%, rgba(4,10,23,0.88) 45%, rgba(4,10,23,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="11.5" stroke="#ffffff" strokeWidth="2.6" />
              <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="6.6"
                transform="rotate(-18 20 20)"
                stroke="#3ee6c7"
                strokeWidth="2.6"
              />
              <circle cx="35.2" cy="14.4" r="3.2" fill="#3ee6c7" />
            </svg>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#fff" }}>
              Pano<span style={{ color: "#7ff0da" }}>Veya</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, color: "#fff" }}>
              {siteConfig.tagline}
            </div>
            <div style={{ marginTop: 24, fontSize: 28, color: "#cbd5e1", lineHeight: 1.35 }}>
              Immersive 360° virtual tours for hotels, restaurants, venues and businesses in India.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

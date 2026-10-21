import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071226",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="10" stroke="#ffffff" strokeWidth="2.6" />
          <ellipse
            cx="20"
            cy="20"
            rx="16.5"
            ry="5.8"
            transform="rotate(-18 20 20)"
            stroke="#3ee6c7"
            strokeWidth="2.6"
          />
          <circle cx="33.6" cy="15" r="3" fill="#3ee6c7" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "ATF Media House | Against the Frame";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#070707", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#f2efe9" }}>
        <div style={{ display: "flex", fontSize: 300, fontWeight: 700, lineHeight: 1, letterSpacing: -8 }}>
          <span style={{ color: "#e0301e" }}>AT</span>
          <span>F</span>
        </div>
        <div style={{ fontSize: 64, color: "#e0301e", letterSpacing: 8, marginTop: 6 }}>MEDIA HOUSE</div>
        <div style={{ fontSize: 30, color: "#9d9a94", marginTop: 26 }}>Creative thinking. Digital capability.</div>
      </div>
    ),
    size,
  );
}

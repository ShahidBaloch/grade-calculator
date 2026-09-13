import { ImageResponse } from "next/og";

export const alt = "GradeCalculator — free grade and GPA tools";
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
          justifyContent: "center",
          padding: 80,
          background: "#0f172a",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, color: "#5eead4", marginBottom: 16 }}>GradeCalculator</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Free grade and GPA calculators
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 28 }}>
          EZ Grader · Weighted grades · Finals · GPA · UK · ATAR
        </div>
      </div>
    ),
    { ...size },
  );
}

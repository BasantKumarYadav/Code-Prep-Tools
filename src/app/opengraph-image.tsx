import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CodePrepTools - Free Developer Tools";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          CodePrepTools
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#cbd5e1",
          }}
        >
          Free Developer Tools & Interview Prep
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
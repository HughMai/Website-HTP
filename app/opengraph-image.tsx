import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Hung Thanh Phat Door — Cua Cuon, Cua Nhom Kinh, Cua Keo Can Tho";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A2540",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          }}
        />

        {/* Brand */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          HUNG THANH PHAT
        </div>
        <div
          style={{
            color: "#60A5FA",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "12px",
            marginTop: 8,
          }}
        >
          DOOR
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#3B82F6",
            borderRadius: 2,
            marginTop: 28,
          }}
        />

        {/* Services */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 28,
          }}
        >
          {["Cua Cuon", "Cua Nhom Kinh", "Cua Keo"].map((s) => (
            <div
              key={s}
              style={{
                padding: "10px 24px",
                border: "1.5px solid rgba(96,165,250,0.4)",
                borderRadius: 8,
                color: "#CBD5E1",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Address + phone */}
        <div
          style={{
            marginTop: 36,
            color: "#64748B",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          235-237 Vo Van Kiet, Binh Thuy, Can Tho
        </div>
        <div style={{ color: "#60A5FA", fontSize: 20, marginTop: 8, fontWeight: 600 }}>
          0913 574 077
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

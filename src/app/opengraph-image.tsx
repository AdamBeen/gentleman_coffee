import { ImageResponse } from "next/og";

export const alt = "Gentelman Coffee · Distributeurs automatiques café, boissons & snacking, Bordeaux & Gironde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image Open Graph générée à la couleur de la marque. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#120D0A",
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(198,161,91,0.25), transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(140,90,50,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E0C995",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Distributeurs automatiques • Bordeaux &amp; Gironde
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 32,
            fontSize: 88,
            lineHeight: 1.1,
            color: "#F3E9D7",
            fontWeight: 600,
          }}
        >
          <span>Le bon café. Au bon endroit.</span>
          <span style={{ color: "#C6A15B" }}>À tout moment.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "rgba(250,247,242,0.7)" }}>
          Gentelman Coffee · machines &amp; distributeurs automatiques
        </div>
      </div>
    ),
    size
  );
}

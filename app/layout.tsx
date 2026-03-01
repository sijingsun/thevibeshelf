import type { Metadata } from "next";
import { Abel, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const abel = Abel({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abel",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibeStack — Curated Dev Resources",
  description:
    "Build and share personal Kanban boards of your go-to dev resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abel.variable} ${ebGaramond.variable} antialiased min-h-screen`}>
        {/*
         * Fixed background layer — always behind all content regardless of
         * which element creates the scroll context.
         * Layers (bottom to top):
         *   1. Cream base #fcf6e9
         *   2. Subtle linear gradient overlay (8% opacity)
         *   3–8. Radial gradient blobs (top-right cluster + bottom-left)
         * Positions and sizes translated 1:1 from design.pen NQLQU (1440×900 frame).
         */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundColor: "#fcf6e9",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Linear gradient overlay — full screen, 8% */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #D4E34E 0%, #3FBFAD 50%, #5B9BD5 100%)",
              opacity: 0.08,
            }}
          />

          {/* Blob 1: teal→blue, 580×520px @ (980,-180), rot -15°, op 25% */}
          <div
            style={{
              position: "absolute",
              width: "40.3vw",
              height: "57.8vh",
              left: "68.1vw",
              top: "-20vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #3FBFAD 0%, #5B9BD5 50%, transparent 70%)",
              opacity: 0.25,
              transform: "rotate(-15deg)",
            }}
          />

          {/* Blob 2: yellow-green, 440×380px @ (1100,-100), rot 20°, op 28% */}
          <div
            style={{
              position: "absolute",
              width: "30.6vw",
              height: "42.2vh",
              left: "76.4vw",
              top: "-11.1vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #D4E34E 0%, #7BC88A 55%, transparent 70%)",
              opacity: 0.28,
              transform: "rotate(20deg)",
            }}
          />

          {/* Blob 3: blue-teal, 320×280px @ (1150,-60), rot -30°, op 20% */}
          <div
            style={{
              position: "absolute",
              width: "22.2vw",
              height: "31.1vh",
              left: "79.9vw",
              top: "-6.7vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #5B9BD5 0%, #3FBFAD 60%, transparent 70%)",
              opacity: 0.2,
              transform: "rotate(-30deg)",
            }}
          />

          {/* Blob 4: yellow, 280×240px @ (1050,-220), rot 45°, op 18% */}
          <div
            style={{
              position: "absolute",
              width: "19.4vw",
              height: "26.7vh",
              left: "72.9vw",
              top: "-24.4vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #E8F07A 0%, rgba(212,227,78,0.5) 40%, transparent 70%)",
              opacity: 0.18,
              transform: "rotate(45deg)",
            }}
          />

          {/* Blob Small: teal, 200×180px @ (1280,80), rot 10°, op 10% */}
          <div
            style={{
              position: "absolute",
              width: "13.9vw",
              height: "20vh",
              left: "88.9vw",
              top: "8.9vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #3FBFAD 0%, rgba(91,155,213,0.5) 50%, transparent 70%)",
              opacity: 0.1,
              transform: "rotate(10deg)",
            }}
          />

          {/* Bottom-left blob: yellow-green, 400×360px @ (-120,620), rot 25°, op 12% */}
          <div
            style={{
              position: "absolute",
              width: "27.8vw",
              height: "40vh",
              left: "-8.3vw",
              top: "68.9vh",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, #D4E34E 0%, rgba(63,191,173,0.38) 50%, transparent 70%)",
              opacity: 0.12,
              transform: "rotate(25deg)",
            }}
          />
        </div>

        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

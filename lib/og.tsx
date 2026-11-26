import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared 1200×630 social share card (LinkedIn, WhatsApp, X, Facebook). */
export const OG_SIZE = { width: 1200, height: 630 };

const assets = join(process.cwd(), "assets");
const fontsPromise = Promise.all([
  readFile(join(assets, "fonts/Montserrat-Bold.ttf")),
  readFile(join(assets, "fonts/Montserrat-Medium.ttf")),
]);
const logoPromise = readFile(join(assets, "og-logo.png")).then(
  (b) => `data:image/png;base64,${b.toString("base64")}`,
);

const clamp = (s: string, n: number) =>
  s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;

export async function renderOgCard({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  const [bold, medium] = await fontsPromise;
  const logo = await logoPromise;
  const t = clamp(title, 80);
  const titleSize = t.length > 52 ? 60 : t.length > 32 ? 70 : 82;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#05070f",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(0,180,255,0.28), transparent 45%), radial-gradient(circle at 100% 100%, rgba(123,61,255,0.32), transparent 50%)",
          color: "#ffffff",
          fontFamily: "Montserrat",
          position: "relative",
        }}
      >
        {/* Brand arrow motif (45° progress), decorative */}
        <svg
          width="420"
          height="420"
          viewBox="0 0 420 420"
          style={{ position: "absolute", right: 40, top: 60, opacity: 0.18 }}
        >
          <defs>
            <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#7B3DFF" />
              <stop offset="1" stopColor="#00B4FF" />
            </linearGradient>
          </defs>
          <path d="M50 370 L360 60 M170 60 L360 60 L360 250" fill="none" stroke="url(#g)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logo} height={56} width={142} />
          <div style={{ marginLeft: 18, fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
            Academy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#00E5FF",
              marginBottom: 18,
            }}
          >
            {kicker}
          </div>
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1 }}>
            {t}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 22, fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,0.72)", lineHeight: 1.3 }}>
              {clamp(subtitle, 110)}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: 6,
              width: 220,
              borderRadius: 3,
              backgroundImage: "linear-gradient(90deg, #00B4FF, #7B3DFF)",
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
            <div>Live online worldwide · Classroom in Pune</div>
            <div style={{ color: "#ffffff", fontWeight: 700 }}>42xacademy.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Montserrat", data: bold, weight: 700, style: "normal" },
        { name: "Montserrat", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}

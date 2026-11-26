import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "42X Academy Journal: SAP, data and DevOps career guides";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    kicker: "42X Journal",
    title: "SAP, Data & DevOps Career Guides",
    subtitle: "Honest, practical guides to choosing and learning the right track.",
  });
}

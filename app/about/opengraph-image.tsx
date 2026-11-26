import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "About 42X Academy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    kicker: "About us",
    title: "Practitioner-led tech training",
    subtitle: "SAP, data and DevOps skills taught by people who do the work.",
  });
}

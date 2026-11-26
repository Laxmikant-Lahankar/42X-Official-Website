import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "42X Academy: SAP, Power BI & DevOps training, online and in Pune";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    kicker: "Skills for what's next",
    title: "SAP, Power BI & DevOps Training",
    subtitle: "1-on-1 mentorship and real, hands-on projects in every track.",
  });
}

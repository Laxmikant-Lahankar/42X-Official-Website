import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "42X Academy courses: SAP, Data Engineering, Power Platform and DevOps";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    kicker: "Courses",
    title: "SAP, Power BI & DevOps Courses",
    subtitle: "Eight career tracks: SAP MM, SD, EWM, ABAP, BASIS, Data Engineering, Power Platform, DevOps.",
  });
}

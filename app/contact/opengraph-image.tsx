import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Contact 42X Academy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    kicker: "Free session",
    title: "Talk to 42X Academy",
    subtitle: "Fees, batch dates and track advice. WhatsApp +91 84848 34242.",
  });
}

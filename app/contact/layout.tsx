import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

// contact/page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = pageMeta({
  title: "Contact Us – Join Online or Visit Our Pune Centre",
  description:
    "Talk to 42X Academy about SAP, Power BI, Power Platform or DevOps training. Join live online classes from anywhere, or visit our centre on J.M. Road, Pune. Call or WhatsApp +91 84848 34242.",
  path: "/contact",
});

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}

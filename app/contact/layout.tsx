import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

// contact/page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = pageMeta({
  title: "Contact – Join Online or Visit Us in Pune",
  description:
    "Ask about SAP, Power BI or DevOps training. Join online from anywhere or visit our J.M. Road, Pune centre. Call or WhatsApp +91 84848 34242.",
  path: "/contact",
});

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}

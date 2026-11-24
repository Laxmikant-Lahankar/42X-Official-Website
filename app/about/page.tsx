import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import About from "@/components/About";

export const metadata: Metadata = pageMeta({
  title: "About Us – SAP & Tech Training Institute, Pune",
  description:
    "Pune-based institute teaching SAP, Power BI, Power Platform and DevOps to students worldwide, online and in class, with 1:1 mentorship.",
  path: "/about",
});

export default function AboutPage() {
  return <About />;
}

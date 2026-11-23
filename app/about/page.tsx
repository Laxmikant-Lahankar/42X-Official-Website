import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import About from "@/components/About";

export const metadata: Metadata = pageMeta({
  title: "About Us – SAP & Tech Training Institute, Pune",
  description:
    "42X Academy is a Pune-based training institute teaching SAP, Power BI, Power Platform and DevOps to students worldwide through live online and classroom batches, with 1:1 mentorship from working practitioners.",
  path: "/about",
});

export default function AboutPage() {
  return <About />;
}

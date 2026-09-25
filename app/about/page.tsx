import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About — 42X Academy",
  description:
    "42X Academy teaches SAP, Data Engineering, and Power Platform with 1:1 mentorship and real enterprise work.",
};

export default function AboutPage() {
  return <About />;
}

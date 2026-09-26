import type { Metadata } from "next";
import SapCourseDetails from "@/components/sap/SapCourseDetails";

export const metadata: Metadata = {
  title: "SAP Course Details — 42X Academy",
  description:
    "What the 42X Academy SAP course covers: MM, SD, EWM, ABAP, and BASIS, including modules, capstones, and the roles each track prepares you for.",
};

export default function SapPage() {
  return <SapCourseDetails />;
}

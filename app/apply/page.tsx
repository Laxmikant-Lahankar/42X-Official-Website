import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Customsection } from "@/app/CustomSection";
import { CTAS } from "@/lib/cta";
import ApplyForm from "./apply-form";

export const metadata: Metadata = pageMeta({
  title: "Apply – Join the Founding Cohort",
  description:
    "Apply to join the 42X Academy founding cohort for SAP, Power BI, Power Platform or DevOps training, online or in Pune.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <Customsection>
      <div className="px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            Founding Cohort
          </p>
          <h1 className="text-3xl md:text-4xl">{CTAS.primary.label}</h1>
          <Suspense fallback={null}>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </Customsection>
  );
}

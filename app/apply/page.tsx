import { Suspense } from "react";
import type { Metadata } from "next";
import { Customsection } from "@/app/CustomSection";
import { CTAS } from "@/lib/cta";
import ApplyForm from "./apply-form";

export const metadata: Metadata = {
  title: CTAS.primary.label,
  description: "Join the 42X Academy founding cohort.",
};

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

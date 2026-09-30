import { Suspense } from "react";
import type { Metadata } from "next";
import { Customsection } from "@/app/CustomSection";
import { CTAS } from "@/lib/cta";
import BookPanel from "./book-panel";

export const metadata: Metadata = {
  title: CTAS.secondary.label,
  description: "Talk to an expert at 42X Academy.",
};

export default function BookPage() {
  return (
    <Customsection>
      <div className="px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl">{CTAS.secondary.label}</h1>
          <Suspense fallback={null}>
            <BookPanel />
          </Suspense>
        </div>
      </div>
    </Customsection>
  );
}

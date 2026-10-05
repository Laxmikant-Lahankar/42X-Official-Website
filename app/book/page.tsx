import { Suspense } from "react";
import type { Metadata } from "next";
import { Customsection } from "@/app/CustomSection";
import BookPanel from "./book-panel";

export const metadata: Metadata = {
  title: "Talk to an Expert — 42X Academy",
  description:
    "Speak with a 42X Academy expert about your learning goals and find the right track for your career.",
};

export default function BookPage() {
  return (
    <Customsection>
      <div className="px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            Talk to an Expert
          </p>
          <h1 className="text-3xl font-light md:text-4xl">
            Let&apos;s find the right track for you
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Fill in your details and one of our experts will reach out within
            24&nbsp;hours to help you choose the best path for your career goals.
          </p>
          <Suspense fallback={null}>
            <BookPanel />
          </Suspense>
        </div>
      </div>
    </Customsection>
  );
}

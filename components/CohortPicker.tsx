"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { SAP_INTEREST } from "@/lib/interest";

const TRACKS = [
  {
    id: "sap",
    label: "SAP",
    detail: "Five tracks, from MM and SD through ABAP and BASIS.",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    detail: "Models, pipelines, and reports leadership can act on.",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    detail: "Apps, flows, and the automations enterprise teams ship.",
  },
] as const;

export function CohortPicker({
  open,
  onClose,
  src,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<"track" | "sap">("track");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setStep("track");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const choose = (course: string) => {
    const params = new URLSearchParams({ course, src });
    onClose();
    router.push(`/contact?${params.toString()}`);
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cohort-picker-title"
        className="relative z-10 flex max-h-[min(900px,calc(100vh-2rem))] w-full max-w-6xl flex-col overflow-y-auto rounded-3xl border border-white/10 bg-[#07090f] px-6 py-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:px-10 sm:py-12"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close course picker"
          className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-white/30 hover:text-white"
        >
          <X className="size-4" />
        </button>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium text-white/50 sm:text-sm">
            Join the cohort
          </p>
          <h2
            id="cohort-picker-title"
            className="mt-2 text-3xl font-light text-white md:text-4xl"
          >
            {step === "sap"
              ? "Which SAP track?"
              : "Which course are you interested in?"}
          </h2>
        </div>

        {step === "track" ? (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() =>
                  track.id === "sap" ? setStep("sap") : choose(track.id)
                }
                className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 text-center transition-colors hover:border-[#5B8CFF] hover:bg-[#5B8CFF]/10"
              >
                <span className="text-lg font-light text-white">
                  {track.label}
                </span>
                <span className="mt-2 max-w-[16rem] text-sm leading-relaxed text-white/60">
                  {track.detail}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {SAP_INTEREST.map((track, index) => (
              <button
                key={track.id}
                type="button"
                onClick={() => choose(track.id)}
                className={`flex min-h-32 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center transition-colors hover:border-[#5B8CFF] hover:bg-[#5B8CFF]/10 lg:col-span-2 ${
                  index === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <span className="text-lg font-light text-white">
                  {track.label}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-white/60">
                  {track.detail}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === "sap" ? (
          <button
            type="button"
            onClick={() => setStep("track")}
            className="mx-auto mt-8 text-sm text-white/50 hover:text-white"
          >
            Back to courses
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

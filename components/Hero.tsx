"use client";

import { useEffect, useRef, useState } from "react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import StickyCtas from "@/components/StickyCtas";
import { CTAS, HERO_COHORT_BADGE } from "@/lib/cta";
import { cn } from "@/lib/utils";

const COMPANIES = [
  "Google",
  "Microsoft",
  "IBM",
  "Delloite",
  "Infosys",
  "Capgemini",
];

const VIDEO_REVEAL_MS = 1;

export default function Hero({
  title = "Master In-Demand Skills. Unlock Your Potential.",
}: {
  title?: string;
} = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveal = () => {
      setShowVideo(true);
      void video?.play().catch(() => undefined);
    };

    if (reduced) {
      reveal();
      return;
    }

    const id = window.setTimeout(reveal, VIDEO_REVEAL_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Customsection>
        {/* Fixed height on mobile (h-[40rem]) removes the extra black space.
            Raise it (e.g. h-[42rem]) if it feels cramped, lower it to tighten. */}
        <main
          id="hero"
          className="relative flex h-[40rem] w-full flex-col overflow-hidden bg-black md:h-[55rem]"
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-bottom",
              showVideo ? "animate-hero-bg" : "opacity-0",
            )}
          >
            <source src="/hero-video2.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/10" />

          {/* Text area: spans only the black part (hero top -> earth horizon).
              Change bottom-[42%] to move the text up (bigger) or down (smaller). */}
          <section className="absolute inset-x-0 top-0 bottom-[42%] z-10 flex items-center justify-center px-4 text-center sm:px-6">
            <div className="w-full max-w-4xl text-white">
              <div className="animate-drop-down mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#2E57DF]/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium shadow-inner backdrop-blur-md sm:mb-8 sm:px-4 sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                {/* TODO: add the real founding-cohort seat count. Do not invent a number. */}
                <span>{HERO_COHORT_BADGE}</span>
              </div>

              <h1 className="animate-fade-up text-balance text-3xl leading-[1.15] opacity-0 sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              <p className="animate-fade-up mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 opacity-0 sm:mt-6 md:text-base [animation-delay:180ms]">
                Gain practical expertise through industry-focused courses,
                dedicated mentorship, and real-world projects that help you
                build a stronger career.
              </p>

              <div className="animate-fade-up mt-5 flex flex-col items-center gap-2 opacity-0 sm:mt-6 [animation-delay:320ms]">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <CTAButton
                    cta={CTAS.primary}
                    src="hero"
                    variant="primary"
                    size="lg"
                  />
                  <CTAButton
                    cta={CTAS.secondary}
                    src="hero"
                    variant="secondary"
                    size="lg"
                  />
                </div>
                {/* <CTAButton
                  cta={CTAS.quiz}
                  src="hero"
                  variant="link"
                  className="text-[11px] text-white/45"
                /> */}
              </div>
            </div>
          </section>

          {/* Marquee: pinned to the bottom, overlaying the earth */}
          <div className="animate-fade-in-delayed absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8">
            <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 sm:mb-9 sm:text-sm sm:tracking-[0.28em]">
              Backed by Experts at
            </p>
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[...COMPANIES, ...COMPANIES].map((company, index) => (
                  <span
                    key={`${company}-${index}`}
                    className="flex items-center px-5 text-base font-medium tracking-wide text-white/80 sm:px-8 sm:text-xl"
                  >
                    {company}
                    <span
                      aria-hidden
                      className="ml-5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30 sm:ml-8"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </Customsection>
      <StickyCtas />
    </>
  );
}
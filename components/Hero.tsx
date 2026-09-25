"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import Link from "next/link";
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
  title = "Master SAP, Data Engineering & Power Platform",
  activeCourse,
}: {
  title?: string;
  activeCourse?: string;
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
    <Customsection>
      <main className="relative flex h-[32rem] w-full flex-col overflow-hidden bg-black md:h-[55rem]">
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

        <section className="relative z-10 mb-15 flex flex-1 items-center justify-center px-6 text-center">
          <div className="max-w-4xl text-white">
            <div className="animate-drop-down mb-8 inline-flex items-center gap-2 rounded-full border border-[#2E57DF]/20 bg-white/10 px-4 py-1.5 text-xs font-medium shadow-inner backdrop-blur-md sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span>Seats filling fast for first cohort</span>
            </div>

            <h1 className="animate-fade-up text-5xl opacity-0 md:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-sm text-white/50 opacity-0 md:text-md [animation-delay:180ms]">
              Professional training with dedicated mentorship. Real-world
              projects. Career acceleration into top enterprises and reach new
              horizons.
            </p>

            <div className="animate-fade-up mt-8 flex justify-center gap-4 opacity-0 [animation-delay:320ms]">
              {activeCourse !== "sap" && (
                <Link
                  href="/sap"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-center text-sm font-medium text-white hover:bg-[#2E57DF]/90"
                >
                  SAP
                  <ArrowRight />
                </Link>
              )}

              {activeCourse !== "data-engineering" && (
                <Link
                  href="/data-engineering"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-center text-sm font-medium text-white hover:bg-[#2E57DF]/90"
                >
                  Data Engineering
                  <ArrowRight />
                </Link>
              )}
              {activeCourse !== "power-platform" && (
                <Link
                  href="/power-platform"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-center text-sm font-medium text-white hover:bg-[#2E57DF]/90"
                >
                  Power Platform
                  <ArrowRight />
                </Link>
              )}
            </div>
          </div>
        </section>

        <div className="animate-fade-in-delayed relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-2 pb-8">
          <p className="mb-9 text-center text-xs font-medium uppercase tracking-[0.28em] text-white/70 sm:text-sm">
            Backed by Experts at
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...COMPANIES, ...COMPANIES].map((company, index) => (
                <span
                  key={`${company}-${index}`}
                  className="flex items-center px-8 text-md font-medium tracking-wide text-white/80 sm:text-xl"
                >
                  {company}
                  <span
                    aria-hidden
                    className="ml-8 h-1.5 w-1.5 rounded-full bg-white/30"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Customsection>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, ClipboardList } from "lucide-react";
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

const heroButtonBase =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors";

const HERO_ACTIONS = [
  {
    href: "/contact",
    label: "Start Your Journey",
    icon: ArrowRight,
    className: cn(
      heroButtonBase,
      "bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white shadow-[0_8px_24px_rgba(46,87,223,0.35)] hover:from-[#6B98FF] hover:to-[#3A64E8]",
    ),
  },
  {
    href: "/contact?intent=quiz",
    label: "Take Career Quiz",
    icon: ClipboardList,
    className: cn(
      heroButtonBase,
      "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15",
    ),
  },
  {
    href: "/about",
    label: "Explore 42x Academy",
    icon: Compass,
    className: cn(
      heroButtonBase,
      "bg-white text-black hover:bg-white/90",
    ),
  },
] as const;

export default function Hero({
  title = "Master SAP, Data Engineering & Power Platform",
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
    <Customsection>
      <main className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col overflow-hidden bg-black md:h-[55rem] md:min-h-[55rem]">
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

        <section className="relative z-10 mb-6 flex flex-1 items-center justify-center px-4 py-10 text-center sm:mb-12 sm:px-6 md:mb-15 md:py-0">
          <div className="w-full max-w-4xl text-white">
            <div className="animate-drop-down mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#2E57DF]/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium shadow-inner backdrop-blur-md sm:mb-8 sm:px-4 sm:text-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span>Seats filling fast for first cohort</span>
            </div>

            <h1 className="animate-fade-up text-balance text-3xl leading-[1.15] opacity-0 sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="animate-fade-up mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 opacity-0 sm:mt-6 md:text-base [animation-delay:180ms]">
              Professional training with dedicated mentorship. Real-world
              projects. Career acceleration into top enterprises and reach new
              horizons.
            </p>

            <div className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-2.5 opacity-0 sm:mt-8 sm:gap-3 [animation-delay:320ms]">
              {HERO_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={action.className}
                  >
                    {action.label}
                    <Icon className="size-3.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <div className="animate-fade-in-delayed relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8">
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
  );
}

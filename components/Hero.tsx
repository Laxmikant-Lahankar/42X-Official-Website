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
const WHATSAPP_URL = "https://wa.me/918484834242";

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
    <>
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
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6 sm:size-14"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-7 sm:size-8"
        fill="currentColor"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44zM12.07 21.3h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.9 9.89zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
    </>
  );
}

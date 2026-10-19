"use client";

import { useEffect, useRef, useState } from "react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import StickyCtas from "@/components/StickyCtas";
import { CTAS, HERO_COHORT_BADGE } from "@/lib/cta";
import { cn } from "@/lib/utils";

const COMPANIES = [
  { name: "Google", logo: "/logos/google.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "IBM", logo: "/logos/ibm.png" },
  { name: "Deloitte", logo: "/logos/deloitte.png" },
  { name: "Infosys", logo: "/logos/infosys.png" },
  { name: "Capgemini", logo: "/logos/capgemini.png" },
];

const LOGO_SET = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

const VIDEO_REVEAL_MS = 1;

// Mobile gets a lighter, lower-res video (see ffmpeg commands in the notes).
// If the mobile file is missing, the code falls back to the desktop video.
const VIDEO_DESKTOP = "/hero-video2.mp4";
const VIDEO_MOBILE = "/hero-video2-mobile.mp4";
const VIDEO_POSTER = "/hero-poster.jpg";
const MOBILE_QUERY = "(max-width: 767px)";

// Single source of truth for the hero height. Used by both the full-width
// shell and the constrained content box, so we don't depend on Customsection
// accepting a className / h-full.
// Raise the 2xl value if the earth horizon sits too high on big monitors.
const HERO_HEIGHT = "h-[40rem] md:h-[55rem]";

export default function Hero({
  title = "Master In-Demand Skills. Unlock Your Potential.",
}: {
  title?: string;
} = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = connection?.saveData === true;

    // Only autoplay when the user hasn't asked for less motion / less data.
    // Otherwise the poster / first frame is shown and nothing keeps running.
    const shouldPlay = !reduced && !saveData;

    const play = () => void video.play().catch(() => undefined);

    // If the mobile file doesn't exist, fall back to the desktop one.
    const onError = () => {
      if (video.getAttribute("src") === VIDEO_MOBILE) {
        video.src = VIDEO_DESKTOP;
        if (shouldPlay) play();
      }
    };
    video.addEventListener("error", onError);

    // Set the source here (not in JSX) so phones never download the
    // desktop video during SSR/hydration.
    video.preload = shouldPlay ? "auto" : "metadata";
    video.src = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;

    // Pause when the hero is off-screen: saves battery and bandwidth.
    const io = new IntersectionObserver(([entry]) => {
      if (!shouldPlay) return;
      if (entry.isIntersecting) play();
      else video.pause();
    });
    io.observe(video);

    const id = window.setTimeout(() => {
      setShowVideo(true);
      if (shouldPlay) play();
    }, VIDEO_REVEAL_MS);

    return () => {
      window.clearTimeout(id);
      io.disconnect();
      video.removeEventListener("error", onError);
    };
  }, []);

  // JS-driven marquee: no CSS keyframes needed. Moves the track left by
  // SPEED px/sec and wraps by exactly one group width, so it never jumps.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 60; // px per second. Raise = faster, lower = slower.
    let x = 0;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const groupWidth =
        (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      if (groupWidth > 0 && !pausedRef.current) {
        x -= SPEED * dt;
        if (x <= -groupWidth) x += groupWidth;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      {/* FULL-WIDTH SHELL: owns the height, the black bg and the video.
          This sits OUTSIDE Customsection so the earth spans the whole screen. */}
      <section
        id="hero"
        className={cn(
          "relative w-full overflow-hidden bg-black",
          HERO_HEIGHT,
        )}
      >
        {/* 1. Full-bleed video */}
        {/* The video box is sized by HEIGHT (aspect-video), centered, never by
            screen width. So the earth keeps the same scale and horizon height
            on any monitor. It is wider than the grid lines, so it spills past
            them, then fades into the black page on the left and right.
            Widen/narrow the fade by changing the 18% values. */}
        <div className="absolute bottom-0 left-1/2 h-full aspect-video -translate-x-1/2 translate-y-[10%] md:translate-y-[8%] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden
            poster={VIDEO_POSTER}
            className={cn(
              "h-full w-full object-cover object-bottom",
              showVideo ? "animate-hero-bg" : "opacity-0",
            )}
          />
          {/* src is assigned in the effect above (mobile vs desktop file) */}
        </div>

        {/* 2. Full-width bottom fade so the marquee area blends to black
            all the way to the screen edges (not just inside the container). */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* 3. Constrained content layer: dashed side lines, text, marquee.
            NOTE: Customsection must NOT have a solid background (bg-black etc.),
            otherwise it will cover the video. Make it transparent. */}
        <div className="absolute inset-0 z-10">
          <Customsection>
            <main className={cn("relative flex w-full flex-col bg-transparent", HERO_HEIGHT)}>
              {/* Text area: spans only the black part (hero top -> earth horizon).
                  Change bottom-[42%] to move the text up (bigger) or down (smaller).
                  2xl:bottom-[46%] keeps text clear of the horizon on big screens. */}
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
                        cta={CTAS.explore}
                        src="hero"
                        variant="gradient"
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

              {/* Marquee: pinned to the bottom, overlaying the earth.
                  The gradient now lives in the full-width layer above. */}
              <div className="animate-fade-in-delayed absolute inset-x-0 bottom-0 z-20 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8">
                <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 sm:mb-9 sm:text-sm sm:tracking-[0.28em]">
                  Backed by Experts at
                </p>
                <div
                  className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                  onMouseEnter={() => (pausedRef.current = true)}
                  onMouseLeave={() => (pausedRef.current = false)}
                >
                  <div
                    ref={trackRef}
                    className="flex w-max will-change-transform"
                  >
                    {[0, 1].map((group) => (
                      <div
                        key={group}
                        className="flex shrink-0 items-center"
                        aria-hidden={group === 1}
                      >
                        {LOGO_SET.map((company, index) => (
                          <div
                            key={`${group}-${company.name}-${index}`}
                            className="flex shrink-0 items-center px-2 sm:px-3"
                          >
                            <div className="flex h-10 w-28 items-center justify-center px-3 sm:h-12 sm:w-36">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={company.logo}
                                alt={group === 0 ? company.name : ""}
                                className={cn(
                                  "h-5 w-auto max-w-full object-contain sm:h-7",
                                  company.logo,
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </Customsection>
        </div>
      </section>
      <StickyCtas />
    </div>
  );
}
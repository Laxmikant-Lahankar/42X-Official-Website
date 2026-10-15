import { ArrowRight, Check, Globe, X } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { CTA_COPY, CTAS, ctaWithLabel } from "@/lib/cta";
import Reveal from "./Reveal";

// Theme tokens (styling only), same as the courses and contact pages
const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";

// Desktop columns: Other courses | arrow | 42X Academy (wider, it is the focus).
// The spotlight panels, the line and every row use this same template so they line up.
const GRID = "md:grid-cols-[1fr_2.5rem_1.25fr]";

const TAGLINE = "Mentors from Tech Giants Working in Europe & USA";

const ROWS = [
  {
    them: "Trainers who teach theory",
    us: "Mentors with Global Industry Experience",
  },
  {
    them: "One trainer. A crowded classroom.",
    us: "Personalized Guidance. A Clearer Learning Path.",
  },
  {
    them: "Practice exercises & case studies",
    us: "Build Projects That Demonstrate Your Skills",
  },
  {
    them: "A certificate to add to your CV",
    us: "Showcase Your Skills. Stand Out in Interviews.",
  },
  {
    them: "Technical knowledge alone",
    us: "Prepare to Present Yourself with Confidence",
  },
];

export default function WhyUs() {
  return (
    <Customsection>
      {/* No background of its own: it uses the same plain background as the rest of the page */}
      <div className="relative overflow-hidden px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <SectionHeader
          badge="Why choose us"
          title={"Don't Just Learn Tech. Become Industry-Ready."}
        />

        {/* Tagline for small screens (on desktop it sits in the 42X column header) */}
        <p className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2 text-center text-xs font-medium text-[#8DBEFF] md:hidden">
          <Globe aria-hidden className="size-4 shrink-0" />
          {TAGLINE}
        </p>

        <div className="relative mx-auto mt-8 max-w-5xl md:mt-14">
          {/* Panels behind both columns, plus the line that links the arrows (desktop) */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -inset-y-5 inset-x-0 hidden gap-4 md:grid ${GRID}`}
          >
            {/* Other courses: muted, cracked card */}
            <div className="relative col-start-1 row-start-1 -mx-3 overflow-hidden rounded-3xl border border-[#263A5D] bg-gradient-to-br from-[#0E1628]/90 to-[#05070F]">
              <svg
                viewBox="0 0 400 200"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-1/4 w-full opacity-60"
              >
                <path
                  d="M0 200 L60 150 L90 170 L150 110 L190 140 L260 80 L300 120 L360 60 L400 90"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.1"
                  strokeWidth="1.2"
                />
                <path
                  d="M120 200 L160 160 L150 130 M260 200 L240 150 L275 120"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <span className="col-start-2 row-start-1 mx-auto my-24 w-px bg-gradient-to-b from-[#00B4FF]/0 via-[#7B3DFF]/60 to-[#E34BEF]/0" />
            {/* 42X Academy: glowing spotlight */}
            <div className="col-start-3 row-start-1 -mx-3 rounded-3xl bg-gradient-to-b from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] p-[2px] shadow-[0_0_70px_-18px_rgba(123,61,255,.9)]">
              <div
                className="h-full rounded-[calc(1.5rem-2px)] bg-[#06112A]"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,180,255,.22), transparent 80%), linear-gradient(160deg, rgba(0,180,255,.10), rgba(123,61,255,.14) 60%, rgba(217,70,239,.10))",
                }}
              />
            </div>
          </div>

          {/* Column headings (desktop) */}
          <div className={`relative mb-4 hidden items-end gap-4 md:grid ${GRID}`}>
            <div className="px-4">
              <p
                className={`${HEADING} text-2xl font-bold uppercase tracking-[0.12em] text-white/50`}
              >
                Other courses
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-white/30">
                The usual route
              </p>
            </div>
            <span aria-hidden />
            <div className="px-4">
              <p
                className={`${HEADING} bg-gradient-to-r from-[#5CD2FF] via-[#A58BFF] to-[#F08BFF] bg-clip-text text-2xl font-bold uppercase tracking-[0.12em] text-transparent`}
              >
                42X Academy
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium leading-snug text-[#BFE4FF]">
                <Globe aria-hidden className="size-4 shrink-0 text-[#00B4FF]" />
                {TAGLINE}
              </p>
            </div>
          </div>

          <div className="relative flex flex-col gap-4 md:gap-2.5">
            {ROWS.map((row) => (
              <Reveal key={row.us}>
                <div className={`group grid items-center gap-1.5 md:gap-4 ${GRID}`}>
                  {/* Other courses: muted but easy to read, inside its own card */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070D1B]/60 px-4 py-3 md:min-h-[4rem] md:bg-white/[0.03]">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#8B7BC8]/30 bg-[#8B7BC8]/10 text-[#B7A9E8]/80">
                      <X aria-hidden className="size-4" strokeWidth={2.25} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-white/55 sm:text-base">
                      <span className="sr-only">Other courses: </span>
                      {row.them}
                    </span>
                  </div>

                  {/* Arrow: the gap being closed */}
                  <span
                    aria-hidden
                    className="z-10 mx-auto inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] p-[2px] shadow-[0_0_18px_-6px_rgba(123,61,255,.9)] transition duration-300 group-hover:scale-110 md:size-10"
                  >
                    <span className="inline-flex size-full items-center justify-center rounded-full bg-[#070D1B] text-white">
                      <ArrowRight className="size-4 rotate-90 md:size-5 md:rotate-0" />
                    </span>
                  </span>

                  {/* 42X Academy: large, bright. On desktop it sits inside the spotlight panel */}
                  <div className="flex items-center gap-3 rounded-xl border border-[#00B4FF]/40 bg-[#081631] px-4 py-3 transition duration-200 md:min-h-[4rem] md:border-transparent md:bg-transparent md:group-hover:bg-white/[0.06]">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#00B4FF]/70 bg-[#00B4FF]/15 text-[#5CD2FF] shadow-[0_0_16px_-4px_rgba(0,180,255,.7)]">
                      <Check aria-hidden className="size-5" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-semibold leading-snug text-white sm:text-lg">
                      <span className="sr-only">42X Academy: </span>
                      {row.us}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <CTAButton
            cta={ctaWithLabel(CTAS.secondary, CTA_COPY.whyUs)}
            src="why-us"
            variant="link"
          />
        </Reveal>
      </div>
    </Customsection>
  );
}
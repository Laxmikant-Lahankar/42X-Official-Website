import { ArrowRight, Check, Globe, X } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { CTA_COPY, CTAS, ctaWithLabel } from "@/lib/cta";
import Reveal from "./Reveal";

// Theme tokens (styling only), same as the courses and contact pages
const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";

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

// Row n of the desktop grid (row 1 is the column headings). Literal class names so Tailwind sees them.
const ROW_START = [
  "md:row-start-2",
  "md:row-start-3",
  "md:row-start-4",
  "md:row-start-5",
  "md:row-start-6",
];

// Shared sizes, so both sides are identical apart from colour
const ROW_BASE =
  "relative z-10 flex items-center gap-3.5 rounded-xl border px-4 py-3 md:min-h-[4.5rem]";
const ICON_BASE = "inline-flex size-9 shrink-0 items-center justify-center";
const TEXT_BASE = "text-[15px] leading-snug sm:text-base";

export default function WhyUs() {
  const lastRow = ROWS.length - 1;

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

        <Reveal className="mx-auto mt-8 max-w-5xl md:mt-14">
          {/*
            One grid for everything on desktop: [Other courses | arrow | 42X Academy].
            Both panels span every row and every row is shared by all three columns,
            so the two boxes are exactly the same width and height and each row lines up.
            Below md it collapses to: card, arrow, card for each row.
          */}
          <div className="relative grid gap-y-1.5 md:grid-cols-[1fr_2.5rem_1fr] md:gap-x-5 md:gap-y-3">
            {/* Panel: Other courses (muted, cracked) */}
            <div
              aria-hidden
              className="pointer-events-none relative z-0 hidden overflow-hidden rounded-3xl border border-[#263A5D]/80 bg-gradient-to-br from-[#0E1628]/90 to-[#05070F] md:col-start-1 md:row-span-6 md:row-start-1 md:block"
            >
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

            {/* Panel: 42X Academy (gradient border + glow) */}
            <div
              aria-hidden
              className="pointer-events-none relative z-0 hidden rounded-3xl bg-gradient-to-b from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] p-[2px] shadow-[0_0_70px_-18px_rgba(123,61,255,.9)] md:col-start-3 md:row-span-6 md:row-start-1 md:block"
            >
              <div
                className="h-full rounded-[calc(1.5rem-2px)] bg-[#06112A]"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,180,255,.22), transparent 80%), linear-gradient(160deg, rgba(0,180,255,.10), rgba(123,61,255,.14) 60%, rgba(217,70,239,.10))",
                }}
              />
            </div>

            {/* Line that links the arrows (desktop) */}
            <span
              aria-hidden
              className="pointer-events-none z-0 my-9 hidden w-px justify-self-center bg-gradient-to-b from-[#00B4FF]/0 via-[#7B3DFF]/60 to-[#E34BEF]/0 md:col-start-2 md:row-span-5 md:row-start-2 md:block"
            />

            {/* Column headings (desktop). Same structure and padding on both sides. */}
            <div className="relative z-10 hidden md:col-start-1 md:row-start-1 md:mx-6 md:mt-7 md:block">
              <p
                className={`${HEADING} text-2xl font-bold uppercase tracking-[0.12em] text-white/50`}
              >
                Other courses
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-white/35">
                The usual route
              </p>
            </div>
            <div className="relative z-10 hidden md:col-start-3 md:row-start-1 md:mx-6 md:mt-7 md:block">
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

            {/* Rows: Other courses | arrow | 42X Academy */}
            {ROWS.map((row, i) => {
              const start = ROW_START[i];
              const bottom = i === lastRow ? "md:mb-7" : "";
              const gapAbove = i === 0 ? "" : "max-md:mt-5";
              return [
                <div
                  key={`${row.us}-them`}
                  className={`${ROW_BASE} ${start} ${bottom} ${gapAbove} border-white/[0.08] bg-[#070D1B]/60 md:col-start-1 md:mx-5 md:bg-white/[0.03]`}
                >
                  <span
                    className={`${ICON_BASE} rounded-full border border-[#8B7BC8]/30 bg-[#8B7BC8]/10 text-[#B7A9E8]/80`}
                  >
                    <X aria-hidden className="size-4" strokeWidth={2.25} />
                  </span>
                  <span className={`${TEXT_BASE} font-medium text-white/55`}>
                    <span className="sr-only">Other courses: </span>
                    {row.them}
                  </span>
                </div>,

                /* Arrow: the gap being closed */
                <span
                  key={`${row.us}-arrow`}
                  aria-hidden
                  className={`relative z-10 inline-flex size-8 items-center justify-center justify-self-center rounded-full bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] p-[2px] shadow-[0_0_18px_-6px_rgba(123,61,255,.9)] transition duration-300 hover:scale-110 md:size-10 md:self-center ${start} ${bottom} md:col-start-2`}
                >
                  <span className="inline-flex size-full items-center justify-center rounded-full bg-[#070D1B] text-white">
                    <ArrowRight className="size-4 rotate-90 md:size-5 md:rotate-0" />
                  </span>
                </span>,

                <div
                  key={`${row.us}-us`}
                  className={`${ROW_BASE} ${start} ${bottom} border-[#00B4FF]/40 bg-[#081631] transition duration-200 hover:bg-[#0B1E40] md:col-start-3 md:mx-5 md:border-[#00B4FF]/25 md:bg-[#00B4FF]/[0.06] md:hover:bg-[#00B4FF]/[0.11]`}
                >
                  <span
                    className={`${ICON_BASE} rounded-lg border border-[#00B4FF]/70 bg-[#00B4FF]/15 text-[#5CD2FF] shadow-[0_0_16px_-4px_rgba(0,180,255,.7)]`}
                  >
                    <Check aria-hidden className="size-5" strokeWidth={2.5} />
                  </span>
                  <span className={`${TEXT_BASE} font-semibold text-white`}>
                    <span className="sr-only">42X Academy: </span>
                    {row.us}
                  </span>
                </div>,
              ];
            })}
          </div>
        </Reveal>

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
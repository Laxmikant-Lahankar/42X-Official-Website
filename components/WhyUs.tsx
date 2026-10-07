import { Check, X } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { CTA_COPY, CTAS, ctaWithLabel } from "@/lib/cta";
import Reveal from "./Reveal";

const ROWS = [
  {
    us: "Mentors from SAP, TCS, and Microsoft",
    them: "Education entrepreneurs",
  },
  {
    us: "1-on-1 mentorship",
    them: "Classrooms of 100+",
  },
  {
    us: "Real enterprise projects",
    them: "Theory, not the job",
  },
  {
    us: "A portfolio companies recognize",
    them: "Another certificate",
  },
  {
    us: "Resume coaching and interview prep",
    them: "Certificate holders, not career-ready",
  },
];

export default function WhyUs() {
  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Why choose us"
          title={"Here's how we close that gap."}
        />

        <div className="mt-12 flex flex-col gap-2.5">
          <Reveal>
            <div className="grid grid-cols-2 rounded-2xl bg-white/[0.07] px-4 py-5 sm:px-8 sm:py-6">
              <h3 className="text-center text-lg font-light tracking-tight text-white sm:text-3xl">
                42X Academy
              </h3>
              <h3 className="text-center text-lg font-light tracking-tight text-white/45 sm:text-3xl">
                Other courses
              </h3>
            </div>
          </Reveal>

          {ROWS.map((row, index) => (
            <Reveal key={row.us}>
              <div
                className={`grid grid-cols-2 items-center rounded-2xl px-4 py-4 sm:px-8 sm:py-5 ${
                  index % 2 === 0 ? "bg-white/[0.035]" : "bg-white/[0.06]"
                }`}
              >
                <div className="flex min-w-0 items-center justify-center gap-2.5 px-2 sm:gap-3">
                  <Check
                    aria-hidden
                    className="size-4 shrink-0 text-[#5B8CFF] sm:size-[18px]"
                    strokeWidth={2.25}
                  />
                  <span className="text-center text-xs leading-snug text-white sm:text-base">
                    <span className="sr-only">42X Academy: </span>
                    {row.us}
                  </span>
                </div>
                <div className="flex min-w-0 items-center justify-center gap-2.5 px-2 sm:gap-3">
                  <X
                    aria-hidden
                    className="size-4 shrink-0 text-[#F07167] sm:size-[18px]"
                    strokeWidth={2.25}
                  />
                  <span className="text-center text-xs leading-snug text-white/50 sm:text-base">
                    <span className="sr-only">Other courses: </span>
                    {row.them}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
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

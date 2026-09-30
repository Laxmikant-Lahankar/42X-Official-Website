import { CTAButton } from "@/components/CTAButton";
import { CTAS } from "@/lib/cta";
import Reveal from "./Reveal";

export default function Finalcta() {
  return (
    <div id="final-cta" className="mt-16 flex w-full items-center justify-center">
      <div
        className="flex h-[500px] w-full max-w-[1250px] items-center justify-center rounded-sm border border-white/10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/final.jpg')" }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-black/45 px-6 text-center">
          <Reveal className="flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            Let&apos;s begin
          </div>

          <h2 className="max-w-2xl text-3xl font-light text-white md:text-5xl">
            Begin your journey
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed font-light text-white/60 md:text-base">
            Real mentors. Live enterprise work. A path into SAP, Power BI, and
            Power Platform roles—not another certificate on the shelf.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <CTAButton
                cta={CTAS.primary}
                src="final"
                variant="primary"
                size="md"
              />
              <CTAButton
                cta={CTAS.secondary}
                src="final"
                variant="secondary"
                size="md"
              />
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

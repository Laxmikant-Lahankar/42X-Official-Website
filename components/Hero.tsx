import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Customsection } from "@/app/CustomSection";

const COMPANIES = [
  "Google",
  "Microsoft",
  "IBM",
  "Delloite",
  "Infosys",
  "Capgemini",
];

export default function Hero() {
  return (
    <Customsection>
      <main className="relative flex h-[32rem] w-full flex-col overflow-hidden md:h-[55rem]">
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        >
          <source src="/hero-video2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10" />

        <section className="relative z-10 flex flex-1 items-center justify-center px-6 text-center mb-15">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#2E57DF]/20 text-xs sm:text-sm font-medium shadow-inner mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Seats filling fast for first cohort</span>
            </div>

            <h1 className="text-5xl md:text-4xl lg:text-5xl">
              Master SAP, Data Engineering & Power Platform
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm text-white/50 md:text-md">
              Professional training with dedicated mentorship. Real-world
              projects. Career acceleration into top enterprises and reach new
              horizons.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="h-11 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-center text-white hover:bg-[#2E57DF]/90"
              >
                Get started
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 rounded-full border-[#2E57DF]/50 bg-white/10 backdrop-blur-md px-6 text-white hover:bg-white/10 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <div className="relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-2 pb-8">
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

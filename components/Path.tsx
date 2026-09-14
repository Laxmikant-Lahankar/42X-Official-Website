import { Customsection } from "@/app/CustomSection";
import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    number: "01",
    title: "We teach you",
    description:
      "Start with the core skills enterprises actually use in SAP, Power BI, and Power Platform. Clear lessons, real systems, and a foundation that goes beyond theory.",
  },
  {
    number: "02",
    title: "You build real projects",
    description:
      "Apply what you learn on live enterprise-style work. You leave with a portfolio companies recognize—not just another certificate.",
  },
  {
    number: "03",
    title: "We mentor you 1-on-1",
    description:
      "You are not left in a classroom of 100. A mentor with real industry experience reviews your work, unblocks you, and keeps you on track.",
  },
  {
    number: "04",
    title: "You launch your career",
    description:
      "Resume coaching, interview prep, and enterprise network access. We help you land the role—most graduates do within 8–12 weeks.",
  },
];

export default function LearningPath() {
  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start ">
            <SectionHeader
              className="max-w-md"
              badge="Learn. Build. Launch."
              title="Your Learning Path, Designed for Results"
            />
          </div>

          <div className="relative">
            {STEPS.map((step, index) => {
              const isLastCard = index === STEPS.length - 1;

              return (
                <article
                  key={step.number}
                  className="mb-4 flex flex-col overflow-hidden rounded-sm border border-white/5 bg-[#141414] ring-white/10 md:block"
                  style={{
                    position: isLastCard ? "relative" : "sticky",
                    top: isLastCard ? "auto" : "6rem",
                    zIndex: index + 1,
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none block w-full select-none bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] bg-clip-text px-6 pt-8 text-center text-[7.5rem] leading-none font-medium text-transparent md:absolute md:top-1/2 md:left-[-0.28em] md:w-auto md:-translate-y-1/2 md:px-0 md:pt-0 md:text-left md:text-[10.5rem]"
                  >
                    {step.number}
                  </span>
                  <div className="relative z-10 mt-auto px-6 pt-4 pb-8 md:mt-0 md:flex md:min-h-[15.5rem] md:items-center md:py-10 md:pr-12 md:pl-[11.5rem]">
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Customsection>
  );
}

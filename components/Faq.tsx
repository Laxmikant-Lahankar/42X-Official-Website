"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import { CTAS, FAQ_FOLLOWUP } from "@/lib/cta";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { FAQS } from "@/lib/faqs";


export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Customsection id="faq">
      <div className="px-10 py-15">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader
              className="max-w-md"
              badge="FAQ"
              title={
                <>
                  From Learning Goals
                  <br />
                  To Real Achievements
                </>
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <Reveal key={faq.question} delayMs={index * 70}>
                  <div className="rounded-2xl bg-[#141414] p-5 ring-1 ring-white/8">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm md:text-lg font-light text-white">
                        {faq.question}
                      </span>
                      <Plus
                        aria-hidden
                        className={cn(
                          "size-5 shrink-0 text-[#5B8CFF] transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed font-light text-white/55">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="mt-18 flex justify-center">
          <CTAButton cta={CTAS.faq} src="courses" variant="link" />
        </div>
      </div>
    </Customsection>
  );
}

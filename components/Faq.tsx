"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "./SectionHeader";

const FAQS = [
  {
    question:
      "Do I need any prior experience with SAP or Power BI to get started?",
    answer:
      "No. We start from the fundamentals and move into live enterprise workflows. Beginners and career-switchers both complete the same path—with 1-on-1 mentorship if you get stuck.",
  },
  {
    question: "How are 42X courses different from free tutorials?",
    answer:
      "Free tutorials teach theory. You work on real enterprise-style systems, get weekly code reviews, and leave with a portfolio companies recognize—not another certificate from a playlist.",
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Yes. You get a completion certificate, but the hiring signal is the project work. Mentors review your portfolio so it reads like enterprise experience, not a class assignment.",
  },
  {
    question: "How much time do I need to commit each week?",
    answer:
      "Plan for 8–12 hours a week. Lessons, projects, and mentor sessions are structured so working professionals can finish without quitting their current role.",
  },
  {
    question: "What tools and systems will I learn throughout the courses?",
    answer:
      "Depending on the track: SAP modules used in enterprise, Power BI for dashboards leadership actually uses, and Power Platform for apps and automation. You practice on the same class of systems hiring teams run.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Customsection id="faq">
      <div className="px-6 py-16 md:px-12 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader
              className="max-w-md"
              badge="Faq"
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
                <div
                  key={faq.question}
                  className="rounded-2xl bg-[#141414] ring-1 ring-white/8 p-5"
                >
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
              );
            })}
          </div>
        </div>
      </div>
    </Customsection>
  );
}

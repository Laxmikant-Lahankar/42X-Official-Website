"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "./SectionHeader";

const AUTOPLAY_MS = 5000;

const PERKS = [
  {
    id: 1,
    title: "Lifetime Access to Everything",
    description:
      "Enroll once, access forever. Your course materials, projects, and video lessons stay with you. Plus, as we update the curriculum with new enterprise tech trends, you get those updates free. Never outdated. Always current.",
    tags: ["Lifetime Access", "Free Updates", "Always Current"],
    image: "/perks-1.png",
  },
  {
    id: 2,
    title: "Ask Anything. Anytime. Get Answers.",
    description:
      "Got a question at 11 PM? Stuck on a concept? Your mentor is available for unlimited doubt-clearing sessions. No limit on questions, no 'wait for office hours.' Real-time support when you need it. Learning doesn't stop at class time.",
    tags: ["Unlimited Support", "Doubts Cleared", "Anytime"],
    image: "/perks-2.png",
  },
  {
    id: 3,
    title: "Interview Prep & Salary Negotiation",
    description:
      "Mock interviews with feedback. Resume optimization. Salary negotiation coaching. We prepare you for every step of the hiring process. Most graduates land their offer in the first round because they're truly ready.",
    tags: ["Interview Ready", "Salary Coaching", "Placement Support"],
    image: "/perks-3.png",
  },
  {
    id: 4,
    title: "Direct Access to Hiring Partners' Openings",
    description:
      "Before jobs hit LinkedIn, they hit our board. Google, Microsoft, TCS, Infosys, Accenture, Capgemini—they post directly here first. Graduates get first look at real roles. Same-day notification. No cold applications. Direct referrals from your mentor into companies actively hiring.",
    tags: ["Exclusive Jobs", "Direct Referral", "Hiring Partners"],
    image: "/perks-4.png",
  },
  {
    id: 5,
    title: "Your Network is Your Net Worth",
    description:
      "Graduate with peers. Private Discord channel stays open forever. Find study buddies, collaborate on side projects, share job opportunities, get referrals. Years after finishing, you're still connected. Still learning from each other. Network = career growth that compounds over time.",
    tags: ["Alumni Network", "Peer Learning", "Forever Connected"],
    image: "/perks-5.png",
  },
];

export default function Perks() {
  const [activeId, setActiveId] = useState(PERKS[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = PERKS.findIndex((perk) => perk.id === currentId);
        const nextIndex = (currentIndex + 1) % PERKS.length;
        return PERKS[nextIndex].id;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [activeId, isPaused, reducedMotion]);

  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Perks"
          title="The Perks of Learning with Us"
          className="max-w-md"
        />

        <div
          className="mt-12 grid items-stretch gap-4 lg:grid-cols-2 lg:gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:min-h-0">
            {PERKS.map((perk) => (
              <Image
                key={perk.id}
                src={perk.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn(
                  "object-cover transition-opacity duration-500 ease-out",
                  perk.id === activeId ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {PERKS.map((perk) => {
              const isOpen = perk.id === activeId;

              return (
                <button
                  key={perk.id}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveId(perk.id)}
                  className={cn(
                    "rounded-2xl px-6 py-5 text-left ring-1 transition-[background-color,box-shadow,ring-color] duration-300",
                    isOpen
                      ? "bg-white/[0.08] ring-white/15"
                      : "bg-white/[0.04] ring-white/8 hover:bg-white/[0.06] hover:ring-white/12",
                  )}
                >
                  <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">
                    {perk.id}. {perk.title}
                  </h3>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                        {perk.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {perk.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/60"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Customsection>
  );
}

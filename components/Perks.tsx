import {
  Briefcase,
  Building2,
  FolderKanban,
  Infinity,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import { CTAS } from "@/lib/cta";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const PERKS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Lifetime Access to Everything",
    description:
      "Enroll once. Materials, projects, and lessons stay with you, including future updates.",
    icon: Infinity,
  },
  {
    title: "Ask Anything. Anytime. Get Answers.",
    description:
      "Unlimited mentor support whenever you're stuck. No office hours.",
    icon: MessageCircle,
  },
  {
    title: "Interview Prep & Salary Negotiation",
    description:
      "Mock interviews, resume reviews, and salary coaching before you apply.",
    icon: Briefcase,
  },
  {
    title: "Direct Access to Hiring Partners' Openings",
    description:
      "Hiring-partner roles before they hit LinkedIn, with a mentor referral.",
    icon: Building2,
  },
  {
    title: "Your Network is Your Net Worth",
    description:
      "A private Discord that stays open, so the peer network doesn't end at graduation.",
    icon: Users,
  },
  {
    title: "Real Enterprise Projects",
    description:
      "You build on live enterprise-style systems, not classroom theory.",
    icon: FolderKanban,
  },
];

export default function Perks() {
  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="Perks"
            title="The Perks of Learning with Us"
            className="max-w-xl"
          />
          <CTAButton
            cta={CTAS.primary}
            src="perks"
            variant="primary"
            size="sm"
            className="shrink-0"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-2">
          {PERKS.map((perk, index) => {
            const Icon = perk.icon;
            const isLeft = index % 2 === 0;
            const isLastRow = index >= PERKS.length - 2;

            return (
              <Reveal
                key={perk.title}
                className={`h-full border-t border-white/[0.08] ${
                  isLeft ? "md:border-r" : ""
                } ${index === PERKS.length - 1 ? "border-b" : ""} ${
                  isLastRow ? "md:border-b" : ""
                }`}
              >
                <article
                  className={`h-full py-7 md:py-9 ${
                    index % 2 === 1 ? "md:pl-10" : "md:pr-10"
                  }`}
                >
                  <Icon
                    aria-hidden
                    className="size-7 text-[#5B8CFF]"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-5 text-xl font-medium tracking-tight text-white md:text-2xl">
                    {perk.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-white/60">
                    {perk.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Customsection>
  );
}

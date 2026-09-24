"use client";

import Image from "next/image";
import Link from "next/link";
import { Customsection } from "@/app/CustomSection";
import ScrollableCardStack, {
  type CardItem,
} from "@/components/smoothui/scrollable-card-stack";
import SectionHeader from "./SectionHeader";

const FACULTY: CardItem[] = [
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    role: "SAP Mentor",
    handle: "Currently at TCS",
    bio: "...",
    href: "https://www.linkedin.com",
    image: "/perks-1.png",
    avatar: "/perks-1.png",
    courses: ["sap"],   // <-- ye naya
  },
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    role: "Power BI Mentor",
    handle: "Currently at Microsoft",
    bio: "Builds executive dashboards and data models used in live businesses. Students leave able to ship reports leadership will actually open.",
    href: "https://www.linkedin.com",
    image: "/perks-2.png",
    avatar: "/perks-2.png",
    courses:[ "power-bi", "power-platform"],   
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Power Platform Mentor",
    handle: "Currently at Accenture",
    bio: "Designs apps and automations the way consulting teams deliver them. Weekly reviews go deep on architecture, not just whether it runs.",
    href: "https://www.linkedin.com",
    image: "/perks-3.png",
    avatar: "/perks-3.png",
    courses:["power-platform"],
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "Career Coach",
    handle: "Previously at SAP",
    bio: "Runs interview prep and resume reviews with hiring-manager context. He helps you talk about projects the way enterprise recruiters listen.",
    href: "https://www.linkedin.com",
    image: "/perks-4.png",
    avatar: "/perks-4.png",
    courses: ["sap", "power-bi"],
  },
  {
    id: "meera-shah",
    name: "Meera Shah",
    role: "Data Mentor",
    handle: "Currently at Infosys",
    bio: "Covers the data layer behind SAP and Power BI work. Clear lessons, real systems, and a standard of craft that shows up in your portfolio.",
    href: "https://www.linkedin.com",
    image: "/perks-5.png",
    avatar: "/perks-5.png",
    courses: ["sap", "power-platform"],
  },
];

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export default function Faculty({ course }: { course?: string } = {}) {
  const faculty = course
    ? FACULTY.filter((member) => member.courses?.includes(course))
    : FACULTY;

  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Faculty"
          title="The people who will actually teach you"
        />

        <div className="mt-8">
          <ScrollableCardStack
            items={faculty}
            cardHeight={360}
            className="w-full max-w-none"
            cardClassName="w-full"
            renderCard={(item) => (
              <div className="grid h-full md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)]">
                <div className="relative min-h-[12rem]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-6 md:px-10 bg-[#141414]">
                  {item.role ? (
                    <p className="text-xs tracking-wide text-white/50">
                      {item.role}
                    </p>
                  ) : null}
                  <h3 className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{item.handle}</p>
                  {item.bio ? (
                    <p className="mt-4 max-w-lg text-sm leading-relaxed font-light text-white/55">
                      {item.bio}
                    </p>
                  ) : null}
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <LinkedInMark />
                    LinkedIn
                  </Link>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </Customsection>
  );
}

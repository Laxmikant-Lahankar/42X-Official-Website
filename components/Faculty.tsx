"use client";

import { useState } from "react";
import Link from "next/link";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "./SectionHeader";
import { CoverflowCarousel, type CoverflowSlide } from "./Coverflowcarousel";

type FacultyMember = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  href: string;
  image: string;
  courses: string[];
};

const FACULTY: FacultyMember[] = [
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    role: "SAP Mentor",
    company: "Currently at TCS",
    bio: "Specializes in SAP implementation and data architecture. Brings real-world enterprise experience to every session. Students leave able to navigate complex SAP systems and design scalable solutions.",
    href: "https://www.linkedin.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=70",
    courses: ["sap"],
  },
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    role: "Power BI Mentor",
    company: "Currently at Microsoft",
    bio: "Builds executive dashboards and data models used in live businesses. Students leave able to ship reports leadership will actually open. Focuses on storytelling through data.",
    href: "https://www.linkedin.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=70",
    courses: ["power-bi", "power-platform"],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Power Platform Mentor",
    company: "Currently at Accenture",
    bio: "Designs apps and automations the way consulting teams deliver them. Weekly reviews go deep on architecture, not just whether it runs. Emphasizes best practices and scalable design patterns.",
    href: "https://www.linkedin.com",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=70",
    courses: ["power-platform", "data-engineering"],
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "Career Coach",
    company: "Previously at SAP",
    bio: "Runs interview prep and resume reviews with hiring-manager context. He helps you talk about projects the way enterprise recruiters listen. Track record of students landing roles at top companies.",
    href: "https://www.linkedin.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=70",
    courses: ["sap", "power-platform"],
  },
  {
    id: "meera-shah",
    name: "Meera Shah",
    role: "Data Mentor",
    company: "Currently at Infosys",
    bio: "Covers the data layer behind SAP and Power BI work. Clear lessons, real systems, and a standard of craft that shows up in your portfolio. Expert in data modeling and optimization.",
    href: "https://www.linkedin.com",
    image:
      "https://images.unsplash.com/photo-1519669335166-3da0e1db7841?w=400&h=400&fit=crop&q=70",
    courses: ["sap", "power-platform", "data-engineering"],
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredFaculty = course
    ? FACULTY.filter((member) => member.courses.includes(course))
    : FACULTY;

  // Transform faculty data into carousel slides
  const slides: CoverflowSlide[] = filteredFaculty.map((member) => ({
    src: member.image,
    alt: member.name,
    title: member.name,
    subtitle: member.role,
    meta: [],
  }));

  const activeFaculty = filteredFaculty[selectedIndex];

  // Handle carousel index changes
  const handleCarouselChange = (newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Faculty"
          title="The people who will actually teach you"
        />

        {/* Full Width Carousel */}
        <div className="mt-12 w-full">
          <div className="w-full">
            <CoverflowCarousel
              slides={slides}
              showCaption={false}
              showNavigation={true}
              showPagination={false}
              cardWidth="clamp(220px, 35vw, 360px)"
              label="Faculty carousel"
              className="w-full"
              cardClassName="border border-white/10"
              onSlideChange={handleCarouselChange}
            />
          </div>

          {/* Minimal Info Below Carousel */}
          {activeFaculty && (
            <div className="mt-8 w-full max-w-4xl mx-auto px-6">
              <div className="space-y-6 text-center">
                {/* Name */}
                <div>
                  <h3 className="text-2xl font-light text-white">
                    {activeFaculty.name}
                  </h3>
                  <p className="text-xs text-white/40 uppercase tracking-[0.12em] mt-2">
                    {activeFaculty.role}
                  </p>
                </div>

                {/* Background - Condensed */}
                <div className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
                  <p className="text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
                    Background
                  </p>
                  <p>{activeFaculty.bio}</p>
                </div>

                {/* What They Teach */}
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-white/40 mb-3">
                    What They Teach
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {activeFaculty.courses.map((course) => (
                      <span
                        key={course}
                        className="text-xs text-white/80 px-3 py-1 border border-white/20 rounded-full"
                      >
                        {course
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="pt-2">
                  <Link
                    href={activeFaculty.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
                  >
                    <LinkedInMark />
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => handleCarouselChange(index)}
                className={`size-2 rounded-full transition-opacity ${
                  index === selectedIndex
                    ? "bg-white opacity-100"
                    : "bg-white opacity-30 hover:opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Customsection>
  );
}

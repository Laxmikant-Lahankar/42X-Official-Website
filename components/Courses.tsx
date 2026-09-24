import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Infinity, Signal } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";

const courses = [
  {
    slug: "sap",
    title: "SAP for Enterprise Careers",
    badge: "SAP",
    description:
      "Learn the SAP skills enterprises actually hire for—real modules, live processes, and project work that goes beyond a certificate.",
    image: "/card-1.jpg",
    level: "Beginner to Intermediate",
    duration: "12 Weeks",
    lessons: "36 Lessons",
    access: "Lifetime Access",
  },
  {
    slug: "power-bi",
    title: "Power BI for Data Professionals",
    badge: "Power BI",
    description:
      "Build dashboards and data models used in the enterprise. Turn raw data into reports leadership can act on.",
    image: "/card-2.jpg",
    level: "Beginner",
    duration: "8 Weeks",
    lessons: "24 Lessons",
    access: "Lifetime Access",
  },
  {
    slug: "power-platform",
    title: "Power Platform Mastery",
    badge: "Power Platform",
    description:
      "Create apps, automate workflows, and ship solutions on Microsoft Power Platform the way enterprise teams work.",
    image: "/card-3.jpg",
    level: "Beginner to Intermediate",
    duration: "10 Weeks",
    lessons: "30 Lessons",
    access: "Lifetime Access",
  },
];

export default function Courses({ course }: { course?: string } = {}) {
  const filteredCourses = course
    ? courses.filter((item) => item.slug === course)
    : courses;

  return (
    <Customsection id="courses">
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Our courses"
          title="Explore Courses Designed for Delivering Real World Results"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredCourses.map((course) => (
            <article
              key={course.slug}
              className="flex h-full flex-col rounded-sm bg-[#141414] p-4 ring-1 ring-white/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                <Image
                  src={course.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {course.badge}
                </span>
              </div>

              <h3 className="mt-5 text-lg leading-snug text-white">
                {course.title}
              </h3>
              <p className="mt-2 min-h-[4.4rem] text-sm leading-relaxed text-white/60">
                {course.description}
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <Signal className="size-3.5 shrink-0 text-white/45" />
                  {course.level}
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="size-3.5 shrink-0 text-white/45" />
                  {course.duration}
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="size-3.5 shrink-0 text-white/45" />
                  {course.lessons}
                </li>
                <li className="flex items-center gap-2">
                  <Infinity className="size-3.5 shrink-0 text-white/45" />
                  {course.access}
                </li>
              </ul>

              <Button
                nativeButton={false}
                render={<Link href="/contact" />}
                variant="outline"
                className="mt-6 h-10 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Check Details
              </Button>
            </article>
          ))}

          <article className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-white/[0.03] p-8 text-center">
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium tracking-wide text-white/70">
              Coming soon
            </span>
            <h3 className="mt-5 max-w-xs text-lg leading-snug text-white">
              More interesting courses on the way
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
              New tracks are in the works. Check back for the next programs from
              42x.
            </p>
          </article>
        </div>
      </div>
    </Customsection>
  );
}

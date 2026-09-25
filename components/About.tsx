import Image from "next/image";
import {
  Handshake,
  Layers,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import DelayedBackground from "@/components/DelayedBackground";

const MOMENTS = [
  { src: "/courses1.png", label: "SAP systems" },
  { src: "/courses2.png", label: "Data work" },
  { src: "/whyus-2.png", label: "1:1 mentorship" },
  { src: "/whyus-1.png", label: "The cohort" },
];

const STATS = [
  { value: "1:1", label: "Mentorship, not a lecture hall" },
  { value: "3", label: "Tracks: SAP, Data, Power Platform" },
  { value: "8–12", label: "Weeks to a role, for most grads" },
];

const PLUS = [
  {
    icon: Layers,
    title: "A studio, not a classroom",
    body: "Cohorts stay small on purpose. You ship work, get it reviewed, and move on — no 100-person Zoom with a muted chat.",
  },
  {
    icon: Handshake,
    title: "Mentors who still do the job",
    body: "People from SAP, TCS, Microsoft, Accenture, and Infosys. They teach the systems they are still inside of.",
  },
  {
    icon: Sparkles,
    title: "Portfolio over paper",
    body: "Every track ends with projects hiring teams recognize. The certificate is a side effect, not the product.",
  },
  {
    icon: MessageCircle,
    title: "We stay through the offer",
    body: "Interview prep, resume reviews, and introductions. 42X does not end when the last lesson does.",
  },
];

const TEAM = [
  {
    name: "Ananya Rao",
    role: "SAP Mentor",
    meta: "Currently at TCS",
    image: "/perks-1.png",
  },
  {
    name: "Rahul Mehta",
    role: "Power BI Mentor",
    meta: "Currently at Microsoft",
    image: "/perks-2.png",
  },
  {
    name: "Priya Nair",
    role: "Power Platform Mentor",
    meta: "Currently at Accenture",
    image: "/perks-3.png",
  },
];

function Badge({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-gray-400 sm:text-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
      </span>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div>
      <Customsection id="about">
        <div className="flex flex-col items-center px-6 py-20 text-center md:px-12 md:py-24">
          <div className="animate-drop-down">
            <Badge>About 42X Academy</Badge>
          </div>
          <h1 className="animate-fade-up max-w-3xl text-4xl font-light text-white md:text-5xl lg:text-6xl">
            Empowering the next generation of enterprise talent.
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-sm leading-relaxed font-light text-white/50 opacity-0 md:text-base [animation-delay:150ms]">
            We are a mentorship-led academy for SAP, Data Engineering, and Power
            Platform — started by practitioners who were tired of training that
            stops at a certificate.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-6 pb-12 md:grid-cols-4 md:px-12 md:pb-16">
          {MOMENTS.map((moment, index) => (
            <Reveal key={moment.label} delayMs={index * 70}>
              <figure className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={moment.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2.5 text-left text-xs text-white/50">
                  {moment.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Customsection>

      <Customsection>
        <div className="grid items-center gap-12 px-6 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:px-12 md:py-20">
          <div>
            <SectionHeader
              badge="Who we are"
              title="Meet the people behind 42X."
            />
            <Reveal className="mt-8 flex max-w-xl flex-col gap-5 text-sm leading-relaxed font-light text-white/65 md:text-base">
              <p>
                42X Academy is a small training studio. We teach the enterprise
                stack hiring teams actually staff: SAP, data engineering, and
                Power Platform with one mentor on the other side of the work,
                not a recorded playlist.
              </p>
              <p>
                We started because too many capable people were collecting
                certificates and still walking into interviews unprepared.
                Classrooms of 100+ could not show them how live systems behave.
                Mentors who left the industry years ago could not either.
              </p>
              <p>
                So we built the academy we wished existed: practitioners still
                in the work, cohorts small enough to care, and a path that
                continues until the offer lands.
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={80} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/founder.png"
                alt="Lakshmikant Lahankar, founder at 42X Academy"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-white">Lakshmikant Lahankar</p>
            <p className="text-sm font-light text-white/45">
              Functional Analyst (SAP EWM) at Atlas Copco Group
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-t border-dashed border-white/12 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.value}
              delayMs={index * 80}
              className={`flex flex-col items-center px-6 py-10 text-center ${
                index > 0
                  ? "border-t border-dashed border-white/12 md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <p className="text-3xl font-light tracking-tight text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[14rem] text-xs tracking-wide text-white/45 md:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Customsection>

      <Customsection>
        <div className="px-6 py-16 md:px-12 md:py-20">
          <Reveal className="relative isolate min-h-[22rem] overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 md:min-h-[28rem]">
            <DelayedBackground delayMs={1}>
              <Image
                src="/about-banner.png"
                alt=""
                fill
                sizes="(min-width: 1250px) 1250px, 100vw"
                className="object-cover"
              />
            </DelayedBackground>
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/45 to-black/15" />
            <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-8 md:min-h-[28rem] md:p-12">
              <Badge>Why we started</Badge>
              <h2 className="max-w-xl text-3xl font-light text-white md:text-5xl">
                From theory to work that actually gets hired.
              </h2>
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed font-light text-white/60 md:text-base">
            42X exists so working professionals and career-switchers can learn
            enterprise systems the way they are used on the job — then talk
            about that work the way recruiters listen. We are not here to add
            another logo to a LinkedIn headline. We are here to make the next
            role feel possible.
          </Reveal>
        </div>
      </Customsection>

      <Customsection>
        <div className="px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            badge="How we work"
            title="The plus of learning inside 42X."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PLUS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delayMs={index * 70}
                  className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 md:p-8"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#2E57DF]/20 text-[#8EB4FF]">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-lg text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-light text-white/55">
                    {item.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Customsection>

      <Customsection>
        <div className="px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            className="mx-auto items-center text-center"
            badge="The team"
            title="Built by people still in the industry."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TEAM.map((person, index) => (
              <Reveal
                key={person.name}
                delayMs={index * 80}
                className="flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 640px) 30vw, 80vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-base text-white">{person.name}</p>
                <p className="text-sm font-light text-white/50">
                  {person.role}
                </p>
                <p className="text-xs text-white/35">{person.meta}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Customsection>
    </div>
  );
}

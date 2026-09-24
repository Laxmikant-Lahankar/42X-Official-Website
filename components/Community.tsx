import Image from "next/image";
import Link from "next/link";
import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const IMAGES = {
  discord: "",
  ama: "",
  growth: "",
  building: "",
};

const DISCORD_NOTIFICATIONS = [
  { count: 9, time: "5 min" },
  { count: 2, time: "now" },
  { count: 2, time: "now" },
];

const MEMBER_BUILDS = [
  {
    initials: "A",
    name: "Alex K",
    quote:
      "Sharing my full lead gen system — took 4 hrs to build, saves me 10 hrs/week.",
  },
  {
    initials: "M",
    name: "Maria P",
    quote:
      "Sharing my full lead gen system — took 4 hrs to build, saves me 10 hrs/week.",
  },
];

function CardMedia({ src, gradient }: { src?: string; gradient: string }) {
  return (
    <>
      <div className={cn("absolute inset-0", gradient)} />
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
    </>
  );
}

function DiscordMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 fill-white">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.11.05c-.16.28-.34.65-.46.94a14.9 14.9 0 0 0-4.86 0 9.6 9.6 0 0 0-.47-.94A.1.1 0 0 0 9 4c-1.5.26-2.94.71-4.27 1.33a.09.09 0 0 0-.04.03C2.18 9.06 1.47 12.67 1.82 16.23a.1.1 0 0 0 .04.07 15.2 15.2 0 0 0 4.57 2.32.1.1 0 0 0 .11-.04c.35-.48.66-1 .93-1.53a.1.1 0 0 0-.05-.14 10 10 0 0 1-1.43-.68.1.1 0 0 1 0-.17l.28-.22a.1.1 0 0 1 .1-.01 10.8 10.8 0 0 0 9.22 0 .1.1 0 0 1 .1.01l.28.22a.1.1 0 0 1 0 .17 9.4 9.4 0 0 1-1.43.68.1.1 0 0 0-.05.14c.27.53.58 1.05.93 1.53a.1.1 0 0 0 .11.04 15.1 15.1 0 0 0 4.58-2.32.1.1 0 0 0 .04-.07c.42-4.11-.7-7.7-2.98-10.87a.07.07 0 0 0-.03-.03ZM8.68 14.32c-.85 0-1.55-.78-1.55-1.74s.69-1.74 1.55-1.74c.87 0 1.56.79 1.55 1.74 0 .96-.69 1.74-1.55 1.74Zm6.65 0c-.85 0-1.55-.78-1.55-1.74s.69-1.74 1.55-1.74c.87 0 1.56.79 1.55 1.74 0 .96-.68 1.74-1.55 1.74Z" />
    </svg>
  );
}

export default function Community() {
  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Join Community"
          title="Learn faster with people who refuse to stay average"
        />

        <Reveal className="mt-12">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.37fr)_minmax(0,0.63fr)]">
          <article className="relative isolate min-h-[32rem] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:min-h-full">
            <CardMedia
              src={IMAGES.discord || undefined}
              gradient="bg-gradient-to-b from-[#1a3d5c] to-[#071018]"
            />
            <p className="absolute top-5 right-5 z-10 text-xs text-white/70">
              500+ members active now
            </p>
            <ul className="absolute inset-x-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 md:inset-x-8">
              {DISCORD_NOTIFICATIONS.map((notification, index) => (
                <li
                  key={`${notification.count}-${notification.time}-${index}`}
                  className="flex items-center gap-3 rounded-2xl bg-black/45 px-3 py-3 ring-1 ring-white/10 backdrop-blur-md"
                >
                  <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5865F2]">
                    <DiscordMark />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] text-[#5865F2]">
                      {notification.count}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white">Discord</p>
                    <p className="text-xs text-white/60">
                      {notification.count} Notifications
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-white/45">
                    {notification.time}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-4">
            <article className="relative isolate flex min-h-[16rem] flex-col overflow-hidden rounded-2xl ring-1 ring-white/10">
              <CardMedia
                src={IMAGES.ama || undefined}
                gradient="bg-gradient-to-b from-[#16324a] to-[#08111a]"
              />
              <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                <h3 className="max-w-md text-lg font-light tracking-tight text-white">
                  Every Thursday Ask Your Instructor Anything and get real
                  insights.
                </h3>
                <div className="mt-auto grid grid-cols-2 gap-4 pt-10">
                  <div>
                    <p className="text-lg font-light text-white">48+</p>
                    <p className="text-xs text-white/55">Calls held</p>
                  </div>
                  <div>
                    <p className="text-lg font-light text-white">100%</p>
                    <p className="text-xs text-white/55">Recorded</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="relative isolate flex min-h-[18rem] flex-col overflow-hidden rounded-2xl ring-1 ring-white/10">
                <CardMedia
                  src={IMAGES.growth || undefined}
                  gradient="bg-gradient-to-b from-[#2a5d7a] to-[#0c1a24]"
                />
                <div className="relative z-10 flex h-full flex-col items-center p-6">
                  <h3 className="self-start text-lg font-light tracking-tight text-white">
                    Where growth becomes visible
                  </h3>
                  <Button
                    nativeButton={false}
                    render={<Link href="/contact" />}
                    className="mt-auto h-9 rounded-full bg-white px-5 text-sm font-normal text-black hover:bg-white/90"
                  >
                    Enroll Now
                  </Button>
                </div>
              </article>

              <article className="relative isolate flex min-h-[18rem] flex-col overflow-hidden rounded-2xl ring-1 ring-white/10">
                <CardMedia
                  src={IMAGES.building || undefined}
                  gradient="bg-gradient-to-b from-[#14324c] to-[#070d14]"
                />
                <div className="relative z-10 flex h-full flex-col p-6">
                  <h3 className="text-lg font-light tracking-tight text-white">
                    What our members are building
                  </h3>
                  <ul className="mt-auto flex flex-col gap-2">
                    {MEMBER_BUILDS.map((member) => (
                      <li
                        key={member.name}
                        className="flex items-start gap-3 rounded-xl bg-black/45 px-3 py-2.5 ring-1 ring-white/10 backdrop-blur-md"
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs text-white">
                          {member.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs text-white">{member.name}</p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-white/55">
                            {member.quote}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </Customsection>
  );
}

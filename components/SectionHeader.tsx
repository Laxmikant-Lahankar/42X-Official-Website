import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeader({
  badge,
  title,
  className,
}: {
  badge: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col items-start", className)}>
      <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium text-gray-400 shadow-inner backdrop-blur-md sm:text-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
        </span>
        {badge}
      </div>
      <h2 className="max-w-xl text-3xl font-light text-white md:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}

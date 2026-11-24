import type { ReactNode } from "react";
import { Customsection } from "@/app/CustomSection";

/** Simple, readable layout for policy pages. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Customsection>
      <article className="mx-auto max-w-3xl px-6 py-14 md:px-12 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
          Legal
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-montserrat),Montserrat,sans-serif] text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-white/50">Last updated: {updated}</p>
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-xl prose-p:text-white/75 prose-li:text-white/75 prose-a:text-[#00B4FF]">
          {children}
        </div>
      </article>
    </Customsection>
  );
}

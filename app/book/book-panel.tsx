"use client";

import { useSearchParams } from "next/navigation";
import { CALENDAR_EMBED_URL } from "@/lib/cta";

export default function BookPanel() {
  const src = useSearchParams().get("src") ?? "";

  return (
    <>
      <form>
        <input type="hidden" name="src" value={src} />
      </form>
      {CALENDAR_EMBED_URL ? (
        <iframe
          title="Talk to an expert"
          src={CALENDAR_EMBED_URL}
          className="mt-8 h-[40rem] w-full rounded-xl border border-white/10"
        />
      ) : (
        <div className="mt-8 flex min-h-80 items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-white/60">
          {/* TODO: embed Cal.com or Calendly. Set CALENDAR_EMBED_URL in lib/cta.ts. */}
          Scheduling calendar will appear here.
        </div>
      )}
    </>
  );
}

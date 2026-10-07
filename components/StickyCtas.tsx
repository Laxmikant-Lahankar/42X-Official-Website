"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { ctaHref, CTAS } from "@/lib/cta";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function StickyCtas() {
  const [pastHero, setPastHero] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const finalCta = document.getElementById("final-cta");
      if (!hero) {
        setPastHero(false);
        setFinalInView(false);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setPastHero(heroBottom <= 0);

      if (!finalCta) {
        setFinalInView(false);
        return;
      }

      const rect = finalCta.getBoundingClientRect();
      setFinalInView(rect.top < window.innerHeight && rect.bottom > 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const showBar = pastHero && !finalInView;

  return (
    <>
      <a
        href={ctaHref(CTAS.whatsapp, "whatsapp")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CTAS.whatsapp.label}
        onClick={() => trackEvent("cta_click", { cta: CTAS.whatsapp.id, src: "whatsapp" })}
        className={cn(
          "group fixed right-4 z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-6 sm:bottom-6 sm:size-14",
          showBar
            ? "bottom-[calc(5.25rem+env(safe-area-inset-bottom))]"
            : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
        )}
      >
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] hidden -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          {CTAS.whatsapp.label}
        </span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-7 sm:size-8"
          fill="currentColor"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44zM12.07 21.3h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.9 9.89zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </a>

    </>
  );
}

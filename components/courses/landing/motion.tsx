"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { trackEvent } from "@/lib/analytics";
import type { IncidentStep, LandingFaq } from "@/data/course-landing/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Honour the OS "reduce motion" setting for every motion component below. */
export function LandingMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + rise into view once. */
export function FadeIn({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Link that records which CTA was used before navigating. */
export function TrackedLink({
  event,
  ...props
}: ComponentProps<typeof Link> & { event: string }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent("cta_click", { id: event, page: "course-sap-ewm" });
        props.onClick?.(e);
      }}
    />
  );
}

/** Number that counts up when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [animated, setValue] = useState(0);
  const value = reduce ? to : animated;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}

/** Week-by-week roadmap: bars grow to each module's length when in view. */
export function Roadmap({
  modules,
}: {
  modules: { title: string; duration: string }[];
}) {
  const weeks = modules.map((m) => parseFloat(m.duration) || 1);
  const total = weeks.reduce((a, b) => a + b, 0);
  const rows = modules.map((m, i) => ({
    ...m,
    start: weeks.slice(0, i).reduce((a, b) => a + b, 0),
    len: weeks[i],
  }));

  return (
    <ol className="space-y-2.5">
      {rows.map((r, i) => (
        <li
          key={r.title}
          className="grid grid-cols-[2rem_1fr] items-center gap-3 sm:grid-cols-[2rem_15rem_1fr] sm:gap-4"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#00B4FF]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-white/85">
            {r.title}{" "}
            <span className="text-[#94A3B8] sm:hidden">· {r.duration}</span>
          </span>
          <div className="relative col-span-2 h-7 rounded-full bg-white/[0.04] sm:col-span-1">
            <motion.div
              className="absolute inset-y-1 flex items-center justify-end rounded-full bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] pr-2 text-[10px] font-semibold text-white"
              style={{
                left: `${(r.start / total) * 100}%`,
                width: `${(r.len / total) * 100}%`,
                transformOrigin: "left",
                minWidth: "2.25rem",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.8, delay: 0.06 * i, ease: EASE }}
            >
              <span className="hidden whitespace-nowrap sm:inline">
                {r.len}w
              </span>
            </motion.div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Capstone teaser: an injected issue gets diagnosed and resolved. */
export function IncidentTicker({
  label,
  steps,
}: {
  label: string;
  steps: IncidentStep[];
}) {
  const INCIDENT = steps;
  const reduce = useReducedMotion();
  const [tick, setI] = useState(0);
  const i = reduce ? INCIDENT.length - 1 : tick;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % INCIDENT.length), 2200);
    return () => clearInterval(id);
  }, [reduce, INCIDENT.length]);

  const step = INCIDENT[i];
  const color =
    step.tone === "alert"
      ? "border-amber-400/50 bg-amber-400/10 text-amber-200"
      : step.tone === "ok"
        ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
        : "border-[#00B4FF]/50 bg-[#00B4FF]/10 text-[#BFEAFF]";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#94A3B8]">
        {label}
      </p>
      <div className="mt-3 h-12" aria-live="off">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${color}`}
          >
            <span aria-hidden="true">
              {step.tone === "alert" ? "⚠" : step.tone === "ok" ? "✓" : "⟳"}
            </span>
            {step.text}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {INCIDENT.map((_, n) => (
          <span
            key={n}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              n <= i ? "bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF]" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Accessible accordion FAQ with animated height. */
export function FaqList({ faqs }: { faqs: LandingFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02]">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question}>
            <h3>
              <button
                type="button"
                id={`ewm-faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`ewm-faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-[family-name:var(--font-montserrat)] text-[15px] font-semibold text-white transition-colors hover:text-[#00E5FF] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00B4FF] sm:px-7 sm:text-base"
              >
                {f.question}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg leading-none text-[#00B4FF]"
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`ewm-faq-a-${i}`}
                  role="region"
                  aria-labelledby={`ewm-faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-white/70 sm:px-7">
                    {f.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

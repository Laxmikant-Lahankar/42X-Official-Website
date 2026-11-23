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
  useScroll,
  useSpring,
} from "motion/react";
import { trackEvent } from "@/lib/analytics";
import type {
  LandingFaq,
  LandingFlowStep,
  LandingJourneyStep,
} from "@/data/course-landing/sap-ewm";

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
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}

/**
 * Hero visual: a pallet travels through the EWM process while an RF
 * terminal logs each step. Static (all steps shown) with reduced motion.
 */
export function WarehouseFlow({
  steps,
  log,
}: {
  steps: LandingFlowStep[];
  log: string[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      1600,
    );
    return () => clearInterval(id);
  }, [reduce, steps.length]);

  // Map flow position to the RF log line for that stage.
  const logIndex = Math.min(
    log.length - 1,
    Math.floor((active / steps.length) * log.length),
  );
  const visibleLog = reduce
    ? log
    : log.slice(Math.max(0, logIndex - 2), logIndex + 1);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(11,31,68,.9),rgba(10,10,20,.95))] p-5 shadow-[0_30px_80px_-30px_rgba(123,61,255,.55)] sm:p-7"
      role="img"
      aria-label={`SAP EWM process flow: ${steps.map((s) => s.label).join(", then ")}.`}
    >
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7B3DFF]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#00B4FF]/20 blur-3xl"
      />

      <div className="relative flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-[#94A3B8]">
        <span>Warehouse monitor</span>
        <span className="flex items-center gap-1.5 text-[#00E5FF]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]" />
          </span>
          Live flow
        </span>
      </div>

      {/* Stations */}
      <ol className="relative mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-2" aria-hidden="true">
        {/* connector line (desktop) */}
        <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-[#00B4FF]/50 via-[#7B3DFF]/50 to-[#00E5FF]/50 sm:block" />
        {steps.map((s, i) => {
          const done = reduce || i <= active;
          const isActive = !reduce && i === active;
          return (
            <li key={s.code} className="relative flex flex-col items-center text-center">
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border text-[11px] font-bold tracking-wide transition-colors duration-500 font-[family-name:var(--font-montserrat)] ${
                  done
                    ? "border-[#00B4FF]/70 bg-[#00B4FF]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/40"
                }`}
              >
                {s.code}
                {isActive && (
                  <motion.span
                    layoutId="ewm-pallet"
                    className="absolute -top-2.5 left-1/2 h-4 w-6 -translate-x-1/2 rounded-[4px] bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] shadow-[0_0_18px_rgba(0,180,255,.8)]"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
              </div>
              <span className={`mt-2 text-[11px] leading-tight ${done ? "text-white/80" : "text-white/35"}`}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* RF terminal */}
      <div className="relative mt-6 rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] leading-6">
        <div className="mb-2 flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <ul className="min-h-[4.5rem]" aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleLog.map((line) => (
              <motion.li
                key={line}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="truncate text-[#C8B8FF]"
              >
                <span className="text-[#00E5FF]">›</span> {line}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
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

/** Vertical journey whose progress line fills as you scroll. */
export function Journey({ steps }: { steps: LandingJourneyStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-10 sm:pl-14">
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10 sm:left-[15px]"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: fill, transformOrigin: "top" }}
        className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-[#00B4FF] via-[#7B3DFF] to-[#00E5FF] sm:left-[15px]"
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span
            aria-hidden="true"
            className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#00B4FF]/60 bg-[#0B1F44] text-[10px] font-bold text-white sm:-left-14 sm:h-8 sm:w-8 sm:text-xs"
          >
            {i + 1}
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#00E5FF]">
            {s.modules}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-montserrat)] text-xl font-semibold text-white sm:text-2xl">
            {s.title}
          </h3>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">
            {s.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

const INCIDENT = [
  { tone: "alert", text: "Exception · Warehouse task stuck in queue" },
  { tone: "work", text: "Investigating · Debugger on WT creation" },
  { tone: "work", text: "Root cause · Storage type search sequence" },
  { tone: "ok", text: "Resolved · Flow restored, stakeholders updated" },
] as const;

/** Capstone teaser: an injected exception gets diagnosed and resolved. */
export function IncidentTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? INCIDENT.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % INCIDENT.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

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
        Capstone · Injected exception
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

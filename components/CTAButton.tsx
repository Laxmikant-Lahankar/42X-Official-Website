"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CohortPicker } from "@/components/CohortPicker";
import { ctaHref, isExternalHref, type Cta } from "@/lib/cta";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-full text-center font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants = {
  primary:
    "border border-transparent bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white shadow-[0_8px_24px_rgba(46,87,223,0.35)] hover:from-[#6B98FF] hover:to-[#3A64E8]",
  secondary:
    "border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10",
  ghost:
    "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  link: "h-auto rounded-md border-transparent bg-transparent px-1 text-[13px] font-normal text-white/55 underline-offset-4 hover:text-white hover:underline",
} as const;

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-10 px-4 text-[13px]",
  lg: "h-11 px-5 text-[13px]",
} as const;

export function CTAButton({
  cta,
  src,
  variant = "primary",
  size = "md",
  showMicrocopy = false,
  className,
  onClick,
}: {
  cta: Cta;
  src: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  showMicrocopy?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const href = ctaHref(cta, src);
  const external = isExternalHref(cta.href);
  const opensPicker = cta.id === "primary";
  const showArrow = variant === "link" && !cta.label.includes("→");
  const classes = cn(
    base,
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );

  const handleClick = () => {
    trackEvent("cta_click", { cta: cta.id, src });
    onClick?.();
    if (opensPicker) setPickerOpen(true);
  };

  const content = (
    <>
      {cta.label}
      {showArrow ? <ArrowRight aria-hidden className="size-3.5" /> : null}
    </>
  );

  const control = opensPicker ? (
    <button type="button" className={classes} onClick={handleClick}>
      {content}
    </button>
  ) : external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={handleClick}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={handleClick}>
      {content}
    </Link>
  );

  const picker = opensPicker ? (
    <CohortPicker
      open={pickerOpen}
      onClose={() => setPickerOpen(false)}
      src={src}
    />
  ) : null;

  if (!showMicrocopy || !cta.microcopy) {
    return (
      <>
        {control}
        {picker}
      </>
    );
  }

  return (
    <span className="flex w-full flex-col items-center gap-1.5 sm:w-auto">
      {control}
      {picker}
      <span className="max-w-xs text-center text-[11px] leading-snug text-white/50">
        {cta.microcopy}
      </span>
    </span>
  );
}

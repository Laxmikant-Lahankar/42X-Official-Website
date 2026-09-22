"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const LINKS = NAV_LINKS.filter((link) => link.href !== "/contact");

export default function FloatingNavbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 80;
      setVisible(next);
      if (!next) setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300 md:px-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "relative flex w-fit items-center gap-2",
          visible && "pointer-events-auto",
        )}
      >
        <Link
          href="/"
          aria-label="42X Academy home"
          className="flex h-14 w-auto shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0B1220]/80 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <Image
            src="/logo2.png"
            alt=""
            width={70}
            height={40}
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden h-14 items-center gap-8 rounded-2xl border border-white/10 bg-[#0B1220]/80 px-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden h-14 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-sm text-white shadow-[0_8px_32px_rgba(46,87,223,0.35)] hover:from-[#6B98FF] hover:to-[#3A64E8] md:inline-flex",
            )}
          >
            Get started
            <ArrowUpRight className="size-4" />
          </Link>

          <button
            type="button"
            className="inline-flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0B1220]/80 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute top-[4.5rem] left-1/2 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0B1220]/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-2 h-11 rounded-lg bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white",
              )}
              onClick={() => setOpen(false)}
            >
              Get started
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

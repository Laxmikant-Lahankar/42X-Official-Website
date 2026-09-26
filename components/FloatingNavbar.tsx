"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
        "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className={cn("relative w-fit", visible && "pointer-events-auto")}>
        <div className="flex h-11 items-center rounded-lg border border-white/12 bg-black/75 px-5 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <Link
            href="/"
            aria-label="42X Academy home"
            className="flex shrink-0 items-center px-1.5"
          >
            <Image
              src="/logo2.png"
              alt=""
              width={70}
              height={40}
              className="h-6 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-5 px-4 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden h-8 rounded-md bg-white px-3 text-[13px] text-black hover:bg-white/90 md:inline-flex",
            )}
          >
            Contact
          </Link>

          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {open ? (
          <div className="mt-2 rounded-lg border border-white/12 bg-black/90 p-3 shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-2 h-10 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white hover:from-[#6B98FF] hover:to-[#3A64E8]",
                )}
                onClick={() => setOpen(false)}
              >
                Get started
                <ArrowRight />
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  );
}

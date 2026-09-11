"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export default function FloatingNavbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <nav
        className={cn(
          "relative flex w-full max-w-[550px] items-center justify-between rounded-md border border-white/10 bg-black/70 py-1.5 pr-2 pl-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl",
          visible && "pointer-events-auto",
        )}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center justify-center text-sm"
          aria-label="42X Academy home"
        >
          <Image
            src="/logo2.png"
            alt="42X Academy"
            width={120}
            height={40}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="absolute inset-x-14 flex items-center justify-center gap-1 sm:inset-x-20">
          {NAV_LINKS.filter((link) => link.href !== "/contact").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "relative z-10 h-9 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white hover:from-[#6B98FF] hover:to-[#3A64E8]",
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}

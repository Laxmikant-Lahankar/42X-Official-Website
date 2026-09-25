"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Customsection } from "@/app/CustomSection";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#courses", label: "Courses" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Customsection>
      <header className="animate-drop-down relative w-full">
        <div className="relative flex h-16 w-full items-center justify-between px-6">
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2.5 text-white"
          >
            <Image
              src="/logo2.png"
              alt="42X Academy"
              width={160}
              height={64}
              priority
              className="h-8 w-auto"
            />
            <span className="text-base font-semibold tracking-wide text-lg">
              Academy
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_LINKS.filter((link) => link.href !== "/contact").map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden h-9 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white hover:from-[#6B98FF] hover:to-[#3A64E8] md:inline-flex",
              )}
            >
              Contact
            </Link>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-white md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.filter((link) => link.href !== "/contact").map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-1 text-sm text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "mt-2 h-9 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white",
                )}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
    </Customsection>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
const navLinks = [
  { label: "Modules", href: "/modules" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const audienceLinks = [
  { label: "For Universities", href: "/for-universities" },
  { label: "For Schools", href: "/for-schools" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" aria-label="Case & Signal" className="flex-shrink-0 font-serif text-xl font-bold text-foreground">
          Case <span className="text-accent">&amp;</span> Signal
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:underline">
              Audiences
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded px-4 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-pilot"
            className="ml-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-light hover:shadow-md"
          >
            Book a Pilot Workshop
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {[...navLinks.slice(0, 2), ...audienceLinks, ...navLinks.slice(2)].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:underline"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-pilot"
              className="mt-2 inline-block rounded-lg bg-accent px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-light hover:shadow-md"
              onClick={() => setMobileOpen(false)}
            >
              Book a Pilot Workshop
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

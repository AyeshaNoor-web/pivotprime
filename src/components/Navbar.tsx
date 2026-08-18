"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION, type NavItem } from "@/content/navigation";
import { HEADER_CTA } from "@/content/cta";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close an open dropdown on Escape or on a click outside. Without this a
  // keyboard user who opens a menu has no way back out of it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  const renderDesktopItem = (item: NavItem) => {
    const isOpen = openMenu === item.label;

    if (!item.children) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-sm px-1 py-2 text-sm font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none"
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div
        key={item.label}
        className="relative flex h-full items-center"
        onMouseEnter={() => setOpenMenu(item.label)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setOpenMenu(isOpen ? null : item.label)}
          className="flex items-center rounded-sm px-1 py-2 text-sm font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none"
        >
          {item.label}
          <svg
            className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Always rendered, hidden when closed. Rendering only on open kept the
            entire dropdown out of the server HTML, which left
            /services/how-we-work linked from nowhere: no crawler and no reader
            without JavaScript could reach it. The five other service pages
            survived only because the homepage cards happen to link them.
            Found by walking the site rather than checking pages in isolation. */}
        <div hidden={!isOpen} className="absolute top-full left-0 z-50 w-64 pt-2">
            <ul className="rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={closeAll}
                    className="block px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary focus-visible:bg-neutral-50 focus-visible:text-primary focus-visible:outline-none"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <nav ref={navRef} className="absolute top-4 right-4 left-4 z-50">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex flex-shrink-0 items-center" onClick={closeAll}>
              <Image src="/pivot-logo.svg" alt="Pivot Prime" width={150} height={40} className="h-8 w-auto" />
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-x-5">
              {NAVIGATION.map(renderDesktopItem)}
              <a
                href={HEADER_CTA.href}
                target={HEADER_CTA.external ? "_blank" : undefined}
                rel={HEADER_CTA.external ? "noopener noreferrer" : undefined}
                className="ml-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition-colors hover:bg-mid/90 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {HEADER_CTA.label}
                <span aria-hidden="true" className="ml-2 text-lg leading-none">
                  →
                </span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none lg:hidden"
            >
              <span className="sr-only">{mobileOpen ? "Close main menu" : "Open main menu"}</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-neutral-100 bg-white lg:hidden">
            <div className="space-y-1 px-4 pt-2 pb-6 sm:px-6">
              {NAVIGATION.map((item) => {
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeAll}
                      className="block rounded-md px-3 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  );
                }

                const expanded = mobileSection === item.label;
                return (
                  <div key={item.label}>
                    {/* A real disclosure button. The previous mobile menu used a
                        plain div for these headings, so the sections could not be
                        operated by keyboard or announced to a screen reader. */}
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-mid focus-visible:outline-none"
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expanded && (
                      <ul className="mt-1 space-y-1 border-l-2 border-neutral-200 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              <div className="px-3 pt-4 pb-2">
                <a
                  href={HEADER_CTA.href}
                  target={HEADER_CTA.external ? "_blank" : undefined}
                  rel={HEADER_CTA.external ? "noopener noreferrer" : undefined}
                  onClick={closeAll}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-sm transition-colors hover:bg-mid/90"
                >
                  {HEADER_CTA.label}
                  <span aria-hidden="true" className="ml-2 text-lg leading-none">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

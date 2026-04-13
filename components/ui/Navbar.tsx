"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "About",          href: "#about" },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Research",       href: "#research" },
  { label: "Contact",        href: "#contact" },
];

// Section ids in document order — used to resolve the topmost visible one
const SECTION_IDS = NAV_ITEMS.map((i) => i.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  // Keeps a live map of { sectionId → intersectionRatio }
  const ratioMap = useRef<Record<string, number>>({});

  /* ── Backdrop: become opaque once user scrolls past the hero ─────── */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /* ── Active-section tracking ─────────────────────────────────────── */
  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const pick = () => {
      // Pick the section highest up the page that is currently intersecting
      for (const id of SECTION_IDS) {
        if ((ratioMap.current[id] ?? 0) > 0) {
          setActiveId(id);
          return;
        }
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratioMap.current[(e.target as HTMLElement).id] = e.intersectionRatio;
        });
        pick();
      },
      { threshold: [0, 0.1], rootMargin: "-60px 0px 0px 0px" }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-cyber-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-sm tracking-wider text-cyan-300 transition duration-300 hover:text-cyan-200 hover:drop-shadow-[0_0_8px_rgba(63,248,255,0.45)]"
        >
          mlas.dev
        </a>

        {/* Nav links */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = activeId === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-cyber-primary"
                      : "text-cyber-muted hover:text-cyber-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[3px] left-0 h-[2px] w-full rounded-full bg-cyber-secondary opacity-70"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

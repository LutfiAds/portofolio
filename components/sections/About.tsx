"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealOnce } from "@/components/ui/ScrollRevealOnce";

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const paragraphDelays = [0, 0.12, 0.24, 0.36];
      paragraphRefs.current.forEach((paragraph, index) => {
        if (!paragraph) return;
        gsap.fromTo(
          paragraph,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: paragraphDelays[index] ?? 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="container-section">
      <ScrollRevealOnce
        className="card relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-cyber-secondary/60 before:content-['']"
        trigger="#about"
      >
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyber-secondary">
          PROFILE SUMMARY
        </p>
        <h2 className="section-title">About</h2>
        <p
          ref={(el) => {
            paragraphRefs.current[0] = el;
          }}
          className="text-base leading-relaxed text-cyber-muted"
        >
          I am a Security Engineer with hands-on experience supporting enterprise privileged access
          management infrastructure, authentication telemetry analysis, and detection logic development
          for security monitoring workflows.
        </p>
        <p
          ref={(el) => {
            paragraphRefs.current[1] = el;
          }}
          className="mt-4 text-base leading-relaxed text-cyber-muted"
        >
          I contributed to enterprise PAM deployment initiatives through credential lifecycle automation
          using PowerShell and Python, Linux password expiration handling, and authentication integration
          troubleshooting across infrastructure platforms including Palo Alto and F5 environments.
        </p>
        <p
          ref={(el) => {
            paragraphRefs.current[2] = el;
          }}
          className="mt-4 text-base leading-relaxed text-cyber-muted"
        >
          I also developed detection logic for brute-force and suspicious authentication behavior and
          built authentication log parsing pipelines to support SOC-style monitoring visibility.
        </p>
        <p
          ref={(el) => {
            paragraphRefs.current[3] = el;
          }}
          className="mt-4 text-base leading-relaxed text-cyber-muted"
        >
          My current focus is strengthening defensive security infrastructure through automation and
          detection engineering while expanding toward AI-driven security analytics and computer vision
          research for future security applications.
        </p>
      </ScrollRevealOnce>
    </section>
  );
}

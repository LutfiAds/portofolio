"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true
          }
        }
      );

      const paragraphDelays = [0, 0.12, 0.24, 0.36];
      gsap.utils.toArray<HTMLElement>(".about-paragraph").forEach((paragraph, index) => {
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
      <div ref={cardRef} className="card">
        <h2 className="section-title">About</h2>
        <p className="about-paragraph text-base leading-relaxed text-cyber-muted">
          I am a Security Engineer with hands-on experience supporting enterprise privileged access
          management infrastructure, authentication telemetry analysis, and detection logic development
          for security monitoring workflows.
        </p>
        <p className="about-paragraph mt-4 text-base leading-relaxed text-cyber-muted">
          I contributed to enterprise PAM deployment initiatives through credential lifecycle automation
          using PowerShell and Python, Linux password expiration handling, and authentication integration
          troubleshooting across infrastructure platforms including Palo Alto and F5 environments.
        </p>
        <p className="about-paragraph mt-4 text-base leading-relaxed text-cyber-muted">
          I also developed detection logic for brute-force and suspicious authentication behavior and
          built authentication log parsing pipelines to support SOC-style monitoring visibility.
        </p>
        <p className="about-paragraph mt-4 text-base leading-relaxed text-cyber-muted">
          My current focus is strengthening defensive security infrastructure through automation and
          detection engineering while expanding toward AI-driven security analytics and computer vision
          research for future security applications.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const expertiseGroups = [
  {
    category: "DETECTION ENGINEERING",
    items: [
      {
        title: "Detection Engineering",
        tooltipDescriptors: [
          "rule logic design",
          "authentication anomaly workflows",
          "security telemetry correlation"
        ]
      },
      {
        title: "Security Log Pipeline Engineering",
        tooltipDescriptors: [
          "parser architecture patterns",
          "event normalization pipelines",
          "enrichment for detection context"
        ]
      }
    ]
  },
  {
    category: "IDENTITY & PAM AUTOMATION",
    items: [
      {
        title: "Privileged Access Management Automation",
        tooltipDescriptors: [
          "privileged workflow orchestration",
          "account lifecycle automation",
          "policy-aligned access controls"
        ]
      },
      {
        title: "Credential Lifecycle Automation (API-driven)",
        tooltipDescriptors: [
          "api-driven rotation flows",
          "schedule-aware secret updates",
          "resilient credential rollovers"
        ]
      }
    ]
  },
  {
    category: "SECURITY MONITORING",
    items: [
      {
        title: "Authentication Log Analysis",
        tooltipDescriptors: [
          "auth event correlation",
          "brute-force signal analysis",
          "suspicious login triage"
        ]
      },
      {
        title: "Endpoint Security Signal Monitoring",
        tooltipDescriptors: [
          "endpoint telemetry review",
          "alert signal prioritization",
          "host behavior visibility"
        ]
      },
      {
        title: "SOC Monitoring Lab Deployment (Wazuh + Grafana)",
        tooltipDescriptors: [
          "wazuh + grafana lab setup",
          "dashboarding and alert views",
          "soc workflow simulation"
        ]
      }
    ]
  }
];

export function ExpertiseGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const delays = [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48];
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: delays[index] ?? 0,
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerMode = () => {
      setIsFinePointer(mediaQuery.matches);
    };
    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => mediaQuery.removeEventListener("change", updatePointerMode);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-expertise-card='true']")) return;
      setActiveTooltipId(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <section ref={sectionRef} className="container-section">
      <p data-reveal className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyber-secondary">
        CAPABILITY MATRIX
      </p>
      <h2 data-reveal className="section-title">
        Core Expertise
      </h2>
      <div className="space-y-8">
        {(() => {
          let cardIndex = 0;
          return expertiseGroups.map((group) => (
            <div key={group.category}>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cyber-secondary">
                {group.category}
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  const currentCardIndex = cardIndex;
                  const tooltipId = `expertise-tooltip-${currentCardIndex}`;
                  const isTooltipActive = activeTooltipId === tooltipId;
                  cardIndex += 1;

                  return (
                    <article
                      key={tooltipId}
                      ref={(el) => {
                        cardRefs.current[currentCardIndex] = el;
                      }}
                      className="card relative overflow-visible transition-[transform,border-color,background-color,box-shadow] duration-[200ms] ease-out before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-cyber-secondary before:opacity-0 before:transition-opacity before:duration-[200ms] before:ease-out hover:-translate-y-[2px] hover:border-cyan-400/40 hover:bg-white/[0.03] hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] hover:before:opacity-70 motion-reduce:duration-0 motion-reduce:hover:translate-y-0 motion-reduce:before:duration-0"
                      tabIndex={0}
                      role="button"
                      data-expertise-card="true"
                      aria-expanded={isTooltipActive}
                      aria-controls={tooltipId}
                      onMouseEnter={() => {
                        if (!isFinePointer) return;
                        setActiveTooltipId(tooltipId);
                      }}
                      onMouseLeave={() => {
                        if (!isFinePointer) return;
                        setActiveTooltipId((prev) => (prev === tooltipId ? null : prev));
                      }}
                      onClick={() => {
                        if (isFinePointer) return;
                        setActiveTooltipId((prev) => (prev === tooltipId ? null : tooltipId));
                      }}
                      onFocus={() => {
                        setActiveTooltipId(tooltipId);
                      }}
                      onBlur={(event) => {
                        const nextFocused = event.relatedTarget;
                        if (nextFocused instanceof Node && event.currentTarget.contains(nextFocused)) return;
                        setActiveTooltipId(null);
                      }}
                    >
                      <div
                        id={tooltipId}
                        role="tooltip"
                        className={`pointer-events-none absolute -top-3 left-1/2 z-20 w-[min(18rem,85vw)] -translate-x-1/2 -translate-y-full rounded-md border border-cyber-secondary/70 bg-cyber-bg/95 px-3 py-2 font-mono text-xs leading-relaxed text-cyan-100 shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-opacity duration-[120ms] ease-out motion-reduce:duration-0 ${
                          isTooltipActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-cyber-secondary/90">
                          {item.title}
                        </p>
                        <ul className="space-y-1 font-mono text-xs text-slate-400">
                          {item.tooltipDescriptors.map((descriptor) => (
                            <li key={descriptor}>{descriptor}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-base font-medium text-slate-100">{item.title}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          ));
        })()}
      </div>
    </section>
  );
}

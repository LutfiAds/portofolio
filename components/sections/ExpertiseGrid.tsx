"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [tooltipPos, setTooltipPos] = useState<{ above: boolean; nudgeX: number }>(
    { above: true, nudgeX: 0 }
  );

  /** Measure available viewport space around the card and compute tooltip placement. */
  const measureTooltipPos = useCallback((cardEl: HTMLElement | null) => {
    if (!cardEl) return;
    const TOOLTIP_W = Math.min(288, window.innerWidth * 0.85); // matches w-[min(18rem,85vw)]
    const TOOLTIP_H = 130; // conservative estimated height
    const GAP = 12;        // spacing between card edge and tooltip
    const MARGIN = 10;     // minimum distance from viewport edge

    const rect = cardEl.getBoundingClientRect();

    // Prefer above; fall back to below if not enough room
    const above = rect.top >= TOOLTIP_H + GAP + MARGIN;

    // Center tooltip on card, then clamp so it stays inside viewport
    const centerX = rect.left + rect.width / 2;
    const halfW = TOOLTIP_W / 2;
    let nudgeX = 0;
    if (centerX - halfW < MARGIN) {
      nudgeX = MARGIN - (centerX - halfW);
    } else if (centerX + halfW > window.innerWidth - MARGIN) {
      nudgeX = window.innerWidth - MARGIN - (centerX + halfW);
    }

    setTooltipPos({ above, nudgeX });
  }, []);

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
                    <div key={tooltipId} className="relative">
                      <article
                        ref={(el) => {
                          cardRefs.current[currentCardIndex] = el;
                        }}
                        className="card relative transition-[transform,border-color,background-color,box-shadow] duration-[150ms] ease-out motion-reduce:duration-0"
                        style={{
                          zIndex: isTooltipActive ? 20 : 10,
                          transform: isTooltipActive
                            ? "translateY(-6px) scale(1.02)"
                            : "translateY(0) scale(1)",
                          borderColor: isTooltipActive
                            ? "rgba(34,211,238,0.30)"
                            : undefined,
                          boxShadow: isTooltipActive
                            ? "0 8px 28px rgba(34,211,238,0.09), 0 0 0 1px rgba(34,211,238,0.13)"
                            : undefined,
                          backgroundColor: isTooltipActive
                            ? "rgba(255,255,255,0.025)"
                            : undefined,
                        }}
                        tabIndex={0}
                        role="button"
                        data-expertise-card="true"
                        aria-expanded={isTooltipActive}
                        aria-controls={tooltipId}
                        onMouseEnter={() => {
                          if (!isFinePointer) return;
                          measureTooltipPos(cardRefs.current[currentCardIndex]);
                          setActiveTooltipId(tooltipId);
                        }}
                        onMouseLeave={() => {
                          if (!isFinePointer) return;
                          setActiveTooltipId((prev) => (prev === tooltipId ? null : prev));
                        }}
                        onClick={() => {
                          if (isFinePointer) return;
                          const nextId = activeTooltipId === tooltipId ? null : tooltipId;
                          if (nextId) measureTooltipPos(cardRefs.current[currentCardIndex]);
                          setActiveTooltipId(nextId);
                        }}
                        onFocus={() => {
                          measureTooltipPos(cardRefs.current[currentCardIndex]);
                          setActiveTooltipId(tooltipId);
                        }}
                        onBlur={(event) => {
                          const nextFocused = event.relatedTarget;
                          if (nextFocused instanceof Node && event.currentTarget.contains(nextFocused)) return;
                          setActiveTooltipId(null);
                        }}
                      >
                        {/* Tooltip — adaptive positioning, highest z-index */}
                        <div
                          id={tooltipId}
                          role="tooltip"
                          className="pointer-events-none absolute w-[min(18rem,85vw)] rounded-md border border-cyber-secondary/60 bg-cyber-bg/95 px-3 py-2 font-mono text-xs leading-relaxed text-cyan-100 shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
                          style={{
                            zIndex: 30,
                            left: "50%",
                            // Place above or below the card
                            ...(tooltipPos.above
                              ? { bottom: "calc(100% + 8px)", top: "auto" }
                              : { top: "calc(100% + 8px)", bottom: "auto" }),
                            // Slide 6px toward the card edge when hidden, settle at rest when shown
                            transform: `translateX(calc(-50% + ${tooltipPos.nudgeX}px)) translateY(${
                              isTooltipActive ? "0px" : tooltipPos.above ? "6px" : "-6px"
                            })`,
                            opacity: isTooltipActive ? 1 : 0,
                            transition:
                              "opacity 150ms ease-out, transform 150ms ease-out",
                          }}
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

                        <p className="relative z-10 text-base font-medium text-slate-100">{item.title}</p>
                      </article>
                    </div>
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

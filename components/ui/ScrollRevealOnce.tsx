"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollRevealOnceProps = {
  children: ReactNode;
  className?: string;
  trigger?: HTMLElement | string | null;
  start?: string;
  duration?: number;
  y?: number;
  ease?: string;
};

export function ScrollRevealOnce({
  children,
  className,
  trigger,
  start = "top 82%",
  duration = 0.6,
  y = 32,
  ease = "power2.out"
}: ScrollRevealOnceProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: trigger || wrapperRef.current,
            start,
            once: true
          }
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [duration, ease, start, trigger, y]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}

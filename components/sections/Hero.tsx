"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Scanlines } from "@/components/Scanlines";
import { TelemetryParticles } from "@/components/TelemetryParticles";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035
    }));

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(125,181,255,0.06)";
      context.lineWidth = 1;

      const gridSize = 48;
      for (let x = 0; x <= width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }

      context.strokeStyle = "rgba(125,181,255,0.11)";
      context.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 0.2) {
            context.globalAlpha = 0.28 - distance;
            context.beginPath();
            context.moveTo(a.x * width, a.y * height);
            context.lineTo(b.x * width, b.y * height);
            context.stroke();
          }
        }
      }

      context.globalAlpha = 1;
      for (const p of particles) {
        context.fillStyle = "rgba(63,248,255,0.5)";
        context.beginPath();
        context.arc(p.x * width, p.y * height, 1.2, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-35" aria-hidden />;
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const hasStartedMicroPreviewRef = useRef(false);
  const [showSpecialization, setShowSpecialization] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [microPreviewText, setMicroPreviewText] = useState("");
  const nameText = "Muhamad Lutfi Adli Setiawan";
  const microCommandText = "> load_experience --enterprise";
  const { displayText, isComplete, showCursor, isReducedMotion } = useTypingAnimation({
    text: nameText,
    speedMs: 50
  });
  const specializationKeywords = useMemo(
    () => [
      "Detection Engineering",
      "Privileged Access Automation",
      "Authentication Log Analytics",
      "Security Telemetry Analysis"
    ],
    []
  );
  const longestKeyword = useMemo(
    () =>
      specializationKeywords.reduce((longest, current) =>
        current.length > longest.length ? current : longest
      ),
    [specializationKeywords]
  );
  const [activeKeywordIndex, setActiveKeywordIndex] = useState(0);
  const [keywordVisible, setKeywordVisible] = useState(true);
  const [isKeywordPaused, setIsKeywordPaused] = useState(false);

  useEffect(() => {
    if (!isComplete) return;
    if (isReducedMotion) {
      setShowSpecialization(true);
      setShowTagline(true);
      setShowBadge(true);
      setShowScroll(true);
      return;
    }

    const first = window.setTimeout(() => setShowSpecialization(true), 180);
    const second = window.setTimeout(() => setShowTagline(true), 600);
    const third = window.setTimeout(() => setShowBadge(true), 1000);
    const fourth = window.setTimeout(() => setShowScroll(true), 1400);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.clearTimeout(third);
      window.clearTimeout(fourth);
    };
  }, [isComplete, isReducedMotion]);

  useEffect(() => {
    if (!heroRef.current || isReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-role",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isReducedMotion]);

  useEffect(() => {
    if (!showSpecialization || isReducedMotion || isKeywordPaused) return;
    let timeoutId: number | undefined;

    const intervalId = window.setInterval(() => {
      setKeywordVisible(false);
      timeoutId = window.setTimeout(() => {
        setActiveKeywordIndex((prev) => (prev + 1) % specializationKeywords.length);
        setKeywordVisible(true);
      }, 240);
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isKeywordPaused, isReducedMotion, showSpecialization, specializationKeywords.length]);

  useEffect(() => {
    if (!showScroll) return;
    if (isReducedMotion) {
      setMicroPreviewText(microCommandText);
      return;
    }
    if (hasStartedMicroPreviewRef.current) return;
    hasStartedMicroPreviewRef.current = true;

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setMicroPreviewText(microCommandText.slice(0, index));
      if (index >= microCommandText.length) {
        window.clearInterval(intervalId);
      }
    }, 38);

    return () => window.clearInterval(intervalId);
  }, [isReducedMotion, microCommandText, showScroll]);

  return (
    <section id="hero" ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <NetworkBackground />
      <TelemetryParticles />
      <Scanlines />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg/20 via-cyber-bg/70 to-cyber-bg" />
      <div className="container-section relative z-10">
        <p className="hero-role mb-4 text-sm uppercase tracking-[0.25em] text-cyber-secondary">
          Security Engineer
        </p>
        <h1 className="max-w-4xl font-mono text-4xl font-semibold tracking-tight text-slate-100 md:text-6xl">
          {displayText}
          {showCursor && (
            <span aria-hidden className="ml-1 inline-block w-[0.8ch] animate-terminal-cursor text-cyan-400">
              _
            </span>
          )}
        </h1>
        <p
          className={`mt-4 font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70 transition-all duration-700 ${
            showSpecialization ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          aria-live={isReducedMotion ? undefined : "polite"}
          tabIndex={isReducedMotion ? -1 : 0}
          onMouseEnter={() => setIsKeywordPaused(true)}
          onMouseLeave={() => setIsKeywordPaused(false)}
          onFocus={() => setIsKeywordPaused(true)}
          onBlur={() => setIsKeywordPaused(false)}
        >
          <span className="relative inline-block">
            <span className="invisible">{longestKeyword}</span>
            <span
              className={`absolute left-0 top-0 transition-opacity duration-300 ${
                isReducedMotion || keywordVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {specializationKeywords[activeKeywordIndex]}
            </span>
          </span>
        </p>
        <p
          className={`mt-8 max-w-3xl text-lg leading-8 text-cyber-muted transition-all duration-700 ${
            showTagline ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Security Engineer specializing in detection engineering, privileged access automation, and
          authentication anomaly detection, with growing focus on AI-driven security analytics.
        </p>
        <p
          className={`mt-6 font-mono text-xs tracking-[0.12em] text-cyan-300/65 transition-all duration-700 ${
            showBadge ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          // Contributed to Enterprise NGPAM Deployment - Telkomsel
        </p>
        <a
          href="#about"
          className={`mt-12 inline-flex items-center gap-2 text-sm text-cyber-primary transition hover:text-cyber-secondary ${
            showScroll ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span>Scroll to explore experience</span>
          <span aria-hidden className={isReducedMotion ? "" : "animate-scroll-arrow"}>
            ↓
          </span>
        </a>
        <p
          className={`mt-3 font-mono text-xs tracking-[0.08em] text-cyan-300/55 transition-all duration-500 ${
            showScroll ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          aria-hidden
        >
          {microPreviewText}
        </p>
      </div>
    </section>
  );
}

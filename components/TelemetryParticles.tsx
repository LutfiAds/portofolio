"use client";

import { useMemo } from "react";

type Particle = {
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
};

const MAX_PARTICLES = 12;

export function TelemetryParticles() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: MAX_PARTICLES }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1.5 + Math.random() * 2}px`,
        duration: `${14 + Math.random() * 8}s`,
        delay: `${Math.random() * 6}s`
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={`telemetry-particle-${index}`}
          className="absolute rounded-full bg-cyan-300 opacity-[0.15] motion-safe:animate-telemetry-drift motion-reduce:animate-none"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.duration,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  );
}

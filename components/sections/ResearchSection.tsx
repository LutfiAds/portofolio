"use client";

import { motion, useReducedMotion } from "framer-motion";

const researchNodes = [
  {
    title: "AI-Driven Security Analytics",
    subtext: "anomaly detection · signal clustering · behavioral modeling",
    alignment: "left"
  },
  {
    title: "Authentication Behavior Modeling",
    subtext: "login telemetry · session fingerprinting · risk scoring",
    alignment: "right-shifted"
  },
  {
    title: "Detection Engineering Pipeline Design",
    subtext: "rule logic · anomaly signals · auth telemetry pipelines",
    alignment: "left"
  },
  {
    title: "Security Log Intelligence Systems",
    subtext: "event correlation · detection signals · SOC telemetry enrichment",
    alignment: "right-shifted"
  },
  {
    title: "Computer Vision for Security Monitoring",
    subtext: "visual anomaly detection · surveillance analytics · security automation",
    alignment: "center"
  }
];

export function ResearchTrajectoryMap() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="research" className="container-section">
      <div className="mb-16 md:mb-20">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-400">
          RESEARCH TRAJECTORY
        </p>
        <h2 data-reveal className="section-title mb-0">
          Research Interests
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-14 md:gap-20"
      >
        {researchNodes.map((node, i) => {
          const isCenter = node.alignment === "center";
          const isShifted = node.alignment === "right-shifted";

          return (
            <motion.div
              variants={itemVariants}
              key={i}
              className={`group relative w-full max-w-2xl ${
                isCenter
                  ? "mx-auto text-center"
                  : isShifted
                  ? "ml-6 text-left md:ml-32"
                  : "ml-0 text-left"
              }`}
            >
              <div className="relative flex flex-col pb-6">
                {/* Horizontal baseline track */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-cyber-secondary/10" />

                {/* Animated horizontal trajectory connection line */}
                {!shouldReduceMotion ? (
                  <motion.div
                    variants={lineVariants}
                    className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-cyan-400/25 to-transparent transition-colors duration-500 group-hover:from-cyan-400/40 group-hover:to-cyan-400/10"
                  />
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/25 to-transparent transition-colors duration-500 group-hover:from-cyan-400/40 group-hover:to-cyan-400/10" />
                )}

                {/* Hover interaction expanding underline */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-500 group-hover:w-full" />

                {/* Constellation node point on the underline */}
                <div
                  className={`absolute -bottom-[4px] h-2 w-2 rounded-full bg-cyan-400 transition-all duration-300 group-hover:-bottom-[5px] group-hover:h-3 group-hover:w-3 group-hover:animate-none group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.7)] ${
                    !shouldReduceMotion ? "animate-pulse-glow" : ""
                  } ${isCenter ? "left-1/2 -translate-x-1/2" : "left-0"}`}
                />

                <h3 className="text-[1.15rem] font-semibold text-slate-100 transition-colors duration-300 group-hover:text-cyan-300 md:text-2xl">
                  {node.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-cyber-muted md:text-[13px]">
                  {node.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

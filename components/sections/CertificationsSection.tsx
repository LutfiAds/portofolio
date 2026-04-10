"use client";

import { motion, useReducedMotion } from "framer-motion";

const trajectoryData = [
  {
    title: "BeyondTrust Certified Administrator – Password Safe",
    issued: "Feb 2026",
    expires: "Feb 2028",
    url: "#"
  },
  {
    title: "Delinea Secret Server Associate",
    issued: "Jul 2025",
    expires: undefined,
    url: "#"
  },
  {
    title: "Cisco Networking Essentials",
    issued: "Sep 2024",
    expires: undefined,
    url: "#"
  },
  {
    title: "Fortinet Certified Associate (FCA)",
    issued: "Aug 2024",
    expires: "Aug 2026",
    url: "#"
  },
  {
    title: "Fortinet Certified Fundamentals (FCF)",
    issued: "Aug 2024",
    expires: "Aug 2026",
    url: "#"
  }
];

export function CertificationsSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: "100%", transition: { duration: 1.2, ease: "easeInOut" } }
  };

  return (
    <section id="certifications" className="container-section">
      <div className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-400">
          CERTIFICATION TRAJECTORY
        </p>
        <h2 data-reveal className="section-title mb-0">
          Certifications
        </h2>
      </div>

      <div data-reveal className="card p-6 md:p-8">
        <div className="relative">
          {/* Timeline continuous line */}
          <div className="absolute left-[15px] top-[14px] bottom-[14px] w-[1px] bg-gradient-to-b from-cyan-400/10 via-cyan-400/20 to-transparent">
            {!shouldReduceMotion && (
              <motion.div
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full origin-top bg-cyan-400/50 shadow-[0_0_6px_rgba(56,189,248,0.2)] md:shadow-[0_0_8px_rgba(56,189,248,0.4)]"
              />
            )}
            {shouldReduceMotion && (
              <div className="h-full w-full bg-cyan-400/40" />
            )}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 md:space-y-8"
          >
            {trajectoryData.map((cert) => (
              <motion.div key={cert.title} variants={itemVariants} className="group relative z-10 flex items-start gap-4 md:gap-6">
                
                {/* Node Container (fixed width to center align over line) */}
                <div className="relative flex h-7 w-[31px] shrink-0 items-center justify-center">
                  <span
                    className={`block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.25)] transition-all duration-300 group-hover:h-3 group-hover:w-3 group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.7)] md:shadow-[0_0_8px_rgba(56,189,248,0.35)] ${
                      !shouldReduceMotion ? "md:animate-pulse" : ""
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="pt-0.5">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <h3 className="text-[15px] font-medium leading-snug text-slate-200 transition-colors duration-300 group-hover:text-cyan-300 md:text-base">
                      {cert.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-xs text-cyber-muted md:mt-2">
                       <span>Issued {cert.issued}</span>
                       {cert.expires && (
                         <>
                           <span className="opacity-50">|</span>
                           <span>Expires {cert.expires}</span>
                         </>
                       )}
                    </div>
                  </a>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sub-label expanding section */}
        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted md:text-xs">
            Currently expanding into:
          </p>
          <p className="text-xs text-slate-300/80 md:text-sm">
            Identity Security · Detection Engineering · AI Security Analytics
          </p>
        </div>
      </div>
    </section>
  );
}

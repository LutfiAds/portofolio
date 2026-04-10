export function ExperienceSection() {
  return (
    <section id="experience" className="container-section">
      <h2 data-reveal className="section-title">
        Professional Experience
      </h2>

      {/* Desktop: card left + impact right, Mobile: card then impact stacked */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">

        {/* Main experience card */}
        <article data-reveal className="card flex-1">
          <p className="text-sm uppercase tracking-[0.2em] text-cyber-secondary">JUNIOR IT ENGINEER</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-100">
            Enterprise Next-Generation PAM Deployment (Telkomsel)
          </h3>
          <div className="mt-6 space-y-6">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyber-secondary">
                Automation Engineering
              </p>
              <ul className="space-y-3 text-slate-100">
                <li>
                  Developed bulk credential rotation automation using PowerShell and Python via PAM API
                  integration
                </li>
                <li>
                  Implemented Linux password expiration handling automation across managed infrastructure
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyber-secondary">
                Infrastructure Integration
              </p>
              <ul className="space-y-3 text-slate-100">
                <li>Supported authentication troubleshooting across Palo Alto and F5 integrations</li>
                <li>
                  Assisted routing integration between infrastructure servers and PAM platform services
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyber-secondary">
                Reliability Improvements
              </p>
              <ul className="space-y-3 text-slate-100">
                <li>Resolved database queue deadlocking affecting credential lifecycle workflows</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-cyber-secondary/25 pt-4">
            <div className="flex flex-wrap gap-2">
              {["PowerShell", "Python", "PAM API", "Linux", "Palo Alto", "F5"].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-cyan-200/65"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Connector line — desktop only */}
        <div className="hidden lg:flex lg:w-10 lg:flex-shrink-0 lg:items-center" aria-hidden="true">
          <div className="h-px w-full bg-cyan-400/30" />
        </div>

        {/* IMPACT panel — outside the card, vertically centered on desktop */}
        <aside
          data-reveal
          className="w-full rounded-lg border border-cyan-400/30 bg-[#070b13] p-5 shadow-[0_0_14px_rgba(34,211,238,0.12)] lg:w-80 lg:flex-shrink-0 lg:self-center animate-float-impact"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan-400 [text-shadow:0_0_8px_rgba(34,211,238,0.45)]">IMPACT</p>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-100">
            <li>
              Improved reliability of credential lifecycle automation workflows across enterprise PAM
              infrastructure
            </li>
            <li>
              Supported authentication workflow stability through multi-system integration troubleshooting
            </li>
            <li>
              Strengthened operational readiness of privileged access infrastructure services
            </li>
          </ul>
        </aside>

      </div>
    </section>
  );
}

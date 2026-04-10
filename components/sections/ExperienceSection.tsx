export function ExperienceSection() {
  return (
    <section id="experience" className="container-section">
      <h2 data-reveal className="section-title">
        Professional Experience
      </h2>
      <article data-reveal className="card">
        <p className="text-sm uppercase tracking-[0.2em] text-cyber-secondary">Junior IT Engineer</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-100">
          Project Assignment - Enterprise Next Generation Privileged Access Management Deployment
          (Telkomsel)
        </h3>
        <ul className="mt-6 space-y-3 text-cyber-muted">
          <li>
            Contributed to enterprise-scale PAM implementation by developing automation scripts for bulk
            credential rotation using PowerShell and Python API integration.
          </li>
          <li>Automated Linux password expiration handling across managed systems.</li>
          <li>Supported authentication troubleshooting involving Palo Alto and F5 integrations.</li>
          <li>
            Resolved database queue deadlocking issues affecting credential lifecycle workflows.
          </li>
          <li>
            Supported routing integration between infrastructure servers and the PAM platform.
          </li>
        </ul>
      </article>
    </section>
  );
}

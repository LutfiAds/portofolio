const expertiseItems = [
  "Detection Engineering",
  "Authentication Log Analysis",
  "Privileged Access Management Automation",
  "Bulk Credential Rotation via API",
  "Security Log Parsing Pipeline Development",
  "Endpoint Security Monitoring",
  "SOC Monitoring Lab Deployment (Wazuh + Grafana)"
];

export function ExpertiseGrid() {
  return (
    <section className="container-section">
      <h2 data-reveal className="section-title">
        Core Expertise
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expertiseItems.map((item) => (
          <article key={item} data-reveal className="card">
            <p className="text-base font-medium text-slate-100">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: "AI-Based Authentication Log Anomaly Detection System",
    description:
      "Developed an authentication log analysis pipeline combining rule-based detection with machine learning anomaly detection using Isolation Forest.",
    details: [
      "Implemented classification models to distinguish normal versus suspicious authentication behavior.",
      "Designed synthetic authentication telemetry scenarios representing real-world login activity patterns."
    ]
  },
  {
    title: "SOC Monitoring Lab Environment (Wazuh + Grafana)",
    description:
      "Built a monitoring lab environment using Wazuh and Grafana to simulate SOC visibility workflows.",
    details: []
  },
  {
    title: "AI SOC Log Analyzer",
    description:
      "Developed a log analysis tool designed to identify suspicious authentication activity using anomaly detection techniques.",
    details: []
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="container-section">
      <h2 data-reveal className="section-title">
        Projects
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} data-reveal className="card">
            <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
            <p className="mt-3 text-cyber-muted">{project.description}</p>
            {project.details.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-cyber-muted">
                {project.details.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

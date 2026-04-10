const interests = [
  "AI-Driven Security Analytics",
  "Authentication Behavior Modeling",
  "Detection Engineering Pipelines",
  "Security Log Intelligence",
  "Computer Vision for Security Applications"
];

export function ResearchSection() {
  return (
    <section id="research" className="container-section">
      <h2 data-reveal className="section-title">
        Research Interests
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interests.map((interest) => (
          <article key={interest} data-reveal className="card">
            <p className="text-slate-100">{interest}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

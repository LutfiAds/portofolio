const completed = [
  "Delinea Associate Secret Server Certification",
  "BeyondTrust Certified Administrator - Password Safe",
  "Fortinet Certified Fundamentals (FCF)",
  "Fortinet Certified Associate (FCA)",
  "Cisco Networking Essentials"
];

const pursuing = [
  "Palo Alto Foundational Cybersecurity Practitioner",
  "CompTIA Security+"
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="container-section">
      <h2 data-reveal className="section-title">
        Certifications
      </h2>
      <div data-reveal className="card relative">
        <div className="absolute bottom-8 left-4 top-8 w-px bg-cyber-primary/40" />
        <div className="space-y-8 pl-8">
          {completed.map((item) => (
            <div key={item} className="relative">
              <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-cyber-secondary" />
              <p className="text-slate-100">{item}</p>
            </div>
          ))}
          <div className="pt-4">
            <p className="mb-3 text-sm uppercase tracking-[0.18em] text-cyber-secondary">
              Currently pursuing
            </p>
            <ul className="space-y-2 text-cyber-muted">
              {pursuing.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const contacts = [
  { label: "GitHub", value: "https://github.com/your-username" },
  { label: "LinkedIn", value: "https://linkedin.com/in/your-profile" },
  { label: "Email", value: "mailto:lutfi@example.com" }
];

export function ContactSection() {
  return (
    <section id="contact" className="container-section pb-28">
      <h2 data-reveal className="section-title">
        Contact
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {contacts.map((item) => (
          <a
            key={item.label}
            href={item.value}
            data-reveal
            target={item.label === "Email" ? undefined : "_blank"}
            rel={item.label === "Email" ? undefined : "noreferrer"}
            className="card transition-colors hover:border-cyber-secondary/50"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-cyber-secondary">{item.label}</p>
            <p className="mt-2 text-cyber-muted">{item.value.replace("mailto:", "")}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

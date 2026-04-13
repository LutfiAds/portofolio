import { Mail } from "lucide-react";

/* ── Inline brand SVGs (lucide-react has no brand logos) ───────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ── Contact data ───────────────────────────────────────────────────── */
const contacts = [
  {
    label: "GITHUB",
    displayLink: "github.com/LutfiAds",
    href: "https://github.com/LutfiAds",
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "LINKEDIN",
    displayLink: "linkedin.com/in/lutfiadli",
    href: "https://linkedin.com/in/lutfiadli",
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "EMAIL",
    displayLink: "lutfiadli17@gmail.com",
    href: "mailto:lutfiadli17@gmail.com",
    Icon: Mail,
    external: false,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="container-section pb-28">
      <h2 data-reveal className="section-title">
        Contact
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {contacts.map(({ label, displayLink, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            data-reveal
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={`${label} — ${displayLink}`}
            className="contact-badge"
          >
            {/* Icon pill */}
            <span className="contact-badge__icon">
              <Icon className="contact-badge__svg" />
            </span>

            {/* UPPERCASE platform label */}
            <p className="contact-badge__label">{label}</p>

            {/* Readable link */}
            <p className="contact-badge__link">{displayLink}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

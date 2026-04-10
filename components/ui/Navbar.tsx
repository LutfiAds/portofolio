"use client";

const items = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-cyber-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#hero"
          className="font-mono text-sm tracking-wider text-cyan-300 transition duration-300 hover:text-cyan-200 hover:drop-shadow-[0_0_8px_rgba(63,248,255,0.45)]"
        >
          mlas.dev
        </a>
        <ul className="hidden items-center gap-6 text-sm text-cyber-muted md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a className="transition-colors hover:text-cyber-primary" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

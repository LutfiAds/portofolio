"use client";

import { useMemo, useState } from "react";

type TerminalCommand = "whoami" | "skills" | "projects" | "contact";

const responseMap: Record<TerminalCommand, string[]> = {
  whoami: ["Muhamad Lutfi Adli Setiawan", "Security Engineer"],
  skills: [
    "Detection engineering",
    "Authentication log analysis",
    "Privileged access automation",
    "Bulk credential rotation scripting",
    "SOC monitoring lab deployment"
  ],
  projects: [
    "AI-Based Authentication Log Anomaly Detection System",
    "SOC Monitoring Lab Environment (Wazuh + Grafana)",
    "AI SOC Log Analyzer"
  ],
  contact: ["Email: lutfi@example.com", "GitHub: github.com/your-username", "LinkedIn: linkedin.com/in/your-profile"]
};

const validCommands: TerminalCommand[] = ["whoami", "skills", "projects", "contact"];

export function TerminalWidget() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Type one of: whoami, skills, projects, contact"
  ]);

  const placeholder = useMemo(() => "Enter command...", []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim().toLowerCase() as TerminalCommand;
    if (!input.trim()) return;

    if (validCommands.includes(command)) {
      setHistory((prev) => [...prev, `> ${command}`, ...responseMap[command]]);
    } else {
      setHistory((prev) => [...prev, `> ${input}`, "Command not found"]);
    }
    setInput("");
  };

  return (
    <section className="container-section">
      <h2 data-reveal className="section-title">
        Terminal
      </h2>
      <div data-reveal className="card">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <p className="ml-2 text-xs tracking-widest text-cyber-muted">SECURE-SHELL</p>
        </div>
        <div className="max-h-56 overflow-y-auto rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm">
          {history.map((line, idx) => (
            <p key={`${line}-${idx}`} className="text-cyan-100/90">
              {line}
            </p>
          ))}
        </div>
        <form onSubmit={onSubmit} className="mt-4">
          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <span className="font-mono text-cyber-secondary">{">"}</span>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-cyber-muted"
              placeholder={placeholder}
              aria-label="Terminal command input"
            />
          </label>
        </form>
      </div>
    </section>
  );
}

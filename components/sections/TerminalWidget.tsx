"use client";

import { useEffect, useRef, useState } from "react";

type TerminalCommand = "whoami" | "skills" | "projects" | "contact" | "clear" | "help";

type HistoryEntry = {
  prompt: string;
  command: string;
  output: string[];
};

const responseMap: Record<Exclude<TerminalCommand, "clear" | "help">, string[]> = {
  whoami: [
    "Muhamad Lutfi Adli Setiawan",
    "Security Engineer",
    "──────────────────────────────────────",
    "Detection Engineering · PAM Automation · Authentication Log Analytics",
  ],
  skills: [
    "PowerShell",
    "Python",
    "Detection engineering",
    "PAM API automation",
    "Security log pipelines",
    "Authentication log analysis",
    "Privileged access automation",
    "Bulk credential rotation scripting",
    "SOC monitoring lab deployment",
  ],
  projects: [
    "[01]  AI-Based Authentication Log Anomaly Detection System",
    "[02]  SOC Monitoring Lab Environment (Wazuh + Grafana)",
    "[03]  AI SOC Log Analyzer",
  ],
  contact: [
    "Email    →  lutfi@example.com",
    "GitHub   →  github.com/LutfiAds",
    "LinkedIn →  linkedin.com/in/your-profile",
  ],
};

const PROMPT_USER = "visitor";
const PROMPT_HOST = "portfolio";
const PROMPT_PATH = "~";
const PROMPT = `${PROMPT_USER}@${PROMPT_HOST}:${PROMPT_PATH}$`;

const VALID_COMMANDS: TerminalCommand[] = ["whoami", "skills", "projects", "contact", "clear", "help"];

const HELP_OUTPUT = [
  "Available commands:",
  "  whoami    — identity & summary",
  "  skills    — technical skill set",
  "  projects  — featured projects",
  "  contact   — get in touch",
  "  clear     — clear terminal",
  "  help      — show this message",
];

const BOOT_LINES = [
  "secure-shell v1.0.0",
  "connected to mlas.dev interface",
  "──────────────────────────────────────",
  'type "help" to list available commands',
];

export function TerminalWidget() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ONLY inside the terminal body, not the whole page
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history]);

  // Boot sequence typing effect
  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase() as TerminalCommand;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      setCommandHistory((prev) => [raw, ...prev]);
      setHistoryIndex(-1);
      return;
    }

    let output: string[];
    if (cmd === "help") {
      output = HELP_OUTPUT;
    } else if (VALID_COMMANDS.includes(cmd)) {
      output = responseMap[cmd as Exclude<TerminalCommand, "clear" | "help">];
    } else {
      output = [
        `Command not recognized: "${raw}"`,
        'type "help" to list available commands',
      ];
    }

    setHistory((prev) => [
      ...prev,
      { prompt: PROMPT, command: raw, output },
    ]);
    setCommandHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : (commandHistory[nextIndex] ?? ""));
    }
  };

  return (
    <section className="container-section">
      <h2 data-reveal className="section-title">
        Interactive Shell
      </h2>

      {/* Terminal Window */}
      <div
        data-reveal
        onClick={handleTerminalClick}
        className="card cursor-text select-none overflow-hidden rounded-xl border border-white/10 bg-[#0a0e14] shadow-2xl shadow-black/60"
      >
        {/* Title Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <div className="ml-auto flex flex-col items-end gap-0.5">
            <p className="font-mono text-[10px] font-semibold tracking-widest text-cyan-400/90">
              SECURE-SHELL v1.0.0
            </p>
            <p className="font-mono text-[9px] tracking-wider text-slate-500">
              connected to mlas.dev interface
            </p>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollContainerRef}
          className="max-h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed sm:text-[13px]"
        >
          {/* Boot lines */}
          {booted && (
            <div className="mb-3 space-y-0.5">
              {BOOT_LINES.map((line, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-cyan-300/90 font-semibold"
                      : i === 1
                        ? "text-slate-400 text-xs"
                        : i === 2
                          ? "text-white/10"
                          : "text-slate-500 text-xs"
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Command History */}
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {/* Prompt + command line */}
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-emerald-400/90">{PROMPT_USER}</span>
                <span className="text-slate-500">@</span>
                <span className="text-cyan-400/90">{PROMPT_HOST}</span>
                <span className="text-slate-500">:</span>
                <span className="text-blue-400/80">{PROMPT_PATH}</span>
                <span className="text-white/60">$</span>
                <span className="text-slate-100 ml-1">{entry.command}</span>
              </div>
              {/* Output */}
              <div className="mt-1 space-y-0.5 pl-2 border-l border-white/5">
                {entry.output.map((line, j) => (
                  <p
                    key={j}
                    className={
                      line.startsWith("──")
                        ? "text-white/10"
                        : line.startsWith("Command not recognized")
                          ? "text-red-400/80"
                          : line.startsWith("type")
                            ? "text-slate-500 text-xs"
                            : line.startsWith("  ")
                              ? "text-slate-400 text-xs"
                              : "text-cyan-100/90"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Active prompt line */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-emerald-400/90">{PROMPT_USER}</span>
              <span className="text-slate-500">@</span>
              <span className="text-cyan-400/90">{PROMPT_HOST}</span>
              <span className="text-slate-500">:</span>
              <span className="text-blue-400/80">{PROMPT_PATH}</span>
              <span className="text-white/60">$</span>
              <div className="relative ml-1 flex items-center">
                {/* Invisible input captures keyboard */}
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
                  aria-label="Terminal command input"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                {/* Visible text + blinking cursor */}
                <span className="text-slate-100 select-none">{input}</span>
                <span
                  className="ml-px inline-block h-[1.1em] w-[0.55em] bg-cyan-400/90 animate-blink"
                  aria-hidden="true"
                />
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Blink keyframe — injected as a style tag for portability */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
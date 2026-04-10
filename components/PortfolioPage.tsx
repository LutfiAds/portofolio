"use client";

import { About } from "@/components/sections/About";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { TerminalWidget } from "@/components/sections/TerminalWidget";
import { Navbar } from "@/components/ui/Navbar";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useLenis } from "@/hooks/useLenis";

export function PortfolioPage() {
  useLenis();
  useGsapReveal();

  return (
    <main className="bg-cyber-bg">
      <Navbar />
      <Hero />
      <About />
      <ExpertiseGrid />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ResearchSection />
      <TerminalWidget />
      <ContactSection />
    </main>
  );
}

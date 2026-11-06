import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import { ThreeBackground } from './components/ThreeBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { InteractiveDevCard } from './components/InteractiveDevCard';
import { Projects } from './components/Projects';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CodeSection } from './components/CodeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DevTerminal } from './components/DevTerminal';
import { Project } from './types';
import { sounds } from './utils/soundEffects';

export const App: React.FC = () => {
  const { personal, skillGroups, projects } = portfolioData;

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [architectureProject, setArchitectureProject] = useState<Project | null>(null);

  // Keyboard shortcut listener for terminal (Ctrl+K, Cmd+K, or Backquote `)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === '`' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        sounds.playClick();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-surface-light-text dark:text-surface-dark-text selection:bg-accent selection:text-white transition-colors duration-200">
      
      {/* 3D Interactive Three.js Background Canvas (z-0) */}
      <ThreeBackground />

      {/* Foreground Content (z-10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Clean, Uncluttered Editorial Header */}
        <Header
          name={personal.name}
          cvUrl={personal.cvUrl}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* 1. Hero with 3D Three.js Interactive Sculpture & Photo Slot */}
          <Hero
            name={personal.name}
            role={personal.role}
            headline={personal.headline}
          />

          {/* 2. About */}
          <About
            aboutText={personal.about}
          />

          {/* 3. Skills */}
          <Skills
            skillGroups={skillGroups}
          />

          {/* 4. Interactive 3D Developer Card */}
          <InteractiveDevCard
            name={personal.name}
            role={personal.role}
            email={personal.email}
            phone={personal.phone}
            githubUrl={personal.githubUrl}
            linkedinUrl={personal.linkedinUrl}
          />

          {/* 5. Projects with Interactive Filter & Architecture Inspector */}
          <Projects
            projects={projects}
            onInspectArchitecture={(project) => setArchitectureProject(project)}
          />

          {/* 6. Code / GitHub */}
          <CodeSection
            githubUrl={personal.githubUrl}
            codeInvite={personal.codeInvite}
          />

          {/* 7. Contact */}
          <Contact
            email={personal.email}
            phone={personal.phone}
            linkedinUrl={personal.linkedinUrl}
            githubUrl={personal.githubUrl}
            cvUrl={personal.cvUrl}
          />
        </main>

        {/* Footer */}
        <Footer name={personal.name} />

      </div>

      {/* Architecture Inspector Modal */}
      {architectureProject && (
        <ArchitectureModal
          project={architectureProject}
          onClose={() => setArchitectureProject(null)}
        />
      )}

      {/* Interactive Developer Terminal */}
      <DevTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleTheme={handleToggleTheme}
      />

      {/* Floating Terminal Shortcut Pill */}
      {!terminalOpen && (
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            setTerminalOpen(true);
          }}
          className="fixed bottom-5 right-5 z-40 hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card/90 dark:bg-surface-dark-card/90 backdrop-blur-md shadow-lg text-xs font-mono text-surface-light-text dark:text-surface-dark-text hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-all duration-150 group"
          title="Open Developer Console (Ctrl+K or `)"
        >
          <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark group-hover:animate-ping" />
          <span>&gt;_ Dev Console</span>
          <span className="px-1.5 py-0.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg text-[10px] text-surface-light-subtext dark:text-surface-dark-subtext border border-surface-light-border dark:border-surface-dark-border">
            Ctrl+K
          </span>
        </button>
      )}

    </div>
  );
};

export default App;

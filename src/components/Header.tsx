import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import { LagosClock } from './LagosClock';
import { DownloadIcon } from './Icons';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  name: string;
  role: string;
  cvUrl: string;
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ name, role, cvUrl, onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "3D Card", href: "#developer-card" },
    { label: "Work", href: "#projects" },
    { label: "Code", href: "#code" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-light-border dark:border-surface-dark-border bg-surface-light-bg/95 dark:bg-surface-dark-bg/95 backdrop-blur-sm transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Identity & Status & Live Lagos Clock */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="group flex items-baseline gap-2"
          >
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-surface-light-text dark:text-surface-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
              {name}
            </span>
            <span className="hidden md:inline font-mono text-xs text-surface-light-subtext dark:text-surface-dark-subtext">
              / {role}
            </span>
          </a>

          {/* DevFest Lagos Real-time Clock */}
          <LagosClock />
        </div>

        {/* Desktop Navigation & Interactive Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-5 text-sm font-sans">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Interactive Terminal Trigger */}
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            title="Open Interactive Developer Terminal"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded border border-surface-light-border dark:border-surface-dark-border hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-colors"
          >
            <span className="text-accent dark:text-accent-dark font-bold">&gt;_</span>
            <span>Terminal</span>
          </button>

          {/* Download CV */}
          <a
            href={cvUrl}
            download
            onClick={() => sounds.playClick()}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-surface-light-border dark:border-surface-dark-border hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-colors"
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* Sound Synthesizer Toggle */}
          <SoundToggle />

          {/* Theme switcher */}
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen)}
            }
            type="button"
            className="md:hidden p-1.5 text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card px-5 py-4 space-y-3 font-sans text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
              }}
              className="block py-1.5 text-surface-light-text dark:text-surface-dark-text hover:text-accent dark:hover:text-accent-dark"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-surface-light-border dark:border-surface-dark-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent dark:text-accent-dark"
            >
              <span>&gt;_ Open Terminal</span>
            </button>
            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-1.5 text-xs font-mono text-surface-light-subtext dark:text-surface-dark-subtext"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

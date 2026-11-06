import React, { useState } from 'react';
import { Project } from '../types';
import { sounds } from '../utils/soundEffects';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!project) return null;

  const steps = [
    {
      title: "Client Layer",
      host: "Browser / Edge Cache",
      detail: "Responsive React and Tailwind interface delivered via global CDN edge nodes for instantaneous load times across Nigeria and international traffic.",
      badge: "Vercel Edge",
    },
    {
      title: "API & Backend Layer",
      host: "Node.js / PHP on cPanel",
      detail: "Decoupled backend API endpoints handling session authentication, request validation, CORS, and administrative CRUD operations.",
      badge: "cPanel Linux",
    },
    {
      title: "Relational Database",
      host: "MySQL Database Instance",
      detail: "Structured schema with indexed tables for articles, categories, user sessions, and inquiries. Managed via phpMyAdmin with automated backups.",
      badge: "MySQL 8.0",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-6 border-b border-surface-light-border dark:border-surface-dark-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-accent dark:text-accent-dark">
                System Architecture Inspector
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-surface-light-text dark:text-surface-dark-text">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded text-surface-light-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text border border-surface-light-border dark:border-surface-dark-border"
            aria-label="Close architecture modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-surface-light-subtext dark:text-surface-dark-subtext">
            {project.roleHighlight || "Full stack decoupled deployment configured by Ademola Adebayo."}
          </p>

          {/* Interactive Pipeline Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-4 rounded text-left border transition-all ${
                    isSelected
                      ? 'border-accent bg-accent-light/40 dark:bg-accent-dark/10 shadow-sm'
                      : 'border-surface-light-border dark:border-surface-dark-border bg-surface-light-bg dark:bg-surface-dark-bg hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext mb-2">
                    <span>STEP 0{idx + 1}</span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-light-card dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-[9px]">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="font-mono text-xs font-semibold text-surface-light-text dark:text-surface-dark-text mb-1">
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-mono text-accent dark:text-accent-dark">
                    {step.host}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Step Deep Dive */}
          <div className="p-4 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-bg dark:bg-surface-dark-bg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-accent dark:text-accent-dark font-medium">
                Active Layer: {steps[activeStep].title}
              </span>
              <span className="text-surface-light-subtext dark:text-surface-dark-subtext">
                Deployment: {steps[activeStep].host}
              </span>
            </div>
            <p className="text-sm font-sans text-surface-light-text dark:text-surface-dark-text leading-relaxed">
              {steps[activeStep].detail}
            </p>
          </div>

          {/* Practical Metrics */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
            <span>DNS & SSL: Cloudflare / Let's Encrypt</span>
            <span>Uptime: Monitored</span>
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent dark:text-accent-dark hover:underline"
            >
              Open live site &rarr;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-light-muted dark:bg-surface-dark-muted border-t border-surface-light-border dark:border-surface-dark-border flex justify-end">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded bg-surface-light-text text-surface-light-bg dark:bg-surface-dark-text dark:text-surface-dark-bg text-xs font-mono font-medium hover:bg-accent dark:hover:bg-accent-dark"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

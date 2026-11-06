import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, GithubIcon, GlobeIcon } from './Icons';
import { sounds } from '../utils/soundEffects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onInspectArchitecture: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onInspectArchitecture }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Compute screenshot URL: manual override takes priority, otherwise use WordPress mshots
  const screenshotUrl = project.imageOverride && project.imageOverride.trim() !== ''
    ? project.imageOverride
    : `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.siteUrl)}?w=1200&h=750`;

  const cleanDomain = project.siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <article className="group flex flex-col rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card overflow-hidden hover:border-surface-light-text/30 dark:hover:border-surface-dark-text/30 transition-all duration-200">
      
      {/* 1. SCREENSHOT FIRST */}
      <div className="relative aspect-[16/10] w-full bg-surface-light-muted dark:bg-surface-dark-muted overflow-hidden border-b border-surface-light-border dark:border-surface-dark-border">
        
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-surface-light-muted dark:bg-surface-dark-muted animate-pulse">
            <GlobeIcon className="w-8 h-8 text-surface-light-subtext/40 dark:text-surface-dark-subtext/40 mb-3" />
            <span className="font-mono text-xs text-surface-light-subtext dark:text-surface-dark-subtext">
              Loading live snapshot...
            </span>
            <span className="font-mono text-[11px] text-surface-light-subtext/70 dark:text-surface-dark-subtext/70 mt-1">
              {cleanDomain}
            </span>
          </div>
        )}

        {/* Fallback if screenshot fails */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-surface-light-muted dark:bg-surface-dark-muted">
            <GlobeIcon className="w-8 h-8 text-accent dark:text-accent-dark mb-2" />
            <h4 className="font-serif text-base text-surface-light-text dark:text-surface-dark-text mb-1">
              {project.title}
            </h4>
            <p className="font-mono text-xs text-surface-light-subtext dark:text-surface-dark-subtext max-w-xs mb-3">
              Live screenshot could not be loaded. Visit the live site directly below.
            </p>
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent dark:text-accent-dark hover:underline"
            >
              <span>{cleanDomain}</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <img
            src={screenshotUrl}
            alt={`${project.title} live website screenshot`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top browser-like subtle chrome line */}
        <div className="absolute top-0 inset-x-0 h-6 px-3 bg-surface-light-card/90 dark:bg-surface-dark-card/90 backdrop-blur-sm border-b border-surface-light-border dark:border-surface-dark-border flex items-center justify-between text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-surface-light-border dark:border-surface-dark-border" />
            <span className="w-2 h-2 rounded-full bg-surface-light-border dark:border-surface-dark-border" />
            <span className="w-2 h-2 rounded-full bg-surface-light-border dark:border-surface-dark-border" />
          </div>
          <span className="truncate max-w-[200px]">{cleanDomain}</span>
          <span>0{index + 1}</span>
        </div>
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Header: Title and Role badge */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-2xl font-normal tracking-tight text-surface-light-text dark:text-surface-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
              {project.title}
            </h3>
            {project.year && (
              <span className="font-mono text-xs text-surface-light-subtext dark:text-surface-dark-subtext">
                {project.year}
              </span>
            )}
          </div>

          {project.roleHighlight && (
            <p className="font-mono text-xs text-accent dark:text-accent-dark">
              {project.roleHighlight}
            </p>
          )}
        </div>

        {/* 3. DESCRIPTION (2-3 sentences, plain human language) */}
        <p className="text-sm sm:text-base text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed mb-6">
          {project.description}
        </p>

        {/* 4. TECH TAGS */}
        <div className="mt-auto pt-4 border-t border-surface-light-border dark:border-surface-dark-border">
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techTags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 text-xs font-mono rounded bg-surface-light-bg dark:bg-surface-dark-bg text-surface-light-subtext dark:text-surface-dark-subtext border border-surface-light-border dark:border-surface-dark-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 5. ACTION BUTTONS & ARCHITECTURE INSPECTOR */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded bg-surface-light-text text-surface-light-bg dark:bg-surface-dark-text dark:text-surface-dark-bg hover:bg-accent dark:hover:bg-accent-dark hover:text-white dark:hover:text-white transition-colors"
            >
              <span>Visit site</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>

            {/* Architecture Inspector Modal Trigger */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onInspectArchitecture(project);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded border border-accent/40 text-accent dark:text-accent-dark hover:bg-accent hover:text-white dark:hover:bg-accent-dark dark:hover:text-white transition-colors"
              title="Inspect system architecture, Vercel frontend, and cPanel API setup"
            >
              <span>Inspect Architecture</span>
            </button>

            {/* View code button (Hidden if empty or absent) */}
            {project.codeUrl && project.codeUrl.trim() !== '' && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded border border-surface-light-border dark:border-surface-dark-border text-surface-light-text dark:text-surface-dark-text hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </article>
  );
};

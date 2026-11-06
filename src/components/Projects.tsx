import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { sounds } from '../utils/soundEffects';

interface ProjectsProps {
  projects: Project[];
  onInspectArchitecture: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onInspectArchitecture }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'fullstack') return p.techTags.some(t => ['PHP', 'MySQL', 'REST API'].includes(t));
    if (filter === 'react') return p.techTags.some(t => t.includes('React'));
    return true;
  });

  const handleFilter = (f: string) => {
    sounds.playClick();
    setFilter(f);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-surface-light-border dark:border-surface-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">04</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Selected Work</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-surface-light-text dark:text-surface-dark-text tracking-tight font-normal">
              Work from the Last Year
            </h2>
            <p className="mt-2 text-surface-light-subtext dark:text-surface-dark-subtext text-base font-sans max-w-xl">
              Live websites I built, configured, and deployed. Each card pulls an automated snapshot directly from the production site.
            </p>
          </div>

          {/* Interactive Tag Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card text-xs font-mono">
            <button
              type="button"
              onClick={() => handleFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'all'
                  ? 'bg-accent text-white font-medium'
                  : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => handleFilter('fullstack')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'fullstack'
                  ? 'bg-accent text-white font-medium'
                  : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
              }`}
            >
              Full Stack API
            </button>
            <button
              type="button"
              onClick={() => handleFilter('react')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'react'
                  ? 'bg-accent text-white font-medium'
                  : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
              }`}
            >
              React / Web
            </button>
          </div>
        </div>

        {/* Projects List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onInspectArchitecture={onInspectArchitecture}
            />
          ))}
        </div>

        {/* Client Note / Guarantee */}
        <div className="mt-12 p-6 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-sans text-sm text-surface-light-subtext dark:text-surface-dark-subtext">
            <span className="text-surface-light-text dark:text-surface-dark-text font-medium">Need something similar?</span> I build custom websites, connect domain names, configure databases, and handle hosting setup from start to finish.
          </div>
          <a
            href="#contact"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center justify-center font-mono text-xs text-accent dark:text-accent-dark font-medium hover:underline whitespace-nowrap"
          >
            Start a conversation &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};

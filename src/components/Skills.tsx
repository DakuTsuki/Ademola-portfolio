import React from 'react';
import { SkillGroup } from '../types';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export const Skills: React.FC<SkillsProps> = ({ skillGroups }) => {
  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-surface-light-border dark:border-surface-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">02</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Skills and Stack</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-surface-light-text dark:text-surface-dark-text tracking-tight font-normal">
              Technical Capabilities
            </h2>
            <p className="mt-2 text-surface-light-subtext dark:text-surface-dark-subtext text-base font-sans">
              Practical tools and technologies I use to build, manage, and deploy live web projects.
            </p>
          </div>
          <div className="font-mono text-xs text-surface-light-subtext dark:text-surface-dark-subtext">
            No arbitrary percentages. Just tools I know and use.
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => {
            const isWide = group.category.toLowerCase().includes('management') || group.category.toLowerCase().includes('team');

            return (
              <div
                key={index}
                className={`p-6 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card transition-colors duration-150 flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono text-xs tracking-wider uppercase text-surface-light-text dark:text-surface-dark-text font-semibold flex items-center gap-2">
                      {isWide && (
                        <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark" />
                      )}
                      {group.category}
                    </h3>
                    <span className="font-mono text-[11px] text-surface-light-subtext dark:text-surface-dark-subtext">
                      {group.skills.length} items
                    </span>
                  </div>

                  {/* Text Tags */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`inline-block px-3 py-1.5 text-xs font-mono rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-bg dark:bg-surface-dark-bg text-surface-light-text dark:text-surface-dark-text transition-colors ${
                          isWide
                            ? 'hover:border-accent dark:hover:border-accent-dark'
                            : ''
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {group.note && (
                  <p className="mt-4 pt-3 border-t border-surface-light-border dark:border-surface-dark-border text-xs text-surface-light-subtext dark:text-surface-dark-subtext font-sans">
                    {group.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

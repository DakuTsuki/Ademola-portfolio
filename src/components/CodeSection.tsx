import React from 'react';
import { GithubIcon, ArrowUpRightIcon, CodeIcon } from './Icons';

interface CodeSectionProps {
  githubUrl: string;
  codeInvite: string;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ githubUrl, codeInvite }) => {
  return (
    <section id="code" className="py-16 sm:py-24 border-b border-surface-light-border dark:border-surface-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">05</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Code and Repositories</span>
        </div>

        <div className="p-8 sm:p-12 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-accent dark:text-accent-dark">
                <CodeIcon className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-surface-light-text dark:text-surface-dark-text">
                Browse My Code
              </h2>
            </div>
            
            {/* One honest line inviting people to look at my code */}
            <p className="text-base text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed">
              {codeInvite}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-surface-light-text text-surface-light-bg dark:bg-surface-dark-text dark:text-surface-dark-bg hover:bg-accent dark:hover:bg-accent-dark hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors duration-150"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/DakuTsuki</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

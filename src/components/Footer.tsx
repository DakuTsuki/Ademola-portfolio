import React from 'react';

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-surface-light-border dark:border-surface-dark-border">
          
          <div>
            <span className="font-serif text-lg font-medium tracking-tight text-surface-light-text dark:text-surface-dark-text block">
              {name}
            </span>
            <span className="text-xs font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
              Web Developer / Nigeria
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#about" className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-accent dark:hover:text-accent-dark transition-colors">
              About
            </a>
            <a href="#skills" className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-accent dark:hover:text-accent-dark transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-accent dark:hover:text-accent-dark transition-colors">
              Work
            </a>
            <a href="#code" className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-accent dark:hover:text-accent-dark transition-colors">
              Code
            </a>
            <a href="#contact" className="text-surface-light-subtext dark:text-surface-dark-subtext hover:text-accent dark:hover:text-accent-dark transition-colors">
              Contact
            </a>
            <a href="#" className="text-accent dark:text-accent-dark hover:underline transition-colors">
              Back to top &uarr;
            </a>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          <p>
            Editorial layout. React + Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

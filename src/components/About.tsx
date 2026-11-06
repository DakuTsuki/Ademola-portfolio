import React from 'react';

interface AboutProps {
  aboutText: string;
}

export const About: React.FC<AboutProps> = ({ aboutText }) => {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-surface-light-border dark:border-surface-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">01</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Big Editorial Summary */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl sm:text-4xl text-surface-light-text dark:text-surface-dark-text leading-snug font-normal tracking-tight mb-4">
              I build websites from initial code to live deployment.
            </h2>
            <p className="font-mono text-xs text-accent dark:text-accent-dark uppercase tracking-wider">
              Front End, Backend, Database, and Hosting
            </p>
          </div>

          {/* Body Copy */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed">
            <p className="text-surface-light-text dark:text-surface-dark-text font-normal">
              {aboutText}
            </p>

            <p>
              Many projects fail or get stuck not because of the code itself, but because of hosting problems, broken DNS records, or database errors during migration. I make sure the whole pipeline works together. If an issue happens on the server or in the database, I know how to log into cPanel or phpMyAdmin, troubleshoot the queries, and get things back online.
            </p>

            <p>
              I use tools that get the job done quickly and cleanly. I write React and Tailwind for front ends, build server-side logic and APIs with Node.js and PHP, and manage databases with MySQL. Beyond code, I bring team building and project management habits: coordinating deliverables, running code reviews, and keeping communication clear so work finishes on time.
            </p>

            {/* Practical bullet facts */}
            <div className="pt-6 border-t border-surface-light-border dark:border-surface-dark-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-sans">
              <div className="p-4 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card">
                <span className="font-mono text-xs text-accent dark:text-accent-dark block mb-1">Hosting & Infrastructure</span>
                <p className="text-surface-light-text dark:text-surface-dark-text text-sm">
                  DNS setup, SSL certificates, subdomains, cPanel, and zero-loss migrations.
                </p>
              </div>
              <div className="p-4 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card">
                <span className="font-mono text-xs text-accent dark:text-accent-dark block mb-1">Full Stack Development</span>
                <p className="text-surface-light-text dark:text-surface-dark-text text-sm">
                  React front ends, Node.js and PHP APIs, and MySQL relational databases.
                </p>
              </div>
              <div className="p-4 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card">
                <span className="font-mono text-xs text-accent dark:text-accent-dark block mb-1">Project Leadership</span>
                <p className="text-surface-light-text dark:text-surface-dark-text text-sm">
                  Team building, task planning, code reviews, and stakeholder communication.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

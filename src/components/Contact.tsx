import React, { useState } from 'react';
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, DownloadIcon, CopyIcon, CheckIcon, ArrowUpRightIcon } from './Icons';

interface ContactProps {
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
}

export const Contact: React.FC<ContactProps> = ({
  email,
  phone,
  linkedinUrl,
  githubUrl,
  cvUrl,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">06</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Statement */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl sm:text-5xl text-surface-light-text dark:text-surface-dark-text leading-[1.12] font-normal tracking-tight mb-6">
              Get in touch about a website or development role.
            </h2>
            <p className="text-base sm:text-lg text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed mb-8 max-w-lg">
              I am open to new freelance projects, remote positions, and contract web development work. Send an email or message me on LinkedIn, and I will reply promptly.
            </p>

            {/* Direct Mailto Button */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20for%20Ademola`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover text-white text-sm font-medium rounded transition-colors duration-150"
              >
                <MailIcon className="w-4 h-4" />
                <span>Send me an email</span>
              </a>

              <a
                href={cvUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-surface-light-border dark:border-surface-dark-border hover:border-surface-light-text dark:hover:border-surface-dark-text text-surface-light-text dark:text-surface-dark-text bg-surface-light-card dark:bg-surface-dark-card text-sm font-medium rounded transition-colors duration-150"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Email card */}
            <div className="p-5 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-surface-light-text dark:text-surface-dark-text">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-surface-light-subtext dark:text-surface-dark-subtext">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-sm sm:text-base text-surface-light-text dark:text-surface-dark-text hover:text-accent dark:hover:text-accent-dark transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(email, 'email')}
                className="p-2 rounded border border-surface-light-border dark:border-surface-dark-border hover:border-accent dark:hover:border-accent-dark text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text transition-colors"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedType === 'email' ? (
                  <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone card */}
            <div className="p-5 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-surface-light-text dark:text-surface-dark-text">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-surface-light-subtext dark:text-surface-dark-subtext">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="font-mono text-sm sm:text-base text-surface-light-text dark:text-surface-dark-text hover:text-accent dark:hover:text-accent-dark transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(phone, 'phone')}
                className="p-2 rounded border border-surface-light-border dark:border-surface-dark-border hover:border-accent dark:hover:border-accent-dark text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text transition-colors"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedType === 'phone' ? (
                  <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn card */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex items-center justify-between group hover:border-accent dark:hover:border-accent-dark transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-surface-light-text dark:text-surface-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-surface-light-subtext dark:text-surface-dark-subtext">
                    LinkedIn
                  </span>
                  <span className="font-mono text-sm sm:text-base text-surface-light-text dark:text-surface-dark-text">
                    ademola-adebayo-98b286380
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-surface-light-subtext dark:text-surface-dark-subtext group-hover:text-accent dark:group-hover:text-accent-dark transition-colors" />
            </a>

            {/* GitHub card */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card flex items-center justify-between group hover:border-accent dark:hover:border-accent-dark transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-surface-light-text dark:text-surface-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-surface-light-subtext dark:text-surface-dark-subtext">
                    GitHub
                  </span>
                  <span className="font-mono text-sm sm:text-base text-surface-light-text dark:text-surface-dark-text">
                    DakuTsuki
                  </span>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-surface-light-subtext dark:text-surface-dark-subtext group-hover:text-accent dark:group-hover:text-accent-dark transition-colors" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

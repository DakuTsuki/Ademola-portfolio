import React, { useState, useRef } from 'react';
import { sounds } from '../utils/soundEffects';
import { CopyIcon, CheckIcon, ArrowUpRightIcon } from './Icons';

interface InteractiveDevCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
}

export const InteractiveDevCard: React.FC<InteractiveDevCardProps> = ({
  name,
  role,
  email,
  phone,
  githubUrl,
  linkedinUrl,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // 3D Tilt calculation
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleFlip = () => {
    sounds.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleCopyContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playSuccess();
    navigator.clipboard.writeText(`${name} <${email}> - ${phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer-card" className="py-16 sm:py-24 border-b border-surface-light-border dark:border-surface-dark-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">03</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Interactive 3D Card</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Information Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-surface-light-text dark:text-surface-dark-text font-normal tracking-tight mb-3">
                Interactive Developer Card
              </h2>
              <p className="text-base text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed">
                Hover and tilt to test the real-time 3D perspective and dynamic surface reflection. Click the card to flip it over and inspect direct contact channels and verified deployment credentials.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleFlip}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-surface-light-text text-surface-light-bg dark:bg-surface-dark-text dark:text-surface-dark-bg text-xs font-mono font-medium hover:bg-accent dark:hover:bg-accent-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span>{isFlipped ? 'View Front Side' : 'Flip to Back Side'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded border border-surface-light-border dark:border-surface-dark-border hover:border-accent text-xs font-mono text-surface-light-text dark:text-surface-dark-text transition-colors"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied Details</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>Copy Contact Card</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
              <span>Interactive 3D CSS Perspective</span>
              <span>•</span>
              <span>Available for Hire</span>
            </div>
          </div>

          {/* 3D Interactive Card Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div
              className="w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.4] cursor-pointer"
              style={{ perspective: '1100px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleFlip}
            >
              <div
                ref={cardRef}
                className="relative w-full h-full transition-transform duration-150 ease-out rounded-xl border border-surface-light-border dark:border-surface-dark-border shadow-xl overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
                }}
              >
                
                {/* Dynamic Holographic Glare */}
                <div
                  className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                  style={{
                    opacity: glarePos.opacity,
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
                  }}
                />

                {/* FRONT FACE OF CARD */}
                <div
                  className={`absolute inset-0 p-7 flex flex-col justify-between bg-surface-light-card dark:bg-surface-dark-card backface-hidden ${
                    isFlipped ? 'pointer-events-none' : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-accent dark:text-accent-dark tracking-wider">
                      DEVELOPER // ID
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border text-[10px] text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AVAILABLE
                    </span>
                  </div>

                  {/* Middle: Monogram & Identity */}
                  <div className="my-auto text-center">
                    <div className="relative w-20 h-20 mx-auto rounded-full p-1 border border-surface-light-border dark:border-surface-dark-border mb-4 bg-surface-light-bg dark:bg-surface-dark-bg flex items-center justify-center shadow-sm">
                      <span className="font-serif text-3xl font-medium text-accent dark:text-accent-dark">
                        AA
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-normal text-surface-light-text dark:text-surface-dark-text tracking-tight mb-1">
                      {name}
                    </h3>
                    <p className="font-mono text-xs text-accent dark:text-accent-dark">
                      {role}
                    </p>
                    <p className="font-mono text-[11px] text-surface-light-subtext dark:text-surface-dark-subtext mt-1">
                      Nigeria • Full-Stack Web Systems
                    </p>
                  </div>

                  {/* Bottom: Stack preview & flip indicator */}
                  <div className="pt-4 border-t border-surface-light-border dark:border-surface-dark-border">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">React</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">Node.js</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">PHP</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">MySQL</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">Vercel</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light-bg dark:bg-surface-dark-bg border border-surface-light-border dark:border-surface-dark-border">cPanel</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                      <span>VERIFIED PROFILE</span>
                      <span className="text-accent dark:text-accent-dark font-medium">CLICK TO FLIP &rarr;</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE OF CARD */}
                <div
                  className="absolute inset-0 p-7 flex flex-col justify-between bg-surface-light-muted dark:bg-surface-dark-muted backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-surface-light-subtext dark:text-surface-dark-subtext">
                      CONTACT & VERIFICATION
                    </span>
                    <span className="text-accent dark:text-accent-dark text-[10px]">
                      DIRECT
                    </span>
                  </div>

                  {/* Back details */}
                  <div className="my-auto space-y-3 text-xs font-mono">
                    <div className="p-3.5 rounded bg-surface-light-card dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
                      <div>
                        <span className="block text-[10px] text-surface-light-subtext dark:text-surface-dark-subtext">Email</span>
                        <a href={`mailto:${email}`} className="text-accent dark:text-accent-dark hover:underline">
                          {email}
                        </a>
                      </div>
                      <div>
                        <span className="block text-[10px] text-surface-light-subtext dark:text-surface-dark-subtext">Phone</span>
                        <a href={`tel:${phone}`} className="text-surface-light-text dark:text-surface-dark-text hover:underline">
                          {phone}
                        </a>
                      </div>
                      <div>
                        <span className="block text-[10px] text-surface-light-subtext dark:text-surface-dark-subtext">GitHub</span>
                        <a href={githubUrl} target="_blank" rel="noreferrer" className="text-surface-light-text dark:text-surface-dark-text hover:underline inline-flex items-center gap-1">
                          <span>DakuTsuki</span>
                          <ArrowUpRightIcon className="w-3 h-3" />
                        </a>
                      </div>
                      <div>
                        <span className="block text-[10px] text-surface-light-subtext dark:text-surface-dark-subtext">LinkedIn</span>
                        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-surface-light-text dark:text-surface-dark-text hover:underline inline-flex items-center gap-1">
                          <span>ademola-adebayo-98b286380</span>
                          <ArrowUpRightIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-light-border dark:border-surface-dark-border flex items-center justify-between text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                    <span>LAGOS, NIGERIA</span>
                    <span className="text-accent dark:text-accent-dark">CLICK TO FLIP AGAIN &rarr;</span>
                  </div>
                </div>

              </div>
            </div>

            <p className="mt-4 text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
              Tilt with cursor • Click to flip card
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

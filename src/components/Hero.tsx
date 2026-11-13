import React, { useState } from 'react';
import ademolaPhoto from '../assets/ademola.jpg';
import { ArrowUpRightIcon } from './Icons';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  name: string;
  role: string;
  headline: string;
}

export const Hero: React.FC<HeroProps> = ({ name, headline }) => {
  const [imgError, setImgError] = useState(false);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-surface-light-border dark:border-surface-dark-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Editorial Sub-header Tag */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">00</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Nigeria / Web Developer</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Editorial Text Column (order-1 on both mobile & desktop) */}
          <div className="lg:col-span-7 order-1">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-surface-light-text dark:text-surface-dark-text leading-[1.08] mb-5">
              {name}
            </h1>

            <p className="text-xl sm:text-2xl text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed mb-7 max-w-xl">
              Web developer. <span className="text-surface-light-text dark:text-surface-dark-text font-normal">{headline}</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover text-white text-sm font-medium tracking-wide rounded transition-colors duration-150"
              >
                <span>See my work</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-surface-light-border dark:border-surface-dark-border hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark text-surface-light-text dark:text-surface-dark-text bg-surface-light-card/80 dark:bg-surface-dark-card/80 backdrop-blur-sm text-sm font-medium tracking-wide rounded transition-colors duration-150"
              >
                <span>Get in touch</span>
              </a>
            </div>

            {/* Practical signal note */}
            <div className="mt-8 pt-6 border-t border-surface-light-border dark:border-surface-dark-border grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-xs font-mono">
              <div>
                <span className="text-surface-light-subtext dark:text-surface-dark-subtext block mb-1">Stack</span>
                <span className="text-surface-light-text dark:text-surface-dark-text">React, Node.js, PHP</span>
              </div>
              <div>
                <span className="text-surface-light-subtext dark:text-surface-dark-subtext block mb-1">Hosting</span>
                <span className="text-surface-light-text dark:text-surface-dark-text">Vercel & cPanel</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-surface-light-subtext dark:text-surface-dark-subtext block mb-1">Location</span>
                <span className="text-surface-light-text dark:text-surface-dark-text">Nigeria / Remote</span>
              </div>
            </div>
          </div>

          {/* Portrait Photo Slot (order-2 on both mobile & desktop) */}
          <div className="lg:col-span-5 order-2">
            <div 
              className="relative mx-auto max-w-[280px] sm:max-w-sm lg:max-w-none"
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
            >
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-surface-light-border dark:border-surface-dark-border bg-surface-light-muted dark:bg-surface-dark-muted shadow-sm flex items-center justify-center">
                
                {/* Photo Element */}
                {!imgError ? (
                  <img
                    src={ademolaPhoto}
                    alt="Ademola Adebayo"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none"
                  />
                ) : null}

                {/* Neutral Editorial Placeholder (shows before custom photo is uploaded) */}
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-between p-6 bg-surface-light-muted dark:bg-surface-dark-muted text-center ${
                    !imgError ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="w-full flex justify-between items-center text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext uppercase">
                    <span>Ademola Adebayo</span>
                    <span>Portrait Slot</span>
                  </div>

                  <div className="my-auto py-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border border-surface-light-border dark:border-surface-dark-border flex items-center justify-center mb-3 bg-surface-light-card dark:bg-surface-dark-card">
                      <span className="font-serif text-2xl font-medium tracking-tight text-accent dark:text-accent-dark">AA</span>
                    </div>
                    <p className="font-sans text-xs text-surface-light-subtext dark:text-surface-dark-subtext max-w-[200px] mx-auto">
                      Photo placeholder. Drop your photo at <code className="font-mono text-accent dark:text-accent-dark">/src/assets/ademola.jpg</code>
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-surface-light-border dark:border-surface-dark-border text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                    Web Developer / Nigeria
                  </div>
                </div>

                {isHoveringPhoto && (
                  <div className="absolute bottom-3 left-3 right-3 py-1.5 px-2.5 bg-black/85 text-white text-[11px] font-mono rounded text-center transition-opacity">
                    Slot: /src/assets/ademola.jpg
                  </div>
                )}
              </div>

              {/* Editorial caption line */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                <span>Portrait</span>
                <span>/src/assets/ademola.jpg</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

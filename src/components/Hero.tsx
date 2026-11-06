import React, { useState } from 'react';
import ademolaPhoto from '../assets/ademola.jpg';
import { ThreeHeroScene } from './ThreeHeroScene';
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
  const [displayMode, setDisplayMode] = useState<'3d' | 'photo'>('3d');

  const switchDisplay = (mode: '3d' | 'photo') => {
    sounds.playClick();
    setDisplayMode(mode);
  };

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-surface-light-border dark:border-surface-dark-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Editorial Sub-header Tag */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">00</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Nigeria / Web Developer</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-surface-light-text dark:text-surface-dark-text leading-[1.08] mb-6">
              {name}
            </h1>

            <p className="text-xl sm:text-2xl text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed mb-8 max-w-xl">
              Web developer. <span className="text-surface-light-text dark:text-surface-dark-text font-normal">{headline}</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover text-white text-sm font-medium tracking-wide rounded transition-colors duration-150"
              >
                <span>See my work</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>

              <a
                href="#developer-card"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-surface-light-border dark:border-surface-dark-border hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark text-surface-light-text dark:text-surface-dark-text bg-surface-light-card dark:bg-surface-dark-card text-sm font-medium tracking-wide rounded transition-colors duration-150"
              >
                <span>Interactive 3D Card</span>
              </a>
            </div>

            {/* Practical signal note */}
            <div className="mt-10 pt-8 border-t border-surface-light-border dark:border-surface-dark-border grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono">
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

          {/* Interactive Visual Column: Three.js 3D Canvas / Photo Slot */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Tab Selector: 3D Animation vs Photo */}
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex p-1 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => switchDisplay('3d')}
                    className={`px-3 py-1 rounded transition-colors ${
                      displayMode === '3d'
                        ? 'bg-accent text-white font-medium'
                        : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
                    }`}
                  >
                    3D Sculpture
                  </button>
                  <button
                    type="button"
                    onClick={() => switchDisplay('photo')}
                    className={`px-3 py-1 rounded transition-colors ${
                      displayMode === 'photo'
                        ? 'bg-accent text-white font-medium'
                        : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
                    }`}
                  >
                    Portrait Photo
                  </button>
                </div>

                <span className="text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                  {displayMode === '3d' ? 'Three.js WebGL' : 'Slot: ademola.jpg'}
                </span>
              </div>

              {/* Viewport Box */}
              <div
                className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-surface-light-border dark:border-surface-dark-border bg-surface-light-muted dark:bg-surface-dark-muted shadow-sm flex items-center justify-center"
                onMouseEnter={() => setIsHoveringPhoto(true)}
                onMouseLeave={() => setIsHoveringPhoto(false)}
              >
                {displayMode === '3d' ? (
                  <ThreeHeroScene />
                ) : (
                  <>
                    {!imgError ? (
                      <img
                        src={ademolaPhoto}
                        alt="Ademola Adebayo"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                      />
                    ) : null}

                    {/* Neutral Editorial Placeholder */}
                    <div 
                      className={`absolute inset-0 flex flex-col items-center justify-between p-6 bg-surface-light-muted dark:bg-surface-dark-muted text-center ${
                        !imgError ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                    >
                      <div className="w-full flex justify-between items-center text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext uppercase">
                        <span>Ademola Adebayo</span>
                        <span>Portrait Slot</span>
                      </div>

                      <div className="my-auto py-8">
                        <div className="w-20 h-20 mx-auto rounded-full border border-surface-light-border dark:border-surface-dark-border flex items-center justify-center mb-4 bg-surface-light-card dark:bg-surface-dark-card">
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
                  </>
                )}
              </div>

              {/* Editorial caption line */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                <span>{displayMode === '3d' ? 'Interactive 3D Geometry' : 'Portrait'}</span>
                <span>{displayMode === '3d' ? 'Drag or click buttons to adjust' : '/src/assets/ademola.jpg'}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

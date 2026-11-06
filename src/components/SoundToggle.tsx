import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState<boolean>(sounds.getMuted());

  const handleToggle = () => {
    const nextMuted = sounds.toggleMute();
    setMuted(nextMuted);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={muted ? "Unmute UI sound effects" : "Mute UI sound effects"}
      title={muted ? "Sound Effects: Muted" : "Sound Effects: Active (Click to mute)"}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card text-surface-light-subtext dark:text-surface-dark-subtext hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-colors"
    >
      {muted ? (
        <>
          <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          <span className="hidden xl:inline text-[10px]">SFX: Off</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 text-accent dark:text-accent-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span className="hidden xl:inline text-[10px] text-accent dark:text-accent-dark">SFX: On</span>
        </>
      )}
    </button>
  );
};

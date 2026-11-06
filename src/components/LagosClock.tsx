import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

export const LagosClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isWorkingHours, setIsWorkingHours] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        // Format to Africa/Lagos timezone (UTC+1)
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setTimeStr(formatter.format(now));

        // Calculate if within active coding/contact hours (8 AM - 8 PM WAT)
        const lagosHours = parseInt(
          new Intl.DateTimeFormat('en-US', {
            timeZone: 'Africa/Lagos',
            hour: 'numeric',
            hour12: false,
          }).format(now),
          10
        );
        setIsWorkingHours(lagosHours >= 8 && lagosHours <= 20);
      } catch {
        // Fallback
        setTimeStr('WAT (Lagos)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={() => sounds.playClick()}
      className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card/80 dark:bg-surface-dark-card/80 text-surface-light-subtext dark:text-surface-dark-subtext cursor-default select-none transition-colors hover:border-accent/40"
      title="Live West Africa Time (WAT) in Lagos, Nigeria"
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isWorkingHours
            ? 'bg-emerald-500 animate-pulse'
            : 'bg-amber-500'
        }`}
      />
      <span>Lagos, NG:</span>
      <span className="text-surface-light-text dark:text-surface-dark-text font-medium min-w-[76px]">
        {timeStr || 'Loading...'}
      </span>
    </div>
  );
};

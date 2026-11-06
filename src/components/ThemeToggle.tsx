import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      const meta = document.getElementById('theme-color-meta');
      if (meta) meta.setAttribute('content', '#111112');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      const meta = document.getElementById('theme-color-meta');
      if (meta) meta.setAttribute('content', '#FAF9F6');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-mono border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card text-surface-light-text dark:text-surface-dark-text hover:border-accent hover:text-accent dark:hover:border-accent-dark dark:hover:text-accent-dark transition-colors duration-150"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <SunIcon className="w-3.5 h-3.5 text-accent-dark" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-3.5 h-3.5 text-accent" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
};

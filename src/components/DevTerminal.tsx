import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

interface DevTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const DevTerminal: React.FC<DevTerminalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-accent dark:text-accent-dark font-bold">
            Ademola Adebayo Developer Console [v2.4.0]
          </p>
          <p className="text-surface-light-subtext dark:text-surface-dark-subtext">
            Type <span className="text-accent dark:text-accent-dark font-mono">help</span> to view available commands, or <span className="text-accent dark:text-accent-dark font-mono">projects</span> to inspect recent work.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    sounds.playKey();
    const cmd = rawCmd.toLowerCase();
    const newHistory = [...commandHistory, rawCmd];
    setCommandHistory(newHistory);
    setHistoryIndex(newHistory.length);
    setInputVal('');

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="font-semibold text-accent dark:text-accent-dark">Available Commands:</p>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <div><span className="text-emerald-500 font-bold">skills</span>: Technical capabilities</div>
              <div><span className="text-emerald-500 font-bold">projects</span>: View recent work</div>
              <div><span className="text-emerald-500 font-bold">about</span>: Background and experience</div>
              <div><span className="text-emerald-500 font-bold">contact</span>: Direct email and phone</div>
              <div><span className="text-emerald-500 font-bold">badge</span>: Jump to 3D Pass section</div>
              <div><span className="text-emerald-500 font-bold">theme</span>: Toggle light / dark mode</div>
              <div><span className="text-emerald-500 font-bold">sudo hire</span>: Priority recruiter intake</div>
              <div><span className="text-emerald-500 font-bold">clear</span>: Clear console screen</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-accent dark:text-accent-dark font-semibold">Core Stack:</p>
            <p>• Front end: React, TypeScript, Tailwind CSS, Responsive design</p>
            <p>• Back end: Node.js, Express, REST APIs, PHP, MySQL, Auth/JWT</p>
            <p>• Hosting: Vercel, cPanel, Domains, SSL, phpMyAdmin, Migrations</p>
            <p>• Leadership: Team building, Project management, Code reviews</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-accent dark:text-accent-dark font-semibold">Production Websites:</p>
            <p>1. <a href="https://www.helpscounsellors.com/" target="_blank" rel="noreferrer" className="underline text-accent">HELPS Counsellors</a> - UK Charity (Vercel + cPanel PHP API + MySQL)</p>
            <p>2. <a href="https://www.moremitechstars.org/" target="_blank" rel="noreferrer" className="underline text-accent">Moremi Techstars</a> - Women in Tech Foundation</p>
            <p>3. <a href="https://www.lifeandrelationshipmatters.com/" target="_blank" rel="noreferrer" className="underline text-accent">Life & Relationship Matters</a> - Coaching & Publication Platform</p>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <p className="text-xs font-mono text-surface-light-text dark:text-surface-dark-text">
            I am Ademola Adebayo, a web developer from Nigeria. I build full websites: frontend, Node.js and PHP APIs, MySQL databases, and hosting on Vercel and cPanel. I also handle team coordination and project timelines.
          </p>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p>Email: <a href="mailto:demomega9@gmail.com" className="text-accent underline">demomega9@gmail.com</a></p>
            <p>Phone: <a href="tel:07035697280" className="text-accent underline">07035697280</a></p>
            <p>GitHub: <a href="https://github.com/DakuTsuki" target="_blank" rel="noreferrer" className="text-accent underline">DakuTsuki</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/ademola-adebayo-98b286380" target="_blank" rel="noreferrer" className="text-accent underline">ademola-adebayo-98b286380</a></p>
          </div>
        );
        break;

      case 'card':
      case 'badge':
        outputNode = <p className="text-xs font-mono text-accent">Navigating to Interactive 3D Card...</p>;
        window.location.hash = '#developer-card';
        break;

      case 'theme':
        sounds.playClick();
        onToggleTheme();
        outputNode = <p className="text-xs font-mono text-accent">Theme toggled successfully.</p>;
        break;

      case 'sudo hire':
        sounds.playSuccess();
        outputNode = (
          <div className="p-2.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono space-y-1">
            <p className="font-bold">STATUS: RECRUITER ACCESS GRANTED</p>
            <p>Priority contract & full-time inquiries: <a href="mailto:demomega9@gmail.com?subject=Priority%20Hiring%20Inquiry" className="underline font-bold">demomega9@gmail.com</a></p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        return;

      default:
        outputNode = (
          <p className="text-xs font-mono text-rose-500">
            command not found: {rawCmd}. Type <span className="underline">help</span> for commands.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: rawCmd, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex > 0 ? historyIndex - 1 : 0;
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg shadow-2xl rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card/95 dark:bg-surface-dark-card/95 backdrop-blur-md overflow-hidden font-mono text-xs">
      {/* Title Bar */}
      <div className="px-4 py-2.5 bg-surface-light-muted dark:bg-surface-dark-muted border-b border-surface-light-border dark:border-surface-dark-border flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
              aria-label="Close terminal"
            />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext pl-2">
            ademola@portfolio:~ (zsh)
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-surface-light-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text"
        >
          ✕
        </button>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={scrollRef}
        className="p-4 max-h-72 overflow-y-auto space-y-3 font-mono text-surface-light-text dark:text-surface-dark-text"
      >
        {logs.map((log, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-surface-light-subtext dark:text-surface-dark-subtext">
              <span className="text-accent dark:text-accent-dark">ademola@ng:~$</span>
              <span className="text-surface-light-text dark:text-surface-dark-text font-medium">{log.command}</span>
            </div>
            <div className="pl-4">{log.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Input Prompt */}
      <form onSubmit={handleCommand} className="p-3 border-t border-surface-light-border dark:border-surface-dark-border flex items-center gap-2 bg-surface-light-bg dark:bg-surface-dark-bg">
        <span className="text-accent dark:text-accent-dark font-bold">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'projects', or 'sudo hire'..."
          className="flex-1 bg-transparent text-surface-light-text dark:text-surface-dark-text outline-none text-xs font-mono placeholder:text-surface-light-subtext/50"
        />
        <button
          type="submit"
          className="px-2 py-1 rounded bg-accent text-white text-[10px] font-mono hover:bg-accent-hover"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

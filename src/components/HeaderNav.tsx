import React, { useState, useEffect } from 'react';
import { Sun, Moon, MapPin, Sliders, BookOpen } from 'lucide-react';

interface HeaderNavProps {
  activeChapter: string;
  onSelectChapter: (id: string) => void;
  scrollProgress: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  mode: 'story' | 'lab';
  onToggleMode: (mode: 'story' | 'lab') => void;
}

const CHAPTERS = [
  { id: 'problem', label: 'Problem' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'data', label: 'Data' },
  { id: 'map', label: 'Heat Map' },
  { id: 'model', label: 'Model' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'ranking', label: 'Ward Risk' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'budget', label: 'Budget' },
  { id: 'officer', label: 'AI Officer' },
  { id: 'citizens', label: 'Citizens' },
  { id: 'aws', label: 'AWS' },
  { id: 'accountability', label: 'Accountability' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'next', label: 'Next' },
  { id: 'references', label: 'References' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeChapter,
  onSelectChapter,
  scrollProgress,
  theme,
  onToggleTheme,
  mode,
  onToggleMode,
}) => {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200 border-b border-[var(--rule)] bg-[var(--bg)]/95 backdrop-blur-md">
      <div className="max-w-[84rem] mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-decoration-none"
          >
            <div className="w-6 h-6 rounded flex items-center justify-center bg-[var(--accent)] text-white font-bold text-xs">
              UH
            </div>
            <span className="font-display font-bold text-base md:text-lg tracking-tight text-[var(--ink)]">
              Urban Heat
            </span>
          </a>

          {/* Mode Switcher */}
          <div className="hidden sm:flex items-center p-0.5 rounded-md bg-[var(--soft)] border border-[var(--rule)] text-xs">
            <button
              onClick={() => onToggleMode('story')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                mode === 'story'
                  ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
              title="Read the scroll-driven investigation article"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Story</span>
            </button>
            <button
              onClick={() => onToggleMode('lab')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                mode === 'lab'
                  ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
              title="Jump into interactive scenario simulation & budget tools"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Decision Lab</span>
            </button>
          </div>
        </div>

        {/* Navigation Zone (Chapters) */}
        <nav
          aria-label="Story Chapters"
          className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 min-w-0 flex-1 justify-start md:justify-center"
        >
          {CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`font-mono text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[var(--soft)] text-[var(--ink)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--soft)]/50'
                }`}
              >
                {ch.label}
              </button>
            );
          })}
        </nav>

        {/* Action & Settings Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--soft)] transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Indicator */}
      <div
        className="h-[3px] w-full bg-[var(--rule)] overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full transition-transform duration-75 origin-left"
          style={{
            transform: `scaleX(${scrollProgress})`,
            background: 'linear-gradient(90deg, var(--t1), var(--t2), var(--t3), var(--t4), var(--t5), var(--t6))',
          }}
        />
      </div>
    </header>
  );
};

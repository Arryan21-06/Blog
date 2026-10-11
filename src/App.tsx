import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { EditorialStory } from './components/EditorialStory';
import { InteractiveDecisionLab } from './components/InteractiveDecisionLab';
import { CityId } from './types/urbanHeat';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mode, setMode] = useState<'story' | 'lab'>('story');
  const [selectedCityId, setSelectedCityId] = useState<CityId>('new_delhi');
  const [activeChapter, setActiveChapter] = useState<string>('problem');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scroll spy & progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }

      // Check which section is in view
      const chapterIds = [
        'problem',
        'workflow',
        'data',
        'map',
        'model',
        'drivers',
        'ranking',
        'scenarios',
        'budget',
        'officer',
        'citizens',
        'aws',
        'accountability',
        'lessons',
        'next',
        'references',
      ];

      const scrollPos = window.scrollY + 140;
      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapterIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectChapter = (id: string) => {
    if (mode === 'lab') {
      setMode('story');
    }
    // Allow state to switch before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      {/* Sticky Header Nav with Chapter Links & Progress */}
      <HeaderNav
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        scrollProgress={scrollProgress}
        theme={theme}
        onToggleTheme={toggleTheme}
        mode={mode}
        onToggleMode={setMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {mode === 'story' ? (
          <EditorialStory
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
            onOpenLab={() => setMode('lab')}
          />
        ) : (
          <InteractiveDecisionLab
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
            onCloseLab={() => setMode('story')}
          />
        )}
      </main>
    </div>
  );
}

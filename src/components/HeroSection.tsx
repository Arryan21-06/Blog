import React from 'react';
import { HEAT_TIERS } from '../data/urbanHeatData';
import { ExternalLink, Database, Cpu, Compass, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreMap: () => void;
  onExploreScenarios: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMap,
  onExploreScenarios,
}) => {
  return (
    <section id="hero" className="max-w-[72rem] mx-auto pt-8 pb-12 px-4">
      {/* Kicker */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
          Environmental Hacks · Heat &amp; Water Track · AWS Builder Center
        </span>
      </div>

      {/* Primary Headline */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-[var(--ink)] max-w-4xl mb-4">
        From Satellite Heat Maps to Accountable Cooling Decisions
      </h1>

      {/* Dek */}
      <p className="font-reading text-lg sm:text-xl md:text-2xl text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
        We built a geospatial decision-support system that finds where heat and people overlap, compares cooling options under a fixed budget, and keeps every number traceable. This is how it works, what the evaluation showed, and what we still have to prove.
      </p>

      {/* Metadata Strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[var(--muted)] pt-3 pb-5 border-t border-[var(--rule)]">
        <span>Project: <strong className="text-[var(--ink)] font-medium">Urban Heat</strong></span>
        <span>Stack: <strong className="text-[var(--ink)] font-medium">Landsat · XGBoost · AWS</strong></span>
        <span>
          Repository:{' '}
          <a
            href="https://github.com/Zephyrex21/urban-heat-mitigation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            Zephyrex21/urban-heat-mitigation
            <ExternalLink className="w-3 h-3" />
          </a>
        </span>
        <span>Project docs: <strong className="text-[var(--ink)] font-medium">10 Oct 2026</strong></span>
        <span>Reading time: <strong className="text-[var(--ink)] font-medium">27 min</strong></span>
      </div>

      {/* Heat Tier Ramp Bar */}
      <div className="mb-8">
        <div className="flex h-2.5 rounded-sm overflow-hidden gap-0.5">
          {HEAT_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="flex-1 transition-transform hover:scale-y-125 origin-bottom cursor-help relative group"
              style={{ backgroundColor: tier.color }}
              title={`${tier.label}: ${tier.tempRange}`}
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[10px] text-[var(--muted)] mt-1.5 px-0.5">
          <span>&lt; 36°C (Cool/Water)</span>
          <span>36–39°C</span>
          <span>39–42°C</span>
          <span>42–45°C</span>
          <span>45–48°C (High Hotspot)</span>
          <span>&gt; 48°C (Critical Hotspot)</span>
        </div>
      </div>

      {/* Four Big Empirical Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border-t-2 border-[var(--ink)] pt-2.5">
          <strong className="block font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
            4
          </strong>
          <span className="font-mono text-xs text-[var(--muted)]">
            cities with real satellite data (Delhi, Mumbai, Jaipur, Bengaluru)
          </span>
        </div>

        <div className="border-t-2 border-[var(--ink)] pt-2.5">
          <strong className="block font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
            500 m
          </strong>
          <span className="font-mono text-xs text-[var(--muted)]">
            UTM grid resolution for every input raster &amp; feature
          </span>
        </div>

        <div className="border-t-2 border-[var(--ink)] pt-2.5">
          <strong className="block font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
            19,681
          </strong>
          <span className="font-mono text-xs text-[var(--muted)]">
            usable empirical cells across 4 cities for XGBoost model training
          </span>
        </div>

        <div className="border-t-2 border-[var(--ink)] pt-2.5">
          <strong className="block font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
            16
          </strong>
          <span className="font-mono text-xs text-[var(--muted)]">
            synthetic preview cities, visibly labelled as previews in all views
          </span>
        </div>
      </div>

      {/* Hero Interactive Anchor Box */}
      <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-none bg-[var(--ink)]" title="Observed Data" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-semibold">
                Observed Satellite Composite · April–June 2024–2026
              </span>
            </div>
            <h2 className="font-display font-semibold text-lg text-[var(--ink)] mt-0.5">
              New Delhi Landsat 8/9 Thermal Ground Truth (500 m Grid)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExploreMap}
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded border border-[var(--rule)] bg-[var(--soft)] text-[var(--ink)] hover:bg-[var(--surface)] transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Explore Map</span>
            </button>
            <button
              onClick={onExploreScenarios}
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Simulate Cooling</span>
            </button>
          </div>
        </div>

        {/* Headline KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded bg-[var(--soft)] font-mono text-xs mb-3">
          <div>
            <span className="text-[var(--muted)] block">Mean Surface Temp</span>
            <strong className="text-base font-bold text-[var(--ink)]">43.8 °C</strong>
          </div>
          <div>
            <span className="text-[var(--muted)] block">Max Observed Temp</span>
            <strong className="text-base font-bold text-[var(--crit)]">56.4 °C</strong>
          </div>
          <div>
            <span className="text-[var(--muted)] block">Hotspot Area (T5+T6)</span>
            <strong className="text-base font-bold text-[var(--ink)]">374.8 km²</strong>
          </div>
          <div>
            <span className="text-[var(--muted)] block">UHI Intensity</span>
            <strong className="text-base font-bold text-[var(--accent)]">+8.0 °C</strong>
          </div>
        </div>

        <p className="font-mono text-xs text-[var(--muted)] leading-relaxed m-0">
          <strong>Methodological note:</strong> Values represent Landsat 8/9 Collection 2 Level-2 TIR Band 10 surface temperature medians. <em>Land-surface temperature (LST) is not ambient air temperature and not personal heat stress.</em>
        </p>
      </div>
    </section>
  );
};

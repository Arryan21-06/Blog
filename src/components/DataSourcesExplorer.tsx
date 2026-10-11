import React, { useState } from 'react';
import { DATA_SOURCES } from '../data/urbanHeatData';
import { Database, ChevronDown, ChevronUp, AlertCircle, FileText, Check } from 'lucide-react';

export const DataSourcesExplorer: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Data Provenance &amp; Ingestion Layer
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Open satellite imagery, terrain models, population grids &amp; street features
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Seven Heterogeneous Datasets Harmonized to a Common 500 m Grid
        </h3>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3 font-mono text-xs">
        {DATA_SOURCES.map((ds, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={ds.name}
              className={`rounded border transition-colors ${
                isExpanded
                  ? 'border-[var(--accent)] bg-[var(--soft)]/30'
                  : 'border-[var(--rule)] bg-[var(--surface)] hover:bg-[var(--soft)]/20'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-3.5 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold text-[var(--ink)]">
                      {ds.name}
                    </strong>
                    <span className="text-[11px] text-[var(--muted)]">
                      {ds.source} · {ds.resolution}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--muted)] border border-[var(--rule)]">
                    {ds.license.split(' ')[0]}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[var(--muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
                  )}
                </div>
              </button>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="px-3.5 pb-4 pt-1 border-t border-[var(--rule)] text-xs space-y-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className="text-[11px] text-[var(--muted)] block">Temporal Window / Extraction:</span>
                      <span className="text-[var(--ink)] font-semibold">{ds.temporalWindow}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[var(--muted)] block">License:</span>
                      <span className="text-[var(--ink)]">{ds.license}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[var(--muted)] block mb-1">Derived Pipeline Features:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ds.derivedFeatures.map((feat) => (
                        <code
                          key={feat}
                          className="px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--rule)] text-[11px]"
                        >
                          {feat}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed">
                    <strong>Caveat &amp; Known Limit:</strong> {ds.caveats}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

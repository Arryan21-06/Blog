import React, { useState } from 'react';
import { GeospatialMap } from './GeospatialMap';
import { ScenarioSimulator } from './ScenarioSimulator';
import { BudgetOptimizer } from './BudgetOptimizer';
import { WardRiskExplorer } from './WardRiskExplorer';
import { HeatOfficerExplainer } from './HeatOfficerExplainer';
import { CityId } from '../types/urbanHeat';
import { Sliders, MapPin, Layers, Scale, FileText, CheckCircle2 } from 'lucide-react';

interface InteractiveDecisionLabProps {
  selectedCityId: CityId;
  onSelectCity: (id: CityId) => void;
  onCloseLab: () => void;
}

export const InteractiveDecisionLab: React.FC<InteractiveDecisionLabProps> = ({
  selectedCityId,
  onSelectCity,
  onCloseLab,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'optimizer' | 'risk' | 'brief' | 'map'>('simulator');

  return (
    <div className="max-w-[80rem] mx-auto px-4 py-6">
      {/* Cockpit Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-[var(--surface)] border border-[var(--rule)] mb-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-bold uppercase text-[var(--accent)]">
              MUNICIPAL DECISION SUPPORT LAB
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              Interactive Tools &amp; Scenario Simulator
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl text-[var(--ink)]">
            Urban Heat Decision Console
          </h2>
        </div>

        <button
          onClick={onCloseLab}
          className="px-3.5 py-1.5 rounded font-mono text-xs font-semibold bg-[var(--soft)] text-[var(--ink)] hover:bg-[var(--surface)] border border-[var(--rule)] transition-colors self-start sm:self-auto"
        >
          Back to Editorial Story ✕
        </button>
      </div>

      {/* Tool Tabs Navigation */}
      <div className="flex items-center gap-2 mb-6 border-b border-[var(--rule)] pb-2 overflow-x-auto scrollbar-none font-mono text-xs">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition-colors whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-[var(--surface)] text-[var(--accent)] font-bold border-t-2 border-[var(--accent)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Before/After Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('optimizer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition-colors whitespace-nowrap ${
            activeTab === 'optimizer'
              ? 'bg-[var(--surface)] text-[var(--accent)] font-bold border-t-2 border-[var(--accent)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Budget &amp; Equity Optimizer</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition-colors whitespace-nowrap ${
            activeTab === 'risk'
              ? 'bg-[var(--surface)] text-[var(--accent)] font-bold border-t-2 border-[var(--accent)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ward Risk Ranking</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition-colors whitespace-nowrap ${
            activeTab === 'map'
              ? 'bg-[var(--surface)] text-[var(--accent)] font-bold border-t-2 border-[var(--accent)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Geospatial Heat Map</span>
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition-colors whitespace-nowrap ${
            activeTab === 'brief'
              ? 'bg-[var(--surface)] text-[var(--accent)] font-bold border-t-2 border-[var(--accent)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>AI Officer Brief</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'simulator' && <ScenarioSimulator />}
        {activeTab === 'optimizer' && <BudgetOptimizer />}
        {activeTab === 'risk' && <WardRiskExplorer />}
        {activeTab === 'map' && (
          <GeospatialMap
            selectedCityId={selectedCityId}
            onSelectCity={onSelectCity}
          />
        )}
        {activeTab === 'brief' && <HeatOfficerExplainer />}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  INTERVENTIONS,
  SCENARIO_PRESETS,
  HEAT_TIERS,
  generateDelhiGridSample,
  simulateScenario,
} from '../data/urbanHeatData';
import { HeatTier } from '../types/urbanHeat';
import { RotateCcw, Sparkles, Sliders, ShieldCheck, Clock, Users, IndianRupee, Layers } from 'lucide-react';

export const ScenarioSimulator: React.FC = () => {
  const baseCells = useMemo(() => generateDelhiGridSample(), []);

  // Simulator intervention intensities (0.0 to 1.0)
  const [intensities, setIntensities] = useState({
    treeCover: 0.35,
    coolRoofs: 0.50,
    shadeStructures: 0.40,
    coolPavements: 0.25,
    coolingCentres: 0.40,
  });

  const [targetTiers, setTargetTiers] = useState<HeatTier[]>(['high', 'critical']);
  const [activePresetId, setActivePresetId] = useState<string>('balanced');
  const [splitPosition, setSplitPosition] = useState<number>(50); // percentage 0-100 for split curtain

  // Run simulation
  const { cooledCells, summary } = useMemo(() => {
    return simulateScenario(baseCells, intensities, targetTiers);
  }, [baseCells, intensities, targetTiers]);

  const applyPreset = (presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setIntensities(preset.intensities);
    setTargetTiers(preset.targetTiers);
    setActivePresetId(preset.id);
  };

  const resetToBaseline = () => {
    setIntensities({
      treeCover: 0.0,
      coolRoofs: 0.0,
      shadeStructures: 0.0,
      coolPavements: 0.0,
      coolingCentres: 0.0,
    });
    setActivePresetId('baseline');
  };

  const isBaseline =
    intensities.treeCover === 0 &&
    intensities.coolRoofs === 0 &&
    intensities.shadeStructures === 0 &&
    intensities.coolPavements === 0 &&
    intensities.coolingCentres === 0;

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--rule)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--accent-soft)] text-[var(--accent)]">
              Interactive Scenario Simulator
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              Real-time intervention modeling on New Delhi 500 m grid
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-[var(--ink)]">
            Baseline vs. Intervention Thermal Projection
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToBaseline}
            className={`px-3 py-1.5 text-xs font-mono rounded border border-[var(--rule)] transition-colors flex items-center gap-1.5 ${
              isBaseline
                ? 'bg-[var(--ink)] text-[var(--bg)] font-semibold'
                : 'bg-[var(--soft)] text-[var(--ink)] hover:bg-[var(--surface)]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Baseline</span>
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 my-3">
        <span className="font-mono text-xs text-[var(--muted)] flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Presets:
        </span>
        {SCENARIO_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => applyPreset(p.id)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activePresetId === p.id
                ? 'bg-[var(--accent)] text-white font-semibold'
                : 'bg-[var(--soft)] text-[var(--ink2)] hover:text-[var(--ink)]'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Grid Simulator Area: Split Screen Map & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
        {/* Synchronized Before/After Map Display (7 cols) */}
        <div className="lg:col-span-7 rounded border border-[var(--rule)] bg-[var(--soft)]/40 p-4">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="font-semibold text-[var(--ink)]">
              ◀ Left: Observed Landsat Baseline
            </span>
            <span className="font-semibold text-[var(--accent)]">
              Right: Modelled Scenario Projection ▶
            </span>
          </div>

          {/* Draggable Curtain Split Slider Bar */}
          <div className="mb-3 px-1">
            <div className="flex items-center justify-between font-mono text-[11px] text-[var(--muted)] mb-1">
              <span>Split Curtain: {splitPosition}% Baseline / {100 - splitPosition}% Cooled</span>
              <span>Slide divider to compare</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={splitPosition}
              onChange={(e) => setSplitPosition(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-ew-resize"
              aria-label="Before/after split slider"
            />
          </div>

          {/* SVG Map Container */}
          <div className="relative aspect-square max-w-[440px] mx-auto bg-[var(--bg)] rounded border border-[var(--rule)] p-2 shadow-inner">
            <svg
              viewBox="0 0 280 280"
              className="w-full h-full"
              role="img"
              aria-label="Synchronized before/after heat map simulation"
            >
              {/* Left Baseline Cells */}
              {baseCells.map((cell) => {
                const x = cell.c * 20;
                const y = (13 - cell.r) * 20;
                const tierInfo = HEAT_TIERS.find((t) => t.tier === cell.tier);

                // Check if cell is to the left of split
                const cellXPercent = (cell.c / 14) * 100;
                const isBaselineSide = cellXPercent < splitPosition;

                // Find cooled version
                const cooledCell = cooledCells.find((c) => c.id === cell.id);
                const displayLst = isBaselineSide ? cell.lstObserved : (cooledCell?.lstSimulated || cell.lstObserved);
                
                // Get cooled tier
                let displayColor = tierInfo ? tierInfo.color : '#3b6fe0';
                if (!isBaselineSide && cooledCell) {
                  let cooledTier: HeatTier = 'cool';
                  if (displayLst < 36) cooledTier = 'cool';
                  else if (displayLst < 39) cooledTier = 'normal';
                  else if (displayLst < 42) cooledTier = 'moderate';
                  else if (displayLst < 45) cooledTier = 'elevated';
                  else if (displayLst < 48) cooledTier = 'high';
                  else cooledTier = 'critical';

                  displayColor = HEAT_TIERS.find((t) => t.tier === cooledTier)?.color || '#3b6fe0';
                }

                return (
                  <rect
                    key={cell.id}
                    x={x + 1}
                    y={y + 1}
                    width={18}
                    height={18}
                    rx={2}
                    fill={displayColor}
                    stroke={!isBaselineSide && (cooledCell?.coolingEstimated || 0) >= 0.2 ? 'rgba(255,255,255,0.7)' : 'none'}
                    strokeWidth={1}
                  >
                    <title>
                      {`${cell.id} | Baseline: ${cell.lstObserved}°C | Projected: ${displayLst}°C (Δ ${-(cell.lstObserved - displayLst).toFixed(1)}°C)`}
                    </title>
                  </rect>
                );
              })}

              {/* Split Divider Line */}
              <line
                x1={(splitPosition / 100) * 280}
                y1={0}
                x2={(splitPosition / 100) * 280}
                y2={280}
                stroke="var(--ink)"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
            </svg>
          </div>

          <p className="font-mono text-[11px] text-[var(--muted)] text-center mt-2 m-0">
            Hover over cells to see exact baseline vs. projected temperature delta. White border highlights cells with cooling ≥ 0.2°C.
          </p>
        </div>

        {/* Sliders & Parameters Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-xs">
            <h4 className="font-display font-semibold text-sm text-[var(--ink)] mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[var(--accent)]" />
              <span>Intervention Intensity Controls</span>
            </h4>

            {/* Individual Sliders */}
            <div className="space-y-3 font-mono text-xs">
              {/* Cool Roofs */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Cool Roofs (Immediate, 60L/cell)</span>
                  <strong className="text-[var(--ink)]">{Math.round(intensities.coolRoofs * 100)}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={intensities.coolRoofs}
                  onChange={(e) => {
                    setIntensities({ ...intensities, coolRoofs: Number(e.target.value) });
                    setActivePresetId('custom');
                  }}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Tree Cover */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Tree Cover (8 yrs, 120L/cell, 70% survival)</span>
                  <strong className="text-[var(--ink)]">{Math.round(intensities.treeCover * 100)}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={intensities.treeCover}
                  onChange={(e) => {
                    setIntensities({ ...intensities, treeCover: Number(e.target.value) });
                    setActivePresetId('custom');
                  }}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Shade Structures */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Transit Shade (Immediate, 45L/cell)</span>
                  <strong className="text-[var(--ink)]">{Math.round(intensities.shadeStructures * 100)}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={intensities.shadeStructures}
                  onChange={(e) => {
                    setIntensities({ ...intensities, shadeStructures: Number(e.target.value) });
                    setActivePresetId('custom');
                  }}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Cool Pavements */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Cool Pavements (1 yr, 80L/cell)</span>
                  <strong className="text-[var(--ink)]">{Math.round(intensities.coolPavements * 100)}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={intensities.coolPavements}
                  onChange={(e) => {
                    setIntensities({ ...intensities, coolPavements: Number(e.target.value) });
                    setActivePresetId('custom');
                  }}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* Cooling Centres */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Cooling Centres (Refuge, 25L/cell)</span>
                  <strong className="text-[var(--ink)]">{Math.round(intensities.coolingCentres * 100)}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={intensities.coolingCentres}
                  onChange={(e) => {
                    setIntensities({ ...intensities, coolingCentres: Number(e.target.value) });
                    setActivePresetId('custom');
                  }}
                  className="w-full accent-[var(--accent)]"
                />
              </div>
            </div>

            {/* Target Tiers Multi-Select */}
            <div className="mt-4 pt-3 border-t border-[var(--rule)] font-mono text-xs">
              <span className="text-[var(--muted)] block mb-1.5">Target Hotspot Tiers:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['moderate', 'elevated', 'high', 'critical'] as HeatTier[]).map((tier) => {
                  const isSelected = targetTiers.includes(tier);
                  return (
                    <button
                      key={tier}
                      onClick={() => {
                        if (isSelected) {
                          if (targetTiers.length > 1) {
                            setTargetTiers(targetTiers.filter((t) => t !== tier));
                          }
                        } else {
                          setTargetTiers([...targetTiers, tier]);
                        }
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        isSelected
                          ? 'bg-[var(--ink)] text-white font-semibold'
                          : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {tier.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculated KPI Impact Output Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-[var(--rule)] font-mono text-xs">
        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">Estimated Cooling</span>
          <strong className="text-sm font-bold text-[var(--accent)] block">
            {summary.coolingMid > 0 ? `-${summary.coolingMid} °C` : '0.0 °C'}
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            Range: -{summary.coolingLow} to -{summary.coolingHigh}°C
          </small>
        </div>

        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">Total Investment</span>
          <strong className="text-sm font-bold text-[var(--ink)] block">
            ₹{summary.totalCostCrore} Cr
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            ₹{summary.totalCostLakh.toLocaleString()} Lakh
          </small>
        </div>

        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">People Protected</span>
          <strong className="text-sm font-bold text-[var(--ink)] block">
            {summary.peopleProtected.toLocaleString()}
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            at ≥ 0.2°C mid cooling
          </small>
        </div>

        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">Protected Cells</span>
          <strong className="text-sm font-bold text-[var(--ink)] block">
            {summary.protectedCellsCount} / {baseCells.length}
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            {Math.round((summary.protectedCellsCount / baseCells.length) * 100)}% of urban sample
          </small>
        </div>

        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">Cost / Person</span>
          <strong className="text-sm font-bold text-[var(--ink)] block">
            ₹{summary.costPerPersonInr}
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            per protected resident
          </small>
        </div>

        <div className="p-3 rounded bg-[var(--soft)]">
          <span className="text-[var(--muted)] block">Time to Full Effect</span>
          <strong className="text-sm font-bold text-[var(--ink)] block">
            {summary.avgYearsToFullEffect} Years
          </strong>
          <small className="text-[10px] text-[var(--muted)]">
            weighted tree ramp
          </small>
        </div>
      </div>

      {/* Honest Scientific Caution */}
      <div className="mt-3 p-2.5 rounded bg-[var(--soft)] font-mono text-[11px] text-[var(--muted)] flex items-center justify-between">
        <span>
          <strong>Scientific Provenance:</strong> Values represent literature-derived scenario projections based on published cooling ranges and planning-grade costs. <em>This is not a new satellite observation post-cooling.</em>
        </span>
        <span className="shrink-0 text-[var(--ink)] font-semibold">
          Model: real-simulate.v1
        </span>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { generateDelhiGridSample, computeZoneRisks } from '../data/urbanHeatData';
import { ZoneRisk } from '../types/urbanHeat';
import { AlertTriangle, ArrowUpDown, Flame, Users, ShieldAlert, Thermometer, Sun } from 'lucide-react';

export const WardRiskExplorer: React.FC = () => {
  const baseCells = useMemo(() => generateDelhiGridSample(), []);
  const zones = useMemo(() => computeZoneRisks(baseCells), [baseCells]);

  const [sortKey, setSortKey] = useState<keyof ZoneRisk>('compositeRisk');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedZone, setSelectedZone] = useState<ZoneRisk>(zones[0]);

  // Daily alert simulator inputs
  const [simTempMax, setSimTempMax] = useState<number>(42.4);
  const [simHeatIndex, setSimHeatIndex] = useState<number>(45.1);

  // Compute daily alert level
  const alertInfo = useMemo(() => {
    let level: 'Green' | 'Yellow' | 'Orange' | 'Red' = 'Green';
    let multiplier = 1.0;
    let color = '#2fa24f';

    const qualifiesForHeatIndex = simTempMax >= 35.0;

    const isRed = simTempMax >= 45 || (qualifiesForHeatIndex && simHeatIndex >= 54);
    const isOrange = simTempMax >= 42 || (qualifiesForHeatIndex && simHeatIndex >= 41);
    const isYellow = simTempMax >= 40 || (qualifiesForHeatIndex && simHeatIndex >= 32);

    if (isRed) {
      level = 'Red';
      multiplier = 2.0;
      color = '#e0301e';
    } else if (isOrange) {
      level = 'Orange';
      multiplier = 1.5;
      color = '#f48a1f';
    } else if (isYellow) {
      level = 'Yellow';
      multiplier = 1.2;
      color = '#f0be1a';
    }

    return { level, multiplier, color };
  }, [simTempMax, simHeatIndex]);

  const sortedZones = useMemo(() => {
    return [...zones].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      }
      return 0;
    });
  }, [zones, sortKey, sortOrder]);

  const handleSort = (key: keyof ZoneRisk) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Ward &amp; Zone Risk Engine
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Formula: risk = 100 × (hazard × exposure × vulnerability) / max(...)
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Targeting Heat Where Danger and Vulnerable People Overlap
        </h3>
      </div>

      {/* Formula Component Breakdown Visual (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 font-mono text-xs">
        {/* Component 1: Hazard */}
        <div className="p-4 rounded border-t-4 border-[var(--t6)] bg-[var(--soft)]/40 border-x border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[var(--t6)]" /> HAZARD (H)
            </span>
            <span className="text-[11px] text-[var(--muted)]">0–1 Rank</span>
          </div>
          <p className="text-[11px] text-[var(--ink2)] mb-2 leading-relaxed">
            <strong>0.6 × Percentile(Mean LST)</strong> + <strong>0.4 × Percentile(p90 LST)</strong>
          </p>
          <div className="text-[10px] text-[var(--muted)] pt-2 border-t border-[var(--rule)]">
            Selected {selectedZone.name}: <strong>{selectedZone.hazardScore}/100</strong> (Mean {selectedZone.meanLst}°C, p90 {selectedZone.p90Lst}°C)
          </div>
        </div>

        {/* Component 2: Exposure */}
        <div className="p-4 rounded border-t-4 border-[var(--t1)] bg-[var(--soft)]/40 border-x border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[var(--t1)]" /> EXPOSURE (E)
            </span>
            <span className="text-[11px] text-[var(--muted)]">0–1 Rank</span>
          </div>
          <p className="text-[11px] text-[var(--ink2)] mb-2 leading-relaxed">
            <strong>Percentile(Total Ward Population)</strong> derived from 30 m Meta HRSL rasters.
          </p>
          <div className="text-[10px] text-[var(--muted)] pt-2 border-t border-[var(--rule)]">
            Selected {selectedZone.name}: <strong>{selectedZone.exposureScore}/100</strong> ({selectedZone.population.toLocaleString()} residents)
          </div>
        </div>

        {/* Component 3: Vulnerability */}
        <div className="p-4 rounded border-t-4 border-[var(--t4)] bg-[var(--soft)]/40 border-x border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[var(--t4)]" /> VULNERABILITY (V)
            </span>
            <span className="text-[11px] text-[var(--muted)]">0–1 Rank</span>
          </div>
          <p className="text-[11px] text-[var(--ink2)] mb-2 leading-relaxed">
            <strong>0.5 × Pop Density</strong> + <strong>0.3 × Green Deficit</strong> + <strong>0.2 × Crowding</strong>
          </p>
          <div className="text-[10px] text-[var(--muted)] pt-2 border-t border-[var(--rule)]">
            Selected {selectedZone.name}: <strong>{selectedZone.vulnerabilityScore}/100</strong>
          </div>
        </div>
      </div>

      {/* Disclosures & Caveats Banner */}
      <div className="p-3.5 rounded bg-[var(--soft)] border border-[var(--rule)] text-xs font-mono mb-5 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Vulnerability Modeling &amp; Analysis Unit Disclosures:</span>
        </div>
        <p className="m-0 leading-relaxed text-[11px] text-[var(--muted)]">
          (1) Default analysis zones are <strong>2 km × 2 km grid blocks</strong>, not official administrative wards. (2) Version 1 does NOT directly include age structure, poverty, or informal settlements. (3) When building footprint density is disabled, the implementation falls back to population density for that term, compounding density weight. <em>Risk is a relative prioritization index across wards, not a forecast of human harm.</em>
        </p>
      </div>

      {/* Sortable Analysis Zones Table */}
      <div className="rounded border border-[var(--rule)] overflow-hidden mb-6">
        <div className="p-3 bg-[var(--soft)] border-b border-[var(--rule)] flex justify-between items-center font-mono text-xs">
          <strong className="text-[var(--ink)]">New Delhi Analysis Zones Ranking ({zones.length} zones)</strong>
          <span className="text-[var(--muted)] text-[11px]">Click column to sort · Click row to inspect</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[var(--soft)]/50 text-[var(--muted)] border-b border-[var(--rule)]">
              <tr>
                <th
                  onClick={() => handleSort('rank')}
                  className="p-2.5 cursor-pointer hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1">Rank <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="p-2.5">Analysis Zone</th>
                <th
                  onClick={() => handleSort('compositeRisk')}
                  className="p-2.5 cursor-pointer hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1">Composite Risk <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th
                  onClick={() => handleSort('hazardScore')}
                  className="p-2.5 cursor-pointer hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1">Hazard (H) <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th
                  onClick={() => handleSort('exposureScore')}
                  className="p-2.5 cursor-pointer hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1">Exposure (E) <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th
                  onClick={() => handleSort('vulnerabilityScore')}
                  className="p-2.5 cursor-pointer hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1">Vuln (V) <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="p-2.5 text-right">Population</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {sortedZones.map((z) => {
                const isSelected = selectedZone.zoneId === z.zoneId;
                return (
                  <tr
                    key={z.zoneId}
                    onClick={() => setSelectedZone(z)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--accent-soft)]/30 font-semibold'
                        : 'hover:bg-[var(--soft)]/40'
                    }`}
                  >
                    <td className="p-2.5 font-bold">#{z.rank}</td>
                    <td className="p-2.5">{z.name}</td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-3 bg-[var(--soft)] rounded-xs overflow-hidden">
                          <div
                            className="h-full bg-[var(--crit)]"
                            style={{ width: `${z.compositeRisk}%` }}
                          />
                        </div>
                        <span className="font-bold text-[var(--crit)]">{z.compositeRisk}</span>
                      </div>
                    </td>
                    <td className="p-2.5">{z.hazardScore}</td>
                    <td className="p-2.5">{z.exposureScore}</td>
                    <td className="p-2.5">{z.vulnerabilityScore}</td>
                    <td className="p-2.5 text-right">{z.population.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Forecast & Alert Level Simulator */}
      <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/30 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--rule)] mb-3">
          <div>
            <strong className="text-sm font-bold text-[var(--ink)] block">
              Daily Heat Alert Threshold Simulator
            </strong>
            <span className="text-[11px] text-[var(--muted)]">
              Open-Meteo operational trigger rules for morning risk escalation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--muted)]">Calculated Alert:</span>
            <span
              className="px-2.5 py-0.5 rounded font-bold text-white"
              style={{ backgroundColor: alertInfo.color }}
            >
              {alertInfo.level.toUpperCase()} ALERT ({alertInfo.multiplier}x Multiplier)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Forecast Daily Max Temp (°C):</span>
              <strong className="text-[var(--ink)]">{simTempMax.toFixed(1)} °C</strong>
            </div>
            <input
              type="range"
              min="30"
              max="50"
              step="0.2"
              value={simTempMax}
              onChange={(e) => setSimTempMax(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--muted)] mt-0.5">
              <span>30°C (Normal)</span>
              <span>40°C (Yellow)</span>
              <span>42°C (Orange)</span>
              <span>45°C (Red)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Calculated Heat Index (°C):</span>
              <strong className="text-[var(--ink)]">{simHeatIndex.toFixed(1)} °C</strong>
            </div>
            <input
              type="range"
              min="28"
              max="60"
              step="0.5"
              value={simHeatIndex}
              onChange={(e) => setSimHeatIndex(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--muted)] mt-0.5">
              <span>32°C (Yellow HI)</span>
              <span>41°C (Orange HI)</span>
              <span>54°C (Red HI)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

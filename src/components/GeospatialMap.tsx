import React, { useState, useMemo } from 'react';
import { CITIES, HEAT_TIERS, generateDelhiGridSample } from '../data/urbanHeatData';
import { CityId, GridCell, HeatTier } from '../types/urbanHeat';
import { AlertTriangle, Info, ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';

interface GeospatialMapProps {
  selectedCityId: CityId;
  onSelectCity: (id: CityId) => void;
}

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  selectedCityId,
  onSelectCity,
}) => {
  const [activeTierFilter, setActiveTierFilter] = useState<HeatTier | 'all'>('all');
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);

  const city = useMemo(() => {
    return CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
  }, [selectedCityId]);

  // Generate or modulate cells based on city
  const cells = useMemo(() => {
    const delhiCells = generateDelhiGridSample();
    if (city.id === 'new_delhi') return delhiCells;
    
    // Scale temperatures appropriately for other cities
    const delta = city.meanLst - 43.8;
    return delhiCells.map((cell) => {
      const adjustedLst = parseFloat(Math.max(28, cell.lstObserved + delta).toFixed(1));
      let tier: HeatTier = 'cool';
      if (adjustedLst < 36) tier = 'cool';
      else if (adjustedLst < 39) tier = 'normal';
      else if (adjustedLst < 42) tier = 'moderate';
      else if (adjustedLst < 45) tier = 'elevated';
      else if (adjustedLst < 48) tier = 'high';
      else tier = 'critical';

      return {
        ...cell,
        id: `${city.id.slice(0, 3).toUpperCase()}-${cell.r}-${cell.c}`,
        lstObserved: adjustedLst,
        tier,
      };
    });
  }, [city]);

  const filteredCells = useMemo(() => {
    if (activeTierFilter === 'all') return cells;
    return cells.filter((c) => c.tier === activeTierFilter);
  }, [cells, activeTierFilter]);

  const displayedCell = hoveredCell || selectedCell || cells[60];

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header Controls: City Selector & Warnings */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--rule)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold ${
                city.isRealData
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {city.isRealData ? '● Real Data Tier' : '▲ Synthetic Preview'}
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              Model: real-v1-20261010 · 500 m UTM Grid
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-[var(--ink)]">
            {city.name}, {city.state}
          </h3>
        </div>

        {/* City Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Real data cities buttons */}
          <div className="flex items-center p-0.5 rounded bg-[var(--soft)] border border-[var(--rule)] text-xs">
            {CITIES.filter((c) => c.isRealData).map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCity(c.id);
                  setSelectedCell(null);
                }}
                className={`px-2.5 py-1 rounded font-mono transition-colors ${
                  selectedCityId === c.id
                    ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Synthetic previews dropdown */}
          <select
            value={city.isRealData ? '' : selectedCityId}
            onChange={(e) => {
              if (e.target.value) {
                onSelectCity(e.target.value as CityId);
                setSelectedCell(null);
              }
            }}
            className="text-xs font-mono px-2.5 py-1.5 rounded bg-[var(--soft)] border border-[var(--rule)] text-[var(--ink)] focus:outline-none"
            aria-label="Select synthetic preview city"
          >
            <option value="" disabled>
              16 Synthetic Previews...
            </option>
            {CITIES.filter((c) => !c.isRealData).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (Synthetic)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Synthetic Preview Warning Banner */}
      {!city.isRealData && (
        <div className="mt-3 p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div>
            <strong className="block font-semibold">Synthetic Preview Warning:</strong>
            <span>
              {city.name} is rendered using a synthetic procedural generator for interface demonstration. The model was never trained on real Landsat observations for this city. Do not use for physical municipal heat planning.
            </span>
          </div>
        </div>
      )}

      {/* City Statistics KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 rounded bg-[var(--soft)] font-mono text-xs">
        <div>
          <span className="text-[var(--muted)] block">Mean Surface Temp</span>
          <strong className="text-sm font-bold text-[var(--ink)]">{city.meanLst} °C</strong>
        </div>
        <div>
          <span className="text-[var(--muted)] block">Max Observed Temp</span>
          <strong className="text-sm font-bold text-[var(--crit)]">{city.maxLst} °C</strong>
        </div>
        <div>
          <span className="text-[var(--muted)] block">UHI Intensity</span>
          <strong className="text-sm font-bold text-[var(--accent)]">+{city.uhiIntensity} °C</strong>
        </div>
        <div>
          <span className="text-[var(--muted)] block">Hotspot Area (T5+T6)</span>
          <strong className="text-sm font-bold text-[var(--ink)]">{city.hotspotAreaKm2} km²</strong>
        </div>
      </div>

      {/* Heat Tier Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs font-mono">
        <span className="text-[var(--muted)] mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Tier Filter:
        </span>
        <button
          onClick={() => setActiveTierFilter('all')}
          className={`px-2 py-0.5 rounded transition-colors ${
            activeTierFilter === 'all'
              ? 'bg-[var(--ink)] text-[var(--bg)] font-semibold'
              : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          All Cells ({cells.length})
        </button>
        {HEAT_TIERS.map((tier) => (
          <button
            key={tier.tier}
            onClick={() => setActiveTierFilter(tier.tier)}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
              activeTierFilter === tier.tier
                ? 'bg-[var(--ink)] text-[var(--bg)] font-semibold'
                : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-xs"
              style={{ backgroundColor: tier.color }}
            />
            <span>{tier.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Map Viewport & Cell Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Interactive 500m Grid Canvas/SVG (7 cols) */}
        <div className="lg:col-span-7 rounded border border-[var(--rule)] bg-[var(--soft)]/50 p-4 relative overflow-hidden">
          <div className="flex justify-between items-center mb-2 font-mono text-[11px] text-[var(--muted)]">
            <span>500 m UTM Grid Mesh · Interactive (Hover / Click to inspect)</span>
            <span>{filteredCells.length} / {cells.length} cells active</span>
          </div>

          {/* Grid Render */}
          <div className="relative aspect-square max-w-[440px] mx-auto bg-[var(--bg)] rounded border border-[var(--rule)] p-2 shadow-inner">
            <svg
              viewBox="0 0 280 280"
              className="w-full h-full cursor-crosshair"
              role="img"
              aria-label={`Geospatial heat map grid for ${city.name}`}
            >
              <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--grid)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="280" height="280" fill="url(#gridPattern)" />

              {/* Render Cells */}
              {cells.map((cell) => {
                const isFilteredOut = activeTierFilter !== 'all' && cell.tier !== activeTierFilter;
                const isSelected = selectedCell?.id === cell.id;
                const isHovered = hoveredCell?.id === cell.id;
                const tierInfo = HEAT_TIERS.find((t) => t.tier === cell.tier);

                const x = cell.c * 20;
                const y = (13 - cell.r) * 20; // Flip Y for north-up

                return (
                  <rect
                    key={cell.id}
                    x={x + 1}
                    y={y + 1}
                    width={18}
                    height={18}
                    rx={2}
                    fill={tierInfo ? tierInfo.color : '#3b6fe0'}
                    opacity={isFilteredOut ? 0.15 : isSelected ? 1 : isHovered ? 0.95 : 0.85}
                    stroke={isSelected ? 'var(--ink)' : isHovered ? '#ffffff' : 'none'}
                    strokeWidth={isSelected ? 2 : 1}
                    onMouseEnter={() => setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => setSelectedCell(cell)}
                    className="transition-opacity duration-100"
                  >
                    <title>{`${cell.id}: ${cell.lstObserved}°C (${cell.tier})`}</title>
                  </rect>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex justify-between font-mono text-[10px] text-[var(--muted)] px-1">
            <span>West ⟵ 7 km ⟶ East</span>
            <span>South ⟵ 7 km ⟶ North</span>
          </div>
        </div>

        {/* Selected Cell Inspector & Methodology (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--rule)]">
              <div>
                <span className="font-mono text-[11px] text-[var(--muted)] block">
                  CELL INSPECTOR (500 m)
                </span>
                <strong className="font-mono text-sm text-[var(--ink)] font-bold">
                  {displayedCell.id}
                </strong>
              </div>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded font-bold"
                style={{
                  backgroundColor: HEAT_TIERS.find((t) => t.tier === displayedCell.tier)?.color,
                  color: '#ffffff',
                }}
              >
                {displayedCell.lstObserved} °C · {displayedCell.tier.toUpperCase()}
              </span>
            </div>

            {/* Cell Metrics Table */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Analysis Zone:</span>
                <span className="text-[var(--ink)] font-semibold">{displayedCell.zoneId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Exposed Population:</span>
                <span className="text-[var(--ink)] font-semibold">{displayedCell.population.toLocaleString()} residents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Vegetation Index (NDVI):</span>
                <span className="text-[var(--ink)]">{displayedCell.ndvi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Built-Up Index (NDBI):</span>
                <span className="text-[var(--ink)]">{displayedCell.ndbi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Terrain Elevation:</span>
                <span className="text-[var(--ink)]">{displayedCell.elevation} m asl</span>
              </div>

              {/* Suitability Sub-Section */}
              <div className="pt-2 border-t border-[var(--rule)]">
                <span className="text-[var(--muted)] block mb-1">Cooling Suitability Scores:</span>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Cool Roofs:</span>
                    <strong>{(displayedCell.suitability.coolRoofs * 100).toFixed(0)}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tree Cover:</span>
                    <strong>{(displayedCell.suitability.treeCover * 100).toFixed(0)}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Transit Shade:</span>
                    <strong>{(displayedCell.suitability.shadeStructures * 100).toFixed(0)}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cool Pave:</span>
                    <strong>{(displayedCell.suitability.coolPavements * 100).toFixed(0)}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Heat Tiers Reference Card */}
          <div className="rounded border border-[var(--rule)] bg-[var(--soft)] p-3 font-mono text-[11px]">
            <strong className="block text-[var(--ink)] mb-1.5 font-semibold">
              Heat Tier Definitions &amp; Thermal Cutoffs:
            </strong>
            <ul className="space-y-1 text-[var(--muted)]">
              {HEAT_TIERS.map((tier) => (
                <li key={tier.tier} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-none shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="font-semibold text-[var(--ink)]">{tier.label}:</span>
                  <span>{tier.tempRange}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

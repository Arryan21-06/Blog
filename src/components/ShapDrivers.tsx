import React, { useState } from 'react';
import { SHAP_DRIVERS } from '../data/urbanHeatData';
import { ShapDriver } from '../types/urbanHeat';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

export const ShapDrivers: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<ShapDriver>(SHAP_DRIVERS[0]);

  const maxShap = SHAP_DRIVERS[0].meanAbsShap; // 1.23

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Explainable AI · SHAP Driver Analysis
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Computed via TreeExplainer on 19,681 cells (model: real-v1-20261010)
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          What the Model Relies On to Predict Surface Temperature
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Horizontal Bar Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5 font-mono text-xs">
          <div className="flex justify-between text-[11px] text-[var(--muted)] pb-1 border-b border-[var(--rule)]">
            <span>Feature Name</span>
            <span>Mean |SHAP| Value (°C impact)</span>
          </div>

          {SHAP_DRIVERS.map((driver) => {
            const isSelected = selectedDriver.feature === driver.feature;
            const barWidth = (driver.meanAbsShap / maxShap) * 100;

            return (
              <div
                key={driver.feature}
                onClick={() => setSelectedDriver(driver)}
                className={`p-1.5 rounded cursor-pointer transition-colors flex items-center gap-3 ${
                  isSelected ? 'bg-[var(--soft)]' : 'hover:bg-[var(--soft)]/50'
                }`}
              >
                <div className="w-40 truncate">
                  <span className={`block ${isSelected ? 'font-bold text-[var(--ink)]' : 'text-[var(--ink2)]'}`}>
                    {driver.name}
                  </span>
                </div>

                <div className="flex-1 h-5 bg-[var(--soft)] rounded-xs overflow-hidden relative border border-[var(--grid)]">
                  <div
                    className="h-full rounded-xs transition-all duration-300"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor:
                        driver.direction === 'heats' ? 'var(--s2)' : 'var(--s1)',
                    }}
                  />
                </div>

                <div className="w-16 text-right font-bold text-[var(--ink)] flex items-center justify-end gap-1">
                  <span>{driver.meanAbsShap.toFixed(2)}°</span>
                  {driver.direction === 'heats' ? (
                    <span title="Heating association">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--crit)] shrink-0" />
                    </span>
                  ) : (
                    <span title="Cooling association">
                      <ArrowDownRight className="w-3.5 h-3.5 text-[var(--s1)] shrink-0" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex justify-between text-[10px] text-[var(--muted)] pt-1 px-43">
            <span>0.0 °C</span>
            <span>0.5 °C</span>
            <span>1.0 °C</span>
            <span>1.25 °C</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[var(--muted)] pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[var(--s2)]" /> Built / Thermal (Heats)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[var(--s1)]" /> Moisture / Vegetation / Elevation (Cools)
            </span>
          </div>
        </div>

        {/* Selected Driver Inspection Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/40 font-mono text-xs">
            <span className="text-[11px] text-[var(--muted)] block">FEATURE INSPECTOR</span>
            <strong className="text-sm font-bold text-[var(--ink)] block mb-1">
              {selectedDriver.name} ({selectedDriver.feature})
            </strong>

            <div className="space-y-2 mt-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Mean Absolute SHAP:</span>
                <strong className="text-[var(--accent)]">{selectedDriver.meanAbsShap} °C</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Net Impact Vector:</span>
                <span className="font-semibold text-[var(--ink)]">
                  {selectedDriver.direction === 'heats' ? 'Positive (Thermal warming)' : 'Negative (Thermal cooling)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Measurement Units:</span>
                <span className="text-[var(--ink)]">{selectedDriver.unit}</span>
              </div>
              <div className="pt-2 border-t border-[var(--rule)] text-[var(--ink2)] leading-relaxed">
                <p className="m-0">{selectedDriver.description}</p>
              </div>
            </div>
          </div>

          {/* Critical Causality Caveat from Spec */}
          <div className="p-3.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-mono space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Scientific Rigor · SHAP is Not Causality:</span>
            </div>
            <p className="m-0 leading-relaxed text-[11px]">
              SHAP values describe how features mathematically contribute to the XGBoost model's predictions. <em>They do not prove that altering a feature will causally deliver that cooling magnitude in the real world.</em> Water fraction and MNDWI are correlated features; physical intervention effects must rely on validated microclimate literature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

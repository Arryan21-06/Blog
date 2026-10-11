import React, { useState } from 'react';
import { HELD_OUT_METRICS } from '../data/urbanHeatData';
import { HeldOutMetric, CityId } from '../types/urbanHeat';
import { AlertCircle, HelpCircle, CheckCircle, BarChart3, TrendingDown } from 'lucide-react';

export const ModelEvaluation: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<CityId>('new_delhi');
  const [validationType, setValidationType] = useState<'held_out' | 'spatial_block'>('held_out');

  const metric = HELD_OUT_METRICS.find((m) => m.cityId === selectedCityId) || HELD_OUT_METRICS[0];

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--rule)] mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
              Model Evaluation &amp; Transferability
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              XGBoost point + quantile (q10/q90) · Shipped model real-v1-20261010
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-[var(--ink)]">
            Testing on Cities the Model Never Saw
          </h3>
        </div>

        {/* Validation Type Toggle */}
        <div className="flex items-center p-0.5 rounded bg-[var(--soft)] border border-[var(--rule)] text-xs font-mono">
          <button
            onClick={() => setValidationType('held_out')}
            className={`px-3 py-1 rounded transition-colors ${
              validationType === 'held_out'
                ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            Leave-One-City-Out
          </button>
          <button
            onClick={() => setValidationType('spatial_block')}
            className={`px-3 py-1 rounded transition-colors ${
              validationType === 'spatial_block'
                ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            Within-City 5 km Block CV
          </button>
        </div>
      </div>

      {/* Held-Out City Selector Pills */}
      <div className="flex items-center gap-2 mb-5 font-mono text-xs">
        <span className="text-[var(--muted)]">Select City:</span>
        {HELD_OUT_METRICS.map((m) => (
          <button
            key={m.cityId}
            onClick={() => setSelectedCityId(m.cityId)}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCityId === m.cityId
                ? 'bg-[var(--accent)] text-white font-semibold'
                : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {m.cityName}
          </button>
        ))}
      </div>

      {/* Main Comparative Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Metric 1: Pearson r (Correlation) */}
        <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/30">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="font-mono text-xs font-semibold text-[var(--ink)] block">
                Spatial Pattern Correlation (Pearson r)
              </span>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                {validationType === 'held_out'
                  ? 'Higher is better (Quality gate: r ≥ 0.30)'
                  : '5 km spatial blocks within city'}
              </span>
            </div>
            <strong className="font-mono text-lg font-bold text-[var(--ink)]">
              {validationType === 'held_out' ? metric.pearsonR.toFixed(3) : `${metric.blockCvR[0]}–${metric.blockCvR[1]}`}
            </strong>
          </div>

          {/* Bar Chart comparing 4 cities */}
          <div className="space-y-2 mt-3 font-mono text-xs">
            {HELD_OUT_METRICS.map((m) => {
              const rVal = validationType === 'held_out' ? m.pearsonR : (m.blockCvR[0] + m.blockCvR[1]) / 2;
              const isSelected = m.cityId === selectedCityId;
              return (
                <div key={m.cityId} className="flex items-center gap-3">
                  <span className={`w-20 truncate ${isSelected ? 'font-bold text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                    {m.cityName}
                  </span>
                  <div className="flex-1 h-5 bg-[var(--soft)] rounded-xs overflow-hidden relative border border-[var(--grid)]">
                    <div
                      className="h-full rounded-xs transition-all duration-300"
                      style={{
                        width: `${rVal * 100}%`,
                        backgroundColor: isSelected ? 'var(--accent)' : 'var(--s1)',
                      }}
                    />
                  </div>
                  <span className="w-12 text-right font-semibold">
                    {rVal.toFixed(3)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[var(--muted)] mt-1.5 px-23">
            <span>0.0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
        </div>

        {/* Metric 2: RMSE (Error Scale) */}
        <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/30">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="font-mono text-xs font-semibold text-[var(--ink)] block">
                Prediction Error Scale (RMSE in °C)
              </span>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                {validationType === 'held_out' ? 'Lower is better' : '5 km spatial blocks within city'}
              </span>
            </div>
            <strong className="font-mono text-lg font-bold text-[var(--accent)]">
              {validationType === 'held_out' ? `${metric.rmse.toFixed(3)} °C` : `${metric.blockCvRmse[0]}–${metric.blockCvRmse[1]} °C`}
            </strong>
          </div>

          {/* Bar Chart for RMSE */}
          <div className="space-y-2 mt-3 font-mono text-xs">
            {HELD_OUT_METRICS.map((m) => {
              const rmseVal = validationType === 'held_out' ? m.rmse : (m.blockCvRmse[0] + m.blockCvRmse[1]) / 2;
              const isSelected = m.cityId === selectedCityId;
              return (
                <div key={m.cityId} className="flex items-center gap-3">
                  <span className={`w-20 truncate ${isSelected ? 'font-bold text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                    {m.cityName}
                  </span>
                  <div className="flex-1 h-5 bg-[var(--soft)] rounded-xs overflow-hidden relative border border-[var(--grid)]">
                    <div
                      className="h-full rounded-xs transition-all duration-300"
                      style={{
                        width: `${(rmseVal / 4.5) * 100}%`,
                        backgroundColor: isSelected ? 'var(--crit)' : 'var(--s2)',
                      }}
                    />
                  </div>
                  <span className="w-12 text-right font-semibold">
                    {rmseVal.toFixed(2)}°
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[var(--muted)] mt-1.5 px-23">
            <span>0°C</span>
            <span>2°C</span>
            <span>4.5°C</span>
          </div>
        </div>
      </div>

      {/* Diverging Bias Chart (Crucial for honesty) */}
      <div className="p-4 rounded border border-[var(--rule)] bg-[var(--surface)] mb-5 font-mono text-xs">
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <span className="font-semibold text-[var(--ink)] block">
              Mean City-Level Prediction Bias in °C (Diverging)
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              Negative = Under-predicts | Positive = Over-predicts (Reveals systematic city offset)
            </span>
          </div>
          <span className="text-[11px] text-[var(--muted)]">Baseline r: {metric.baselineR.toFixed(3)}</span>
        </div>

        <div className="space-y-2.5 my-3">
          {HELD_OUT_METRICS.map((m) => {
            const isNegative = m.bias < 0;
            const barWidth = Math.min(50, (Math.abs(m.bias) / 4.0) * 50);
            const isSelected = m.cityId === selectedCityId;

            return (
              <div key={m.cityId} className="flex items-center gap-3">
                <span className={`w-20 truncate ${isSelected ? 'font-bold text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                  {m.cityName}
                </span>

                {/* Diverging track with center zero line */}
                <div className="flex-1 h-6 bg-[var(--soft)] rounded-xs relative border border-[var(--grid)]">
                  {/* Center zero line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--ink)] z-10" />

                  {isNegative ? (
                    <div
                      className="absolute top-1 bottom-1 rounded-l-xs transition-all duration-300"
                      style={{
                        right: '50%',
                        width: `${barWidth}%`,
                        backgroundColor: 'var(--neg)',
                      }}
                    />
                  ) : (
                    <div
                      className="absolute top-1 bottom-1 rounded-r-xs transition-all duration-300"
                      style={{
                        left: '50%',
                        width: `${barWidth}%`,
                        backgroundColor: 'var(--pos)',
                      }}
                    />
                  )}
                </div>

                <span
                  className="w-16 text-right font-bold"
                  style={{ color: isNegative ? 'var(--neg)' : 'var(--pos)' }}
                >
                  {m.bias > 0 ? `+${m.bias.toFixed(2)}°` : `${m.bias.toFixed(2)}°`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] text-[var(--muted)] px-23">
          <span>-4 °C (Under)</span>
          <span>-2 °C</span>
          <span className="font-bold text-[var(--ink)]">0 °C (Exact)</span>
          <span>+2 °C</span>
          <span>+4 °C (Over)</span>
        </div>
      </div>

      {/* Conformal Uncertainty Band Coverage Against 80% Target */}
      <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/50 font-mono text-xs">
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <span className="font-semibold text-[var(--ink)] block">
              Conformal q10–q90 Prediction Band Coverage
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              Target coverage: 80% (Bands widened conformally by 0.25 °C)
            </span>
          </div>
          <strong className="text-sm font-bold text-[var(--ink)]">
            {metric.conformalCoverage}% Coverage
          </strong>
        </div>

        {/* Coverage Track */}
        <div className="space-y-2 my-2">
          {HELD_OUT_METRICS.map((m) => {
            const isSelected = m.cityId === selectedCityId;
            const diffFromTarget = m.conformalCoverage - 80;
            return (
              <div key={m.cityId} className="flex items-center gap-3">
                <span className={`w-20 truncate ${isSelected ? 'font-bold text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                  {m.cityName}
                </span>
                <div className="flex-1 h-5 bg-[var(--surface)] rounded-xs overflow-hidden relative border border-[var(--grid)]">
                  {/* 80% Target Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[var(--ink)] z-10"
                    style={{ left: '80%' }}
                    title="80% Target"
                  />
                  <div
                    className="h-full rounded-xs transition-all duration-300"
                    style={{
                      width: `${m.conformalCoverage}%`,
                      backgroundColor: isSelected ? 'var(--accent)' : 'var(--s3)',
                    }}
                  />
                </div>
                <span className="w-16 text-right font-semibold">
                  {m.conformalCoverage}% ({diffFromTarget >= 0 ? `+${diffFromTarget}` : diffFromTarget}%)
                </span>
              </div>
            );
          })}
        </div>

        {/* Mandatory Honest Caveat from Spec */}
        <div className="mt-3 p-2.5 rounded bg-[var(--surface)] border border-[var(--rule)] text-[11px] text-[var(--muted)]">
          <strong>Validation Caveat:</strong> Coverage was evaluated on the same cross-validation folds used to calibrate the band widening, so these coverage figures are <em>optimistic</em>. They are not independently validated confidence intervals on external cities.
        </div>
      </div>
    </div>
  );
};

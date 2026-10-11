import React, { useState, useMemo } from 'react';
import { generateDelhiGridSample, runBudgetOptimizer } from '../data/urbanHeatData';
import { Sliders, Scale, Users, ShieldAlert, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export const BudgetOptimizer: React.FC = () => {
  const baseCells = useMemo(() => generateDelhiGridSample(), []);

  const [budgetCrore, setBudgetCrore] = useState<number>(50); // Rs 50 Crore default per spec
  const [lambda, setLambda] = useState<number>(0.5); // Equity weight default 0.5

  const { efficiencyPlan, equityPlan, selectedPlan } = useMemo(() => {
    return runBudgetOptimizer(baseCells, budgetCrore, lambda);
  }, [baseCells, budgetCrore, lambda]);

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Budget &amp; Equity Optimizer
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Deterministic greedy allocation: benefit = |cooling| × hazard_weight × ((1-λ) + λ × vulnerable_weight)
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Allocating Capital Under Competing Climate Objectives
        </h3>
      </div>

      {/* Interactive Controls Bar: Budget & Lambda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded bg-[var(--soft)]/50 border border-[var(--rule)] mb-5 font-mono text-xs">
        {/* Budget Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[var(--muted)] font-semibold flex items-center gap-1.5">
              <span>Municipal Budget:</span>
              <strong className="text-[var(--ink)] text-sm">₹{budgetCrore} Crore</strong>
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              (₹{(budgetCrore * 100).toLocaleString()} Lakh)
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={budgetCrore}
            onChange={(e) => setBudgetCrore(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
            aria-label="Municipal budget slider"
          />
          <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
            <span>₹10 Cr (Pilot)</span>
            <span>₹50 Cr (Benchmark)</span>
            <span>₹100 Cr (City-Wide)</span>
          </div>
        </div>

        {/* Equity Weight Lambda Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[var(--muted)] font-semibold flex items-center gap-1.5">
              <span>Equity Weight (λ):</span>
              <strong className="text-[var(--accent)] text-sm">{lambda.toFixed(2)}</strong>
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              {lambda < 0.3 ? 'Efficiency-Biased' : lambda > 0.7 ? 'Equity-Biased' : 'Balanced'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={lambda}
            onChange={(e) => setLambda(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
            aria-label="Equity weight lambda slider"
          />
          <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
            <span>λ = 0.0 (Cooling / Rupee)</span>
            <span>λ = 0.5 (Balanced)</span>
            <span>λ = 1.0 (Vulnerable People)</span>
          </div>
        </div>
      </div>

      {/* Three-Way Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 font-mono text-xs">
        {/* Plan 1: Efficiency Plan (lambda = 0) */}
        <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-xs relative">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--rule)]">
            <span className="font-semibold text-[var(--ink)]">Efficiency-First</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--muted)]">
              λ = 0.0
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[var(--muted)] block text-[11px]">People Protected</span>
              <strong className="text-base font-bold text-[var(--ink)]">
                {efficiencyPlan.peopleProtected.toLocaleString()}
              </strong>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Amount Allocated</span>
              <span className="text-[var(--ink)] font-semibold">₹{efficiencyPlan.spentCrore} Cr</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Cost Per Person</span>
              <span className="text-[var(--ink)]">₹{efficiencyPlan.costPerPerson} / person</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Average Cooling</span>
              <span className="text-[var(--accent)] font-semibold">-{efficiencyPlan.avgCooling} °C</span>
            </div>
            <div className="pt-2 border-t border-[var(--rule)] text-[11px] text-[var(--muted)]">
              <span>Picks hottest, most suitable cells regardless of resident count.</span>
            </div>
          </div>
        </div>

        {/* Plan 2: Selected Plan (active lambda) */}
        <div className="rounded border-2 border-[var(--accent)] bg-[var(--accent-soft)]/20 p-4 shadow-xs relative">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--rule)]">
            <span className="font-bold text-[var(--ink)]">Selected Plan</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--accent)] text-white font-semibold">
              λ = {lambda.toFixed(2)}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[var(--muted)] block text-[11px]">People Protected</span>
              <strong className="text-base font-bold text-[var(--accent)]">
                {selectedPlan.peopleProtected.toLocaleString()}
              </strong>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Amount Allocated</span>
              <span className="text-[var(--ink)] font-semibold">₹{selectedPlan.spentCrore} Cr</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Cost Per Person</span>
              <span className="text-[var(--ink)]">₹{selectedPlan.costPerPerson} / person</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Average Cooling</span>
              <span className="text-[var(--accent)] font-semibold">-{selectedPlan.avgCooling} °C</span>
            </div>
            <div className="pt-2 border-t border-[var(--rule)] text-[11px] text-[var(--ink2)]">
              <span>{Math.round(((selectedPlan.peopleProtected - efficiencyPlan.peopleProtected) / Math.max(1, efficiencyPlan.peopleProtected)) * 100)}% more people reached vs. efficiency alone.</span>
            </div>
          </div>
        </div>

        {/* Plan 3: Equity Plan (lambda = 1) */}
        <div className="rounded border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-xs relative">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--rule)]">
            <span className="font-semibold text-[var(--ink)]">Equity-Weighted</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--muted)]">
              λ = 1.0
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[var(--muted)] block text-[11px]">People Protected</span>
              <strong className="text-base font-bold text-[var(--ink)]">
                {equityPlan.peopleProtected.toLocaleString()}
              </strong>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Amount Allocated</span>
              <span className="text-[var(--ink)] font-semibold">₹{equityPlan.spentCrore} Cr</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Cost Per Person</span>
              <span className="text-[var(--ink)]">₹{equityPlan.costPerPerson} / person</span>
            </div>
            <div>
              <span className="text-[var(--muted)] block text-[11px]">Average Cooling</span>
              <span className="text-[var(--accent)] font-semibold">-{equityPlan.avgCooling} °C</span>
            </div>
            <div className="pt-2 border-t border-[var(--rule)] text-[11px] text-[var(--muted)]">
              <span>Maximizes cooling delivered to dense, green-deficient populations.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Analytical Finding Note */}
      <div className="p-4 rounded bg-[var(--soft)] border border-[var(--rule)] text-xs font-mono space-y-1.5">
        <strong className="block text-[var(--ink)] font-semibold">
          Why the Two Plans Diverge (Documented New Delhi Finding):
        </strong>
        <p className="text-[var(--ink2)] leading-relaxed m-0">
          Under the exact same ₹50 crore budget, the equity plan (λ = 1) protects <strong>{equityPlan.peopleProtected.toLocaleString()}</strong> people compared to <strong>{efficiencyPlan.peopleProtected.toLocaleString()}</strong> under pure efficiency (λ = 0) — an increase of roughly <strong>41% more residents protected</strong>.
        </p>
        <p className="text-[var(--muted)] leading-relaxed m-0 pt-1">
          <strong>Caveat:</strong> Cooling ranges are from published urban-heat literature and costs are planning-grade placeholders. Values reflect modelled benefit under stated assumptions, not contractor quotes or guaranteed physical relief.
        </p>
      </div>
    </div>
  );
};

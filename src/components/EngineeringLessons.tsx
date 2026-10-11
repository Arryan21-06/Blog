import React, { useState } from 'react';
import { BookOpen, ExternalLink, Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';

export const EngineeringLessons: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const lessons = [
    {
      id: 1,
      category: 'Data',
      color: 'var(--t1)',
      title: 'Real data is part of the model',
      desc: 'Landsat, Sentinel-2, WorldCover, population grids, weather, and OpenStreetMap differ fundamentally in resolution, date, coverage, and meaning. We treat provenance, missing values, and freshness as product features. WorldCover 2021 predates our 2024–2026 thermal composite, and Landsat measures surface temperature, not the air temperature or heat stress a human experiences. When Overpass API rate-limiting caused partial cooling spot retrieval, the lesson was immediate: "no facility found" must never be rendered as "no facility exists."',
    },
    {
      id: 2,
      category: 'Model',
      color: 'var(--t2)',
      title: 'Validate the way you will deploy',
      desc: 'Neighbouring 500m grid cells are strongly auto-correlated; random train/test splits severely flatter a spatial model. Holding out an entire city revealed the hard reality: strong spatial pattern transfer (Pearson r 0.72 to 0.89), but an error scale of 2.4 to 3.9 °C RMSE and systematic city-level offsets ranging from -3.2 °C in Jaipur to +3.7 °C in Bengaluru. A single global evaluation metric would have masked this completely.',
    },
    {
      id: 3,
      category: 'Model',
      color: 'var(--t2)',
      title: 'Explainability is not causality',
      desc: 'SHAP values demonstrated what the tree ensemble relies on mathematically: water fraction (1.23), NDBI (1.20), ambient temperature (0.82), MNDWI (0.57), and elevation (0.46). However, SHAP does not prove that changing a feature will causally deliver that cooling magnitude. Physical interventions require their own independent literature sources and must remain explicitly labelled as planning assumptions.',
    },
    {
      id: 4,
      category: 'Ranking',
      color: 'var(--t3)',
      title: 'A valid formula can still mislead',
      desc: 'The ward risk score deterministically multiplies hazard, exposure, and vulnerability. But because building-footprint extraction is disabled by default, the vulnerability term quietly falls back to population density, inadvertently giving population density double weighting. Responsible engineering demands fixing this or disclosing it prominently, and never presenting a proxy as an empirical measurement.',
    },
    {
      id: 5,
      category: 'Optimizer',
      color: 'var(--t4)',
      title: 'Optimization makes values explicit',
      desc: 'Under the same ₹50 crore budget, the pure efficiency plan (λ = 0) protects ~2.05 million people while the equity plan (λ = 1) protects ~2.88 million people. Because both rest on planning-grade cost placeholders, this comparison highlights a genuine societal trade-off rather than claiming a guaranteed physical benefit. The next milestone is benchmarking against simple heuristic baselines.',
    },
    {
      id: 6,
      category: 'Explanation',
      color: 'var(--t5)',
      title: 'AI needs boundaries',
      desc: 'Language models are superb at phrasing, but hazardous at arithmetic. In Urban Heat, deterministic code owns all numbers, rankings, and allocations. The AI Heat Officer merely phrases the narrative, followed by automated regex verification that validates every digit against tool execution logs. Stale forecasts can still produce accurate numbers with misleading real-world meaning, so numeric verification is a safeguard, not a complete truth guarantee.',
    },
    {
      id: 7,
      category: 'Explanation',
      color: 'var(--t5)',
      title: 'Fallbacks are part of the product',
      desc: 'APIs go down, forecasts become stale, and models time out. The application must degrade gracefully, explicitly declare that it has degraded, and transparently identify which fallback source generated the output. A fallback designed to mimic a fresh response without notice is a deceptive failure mode.',
    },
    {
      id: 8,
      category: 'Infrastructure',
      color: 'var(--t6)',
      title: 'Passing tests are not a deployed system',
      desc: 'We had 53 passing automated tests and a SAM template that passed cfn-lint. Yet, because network calls were mocked, nothing had been deployed to AWS. Responsible software engineering maintains four distinct status levels: template-validated, deployed, end-to-end verified, and real-world outcome.',
    },
    {
      id: 9,
      category: 'Infrastructure',
      color: 'var(--t6)',
      title: 'Keep operator noise away from the public',
      desc: 'When CloudWatch backend alarms and public heat advisories share a single SNS topic, citizen subscribers risk receiving terrifying Lambda error alerts. Separating operator and citizen communication paths is a critical design requirement, not an afterthought.',
    },
    {
      id: 10,
      category: 'Infrastructure',
      color: 'var(--t6)',
      title: 'Make data pipelines reproducible in the cloud',
      desc: 'Processing Landsat and Sentinel-2 data on a local machine is hard to audit and impossible to scale. Transitioning to Step Functions orchestrating Batch or Glue transforms, with immutable version tags for model, features, and data date, elevates ad-hoc code into a defensible scientific pipeline.',
    },
    {
      id: 11,
      category: 'People',
      color: 'var(--t1)',
      title: 'Privacy and access are engineering requirements',
      desc: 'Snapping citizen reports to a 500 m grid cell protects individual location trails, but unstructured text notes can still inadvertently reveal identity. Similarly, an OSM point does not prove a cooling hall has working air conditioning or open doors for informal laborers. Facilities require verified operational statuses.',
    },
    {
      id: 12,
      category: 'Evidence',
      color: 'var(--ink)',
      title: 'Aim for a defensible decision, not a convincing demo',
      desc: 'We distinguish between software capability, modelled benefit, and real-world outcome. Urban Heat demonstrates the first and refines the second. It has not proved that it has lowered temperatures, prevented heatstroke, or saved lives. Disclosing that boundary is the heart of responsible climate engineering.',
    },
  ];

  const nextSteps = [
    {
      rank: 1,
      title: 'Validate every intervention parameter against exact scientific literature',
      desc: 'Match cooling ranges and cost benchmarks to specific peer-reviewed microclimate studies ensuring the temperature metric matches LST.',
    },
    {
      rank: 2,
      title: 'Correct or disclose the building-density fallback in vulnerability scores',
      desc: 'Prevent double-weighting of population density by either incorporating OSM building footprints or formally updating the vulnerability formula.',
    },
    {
      rank: 3,
      title: 'Improve uncertainty calibration using independent held-out data',
      desc: 'Calibrate the q10–q90 prediction bands on cities outside the initial training folds to establish true out-of-sample coverage confidence.',
    },
    {
      rank: 4,
      title: 'Benchmark the optimizer against six heuristic baselines',
      desc: 'Compare allocations against random feasible, hottest-first, and zero-intervention baselines under identical budget constraints.',
    },
    {
      rank: 5,
      title: 'Complete cooling facility field verification and justify alert cutoffs',
      desc: 'Audit mapped OpenStreetMap community shelters for actual summer opening hours, clean drinking water, and accessibility.',
    },
    {
      rank: 6,
      title: 'Deploy the AWS stack live and demonstrate end-to-end cloud execution',
      desc: 'Deploy the SAM template to an active AWS region and capture operational console metrics for Lambda, DynamoDB, and Bedrock.',
    },
  ];

  const filteredLessons = activeCategory === 'all'
    ? lessons
    : lessons.filter((l) => l.category === activeCategory);

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Engineering Lessons &amp; Roadmap
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Reflections from bridging geospatial earth science and municipal software
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Twelve Lessons That Reshaped How We Build
        </h3>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs">
        <span className="text-[var(--muted)]">Discipline:</span>
        {['all', 'Data', 'Model', 'Ranking', 'Optimizer', 'Explanation', 'Infrastructure', 'People', 'Evidence'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeCategory === cat
                ? 'bg-[var(--ink)] text-white font-semibold'
                : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {cat === 'all' ? 'All (12)' : cat}
          </button>
        ))}
      </div>

      {/* Lessons Accordion List */}
      <div className="space-y-3 mb-8">
        {filteredLessons.map((l) => (
          <div
            key={l.id}
            className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/30 space-y-1.5"
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: l.color }}
              />
              <span className="uppercase font-bold text-[var(--muted)] tracking-wider text-[10px]">
                {l.category} · Lesson {l.id}
              </span>
            </div>
            <strong className="block font-display text-base font-bold text-[var(--ink)]">
              {l.title}
            </strong>
            <p className="font-reading text-sm text-[var(--ink2)] leading-relaxed m-0">
              {l.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Prioritized 6 Next Steps Section */}
      <div className="pt-5 border-t border-[var(--rule)]">
        <h4 className="font-display font-bold text-base text-[var(--ink)] mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[var(--accent)]" />
          <span>Six Prioritized Milestones for Public Decision Support</span>
        </h4>

        <div className="space-y-2.5 font-mono text-xs">
          {nextSteps.map((step) => (
            <div
              key={step.rank}
              className="p-3 rounded border border-[var(--rule)] bg-[var(--surface)] flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-[var(--soft)] text-[var(--accent)] font-bold flex items-center justify-center shrink-0 text-xs">
                {step.rank}
              </span>
              <div>
                <strong className="block text-[var(--ink)] font-bold mb-0.5">
                  {step.title}
                </strong>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { ImmersiveScrollytelling } from './ImmersiveScrollytelling';
import { HeroSection } from './HeroSection';
import { GeospatialMap } from './GeospatialMap';
import { ScenarioSimulator } from './ScenarioSimulator';
import { BudgetOptimizer } from './BudgetOptimizer';
import { ModelEvaluation } from './ModelEvaluation';
import { ShapDrivers } from './ShapDrivers';
import { WardRiskExplorer } from './WardRiskExplorer';
import { HeatOfficerExplainer } from './HeatOfficerExplainer';
import { ArchitectureExplorer } from './ArchitectureExplorer';
import { CitizenViewMockup } from './CitizenViewMockup';
import { AccountabilityLedger } from './AccountabilityLedger';
import { DataSourcesExplorer } from './DataSourcesExplorer';
import { EngineeringLessons } from './EngineeringLessons';
import { CityId } from '../types/urbanHeat';
import { ExternalLink, Flame, ShieldAlert, Users, Layers, Award, CheckCircle2 } from 'lucide-react';

interface EditorialStoryProps {
  selectedCityId: CityId;
  onSelectCity: (id: CityId) => void;
  onOpenLab: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({
  selectedCityId,
  onSelectCity,
  onOpenLab,
}) => {
  return (
    <div>
      {/* 0. Full-Viewport Opening & Scroll-Driven Map Narrative (The Pudding style) */}
      <ImmersiveScrollytelling
        onJumpToSimulator={() => {
          const el = document.getElementById('scenarios');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onJumpToMap={() => {
          const el = document.getElementById('map');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <article className="max-w-[72rem] mx-auto px-4 pb-20">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreMap={() => {
            const el = document.getElementById('map');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreScenarios={() => {
            const el = document.getElementById('scenarios');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

      {/* 2. The Problem Section */}
      <section id="problem" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 01 · The Problem
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Cities get hot. Protection is what is uneven.
        </h2>

        <div className="space-y-4 font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl">
          <p className="text-xl sm:text-2xl text-[var(--ink)] font-medium leading-snug">
            Picture a city getting ready for an extreme-heat week. Roads, rooftops and dense blocks soak up heat and hold on to it. Some streets have trees and shade, others have almost none. Outdoor workers, older residents and families in poorly cooled homes can escape the heat in very different ways.
          </p>

          <p>
            Now give that city a fixed budget. Should it plant trees, install cool roofs, add shade at bus stops, open cooling centres, or spend it in a different neighbourhood altogether? Which areas combine the most heat with the most people? How far should an official trust a satellite-derived map? And how does anyone explain the choice to the people it affects?
          </p>

          <p>
            A heat map cannot answer any of that on its own.
          </p>

          <p>
            The scale is why these decisions matter. The World Health Organization estimates that about <strong>489,000 heat-related deaths</strong> occurred each year worldwide between 2000 and 2019, with around 45% of them in Asia. The 2024 Lancet Countdown reported that heat-related mortality among people over 65 was <strong>167% higher in 2023</strong> than in the 1990s.
          </p>
        </div>

        {/* Global Statistics Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="p-5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
            <strong className="block font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--accent)] mb-1">
              489,000
            </strong>
            <p className="font-reading text-base text-[var(--ink)] leading-snug mb-1">
              Estimated heat-related deaths per year worldwide (2000 to 2019). Around 45% occurred in Asia.
            </p>
            <small className="font-mono text-xs text-[var(--muted)] block">
              Source: WHO, Heat and Health Factsheet
            </small>
          </div>

          <div className="p-5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
            <strong className="block font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--accent)] mb-1">
              +167%
            </strong>
            <p className="font-reading text-base text-[var(--ink)] leading-snug mb-1">
              Heat-related mortality increase among people aged 65 and older in 2023 compared to 1990s baseline.
            </p>
            <small className="font-mono text-xs text-[var(--muted)] block">
              Source: 2024 Lancet Countdown on Health and Climate Change
            </small>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--soft)] border-l-4 border-[var(--accent)] my-6">
          <p className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] leading-snug m-0">
            "When resources are limited and heat exposure is uneven, how can a city make its cooling decisions more targeted, explainable and accountable?"
          </p>
        </div>

        <div className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl">
          <p>
            The planning gap is acute across Indian cities. A 2023 Centre for Policy Research assessment examined 37 heat action plans across 18 states and found widespread gaps in local context, vulnerability targeting, funding, and transparency. Indian cities do not lack heat-action ambition; turning plans into targeted, funded, and accountable physical action is what remains stubbornly difficult.
          </p>
          <p>
            Software will not solve urban heat or prevent heat deaths on its own. Urban Heat is decision support: it helps planners move from "where is it hot" to systematically comparing actions, budgets, trade-offs, and uncertainties.
          </p>
        </div>
      </section>

      {/* 3. The Workflow Section */}
      <section id="workflow" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 02 · The Workflow
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Why another heat dashboard is not enough
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          Satellite imagery, weather forecasts, land-cover rasters, and municipal plans already exist in abundance. The difficult part is connecting that information to a defensible capital decision. Urban Heat links six distinct stages into a closed decision loop:
        </p>

        {/* 6-Step Workflow Visual Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            {
              step: '01',
              title: 'Observe',
              color: 'var(--t1)',
              desc: 'Derive multi-scene Landsat land-surface temperature and urban features on a 500 m UTM grid.',
            },
            {
              step: '02',
              title: 'Prioritise',
              color: 'var(--t2)',
              desc: 'Combine hazard, exposure, and vulnerability into an inspectable relative ward risk ranking.',
            },
            {
              step: '03',
              title: 'Compare',
              color: 'var(--t3)',
              desc: 'Simulate physical cooling scenarios under published ranges, cell suitability, and tree growth ramps.',
            },
            {
              step: '04',
              title: 'Allocate',
              color: 'var(--t4)',
              desc: 'Optimize fixed budgets across competing efficiency (λ=0) and equity (λ=1) objectives.',
            },
            {
              step: '05',
              title: 'Explain',
              color: 'var(--t5)',
              desc: 'Generate grounded bilingual action briefs with automated number-verification safeguards.',
            },
            {
              step: '06',
              title: 'Audit',
              color: 'var(--t6)',
              desc: 'Maintain immutable lifecycle audit trails (draft -> approved -> implemented) and provenance labels.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-3.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-xs flex flex-col justify-between"
              style={{ borderTop: `4px solid ${item.color}` }}
            >
              <div>
                <span className="font-mono text-xs text-[var(--muted)] font-bold block mb-1">
                  Step {item.step}
                </span>
                <strong className="font-display font-bold text-base text-[var(--ink)] block mb-1.5">
                  {item.title}
                </strong>
                <p className="font-mono text-[11px] text-[var(--ink2)] leading-relaxed m-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Data Layer Section */}
      <section id="data" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 03 · Data Ingestion
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Building an evidence base from heterogeneous sources
        </h2>

        <div className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6 space-y-3">
          <p>
            The empirical real-data tier covers four major Indian urban agglomerations: <strong>New Delhi, Mumbai, Jaipur, and Bengaluru</strong>. Sixteen additional cities are accessible as synthetic previews so the workflow and interface can be audited. Those previews make no claim to real-world accuracy and stay labelled as synthetic previews in every view.
          </p>
          <p>
            Every dataset is resampled and block-averaged onto a common <strong>500-metre UTM fishnet grid</strong>. Across the four core cities, the pipeline produces <strong>19,681 usable empirical grid cells</strong> for model training and evaluation.
          </p>
        </div>

        {/* Data Sources Explorer Component */}
        <DataSourcesExplorer />

        {/* Surface Temperature Caveat Box */}
        <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--rule)] my-6 max-w-3xl font-mono text-xs space-y-1.5">
          <strong className="text-sm font-bold text-[var(--ink)] block">
            Core Distinction · Surface Temperature is Not Human Heat Stress:
          </strong>
          <p className="text-[var(--ink2)] leading-relaxed m-0">
            Landsat satellites measure the thermal radiometric temperature of roofs, roads, and foliage. They do NOT measure the ambient 2-meter air temperature people breathe, their core body temperature, or personal physiological distress. Heat health risk also depends on wet-bulb temperature, humidity, direct solar radiation, housing quality, age, and hydration.
          </p>
        </div>
      </section>

      {/* 5. Geospatial Heat Map Section */}
      <section id="map" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 04 · Geospatial Map
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Observed Landsat Thermal Patterns and Hotspot Tiers
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          Explore the 500 m grid of observed land-surface temperatures. Click or hover any cell to inspect its thermal tier, satellite indices (NDVI, NDBI), terrain elevation, and suitability for interventions.
        </p>

        {/* Interactive Geospatial Map Component */}
        <GeospatialMap
          selectedCityId={selectedCityId}
          onSelectCity={onSelectCity}
        />
      </section>

      {/* 6. Model Evaluation Section */}
      <section id="model" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 05 · Model &amp; Evaluation
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          What the model learned, and where it misses
        </h2>

        <div className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6 space-y-3">
          <p>
            Urban Heat uses an XGBoost point estimator and two XGBoost quantile estimators (q10 and q90) to predict surface temperature per 500 m cell from 26 land-cover, built-form, terrain, population, and weather features.
          </p>
          <p>
            Because adjacent grid cells are strongly correlated, standard random cross-validation leaks spatial information and artificially flatters the model. We evaluate generalisation using <strong>leave-one-city-out cross-validation</strong>: train on three cities, score the fourth.
          </p>
        </div>

        {/* Interactive Model Evaluation Component */}
        <ModelEvaluation />

        <div className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mt-4">
          <p>
            <strong>The architectural takeaway:</strong> The spatial pattern transfers reliably (Pearson r 0.72 to 0.89), but absolute temperature levels carry a city-level offset (bias). Therefore, the system uses observed Landsat composites for hotspot classification, and relies on the model to fill unobserved gaps and calculate delta changes under intervention scenarios.
          </p>
        </div>
      </section>

      {/* 7. Driver Analysis Section */}
      <section id="drivers" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 06 · Driver Analysis
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          SHAP Analysis · Understanding Model Reliance
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          We use SHAP (SHapley Additive exPlanations) values to audit which urban features the model relies on most when predicting surface temperatures.
        </p>

        {/* Interactive SHAP Drivers Component */}
        <ShapDrivers />
      </section>

      {/* 8. Ward Risk Ranking Section */}
      <section id="ranking" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 07 · Ward Risk Ranking
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Turning Heat Maps into Accountable Ward Priorities
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          A temperature map only shows where surfaces are hot. Municipal action requires knowing where severe heat, large populations, and vulnerable living conditions intersect.
        </p>

        {/* Interactive Ward Risk Explorer Component */}
        <WardRiskExplorer />
      </section>

      {/* 9. Scenario Simulation Section */}
      <section id="scenarios" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 08 · Scenario Simulator
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Interactive Scenario Simulator · Testing What-If Actions
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          Slide the split curtain or adjust intervention intensities below to model how cool roofs, urban forestry, transit canopies, and cool pavements alter estimated surface temperatures.
        </p>

        {/* Interactive Scenario Simulator Component */}
        <ScenarioSimulator />
      </section>

      {/* 10. Budget and Equity Optimizer Section */}
      <section id="budget" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 09 · Budget &amp; Equity Optimizer
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Allocating Capital Under Fixed Budgets &amp; Equity Weights
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          Compare efficiency-first plans (maximizing cooling per rupee) against equity-weighted plans (maximizing cooling delivered to vulnerable residents) under identical municipal budgets.
        </p>

        {/* Interactive Budget Optimizer Component */}
        <BudgetOptimizer />
      </section>

      {/* 11. AI Heat Officer Section */}
      <section id="officer" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 10 · AI Heat Officer
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Grounded Bilingual Briefs with Automated Number Verification
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          The AI Heat Officer generates concise action briefs in English and Hindi. The language model is strictly confined to phrasing; all numerical figures are verified against tool execution logs.
        </p>

        {/* Interactive AI Heat Officer Component */}
        <HeatOfficerExplainer />
      </section>

      {/* 12. Citizen View Section */}
      <section id="citizens" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 11 · Citizen View
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Public Heat Alerts and Community Ground-Truth Reporting
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          An offline-first, mobile PWA view designed for outdoor laborers and community residents. Provides daily alerts, Hindi audio advisories, nearest cooling spaces, and anonymous street problem logging.
        </p>

        {/* Interactive Citizen View Mockup Component */}
        <CitizenViewMockup />
      </section>

      {/* 13. System Architecture Section */}
      <section id="aws" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 12 · System Architecture
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Serverless AWS Infrastructure · Connecting Satellite to Edge
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          Explore the 14 AWS service types defining the serverless stack across compute, storage, generative AI, scheduling, delivery, and cost guardrails.
        </p>

        {/* Interactive Architecture Explorer Component */}
        <ArchitectureExplorer />
      </section>

      {/* 14. Accountability Ledger Section */}
      <section id="accountability" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 13 · Accountability
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Designing for Scrutiny · The Five Provenance Categories
        </h2>

        <p className="font-reading text-lg text-[var(--ink2)] leading-relaxed max-w-3xl mb-6">
          A responsible climate decision system must transparently separate observed ground measurements from model outputs, assumed parameters, and verified real-world implementations.
        </p>

        {/* Interactive Accountability Ledger Component */}
        <AccountabilityLedger />
      </section>

      {/* 15. Engineering Lessons & Roadmap Section */}
      <section id="lessons" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 14 · Engineering Lessons
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Twelve Lessons That Reshaped How We Build
        </h2>

        {/* Interactive Engineering Lessons Component */}
        <EngineeringLessons />
      </section>

      {/* 16. References Section */}
      <section id="references" className="py-10 border-t border-[var(--ink)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
            Section 15 · References &amp; Citations
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-4">
          Academic, Institutional and Cloud References
        </h2>

        <ol className="space-y-2.5 font-reading text-sm text-[var(--ink2)] list-decimal pl-5">
          <li>
            World Health Organization (WHO). <a href="https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Climate change: heat and health</a> (2023).
          </li>
          <li>
            Romanello, M. et al. <a href="https://discovery.ucl.ac.uk/id/eprint/10200213/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">The 2024 report of the Lancet Countdown on health and climate change</a>.
          </li>
          <li>
            Pillai, A. V. and Dalal, T. <a href="https://ghhin.org/resources/how-is-india-adapting-to-heatwaves-an-assessment-of-heat-action-plans-with-insights-for-transformative-climate-action/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">How Is India Adapting to Heatwaves? An Assessment of Heat Action Plans</a>. Centre for Policy Research (2023).
          </li>
          <li>
            World Bank. <a href="https://www.worldbank.org/en/topic/urbandevelopment/publication/handbook-on-urban-heat-management-in-the-global-south" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Handbook on Urban Heat Management in the Global South</a> (2024).
          </li>
          <li>
            U.S. Geological Survey (USGS). <a href="https://www.usgs.gov/landsat-missions/landsat-collection-2-surface-temperature" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Landsat Collection 2 Surface Temperature Algorithm and Specifications</a>.
          </li>
          <li>
            U.S. Environmental Protection Agency (EPA). <a href="https://www.epa.gov/heatislands/heat-island-compendium" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Reducing Urban Heat Islands: Compendium of Strategies</a>.
          </li>
          <li>
            Amazon Location Service Developer Guide. <a href="https://docs.aws.amazon.com/location/latest/developerguide/monochrome-map-style.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Monochrome map style</a>.
          </li>
          <li>
            Amazon Bedrock User Guide. <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Knowledge Bases for Amazon Bedrock</a>.
          </li>
          <li>
            Urban Heat Mitigation Project. <a href="https://github.com/Zephyrex21/urban-heat-mitigation" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Open Source Repository</a>.
          </li>
        </ol>

        {/* Footer Statement */}
        <footer className="mt-12 pt-6 border-t border-[var(--rule)] font-mono text-xs text-[var(--muted)] leading-relaxed">
          <p className="m-0">
            <strong>Urban Heat</strong> · Built for Environmental Hacks, Heat &amp; Water track · AWS Builder Center. All data figures represent documented project metrics dated 10 October 2026. Land-surface temperature is not air temperature or heat stress. Estimated cooling results are modelled scenario projections, not measured outcomes.
          </p>
        </footer>
      </section>
    </article>
    </div>
  );
};

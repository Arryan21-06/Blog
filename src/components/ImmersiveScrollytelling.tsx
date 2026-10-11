import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Users,
  ShieldAlert,
  Layers,
  ArrowDown,
  Compass,
  CheckCircle2,
  ChevronRight,
  Eye,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { HEAT_TIERS } from '../data/urbanHeatData';

interface ImmersiveScrollytellingProps {
  onJumpToSimulator: () => void;
  onJumpToMap: () => void;
}

export const ImmersiveScrollytelling: React.FC<ImmersiveScrollytellingProps> = ({
  onJumpToSimulator,
  onJumpToMap,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const scrollyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollyRef.current) return;
      const rect = scrollyRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      
      if (rect.top <= 0 && rect.bottom >= 0 && totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));
        // Map progress to 5 steps (0 to 1 -> 1 to 5)
        const step = Math.min(5, Math.max(1, Math.floor(progress * 5) + 1));
        setActiveStep(step);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters = [
    {
      step: 1,
      badge: 'Chapter 1 · Observe',
      title: 'The Full Satellite Thermal Footprint',
      text: 'On hot-season afternoons across the National Capital Territory, land surfaces reach temperatures that human skin cannot endure. Through Landsat 8/9 thermal infrared sensors (Band 10, April–June 2026), we observe the 1,484 km² urban expanse mapped onto a 500-metre UTM grid. Mean surface temperature is 43.9°C; the peak exceeds 58.1°C.',
      annotation: 'Full 500 m UTM grid · Mean LST 43.9°C · UHI +8.6°C',
    },
    {
      step: 2,
      badge: 'Chapter 2 · Identify',
      title: 'Spotlighting the Critical Hotspots',
      text: 'Heat is severely concentrated. In the industrial and high-impervious corridors of the west and northwest—Mundka, Nangloi, Narela, and the Bahadurgarh border—surface temperatures surge past 48°C (Tier 6: Critical Hotspot). Meanwhile, the Yamuna riverbed and the Central Ridge remain 12°C to 15°C cooler.',
      annotation: 'Critical Hotspot clusters (>48°C) highlighted in West and Northwest Delhi',
    },
    {
      step: 3,
      badge: 'Chapter 3 · Understand',
      title: 'Surface Temperature vs. Air Temperature',
      text: 'A satellite does not measure what a pedestrian feels. Land-surface temperature (LST) records the radiative energy emitted by asphalt, tin roofs, and masonry—often 10°C to 16°C hotter than ambient air. In dense settlements without ventilation, this radiative heat is re-emitted into bedrooms overnight.',
      annotation: 'Ambient Air Temp: 42.4°C vs. Radiative Surface Temp: 56.4°C–58.1°C',
    },
    {
      step: 4,
      badge: 'Chapter 4 · Prioritise',
      title: 'Where Heat Collides with People',
      text: 'An extreme temperature in an empty railyard is an engineering puzzle. An extreme temperature in a dense informal settlement is a humanitarian emergency. Urban Heat combines hazard with Meta HRSL population exposure and vulnerability proxies (density, green deficit, crowding) into an actionable 0–100 index.',
      annotation: 'Zone 2-1 (East Delhi corridor): Composite Risk 96.4/100 · 68,400 residents',
    },
    {
      step: 5,
      badge: 'Chapter 5 · Intervene',
      title: 'From Observation to Capital Allocation',
      text: 'A heat map only diagnoses; it does not cool. With limited municipal funds, should New Delhi coat 25,000 rooftops with high-albedo paint, plant native micro-forests along the Ring Road, or build transit shade canopies? We test these trade-offs with our interactive scenario simulator.',
      annotation: 'Interventions modelled: Cool Roofs (-1.5°C), Trees (-3.0°C), Transit Shade (-2.0°C)',
    },
  ];

  return (
    <div className="w-full">
      {/* =========================================================================
          SCENE 1: THE CITY AND THE HEAT (FULL-VIEWPORT LAYERED COMPOSITION)
         ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden border-b border-[var(--rule)] bg-[#0d1420] text-white">
        {/* Layer 1: Background Atmospheric Map Visual */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full object-cover opacity-85"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="New Delhi Urban Heat Map - Observed Satellite Composite"
          >
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#0a101d" stop-opacity="1" />
              </radialGradient>
              <filter id="heatBloom">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Background */}
            <rect width="1200" height="800" fill="url(#mapGlow)" />

            {/* Regional Map Road Network & Surrounding Town Grid (NCR Context) */}
            <g stroke="#334155" strokeWidth="1" opacity="0.4" fill="none">
              <path d="M 150 100 L 450 350 L 580 400 L 900 480 L 1100 520" />
              <path d="M 450 50 L 480 300 L 520 450 L 600 750" />
              <path d="M 200 400 L 500 420 L 750 430 L 1050 400" />
              <path d="M 300 700 L 520 500 L 650 300 L 800 150" />
              <circle cx="580" cy="400" r="280" stroke="#1e293b" strokeDasharray="4 4" />
            </g>

            {/* Yamuna River Corridor (Cool Blue Ribbons) */}
            <path
              d="M 640 100 Q 660 220 650 320 T 680 440 T 730 600 T 780 750"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="10"
              opacity="0.75"
              strokeLinecap="round"
            />
            <path
              d="M 640 100 Q 660 220 650 320 T 680 440 T 730 600 T 780 750"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              opacity="0.9"
            />

            {/* Delhi Territory Polygon Boundary (Accurate Geometric Contour) */}
            <g transform="translate(100, 30)">
              {/* Outer Shadow */}
              <polygon
                points="420,120 490,140 550,220 580,310 650,330 670,420 610,500 560,540 540,620 480,660 460,590 380,540 280,520 220,490 200,430 250,380 320,310 360,200"
                fill="#0f172a"
                stroke="#475569"
                strokeWidth="2.5"
                opacity="0.9"
              />

              {/* 500m Grid Cell Tessellation (Matching Screenshot Heat Clusters) */}
              {/* WEST & NORTHWEST: CRITICAL & HIGH (Red/Orange Clusters) */}
              <g fill="#e0301e" stroke="#1e293b" strokeWidth="0.75" opacity="0.95">
                {/* Mundka / Nangloi / Bahadurgarh border */}
                <rect x="230" y="420" width="18" height="18" rx="2" />
                <rect x="250" y="420" width="18" height="18" rx="2" />
                <rect x="230" y="440" width="18" height="18" rx="2" />
                <rect x="250" y="440" width="18" height="18" rx="2" />
                <rect x="270" y="440" width="18" height="18" rx="2" />
                <rect x="250" y="460" width="18" height="18" rx="2" />
                <rect x="270" y="460" width="18" height="18" rx="2" />
                <rect x="290" y="460" width="18" height="18" rx="2" />
                <rect x="270" y="480" width="18" height="18" rx="2" />
                <rect x="290" y="480" width="18" height="18" rx="2" />
                <rect x="310" y="460" width="18" height="18" rx="2" />
                <rect x="330" y="440" width="18" height="18" rx="2" />
                {/* North west industrial */}
                <rect x="330" y="300" width="18" height="18" rx="2" />
                <rect x="350" y="300" width="18" height="18" rx="2" />
                <rect x="330" y="320" width="18" height="18" rx="2" />
                <rect x="350" y="320" width="18" height="18" rx="2" />
                <rect x="370" y="320" width="18" height="18" rx="2" />
                <rect x="370" y="340" width="18" height="18" rx="2" />
                <rect x="390" y="320" width="18" height="18" rx="2" />
                <rect x="410" y="300" width="18" height="18" rx="2" />
                <rect x="430" y="280" width="18" height="18" rx="2" />
              </g>

              {/* HIGH TIER (Orange #f48a1f) */}
              <g fill="#f48a1f" stroke="#1e293b" strokeWidth="0.75" opacity="0.95">
                <rect x="210" y="420" width="18" height="18" rx="2" />
                <rect x="290" y="440" width="18" height="18" rx="2" />
                <rect x="310" y="440" width="18" height="18" rx="2" />
                <rect x="330" y="460" width="18" height="18" rx="2" />
                <rect x="350" y="440" width="18" height="18" rx="2" />
                <rect x="370" y="420" width="18" height="18" rx="2" />
                <rect x="390" y="340" width="18" height="18" rx="2" />
                <rect x="410" y="320" width="18" height="18" rx="2" />
                <rect x="410" y="340" width="18" height="18" rx="2" />
                <rect x="430" y="300" width="18" height="18" rx="2" />
                <rect x="430" y="320" width="18" height="18" rx="2" />
                <rect x="450" y="280" width="18" height="18" rx="2" />
                <rect x="450" y="260" width="18" height="18" rx="2" />
                <rect x="470" y="240" width="18" height="18" rx="2" />
                <rect x="490" y="220" width="18" height="18" rx="2" />
                <rect x="370" y="220" width="18" height="18" rx="2" />
                <rect x="390" y="200" width="18" height="18" rx="2" />
              </g>

              {/* MODERATE TIER (Yellow #f0be1a) */}
              <g fill="#f0be1a" stroke="#1e293b" strokeWidth="0.75" opacity="0.9">
                <rect x="350" y="380" width="18" height="18" rx="2" />
                <rect x="370" y="380" width="18" height="18" rx="2" />
                <rect x="390" y="380" width="18" height="18" rx="2" />
                <rect x="370" y="400" width="18" height="18" rx="2" />
                <rect x="390" y="400" width="18" height="18" rx="2" />
                <rect x="410" y="400" width="18" height="18" rx="2" />
                <rect x="430" y="380" width="18" height="18" rx="2" />
                <rect x="430" y="400" width="18" height="18" rx="2" />
                <rect x="450" y="380" width="18" height="18" rx="2" />
                <rect x="470" y="340" width="18" height="18" rx="2" />
                <rect x="490" y="320" width="18" height="18" rx="2" />
                <rect x="510" y="300" width="18" height="18" rx="2" />
                <rect x="530" y="260" width="18" height="18" rx="2" />
                <rect x="410" y="240" width="18" height="18" rx="2" />
                <rect x="430" y="220" width="18" height="18" rx="2" />
                <rect x="450" y="180" width="18" height="18" rx="2" />
                <rect x="470" y="160" width="18" height="18" rx="2" />
              </g>

              {/* NORMAL TIER (Green #2fa24f - Central / South / Parks) */}
              <g fill="#2fa24f" stroke="#1e293b" strokeWidth="0.75" opacity="0.9">
                <rect x="430" y="420" width="18" height="18" rx="2" />
                <rect x="450" y="420" width="18" height="18" rx="2" />
                <rect x="470" y="400" width="18" height="18" rx="2" />
                <rect x="470" y="420" width="18" height="18" rx="2" />
                <rect x="490" y="400" width="18" height="18" rx="2" />
                <rect x="490" y="420" width="18" height="18" rx="2" />
                <rect x="510" y="400" width="18" height="18" rx="2" />
                <rect x="510" y="420" width="18" height="18" rx="2" />
                <rect x="450" y="460" width="18" height="18" rx="2" />
                <rect x="470" y="460" width="18" height="18" rx="2" />
                <rect x="450" y="480" width="18" height="18" rx="2" />
                <rect x="470" y="480" width="18" height="18" rx="2" />
                <rect x="490" y="480" width="18" height="18" rx="2" />
                <rect x="490" y="500" width="18" height="18" rx="2" />
                <rect x="510" y="500" width="18" height="18" rx="2" />
                <rect x="530" y="520" width="18" height="18" rx="2" />
                <rect x="510" y="540" width="18" height="18" rx="2" />
              </g>

              {/* COOL TIER (Blue #3b6fe0 - Along Yamuna river / Ridge) */}
              <g fill="#3b6fe0" stroke="#1e293b" strokeWidth="0.75" opacity="0.95">
                <rect x="530" y="340" width="18" height="18" rx="2" />
                <rect x="550" y="340" width="18" height="18" rx="2" />
                <rect x="530" y="360" width="18" height="18" rx="2" />
                <rect x="550" y="360" width="18" height="18" rx="2" />
                <rect x="550" y="380" width="18" height="18" rx="2" />
                <rect x="570" y="380" width="18" height="18" rx="2" />
                <rect x="550" y="400" width="18" height="18" rx="2" />
                <rect x="570" y="400" width="18" height="18" rx="2" />
                <rect x="550" y="420" width="18" height="18" rx="2" />
                <rect x="570" y="420" width="18" height="18" rx="2" />
                <rect x="530" y="440" width="18" height="18" rx="2" />
                <rect x="550" y="440" width="18" height="18" rx="2" />
                <rect x="570" y="440" width="18" height="18" rx="2" />
                <rect x="530" y="460" width="18" height="18" rx="2" />
                <rect x="550" y="460" width="18" height="18" rx="2" />
                <rect x="530" y="480" width="18" height="18" rx="2" />
                <rect x="550" y="480" width="18" height="18" rx="2" />
                <rect x="510" y="440" width="18" height="18" rx="2" />
              </g>
            </g>

            {/* Geographical Place Names & Labels (Matching Screenshot) */}
            <g font-family="monospace" font-size="11" fill="#cbd5e1" font-weight="bold" opacity="0.85">
              <text x="320" y="450">BAHADURGARH</text>
              <text x="460" y="270">KHARKHODA</text>
              <text x="540" y="180">SONIPAT</text>
              <text x="680" y="90">BARAUT</text>
              <text x="690" y="200">Baghpat</text>
              <text x="760" y="415">Loni</text>
              <text x="860" y="480">GHAZIABAD</text>
              <text x="800" y="610">NOIDA</text>
              <text x="960" y="640">GREATER NOIDA</text>
              <text x="1000" y="690">Dadri</text>
              <text x="780" y="770">FARIDABAD</text>
              <text x="440" y="740">GURGAON</text>
              <text x="320" y="790">MANESAR</text>
              <text x="650" y="540" fill="#ffffff" font-size="14" font-weight="900">
                NEW DELHI
              </text>
            </g>
          </svg>
        </div>

        {/* Layer 2: Editorial Header Bar (Floating Top) */}
        <div className="relative z-10 w-full p-4 sm:p-6 flex justify-between items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL SATELLITE DATA · LANDSAT 8/9 C2 L2</span>
          </div>

          {/* Floating Metric Card (Matching Exactly the Screenshot in Top Right) */}
          <div className="hidden md:block w-72 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 shadow-2xl font-mono text-xs text-slate-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <strong className="text-sm font-bold text-white block">New Delhi, Delhi</strong>
                <span className="text-[10px] text-slate-400">APR–JUN 2026</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-slate-300 border border-slate-700">
                OBSERVED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">MEAN LST</span>
                <strong className="text-sm text-white font-bold">43.9 °C</strong>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">MAX LST</span>
                <strong className="text-sm text-red-500 font-bold">58.1 °C</strong>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">HOTSPOT AREA</span>
                <strong className="text-sm text-amber-500 font-bold">252.0 km²</strong>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">UHI INTENSITY</span>
                <strong className="text-sm text-orange-400 font-bold">+8.6 °C</strong>
              </div>
            </div>

            {/* Heat Tiers Legend in Screenshot */}
            <div className="border-t border-slate-700 pt-2 text-[10px]">
              <span className="text-slate-400 block mb-1.5 font-bold">HEAT TIERS</span>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#e0301e]" /> Critical (&gt;48°)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f48a1f]" /> High (45–48°)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f0be1a]" /> Moderate (42–45°)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2fa24f]" /> Normal (36–42°)</span>
                <span className="flex items-center gap-1.5 col-span-2"><span className="w-2 h-2 rounded-full bg-[#3b6fe0]" /> Cool / Water (&lt;36°)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: The Headline & Story Entry (Layered in Lower Third without obscuring central map) */}
        <div className="relative z-10 max-w-4xl p-6 sm:p-10 mb-2">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
            GEOSPATIAL CLIMATE INVESTIGATION
          </span>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white drop-shadow-md mb-4">
            THE CITY IS HEATING UP. WHERE SHOULD WE ACT FIRST?
          </h1>
          <p className="font-reading text-lg sm:text-2xl text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm mb-6">
            From satellite observations to explainable, budget-aware urban cooling decisions.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#scrolly-story"
              className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Scroll to Begin Story</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <button
              onClick={onJumpToSimulator}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-medium backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Jump to Simulator</span>
            </button>
            <button
              onClick={onJumpToMap}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-medium backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Open Map Explorer</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Ambient Scroll Invite */}
        <div className="relative z-10 w-full py-2.5 px-6 bg-black/70 backdrop-blur-md border-t border-white/10 flex justify-between items-center font-mono text-xs text-slate-400">
          <span>4 Cities Real Data · 500 m UTM Fishnet · 19,681 Training Cells</span>
          <span className="flex items-center gap-1 text-slate-300">
            Scroll down to explore <ArrowDown className="w-3 h-3" />
          </span>
        </div>
      </section>

      {/* =========================================================================
          SCENE 2 & 3: SCROLL-DRIVEN MAP TRANSFORMATION (THE PUDDING STYLE)
         ========================================================================= */}
      <section id="scrolly-story" ref={scrollyRef} className="relative w-full bg-[var(--bg)] text-[var(--ink)]">
        {/* Sticky Visual Backdrop / Map Viewport */}
        <div className="sticky top-12 h-[88vh] w-full flex items-center justify-center p-4 z-10 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full max-w-5xl rounded-2xl border border-[var(--rule)] bg-[var(--surface)] shadow-lg overflow-hidden flex flex-col justify-between">
            {/* Top Bar for Sticky Map */}
            <div className="p-3 bg-[var(--soft)]/80 backdrop-blur-xs border-b border-[var(--rule)] flex justify-between items-center font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <strong className="text-[var(--ink)]">New Delhi 500 m Grid</strong>
                <span className="text-[var(--muted)]">· {chapters[activeStep - 1].badge}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]">
                State {activeStep} of 5
              </span>
            </div>

            {/* Dynamic Canvas / SVG Map Viewport that morphs based on activeStep */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4">
              <svg
                viewBox="0 0 600 500"
                className="w-full h-full max-h-[500px] transition-transform duration-700 ease-out"
                style={{
                  transform:
                    activeStep === 1
                      ? 'scale(1) translate(0, 0)'
                      : activeStep === 2
                      ? 'scale(1.35) translate(40px, -20px)' // Zoom into Western/Northwestern hotspot cluster
                      : activeStep === 3
                      ? 'scale(1.15) translate(-20px, 0)'
                      : activeStep === 4
                      ? 'scale(1.25) translate(-40px, -10px)' // Focus on dense population corridors
                      : 'scale(1.1) translate(0, 0)',
                }}
              >
                {/* River Yamuna */}
                <path
                  d="M 330 60 Q 345 150 335 220 T 360 300 T 390 400 T 420 480"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="8"
                  opacity={activeStep === 3 ? 1 : 0.6}
                />

                {/* Delhi Boundary */}
                <polygon
                  points="230,80 280,100 320,150 340,210 380,220 400,280 360,340 330,370 320,430 280,450 270,400 220,370 160,350 120,330 110,290 140,250 180,210 200,140"
                  fill="var(--soft)"
                  stroke="var(--rule)"
                  strokeWidth="2"
                  opacity="0.8"
                />

                {/* Heat Grid Clusters with dynamic highlighting per step */}
                {/* WESTERN HOTSPOTS (Mundka / Najafgarh / Bahadurgarh border) */}
                <g
                  fill="#e0301e"
                  opacity={activeStep === 2 || activeStep === 4 ? 1 : 0.85}
                  stroke={activeStep === 2 ? '#ffffff' : 'var(--ink)'}
                  strokeWidth={activeStep === 2 ? 1.5 : 0.5}
                >
                  <rect x="130" y="280" width="16" height="16" rx="2" />
                  <rect x="150" y="280" width="16" height="16" rx="2" />
                  <rect x="130" y="300" width="16" height="16" rx="2" />
                  <rect x="150" y="300" width="16" height="16" rx="2" />
                  <rect x="170" y="300" width="16" height="16" rx="2" />
                  <rect x="150" y="320" width="16" height="16" rx="2" />
                  <rect x="170" y="320" width="16" height="16" rx="2" />
                  <rect x="190" y="300" width="16" height="16" rx="2" />
                  <rect x="190" y="320" width="16" height="16" rx="2" />
                  <rect x="210" y="280" width="16" height="16" rx="2" />
                </g>

                {/* NORTHWEST CLUSTER */}
                <g fill="#f48a1f" opacity={activeStep === 2 ? 1 : 0.85}>
                  <rect x="190" y="200" width="16" height="16" rx="2" />
                  <rect x="210" y="200" width="16" height="16" rx="2" />
                  <rect x="190" y="220" width="16" height="16" rx="2" />
                  <rect x="210" y="220" width="16" height="16" rx="2" />
                  <rect x="230" y="220" width="16" height="16" rx="2" />
                  <rect x="230" y="240" width="16" height="16" rx="2" />
                  <rect x="250" y="220" width="16" height="16" rx="2" />
                </g>

                {/* MODERATE / CENTRAL */}
                <g fill="#f0be1a" opacity={activeStep === 2 ? 0.4 : 0.85}>
                  <rect x="220" y="260" width="16" height="16" rx="2" />
                  <rect x="240" y="260" width="16" height="16" rx="2" />
                  <rect x="260" y="260" width="16" height="16" rx="2" />
                  <rect x="240" y="280" width="16" height="16" rx="2" />
                  <rect x="260" y="280" width="16" height="16" rx="2" />
                  <rect x="280" y="260" width="16" height="16" rx="2" />
                  <rect x="280" y="240" width="16" height="16" rx="2" />
                  <rect x="300" y="220" width="16" height="16" rx="2" />
                </g>

                {/* CENTRAL PARKS / SOUTH GREEN */}
                <g fill="#2fa24f" opacity={activeStep === 2 ? 0.35 : 0.9}>
                  <rect x="260" y="300" width="16" height="16" rx="2" />
                  <rect x="280" y="300" width="16" height="16" rx="2" />
                  <rect x="300" y="300" width="16" height="16" rx="2" />
                  <rect x="280" y="320" width="16" height="16" rx="2" />
                  <rect x="300" y="320" width="16" height="16" rx="2" />
                  <rect x="320" y="320" width="16" height="16" rx="2" />
                  <rect x="300" y="350" width="16" height="16" rx="2" />
                  <rect x="320" y="350" width="16" height="16" rx="2" />
                  <rect x="310" y="380" width="16" height="16" rx="2" />
                </g>

                {/* YAMUNA RIVER CORRIDOR COOL CELLS */}
                <g fill="#3b6fe0" opacity={activeStep === 3 ? 1 : 0.85}>
                  <rect x="330" y="240" width="16" height="16" rx="2" />
                  <rect x="345" y="240" width="16" height="16" rx="2" />
                  <rect x="340" y="260" width="16" height="16" rx="2" />
                  <rect x="355" y="260" width="16" height="16" rx="2" />
                  <rect x="350" y="280" width="16" height="16" rx="2" />
                  <rect x="365" y="280" width="16" height="16" rx="2" />
                  <rect x="370" y="320" width="16" height="16" rx="2" />
                  <rect x="385" y="320" width="16" height="16" rx="2" />
                  <rect x="390" y="360" width="16" height="16" rx="2" />
                  <rect x="405" y="360" width="16" height="16" rx="2" />
                </g>

                {/* Chapter 2: Pulsing Target Rings on Western Critical Hotspots */}
                {activeStep === 2 && (
                  <g>
                    <circle cx="160" cy="300" r="32" fill="none" stroke="#e0301e" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="160" y="258" font-family="monospace" font-size="10" fill="#e0301e" font-weight="bold" text-anchor="middle">
                      CRITICAL HOTSPOT: 48.6°C–58.1°C
                    </text>
                  </g>
                )}

                {/* Chapter 3: Thermal Contrast Arrows (LST vs Ambient Air) */}
                {activeStep === 3 && (
                  <g font-family="monospace" font-size="10" font-weight="bold">
                    <rect x="40" y="40" width="190" height="48" rx="6" fill="var(--surface)" stroke="var(--rule)" />
                    <text x="50" y="60" fill="var(--ink)">Ambient Air: 42.4°C</text>
                    <text x="50" y="78" fill="var(--crit)">Radiative Surface: 58.1°C</text>
                    <line x1="200" y1="88" x2="160" y2="300" stroke="var(--crit)" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                )}

                {/* Chapter 4: Population Vulnerability Overlay */}
                {activeStep === 4 && (
                  <g font-family="monospace" font-size="10" font-weight="bold">
                    <circle cx="340" cy="270" r="26" fill="#e0301e" opacity="0.3" />
                    <circle cx="340" cy="270" r="16" fill="#e0301e" opacity="0.5" />
                    <text x="340" y="240" fill="var(--ink)" text-anchor="middle">
                      Zone 2-1: 68,400 People
                    </text>
                    <text x="340" y="252" fill="var(--crit)" text-anchor="middle">
                      Risk Score: 96.4/100
                    </text>
                  </g>
                )}

                {/* Chapter 5: Cooling Action Markers */}
                {activeStep === 5 && (
                  <g font-family="monospace" font-size="9" font-weight="bold">
                    <g transform="translate(140, 270)">
                      <rect x="0" y="0" width="90" height="20" rx="4" fill="var(--s1)" />
                      <text x="45" y="14" fill="#ffffff" text-anchor="middle">COOL ROOFS -1.5°</text>
                    </g>
                    <g transform="translate(240, 310)">
                      <rect x="0" y="0" width="85" height="20" rx="4" fill="var(--s3)" />
                      <text x="42" y="14" fill="#ffffff" text-anchor="middle">TREE COVER -3.0°</text>
                    </g>
                    <g transform="translate(320, 240)">
                      <rect x="0" y="0" width="85" height="20" rx="4" fill="var(--s4)" />
                      <text x="42" y="14" fill="#ffffff" text-anchor="middle">TRANSIT SHADE</text>
                    </g>
                  </g>
                )}

                {/* Geography Landmarks */}
                <g font-family="monospace" font-size="9" fill="var(--muted)" font-weight="bold">
                  <text x="100" y="310">BAHADURGARH</text>
                  <text x="250" y="100">SONIPAT</text>
                  <text x="420" y="320">NOIDA</text>
                  <text x="370" y="440">FARIDABAD</text>
                  <text x="180" y="430">GURGAON</text>
                </g>
              </svg>
            </div>

            {/* Bottom Sticky Status Badge */}
            <div className="p-3 bg-[var(--soft)]/80 backdrop-blur-xs border-t border-[var(--rule)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs">
              <span className="text-[var(--ink)] font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>{chapters[activeStep - 1].annotation}</span>
              </span>
              <span className="text-[10px] text-[var(--muted)]">
                Scroll down to advance narrative chapters
              </span>
            </div>
          </div>
        </div>

        {/* Foreground Scrolling Text Narrative Cards (The Pudding Scrollytelling Panels) */}
        <div className="relative z-20 max-w-xl ml-auto mr-4 sm:mr-8 md:mr-16 space-y-[65vh] pt-[15vh] pb-[25vh]">
          {chapters.map((chap) => {
            const isCurrent = activeStep === chap.step;
            return (
              <div
                key={chap.step}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 shadow-xl backdrop-blur-md ${
                  isCurrent
                    ? 'bg-[var(--surface)]/95 border-[var(--accent)] ring-1 ring-[var(--accent)]/30 scale-100 opacity-100'
                    : 'bg-[var(--surface)]/75 border-[var(--rule)] scale-95 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                    {chap.badge}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {chap.step} / 5
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  {chap.title}
                </h3>

                <p className="font-reading text-base text-[var(--ink2)] leading-relaxed m-0">
                  {chap.text}
                </p>

                {/* Interactive Action Hook on Chapter 5 */}
                {chap.step === 5 && (
                  <div className="mt-4 pt-3 border-t border-[var(--rule)] flex items-center gap-3">
                    <button
                      onClick={onJumpToSimulator}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Launch Before/After Simulator</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

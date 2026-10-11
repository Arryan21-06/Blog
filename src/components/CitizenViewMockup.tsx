import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  MapPin,
  AlertTriangle,
  Droplets,
  TreePine,
  Shield,
  Send,
  CheckCircle2,
  Languages,
} from 'lucide-react';

export const CitizenViewMockup: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedReportType, setSelectedReportType] = useState<string>('no_shade');
  const [reportNote, setReportNote] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const coolingPlaces = [
    {
      name: lang === 'en' ? 'Mother Dairy Community Park' : 'मदर डेयरी कम्युनिटी पार्क',
      type: lang === 'en' ? 'Shaded Green Space' : 'छायादार पार्क',
      dist: '180m',
      verified: true,
      drinkingWater: true,
    },
    {
      name: lang === 'en' ? 'Anand Vihar Transit Terminal Hall' : 'आनंद विहार बस टर्मिनल हॉल',
      type: lang === 'en' ? 'Cooled Public Hall' : 'शीतल सार्वजनिक हॉल',
      dist: '320m',
      verified: true,
      drinkingWater: true,
    },
    {
      name: lang === 'en' ? 'Shakarpur Municipal Dispensary' : 'शकरपुर नगर निगम डिस्पेंसरी',
      type: lang === 'en' ? 'Medical / Hydration' : 'चिकित्सा / ओआरएस',
      dist: '450m',
      verified: false,
      drinkingWater: false,
    },
  ];

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportNote('');
    }, 3500);
  };

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Public Citizen Portal · /citizen PWA
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Offline-first mobile application shell with local caching (sw.js)
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Actionable Guidance for Residents and Outdoor Workers
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Phone Mockup Frame (5 cols) */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-[300px] rounded-[36px] border-4 border-[var(--ink)] bg-[var(--bg)] p-3 shadow-xl overflow-hidden relative">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-[var(--ink)] rounded-full mx-auto mb-3" />

            {/* In-App Language Toggle */}
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="font-mono text-[10px] font-bold text-[var(--accent)]">
                HEATRELIEF CITIZEN
              </span>
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink)] font-semibold border border-[var(--rule)]"
              >
                {lang === 'en' ? 'हिन्दी' : 'English'}
              </button>
            </div>

            {/* Daily Heat Status Card */}
            <div className="p-3 rounded-xl bg-amber-500 text-white shadow-xs mb-3 font-mono">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold opacity-90">
                <span>{lang === 'en' ? 'TODAY IN DELHI' : 'आज दिल्ली में'}</span>
                <span>{lang === 'en' ? 'ORANGE ALERT' : 'ऑरेंज अलर्ट'}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="text-2xl font-bold">42.4 °C</strong>
                <span className="text-xs">{lang === 'en' ? 'Heat Index 45°' : 'हीट इंडेक्स 45°'}</span>
              </div>
              <p className="text-[11px] mt-1.5 opacity-95 leading-tight m-0">
                {lang === 'en'
                  ? 'Avoid direct outdoor labor between 12:00 and 15:00. Drink ORS / salted water.'
                  : 'दोपहर 12 से 3 बजे तक धूप से बचें। ओआरएस व पानी पिएं।'}
              </p>
            </div>

            {/* Audio Advisory Player Button */}
            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--rule)] mb-3 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0"
                  aria-label="Toggle audio advisory"
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <span className="block text-[11px] font-bold text-[var(--ink)]">
                    {lang === 'en' ? 'Hindi Spoken Advisory' : 'दैनिक हिंदी ऑडियो सलाह'}
                  </span>
                  <span className="text-[9px] text-[var(--muted)]">
                    {isPlayingAudio ? 'Playing Kajal (hi-IN)...' : 'Amazon Polly (Neural voice)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Nearest Cooling Spots Mini List */}
            <div className="mb-3 font-mono">
              <span className="text-[10px] font-bold text-[var(--muted)] uppercase block mb-1.5 px-1">
                {lang === 'en' ? 'NEAREST COOLING PLACES (OSM)' : 'निकटतम शीतलन स्थल'}
              </span>
              <div className="space-y-1.5">
                {coolingPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[var(--surface)] border border-[var(--rule)] text-[10px]"
                  >
                    <div className="flex justify-between items-baseline font-bold text-[var(--ink)]">
                      <span className="truncate">{place.name}</span>
                      <span className="text-[var(--accent)] shrink-0 ml-1">{place.dist}</span>
                    </div>
                    <div className="flex justify-between items-center text-[var(--muted)] mt-0.5">
                      <span>{place.type}</span>
                      <span className={place.verified ? 'text-emerald-600' : 'text-amber-600'}>
                        {place.verified ? '✓ Verified' : 'Unconfirmed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Problem Form Button */}
            <div className="p-2 rounded bg-[var(--soft)] border border-[var(--rule)] text-[10px] font-mono">
              <span className="font-bold text-[var(--ink)] block mb-1">
                {lang === 'en' ? 'Report a Street Heat Problem:' : 'समस्या की रिपोर्ट करें:'}
              </span>
              <div className="grid grid-cols-2 gap-1 mb-1.5">
                {[
                  { id: 'no_shade', label: lang === 'en' ? 'No Shade' : 'छाया नहीं' },
                  { id: 'no_water', label: lang === 'en' ? 'No Water' : 'पानी नहीं' },
                  { id: 'very_hot', label: lang === 'en' ? 'Very Hot' : 'अत्यधिक गर्मी' },
                  { id: 'cool_spot', label: lang === 'en' ? 'Cool Spot' : 'ठंडा स्थान' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedReportType(t.id)}
                    className={`py-1 rounded text-[9px] font-semibold transition-colors ${
                      selectedReportType === t.id
                        ? 'bg-[var(--ink)] text-white'
                        : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {reportSubmitted ? (
                <div className="p-1 text-center text-emerald-700 bg-emerald-100 rounded text-[9px] font-bold">
                  ✓ Report logged &amp; snapped to 500m cell!
                </div>
              ) : (
                <button
                  onClick={handleSubmitReport}
                  className="w-full py-1 rounded bg-[var(--accent)] text-white text-[9px] font-bold flex items-center justify-center gap-1"
                >
                  <Send className="w-2.5 h-2.5" />
                  <span>Submit Anonymous Report</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Explanatory Context & Privacy Requirements (7 cols) */}
        <div className="md:col-span-7 space-y-4 font-mono text-xs">
          <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/30 space-y-2">
            <strong className="text-sm font-bold text-[var(--ink)] block">
              Citizen Reporting Privacy &amp; Data Contract:
            </strong>
            <ul className="space-y-1.5 text-[var(--ink2)] leading-relaxed list-disc pl-4 m-0">
              <li>
                <strong>Spatial Cell Snapping:</strong> Reports are strictly snapped to the centroid of the 500 m grid cell. Exact GPS coordinate trails are never written to DynamoDB.
              </li>
              <li>
                <strong>Free-Text Review:</strong> Citizen notes are capped at 300 characters to prevent accidental leakage of personal identifiable information (PII).
              </li>
              <li>
                <strong>Image Expiry:</strong> Optional uploaded street photos receive presigned S3 URLs valid for 10 minutes and expire irreversibly after 90 days via S3 lifecycle rules.
              </li>
              <li>
                <strong>Zero Location Requirement:</strong> Citizens can view heat alerts and cooling spots without enabling device location permissions by picking their municipal zone.
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed">
            <strong>Facility Openness Caveat:</strong> Mapped OpenStreetMap cooling centres do not guarantee open gates, functional chilled water taps, or free access for informal workers. Facility status requires ground verification.
          </div>
        </div>
      </div>
    </div>
  );
};

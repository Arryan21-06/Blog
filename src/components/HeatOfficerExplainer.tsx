import React, { useState } from 'react';
import { AI_OFFICER_SAMPLE_BRIEF } from '../data/urbanHeatData';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Languages,
  Database,
  ShieldCheck,
  Bot,
  Terminal,
  RefreshCw,
} from 'lucide-react';

export const HeatOfficerExplainer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3);
  const [briefLang, setBriefLang] = useState<'en' | 'hi'>('en');
  const [showFactsDrawer, setShowFactsDrawer] = useState<boolean>(false);
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);

  const brief = AI_OFFICER_SAMPLE_BRIEF;

  const handleDownloadPdf = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      // Create a text download as clean fallback
      const blob = new Blob([`${brief.englishText}\n\n---\n\n${brief.hindiText}`], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HeatRelief_WardBrief_${brief.city}_${brief.zone.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 800);
  };

  const steps = [
    {
      step: 1,
      title: 'Tools Retrieve Facts',
      tag: 'Deterministic Code',
      icon: Database,
      desc: 'API tools fetch risk ranking, optimizer cost breakdown, 3 nearest OSM cooling spots, and forecast temperature/heat index.',
    },
    {
      step: 2,
      title: 'Agent Drafts Brief',
      tag: 'Language Model (Bedrock)',
      icon: Bot,
      desc: 'Strands agent on Amazon Bedrock drafts bilingual action brief (English + Hindi) under strict grounding prompt instructions.',
    },
    {
      step: 3,
      title: 'Number Verification',
      tag: 'Integrity Validator',
      icon: ShieldCheck,
      desc: 'Regex engine extracts every Arabic and Devanagari digit and asserts exact presence in the tool execution log.',
    },
    {
      step: 4,
      title: 'Deterministic Fallback',
      tag: 'Safety Guardrail',
      icon: Terminal,
      desc: 'If verification fails after 1 corrective retry or Bedrock is unavailable, deterministic template brief executes immediately.',
    },
  ];

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            AI Heat Officer · Grounded Language Layer
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            Strands Agents SDK on Amazon Bedrock + HarfBuzz Devanagari PDF
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Bilingual Explanations That Never Calculate the Numbers
        </h3>
      </div>

      {/* 4-Step Pipeline Flow Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 font-mono text-xs">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.step;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3.5 rounded border cursor-pointer transition-all ${
                isActive
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]/20 shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--soft)]/40 hover:bg-[var(--soft)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-semibold">
                  Step {s.step} · {s.tag}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`} />
              </div>
              <strong className="block text-[var(--ink)] font-bold text-sm mb-1">
                {s.title}
              </strong>
              <p className="text-[11px] text-[var(--ink2)] leading-relaxed m-0">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Brief Viewer Box */}
      <div className="rounded border border-[var(--rule)] bg-[var(--soft)]/30 p-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--rule)] mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--ink)] text-white">
                Source: {brief.source.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Numbers Verified: Passed
              </span>
            </div>
            <strong className="text-sm font-bold text-[var(--ink)] mt-1 block">
              Municipal Ward Action Brief: {brief.city} ({brief.zone})
            </strong>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded bg-[var(--surface)] border border-[var(--rule)] text-xs">
              <button
                onClick={() => setBriefLang('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  briefLang === 'en'
                    ? 'bg-[var(--ink)] text-white font-bold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setBriefLang('hi')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  briefLang === 'hi'
                    ? 'bg-[var(--ink)] text-white font-bold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={pdfGenerating}
              className="px-3 py-1.5 rounded bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{pdfGenerating ? 'Generating...' : 'Export Brief'}</span>
            </button>
          </div>
        </div>

        {/* Brief Text Display */}
        <div className="p-4 rounded bg-[var(--surface)] border border-[var(--rule)] my-3">
          <p
            className={`leading-relaxed m-0 ${
              briefLang === 'hi'
                ? 'font-reading text-base text-[var(--ink)]'
                : 'font-reading text-base text-[var(--ink)]'
            }`}
          >
            {briefLang === 'en' ? brief.englishText : brief.hindiText}
          </p>
        </div>

        {/* Provenance & Verified Facts Drawer Toggle */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
          <span>{brief.fallbackNote}</span>
          <button
            onClick={() => setShowFactsDrawer(!showFactsDrawer)}
            className="text-[var(--accent)] hover:underline font-semibold text-left"
          >
            {showFactsDrawer ? 'Hide Verified Facts Audit' : 'Inspect 10 Verified Fact Tokens ▼'}
          </button>
        </div>

        {/* Facts Audit Drawer */}
        {showFactsDrawer && (
          <div className="mt-3 pt-3 border-t border-[var(--rule)]">
            <span className="text-[11px] font-semibold text-[var(--ink)] block mb-2">
              Verified Numeric Fact Log (Extracted from Tool Responses):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {brief.vettedFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[var(--surface)] border border-[var(--rule)]"
                >
                  <span className="text-[var(--muted)]">{fact.label}:</span>
                  <span className="font-bold text-[var(--ink)] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

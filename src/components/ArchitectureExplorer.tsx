import React, { useState } from 'react';
import { AWS_NODES } from '../data/urbanHeatData';
import { AwsArchNode } from '../types/urbanHeat';
import { Cloud, Layers, Terminal, AlertCircle, Shield, CheckCircle2, Cpu } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<AwsArchNode>(AWS_NODES[2]); // Default Lambda API
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNodes = categoryFilter === 'all'
    ? AWS_NODES
    : AWS_NODES.filter((n) => n.category === categoryFilter);

  return (
    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs mb-8">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rule)] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-[var(--soft)] text-[var(--ink)]">
            Infrastructure as Code · Serverless Architecture
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            AWS SAM template (infra/template.yaml, 318 lines) · 14 AWS service types
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">
          Connecting Satellite Ingestion to Edge Delivery
        </h3>
      </div>

      {/* Path Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
        <span className="text-[var(--muted)] mr-1">Filter Path:</span>
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-2.5 py-1 rounded transition-colors ${
            categoryFilter === 'all'
              ? 'bg-[var(--ink)] text-white font-semibold'
              : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          All Components ({AWS_NODES.length})
        </button>
        <button
          onClick={() => setCategoryFilter('online')}
          className={`px-2.5 py-1 rounded transition-colors ${
            categoryFilter === 'online'
              ? 'bg-[var(--ink)] text-white font-semibold'
              : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          Online Request Path
        </button>
        <button
          onClick={() => setCategoryFilter('daily')}
          className={`px-2.5 py-1 rounded transition-colors ${
            categoryFilter === 'daily'
              ? 'bg-[var(--ink)] text-white font-semibold'
              : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          Daily Early-Warning
        </button>
        <button
          onClick={() => setCategoryFilter('operations')}
          className={`px-2.5 py-1 rounded transition-colors ${
            categoryFilter === 'operations'
              ? 'bg-[var(--ink)] text-white font-semibold'
              : 'bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          Operations &amp; Cost Guard
        </button>
      </div>

      {/* Grid of Architecture Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5 font-mono text-xs">
        {filteredNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3.5 rounded border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]/20 shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--soft)]/30 hover:bg-[var(--soft)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[var(--ink)]">{node.service}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]">
                  {node.category}
                </span>
              </div>
              <strong className="block text-[var(--ink)] text-xs mb-1">
                {node.name}
              </strong>
              <p className="text-[11px] text-[var(--ink2)] leading-relaxed line-clamp-2 m-0">
                {node.role}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      <div className="p-4 rounded border border-[var(--rule)] bg-[var(--soft)]/40 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[var(--rule)] mb-3">
          <div>
            <span className="text-[10px] uppercase text-[var(--muted)] font-semibold block">
              COMPONENT SPECIFICATION · {selectedNode.service}
            </span>
            <strong className="text-sm font-bold text-[var(--ink)]">
              {selectedNode.name}
            </strong>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--rule)]">
            SAM Resource: {selectedNode.samResource}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[var(--muted)] block text-[11px] mb-0.5">Role in Urban Heat:</span>
            <p className="text-[var(--ink)] leading-relaxed m-0">{selectedNode.role}</p>
          </div>
          <div>
            <span className="text-[var(--muted)] block text-[11px] mb-0.5">Implementation Module:</span>
            <code className="text-[var(--accent)] block bg-[var(--surface)] p-1.5 rounded border border-[var(--rule)] text-[11px]">
              {selectedNode.sourceModule}
            </code>
            <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed m-0">
              {selectedNode.details}
            </p>
          </div>
        </div>
      </div>

      {/* Deployment Status Truth Disclosure */}
      <div className="mt-4 p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-mono space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Operational Disclosure · Deployment Status as of 10 Oct 2026:</span>
        </div>
        <p className="m-0 leading-relaxed text-[11px]">
          The SAM infrastructure template (<code>infra/template.yaml</code>) validates with <code>cfn-lint</code> and 53 unit tests pass locally. However, <em>the AWS stack has not yet been deployed to a live account</em>, and the Bedrock agent path was verified against a mock. We do not claim an active live cloud deployment.
        </p>
      </div>
    </div>
  );
};

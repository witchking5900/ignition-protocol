"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict, LoreKey } from '../i18n/dictionary';
import { BookOpen } from 'lucide-react';

export default function LoreTooltip({ termKey, children }: { termKey: LoreKey, children: React.ReactNode }) {
  const { lang } = useSimulation();
  const text = dict[lang]?.lore?.[termKey] || dict.en.lore[termKey];

  return (
    <div className="group relative inline-flex items-center cursor-help">
      <span className="border-b border-dashed border-emerald-500/50 group-hover:border-emerald-400 group-hover:text-emerald-300 transition-colors">
        {children}
      </span>
      
      {/* The Hover Popup */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-[999]">
        <div className="bg-slate-950 border border-emerald-900/50 p-3 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.15)] text-left font-mono">
          <div className="flex items-center gap-2 mb-2 text-emerald-500">
            <BookOpen className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Academic Codex</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed normal-case whitespace-normal">
            {text}
          </p>
        </div>
        {/* Tooltip Arrow pointing down */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-900/50 absolute left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}
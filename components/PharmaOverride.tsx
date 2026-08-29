"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { Pill, ShieldPlus } from 'lucide-react';

export default function PharmaOverride() {
  const { 
    lang, addLog,
    nsaidCount, setNsaidCount, nsaidActive, setNsaidActive,
    steroidCount, setSteroidCount, steroidActive, setSteroidActive,
    setPermeability, setLeukocytes
  } = useSimulation();

  const t = dict[lang].pharma;
  const l = dict[lang].logs;

  const deployNSAID = () => {
    if (nsaidCount <= 0 || nsaidActive) return;
    setNsaidCount(0);
    setNsaidActive(true);
    addLog(l.nsaidDeployed, 'success');
    
    setTimeout(() => {
      setNsaidActive(false);
      addLog(l.nsaidMetabolized, 'warn');
    }, 15000);
  };

  const deploySteroid = () => {
    if (steroidCount <= 0 || steroidActive) return;
    setSteroidCount(0);
    setSteroidActive(true);
    
    setPermeability(0);
    setLeukocytes((prev) => Math.max(0, prev - 50));
    addLog(l.steroidDeployed, 'warn');
    
    setTimeout(() => {
      setSteroidActive(false);
    }, 15000);
  };

  return (
    <div className="w-full bg-slate-950 border border-indigo-900/50 p-4 rounded-lg font-mono">
      <div className="flex items-center gap-2 mb-4 text-indigo-400 text-xs uppercase tracking-widest font-semibold border-b border-indigo-900/30 pb-2">
        <Pill className="w-4 h-4" />
        {t.title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={deployNSAID}
          disabled={nsaidCount <= 0 || nsaidActive}
          className={`relative overflow-hidden p-3 rounded flex flex-col items-start transition-all border ${
            nsaidActive ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300' :
            nsaidCount > 0 ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-400 hover:bg-slate-800' :
            'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <div className="flex justify-between w-full mb-1">
            <span className="font-bold flex items-center gap-2">
              <ShieldPlus className="w-4 h-4" /> {t.nsaid}
            </span>
            <span className="text-xs">
              {nsaidActive ? t.active : nsaidCount > 0 ? `[ ${nsaidCount} ]` : t.empty}
            </span>
          </div>
          <span className="text-xs text-left opacity-70">{t.nsaidDesc}</span>
          {nsaidActive && <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 animate-[fastFlow_15s_linear_1]" />}
        </button>

        <button
          onClick={deploySteroid}
          disabled={steroidCount <= 0 || steroidActive}
          className={`relative overflow-hidden p-3 rounded flex flex-col items-start transition-all border ${
            steroidActive ? 'bg-amber-900/40 border-amber-500 text-amber-300' :
            steroidCount > 0 ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400 hover:bg-slate-800' :
            'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <div className="flex justify-between w-full mb-1">
            <span className="font-bold flex items-center gap-2">
              <Pill className="w-4 h-4" /> {t.steroid}
            </span>
            <span className="text-xs">
              {steroidActive ? t.active : steroidCount > 0 ? `[ ${steroidCount} ]` : t.empty}
            </span>
          </div>
          <span className="text-xs text-left opacity-70">{t.steroidDesc}</span>
        </button>
      </div>
    </div>
  );
}
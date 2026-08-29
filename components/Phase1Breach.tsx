"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { Siren, Droplet } from 'lucide-react';

export default function Phase1Breach() {
  const { lang, permeability, setPermeability, setPhase } = useSimulation();
  const t = dict[lang].phase1;

  const handleHistamineRelease = () => {
    const newPermeability = permeability + 25;
    setPermeability(newPermeability);
    
    // Once permeability hits 100%, trigger Phase 2 after a short delay
    if (newPermeability >= 100) {
      setTimeout(() => {
        setPhase(2);
      }, 2500); // 2.5 second delay so they can read the success message
    }
  };

  return (
    <div className="bg-black/50 border border-blue-500/30 p-6 rounded-lg font-mono">
      <h2 className="text-blue-400 text-xl font-bold mb-2 flex items-center gap-2">
        <Siren className="w-5 h-5 animate-pulse text-blue-500"/> 
        {t.title}
      </h2>
      <p className="text-blue-600 text-sm mb-6">{t.warning}</p>

      {permeability >= 50 && (
        <div className="p-3 mb-6 rounded text-sm bg-red-950/50 border border-red-500 text-red-400 animate-pulse">
          {t.clinicalSigns}
        </div>
      )}

      {permeability >= 100 ? (
        <div className="p-4 bg-emerald-950/50 border border-emerald-500 text-emerald-400 text-center rounded">
          {t.success}
        </div>
      ) : (
        <button
          onClick={handleHistamineRelease}
          className="w-full p-4 rounded bg-blue-900/40 border border-blue-500 text-blue-300 hover:bg-blue-800/60 hover:text-white transition-all flex justify-center items-center gap-2"
        >
          <Droplet className="w-5 h-5" />
          {t.action}
        </button>
      )}

      {/* Progress Bar */}
      <div className="mt-6 h-2 bg-slate-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${permeability}%` }}
        />
      </div>
    </div>
  );
}
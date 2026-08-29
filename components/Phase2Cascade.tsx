"use client";
import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import LoreTooltip from './LoreTooltip';

export default function Phase2Cascade() {
  const { lang, setPathogenLoad, setLeukocytes, setPhase, adhesionStep, setAdhesionStep } = useSimulation();
  const t = dict[lang].phase2;
  
  const [alert, setAlert] = useState<{message: string, type: 'error'|'success'|null}>({message: t.awaiting, type: null});

  const handleSequence = (stepTarget: number) => {
    if (adhesionStep >= 3) return;

    if (stepTarget !== adhesionStep + 1) {
      setPathogenLoad((prev) => Math.min(prev + 20, 100)); 
      setAlert({ message: t.errorWashout, type: 'error' });
      setAdhesionStep(0); 
      return;
    }

    setAdhesionStep(stepTarget);
    setAlert({ message: `Sequence ${stepTarget}/3 Authorized.`, type: 'success' });

    if (stepTarget === 3) {
      setAlert({ message: t.success, type: 'success' });
      setLeukocytes(100);
      setPathogenLoad(20); 
      setTimeout(() => {
        setPhase(3); 
      }, 3000);
    }
  };

  return (
    <div className="bg-black/50 border border-emerald-500/30 p-6 rounded-lg font-mono">
      <h2 className="text-emerald-400 text-xl font-bold mb-2 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 animate-pulse text-amber-500"/> 
        {t.title}
      </h2>
      <p className="text-emerald-600 text-sm mb-6">{t.warning}</p>

      <div className={`p-3 mb-6 rounded text-sm border transition-colors duration-300 ${
        alert.type === 'error' ? 'bg-red-950/50 border-red-500 text-red-400' : 
        alert.type === 'success' ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400' : 
        'bg-slate-900 border-slate-700 text-slate-400'
      }`}>
        {alert.message}
      </div>

      <div className="space-y-4">
        {[
          { id: 1, label: t.step1 },
          { id: 2, label: t.step2 },
          { id: 3, label: t.step3 },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleSequence(btn.id)}
            className={`w-full p-4 rounded text-left transition-all flex justify-between items-center ${
              adhesionStep >= btn.id 
                ? 'bg-emerald-900/40 border border-emerald-500 text-emerald-400 cursor-default' 
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300'
            }`}
          >
            {/* Injecting the Lore Tooltip purely on Step 3 for 'Diapedesis' */}
            {btn.id === 3 ? (
              <LoreTooltip termKey="diapedesis"><span>{btn.label}</span></LoreTooltip>
            ) : (
              <span>{btn.label}</span>
            )}
            
            {adhesionStep >= btn.id && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          </button>
        ))}
      </div>
    </div>
  );
}
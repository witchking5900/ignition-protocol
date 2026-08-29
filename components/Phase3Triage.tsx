"use client";
import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { Skull, Award, AlertTriangle, ShieldCheck, FileSignature } from 'lucide-react';

export default function Phase3Triage() {
  const { 
    lang, 
    tissueIntegrity, setTissueIntegrity, 
    setPathogenLoad, setLeukocytes, setPermeability,
    macDeployed // Pulling in MAC state to verify humoral engagement
  } = useSimulation();
  
  const t = dict[lang].phase3;
  const d = dict[lang].debrief;

  const [outcome, setOutcome] = useState<'none' | 'ruin' | 'resolution'>('none');
  const [grade, setGrade] = useState<'A+' | 'B (INCOMPLETE)' | 'B' | 'C-' | 'F' | null>(null);

  const handleChoiceA = () => {
    // The Trap: Total organ destruction
    setOutcome('ruin');
    setTissueIntegrity(0);
    setLeukocytes(150);
    setGrade('F');
  };

  const handleChoiceB = () => {
    setOutcome('resolution');
    // Clear the battlefield
    setPathogenLoad(0);
    setLeukocytes(0);
    setPermeability(0);
    
    // Strict Grading Logic: Must preserve tissue AND utilize the MAC
    if (tissueIntegrity >= 90 && macDeployed) {
      setGrade('A+');
    } else if (tissueIntegrity >= 90 && !macDeployed) {
      setGrade('B (INCOMPLETE)'); // Speedrun penalty
    } else if (tissueIntegrity >= 70) {
      setGrade('B');
    } else if (tissueIntegrity >= 40) {
      setGrade('C-');
    } else {
      setGrade('F');
    }
  };

  // ---------------------------------------------
  // DEBRIEF / REPORT CARD VIEW
  // ---------------------------------------------
  if (outcome !== 'none' && grade) {
    const getGradeConfig = () => {
      switch(grade) {
        case 'A+': return { icon: <Award className="w-16 h-16 text-emerald-500 mx-auto" />, color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/20', text: d.gradeA };
        case 'B (INCOMPLETE)': return { icon: <AlertTriangle className="w-16 h-16 text-blue-500 mx-auto" />, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/20', text: d.gradeNoMac };
        case 'B': return { icon: <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto" />, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-950/20', text: d.gradeB };
        case 'C-': return { icon: <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />, color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/20', text: d.gradeC };
        case 'F': return { icon: <Skull className="w-16 h-16 text-red-500 mx-auto animate-pulse" />, color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-950/20', text: d.gradeF };
      }
    };

    const config = getGradeConfig();

    return (
      <div className={`p-8 rounded-lg font-mono border ${config?.border} ${config?.bg} backdrop-blur-sm shadow-2xl`}>
        <div className="flex items-center justify-center gap-3 mb-6 text-slate-400 border-b border-slate-800 pb-4">
          <FileSignature className="w-5 h-5" />
          <h2 className="text-lg font-bold tracking-[0.2em]">{d.title}</h2>
        </div>
        
        <div className="text-center mb-8">
          {config?.icon}
          <div className="mt-4 text-xs tracking-widest text-slate-500 uppercase">{d.grade}</div>
          <div className={`text-5xl font-black mt-2 drop-shadow-lg ${config?.color}`}>
            {grade}
          </div>
        </div>

        <div className="bg-black/50 p-6 rounded border border-slate-800">
          <div className="text-xs tracking-widest text-slate-500 uppercase mb-2">{d.evaluation}</div>
          <p className="text-slate-300 leading-relaxed">
            {config?.text}
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // ACTIVE TRIAGE VIEW (The User Choice)
  // ---------------------------------------------
  return (
    <div className="bg-black/50 border border-amber-500/30 p-6 rounded-lg font-mono shadow-2xl">
      <h2 className="text-amber-400 text-xl font-bold mb-2">{t.title}</h2>
      <p className="text-amber-600 text-sm mb-6">{t.warning}</p>

      <div className="space-y-4">
        <button
          onClick={handleChoiceA}
          className="w-full p-4 rounded bg-slate-900 border border-red-900/50 text-red-400 hover:border-red-500 hover:bg-red-950/50 transition-all text-left flex items-center justify-between"
        >
          <span>{t.choiceA}</span>
          <Skull className="w-4 h-4 opacity-50" />
        </button>
        <button
          onClick={handleChoiceB}
          className="w-full p-4 rounded bg-slate-900 border border-emerald-900/50 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-950/50 transition-all text-left flex items-center justify-between"
        >
          <span>{t.choiceB}</span>
          <Award className="w-4 h-4 opacity-50" />
        </button>
      </div>
    </div>
  );
}
"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { Skull, Activity } from 'lucide-react';

export default function GameOver() {
  const { lang, resetSimulation } = useSimulation();
  const t = dict[lang].gameOver;

  return (
    <div className="fixed inset-0 z-50 bg-red-950 flex flex-col items-center justify-center font-mono p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 to-black pointer-events-none" />
      
      <div className="relative z-10 text-center animate-pulse">
        <Skull className="w-32 h-32 text-red-500 mx-auto mb-8 drop-shadow-[0_0_15px_#ef4444]" />
        <h1 className="text-7xl font-black text-red-500 tracking-[0.2em] mb-4">{t.title}</h1>
        <h2 className="text-2xl text-red-400 font-bold tracking-widest mb-6">{t.subtitle}</h2>
        <p className="text-red-300 max-w-md mx-auto mb-12 leading-relaxed">
          {t.reason}
        </p>
        
        <button 
          onClick={resetSimulation}
          className="bg-black/50 border-2 border-red-500 text-red-500 px-8 py-4 rounded font-bold tracking-widest hover:bg-red-500 hover:text-black transition-all flex items-center gap-3 mx-auto cursor-pointer"
        >
          <Activity className="w-5 h-5" />
          {t.restart}
        </button>
      </div>
    </div>
  );
}
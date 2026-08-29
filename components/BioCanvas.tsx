"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';

export default function BioCanvas() {
  const { lang, permeability, adhesionStep, phase, pathogenLoad, tissueIntegrity } = useSimulation();
  const ui = dict[lang].ui;
  const gapSize = (permeability / 100) * 16; 

  const getNeutrophilState = () => {
    if (phase === 3 || adhesionStep === 3) return 'swarm';
    if (adhesionStep === 2) return 'firm';
    if (adhesionStep === 1) return 'roll-slow';
    return 'flow-fast';
  };

  const getTissueColor = () => {
    if (tissueIntegrity < 30) return 'bg-red-950/40 border-red-900';
    if (tissueIntegrity < 70) return 'bg-amber-950/20 border-amber-900/50';
    return 'bg-emerald-950/10 border-emerald-900/30';
  };

  return (
    <div className="w-full h-64 bg-[#0a0f16] border border-slate-800 rounded-lg overflow-hidden flex flex-col relative shadow-2xl">
      <style>{`
        @keyframes fastFlow { 0% { transform: translateX(-50px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(800px); opacity: 0; } }
        @keyframes slowRoll { 0% { transform: translateX(-50px) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(800px) rotate(360deg); opacity: 0; } }
        @keyframes tissueSwarm { 0%, 100% { transform: translate(0px, 0px); } 25% { transform: translate(20px, -15px); } 50% { transform: translate(-10px, 20px); } 75% { transform: translate(15px, 15px); } }
        .flow-fast { animation: fastFlow 2s linear infinite; }
        .flow-fast-delay { animation: fastFlow 2s linear infinite 1s; }
        .roll-slow { animation: slowRoll 8s linear infinite; }
        .roll-slow-delay { animation: slowRoll 8s linear infinite 4s; }
        .firm { transform: translateX(150px); }
        .firm-delay { transform: translateX(300px); }
        .swarm { animation: tissueSwarm 6s ease-in-out infinite; }
      `}</style>

      <div className="h-[45%] w-full bg-red-950/20 relative border-b border-red-900/30 flex items-end">
        <div className="absolute top-2 left-2 text-[10px] text-red-500/50 tracking-widest font-mono">{ui.lumen}</div>
        {(getNeutrophilState() === 'flow-fast' || getNeutrophilState() === 'roll-slow' || getNeutrophilState() === 'firm') && (
          <>
            <div className={`absolute w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_12px_#60a5fa] ${getNeutrophilState() === 'flow-fast' ? 'top-6' : 'bottom-1'} ${getNeutrophilState()}`} />
            <div className={`absolute w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_12px_#60a5fa] ${getNeutrophilState() === 'flow-fast' ? 'top-4' : 'bottom-1'} ${getNeutrophilState() === 'firm' ? 'firm-delay' : getNeutrophilState() + '-delay'}`} />
          </>
        )}
      </div>

      <div className="h-3 w-full bg-slate-900 flex justify-around items-center z-10" style={{ gap: `${gapSize}px`, padding: `0 ${gapSize}px` }}>
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-2 w-full bg-red-800/40 border border-red-500/30 rounded-[2px] transition-all duration-500" />)}
      </div>

      <div className={`h-[55%] w-full relative transition-colors duration-1000 border-t ${getTissueColor()}`}>
        <div className="absolute bottom-2 left-2 text-[10px] text-emerald-500/50 tracking-widest font-mono">{ui.tissueZone}</div>
        <div className="absolute inset-0 p-4 flex flex-wrap gap-4 opacity-80">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 bg-red-600 rounded-sm rotate-45 shadow-[0_0_8px_#ef4444] transition-all duration-1000 ${i < (pathogenLoad / 10) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
          ))}
        </div>
        {getNeutrophilState() === 'swarm' && (
          <>
            <div className="absolute top-4 left-20 w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_12px_#60a5fa] swarm" style={{ animationDelay: '0s' }} />
            <div className="absolute top-10 left-40 w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_12px_#60a5fa] swarm" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-6 left-60 w-4 h-4 bg-blue-100 rounded-full shadow-[0_0_12px_#60a5fa] swarm" style={{ animationDelay: '3s' }} />
          </>
        )}
      </div>
    </div>
  );
}
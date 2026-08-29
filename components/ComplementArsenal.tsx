"use client";
import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { Hexagon, Lock } from 'lucide-react';

const TRAY_PIECES = ['C1q', 'C1r', 'C1s', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'Factor B', 'Factor D', 'MASP-1', 'MASP-2', 'MBL'].sort();

const ReactionArrow = ({ enzyme, byproducts }: { enzyme: string, byproducts: string }) => (
  <div className="flex flex-col items-center justify-center mx-3 relative min-w-[70px]">
    {enzyme && <span className="text-[9px] font-bold text-cyan-300 mb-[2px]">{enzyme}</span>}
    <div className="flex items-center w-full">
      <div className="h-[2px] flex-1 bg-cyan-500"></div>
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-cyan-500"></div>
    </div>
    {byproducts && (
      <div className="absolute top-[100%] right-0 mt-[2px] flex flex-col items-end whitespace-nowrap">
         <span className="text-[10px] leading-none text-red-400 font-bold">↘</span>
         <span className="text-[8px] text-red-300 font-mono">{byproducts}</span>
      </div>
    )}
  </div>
);

const PATHWAYS = {
  'ANTIBODY': { sequence: ['C1q', 'C1r', 'C1s', 'C4', 'C2', 'C3', 'C5', 'C6', 'C7', 'C8', 'C9', 'C9', 'C9'], stages: [ { req: 3, getReactants: (d: string[]) => `IgG/IgM + ${d.slice(0,3).join(' + ')}`, enzyme: '', byproducts: '', product: 'C1qrs' }, { req: 5, getReactants: (d: string[]) => `${d.slice(3,5).join(' + ')}`, enzyme: 'C1qrs', byproducts: 'C4a, C2b', product: 'C4b2a' }, { req: 6, getReactants: (d: string[]) => `${d.slice(5,6).join(' + ')}`, enzyme: 'C4b2a', byproducts: 'C3a', product: 'C4b2a3b' }, { req: 7, getReactants: (d: string[]) => `${d.slice(6,7).join(' + ')}`, enzyme: 'C5 Convertase', byproducts: 'C5a', product: 'C5b' }, { req: 13, getReactants: (d: string[]) => `C5b + ${d.slice(7,13).join(' + ')}`, enzyme: 'Polymerization', byproducts: '', product: 'MAC PORE' } ] },
  'MANNOSE': { sequence: ['MBL', 'MASP-1', 'MASP-2', 'C4', 'C2', 'C3', 'C5', 'C6', 'C7', 'C8', 'C9', 'C9', 'C9'], stages: [ { req: 3, getReactants: (d: string[]) => `Mannose + ${d.slice(0,3).join(' + ')}`, enzyme: '', byproducts: '', product: 'MBL-MASP' }, { req: 5, getReactants: (d: string[]) => `${d.slice(3,5).join(' + ')}`, enzyme: 'MBL-MASP', byproducts: 'C4a, C2b', product: 'C4b2a' }, { req: 6, getReactants: (d: string[]) => `${d.slice(5,6).join(' + ')}`, enzyme: 'C4b2a', byproducts: 'C3a', product: 'C4b2a3b' }, { req: 7, getReactants: (d: string[]) => `${d.slice(6,7).join(' + ')}`, enzyme: 'C5 Convertase', byproducts: 'C5a', product: 'C5b' }, { req: 13, getReactants: (d: string[]) => `C5b + ${d.slice(7,13).join(' + ')}`, enzyme: 'Polymerization', byproducts: '', product: 'MAC PORE' } ] },
  'LPS': { sequence: ['C3', 'Factor B', 'Factor D', 'C3', 'C5', 'C6', 'C7', 'C8', 'C9', 'C9', 'C9'], stages: [ { req: 1, getReactants: (d: string[]) => `LPS + ${d.slice(0,1).join(' + ')}`, enzyme: 'Hydrolysis', byproducts: 'C3a', product: 'C3b' }, { req: 3, getReactants: (d: string[]) => `${d.slice(1,3).join(' + ')}`, enzyme: 'Factor D', byproducts: 'Ba', product: 'C3bBb' }, { req: 4, getReactants: (d: string[]) => `${d.slice(3,4).join(' + ')}`, enzyme: 'C3bBb', byproducts: 'C3a', product: 'C3bBb3b' }, { req: 5, getReactants: (d: string[]) => `${d.slice(4,5).join(' + ')}`, enzyme: 'C5 Convertase', byproducts: 'C5a', product: 'C5b' }, { req: 11, getReactants: (d: string[]) => `C5b + ${d.slice(5,11).join(' + ')}`, enzyme: 'Polymerization', byproducts: '', product: 'MAC PORE' } ] }
};

export default function ComplementArsenal() {
  const { lang, addLog, setPathogenLoad, complementStep, setComplementStep, macDeployed, setMacDeployed, permeability, pathogenType } = useSimulation();
  const t = dict[lang].complement;
  const ui = dict[lang].ui;
  const l = dict[lang].logs;
  const isLocked = permeability < 100;
  const [errorFlash, setErrorFlash] = useState(false);

  const config = PATHWAYS[pathogenType];
  const droppedSequence = config.sequence.slice(0, complementStep);

  const handleDragStart = (e: React.DragEvent, piece: string) => { e.dataTransfer.setData('piece', piece); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (macDeployed || isLocked) return;
    const droppedPiece = e.dataTransfer.getData('piece');
    
    if (droppedPiece === config.sequence[complementStep]) {
      const nextStep = complementStep + 1;
      setComplementStep(nextStep);
      
      if (nextStep === config.sequence.length) {
        setMacDeployed(true);
        setPathogenLoad(prev => Math.max(0, prev - 30));
        addLog(l.macDeployed, 'success');
      } else if (nextStep === 1) {
        addLog(l.convertase(droppedPiece), 'info');
      } else {
        addLog(l.bound(droppedPiece), 'info');
      }
    } else {
      setErrorFlash(true);
      addLog(l.mismatch(droppedPiece), 'error');
      setTimeout(() => setErrorFlash(false), 400);
    }
  };

  const getClueText = () => {
    if (pathogenType === 'LPS') return t.clueLPS;
    if (pathogenType === 'MANNOSE') return t.clueMANNOSE;
    return t.clueANTIBODY;
  };

  return (
    <div className="w-full bg-[#041d24] border border-cyan-900/50 p-4 rounded-lg font-mono shadow-lg relative flex flex-col h-full min-h-[300px]">
      {isLocked && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-cyan-500/70 rounded-lg">
          <Lock className="w-6 h-6 mb-2" />
          <span className="text-xs font-bold tracking-widest text-center px-4">
            {ui.awaitingExudation} <br/><span className="text-[10px] text-cyan-600/70">{ui.plasmaSequestered}</span>
          </span>
        </div>
      )}

      <div className="flex justify-between items-center mb-3 text-cyan-400 text-xs uppercase tracking-widest font-semibold border-b border-cyan-900/40 pb-2 shrink-0">
        <div className="flex items-center gap-2"><Hexagon className="w-4 h-4" /> {t.title}</div>
        <span>{macDeployed ? ui.macDeployed : ui.systemReady}</span>
      </div>

      <div className="text-[10px] text-amber-400 bg-amber-950/30 p-2 rounded mb-3 border border-amber-900/50 shrink-0">
        {getClueText()}
      </div>

      <div className="flex-1 flex gap-4 h-full">
        <div className="w-1/3 border-r border-cyan-900/30 pr-4 flex flex-wrap gap-2 content-start h-full">
          {TRAY_PIECES.map(piece => (
            <div key={piece} draggable onDragStart={(e) => handleDragStart(e, piece)} className="px-2 py-1 bg-cyan-950 border border-cyan-700 text-cyan-300 text-[10px] rounded cursor-grab hover:bg-cyan-900 active:cursor-grabbing w-fit h-fit">
              {piece}
            </div>
          ))}
        </div>

        <div className={`flex-1 rounded-lg border-2 border-dashed flex flex-col items-start justify-start p-4 transition-colors overflow-y-auto ${errorFlash ? 'border-red-500 bg-red-950/20' : macDeployed ? 'border-emerald-500 bg-emerald-950/20' : 'border-cyan-800 bg-cyan-950/10'}`} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          {complementStep === 0 && <span className="text-cyan-600/50 text-[10px] uppercase block w-full text-center mt-10">{t.dropZone}</span>}
          
          <div className="flex flex-col gap-6 w-full mt-2">
            {config.stages.map((stage, idx) => {
              const prevReq = idx === 0 ? 0 : config.stages[idx-1].req;
              if (complementStep < prevReq) return null; 

              const isComplete = complementStep >= stage.req;
              const currentReactants = droppedSequence.slice(prevReq, isComplete ? stage.req : complementStep);

              return (
                <div key={idx} className="flex items-center justify-start text-[11px] animate-[fastFlow_0.3s_ease-out_1]">
                   <div className="text-right text-cyan-100 flex-1">{idx === 0 ? stage.getReactants(droppedSequence) : currentReactants.join(' + ')}</div>
                   {isComplete ? (
                     <>
                       <ReactionArrow enzyme={stage.enzyme} byproducts={stage.byproducts} />
                       <div className="text-left text-emerald-400 font-bold flex-1">{stage.product}</div>
                     </>
                   ) : (
                     <div className="flex-1 ml-4 text-cyan-800 animate-pulse">...</div>
                   )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
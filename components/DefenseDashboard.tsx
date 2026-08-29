"use client";
import React, { useEffect, useRef } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import Phase1Breach from './Phase1Breach';
import Phase2Cascade from './Phase2Cascade';
import Phase3Triage from './Phase3Triage';
import TerminalLog from './TerminalLog';
import TelemetryChart from './TelemetryChart';
import BioCanvas from './BioCanvas';
import PharmaOverride from './PharmaOverride';
import ComplementArsenal from './ComplementArsenal';
import GameOver from './GameOver';
import { Activity, ShieldAlert, HeartPulse, ShieldHalf, RotateCcw } from 'lucide-react';

export default function DefenseDashboard() {
  const { 
    lang, setLang, 
    pathogenLoad, permeability, leukocytes, tissueIntegrity, phase,
    addLog, resetSimulation
  } = useSimulation();
  
  const t = dict[lang];
  const previousPhase = useRef(phase);
  const previousTissue = useRef(tissueIntegrity);

  useEffect(() => {
    if (permeability > 0 && permeability < 100) addLog(`Histamine burst detected. Permeability at ${permeability}%.`, 'info');
    if (permeability === 100) addLog('Vascular gates fully open. Hemostasis achieved.', 'success');
  }, [permeability]);

  useEffect(() => {
    if (pathogenLoad >= 100 && phase === 2) addLog(`Pathogen load critical. Collateral tissue degradation imminent.`, 'error');
    if (pathogenLoad <= 20 && previousPhase.current === 2) addLog('Swarm actively destroying primary pathogen.', 'success');
  }, [pathogenLoad]);

  useEffect(() => {
    if (tissueIntegrity < previousTissue.current && tissueIntegrity % 10 === 0 && tissueIntegrity > 0) {
      addLog(`TISSUE INTEGRITY COMPROMISED: ${tissueIntegrity}% remaining.`, 'warn');
    }
    previousTissue.current = tissueIntegrity;
  }, [tissueIntegrity]);

  useEffect(() => {
    if (phase !== previousPhase.current) {
      if (phase === 1) addLog('Simulation Reset. Pathogen detected in peripheral tissue.', 'warn');
      if (phase === 2) addLog('Phase 2 transition. Awaiting endothelial sequence.', 'warn');
      if (phase === 3) addLog('Phase 3 transition. Entering final triage resolution.', 'warn');
      previousPhase.current = phase;
    }
  }, [phase]);

  if (tissueIntegrity === 0) {
    return <GameOver />;
  }

  const MetricCard = ({ title, value, icon, colorClass }: any) => (
    <div className={`bg-slate-950 border ${colorClass} p-4 rounded-lg flex flex-col justify-between transition-colors duration-500 shadow-lg`}>
      <div className="flex justify-between items-center mb-4 text-slate-400">
        <span className="text-xs uppercase tracking-wider">{title}</span>
        {icon}
      </div>
      <div className={`text-4xl font-bold ${colorClass.replace('border-', 'text-')}`}>
        {value}%
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8 font-mono selection:bg-emerald-900">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header & Controls */}
        <header className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-500 tracking-widest">{t.title}</h1>
            <p className="text-slate-500 text-sm mt-1">STATUS: ACTIVE // SYSTEM: IMMUNE</p>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={resetSimulation} className="flex items-center gap-1 text-slate-500 hover:text-emerald-500 transition-colors text-sm">
              <RotateCcw className="w-4 h-4" /> Reset Sim
            </button>
            <div className="flex gap-2 bg-slate-900 p-1 rounded border border-slate-800">
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm ${lang === 'en' ? 'bg-slate-800 text-emerald-500 rounded' : 'text-slate-500'}`}>EN</button>
              <button onClick={() => setLang('ka')} className={`px-3 py-1 text-sm ${lang === 'ka' ? 'bg-slate-800 text-emerald-500 rounded' : 'text-slate-500'}`}>KA</button>
            </div>
          </div>
        </header>

        {/* Global Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Console (Left 3 Columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard title={t.metrics.pathogen} value={pathogenLoad} icon={<ShieldAlert />} colorClass={pathogenLoad > 50 ? 'border-red-900/50' : 'border-emerald-900/50'} />
              <MetricCard title={t.metrics.permeability} value={permeability} icon={<Activity />} colorClass="border-blue-900/50" />
              <MetricCard title={t.metrics.leukocytes} value={leukocytes} icon={<ShieldHalf />} colorClass="border-amber-900/50" />
              <MetricCard title={t.metrics.tissue} value={tissueIntegrity} icon={<HeartPulse />} colorClass={tissueIntegrity < 50 ? 'border-red-900/50' : 'border-emerald-900/50'} />
            </div>

            {/* Support Systems: Pharma & Humoral Immunity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <PharmaOverride />
               <ComplementArsenal />
            </div>

            {/* LIVE BIO-CANVAS */}
            <BioCanvas />

            {/* Live Charting */}
            <TelemetryChart />
          </div>

          {/* Side Console (Right 1 Column) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TerminalLog />
            
            {/* Active Phase Router - MOVED HERE */}
            <div className="w-full">
              {phase === 1 && <Phase1Breach />}
              {phase === 2 && <Phase2Cascade />}
              {phase === 3 && <Phase3Triage />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Language } from '../i18n/dictionary';

export interface LogEntry { id: string; time: string; message: string; type: 'info' | 'warn' | 'error' | 'success'; }
export interface ChartDataPoint { time: string; pathogen: number; tissue: number; }
export type PathogenType = 'LPS' | 'MANNOSE' | 'ANTIBODY';

interface SimulationState {
  lang: Language; setLang: (l: Language) => void;
  pathogenLoad: number; setPathogenLoad: (v: number | ((prev: number) => number)) => void;
  permeability: number; setPermeability: (v: number) => void;
  leukocytes: number; setLeukocytes: (v: number | ((prev: number) => number)) => void;
  tissueIntegrity: number; setTissueIntegrity: (v: number | ((prev: number) => number)) => void;
  phase: number; setPhase: (v: number) => void;
  adhesionStep: number; setAdhesionStep: (v: number) => void;
  nsaidCount: number; setNsaidCount: (v: number) => void;
  steroidCount: number; setSteroidCount: (v: number) => void;
  nsaidActive: boolean; setNsaidActive: (v: boolean) => void;
  steroidActive: boolean; setSteroidActive: (v: boolean) => void;
  complementStep: number; setComplementStep: (v: number | ((prev: number) => number)) => void;
  macDeployed: boolean; setMacDeployed: (v: boolean) => void;
  pathogenType: PathogenType; setPathogenType: (v: PathogenType) => void;
  logs: LogEntry[]; addLog: (message: string, type?: 'info' | 'warn' | 'error' | 'success') => void;
  chartData: ChartDataPoint[]; setChartData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationState | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('ka');
  const [pathogenLoad, setPathogenLoad] = useState(100);
  const [permeability, setPermeability] = useState(0);
  const [leukocytes, setLeukocytes] = useState(0);
  const [tissueIntegrity, setTissueIntegrity] = useState(100);
  const [phase, setPhase] = useState(1); 
  const [adhesionStep, setAdhesionStep] = useState(0);
  const [nsaidCount, setNsaidCount] = useState(1);
  const [steroidCount, setSteroidCount] = useState(1);
  const [nsaidActive, setNsaidActive] = useState(false);
  const [steroidActive, setSteroidActive] = useState(false);
  
  const [complementStep, setComplementStep] = useState(0);
  const [macDeployed, setMacDeployed] = useState(false);
  
  const getRandomPathogen = (): PathogenType => {
    const types: PathogenType[] = ['LPS', 'MANNOSE', 'ANTIBODY'];
    return types[Math.floor(Math.random() * types.length)];
  };
  const [pathogenType, setPathogenType] = useState<PathogenType>('LPS');

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  const pathogenRef = useRef(pathogenLoad);
  const tissueRef = useRef(tissueIntegrity);
  const phaseRef = useRef(phase);
  const nsaidRef = useRef(nsaidActive);
  
  useEffect(() => { pathogenRef.current = pathogenLoad; }, [pathogenLoad]);
  useEffect(() => { tissueRef.current = tissueIntegrity; }, [tissueIntegrity]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { nsaidRef.current = nsaidActive; }, [nsaidActive]);

  useEffect(() => {
    setPathogenType(getRandomPathogen());
    addLog('SYSTEM BOOT: Immune protocol initialized.', 'info');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const timeLabel = new Date().toLocaleTimeString('ka-GE', { minute: '2-digit', second: '2-digit' });
        const newData = [...prev, { time: timeLabel, pathogen: pathogenRef.current, tissue: tissueRef.current }];
        if (newData.length > 15) return newData.slice(newData.length - 15);
        return newData;
      });

      if (pathogenRef.current >= 80 && phaseRef.current === 2 && !nsaidRef.current) {
        setTissueIntegrity(prev => Math.max(prev - 4, 0));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (message: string, type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    const time = new Date().toLocaleTimeString('ka-GE', { hour12: false });
    const id = Math.random().toString(36).substring(2, 9);
    setLogs(prev => [...prev, { id, time, message, type }]);
  };

  const resetSimulation = () => {
    setPathogenLoad(100); setPermeability(0); setLeukocytes(0); setTissueIntegrity(100);
    setPhase(1); setAdhesionStep(0); setNsaidCount(1); setSteroidCount(1);
    setNsaidActive(false); setSteroidActive(false); setComplementStep(0); setMacDeployed(false);
    setChartData([]); setPathogenType(getRandomPathogen());
    addLog('System Purge: New Patient Generated.', 'error');
  };

  return (
    <SimulationContext.Provider value={{
      lang, setLang, pathogenLoad, setPathogenLoad, permeability, setPermeability,
      leukocytes, setLeukocytes, tissueIntegrity, setTissueIntegrity, phase, setPhase,
      adhesionStep, setAdhesionStep, nsaidCount, setNsaidCount, steroidCount, setSteroidCount,
      nsaidActive, setNsaidActive, steroidActive, setSteroidActive, complementStep, setComplementStep,
      macDeployed, setMacDeployed, pathogenType, setPathogenType, logs, addLog, chartData, setChartData, resetSimulation
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
  return context;
};
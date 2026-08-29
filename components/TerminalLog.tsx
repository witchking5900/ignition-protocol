"use client";
import React, { useEffect, useRef } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Terminal } from 'lucide-react';

export default function TerminalLog() {
  const { logs } = useSimulation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-amber-400';
      case 'success': return 'text-emerald-400';
      default: return 'text-blue-400';
    }
  };

  const getPrefix = (type: string) => {
    switch(type) {
      case 'error': return '[CRIT] ';
      case 'warn': return '[WARN] ';
      case 'success': return '[ OK ] ';
      default: return '[INFO] ';
    }
  };

  return (
    <div className="bg-black/80 border border-slate-800 rounded-lg flex flex-col h-[400px] font-mono text-xs shadow-2xl overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-2 text-slate-500 shrink-0">
        <Terminal className="w-4 h-4" />
        <span className="uppercase tracking-widest font-semibold">System Telemetry Log</span>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 space-y-2 scroll-smooth">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 leading-relaxed">
            <span className="text-slate-600 shrink-0">{log.time}</span>
            <span className={`${getTypeStyles(log.type)} break-words`}>
              <span className="opacity-70">{getPrefix(log.type)}</span>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} /> 
      </div>
    </div>
  );
}
"use client";
import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { dict } from '../i18n/dictionary';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';

export default function TelemetryChart() {
  const { lang, chartData } = useSimulation();
  const ui = dict[lang].ui;
  const m = dict[lang].metrics;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono shadow-2xl h-72">
      <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs uppercase tracking-widest font-semibold border-b border-slate-800 pb-2">
        <Activity className="w-4 h-4" />
        {ui.chartHeader}
      </div>
      
      <div className="h-52 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" tick={{ fill: '#475569' }} tickMargin={10} />
            <YAxis domain={[0, 100]} stroke="#475569" tick={{ fill: '#475569' }} />
            <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#cbd5e1' }} itemStyle={{ fontSize: '12px' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line type="monotone" name={m.pathogen} dataKey="pathogen" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line type="monotone" name={m.tissue} dataKey="tissue" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
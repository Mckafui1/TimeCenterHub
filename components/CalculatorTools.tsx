import React, { useState, useEffect, useRef } from 'react';
import { CITIES } from '../src/data/cities';

// --- SHARED UTILS ---
const formatTimeHM = (mins: number) => {
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.floor(Math.abs(mins) % 60);
  return `${mins < 0 ? '-' : ''}${h}h ${m}m`;
};

// --- CORE: TIME CALCULATOR ---
export const TimeCalculator: React.FC<{ initialOp?: 'add' | 'sub' }> = ({ initialOp = 'add' }) => {
  const [h1, setH1] = useState('0');
  const [m1, setM1] = useState('0');
  const [s1, setS1] = useState('0');
  const [h2, setH2] = useState('0');
  const [m2, setM2] = useState('0');
  const [s2, setS2] = useState('0');
  const [op, setOp] = useState<'add' | 'sub'>(initialOp);
  const [result, setResult] = useState<{ str: string, t1: number, t2: number, total: number } | null>(null);

  const calculate = () => {
    const t1 = (parseInt(h1 || '0') * 3600) + (parseInt(m1 || '0') * 60) + parseInt(s1 || '0');
    const t2 = (parseInt(h2 || '0') * 3600) + (parseInt(m2 || '0') * 60) + parseInt(s2 || '0');
    const diff = op === 'add' ? t1 + t2 : t1 - t2;
    const abs = Math.abs(diff);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const s = abs % 60;
    setResult({ 
      str: `${diff < 0 ? '-' : ''}${h}h ${m}m ${s}s`,
      t1,
      t2,
      total: diff
    });
  };

  const clear = () => {
    setH1('0'); setM1('0'); setS1('0');
    setH2('0'); setM2('0'); setS2('0');
    setResult(null);
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-600 tracking-widest block ml-1">First Duration</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="First Duration Hours" type="number" value={h1} onChange={e => setH1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="First Duration Minutes" type="number" value={m1} onChange={e => setM1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span><input aria-label="First Duration Seconds" type="number" value={s1} onChange={e => setS1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
          </div>
        </div>

        <div className="flex justify-center gap-10 py-4 border-y border-slate-50">
           <label className="flex items-center gap-3 cursor-pointer font-black text-sm uppercase text-slate-700 hover:text-blue-600 transition-colors">
             <input type="radio" checked={op === 'add'} onChange={() => setOp('add')} className="w-5 h-5 text-blue-600 focus:ring-blue-500" /> + Add
           </label>
           <label className="flex items-center gap-3 cursor-pointer font-black text-sm uppercase text-slate-700 hover:text-rose-600 transition-colors">
             <input type="radio" checked={op === 'sub'} onChange={() => setOp('sub')} className="w-5 h-5 text-rose-600 focus:ring-rose-500" /> - Subtract
           </label>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-600 tracking-widest block ml-1">Second Duration</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="Second Duration Hours" type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="Second Duration Minutes" type="number" value={m2} onChange={e => setM2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span><input aria-label="Second Duration Seconds" type="number" value={s2} onChange={e => setS2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" /></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={calculate} className="flex-grow py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate</button>
        <button onClick={clear} className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all text-base tracking-wide uppercase">Clear</button>
      </div>
      
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 bg-blue-50 text-blue-900 rounded-[2rem] text-center border-2 border-blue-100 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Resulting Duration</p>
            <p className="text-5xl md:text-6xl font-black tracking-tight">{result.str}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">1. Convert everything to seconds</h4>
                <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-slate-700 space-y-2">
                  <p><span className="font-bold text-blue-600">Time 1:</span> ({h1 || 0} × 3600) + ({m1 || 0} × 60) + {s1 || 0} = <span className="font-bold">{result.t1.toLocaleString()} sec</span></p>
                  <p><span className="font-bold text-blue-600">Time 2:</span> ({h2 || 0} × 3600) + ({m2 || 0} × 60) + {s2 || 0} = <span className="font-bold">{result.t2.toLocaleString()} sec</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">2. Perform {op === 'add' ? 'Addition' : 'Subtraction'}</h4>
                <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-slate-700">
                  <p>{result.t1.toLocaleString()} {op === 'add' ? '+' : '-'} {result.t2.toLocaleString()} = <span className="font-bold text-lg">{result.total.toLocaleString()} sec</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">3. Convert back to HH:MM:SS</h4>
                <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-slate-700 space-y-2">
                  <p>Hours = {Math.floor(Math.abs(result.total) / 3600)}</p>
                  <p>Minutes = {Math.floor((Math.abs(result.total) % 3600) / 60)}</p>
                  <p>Seconds = {Math.abs(result.total) % 60}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ADD TIME ---
export const AddTimeCalculator: React.FC = () => {
  return <TimeCalculator initialOp="add" />;
};

// --- SUBTRACT TIME ---
export const SubtractTimeCalculator: React.FC = () => {
  return <TimeCalculator initialOp="sub" />;
};

// --- SPEED DISTANCE TIME ---
export const SpeedDistanceTimeCalculator: React.FC = () => {
  const [dist, setDist] = useState('100');
  const [speed, setSpeed] = useState('50');
  const [time, setTime] = useState('2');
  const [mode, setMode] = useState<'time' | 'distance' | 'speed'>('time');
  const [result, setResult] = useState<{ val: string, formula: string, steps: string[] } | null>(null);

  const calculate = () => {
    let val = '';
    let formula = '';
    let steps: string[] = [];

    if (mode === 'time') {
      const d = parseFloat(dist);
      const s = parseFloat(speed);
      if (s === 0) return;
      
      const res = d / s;
      const h = Math.floor(res);
      const m = Math.round((res - h) * 60);
      
      val = `${h}h ${m}m`;
      formula = 'Time = Distance ÷ Speed';
      steps = [
        `Distance: ${d} km`,
        `Speed: ${s} km/h`,
        `${d} ÷ ${s} = ${res.toFixed(4)} hours`,
        `Convert ${res.toFixed(4)} hours to minutes:`,
        `${h} hours + (0.${(res - h).toFixed(4).split('.')[1]} × 60) minutes`,
        `= ${h}h ${m}m`
      ];
    } else if (mode === 'distance') {
      const s = parseFloat(speed);
      const t = parseFloat(time);
      
      val = `${(s * t).toFixed(2)} km`;
      formula = 'Distance = Speed × Time';
      steps = [
        `Speed: ${s} km/h`,
        `Time: ${t} hours`,
        `${s} × ${t} = ${(s * t).toFixed(2)} km`
      ];
    } else {
      const d = parseFloat(dist);
      const t = parseFloat(time);
      if (t === 0) return;
      
      val = `${(d / t).toFixed(2)} km/h`;
      formula = 'Speed = Distance ÷ Time';
      steps = [
        `Distance: ${d} km`,
        `Time: ${t} hours`,
        `${d} ÷ ${t} = ${(d / t).toFixed(2)} km/h`
      ];
    }
    
    setResult({ val, formula, steps });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div className="flex gap-3 p-1.5 bg-slate-100 rounded-2xl mb-6">
        {['time', 'distance', 'speed'].map(m => (
          <button key={m} onClick={() => { setMode(m as any); setResult(null); }} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-white text-blue-600 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}>{m}</button>
        ))}
      </div>
      
      <div className="space-y-6">
        {mode !== 'distance' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 tracking-widest">Distance (km)</label>
            <input type="number" value={dist} onChange={e => setDist(e.target.value)} placeholder="e.g. 100" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
        )}
        {mode !== 'speed' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 tracking-widest">Speed (km/h)</label>
            <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} placeholder="e.g. 50" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
        )}
        {mode !== 'time' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 tracking-widest">Time (hours)</label>
            <input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 2" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
        )}
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate {mode}</button>
      
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-10 bg-blue-50 text-center rounded-[2rem] border border-blue-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Result</p>
             <p className="text-5xl font-black text-blue-900">{result.val}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p className="font-bold text-slate-900 mb-2">Formula: {result.formula}</p>
              <div className="border-t border-slate-200 my-2"></div>
              {result.steps.map((step, i) => (
                <p key={i} className="pl-4 text-blue-600">{step}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SHIFT CALCULATOR ---
export const ShiftCalculator: React.FC = () => {
  const [shifts, setShifts] = useState([{ start: '09:00', end: '17:00' }]);
  
  const addShift = () => setShifts([...shifts, { start: '09:00', end: '17:00' }]);
  
  const updateShift = (i: number, field: 'start' | 'end', val: string) => {
    const n = [...shifts]; n[i][field] = val; setShifts(n);
  };
  
  const removeShift = (i: number) => {
    if (shifts.length > 1) {
      const n = [...shifts]; n.splice(i, 1); setShifts(n);
    }
  };
  
  const totalMins = shifts.reduce((acc, s) => {
    const [h1, m1] = s.start.split(':').map(Number); 
    const [h2, m2] = s.end.split(':').map(Number);
    let d = (h2 * 60 + m2) - (h1 * 60 + m1); 
    if (d < 0) d += 1440; 
    return acc + d;
  }, 0);

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="space-y-8">
        {shifts.map((s, i) => {
          const [h1, m1] = s.start.split(':').map(Number); 
          const [h2, m2] = s.end.split(':').map(Number);
          let d = (h2 * 60 + m2) - (h1 * 60 + m1); 
          if (d < 0) d += 1440;
          
          return (
            <div key={i} className="space-y-3 relative group">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Shift {shifts.length > 1 ? i + 1 : ''}</label>
                {shifts.length > 1 && (
                  <button onClick={() => removeShift(i)} className="text-rose-400 hover:text-rose-600 text-xs font-bold uppercase tracking-wider transition-colors">Remove</button>
                )}
              </div>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="flex-1">
                  <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-wider">Start</span>
                  <input type="time" value={s.start} onChange={e => updateShift(i, 'start', e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
                </div>
                <span className="font-black text-slate-300 pt-6 text-xl">→</span>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-wider">End</span>
                  <input type="time" value={s.end} onChange={e => updateShift(i, 'end', e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
                </div>
              </div>
              <div className="text-right text-xs font-bold text-slate-400">
                Duration: <span className="text-blue-600">{Math.floor(d / 60)}h {d % 60}m</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={addShift} className="w-full py-4 bg-slate-50 text-slate-600 border-2 border-slate-200 border-dashed font-black rounded-2xl text-xs uppercase hover:bg-slate-100 hover:border-slate-300 transition-all tracking-widest">+ Add Split Shift</button>
      
      <div className="space-y-8 pt-6 border-t border-slate-100">
        <div className="p-8 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100 shadow-sm">
          <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Total Shift Time</p>
          <p className="text-5xl font-black text-indigo-900">{Math.floor(totalMins / 60)}h {totalMins % 60}m</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Calculation Breakdown
          </h3>
          <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
            {shifts.map((s, i) => {
              const [h1, m1] = s.start.split(':').map(Number); 
              const [h2, m2] = s.end.split(':').map(Number);
              let d = (h2 * 60 + m2) - (h1 * 60 + m1); 
              if (d < 0) d += 1440;
              return (
                <div key={i}>
                  <p className="font-bold text-slate-900">Shift {i + 1}:</p>
                  <p className="pl-4 text-indigo-600">{s.start} to {s.end} = {d} minutes ({Math.floor(d/60)}h {d%60}m)</p>
                  {i < shifts.length - 1 && <div className="border-t border-slate-200 my-2"></div>}
                </div>
              );
            })}
            <div className="border-t-2 border-slate-300 my-3"></div>
            <p className="font-bold text-slate-900">Total:</p>
            <p className="pl-4 font-bold text-indigo-600">{totalMins} minutes = {Math.floor(totalMins / 60)}h {totalMins % 60}m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BREAK CALCULATOR ---
export const BreakCalculator: React.FC = () => {
  const [total, setTotal] = useState('480');
  const [breaks, setBreaks] = useState('60');
  const [res, setRes] = useState<{ str: string, totalM: number, breakM: number, netM: number } | null>(null);

  const calculate = () => {
    const t = parseInt(total) || 0;
    const b = parseInt(breaks) || 0;
    const net = t - b;
    setRes({ 
      str: `${Math.floor(net / 60)}h ${net % 60}m`,
      totalM: t,
      breakM: b,
      netM: net
    });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Total Shift Duration (minutes)</label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Total Break Time (minutes)</label>
          <input type="number" value={breaks} onChange={e => setBreaks(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
        </div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate Net Work Time</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-10 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-indigo-400">Net Work Time</p>
             <p className="text-5xl font-black text-indigo-900">{res.str}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Start with Total Duration:</p>
              <p className="pl-4 font-bold text-indigo-600">{res.totalM} minutes</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Subtract Break Time:</p>
              <p className="pl-4 font-bold text-indigo-600">{res.totalM} - {res.breakM} = {res.netM} minutes</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Convert to Hours & Minutes:</p>
              <p className="pl-4 font-bold text-indigo-600">{Math.floor(res.netM/60)} hours, {res.netM%60} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TIME UNIT CONVERTER ---
export const TimeUnitConverter: React.FC = () => {
  const [val, setVal] = useState('1');
  const [from, setFrom] = useState('days');
  const factors: any = { seconds: 1, minutes: 60, hours: 3600, days: 86400, weeks: 604800 };
  const res = (parseFloat(val) * factors[from]);
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Amount to Convert</label>
        <div className="flex gap-4">
          <input aria-label="Amount" type="number" value={val} onChange={e => setVal(e.target.value)} className="w-1/2 p-4 border rounded-2xl font-bold text-xl text-slate-800" />
          <select aria-label="From Unit" value={from} onChange={e => setFrom(e.target.value)} className="w-1/2 p-4 border rounded-2xl font-bold text-xl text-slate-800 bg-white">
            {Object.keys(factors).map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {Object.keys(factors).map(k => (
          <div key={k} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter mb-1">{k}</p>
            <p className="font-bold text-slate-900 text-2xl">{(res / factors[k]).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TIME UNTIL MIDNIGHT ---
export const TimeUntilMidnight: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const mid = new Date(); mid.setHours(24, 0, 0, 0);
      const diff = mid.getTime() - now.getTime();
      const h = Math.floor(diff/3600000); const m = Math.floor((diff%3600000)/60000); const s = Math.floor((diff%60000)/1000);
      setTime(`${h}h ${m}m ${s}s`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  if (!time) {
      return <div className="p-16 text-center animate-pulse"><p className="text-xs font-black text-slate-300 uppercase tracking-[0.25em] mb-6">Countdown to Midnight</p><p className="text-7xl md:text-8xl font-black font-mono text-slate-200 tabular-nums">00h 00m 00s</p></div>;
  }

  return <div className="p-16 text-center"><p className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] mb-6">Countdown to Midnight</p><p className="text-7xl md:text-8xl font-black font-mono text-slate-900 tabular-nums">{time}</p></div>;
};

// --- WEDDING COUNTDOWN ---
export const WeddingCountdown: React.FC = () => {
  const [d, setD] = useState('2025-06-20');
  const [res, setRes] = useState<number | null>(null);
  const calculate = () => { const diff = new Date(d).getTime() - new Date().getTime(); setRes(Math.ceil(diff/86400000)); };
  return (
    <div className="p-10 space-y-8">
      <div>
        <label className="text-xs font-black uppercase text-slate-600 block mb-3 ml-1">Wedding Date</label>
        <input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full p-5 border rounded-2xl font-black text-2xl text-center bg-slate-50 text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 transition-colors shadow-lg text-lg tracking-wide">Calculate Days Until</button>
      {res !== null && <div className="p-12 bg-rose-50 text-center rounded-[2rem] border border-rose-100"><p className="text-8xl font-black text-rose-600">{res}</p><p className="text-sm font-black uppercase tracking-widest text-rose-400 mt-4">Days to the Big Day!</p></div>}
    </div>
  );
};

// --- NEW YEAR COUNTDOWN ---
export const NewYearCountdown: React.FC = () => {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(new Date().getFullYear() + 1, 0, 1);
    setDays(Math.ceil((target.getTime() - new Date().getTime())/86400000));
  }, []);
  
  if (days === null) {
      return <div className="p-20 text-center bg-slate-900 text-white rounded-[2.5rem] shadow-xl animate-pulse"><p className="text-9xl font-black text-slate-800 mb-4 tabular-nums">000</p><p className="text-base font-black uppercase tracking-[0.3em] text-slate-800">Loading...</p></div>;
  }

  return <div className="p-20 text-center bg-slate-900 text-white rounded-[2.5rem] shadow-xl"><p className="text-9xl font-black text-blue-400 mb-4 tabular-nums">{days}</p><p className="text-base font-black uppercase tracking-[0.3em] text-slate-400">Days to {new Date().getFullYear() + 1}</p></div>;
};

// --- EXAM COUNTDOWN ---
export const ExamCountdown: React.FC = () => {
  const [d, setD] = useState('');
  const [res, setRes] = useState<number | null>(null);
  const calculate = () => { if(!d) return; const diff = new Date(d).getTime() - new Date().getTime(); setRes(Math.max(0, Math.ceil(diff/86400000))); };
  return (
    <div className="p-10 space-y-8">
      <div>
        <label className="text-xs font-black uppercase text-slate-600 block mb-3 ml-1">Exam Date</label>
        <input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full p-5 border rounded-2xl font-black text-2xl text-center bg-slate-50 text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-colors shadow-md text-lg tracking-wide">Check Study Time</button>
      {res !== null && <div className="p-12 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100"><p className="text-8xl font-black text-indigo-600">{res}</p><p className="text-sm font-black uppercase tracking-widest text-indigo-400 mt-4">Days left to study!</p></div>}
    </div>
  );
};

// --- AGE CALCULATOR ---
export const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState('1990-01-01');
  const [atDate, setAtDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ y: number, m: number, d: number, totalDays: number } | null>(null);

  const calculate = () => {
    const start = new Date(dob);
    const end = new Date(atDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ y: years, m: months, d: days, totalDays });
  };

  return (
    <div className="space-y-6 p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <div className="space-y-6">
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2 tracking-wider">Date of Birth</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full p-4 border rounded-2xl text-lg font-bold text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" /></div>
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2 tracking-wider">Calculate Age At</label><input type="date" value={atDate} onChange={e => setAtDate(e.target.value)} className="w-full p-4 border rounded-2xl text-lg font-bold text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" /></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-md hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-widest mt-4">Get Exact Age</button>
      
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-8 bg-blue-50 text-center rounded-[2rem] border border-blue-100 shadow-sm">
             <p className="text-5xl font-black text-blue-900 mb-2">{result.y} Years</p>
             <p className="text-blue-600 font-bold text-lg">{result.m} Months, {result.d} Days</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Age Breakdown
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Total Duration:</p>
              <p className="pl-4 font-bold text-blue-600">{result.totalDays.toLocaleString()} days</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Detailed Breakdown:</p>
              <p className="pl-4 font-bold text-blue-600">{result.y} years</p>
              <p className="pl-4 font-bold text-blue-600">+ {result.m} months</p>
              <p className="pl-4 font-bold text-blue-600">+ {result.d} days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- BIRTHDAY CALCULATOR ---
export const BirthdayCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1995-05-15');
  const [result, setResult] = useState<{ days: number, weekday: string, isToday: boolean } | null>(null);

  const calculate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Local midnight
    const [y, m, d] = birthDate.split('-').map(Number);
    const dob = new Date(y, m - 1, d); // Local midnight for birth date

    let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    
    // If birthday has passed this year, move to next year
    if (next < today) {
      next.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setResult({ 
      days: diffDays, 
      weekday: next.toLocaleDateString(undefined, { weekday: 'long' }),
      isToday: diffDays === 0
    });
  };

  return (
    <div className="space-y-8 p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <div><label className="block text-xs font-black text-slate-600 uppercase mb-3 tracking-wider">Enter Birthday</label><input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-5 border rounded-2xl text-2xl font-black text-center text-slate-800" /></div>
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow hover:bg-indigo-700 text-lg">Check Days Until</button>
      {result && (
        <div className="p-10 bg-indigo-50 rounded-[2rem] text-center border border-indigo-100">
          {result.isToday ? (
             <>
              <p className="text-6xl font-black text-indigo-600 mb-4">🎉 Happy Birthday! 🎂</p>
              <p className="text-indigo-900 font-bold text-xl">It's your special day!</p>
             </>
          ) : (
             <>
              <p className="text-7xl font-black text-indigo-900 leading-none">{result.days}</p>
              <p className="text-indigo-400 font-black uppercase tracking-widest text-xs mt-3">Days to next birthday</p>
              <p className="mt-6 text-indigo-900 font-bold italic text-base">It will be on a {result.weekday}!</p>
             </>
          )}
        </div>
      )}
    </div>
  );
};

// --- TIME BETWEEN DATES ---
export const TimeBetweenDatesCalculator: React.FC = () => {
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [res, setRes] = useState<{ d: number, w: number, m: number } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => { 
      if (!d1 || !d2) return; 
      const diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime()); 
      const d = Math.floor(diff/86400000); 
      setRes({ d, w: parseFloat((d/7).toFixed(1)), m: parseFloat((d/30.44).toFixed(1)) }); 
      setShowResult(true);
  };

  return (
    <div className="relative p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6 h-full flex flex-col justify-between overflow-hidden">
      <div className="space-y-6">
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2">Start Date</label><input type="date" value={d1} onChange={e=>setD1(e.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800"/></div>
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2">End Date</label><input type="date" value={d2} onChange={e=>setD2(e.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800"/></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow text-sm uppercase tracking-widest mt-4">Get Duration</button>
      
      {res && showResult && (
        <div className="absolute inset-0 bg-slate-50 z-20 p-6 flex flex-col items-center justify-center text-center">
          <div className="grid grid-cols-3 gap-3 w-full mb-8">
              <div><p className="text-2xl font-black text-slate-900">{res.d}</p><p className="text-[10px] text-slate-500 font-black uppercase mt-1">Days</p></div>
              <div><p className="text-2xl font-black text-slate-900">{res.w}</p><p className="text-[10px] text-slate-500 font-black uppercase mt-1">Weeks</p></div>
              <div><p className="text-2xl font-black text-slate-900">{res.m}</p><p className="text-[10px] text-slate-500 font-black uppercase mt-1">Months</p></div>
          </div>
          <button onClick={() => setShowResult(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
              Recalculate
          </button>
        </div>
      )}
    </div>
  );
};

// --- WORK HOURS ---
export const WorkHoursCalculator: React.FC = () => {
  const [s, setS] = useState('09:00');
  const [e, setE] = useState('17:00');
  const [b, setB] = useState('30');
  const [res, setRes] = useState<{ str: string, totalM: number, breakM: number, grossM: number } | null>(null);

  const calculate = () => { 
      const [sh, sm] = s.split(':').map(Number); 
      const [eh, em] = e.split(':').map(Number); 
      
      let gross = (eh * 60 + em) - (sh * 60 + sm); 
      if (gross < 0) gross += 1440; 
      
      const breakMins = parseInt(b || '0');
      const net = gross - breakMins;
      
      setRes({ 
        str: `${Math.floor(net / 60)}h ${net % 60}m`,
        totalM: net,
        breakM: breakMins,
        grossM: gross
      }); 
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Start (In)</label><input type="time" value={s} onChange={v => setS(v.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" /></div>
          <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">End (Out)</label><input type="time" value={e} onChange={v => setE(v.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" /></div>
        </div>
        <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Break (Minutes)</label><input type="number" value={b} onChange={v => setB(v.target.value)} placeholder="0" className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" /></div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-widest mt-4">Calculate Shift</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-8 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-indigo-400">Net Work Hours</p>
             <p className="text-5xl font-black text-indigo-900">{res.str}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Calculate Gross Duration:</p>
              <p className="pl-4 font-bold text-indigo-600">End - Start = {res.grossM} minutes ({Math.floor(res.grossM/60)}h {res.grossM%60}m)</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Subtract Break:</p>
              <p className="pl-4 font-bold text-indigo-600">{res.grossM} - {res.breakM} = {res.totalM} minutes</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Convert to Hours & Minutes:</p>
              <p className="pl-4 font-bold text-indigo-600">{Math.floor(res.totalM/60)} hours, {res.totalM%60} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SLEEP CALCULATOR ---
export const SleepCalculator: React.FC = () => {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [results, setResults] = useState<string[]>([]);
  const calculate = () => {
    const [h, m] = wakeTime.split(':').map(Number);
    const wake = new Date(); wake.setHours(h, m, 0);
    const times = [];
    for (let i = 6; i >= 3; i--) {
      const bed = new Date(wake.getTime() - (i * 90 * 60 * 1000) - (14 * 60 * 1000));
      times.push(bed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setResults(times);
  };
  return (
    <div className="p-10 space-y-8 text-center">
      <div className="space-y-5">
        <label className="text-xs font-black text-slate-600 uppercase tracking-widest block">I want to wake up at:</label>
        <input aria-label="Wake Up Time" type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="text-6xl font-black p-6 border rounded-[2rem] text-center bg-slate-50 w-full text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-colors text-lg">Calculate Bedtimes</button>
      {results.length > 0 && <div className="space-y-4 pt-6"><p className="text-xs font-black text-slate-600 uppercase">Suggested Bedtimes (90m cycles):</p><div className="grid grid-cols-2 gap-4">{results.map((t, i) => <div key={i} className={`p-6 rounded-2xl text-center font-black text-2xl border ${i === 0 ? 'bg-blue-600 text-white border-blue-700 shadow-lg' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>{t}</div>)}</div><p className="text-[10px] text-slate-500 text-center italic mt-2">Includes 14 minutes to fall asleep.</p></div>}
    </div>
  );
};

// --- MEETING COST ---
export const MeetingCostCalculator: React.FC = () => {
  const [attendees, setAttendees] = useState('5');
  const [avgRate, setAvgRate] = useState('50');
  const [duration, setDuration] = useState('60');
  const [cost, setCost] = useState<number | null>(null);
  const calculate = () => {
    const total = parseInt(attendees) * parseFloat(avgRate) * (parseFloat(duration) / 60);
    setCost(total);
  };
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-6">
        <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Number of Attendees</label><input type="number" value={attendees} onChange={e => setAttendees(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" /></div>
        <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Avg Hourly Rate ($)</label><input type="number" value={avgRate} onChange={e => setAvgRate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" /></div>
        <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Duration (Minutes)</label><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" /></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg hover:bg-emerald-700 transition-colors text-base tracking-wide">Calculate Cost</button>
      {cost !== null && <div className="p-10 bg-emerald-50 text-center rounded-[2rem] border border-emerald-100"><p className="text-xs font-black text-emerald-600 uppercase mb-3">Estimated Labor Cost</p><p className="text-6xl font-black text-emerald-900">${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>}
    </div>
  );
};

// --- RETIREMENT COUNTDOWN ---
export const RetirementCountdown: React.FC = () => {
  const [retireDate, setRetireDate] = useState('2055-01-01');
  const [timeLeft, setTimeLeft] = useState<{ y: number, d: number } | null>(null);
  const calculate = () => {
    const target = new Date(retireDate);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) { setTimeLeft(null); return; }
    const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    const days = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    setTimeLeft({ y: years, d: days });
  };
  return (
    <div className="p-10 space-y-8">
      <div><label className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-3 ml-1">Expected Retirement Date</label><input type="date" value={retireDate} onChange={e => setRetireDate(e.target.value)} className="w-full p-5 border rounded-2xl font-black text-center text-2xl bg-slate-50 text-slate-800" /></div>
      <button onClick={calculate} className="w-full py-6 bg-indigo-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all text-base tracking-wide">Calculate Remaining Time</button>
      {timeLeft && <div className="p-10 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100"><p className="text-7xl font-black text-indigo-900 leading-none">{timeLeft.y}</p><p className="text-sm font-black text-indigo-400 uppercase mt-3">Years</p><p className="text-4xl font-black text-indigo-700 mt-6">& {timeLeft.d} Days</p></div>}
    </div>
  );
};

// --- PACE CALCULATOR ---
export const PaceCalculator: React.FC = () => {
  const [dist, setDist] = useState('5');
  const [h, setH] = useState('0');
  const [m, setM] = useState('25');
  const [s, setS] = useState('0');
  const [res, setRes] = useState<{ pace: string, totalSecs: number, dist: number, paceSecs: number } | null>(null);

  const calculate = () => {
    const totalSecs = (parseInt(h || '0') * 3600) + (parseInt(m || '0') * 60) + parseInt(s || '0');
    const d = parseFloat(dist);
    
    if (!d || d === 0) return;
    
    const paceSecs = totalSecs / d;
    const pm = Math.floor(paceSecs / 60);
    const ps = Math.round(paceSecs % 60);
    const paceStr = `${pm}:${ps.toString().padStart(2, '0')}`;
    
    setRes({ pace: paceStr, totalSecs, dist: d, paceSecs });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div>
        <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 tracking-widest">Distance (km)</label>
        <input type="number" value={dist} onChange={e => setDist(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all" />
      </div>
      
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Total Time</label>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">Hours</span>
            <input aria-label="Hours" type="number" value={h} onChange={e => setH(e.target.value)} className="w-full p-4 pt-7 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all" />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">Minutes</span>
            <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 pt-7 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all" />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">Seconds</span>
            <input aria-label="Seconds" type="number" value={s} onChange={e => setS(e.target.value)} className="w-full p-4 pt-7 border rounded-2xl text-center font-bold text-xl text-slate-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all" />
          </div>
        </div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate Pace</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-10 bg-orange-50 text-center rounded-[2rem] border border-orange-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-orange-500">Average Pace</p>
             <p className="text-6xl font-black text-orange-900">{res.pace} <span className="text-lg text-orange-400 font-bold">/km</span></p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Convert Total Time to Seconds:</p>
              <p className="pl-4 font-bold text-orange-600">
                ({h}h × 3600) + ({m}m × 60) + {s}s = {res.totalSecs} seconds
              </p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Divide by Distance:</p>
              <p className="pl-4 font-bold text-orange-600">
                {res.totalSecs} ÷ {res.dist} = {res.paceSecs.toFixed(1)} seconds/km
              </p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Convert back to MM:SS:</p>
              <p className="pl-4 font-bold text-orange-600">
                {Math.floor(res.paceSecs / 60)} minutes, {Math.round(res.paceSecs % 60)} seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- UNIX TIMESTAMP ---
export const UnixTimestampTool: React.FC = () => {
  const [now, setNow] = useState<number | null>(null); 
  const [inputTs, setInputTs] = useState(''); 
  const [tsResult, setTsResult] = useState<string | null>(null);
  
  useEffect(() => { 
      setNow(Math.floor(Date.now() / 1000));
      const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000); 
      return () => clearInterval(timer); 
  }, []);
  
  const convert = () => { if (!inputTs) return; const ts = parseInt(inputTs); setTsResult(new Date(ts * (inputTs.length > 10 ? 1 : 1000)).toUTCString()); };
  
  return (
    <div className="space-y-8 p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <div className="text-center p-12 bg-slate-900 rounded-[2.5rem] text-white shadow-md">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Current Unix Timestamp</label>
        <p className="text-6xl font-mono font-black text-blue-400 tabular-nums">{now !== null ? now : 'Loading...'}</p>
      </div>
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Convert Timestamp</label>
        <div className="flex gap-4">
          <input aria-label="Timestamp Input" type="text" value={inputTs} onChange={e => setInputTs(e.target.value)} placeholder="Enter Unix TS..." className="flex-grow p-5 border rounded-2xl font-mono text-2xl text-slate-800" />
          <button onClick={convert} className="px-12 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-sm uppercase tracking-wider">CONVERT</button>
        </div>
      </div>
      {tsResult && <div className="p-8 bg-blue-50 rounded-[2rem] text-center font-bold border border-blue-100 text-2xl text-slate-900">{tsResult}</div>}
    </div>
  );
};

// --- TIME ZONE CONVERTER ---
export const TimeZoneConverter: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']);

  useEffect(() => { 
    setTime(new Date());
    const i = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(i); 
  }, []);

  const toggleFavorite = (zone: string) => {
    if (favorites.includes(zone)) {
      setFavorites(favorites.filter(z => z !== zone));
    } else {
      setFavorites([...favorites, zone]);
    }
  };

  const filteredCities = CITIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  // Sort: Favorites first, then alphabetical
  const sortedCities = [...filteredCities].sort((a, b) => {
    const aFav = favorites.includes(a.zone);
    const bFav = favorites.includes(b.zone);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.name.localeCompare(b.name);
  });

  if (!time) {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden divide-y animate-pulse p-10">
          <div className="h-10 bg-slate-100 rounded-xl w-full mb-8"></div>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="py-6 flex justify-between items-center border-b border-slate-50 last:border-0">
              <span className="bg-slate-100 rounded w-32 h-6 block"></span>
              <span className="bg-slate-100 rounded w-24 h-8 block"></span>
            </div>
          ))}
        </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
                type="text" 
                placeholder="Search city or country..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow divide-y divide-slate-50">
        {sortedCities.length > 0 ? sortedCities.map(city => {
            const isFav = favorites.includes(city.zone);
            return (
                <div key={`${city.name}-${city.zone}`} className={`px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors group ${isFav ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => toggleFavorite(city.zone)} className={`p-2 rounded-full transition-colors ${isFav ? 'text-yellow-400 hover:bg-yellow-50' : 'text-slate-200 hover:text-yellow-400 hover:bg-slate-100'}`}>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        </button>
                        <div>
                            <p className="font-black text-slate-800 text-lg">{city.name}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{city.country}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-mono font-black text-2xl md:text-3xl text-slate-900 tabular-nums tracking-tight">
                            {time.toLocaleTimeString(undefined, { timeZone: city.zone, hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {time.toLocaleDateString(undefined, { timeZone: city.zone, weekday: 'short', day: 'numeric' })}
                        </p>
                    </div>
                </div>
            );
        }) : (
            <div className="p-10 text-center text-slate-400 font-bold">No cities found matching "{search}"</div>
        )}
      </div>
    </div>
  );
};

// --- POMODORO ---
export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (active && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setTime(nextMode === 'work' ? 25 * 60 : 5 * 60);
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, time, mode]);

  const toggle = () => setActive(!active);
  const reset = () => {
    setActive(false);
    setTime(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-sm text-center space-y-6 transition-all duration-700 h-full flex flex-col justify-center ${mode === 'work' ? 'bg-white border-rose-100' : 'bg-emerald-50 border-emerald-200'}`}>
       <div className="flex justify-center gap-2">
         <button onClick={() => { setMode('work'); setTime(25*60); setActive(false); }} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'work' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Focus</button>
         <button onClick={() => { setMode('break'); setTime(5*60); setActive(false); }} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Rest</button>
      </div>
      <div className={`text-6xl sm:text-7xl font-black font-mono tracking-tighter tabular-nums leading-none ${mode === 'work' ? 'text-rose-600' : 'text-emerald-700'}`}>
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <div className="flex gap-3">
        <button onClick={toggle} className={`flex-grow py-4 rounded-2xl font-black text-white text-xs uppercase tracking-widest shadow transition-all ${active ? 'bg-slate-800' : (mode === 'work' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700')}`}>
          {active ? 'PAUSE' : 'START'}
        </button>
        <button aria-label="Reset Timer" onClick={reset} className="px-5 py-4 bg-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>
    </div>
  );
};

// --- MILITARY TIME (UPDATED) ---
export const MilitaryTimeCalculator: React.FC = () => {
  const [mode, setMode] = useState<'to24' | 'to12'>('to24');
  const [h12, setH12] = useState('');
  const [m12, setM12] = useState('');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('PM');
  const [t24, setT24] = useState('');
  const [res, setRes] = useState<{ str: string, steps: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setError(null);
    setRes(null);

    if (mode === 'to24') {
      const h = parseInt(h12);
      const m = parseInt(m12);

      if (isNaN(h) || h < 1 || h > 12) {
        setError('Please enter a valid hour (1-12).');
        return;
      }
      if (isNaN(m) || m < 0 || m > 59) {
        setError('Please enter valid minutes (0-59).');
        return;
      }

      let hour24 = h;
      let steps: string[] = [];
      steps.push(`Start time: ${h}:${m.toString().padStart(2, '0')} ${ampm}`);

      if (ampm === 'PM' && h !== 12) {
        hour24 += 12;
        steps.push(`PM and not 12: Add 12 to hours (${h} + 12 = ${hour24})`);
      } else if (ampm === 'AM' && h === 12) {
        hour24 = 0;
        steps.push(`12 AM (Midnight): Hours become 00`);
      } else {
        steps.push(`${ampm}: Hours remain ${hour24.toString().padStart(2, '0')}`);
      }

      setRes({
        str: `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} Hours`,
        steps
      });
    } else {
      let input = t24.trim();
      input = input.replace(':', '');

      if (!/^\d+$/.test(input)) {
        setError('Please enter a valid time (e.g., 1430 or 14:30).');
        return;
      }

      if (input.length === 3) {
        input = '0' + input;
      }

      if (input.length !== 4) {
        setError('Please enter a 4-digit time (e.g., 0930, 1700).');
        return;
      }

      const h = parseInt(input.slice(0, 2));
      const m = parseInt(input.slice(2, 4));

      if (h < 0 || h > 23) {
        setError('Hours must be between 00 and 23.');
        return;
      }
      if (m < 0 || m > 59) {
        setError('Minutes must be between 00 and 59.');
        return;
      }

      const suffix = h >= 12 ? 'PM' : 'AM';
      let hStandard = h % 12;
      if (hStandard === 0) hStandard = 12;

      let steps: string[] = [];
      steps.push(`Start time: ${input.slice(0, 2)}:${input.slice(2, 4)}`);
      
      if (h >= 12) {
        steps.push(`Hours >= 12: It is PM`);
        if (h > 12) {
          steps.push(`Subtract 12 from hours (${h} - 12 = ${hStandard})`);
        } else {
          steps.push(`12 PM (Noon): Hours remain 12`);
        }
      } else {
        steps.push(`Hours < 12: It is AM`);
        if (h === 0) {
          steps.push(`00 Hours (Midnight): Becomes 12 AM`);
        } else {
          steps.push(`Hours remain ${h}`);
        }
      }

      setRes({
        str: `${hStandard}:${m.toString().padStart(2, '0')} ${suffix}`,
        steps
      });
    }
  };

  return (
    <div className="p-8 md:p-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-10">
      <div className="flex p-1.5 bg-slate-100 rounded-2xl">
        <button onClick={() => {setMode('to24'); setRes(null); setError(null);}} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'to24' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Standard to Military</button>
        <button onClick={() => {setMode('to12'); setRes(null); setError(null);}} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'to12' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Military to Standard</button>
      </div>
      
      {mode === 'to24' ? (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex gap-2 items-center">
            <input 
              type="number" 
              value={h12} 
              onChange={e => setH12(e.target.value)} 
              className="w-32 md:w-40 p-5 text-center text-3xl font-black bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
              placeholder="HH" 
              min="1" max="12"
            />
            <span className="text-2xl font-black text-slate-300">:</span>
            <input 
              type="number" 
              value={m12} 
              onChange={e => setM12(e.target.value)} 
              className="w-32 md:w-40 p-5 text-center text-3xl font-black bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
              placeholder="MM" 
              min="0" max="59"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto justify-center">
            <button onClick={() => setAmpm('AM')} className={`flex-1 md:flex-none px-6 py-5 rounded-2xl text-lg font-black transition-all ${ampm === 'AM' ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>AM</button>
            <button onClick={() => setAmpm('PM')} className={`flex-1 md:flex-none px-6 py-5 rounded-2xl text-lg font-black transition-all ${ampm === 'PM' ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>PM</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <input 
            type="text" 
            value={t24} 
            onChange={e => setT24(e.target.value)} 
            className="w-full max-w-md p-6 text-center text-4xl font-black bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
            placeholder="1300 or 13:30" 
          />
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 font-bold text-center rounded-xl border border-rose-100 animate-pulse">
          {error}
        </div>
      )}

      <button onClick={convert} className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all text-lg tracking-wide shadow-xl shadow-slate-200">Convert Time</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-12 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 text-center shadow-sm">
            <p className="text-sm font-black uppercase text-blue-400 tracking-[0.2em] mb-4">Converted Result</p>
            <p className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">{res.str}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Conversion Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              {res.steps.map((step, i) => (
                <div key={i}>
                  <p className={i === 0 ? "font-bold text-slate-900" : "pl-4 text-blue-600"}>{step}</p>
                  {i < res.steps.length - 1 && <div className="border-t border-slate-200 my-2"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- OVERTIME ---
export const OvertimeCalculator: React.FC = () => {
  const [rate, setRate] = useState('25');
  const [hrs, setHrs] = useState('45');
  const [res, setRes] = useState<{ regPay: number, otPay: number, total: number, regHrs: number, otHrs: number, otRate: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(rate) || 0;
    const h = parseFloat(hrs) || 0;
    const regHrs = Math.min(40, h);
    const otHrs = Math.max(0, h - 40);
    const otRate = r * 1.5;
    
    const regPay = regHrs * r;
    const otPay = otHrs * otRate;
    const pay = regPay + otPay;
    
    setRes({ regPay, otPay, total: pay, regHrs, otHrs, otRate });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Hourly Rate ($)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Rate" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 tracking-widest">Total Hours</label>
          <input type="number" value={hrs} onChange={e => setHrs(e.target.value)} placeholder="Hours" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
        </div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate Pay</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-10 bg-blue-50 text-center rounded-[2rem] border border-blue-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Total Gross Pay</p>
             <p className="text-5xl font-black text-blue-900">${res.total.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Pay Breakdown
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span>Regular Pay ({res.regHrs}h × ${rate}):</span>
                <span className="font-bold text-slate-900">${res.regPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-blue-600">
                <span>Overtime ({res.otHrs}h × ${res.otRate.toFixed(2)}):</span>
                <span className="font-bold">${res.otPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-1 font-black text-blue-900 text-lg">
                <span>Total:</span>
                <span>${res.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- CHRONOMETER ---
export const Chronometer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      startTimeRef.current = start;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - start);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  const toggle = () => setRunning(!running);
  
  const reset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([time, ...laps]);
  };

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    
    if (h > 0) {
        return (
            <>
                <span className="w-24 inline-block">{h.toString().padStart(2, '0')}</span>:<span className="w-24 inline-block">{m.toString().padStart(2, '0')}</span>:<span className="w-24 inline-block">{s.toString().padStart(2, '0')}</span><span className="text-4xl align-top mt-2 inline-block text-slate-500">.{centi.toString().padStart(2, '0')}</span>
            </>
        );
    }

    return (
      <>
        <span className="w-32 inline-block">{m.toString().padStart(2, '0')}</span>:<span className="w-32 inline-block">{s.toString().padStart(2, '0')}</span><span className="text-5xl align-top mt-4 inline-block text-slate-500">.{centi.toString().padStart(2, '0')}</span>
      </>
    );
  };

  const formatLap = (ms: number) => {
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      const centi = Math.floor((ms % 1000) / 10);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  }

  return (
    <div className="p-8 md:p-16 text-center space-y-12 max-w-3xl mx-auto">
      <div className="relative">
          <div className="text-7xl md:text-9xl font-mono font-black tabular-nums text-slate-900 tracking-tighter flex justify-center items-baseline">
            {formatTime(time)}
          </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {running ? (
            <>
                <button onClick={toggle} className="py-6 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-3xl shadow-xl transition-all text-xl tracking-widest uppercase transform active:scale-95">Stop</button>
                <button onClick={lap} className="py-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-3xl transition-all text-xl tracking-widest uppercase transform active:scale-95">Lap</button>
            </>
        ) : (
            <>
                <button onClick={toggle} className="py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-3xl shadow-xl transition-all text-xl tracking-widest uppercase transform active:scale-95">Start</button>
                <button onClick={reset} disabled={time === 0} className={`py-6 font-black rounded-3xl transition-all text-xl tracking-widest uppercase transform active:scale-95 ${time === 0 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>Reset</button>
            </>
        )}
      </div>

      {laps.length > 0 && (
          <div className="mt-12 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden max-h-96 overflow-y-auto">
              <div className="grid grid-cols-3 p-4 border-b border-slate-200 bg-slate-100 text-xs font-black uppercase tracking-widest text-slate-600 sticky top-0">
                  <div>Lap #</div>
                  <div>Split</div>
                  <div>Total</div>
              </div>
              <div className="divide-y divide-slate-100">
                  {laps.map((lapTime, i) => {
                      return (
                        <div key={laps.length - i} className="grid grid-cols-3 p-4 font-mono font-bold text-lg text-slate-700 hover:bg-white transition-colors">
                            <div className="text-slate-500">#{laps.length - i}</div>
                            <div className="text-blue-600">+{formatLap(i === laps.length - 1 ? lapTime : laps[i] - laps[i+1])}</div>
                            <div>{formatLap(lapTime)}</div>
                        </div>
                      );
                  })}
              </div>
          </div>
      )}
    </div>
  );
};

export const DecimalTimeCalculatorComp: React.FC = () => {
  const [h, setH] = useState('2');
  const [m, setM] = useState('45');
  const [s, setS] = useState('45');
  const [res, setRes] = useState<{ hours: string, minutes: string, seconds: string } | null>(null);

  const calculate = () => {
    const hours = parseInt(h || '0');
    const minutes = parseInt(m || '0');
    const seconds = parseInt(s || '0');

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    const decimalHours = (totalSeconds / 3600).toFixed(4);
    const decimalMinutes = (totalSeconds / 60).toFixed(2);
    const decimalSeconds = totalSeconds.toFixed(0);

    setRes({ hours: decimalHours, minutes: decimalMinutes, seconds: decimalSeconds });
  };

  return (
    <div className="p-8 md:p-10 space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Time to Convert</label>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span>
            <input 
              aria-label="Hours" 
              type="number" 
              value={h} 
              onChange={e => setH(e.target.value)} 
              className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" 
              placeholder="0"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span>
            <input 
              aria-label="Minutes" 
              type="number" 
              value={m} 
              onChange={e => setM(e.target.value)} 
              className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" 
              placeholder="0"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span>
            <input 
              aria-label="Seconds" 
              type="number" 
              value={s} 
              onChange={e => setS(e.target.value)} 
              className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" 
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-lg hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">
        Convert to Decimal
      </button>

      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Result */}
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 text-center space-y-6">
            <div>
              <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">{res.hours}</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">Decimal Hours</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/60">
              <div>
                <p className="text-2xl font-black text-slate-700">{res.minutes}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Minutes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-700">{res.seconds}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Seconds</p>
              </div>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>

            {/* Hours Calculation */}
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-2">To Decimal Hours</h4>
              <div className="font-mono text-sm md:text-base text-slate-700 space-y-2 bg-slate-50 p-4 rounded-xl">
                <p className="flex flex-wrap gap-2 items-center">
                  <span className="font-bold text-blue-600">{h || 0} hr</span> + 
                  <span className="font-bold text-blue-600">{m || 0} min</span> × (1 hr / 60 min) + 
                  <span className="font-bold text-blue-600">{s || 0} sec</span> × (1 hr / 3600 sec)
                </p>
                <p className="text-slate-400 text-xs pl-4">↓</p>
                <p>
                  = {h || 0} hr + {(parseInt(m || '0') / 60).toFixed(4)} hr + {(parseInt(s || '0') / 3600).toFixed(4)} hr
                </p>
                <p className="text-slate-400 text-xs pl-4">↓</p>
                <p className="font-bold text-lg text-slate-900">= {res.hours} hours</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                We convert everything to hours. Minutes are divided by 60 (since there are 60 minutes in an hour), and seconds are divided by 3600 (60 × 60). Adding these parts gives the total decimal hours.
              </p>
            </div>

            {/* Minutes Calculation */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-2">To Total Minutes</h4>
              <div className="font-mono text-sm md:text-base text-slate-700 space-y-2 bg-slate-50 p-4 rounded-xl">
                <p className="flex flex-wrap gap-2 items-center">
                  <span className="font-bold text-blue-600">{h || 0} hr</span> × 60 + 
                  <span className="font-bold text-blue-600">{m || 0} min</span> + 
                  <span className="font-bold text-blue-600">{s || 0} sec</span> / 60
                </p>
                <p className="text-slate-400 text-xs pl-4">↓</p>
                <p>
                  = {parseInt(h || '0') * 60} min + {m || 0} min + {(parseInt(s || '0') / 60).toFixed(2)} min
                </p>
                <p className="text-slate-400 text-xs pl-4">↓</p>
                <p className="font-bold text-lg text-slate-900">= {res.minutes} minutes</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To get total minutes, we multiply hours by 60 and divide seconds by 60, then add them to the minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const USFederalHolidays: React.FC = () => {
  const h = ["New Year's Day (Jan 1)", "MLK Jr. Day (Jan 20)", "Presidents' Day (Feb 17)", "Memorial Day (May 26)", "Juneteenth (Jun 19)", "Independence Day (Jul 4)", "Labor Day (Sep 1)", "Veterans Day (Nov 11)", "Thanksgiving (Nov 27)", "Christmas Day (Dec 25)"];
  return (
    <div className="divide-y border-t border-slate-100 mt-6">
      {h.map((name, i) => <div key={i} className="p-6 hover:bg-slate-50 font-bold text-slate-700 transition-colors text-lg">{name}</div>)}
    </div>
  );
};

export const DaysFromNowCalculator: React.FC = () => {
  const [d, setD] = useState('30');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const target = new Date(); target.setDate(target.getDate() + parseInt(d)); setRes(target.toDateString()); };
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block text-center tracking-widest">Number of Days</label>
        <input aria-label="Days Count" type="number" value={d} onChange={e => setD(e.target.value)} className="w-full p-5 border rounded-2xl text-center font-black text-4xl text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow hover:bg-indigo-700 transition-colors text-base tracking-wide">Calculate Future Date</button>
      {res && <div className="p-10 bg-indigo-50 text-center font-black text-3xl rounded-[2rem] border border-indigo-100 text-indigo-900">{res}</div>}
    </div>
  );
};

export const BillableHoursCalculator: React.FC = () => {
  const [m, setM] = useState('45');
  const [res, setRes] = useState<{ units: string, minutes: number, roundedMinutes: number } | null>(null);

  const calculate = () => {
    const mins = parseInt(m) || 0;
    const units = Math.ceil(mins / 6);
    const roundedMins = units * 6;
    setRes({
      units: (units / 10).toFixed(1),
      minutes: mins,
      roundedMinutes: roundedMins
    });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div className="space-y-3 text-center">
        <label className="text-xs font-black uppercase text-slate-600 block tracking-widest">Minutes Worked</label>
        <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} placeholder="e.g. 45" className="w-full p-5 border rounded-2xl text-center font-black text-5xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Convert to Billable Units (0.1)</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-slate-100">
          <div className="p-10 bg-blue-50 text-center rounded-[2rem] border border-blue-100 shadow-sm">
             <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Billable Units</p>
             <p className="text-6xl font-black text-blue-900">{res.units}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Steps
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Standard Billing Increment:</p>
              <p className="pl-4 font-bold text-blue-600">6 minutes = 0.1 unit</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Round Up to Next Increment:</p>
              <p className="pl-4 font-bold text-blue-600">{res.minutes} minutes → rounded up to {res.roundedMinutes} minutes</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Calculate Units:</p>
              <p className="pl-4 font-bold text-blue-600">{res.roundedMinutes} ÷ 60 = {res.units} hours/units</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const TimeBetweenTimesCalculator: React.FC = () => {
  const [t1, setT1] = useState('09:00');
  const [t2, setT2] = useState('17:00');
  const [res, setRes] = useState<{ str: string, diffM: number, isOvernight: boolean } | null>(null);

  const calculate = () => {
    const [h1, m1] = t1.split(':').map(Number);
    const [h2, m2] = t2.split(':').map(Number);
    
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    let isOvernight = false;
    
    if (diff < 0) {
      diff += 1440;
      isOvernight = true;
    }
    
    setRes({ 
      str: `${Math.floor(diff / 60)}h ${diff % 60}m`,
      diffM: diff,
      isOvernight
    });
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Time Range</label>
        <div className="flex gap-6 items-center">
          <div className="flex-1">
            <span className="text-[10px] font-black text-slate-500 block mb-1 uppercase">START</span>
            <input aria-label="Start Time" type="time" value={t1} onChange={e => setT1(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
          <span className="font-black text-slate-300 pt-6 text-xl">→</span>
          <div className="flex-1">
            <span className="text-[10px] font-black text-slate-500 block mb-1 uppercase">END</span>
            <input aria-label="End Time" type="time" value={t2} onChange={e => setT2(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
        </div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Get Duration</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-blue-50 text-center text-6xl font-black rounded-[2rem] border border-blue-100 text-blue-900">
            {res.str}
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              How it works
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Convert times to minutes from midnight:</p>
              <p className="pl-4 font-bold text-blue-600">Start: {parseInt(t1.split(':')[0]) * 60 + parseInt(t1.split(':')[1])} min | End: {parseInt(t2.split(':')[0]) * 60 + parseInt(t2.split(':')[1])} min</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Calculate difference:</p>
              <p className="pl-4 font-bold text-blue-600">
                {res.isOvernight 
                  ? `End is smaller, so add 24h (1440m): (End + 1440) - Start = ${res.diffM} min`
                  : `End - Start = ${res.diffM} min`
                }
              </p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Convert back to Hours & Minutes:</p>
              <p className="pl-4 font-bold text-blue-600">{Math.floor(res.diffM / 60)} hours, {res.diffM % 60} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MinutesToHoursCalculator: React.FC = () => {
  const [m, setM] = useState('150');
  const [res, setRes] = useState<{ str: string, h: number, remM: number } | null>(null);

  const calculate = () => {
    const mins = parseInt(m || '0');
    const h = Math.floor(mins / 60);
    const remM = mins % 60;
    setRes({ str: `${h}h ${remM}m`, h, remM });
  };

  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3 text-center">
        <label className="text-xs font-black uppercase text-slate-600 block tracking-widest">Total Minutes</label>
        <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-5 border rounded-2xl text-center font-black text-5xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Convert to Hours & Minutes</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-slate-50 text-center text-5xl font-black rounded-[2rem] border border-slate-100 text-slate-900">
            {res.str}
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              How it works
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Divide total minutes by 60 to get hours:</p>
              <p className="pl-4 font-bold text-blue-600">{m} ÷ 60 = {res.h} hours (remainder {res.remM})</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. The remainder is the leftover minutes:</p>
              <p className="pl-4 font-bold text-blue-600">{res.remM} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const HoursToMinutesCalculator: React.FC = () => {
  const [h, setH] = useState('2');
  const [m, setM] = useState('30');
  const [res, setRes] = useState<{ total: number, h: number, m: number } | null>(null);

  const calculate = () => {
    const hours = parseInt(h || '0');
    const mins = parseInt(m || '0');
    const total = (hours * 60) + mins;
    setRes({ total, h: hours, m: mins });
  };

  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Hours & Minutes</label>
        <div className="flex gap-5">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span>
            <input aria-label="Hours" type="number" value={h} onChange={e => setH(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span>
            <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          </div>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Convert to Total Minutes</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-slate-50 text-center text-6xl font-black rounded-[2rem] border border-slate-100 text-slate-900">
            {res.total} mins
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              How it works
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Multiply hours by 60 to get minutes:</p>
              <p className="pl-4 font-bold text-blue-600">{res.h} hours × 60 = {res.h * 60} minutes</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. Add the remaining minutes:</p>
              <p className="pl-4 font-bold text-blue-600">{res.h * 60} + {res.m} = {res.total} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CountdownTimer: React.FC = () => {
  const [t, setT] = useState(0); const [active, setActive] = useState(false); const [input, setInput] = useState('60');
  useEffect(() => { let i: any; if (active && t > 0) i = setInterval(() => setT(t => t - 1), 1000); else if (t === 0) setActive(false); return () => clearInterval(i); }, [active, t]);
  const start = () => { setT(parseInt(input)); setActive(true); };
  return (
    <div className="p-16 text-center space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block tracking-widest">Seconds to Countdown</label>
        <input aria-label="Seconds" type="number" value={input} onChange={e => setInput(e.target.value)} className="text-5xl p-5 border rounded-2xl w-40 text-center font-black text-slate-800" />
      </div>
      <div className="text-8xl font-black font-mono tabular-nums text-slate-900">{t}s</div>
      <button onClick={start} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-base tracking-wide">{active ? 'RESTART' : 'START TIMER'}</button>
    </div>
  );
};

export const BusinessDayCalculator: React.FC = () => {
  const [d1, setD1] = useState(''); const [d2, setD2] = useState(''); const [res, setRes] = useState<number | null>(null);
  const calculate = () => {
    if(!d1 || !d2) return;
    let s = new Date(d1); let e = new Date(d2); if (s > e) [s, e] = [e, s];
    let count = 0; let cur = new Date(s);
    while (cur <= e) { if (cur.getDay() !== 0 && cur.getDay() !== 6) count++; cur.setDate(cur.getDate()+1); }
    setRes(count);
  };
  return (
    <div className="p-10 space-y-8">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Start Date</label>
          <input aria-label="Start Date" type="date" value={d1} onChange={e => setD1(e.target.value)} className="w-full p-4 border rounded-2xl font-bold bg-slate-50 text-slate-800" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">End Date</label>
          <input aria-label="End Date" type="date" value={d2} onChange={e => setD2(e.target.value)} className="w-full p-4 border rounded-2xl font-bold bg-slate-50 text-slate-800" />
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Count Business Days</button>
      {res !== null && <div className="p-10 text-center text-7xl font-black rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-900">{res} <span className="text-2xl uppercase text-slate-400 block mt-2">Working Days</span></div>}
    </div>
  );
};

export const PregnancyCalculator: React.FC = () => {
  const [lmp, setLmp] = useState(''); const [res, setRes] = useState<string | null>(null);
  const calculate = () => { if(!lmp) return; const d = new Date(lmp); d.setDate(d.getDate() + 280); setRes(d.toDateString()); };
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Last Period Start Date (LMP)</label>
        <input aria-label="LMP Date" type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="w-full p-5 border rounded-2xl font-black text-center text-2xl bg-slate-50 text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-rose-500 text-white font-black rounded-2xl shadow hover:bg-rose-600 transition-colors text-base tracking-wide">Estimate Due Date</button>
      {res && <div className="p-10 bg-rose-50 text-center text-4xl font-black rounded-[2rem] border border-rose-100 text-rose-900">{res}</div>}
    </div>
  );
};

export const TimeCardCalculator: React.FC = () => {
  const [hrs, setHrs] = useState(['8', '8', '8', '8', '8', '0', '0']);
  const total = hrs.reduce((a, b) => a + parseFloat(b || '0'), 0);
  
  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 text-center tracking-widest">Hours per Day</label>
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map((day, i) => (
            <div key={i} className="text-center">
              <span className="text-[10px] font-black text-slate-400 block mb-2">{day}</span>
              <input aria-label={day} type="text" value={hrs[i]} onChange={e => {const n = [...hrs]; n[i] = e.target.value; setHrs(n);}} className="w-full p-2 md:p-3 border rounded-xl md:rounded-2xl text-center font-bold text-base md:text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-8 pt-6 border-t border-slate-100">
        <div className="p-10 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100 shadow-sm">
          <p className="text-6xl font-black text-indigo-900">{total}</p>
          <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mt-2">Total Weekly Hours</p>
        </div>
        
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Summary
          </h3>
          <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
            <p>Sum of all daily hours entered above.</p>
            <p className="pl-4 font-bold text-indigo-600">{hrs.map(h => parseFloat(h)||0).join(' + ')} = {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimeFromNowCalculator: React.FC<{ defaultUnit?: 'hours' | 'minutes' }> = ({ defaultUnit = 'hours' }) => {
  const [val, setVal] = useState('1');
  const [unit, setUnit] = useState<'hours' | 'minutes'>(defaultUnit);
  const [dir, setDir] = useState<'from now' | 'ago'>('from now');
  const [res, setRes] = useState<{ timeStr: string, dateStr: string, now: Date, offsetMs: number } | null>(null);

  const calculate = () => {
    const now = new Date();
    const amount = parseFloat(val || '0');
    const offset = unit === 'hours' ? amount * 3600000 : amount * 60000;
    const targetMs = now.getTime() + (dir === 'from now' ? offset : -offset);
    const target = new Date(targetMs);
    
    setRes({
      timeStr: target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      dateStr: target.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      now,
      offsetMs: dir === 'from now' ? offset : -offset
    });
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="flex gap-3 p-1.5 bg-slate-100 rounded-2xl">
        <button onClick={() => setDir('from now')} className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${dir === 'from now' ? 'bg-white text-blue-600 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}>FROM NOW</button>
        <button onClick={() => setDir('ago')} className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${dir === 'ago' ? 'bg-white text-rose-600 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}>AGO</button>
      </div>
      
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 tracking-widest">Duration Amount</label>
        <div className="flex gap-5">
          <input aria-label="Amount" type="number" value={val} onChange={e => setVal(e.target.value)} className="w-1/2 p-5 border rounded-2xl text-3xl font-black text-center text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
          <select aria-label="Unit" value={unit} onChange={e => setUnit(e.target.value as any)} className="w-1/2 p-5 border rounded-2xl font-black text-center text-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all cursor-pointer">
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
          </select>
        </div>
      </div>
      
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate Exact Time</button>
      
      {res && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-blue-50 rounded-[2rem] text-center border border-blue-100 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">The time will be</p>
            <p className="text-5xl md:text-6xl font-black text-blue-900 tracking-tight mb-2">{res.timeStr}</p>
            <p className="text-blue-600 font-medium">{res.dateStr}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Calculation Breakdown
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              <p>1. Start Time (Now):</p>
              <p className="pl-4 font-bold text-blue-600">{res.now.toLocaleTimeString()} ({res.now.toLocaleDateString()})</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>2. {dir === 'from now' ? 'Add' : 'Subtract'} Duration:</p>
              <p className="pl-4 font-bold text-blue-600">{Math.abs(res.offsetMs / (unit === 'hours' ? 3600000 : 60000))} {unit} ({Math.abs(res.offsetMs).toLocaleString()} ms)</p>
              <div className="border-t border-slate-200 my-2"></div>
              <p>3. Result Time:</p>
              <p className="pl-4 font-bold text-blue-600">{res.timeStr}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MS TO SECONDS ---
export const MsToSecondsCalculator: React.FC = () => {
  const [ms, setMs] = useState('1000');
  const [sec, setSec] = useState<string | null>(null);
  const calculate = () => setSec((parseFloat(ms) / 1000).toString());
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Milliseconds</label>
        <input type="number" value={ms} onChange={e => setMs(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Convert to Seconds</button>
      {sec && <div className="p-10 bg-slate-50 text-center text-6xl font-black rounded-[2rem] border border-slate-100 text-slate-900">{sec} s</div>}
    </div>
  );
};

// --- MS TO DATE ---
export const MsToDateCalculator: React.FC = () => {
  const [ms, setMs] = useState(Date.now().toString());
  const [date, setDate] = useState<string | null>(null);
  const calculate = () => {
    const d = new Date(parseInt(ms));
    setDate(d.toString() !== 'Invalid Date' ? d.toLocaleString() : 'Invalid Timestamp');
  };
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Timestamp (ms)</label>
        <input type="number" value={ms} onChange={e => setMs(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-base tracking-wide">Convert to Date</button>
      {date && <div className="p-10 bg-blue-50 text-center text-2xl font-black rounded-[2rem] border border-blue-100 text-blue-900">{date}</div>}
    </div>
  );
};

// --- DATE ADD/SUBTRACT ---
export const DateAddSubtractCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [op, setOp] = useState<'add' | 'sub'>('add');
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [weeks, setWeeks] = useState('0');
  const [days, setDays] = useState('0');
  const [result, setResult] = useState<{ dateStr: string, steps: string[] } | null>(null);

  const calculate = () => {
    const date = new Date(startDate);
    const sign = op === 'add' ? 1 : -1;
    const steps: string[] = [];
    
    steps.push(`Start Date: ${date.toDateString()}`);
    
    const y = (parseInt(years) || 0) * sign;
    if (y !== 0) {
      date.setFullYear(date.getFullYear() + y);
      steps.push(`${op === 'add' ? 'Added' : 'Subtracted'} ${Math.abs(y)} years → ${date.toDateString()}`);
    }
    
    const m = (parseInt(months) || 0) * sign;
    if (m !== 0) {
      date.setMonth(date.getMonth() + m);
      steps.push(`${op === 'add' ? 'Added' : 'Subtracted'} ${Math.abs(m)} months → ${date.toDateString()}`);
    }
    
    const w = (parseInt(weeks) || 0) * sign;
    const d = (parseInt(days) || 0) * sign;
    const totalDays = (w * 7) + d;
    
    if (totalDays !== 0) {
      date.setDate(date.getDate() + totalDays);
      steps.push(`${op === 'add' ? 'Added' : 'Subtracted'} ${Math.abs(totalDays)} days (${Math.abs(w)} weeks, ${Math.abs(d)} days) → ${date.toDateString()}`);
    }
    
    setResult({ dateStr: date.toDateString(), steps });
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2 tracking-widest">Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
      </div>
      
      <div className="flex bg-slate-100 p-1.5 rounded-2xl">
        <button onClick={() => setOp('add')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${op === 'add' ? 'bg-white text-blue-600 shadow scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}>Add (+)</button>
        <button onClick={() => setOp('sub')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${op === 'sub' ? 'bg-white text-rose-600 shadow scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}>Subtract (-)</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Years</label><input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="0" /></div>
        <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Months</label><input type="number" value={months} onChange={e => setMonths(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="0" /></div>
        <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Weeks</label><input type="number" value={weeks} onChange={e => setWeeks(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="0" /></div>
        <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Days</label><input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="0" /></div>
      </div>

      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all text-base tracking-wide uppercase">Calculate Date</button>
      
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-blue-50 text-center rounded-[2rem] border border-blue-100 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Resulting Date</p>
            <p className="text-3xl md:text-4xl font-black text-blue-900">{result.dateStr}</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Step-by-Step Calculation
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 space-y-3">
              {result.steps.map((step, i) => (
                <div key={i}>
                  <p className={i === 0 ? "font-bold text-slate-900" : "pl-4 text-blue-600"}>{step}</p>
                  {i < result.steps.length - 1 && <div className="border-t border-slate-200 my-2"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- WEEKDAY CALCULATOR ---
export const WeekdayCalculator: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState<string | null>(null);
  
  const calculate = () => {
    const d = new Date(date);
    // Use UTC to avoid timezone shifts when just asking for "what day is this calendar date"
    const weekday = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).toLocaleDateString('en-US', { weekday: 'long' });
    setDay(weekday);
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
       <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Select Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-center text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">What Day Is It?</button>
      {day && <div className="p-10 bg-slate-50 text-center rounded-[2rem] border border-slate-100"><p className="text-6xl font-black text-slate-900">{day}</p></div>}
    </div>
  );
};

// --- WEEK NUMBER CALCULATOR ---
export const WeekNumberCalculator: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [week, setWeek] = useState<number | null>(null);

  const calculate = () => {
    const d = new Date(date);
    const dateCopy = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = dateCopy.getUTCDay() || 7;
    dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(dateCopy.getUTCFullYear(), 0, 1));
    const w = Math.ceil((((dateCopy.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    setWeek(w);
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
       <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Select Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-center text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-base tracking-wide">Get ISO Week Number</button>
      {week !== null && <div className="p-10 bg-blue-50 text-center rounded-[2rem] border border-blue-100"><p className="text-xs font-black uppercase text-blue-500 tracking-widest mb-2">ISO Week Number</p><p className="text-8xl font-black text-blue-900">{week}</p></div>}
    </div>
  );
};

// --- DAY OF YEAR ---
export const DayOfYearCalculator: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dayNum, setDayNum] = useState<number | null>(null);

  const calculate = () => {
    const d = new Date(date);
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    setDayNum(Math.floor(diff / oneDay));
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
       <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Select Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-center text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-teal-600 text-white font-black rounded-2xl shadow hover:bg-teal-700 transition-colors text-base tracking-wide">Calculate Day Number</button>
      {dayNum !== null && <div className="p-10 bg-teal-50 text-center rounded-[2rem] border border-teal-100"><p className="text-xs font-black uppercase text-teal-500 tracking-widest mb-2">Day of Year</p><p className="text-8xl font-black text-teal-900">{dayNum}<span className="text-2xl text-teal-400"> / 36{new Date(new Date(date).getFullYear(), 1, 29).getDate() === 29 ? '6' : '5'}</span></p></div>}
    </div>
  );
};

// --- LEAP YEAR CALCULATOR ---
export const LeapYearCalculator: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [isLeap, setIsLeap] = useState<boolean | null>(null);

  const calculate = () => {
    const y = parseInt(year);
    if (!y) return;
    setIsLeap((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0);
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
       <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Enter Year</label>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-4xl text-center text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-indigo-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Check Year</button>
      {isLeap !== null && (
        <div className={`p-10 text-center rounded-[2rem] border ${isLeap ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-rose-50 border-rose-100 text-rose-900'}`}>
          <p className="text-5xl font-black mb-2">{isLeap ? 'YES' : 'NO'}</p>
          <p className="font-bold text-lg opacity-75">{isLeap ? 'It is a Leap Year (366 Days)' : 'It is a Common Year (365 Days)'}</p>
        </div>
      )}
    </div>
  );
};

// --- ZODIAC CALCULATOR ---
export const ZodiacCalculator: React.FC = () => {
  const [date, setDate] = useState('');
  const [sign, setSign] = useState<string | null>(null);

  const calculate = () => {
    if (!date) return;
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    
    let s = '';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) s = "Aquarius ♒";
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) s = "Pisces ♓";
    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) s = "Aries ♈";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) s = "Taurus ♉";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) s = "Gemini ♊";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) s = "Cancer ♋";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) s = "Leo ♌";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) s = "Virgo ♍";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) s = "Libra ♎";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) s = "Scorpio ♏";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) s = "Sagittarius ♐";
    else s = "Capricorn ♑";
    
    setSign(s);
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
       <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Birth Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-center text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-violet-600 text-white font-black rounded-2xl shadow hover:bg-violet-700 transition-colors text-base tracking-wide">Find Sign</button>
      {sign && <div className="p-10 bg-violet-50 text-center rounded-[2rem] border border-violet-100"><p className="text-5xl font-black text-violet-900">{sign}</p></div>}
    </div>
  );
};

// --- EXPORT ALIASES ---
export const TimeDurationCalculator = TimeBetweenTimesCalculator;
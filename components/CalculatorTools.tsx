import React, { useState, useEffect, useRef } from 'react';

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
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const t1 = (parseInt(h1 || '0') * 3600) + (parseInt(m1 || '0') * 60) + parseInt(s1 || '0');
    const t2 = (parseInt(h2 || '0') * 3600) + (parseInt(m2 || '0') * 60) + parseInt(s2 || '0');
    const diff = op === 'add' ? t1 + t2 : t1 - t2;
    const abs = Math.abs(diff);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const s = abs % 60;
    setResult(`${diff < 0 ? '-' : ''}${h}h ${m}m ${s}s`);
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
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="First Duration Hours" type="number" value={h1} onChange={e => setH1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="First Duration Minutes" type="number" value={m1} onChange={e => setM1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span><input aria-label="First Duration Seconds" type="number" value={s1} onChange={e => setS1(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
          </div>
        </div>

        <div className="flex justify-center gap-10 py-4 border-y border-slate-50">
           <label className="flex items-center gap-3 cursor-pointer font-black text-sm uppercase text-slate-700">
             <input type="radio" checked={op === 'add'} onChange={() => setOp('add')} className="w-5 h-5 text-blue-600" /> + Add
           </label>
           <label className="flex items-center gap-3 cursor-pointer font-black text-sm uppercase text-slate-700">
             <input type="radio" checked={op === 'sub'} onChange={() => setOp('sub')} className="w-5 h-5 text-rose-600" /> - Subtract
           </label>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-600 tracking-widest block ml-1">Second Duration</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="Second Duration Hours" type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="Second Duration Minutes" type="number" value={m2} onChange={e => setM2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
            <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span><input aria-label="Second Duration Seconds" type="number" value={s2} onChange={e => setS2(e.target.value)} placeholder="0" className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={calculate} className="flex-grow py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all text-base tracking-wide">Calculate</button>
        <button onClick={clear} className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all text-base tracking-wide">Clear</button>
      </div>
      {result && (
        <div className="p-8 bg-blue-50 text-blue-900 rounded-[2rem] text-center border-2 border-blue-100">
          <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-500">Resulting Duration</p>
          <p className="text-5xl md:text-6xl font-black">{result}</p>
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
  const [time, setTime] = useState('');
  const [mode, setMode] = useState<'time' | 'distance' | 'speed'>('time');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (mode === 'time') {
      const res = parseFloat(dist) / parseFloat(speed);
      const h = Math.floor(res);
      const m = Math.round((res - h) * 60);
      setResult(`${h}h ${m}m`);
    } else if (mode === 'distance') {
      setResult(`${(parseFloat(speed) * parseFloat(time)).toFixed(2)} km`);
    } else {
      setResult(`${(parseFloat(dist) / parseFloat(time)).toFixed(2)} km/h`);
    }
  };

  return (
    <div className="p-10 space-y-6">
      <div className="flex gap-3 p-1.5 bg-slate-100 rounded-2xl mb-6">
        {['time', 'distance', 'speed'].map(m => (
          <button key={m} onClick={() => setMode(m as any)} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{m}</button>
        ))}
      </div>
      <div className="space-y-6">
        {mode !== 'distance' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Distance (km)</label>
            <input type="number" value={dist} onChange={e => setDist(e.target.value)} placeholder="e.g. 100" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
          </div>
        )}
        {mode !== 'speed' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Speed (km/h)</label>
            <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} placeholder="e.g. 50" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
          </div>
        )}
        {mode !== 'time' && (
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Time (hours)</label>
            <input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 2" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
          </div>
        )}
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors text-base tracking-wide">Calculate</button>
      {result && <div className="p-8 bg-blue-50 text-center text-4xl font-black rounded-2xl border border-blue-100 text-blue-900">{result}</div>}
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
  const totalMins = shifts.reduce((acc, s) => {
    const [h1, m1] = s.start.split(':').map(Number); const [h2, m2] = s.end.split(':').map(Number);
    let d = (h2*60+m2)-(h1*60+m1); if (d < 0) d += 1440; return acc + d;
  }, 0);
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-6">
        {shifts.map((s, i) => (
          <div key={i} className="space-y-3">
            <label className="text-xs font-black uppercase text-slate-600 block ml-1">Shift {shifts.length > 1 ? i + 1 : ''} Times</label>
            <div className="flex gap-6 items-center">
              <div className="flex-1">
                <span className="text-[10px] font-black text-slate-500 block mb-1">START</span>
                <input type="time" value={s.start} onChange={e => updateShift(i, 'start', e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800" />
              </div>
              <span className="font-black text-slate-300 pt-6 text-xl">→</span>
              <div className="flex-1">
                <span className="text-[10px] font-black text-slate-500 block mb-1">END</span>
                <input type="time" value={s.end} onChange={e => updateShift(i, 'end', e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addShift} className="w-full py-4 bg-slate-50 text-slate-600 border-2 border-slate-200 border-dashed font-black rounded-2xl text-xs uppercase hover:bg-slate-100 hover:border-slate-300 transition-all tracking-widest">+ Add Split Shift</button>
      <div className="p-8 bg-indigo-50 text-center rounded-3xl border border-indigo-100">
        <p className="text-5xl font-black text-indigo-900">{Math.floor(totalMins/60)}h {totalMins%60}m</p>
        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mt-2">Total Shift Time</p>
      </div>
    </div>
  );
};

// --- BREAK CALCULATOR ---
export const BreakCalculator: React.FC = () => {
  const [total, setTotal] = useState('480');
  const [breaks, setBreaks] = useState('60');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes(`${Math.floor((parseInt(total) - parseInt(breaks))/60)}h ${(parseInt(total) - parseInt(breaks))%60}m`);
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Total Minutes Worked</label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)} placeholder="Total Mins" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Total Break Minutes</label>
          <input type="number" value={breaks} onChange={e => setBreaks(e.target.value)} placeholder="Break Mins" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-colors text-base tracking-wide">Subtract Breaks</button>
      {res && <div className="p-8 bg-slate-50 text-center text-4xl font-black rounded-2xl border border-slate-200 text-slate-900">{res} Net Hours</div>}
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
  const [showResult, setShowResult] = useState(false);

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
    setShowResult(true);
  };

  return (
    <div className="relative space-y-6 p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 h-full flex flex-col justify-between overflow-hidden">
      <div className="space-y-6">
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2 tracking-wider">Date of Birth</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full p-4 border rounded-2xl text-lg font-bold text-slate-900 bg-slate-50 focus:bg-white transition-colors" /></div>
        <div><label className="block text-xs font-black text-slate-600 uppercase mb-2 tracking-wider">Calculate Age At</label><input type="date" value={atDate} onChange={e => setAtDate(e.target.value)} className="w-full p-4 border rounded-2xl text-lg font-bold text-slate-900 bg-slate-50 focus:bg-white transition-colors" /></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-md hover:bg-blue-700 transition-all text-sm uppercase tracking-widest mt-4">Get Exact Age</button>
      
      {result && showResult && (
        <div className="absolute inset-0 bg-slate-50 z-20 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-5xl font-black text-blue-900 mb-2">{result.y} Years</p>
            <p className="text-blue-600 font-bold text-lg mb-6">{result.m} Months, {result.d} Days</p>
            <p className="text-xs text-slate-500 font-black uppercase mb-6">Total Days: {result.totalDays.toLocaleString()}</p>
            <button onClick={() => setShowResult(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
              Recalculate
            </button>
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
  const [s, setS] = useState('09:00'); const [e, setE] = useState('17:00'); const [b, setB] = useState('30'); const [res, setRes] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => { 
      const [sh, sm] = s.split(':').map(Number); 
      const [eh, em] = e.split(':').map(Number); 
      let d = (eh * 60 + em) - (sh * 60 + sm); 
      if (d < 0) d += 1440; 
      d -= parseInt(b || '0'); 
      setRes(`${Math.floor(d / 60)}h ${d % 60}m`); 
      setShowResult(true);
  };

  return (
    <div className="relative p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6 h-full flex flex-col justify-between overflow-hidden">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div><label className="text-xs font-black uppercase text-slate-600 block mb-2">Start (In)</label><input type="time" value={s} onChange={v => setS(v.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800" /></div>
          <div><label className="text-xs font-black uppercase text-slate-600 block mb-2">End (Out)</label><input type="time" value={e} onChange={v => setE(v.target.value)} className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800" /></div>
        </div>
        <div><label className="text-xs font-black uppercase text-slate-600 block mb-2">Break (Minutes)</label><input type="number" value={b} onChange={v => setB(v.target.value)} placeholder="0" className="w-full p-4 border rounded-2xl text-base font-bold bg-slate-50 text-slate-800" /></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow text-sm uppercase tracking-widest mt-4">Calculate Shift</button>
      
      {res && showResult && (
          <div className="absolute inset-0 bg-indigo-50 z-20 p-6 flex flex-col items-center justify-center text-center">
             <p className="text-xs font-black uppercase tracking-widest mb-4 text-indigo-400">Total Hours</p>
             <p className="text-5xl font-black text-indigo-900 mb-8">{res}</p>
             <button onClick={() => setShowResult(false)} className="px-6 py-3 bg-white border border-indigo-100 text-indigo-900 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors">
              Recalculate
            </button>
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
  const [pace, setPace] = useState<string | null>(null);
  const calculate = () => {
    const totalSecs = (parseInt(h) * 3600) + (parseInt(m) * 60) + parseInt(s);
    const d = parseFloat(dist);
    if (!d || d === 0) return;
    const paceSecs = totalSecs / d;
    const pm = Math.floor(paceSecs / 60);
    const ps = Math.round(paceSecs % 60);
    setPace(`${pm}:${ps.toString().padStart(2, '0')}`);
  };
  return (
    <div className="p-10 space-y-8">
      <div><label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Distance (km)</label><input type="number" value={dist} onChange={e => setDist(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" /></div>
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Total Time</label>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="Hours" type="number" value={h} onChange={e => setH(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
          <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
          <div className="relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Seconds</span><input aria-label="Seconds" type="number" value={s} onChange={e => setS(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl text-center font-bold text-xl text-slate-800" /></div>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl shadow-lg hover:bg-orange-700 transition-colors text-base tracking-wide">Calculate Pace</button>
      {pace && <div className="p-10 bg-orange-50 text-center rounded-[2rem] border border-orange-100"><p className="text-xs font-black text-orange-600 uppercase mb-3">Average Pace</p><p className="text-6xl font-black text-orange-900">{pace} /km</p></div>}
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
  
  useEffect(() => { 
    setTime(new Date());
    const i = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(i); 
  }, []);

  const zones = [{ label: 'UTC', zone: 'UTC' }, { label: 'New York', zone: 'America/New_York' }, { label: 'London', zone: 'Europe/London' }, { label: 'Tokyo', zone: 'Asia/Tokyo' }, { label: 'Sydney', zone: 'Australia/Sydney' }];
  
  if (!time) {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden divide-y animate-pulse">
          {zones.map(z => (
            <div key={z.zone} className="px-10 py-8 flex justify-between items-center">
              <span className="text-slate-300 font-black uppercase text-base tracking-widest bg-slate-100 rounded w-24 h-6 block"></span>
              <span className="font-mono font-black text-3xl md:text-4xl text-slate-200 tabular-nums bg-slate-100 rounded w-40 h-10 block"></span>
            </div>
          ))}
        </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden divide-y">
      {zones.map(z => (
        <div key={z.zone} className="px-10 py-8 flex justify-between items-center hover:bg-slate-50 transition-colors">
          <span className="text-slate-600 font-black uppercase text-base tracking-widest">{z.label}</span>
          <span className="font-mono font-black text-3xl md:text-4xl text-slate-900 tabular-nums">{time.toLocaleTimeString(undefined, { timeZone: z.zone, hour12: false })}</span>
        </div>
      ))}
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
  const [res, setRes] = useState<string | null>(null);
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
      if (ampm === 'PM' && h !== 12) hour24 += 12;
      if (ampm === 'AM' && h === 12) hour24 = 0;

      setRes(`${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} Hours`);
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

      setRes(`${hStandard}:${m.toString().padStart(2, '0')} ${suffix}`);
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
        <div className="p-12 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 text-center shadow-sm">
          <p className="text-sm font-black uppercase text-blue-400 tracking-[0.2em] mb-4">Converted Result</p>
          <p className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">{res}</p>
        </div>
      )}
    </div>
  );
};

// --- OVERTIME ---
export const OvertimeCalculator: React.FC = () => {
  const [rate, setRate] = useState('25');
  const [hrs, setHrs] = useState('45');
  const [res, setRes] = useState<any>(null);
  const calculate = () => {
    const r = parseFloat(rate);
    const h = parseFloat(hrs);
    const reg = Math.min(40, h);
    const ot = Math.max(0, h - 40);
    const pay = (reg * r) + (ot * r * 1.5);
    setRes({ regPay: reg * r, otPay: ot * r * 1.5, total: pay });
  };
  return (
    <div className="p-10 space-y-8">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Hourly Rate ($)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Rate" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1">Total Hours</label>
          <input type="number" value={hrs} onChange={e => setHrs(e.target.value)} placeholder="Hours" className="w-full p-4 border rounded-2xl font-bold text-xl text-slate-800" />
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-base tracking-wide">Calculate Pay</button>
      {res && <div className="p-8 bg-blue-50 rounded-2xl space-y-4 font-bold border border-blue-100 text-lg">
        <div className="flex justify-between"><span>Regular Pay (40h):</span><span>${res.regPay.toFixed(2)}</span></div>
        <div className="flex justify-between text-blue-600"><span>Overtime (1.5x):</span><span>${res.otPay.toFixed(2)}</span></div>
        <div className="flex justify-between text-3xl border-t border-blue-200 pt-4 text-blue-900"><span>Total Gross:</span><span>${res.total.toFixed(2)}</span></div>
      </div>}
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
  const [h, setH] = useState('8');
  const [m, setM] = useState('30');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes((parseInt(h) + parseInt(m)/60).toFixed(2));
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Time to Convert</label>
        <div className="flex gap-5">
          <div className="flex-1 relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="Hours" type="number" value={h} onChange={e => setH(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800" /></div>
          <div className="flex-1 relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800" /></div>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Convert to Decimal</button>
      {res && <div className="p-10 bg-slate-50 text-center text-6xl font-black rounded-[2rem] border border-slate-100 text-slate-900">{res} hrs</div>}
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
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes((Math.ceil(parseInt(m)/6)/10).toFixed(1));
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3 text-center">
        <label className="text-xs font-black uppercase text-slate-600 block tracking-widest">Minutes Worked</label>
        <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} placeholder="e.g. 45" className="w-full p-5 border rounded-2xl text-center font-black text-5xl text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Convert to Billable Units (0.1)</button>
      {res && <div className="p-10 bg-blue-50 text-center font-black text-6xl text-blue-900 rounded-[2rem] border border-blue-100">{res} Units</div>}
    </div>
  );
};

export const TimeBetweenTimesCalculator: React.FC = () => {
  const [t1, setT1] = useState('09:00'); const [t2, setT2] = useState('17:00'); const [res, setRes] = useState<string | null>(null);
  const calculate = () => {
    const [h1, m1] = t1.split(':').map(Number); const [h2, m2] = t2.split(':').map(Number);
    let diff = (h2*60+m2)-(h1*60+m1); if (diff < 0) diff += 1440;
    setRes(`${Math.floor(diff/60)}h ${diff%60}m`);
  };
  return (
    <div className="p-10 bg-white rounded-[2rem] space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Range</label>
        <div className="flex gap-6 items-center">
          <div className="flex-1">
            <span className="text-[10px] font-black text-slate-500 block mb-1">START</span>
            <input aria-label="Start Time" type="time" value={t1} onChange={e => setT1(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800" />
          </div>
          <span className="font-black text-slate-300 pt-6 text-xl">→</span>
          <div className="flex-1">
            <span className="text-[10px] font-black text-slate-500 block mb-1">END</span>
            <input aria-label="End Time" type="time" value={t2} onChange={e => setT2(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800" />
          </div>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow hover:bg-blue-700 transition-colors text-base tracking-wide">Get Duration</button>
      {res && <div className="p-10 bg-blue-50 text-center text-6xl font-black rounded-[2rem] border border-blue-100 text-blue-900">{res}</div>}
    </div>
  );
};

export const MinutesToHoursCalculator: React.FC = () => {
  const [m, setM] = useState('150');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes(`${Math.floor(parseInt(m)/60)}h ${parseInt(m)%60}m`);
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3 text-center">
        <label className="text-xs font-black uppercase text-slate-600 block tracking-widest">Total Minutes</label>
        <input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-5 border rounded-2xl text-center font-black text-5xl text-slate-800" />
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Convert to Hours & Minutes</button>
      {res && <div className="p-10 bg-slate-50 text-center text-5xl font-black rounded-[2rem] border border-slate-100 text-slate-900">{res}</div>}
    </div>
  );
};

export const HoursToMinutesCalculator: React.FC = () => {
  const [h, setH] = useState('2'); const [m, setM] = useState('30'); const [res, setRes] = useState<number | null>(null);
  const calculate = () => setRes(parseInt(h)*60 + parseInt(m));
  return (
    <div className="p-10 space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Hours & Minutes</label>
        <div className="flex gap-5">
          <div className="flex-1 relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Hours</span><input aria-label="Hours" type="number" value={h} onChange={e => setH(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800" /></div>
          <div className="flex-1 relative"><span className="absolute left-3 top-2 text-[10px] font-black text-slate-500 uppercase">Minutes</span><input aria-label="Minutes" type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 pt-6 border rounded-2xl font-bold text-center text-xl text-slate-800" /></div>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Convert to Total Minutes</button>
      {res !== null && <div className="p-10 bg-slate-50 text-center text-6xl font-black rounded-[2rem] border border-slate-100 text-slate-900">{res} mins</div>}
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
    <div className="p-10 space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-black uppercase text-slate-600 block mb-2 ml-1 text-center">Hours per Day</label>
        <div className="grid grid-cols-7 gap-3">
          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map((day, i) => (
            <div key={i} className="text-center">
              <span className="text-[10px] font-black text-slate-500 block mb-2">{day}</span>
              <input aria-label={day} type="text" value={hrs[i]} onChange={e => {const n = [...hrs]; n[i] = e.target.value; setHrs(n);}} className="w-full p-3 border rounded-2xl text-center font-bold text-lg text-slate-800" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 bg-indigo-50 text-center text-6xl font-black text-indigo-900 rounded-[2rem] border border-indigo-100">{total} <span className="text-xl uppercase text-indigo-400 block mt-2">Total Hours</span></div>
    </div>
  );
};

export const TimeFromNowCalculator: React.FC = () => {
  const [val, setVal] = useState('1'); const [unit, setUnit] = useState<'hours' | 'minutes'>('hours'); const [dir, setDir] = useState<'from now' | 'ago'>('from now'); const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const now = new Date(); const amount = parseFloat(val || '0'); const offset = unit === 'hours' ? amount * 3600000 : amount * 60000; const target = new Date(now.getTime() + (dir === 'from now' ? offset : -offset)); setRes(target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (' + target.toLocaleDateString() + ')'); };
  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
      <div className="flex gap-3 p-1.5 bg-slate-100 rounded-2xl"><button onClick={() => setDir('from now')} className={`flex-1 py-4 rounded-xl font-black text-sm ${dir === 'from now' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}>FROM NOW</button><button onClick={() => setDir('ago')} className={`flex-1 py-4 rounded-xl font-black text-sm ${dir === 'ago' ? 'bg-white text-rose-600 shadow' : 'text-slate-500'}`}>AGO</button></div>
      <div className="space-y-3">
        <label className="text-xs font-black uppercase text-slate-600 block ml-1">Amount</label>
        <div className="flex gap-5"><input aria-label="Amount" type="number" value={val} onChange={e => setVal(e.target.value)} className="w-1/2 p-5 border rounded-2xl text-3xl font-black text-center text-slate-800" /><select aria-label="Unit" value={unit} onChange={e => setUnit(e.target.value as any)} className="w-1/2 p-5 border rounded-2xl font-black text-center text-xl bg-white text-slate-800"><option value="hours">Hours</option><option value="minutes">Minutes</option></select></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow hover:bg-slate-800 transition-colors text-base tracking-wide">Calculate Exact Time</button>
      {res && <div className="p-10 bg-blue-50 rounded-[2rem] text-center border border-blue-100"><p className="text-5xl font-black text-blue-800">{res}</p></div>}
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
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const date = new Date(startDate);
    const sign = op === 'add' ? 1 : -1;
    
    date.setFullYear(date.getFullYear() + (parseInt(years) || 0) * sign);
    date.setMonth(date.getMonth() + (parseInt(months) || 0) * sign);
    date.setDate(date.getDate() + ((parseInt(weeks) || 0) * 7 + (parseInt(days) || 0)) * sign);
    
    setResult(date.toDateString());
  };

  return (
    <div className="p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <div>
        <label className="text-xs font-black uppercase text-slate-600 block ml-1 mb-2">Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-4 border rounded-2xl font-bold text-lg text-slate-800" />
      </div>
      
      <div className="flex bg-slate-100 p-1.5 rounded-2xl">
        <button onClick={() => setOp('add')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${op === 'add' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}>Add (+)</button>
        <button onClick={() => setOp('sub')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${op === 'sub' ? 'bg-white text-rose-600 shadow' : 'text-slate-500'}`}>Subtract (-)</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Years</label><input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800" /></div>
         <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Months</label><input type="number" value={months} onChange={e => setMonths(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800" /></div>
         <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Weeks</label><input type="number" value={weeks} onChange={e => setWeeks(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800" /></div>
         <div><label className="text-[10px] font-black uppercase text-slate-500 block ml-1 mb-1">Days</label><input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-center text-slate-800" /></div>
      </div>

      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow hover:bg-indigo-700 transition-colors text-base tracking-wide">Calculate New Date</button>
      {result && <div className="p-8 bg-indigo-50 text-center rounded-[2rem] border border-indigo-100"><p className="text-3xl font-black text-indigo-900">{result}</p></div>}
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
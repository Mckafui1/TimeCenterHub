import React, { useState, useEffect, useRef } from 'react';

// --- SHARED UTILS ---
const formatTimeHM = (mins: number) => {
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.floor(Math.abs(mins) % 60);
  return `${mins < 0 ? '-' : ''}${h}h ${m}m`;
};

// --- CORE: TIME CALCULATOR ---
export const TimeCalculator: React.FC = () => {
  const [h1, setH1] = useState('0');
  const [m1, setM1] = useState('0');
  const [s1, setS1] = useState('0');
  const [h2, setH2] = useState('0');
  const [m2, setM2] = useState('0');
  const [s2, setS2] = useState('0');
  const [op, setOp] = useState<'add' | 'sub'>('add');
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
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <input type="number" value={h1} onChange={e => setH1(e.target.value)} placeholder="H" className="p-3 border rounded-xl text-center font-bold" />
          <input type="number" value={m1} onChange={e => setM1(e.target.value)} placeholder="M" className="p-3 border rounded-xl text-center font-bold" />
          <input type="number" value={s1} onChange={e => setS1(e.target.value)} placeholder="S" className="p-3 border rounded-xl text-center font-bold" />
        </div>
        <div className="flex justify-center gap-8 py-2">
           <label className="flex items-center gap-2 cursor-pointer font-black text-xs uppercase text-slate-500">
             <input type="radio" checked={op === 'add'} onChange={() => setOp('add')} className="w-4 h-4 text-blue-600" /> + Add
           </label>
           <label className="flex items-center gap-2 cursor-pointer font-black text-xs uppercase text-slate-500">
             <input type="radio" checked={op === 'sub'} onChange={() => setOp('sub')} className="w-4 h-4 text-rose-600" /> - Subtract
           </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="H" className="p-3 border rounded-xl text-center font-bold" />
          <input type="number" value={m2} onChange={e => setM2(e.target.value)} placeholder="M" className="p-3 border rounded-xl text-center font-bold" />
          <input type="number" value={s2} onChange={e => setS2(e.target.value)} placeholder="S" className="p-3 border rounded-xl text-center font-bold" />
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={calculate} className="flex-grow py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all">Calculate</button>
        <button onClick={clear} className="px-6 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all">Clear</button>
      </div>
      {result && (
        <div className="p-8 bg-blue-50 text-blue-800 rounded-3xl text-center border-2 border-blue-100">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1">Resulting Duration</p>
          <p className="text-5xl font-black">{result}</p>
        </div>
      )}
    </div>
  );
};

// --- ADD TIME ---
export const AddTimeCalculator: React.FC = () => {
  return <TimeCalculator />;
};

// --- SUBTRACT TIME ---
export const SubtractTimeCalculator: React.FC = () => {
  return <TimeCalculator />;
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
    <div className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block text-xs font-black text-slate-400 uppercase mb-2">Birthday</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full p-4 border rounded-2xl text-xl font-bold" /></div>
        <div><label className="block text-xs font-black text-slate-400 uppercase mb-2">Age at</label><input type="date" value={atDate} onChange={e => setAtDate(e.target.value)} className="w-full p-4 border rounded-2xl text-xl font-bold" /></div>
      </div>
      <button onClick={calculate} className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-lg">Calculate Age</button>
      {result && <div className="p-8 bg-blue-50 rounded-3xl text-center"><p className="text-5xl font-black text-blue-900">{result.y} Years</p><p className="text-blue-500 font-bold">{result.m} months, {result.d} days</p><p className="mt-2 text-xs text-blue-300 font-black">TOTAL: {result.totalDays.toLocaleString()} DAYS</p></div>}
    </div>
  );
};

// --- BIRTHDAY CALCULATOR ---
export const BirthdayCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1995-05-15');
  const [result, setResult] = useState<{ days: number, weekday: string } | null>(null);

  const calculate = () => {
    const today = new Date(); const dob = new Date(birthDate);
    let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    const diff = Math.ceil((next.getTime() - today.getTime()) / 86400000);
    setResult({ days: diff, weekday: next.toLocaleDateString(undefined, { weekday: 'long' }) });
  };

  return (
    <div className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-4 border rounded-2xl text-2xl font-black text-center" />
      <button onClick={calculate} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-lg">Countdown to Party</button>
      {result && <div className="p-10 bg-indigo-50 rounded-[2.5rem] text-center"><p className="text-7xl font-black text-indigo-900">{result.days}</p><p className="text-indigo-400 font-black uppercase tracking-widest text-xs">Days to next birthday</p><p className="mt-4 text-indigo-900 font-bold italic">It falls on a {result.weekday}!</p></div>}
    </div>
  );
};

// --- TIME BETWEEN DATES ---
export const TimeBetweenDatesCalculator: React.FC = () => {
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [res, setRes] = useState<{ d: number, w: number, m: number } | null>(null);
  const calculate = () => { if (!d1 || !d2) return; const diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime()); const d = Math.floor(diff/86400000); setRes({ d, w: parseFloat((d/7).toFixed(1)), m: parseFloat((d/30.44).toFixed(1)) }); };
  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div className="grid grid-cols-2 gap-4"><input type="date" value={d1} onChange={e=>setD1(e.target.value)} className="p-3 border rounded-xl"/><input type="date" value={d2} onChange={e=>setD2(e.target.value)} className="p-3 border rounded-xl"/></div>
      <button onClick={calculate} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl">Get Duration</button>
      {res && <div className="grid grid-cols-3 gap-2 text-center p-6 bg-slate-50 rounded-2xl"><div><p className="text-2xl font-black">{res.d}</p><p className="text-[10px] text-slate-400 font-black uppercase">Days</p></div><div><p className="text-2xl font-black">{res.w}</p><p className="text-[10px] text-slate-400 font-black uppercase">Weeks</p></div><div><p className="text-2xl font-black">{res.m}</p><p className="text-[10px] text-slate-400 font-black uppercase">Months</p></div></div>}
    </div>
  );
};

// --- WORK HOURS ---
export const WorkHoursCalculator: React.FC = () => {
  const [s, setS] = useState('09:00'); const [e, setE] = useState('17:00'); const [b, setB] = useState('30'); const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const [sh, sm] = s.split(':').map(Number); const [eh, em] = e.split(':').map(Number); let d = (eh * 60 + em) - (sh * 60 + sm); if (d < 0) d += 1440; d -= parseInt(b || '0'); setRes(`${Math.floor(d / 60)}h ${d % 60}m`); };
  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div><label className="text-[8px] font-black uppercase text-slate-400">In</label><input type="time" value={s} onChange={v => setS(v.target.value)} className="w-full p-2 border rounded-lg" /></div>
        <div><label className="text-[8px] font-black uppercase text-slate-400">Out</label><input type="time" value={e} onChange={v => setE(v.target.value)} className="w-full p-2 border rounded-lg" /></div>
        <div><label className="text-[8px] font-black uppercase text-slate-400">Brk(m)</label><input type="number" value={b} onChange={v => setB(v.target.value)} className="w-full p-2 border rounded-lg" /></div>
      </div>
      <button onClick={calculate} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl">Calculate</button>
      {res && <div className="p-8 bg-indigo-50 text-indigo-900 text-center font-black text-4xl rounded-2xl">{res}</div>}
    </div>
  );
};

// --- UNIX TIMESTAMP ---
export const UnixTimestampTool: React.FC = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000)); const [inputTs, setInputTs] = useState(''); const [tsResult, setTsResult] = useState<string | null>(null);
  useEffect(() => { const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000); return () => clearInterval(timer); }, []);
  const convert = () => { if (!inputTs) return; const ts = parseInt(inputTs); setTsResult(new Date(ts * (inputTs.length > 10 ? 1 : 1000)).toUTCString()); };
  return (
    <div className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl"><p className="text-5xl font-mono font-black text-blue-400">{now}</p></div>
      <div className="flex gap-3"><input type="text" value={inputTs} onChange={e => setInputTs(e.target.value)} placeholder="Unix TS..." className="flex-grow p-4 border rounded-2xl font-mono text-xl" /><button onClick={convert} className="px-10 bg-blue-600 text-white font-black rounded-2xl">CONVERT</button></div>
      {tsResult && <div className="p-6 bg-blue-50 rounded-2xl text-center font-bold">{tsResult}</div>}
    </div>
  );
};

// --- TIME ZONE CONVERTER ---
export const TimeZoneConverter: React.FC = () => {
  const [time, setTime] = useState(new Date()); useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const zones = [{ label: 'UTC', zone: 'UTC' }, { label: 'New York', zone: 'America/New_York' }, { label: 'London', zone: 'Europe/London' }, { label: 'Tokyo', zone: 'Asia/Tokyo' }, { label: 'Sydney', zone: 'Australia/Sydney' }];
  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden divide-y">
      {zones.map(z => (
        <div key={z.zone} className="px-8 py-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
          <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">{z.label}</span>
          <span className="font-mono font-black text-3xl text-slate-900">{time.toLocaleTimeString(undefined, { timeZone: z.zone, hour12: false })}</span>
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
    <div className={`p-4 sm:p-6 rounded-[2.5rem] border shadow-xl text-center space-y-4 transition-all duration-700 h-full flex flex-col justify-center ${mode === 'work' ? 'bg-white border-rose-100' : 'bg-emerald-50 border-emerald-200'}`}>
       <div className="flex justify-center gap-1.5">
         <button onClick={() => { setMode('work'); setTime(25*60); setActive(false); }} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'work' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Focus</button>
         <button onClick={() => { setMode('break'); setTime(5*60); setActive(false); }} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Rest</button>
      </div>
      <div className={`text-5xl sm:text-6xl font-black font-mono tracking-tighter tabular-nums leading-none ${mode === 'work' ? 'text-rose-600' : 'text-emerald-700'}`}>
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <button onClick={toggle} className={`flex-grow py-3 rounded-xl font-black text-white text-[11px] shadow-lg transition-all ${active ? 'bg-slate-800' : (mode === 'work' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700')}`}>
          {active ? 'PAUSE' : 'START'}
        </button>
        <button onClick={reset} className="px-3 py-3 bg-slate-100 text-slate-400 font-black rounded-xl hover:bg-slate-200 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>
    </div>
  );
};

// --- TIME FROM NOW ---
export const TimeFromNowCalculator: React.FC = () => {
  const [val, setVal] = useState('1'); const [unit, setUnit] = useState<'hours' | 'minutes'>('hours'); const [dir, setDir] = useState<'from now' | 'ago'>('from now'); const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const now = new Date(); const amount = parseFloat(val || '0'); const offset = unit === 'hours' ? amount * 3600000 : amount * 60000; const target = new Date(now.getTime() + (dir === 'from now' ? offset : -offset)); setRes(target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (' + target.toLocaleDateString() + ')'); };
  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl"><button onClick={() => setDir('from now')} className={`flex-1 py-3 rounded-xl font-black text-xs ${dir === 'from now' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>FROM NOW</button><button onClick={() => setDir('ago')} className={`flex-1 py-3 rounded-xl font-black text-xs ${dir === 'ago' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}>AGO</button></div>
      <div className="flex gap-4"><input type="number" value={val} onChange={e => setVal(e.target.value)} className="w-1/2 p-4 border rounded-2xl text-2xl font-black text-center" /><select value={unit} onChange={e => setUnit(e.target.value as any)} className="w-1/2 p-4 border rounded-2xl font-black text-center bg-white"><option value="hours">Hours</option><option value="minutes">Minutes</option></select></div>
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200">Calculate Exact Time</button>
      {res && <div className="p-8 bg-blue-50 rounded-[2rem] text-center border border-blue-100"><p className="text-4xl font-black text-blue-800">{res}</p></div>}
    </div>
  );
};

// --- MILITARY TIME ---
export const MilitaryTimeCalculator: React.FC = () => {
  const [input, setInput] = useState('12:00');
  const [res, setRes] = useState<string | null>(null);
  const convert = () => {
    const [h, m] = input.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    setRes(`${h12}:${m.toString().padStart(2, '0')} ${suffix}`);
  };
  return (
    <div className="p-8 space-y-4">
      <input type="time" value={input} onChange={e => setInput(e.target.value)} className="w-full p-4 border rounded-xl" />
      <button onClick={convert} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Convert</button>
      {res && <div className="p-6 bg-slate-50 text-center font-black text-2xl rounded-xl">{res}</div>}
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
    <div className="p-8 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Rate" className="p-3 border rounded-xl" />
        <input type="number" value={hrs} onChange={e => setHrs(e.target.value)} placeholder="Hours" className="p-3 border rounded-xl" />
      </div>
      <button onClick={calculate} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl">Calculate Pay</button>
      {res && <div className="p-6 bg-blue-50 rounded-xl space-y-2 font-bold">
        <div className="flex justify-between"><span>Regular:</span><span>${res.regPay.toFixed(2)}</span></div>
        <div className="flex justify-between text-blue-600"><span>Overtime (1.5x):</span><span>${res.otPay.toFixed(2)}</span></div>
        <div className="flex justify-between text-xl border-t pt-2"><span>Total Gross:</span><span>${res.total.toFixed(2)}</span></div>
      </div>}
    </div>
  );
};

// --- DECIMAL TIME ---
export const DecimalTimeCalculatorComp: React.FC = () => {
  const [h, setH] = useState('8');
  const [m, setM] = useState('30');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes((parseInt(h) + parseInt(m)/60).toFixed(2));
  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4"><input type="number" value={h} onChange={e => setH(e.target.value)} className="w-1/2 p-3 border rounded-xl" /><input type="number" value={m} onChange={e => setM(e.target.value)} className="w-1/2 p-3 border rounded-xl" /></div>
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Convert to Decimal</button>
      {res && <div className="p-6 bg-slate-50 text-center text-4xl font-black">{res} hrs</div>}
    </div>
  );
};

// --- FEDERAL HOLIDAYS ---
export const USFederalHolidays: React.FC = () => {
  const h = ["New Year's Day (Jan 1)", "MLK Jr. Day (Jan 20)", "Presidents' Day (Feb 17)", "Memorial Day (May 26)", "Juneteenth (Jun 19)", "Independence Day (Jul 4)", "Labor Day (Sep 1)", "Veterans Day (Nov 11)", "Thanksgiving (Nov 27)", "Christmas Day (Dec 25)"];
  return (
    <div className="divide-y">
      {h.map((name, i) => <div key={i} className="p-4 hover:bg-slate-50 font-bold text-slate-700">{name}</div>)}
    </div>
  );
};

// --- DAYS FROM NOW ---
export const DaysFromNowCalculator: React.FC = () => {
  const [d, setD] = useState('30');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const target = new Date(); target.setDate(target.getDate() + parseInt(d)); setRes(target.toDateString()); };
  return (
    <div className="p-8 space-y-4">
      <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-full p-4 border rounded-xl text-center font-black text-2xl" />
      <button onClick={calculate} className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl">Calculate Future Date</button>
      {res && <div className="p-8 bg-indigo-50 text-center font-black text-2xl rounded-xl">{res}</div>}
    </div>
  );
};

// --- BILLABLE HOURS ---
export const BillableHoursCalculator: React.FC = () => {
  const [m, setM] = useState('45');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes((Math.ceil(parseInt(m)/6)/10).toFixed(1));
  return (
    <div className="p-8 space-y-4">
      <input type="number" value={m} onChange={e => setM(e.target.value)} placeholder="Minutes" className="w-full p-4 border rounded-xl text-center font-black text-2xl" />
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Units (6m base)</button>
      {res && <div className="p-8 bg-blue-50 text-center font-black text-4xl text-blue-900 rounded-xl">{res} Units</div>}
    </div>
  );
};

// --- TIME BETWEEN TIMES ---
export const TimeBetweenTimesCalculator: React.FC = () => {
  const [t1, setT1] = useState('09:00'); const [t2, setT2] = useState('17:00'); const [res, setRes] = useState<string | null>(null);
  const calculate = () => {
    const [h1, m1] = t1.split(':').map(Number); const [h2, m2] = t2.split(':').map(Number);
    let diff = (h2*60+m2)-(h1*60+m1); if (diff < 0) diff += 1440;
    setRes(`${Math.floor(diff/60)}h ${diff%60}m`);
  };
  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4"><input type="time" value={t1} onChange={e => setT1(e.target.value)} className="w-1/2 p-3 border rounded-xl" /><input type="time" value={t2} onChange={e => setT2(e.target.value)} className="w-1/2 p-3 border rounded-xl" /></div>
      <button onClick={calculate} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl">Get Duration</button>
      {res && <div className="p-8 bg-blue-50 text-center text-5xl font-black rounded-xl">{res}</div>}
    </div>
  );
};

// --- MINS TO HOURS ---
export const MinutesToHoursCalculator: React.FC = () => {
  const [m, setM] = useState('150');
  const [res, setRes] = useState<string | null>(null);
  const calculate = () => setRes(`${Math.floor(parseInt(m)/60)}h ${parseInt(m)%60}m`);
  return (
    <div className="p-8 space-y-4">
      <input type="number" value={m} onChange={e => setM(e.target.value)} className="w-full p-4 border rounded-xl text-center font-black text-2xl" />
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Convert to H:M</button>
      {res && <div className="p-8 bg-slate-50 text-center text-4xl font-black rounded-xl">{res}</div>}
    </div>
  );
};

// --- HOURS TO MINS ---
export const HoursToMinutesCalculator: React.FC = () => {
  const [h, setH] = useState('2'); const [m, setM] = useState('30'); const [res, setRes] = useState<number | null>(null);
  const calculate = () => setRes(parseInt(h)*60 + parseInt(m));
  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4"><input type="number" value={h} onChange={e => setH(e.target.value)} className="w-1/2 p-3 border rounded-xl" /><input type="number" value={m} onChange={e => setM(e.target.value)} className="w-1/2 p-3 border rounded-xl" /></div>
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Total Minutes</button>
      {res !== null && <div className="p-8 bg-slate-50 text-center text-4xl font-black rounded-xl">{res} mins</div>}
    </div>
  );
};

// --- COUNTDOWN TIMER ---
export const CountdownTimer: React.FC = () => {
  const [t, setT] = useState(0); const [active, setActive] = useState(false); const [input, setInput] = useState('60');
  useEffect(() => { let i: any; if (active && t > 0) i = setInterval(() => setT(t => t - 1), 1000); else if (t === 0) setActive(false); return () => clearInterval(i); }, [active, t]);
  const start = () => { setT(parseInt(input)); setActive(true); };
  return (
    <div className="p-12 text-center space-y-6">
      <input type="number" value={input} onChange={e => setInput(e.target.value)} className="text-4xl p-4 border rounded-xl w-32 text-center" />
      <div className="text-7xl font-black">{t}s</div>
      <button onClick={start} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl">{active ? 'RESTART' : 'START'}</button>
    </div>
  );
};

// --- BUSINESS DAY ---
export const BusinessDayCalculator: React.FC = () => {
  const [d1, setD1] = useState(''); const [d2, setD2] = useState(''); const [res, setRes] = useState<number | null>(null);
  const calculate = () => {
    let s = new Date(d1); let e = new Date(d2); if (s > e) [s, e] = [e, s];
    let count = 0; let cur = new Date(s);
    while (cur <= e) { if (cur.getDay() !== 0 && cur.getDay() !== 6) count++; cur.setDate(cur.getDate()+1); }
    setRes(count);
  };
  return (
    <div className="p-8 space-y-4">
      <div className="grid grid-cols-2 gap-4"><input type="date" value={d1} onChange={e => setD1(e.target.value)} className="p-2 border rounded" /><input type="date" value={d2} onChange={e => setD2(e.target.value)} className="p-2 border rounded" /></div>
      <button onClick={calculate} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl">Count Business Days</button>
      {res !== null && <div className="p-6 text-center text-5xl font-black">{res} Days</div>}
    </div>
  );
};

// --- PREGNANCY ---
export const PregnancyCalculator: React.FC = () => {
  const [lmp, setLmp] = useState(''); const [res, setRes] = useState<string | null>(null);
  const calculate = () => { const d = new Date(lmp); d.setDate(d.getDate() + 280); setRes(d.toDateString()); };
  return (
    <div className="p-8 space-y-4">
      <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="w-full p-4 border rounded" />
      <button onClick={calculate} className="w-full py-4 bg-rose-500 text-white font-black rounded-xl">Estimate Due Date</button>
      {res && <div className="p-8 bg-rose-50 text-center text-2xl font-black rounded-xl">{res}</div>}
    </div>
  );
};

// --- CHRONOMETER ---
export const Chronometer: React.FC = () => {
  const [ms, setMs] = useState(0); const [running, setRunning] = useState(false);
  useEffect(() => { let i: any; if (running) i = setInterval(() => setMs(m => m + 10), 10); return () => clearInterval(i); }, [running]);
  const fmt = (t: number) => {
    const s = Math.floor(t/1000)%60; const m = Math.floor(t/60000);
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${(t%1000/10).toFixed(0).padStart(2,'0')}`;
  };
  return (
    <div className="p-12 text-center space-y-8">
      <div className="text-7xl font-mono font-black">{fmt(ms)}</div>
      <div className="flex gap-4"><button onClick={() => setRunning(!running)} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-xl">{running ? 'STOP' : 'START'}</button><button onClick={() => {setRunning(false); setMs(0);}} className="flex-1 py-4 bg-slate-200 rounded-xl">RESET</button></div>
    </div>
  );
};

// --- TIME CARD ---
export const TimeCardCalculator: React.FC = () => {
  const [hrs, setHrs] = useState(['8', '8', '8', '8', '8', '0', '0']);
  const total = hrs.reduce((a, b) => a + parseFloat(b || '0'), 0);
  return (
    <div className="p-8 space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {['M','T','W','T','F','S','S'].map((day, i) => (
          <div key={i} className="text-center">
            <span className="text-[10px] font-black">{day}</span>
            <input type="text" value={hrs[i]} onChange={e => {const n = [...hrs]; n[i] = e.target.value; setHrs(n);}} className="w-full p-2 border rounded text-center" />
          </div>
        ))}
      </div>
      <div className="p-6 bg-indigo-50 text-center text-4xl font-black text-indigo-900">{total} Total Hours</div>
    </div>
  );
};

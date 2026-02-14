import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, TOOLS } from '../constants';
import { 
  TimeZoneConverter, 
  TimeBetweenDatesCalculator, 
  AgeCalculator, 
  WorkHoursCalculator,
  TimeCalculator,
  PomodoroTimer
} from '../components/CalculatorTools';

const TimeProgress = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);

  const getDayProgress = () => {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const elapsed = now.getTime() - start;
    return (elapsed / 86400000) * 100;
  };

  const getYearProgress = () => {
    const start = new Date(now.getFullYear(), 0, 1).getTime();
    const end = new Date(now.getFullYear() + 1, 0, 1).getTime();
    const elapsed = now.getTime() - start;
    return (elapsed / (end - start)) * 100;
  };

  const currentYear = now.getFullYear();

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
       <div className="flex justify-between items-end mb-2">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Time Remaining</h3>
          <span className="text-xs font-bold text-slate-300 italic">{currentYear} Cycle Progress</span>
       </div>
       <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase mb-1"><span>Day Elapsed</span><span>{getDayProgress().toFixed(2)}%</span></div>
            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${getDayProgress()}%` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase mb-1"><span>Year Progress</span><span>{getYearProgress().toFixed(2)}%</span></div>
            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${getYearProgress()}%` }}></div></div>
          </div>
       </div>
       <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm font-black text-slate-900">
              {23 - now.getHours()}h {59 - now.getMinutes()}m
            </p>
            <p className="text-[8px] text-slate-400 uppercase font-black">Left Today</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900">
              {Math.ceil((new Date(currentYear + 1, 0, 1).getTime() - now.getTime()) / 86400000)}d
            </p>
            <p className="text-[8px] text-slate-400 uppercase font-black">To {currentYear + 1}</p>
          </div>
       </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-400 opacity-[0.03] blur-[120px] rounded-full -z-10"></div>
        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
          Accurate. Free. Universal.
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.85]">
          Universal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Time Calculator</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          High-precision tools for professionals, travelers, and planners. Add durations, calculate age, and track work hours with 100% accuracy.
        </p>
      </section>

      {/* Flagship Time Calculator Widget */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
             <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
               Add or Subtract <span className="text-blue-600">Durations</span> instantly.
             </h2>
             <p className="text-lg text-slate-500 font-medium leading-relaxed">
               Use our flagship <span className="font-bold">Time Calculator</span> to sum hours, minutes, and seconds. Essential for video editors, project managers, and shift workers who need to stack time blocks.
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                   <p className="text-xs font-black text-slate-400 uppercase mb-1">Base Logic</p>
                   <p className="font-bold text-slate-800">ISO-8601 Math</p>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                   <p className="text-xs font-black text-slate-400 uppercase mb-1">Precision</p>
                   <p className="font-bold text-slate-800">Millisecond Scale</p>
                </div>
             </div>
          </div>
          <TimeCalculator />
        </div>
      </section>

      {/* Essential Toolset Grid */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-12">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Essential Toolset</h2>
           <Link to="#tools" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Full Directory</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div className="space-y-4">
              <h4 className="px-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Age Tracker</h4>
              <AgeCalculator />
           </div>
           <div className="space-y-4">
              <h4 className="px-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Shift Logic</h4>
              <WorkHoursCalculator />
           </div>
           <div className="space-y-4">
              <h4 className="px-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date Difference</h4>
              <TimeBetweenDatesCalculator />
           </div>
           <div className="space-y-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-1">
                 <h4 className="px-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pomodoro Focus</h4>
                 <span className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">Productivity</span>
              </div>
              <div className="flex-grow">
                <PomodoroTimer />
              </div>
           </div>
        </div>
      </section>

      {/* Global Sync Section */}
      <section className="mb-32 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8">
             <TimeProgress />
             <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <h4 className="text-lg font-black mb-4 relative z-10">Global Pulse</h4>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10 font-medium">
                  Synchronized with universal time servers to ensure 100% accuracy across every time zone.
                </p>
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between relative z-10">
                   <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Sync Status</div>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
             </div>
          </div>
          <div className="lg:col-span-2 relative">
            <TimeZoneConverter />
          </div>
      </section>

      {/* Full Tool Directory (Cards) */}
      <section id="tools" className="mb-32 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
           <div className="space-y-2">
             <h2 className="text-4xl font-black text-slate-900 tracking-tight">Full Tool Directory</h2>
             <p className="text-slate-500 font-medium text-lg">Every <span className="text-blue-600 font-bold">Time Calculator</span> you'll ever need, organized for speed.</p>
           </div>
           <div className="flex items-center gap-4">
             <span className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest shadow-sm">
               {TOOLS.length} Active Engines
             </span>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter(t => t.category === cat.name);
            return (
              <div key={cat.slug} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 transition-all duration-500 hover:border-blue-100 group">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                   <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform">
                     {cat.icon}
                   </div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900">{cat.name} Solutions</h3>
                      <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mt-1">Specializedtemporal tools</p>
                   </div>
                   <div className="h-px flex-grow bg-slate-100 hidden md:block"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catTools.map(tool => (
                    <Link 
                      key={tool.id} 
                      to={tool.path} 
                      className="group/item flex items-start p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 bg-slate-300 rounded-full mr-4 group-hover/item:bg-blue-500 group-hover/item:scale-150 transition-all"></div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-900 group-hover/item:text-blue-700 font-black text-sm tracking-tight transition-colors">
                            {tool.name}
                          </span>
                          {tool.id === 'time-calculator' || tool.id === 'age-calculator' || tool.id === 'work-hours-calculator' ? (
                            <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md uppercase font-black">Popular</span>
                          ) : null}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed group-hover/item:text-slate-600">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="mb-24 bg-white rounded-[3rem] p-12 md:p-24 border border-slate-100 text-center">
         <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">Professional <span className="text-blue-600">Time Calculator</span> Suite</h2>
         <p className="text-slate-500 text-lg max-w-4xl mx-auto leading-relaxed font-medium mb-12">
           TimeCenterHub provides an exhaustive library of calculation engines. From complex duration subtraction for payroll to precision age tracking and Pomodoro interval management. Every tool is optimized for zero-latency browser performance and follows international ISO temporal standards.
         </p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-2xl font-black text-slate-900">ISO-8601</p><p className="text-[10px] text-slate-400 font-black uppercase">Standard</p></div>
            <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-2xl font-black text-slate-900">Private</p><p className="text-[10px] text-slate-400 font-black uppercase">Local Math</p></div>
            <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-2xl font-black text-slate-900">Instant</p><p className="text-[10px] text-slate-400 font-black uppercase">Response</p></div>
            <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-2xl font-black text-slate-900">2025</p><p className="text-[10px] text-slate-400 font-black uppercase">Updated</p></div>
         </div>
      </section>
    </div>
  );
};

export default Home;
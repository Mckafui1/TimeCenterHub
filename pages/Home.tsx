import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, TOOLS } from '../constants.tsx';
import { 
  TimeZoneConverter, 
  TimeBetweenDatesCalculator, 
  AgeCalculator, 
  WorkHoursCalculator,
  TimeCalculator,
  PomodoroTimer
} from '../components/CalculatorTools.tsx';

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
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm space-y-8">
       <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest">Time Remaining</h3>
          <span className="text-sm font-bold text-slate-600 italic">{currentYear} Progress</span>
       </div>
       <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-black uppercase mb-2 text-slate-600"><span>Today</span><span>{getDayProgress().toFixed(2)}%</span></div>
            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${getDayProgress()}%` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-black uppercase mb-2 text-slate-600"><span>Year</span><span>{getYearProgress().toFixed(2)}%</span></div>
            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${getYearProgress()}%` }}></div></div>
          </div>
       </div>
       <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">
              {23 - now.getHours()}h {59 - now.getMinutes()}m
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-black">Left Today</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-900">
              {Math.ceil((new Date(currentYear + 1, 0, 1).getTime() - now.getTime()) / 86400000)}d
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-black">To {currentYear + 1}</p>
          </div>
       </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 md:mb-10 relative pt-4 md:pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 bg-blue-400 opacity-[0.03] blur-[120px] rounded-full -z-10"></div>
        <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4">
          RELIABLE TIME TOOLS
        </div>
        <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter leading-[1.1]">
          Simple & Accurate <br />
          <span className="text-blue-600">Time Calculator</span> Tools
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-8 px-2 md:px-4">
          Easy-to-use tools for everyone. Calculate your exact age, track work hours, and add up time durations with 100% accuracy.
        </p>

        {/* Hero Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto mb-10 md:mb-12">
          {TOOLS.filter(t => ['time-calculator', 'age-calculator', 'military-time', 'pomodoro-timer'].includes(t.id)).map(tool => (
            <Link 
              key={tool.id} 
              to={tool.path} 
              className="px-6 py-2.5 md:px-8 md:py-3 bg-white border border-slate-200 rounded-full text-xs md:text-sm font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
            >
              {tool.name === 'Military Time Converter' ? 'Military Time Converter' : tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Main Time Calculator */}
      <section className="mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-10 text-center lg:text-left order-first lg:order-none">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
               Add or Subtract <span className="text-blue-600">Time</span> Easily
             </h2>
             <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
               Use our main <span className="font-bold text-slate-700">Time Calculator</span> to add up hours, minutes, and seconds. It is great for tracking project time or video editing.
             </p>
             <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="p-5 md:p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                   <p className="text-xs font-black text-blue-500 uppercase mb-3 tracking-widest">Standards</p>
                   <p className="font-bold text-slate-900 text-base md:text-lg">Standard Math</p>
                </div>
                <div className="p-5 md:p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                   <p className="text-xs font-black text-indigo-500 uppercase mb-3 tracking-widest">Accuracy</p>
                   <p className="font-bold text-slate-900 text-base md:text-lg">Exact Precision</p>
                </div>
             </div>
          </div>
          <div className="p-1.5 bg-slate-100 rounded-[2.5rem]">
             <div className="bg-white rounded-[2.25rem] overflow-hidden">
                <TimeCalculator />
             </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="mb-24 md:mb-36">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 md:mb-16 gap-4 text-center md:text-left">
           <div>
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Most Popular Tools</h2>
             <p className="text-slate-600 font-bold mt-2 text-lg">Our most used calculators</p>
           </div>
           <Link to="/sitemap" className="text-sm font-black text-blue-600 uppercase tracking-widest hover:underline pb-1">All Tools</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
           <div className="space-y-4 md:space-y-5">
              <h4 className="px-6 text-sm font-black uppercase text-slate-500 tracking-widest text-center md:text-left">Age Tracker</h4>
              <AgeCalculator />
           </div>
           <div className="space-y-4 md:space-y-5">
              <h4 className="px-6 text-sm font-black uppercase text-slate-500 tracking-widest text-center md:text-left">Work Hours</h4>
              <WorkHoursCalculator />
           </div>
           <div className="space-y-4 md:space-y-5">
              <h4 className="px-6 text-sm font-black uppercase text-slate-500 tracking-widest text-center md:text-left">Date Duration</h4>
              <TimeBetweenDatesCalculator />
           </div>
           <div className="space-y-4 md:space-y-5 flex flex-col h-full">
              <div className="flex justify-between items-center mb-1 px-2 md:px-0">
                 <h4 className="px-6 text-sm font-black uppercase text-slate-500 tracking-widest">Focus Timer</h4>
                 <span className="text-xs font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded uppercase">Pomodoro</span>
              </div>
              <div className="flex-grow">
                <PomodoroTimer />
              </div>
           </div>
        </div>
      </section>

      {/* Live World Clock Section */}
      <section className="mb-24 md:mb-36 grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-1 space-y-8 md:space-y-10 order-last lg:order-none">
             <TimeProgress />
             <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-600 rounded-full blur-[90px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <h4 className="text-2xl font-black mb-5 relative z-10">Live World Clock</h4>
                <p className="text-slate-400 text-base leading-relaxed relative z-10 font-medium">
                  Automatically stays in sync with real-time world clocks so you always have the correct time in any city.
                </p>
                <div className="mt-10 pt-8 border-t border-slate-800 flex items-center justify-between relative z-10">
                   <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Status</div>
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-black text-emerald-400 uppercase">Live</span>
                     <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                   </div>
                </div>
             </div>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="p-1.5 bg-slate-100 rounded-[2.5rem]">
              <div className="bg-white rounded-[2.25rem] overflow-hidden shadow-sm">
                <TimeZoneConverter />
              </div>
            </div>
          </div>
      </section>

      {/* Full Directory */}
      <section id="tools" className="mb-24 md:mb-36 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-20 gap-6 md:gap-8 text-center md:text-left">
           <div className="space-y-3">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Full Tool List</h2>
             <p className="text-slate-600 font-bold text-lg md:text-xl">Every <span className="text-blue-600">time tool</span> you need in one place.</p>
           </div>
           <div className="flex items-center justify-center md:justify-end gap-5">
             <span className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.15em] shadow-xl">
               {TOOLS.length} Active Tools
             </span>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:gap-16">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter(t => t.category === cat.name);
            return (
              <div key={cat.slug} className="bg-white rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 transition-all duration-500 hover:border-blue-200 group">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-10 md:mb-20 text-center md:text-left">
                   <div className="w-20 h-20 md:w-28 md:h-28 mx-auto md:mx-0 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-4xl md:text-6xl shadow-inner group-hover:bg-blue-50 transition-colors">
                     {cat.icon}
                   </div>
                   <div>
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900">{cat.name} Tools</h3>
                      <p className="text-blue-500 font-black uppercase text-xs md:text-sm tracking-[0.2em] mt-2 md:mt-3">Simple {cat.name.toLowerCase()} calculators</p>
                   </div>
                   <div className="h-px flex-grow bg-slate-100 hidden md:block"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {catTools.map(tool => (
                    <Link 
                      key={tool.id} 
                      to={tool.path} 
                      className="group/item flex flex-col p-8 md:p-10 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all text-center md:text-left"
                    >
                      <div className="flex flex-col md:flex-row items-center md:justify-between mb-5 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <span className="text-slate-900 group-hover/item:text-blue-600 font-black text-lg md:text-xl tracking-tight transition-colors">
                                {tool.name}
                            </span>
                        </div>
                        {['time-calculator', 'age-calculator', 'work-hours-calculator'].includes(tool.id) && (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase font-black">Popular</span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-slate-600 font-bold leading-relaxed group-hover/item:text-slate-700">
                        {tool.description}
                      </p>
                      <div className="mt-6 md:mt-8 flex items-center justify-center md:justify-start text-xs font-black text-blue-500 uppercase tracking-widest opacity-100 md:opacity-0 group-hover/item:opacity-100 transition-opacity">
                        Open Tool →
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
      <section className="mb-24 md:mb-36 bg-white rounded-[3rem] p-8 md:p-28 border border-slate-100 text-center">
         <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight leading-tight">Your Trusted <span className="text-blue-600">Time Tool</span> Hub</h2>
         <p className="text-slate-600 text-lg md:text-2xl max-w-5xl mx-auto leading-relaxed font-bold mb-12 md:mb-20">
           TimeCenterHub offers a large collection of calculators to help you manage your time. From adding work hours for payroll to tracking how many days until your next birthday. Every tool is built to be fast, accurate, and easy to use for everyone.
         </p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div className="p-6 md:p-10 bg-slate-50 rounded-[2rem]"><p className="text-2xl md:text-4xl font-black text-slate-900">Standard</p><p className="text-xs md:text-sm text-slate-500 font-black uppercase mt-2">Math</p></div>
            <div className="p-6 md:p-10 bg-slate-50 rounded-[2rem]"><p className="text-2xl md:text-4xl font-black text-slate-900">100%</p><p className="text-xs md:text-sm text-slate-500 font-black uppercase mt-2">Private</p></div>
            <div className="p-6 md:p-10 bg-slate-50 rounded-[2rem]"><p className="text-2xl md:text-4xl font-black text-slate-900">Live</p><p className="text-xs md:text-sm text-slate-500 font-black uppercase mt-2">Updates</p></div>
            <div className="p-6 md:p-10 bg-slate-50 rounded-[2rem]"><p className="text-2xl md:text-4xl font-black text-slate-900">Free</p><p className="text-xs md:text-sm text-slate-500 font-black uppercase mt-2">For All</p></div>
         </div>
      </section>

      {/* VISUALLY HIDDEN SEO CONTENT (CRAWLER ONLY) */}
      <div className="sr-only">
        <article>
          <h1>Simple Time Calculator and Date Tool Center</h1>
          <p>Welcome to TimeCenterHub, your home for accurate time calculators and date tools. We help you with all your time-related questions, from calculating your age to tracking work hours. Our goal is to provide simple tools that everyone can use easily.</p>
        </article>
      </div>
    </div>
  );
};

export default Home;
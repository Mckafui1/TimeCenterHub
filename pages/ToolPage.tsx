import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../constants.tsx';
import { 
  TimeBetweenDatesCalculator, 
  WorkHoursCalculator, 
  MilitaryTimeCalculator,
  OvertimeCalculator,
  DecimalTimeCalculatorComp,
  USFederalHolidays,
  DaysFromNowCalculator,
  AddTimeCalculator,
  SubtractTimeCalculator,
  BillableHoursCalculator,
  TimeBetweenTimesCalculator,
  MinutesToHoursCalculator,
  CountdownTimer,
  AgeCalculator,
  BusinessDayCalculator,
  PregnancyCalculator,
  PomodoroTimer,
  Chronometer,
  BirthdayCalculator,
  UnixTimestampTool,
  TimeZoneConverter,
  TimeCardCalculator,
  TimeFromNowCalculator,
  HoursToMinutesCalculator,
  TimeCalculator
} from '../components/CalculatorTools.tsx';

const COMMENTS = [
  { user: "Lunar", date: "2024-09-30", text: "this great i can use this when i want to" },
  { user: "Emily", date: "2024-06-04", text: "Very helpful, thank you :) but would be good to provide not only how many days and hours but also how many hours and minutes total." },
  { user: "Ava", date: "2024-05-20", text: "Thanks I really needed that and I think your website is really good." },
  { user: "Lathan", date: "2024-11-12", text: "I love this app!" },
  { user: "Lee Defendorf", date: "2024-10-03", text: "I like the layout of the time calculator and it's easy to use." },
  { user: "MiddleClassSeats", date: "2024-07-05", text: "Lifesaver for trying to convert watch hours for my Youtube channel." }
];

const ToolPage: React.FC = () => {
  const { category, toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Tool not found</h1>
        <p className="text-slate-500 mt-2 font-medium">The calculator you are looking for might have been moved or renamed.</p>
        <Link to="/" className="text-blue-600 mt-8 inline-block font-black hover:underline">← Back to Homepage</Link>
      </div>
    );
  }

  const renderCalculator = () => {
    switch(tool.id) {
      case 'time-calculator': return <TimeCalculator />;
      case 'age-calculator': return <AgeCalculator />;
      case 'days-to-birthday': 
      case 'birthday-countdown': return <BirthdayCalculator />;
      case 'business-day-calculator': 
      case 'business-days': return <BusinessDayCalculator />;
      case 'pregnancy-due-date': return <PregnancyCalculator />;
      case 'time-between-times': 
      case 'time-duration': return <TimeBetweenTimesCalculator />;
      case 'pomodoro-timer': 
      case 'pomodoro': return <PomodoroTimer />;
      case 'time-between-dates': return <TimeBetweenDatesCalculator />;
      case 'days-from-now': return <DaysFromNowCalculator />;
      case 'add-time': return <AddTimeCalculator />;
      case 'subtract-time': return <SubtractTimeCalculator />;
      case 'chronometer': return <Chronometer />;
      case 'work-hours-calculator': 
      case 'work-hours': return <WorkHoursCalculator />;
      case 'time-card-calculator': 
      case 'time-card': return <TimeCardCalculator />;
      case 'time-from-now': 
      case 'hours-from-now':
      case 'minutes-from-now': return <TimeFromNowCalculator />;
      case 'military-time': return <MilitaryTimeCalculator />;
      case 'overtime-calculator': 
      case 'overtime': return <OvertimeCalculator />;
      case 'decimal-time': 
      case 'time-in-decimal': return <DecimalTimeCalculatorComp />;
      case 'federal-holidays': 
      case 'holidays': return <USFederalHolidays />;
      case 'billable-hours': 
      case 'billable': return <BillableHoursCalculator />;
      case 'minutes-to-hours': return <MinutesToHoursCalculator />;
      case 'hours-to-minutes': return <HoursToMinutesCalculator />;
      case 'countdown-timer': 
      case 'timer': return <CountdownTimer />;
      case 'unix-timestamp': 
      case 'unix': return <UnixTimestampTool />;
      case 'time-zone-converter': 
      case 'world-clock': return <TimeZoneConverter />;
      default: return <div className="p-12 bg-slate-50 border rounded-3xl text-center text-slate-400 font-bold uppercase tracking-widest italic">Tool logic for {tool.name} is being optimized.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex mb-8 text-sm text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="capitalize">{category} Tools</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 font-black">{tool.name}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-none">{tool.name}</h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-4xl font-medium">
          {tool.longDescription}
        </p>
      </header>

      <section className="mb-20">
        <div className="p-1 bg-slate-100 rounded-[2.5rem]">
           <div className="bg-white rounded-[2rem] overflow-hidden shadow-md shadow-blue-900/5">
              {renderCalculator()}
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-24">
          <section>
             <h2 className="text-3xl font-black text-slate-900 mb-6">About {tool.name}</h2>
             <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
                <p>
                  Professional {tool.name} utility designed for accuracy and speed. We use standardized algorithms to ensure your {tool.category.toLowerCase()} data is perfectly calculated.
                </p>
             </div>
          </section>

          {tool.howToSteps && (
            <section className="p-10 bg-blue-600 rounded-[3rem] text-white shadow-sm relative overflow-hidden">
               <h2 className="text-3xl font-black mb-8 relative z-10">Step-by-Step Guide</h2>
               <div className="space-y-6 relative z-10">
                  {tool.howToSteps.map((step, i) => (
                    <div key={i} className="flex gap-6 items-start">
                       <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-black flex-shrink-0">{i+1}</div>
                       <p className="text-lg font-bold leading-tight pt-1">{step}</p>
                    </div>
                  ))}
               </div>
            </section>
          )}

          {tool.tableData && (
            <section>
               <h2 className="text-3xl font-black text-slate-900 mb-8">Reference Table</h2>
               <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                           {tool.tableData.headers.map((h, i) => (
                             <th key={i} className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">{h}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {tool.tableData.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                             {row.map((cell, j) => (
                               <td key={j} className="px-6 py-5 text-sm font-bold text-slate-600">{cell}</td>
                             ))}
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
          )}

          <section className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
             <h2 className="text-3xl font-black text-slate-900 mb-12">User Reviews</h2>
             <div className="space-y-8">
                {COMMENTS.map((c, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200/50 shadow">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{c.user[0]}</div>
                           <div><p className="text-sm font-black text-slate-900">{c.user}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{c.date}</p></div>
                        </div>
                     </div>
                     <p className="text-slate-600 font-medium italic">"{c.text}"</p>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-md">
            <h3 className="text-xl font-black mb-8">Related Tools</h3>
            <div className="space-y-4">
              {TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 8).map(t => (
                <Link key={t.id} to={t.path} className="flex items-center p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-colors group">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-black text-slate-100">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ToolPage;
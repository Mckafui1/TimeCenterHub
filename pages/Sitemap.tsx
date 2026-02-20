import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORIES, TOOLS } from '../constants.tsx';

const Sitemap: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <Helmet>
        <title>Sitemap - TimeCenterHub</title>
        <meta name="description" content="Complete directory of all time calculators and tools available on TimeCenterHub." />
        <link rel="canonical" href="https://timecenterhub.com/sitemap" />
      </Helmet>
      <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">Sitemap & Tool Directory</h1>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 font-medium leading-relaxed mb-16">
        <p className="text-xl text-slate-900 font-black">
          Welcome to the master directory of TimeCenterHub. Below you will find every calculation tool we offer, organized by category for easy navigation.
        </p>
        <p>
          TimeCenterHub is more than just a single calculator; it is a comprehensive temporal resource center. Whether you are looking for simple date differences or complex work-schedule management, our directory is designed to get you to the right engine instantly. Each tool listed below has been verified for mathematical accuracy and optimized for a simple user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {CATEGORIES.map(cat => (
          <div key={cat.slug} className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <span className="text-4xl">{cat.icon}</span>
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{cat.name} Category</h2>
            </div>
            <ul className="space-y-4">
              {TOOLS.filter(t => t.category === cat.name).map(tool => (
                <li key={tool.id}>
                  <Link to={tool.path} className="group block p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 hover:shadow-xl transition-all">
                    <span className="text-slate-900 font-black text-lg group-hover:text-blue-600 transition-colors">{tool.name}</span>
                    <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 space-y-8">
         <h2 className="text-3xl font-black text-slate-900 tracking-tight">Understanding Our Directory Structure</h2>
         <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
            <p>
              Our sitemap is organized to mirror the way people think about time. We have split our tools into five core domains: Time, Date, Work, Converter, and Countdown.
            </p>
            <h3 className="text-slate-900 font-black">1. Time Tools</h3>
            <p>This category focuses on durations and clock math. It includes our flagship Time Calculator, Sleep Cycle optimizers, and the world clock. These tools are used primarily for managing current activities or planning near-term tasks.</p>
            
            <h3 className="text-slate-900 font-black">2. Date Tools</h3>
            <p>Date tools handle the calendar. From Age calculation to determining the time between two specific dates in history, these engines are built to handle the complexities of the Gregorian calendar, including leap years and month length variations.</p>
            
            <h3 className="text-slate-900 font-black">3. Work Tools</h3>
            <p>The workplace tools are essential for the professional community. This includes shifts, overtime, and billable hours. We aim to help both employees and employers reach a transparent and accurate understanding of labor time.</p>
            
            <h3 className="text-slate-900 font-black">4. Converter Tools</h3>
            <p>Conversion is about speaking different languages of time. Whether you're translating Military time (24-hour) to Standard time (12-hour) or converting minutes into decimal hours for an accounting report, these tools bridge the gap between different temporal formats.</p>
            
            <h3 className="text-slate-900 font-black">5. Countdown Tools</h3>
            <p>Countdowns are about focus and anticipation. This includes productivity tools like the Pomodoro Timer, which helps manage work sessions, and long-term countdowns for major life events like New Year's or personal exams.</p>
            
            <p className="pt-8 italic text-sm">
              Can't find what you're looking for? New tools are added to the sitemap every month based on user requests. Please reach out via our contact page if you have a specific time tool in mind.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Sitemap;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                TimeCenter<span className="text-blue-600">Hub</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-sm font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">Hub</Link>
              <Link to="/date/age-calculator" className="text-sm font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">Date</Link>
              <Link to="/time/chronometer" className="text-sm font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">Stopwatch</Link>
              <Link to="/work/work-hours-calculator" className="text-sm font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">Work</Link>
              <Link to="/converter/unix-timestamp" className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md">Developer Tools</Link>
            </nav>

            <div className="md:hidden">
              <button className="p-3 bg-slate-100 rounded-xl text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tighter">TimeCenterHub</span>
              </Link>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                Empowering individuals and businesses with absolute temporal accuracy. Our tools are built using the most reliable date-time algorithms available.
              </p>
              <div className="flex space-x-4">
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"><svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></div>
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"><svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></div>
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-6">Navigation</h4>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home Hub</Link></li>
                <li><Link to="/date/age-calculator" className="hover:text-blue-600 transition-colors">Date Calculator</Link></li>
                <li><Link to="/work/work-hours-calculator" className="hover:text-blue-600 transition-colors">Work Tracker</Link></li>
                <li><Link to="/converter/unix-timestamp" className="hover:text-blue-600 transition-colors">Unix Epoch</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Ethics</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Service Terms</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Global Accuracy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Access</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 font-black uppercase text-[10px] tracking-widest">
            <p>&copy; {new Date().getFullYear()} TimeCenterHub. Engine: React 19 / IANA v2024b.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
               <span>Made for everyone</span>
               <span className="text-slate-200">|</span>
               <span>ISO-8601 Valid</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600"></div>
      </footer>
    </div>
  );
};

export default Layout;
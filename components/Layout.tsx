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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                TimeCenter<span className="text-blue-600">Hub</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-12">
              <Link to="/" className="text-base font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">Home</Link>
              <Link to="/date/age-calculator" className="text-base font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">Date</Link>
              <Link to="/time/chronometer" className="text-base font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">Stopwatch</Link>
              <Link to="/work/work-hours-calculator" className="text-base font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">Work</Link>
              <Link to="/converter/unix-timestamp" className="px-6 py-3 bg-slate-900 text-white text-sm font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm">Coding Tools</Link>
            </nav>

            <div className="md:hidden">
              <button className="p-3.5 bg-slate-100 rounded-xl text-slate-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">TimeCenterHub</span>
              </Link>
              <p className="text-slate-600 max-w-sm text-lg font-medium leading-relaxed">
                Easy and accurate time tools for everyone. We help you track, calculate, and manage your time with simple calculators.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-base tracking-widest mb-8">Quick Links</h4>
              <ul className="space-y-5 font-bold text-slate-600 text-lg">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link to="/date/age-calculator" className="hover:text-blue-600 transition-colors">Age Calculator</Link></li>
                <li><Link to="/work/work-hours-calculator" className="hover:text-blue-600 transition-colors">Work Tracker</Link></li>
                <li><Link to="/sitemap" className="hover:text-blue-600 transition-colors">All Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-base tracking-widest mb-8">Support</h4>
              <ul className="space-y-5 font-bold text-slate-600 text-lg">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-14 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-base font-black uppercase tracking-widest">
              &copy; {new Date().getFullYear()} TimeCenterHub. Free and Simple Time Tools for Everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
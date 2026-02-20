import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, TOOLS } from '../constants.tsx';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://timecenterhub.com';
  const shareText = "Check out TimeCenterHub for free online time calculators!";

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-8">
            <Link to="/" className="flex items-center space-x-3 group shrink-0 relative z-50">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                 <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
                TimeCenter<span className="text-blue-600">Hub</span>
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6">
              <Link to="/" className="px-3 py-2 text-xs xl:text-sm font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">Hub</Link>
              
              {CATEGORIES.map((cat) => (
                <div key={cat.slug} className="relative group">
                  <button className="flex items-center px-3 py-4 text-xs xl:text-sm font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors whitespace-nowrap">
                    {cat.name} Tools
                    <svg className="w-3 h-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 max-h-[70vh] overflow-y-auto">
                      {TOOLS.filter(t => t.category === cat.name).map(tool => (
                        <Link key={tool.id} to={tool.path} className="block px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/converter/unix-timestamp" className="ml-4 px-5 xl:px-8 py-3 bg-slate-900 text-white text-xs xl:text-sm font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm whitespace-nowrap">Coding Tools</Link>
            </nav>

            <div className="lg:hidden relative z-50">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 md:p-3.5 bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-transform"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="h-full overflow-y-auto pt-28 px-6 pb-12">
           <nav className="flex flex-col space-y-8">
              <Link to="/" className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-4">Home Hub</Link>
              
              {CATEGORIES.map(cat => (
                 <div key={cat.slug} className="space-y-4">
                    <div className="flex items-center gap-3 text-lg font-black text-slate-400 uppercase tracking-widest">
                      <span>{cat.icon}</span>
                      <span>{cat.name} Tools</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-slate-100">
                       {TOOLS.filter(t => t.category === cat.name).map(tool => (
                          <Link key={tool.id} to={tool.path} className="text-base font-bold text-slate-700 py-2 block hover:text-blue-600">
                             {tool.name}
                          </Link>
                       ))}
                    </div>
                 </div>
              ))}
              
              <Link to="/converter/unix-timestamp" className="p-5 bg-slate-900 text-white text-center rounded-2xl font-black text-lg shadow-lg mt-4">
                Dev & Coding Tools
              </Link>
           </nav>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-20 text-center md:text-left">
            <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">TimeCenterHub</span>
              </Link>
              <p className="text-slate-600 max-w-sm text-lg font-medium leading-relaxed">
                Easy and accurate time tools for everyone. We help you track, calculate, and manage your time with simple calculators.
              </p>
              
              <div className="pt-4">
                 <p className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Share TimeCenterHub</p>
                 <div className="flex items-center gap-4">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-colors" aria-label="Share on X">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors" aria-label="Share on Facebook">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-colors" aria-label="Share on LinkedIn">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                 </div>
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-base tracking-widest mb-6 md:mb-8">Quick Links</h4>
              <ul className="space-y-4 md:space-y-5 font-bold text-slate-600 text-lg">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Hub</Link></li>
                <li><Link to="/date/age-calculator" className="hover:text-blue-600 transition-colors">Age Calculator</Link></li>
                <li><Link to="/work/work-hours-calculator" className="hover:text-blue-600 transition-colors">Work Tracker</Link></li>
                <li><Link to="/sitemap" className="hover:text-blue-600 transition-colors">All Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black uppercase text-base tracking-widest mb-6 md:mb-8">Support</h4>
              <ul className="space-y-4 md:space-y-5 font-bold text-slate-600 text-lg">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 md:pt-14 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm md:text-base font-black uppercase tracking-widest">
              &copy; {new Date().getFullYear()} TimeCenterHub. Free and Simple Time Tools for Everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
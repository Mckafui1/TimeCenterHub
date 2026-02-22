import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

const InlineSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      (tool.longDescription && tool.longDescription.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto mb-6 px-4 z-30">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 font-bold text-lg transition-all"
          placeholder="Search for a calculator..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute mt-2 w-full left-0 px-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[60vh] overflow-y-auto">
            {filteredTools.length > 0 ? (
                <div className="grid gap-1 p-2">
                {filteredTools.map(tool => (
                    <Link
                    key={tool.id}
                    to={tool.path}
                    onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                    }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                    >
                    <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="font-black text-lg">{tool.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{tool.description}</p>
                    </div>
                    </Link>
                ))}
                </div>
            ) : (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                <p className="font-bold text-sm">No tools found.</p>
                </div>
            )}
            </div>
        </div>
      )}
    </div>
  );
};

export default InlineSearch;

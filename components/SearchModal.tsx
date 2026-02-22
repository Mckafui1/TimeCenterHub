import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredTools = TOOLS.filter(tool => {
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      (tool.longDescription && tool.longDescription.toLowerCase().includes(q))
    );
  }).slice(0, 8); // Limit results

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-slate-100 dark:border-slate-700 p-4 gap-3">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators (e.g., 'time', 'date', 'work')..."
            className="flex-1 text-lg font-bold text-slate-800 dark:text-white placeholder-slate-400 outline-none bg-transparent h-12"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl transition-colors"
          >
            <span className="text-xs font-black uppercase tracking-widest">ESC</span>
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {query.trim() === '' ? (
             <div className="p-8 text-center text-slate-400">
                <p className="text-sm font-bold">Type to search for tools...</p>
             </div>
          ) : filteredTools.length > 0 ? (
            <div className="grid gap-2">
              {filteredTools.map(tool => (
                <Link 
                  key={tool.id} 
                  to={tool.path} 
                  onClick={onClose}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     <span className="font-black text-lg">{tool.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="font-bold">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try searching for 'time', 'date', or 'work'.</p>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-3 text-center border-t border-slate-100 dark:border-slate-700">
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
             Press ESC to close
           </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
